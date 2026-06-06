import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import Review from '@/models/Review'
import User from '@/models/User'
import { z } from 'zod'

const schema = z.object({
  rating:  z.number().int().min(1).max(5),
  content: z.string().min(10, 'Tối thiểu 10 ký tự').max(500, 'Tối đa 500 ký tự'),
})

// GET — approved reviews + aggregate stats
export async function GET() {
  await dbConnect()

  const [reviews, stats] = await Promise.all([
    Review.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean(),
    Review.aggregate([
      { $match: { isApproved: true } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 },
          dist: {
            $push: '$rating',
          },
        },
      },
    ]),
  ])

  const agg = stats[0] ?? { avgRating: 0, count: 0 }

  // distribution 1–5
  const dist = [1, 2, 3, 4, 5].map((s) => ({
    star: s,
    count: (agg.dist ?? []).filter((r: number) => r === s).length,
  }))

  return NextResponse.json({
    reviews,
    avgRating: agg.avgRating ? +agg.avgRating.toFixed(1) : 0,
    count: agg.count,
    dist,
  })
}

// POST — submit review (logged-in, once per user)
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Vui lòng đăng nhập' }, { status: 401 })
  }

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ'
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  await dbConnect()

  const existing = await Review.findOne({ userId: session.user.id })
  if (existing) {
    return NextResponse.json({ error: 'Bạn đã gửi đánh giá rồi' }, { status: 409 })
  }

  const user = await User.findById(session.user.id, {
    fullName: 1, avatarUrl: 1, plan: 1, email: 1,
  }).lean() as any

  await Review.create({
    userId:    session.user.id,
    userEmail: session.user.email,
    userName:  user?.fullName || session.user.email?.split('@')[0] || 'Người dùng',
    avatarUrl: user?.avatarUrl || '',
    plan:      user?.plan || 'free',
    rating:    parsed.data.rating,
    content:   parsed.data.content,
    isApproved: false,
  })

  return NextResponse.json({ success: true })
}
