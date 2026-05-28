import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'
import { sendOrderCancelledEmail } from '@/lib/email'

export const runtime = 'nodejs'

async function isAdmin(userId: string) {
  const user = await User.findById(userId).lean() as any
  return !!(user?.isAdmin || user?.email === process.env.ADMIN_EMAIL)
}

const cancelSchema = z.object({
  reason: z.string().max(500).optional(),
})

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params

  let reason = ''
  try {
    const body = await req.json()
    const parsed = cancelSchema.safeParse(body)
    if (parsed.success) reason = parsed.data.reason ?? ''
  } catch { /* ignore */ }

  const order = await Order.findOne({ orderId: id })
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  if (order.status !== 'pending') return NextResponse.json({ error: 'Order is not pending' }, { status: 409 })

  order.status = 'cancelled'
  order.adminNote = reason
  await order.save()

  // Notify user (fire-and-forget)
  const user = await User.findById(order.userId).lean() as any
  if (user?.email) {
    sendOrderCancelledEmail(user.email, {
      orderId: order.orderId,
      type: order.type,
      plan: order.plan,
      billing: order.billing,
      amount: order.amount,
    }, reason).catch(console.error)
  }

  return NextResponse.json({ success: true })
}
