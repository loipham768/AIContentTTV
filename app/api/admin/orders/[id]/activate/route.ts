import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'
import { sendOrderActivatedEmail } from '@/lib/email'

export const runtime = 'nodejs'

async function isAdmin(userId: string) {
  const user = await User.findById(userId).lean() as any
  return !!(user?.isAdmin || user?.email === process.env.ADMIN_EMAIL)
}

const activateSchema = z.object({
  note: z.string().max(500).optional(),
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

  let note = ''
  try {
    const body = await req.json()
    const parsed = activateSchema.safeParse(body)
    if (parsed.success) note = parsed.data.note ?? ''
  } catch { /* ignore */ }

  const order = await Order.findOne({ orderId: id })
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  if (order.status === 'paid') return NextResponse.json({ error: 'Already activated' }, { status: 409 })
  if (order.status === 'cancelled') return NextResponse.json({ error: 'Order cancelled' }, { status: 409 })

  const user = await User.findById(order.userId)
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  if (order.type === 'subscription') {
    // Set or extend plan
    const now = new Date()
    const currentExpiry = user.planExpiresAt && user.planExpiresAt > now ? user.planExpiresAt : now
    const months = order.billing === 'yearly' ? 12 : 1
    const newExpiry = new Date(currentExpiry)
    newExpiry.setMonth(newExpiry.getMonth() + months)

    user.plan = order.plan
    user.planExpiresAt = newExpiry
  } else {
    // Credit pack — add credits
    const added = order.creditsHtml ?? 0
    user.credits += added
    user.creditsTotal = (user.creditsTotal ?? 0) + added
  }

  order.status = 'paid'
  order.activatedAt = new Date()
  order.adminNote = note

  await Promise.all([user.save(), order.save()])

  // Notify user (fire-and-forget)
  sendOrderActivatedEmail(user.email, {
    orderId: order.orderId,
    type: order.type,
    plan: order.plan ?? null,
    billing: order.billing,
    amount: order.amount,
  }).catch(console.error)

  return NextResponse.json({ success: true })
}
