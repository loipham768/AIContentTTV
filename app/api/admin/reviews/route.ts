import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Review from '@/models/Review'

async function isAdmin(session: any) {
  if (!session?.user?.id) return false
  await dbConnect()
  const u = await User.findById(session.user.id, { isAdmin: 1 }).lean() as any
  return !!u?.isAdmin
}

// GET — all reviews (pending + approved)
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!(await isAdmin(session))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const filter = searchParams.get('filter') // 'pending' | 'approved' | 'all'

  const query = filter === 'pending'
    ? { isApproved: false }
    : filter === 'approved'
    ? { isApproved: true }
    : {}

  const reviews = await Review.find(query).sort({ createdAt: -1 }).lean()
  return NextResponse.json({ reviews })
}
