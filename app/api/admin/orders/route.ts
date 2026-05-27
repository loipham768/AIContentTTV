import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'

export const runtime = 'nodejs'

async function isAdmin(userId: string) {
  const user = await User.findById(userId).lean() as any
  return !!(user?.isAdmin || user?.email === process.env.ADMIN_EMAIL)
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') // pending | paid | cancelled | expired | all

  const filter = status && status !== 'all' ? { status } : {}
  const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(200).lean()

  // Attach user emails
  const userIds = [...new Set(orders.map((o: any) => o.userId))]
  const users = await User.find({ _id: { $in: userIds } }, { email: 1 }).lean()
  const emailMap = Object.fromEntries((users as any[]).map(u => [u._id.toString(), u.email]))

  const rows = orders.map((o: any) => ({
    ...o,
    _id: o._id.toString(),
    userEmail: emailMap[o.userId] ?? o.userId,
  }))

  return NextResponse.json({ orders: rows })
}
