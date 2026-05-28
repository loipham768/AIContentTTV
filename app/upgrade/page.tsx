import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { dbConnect } from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'
import { PLAN_PRICES } from '@/lib/planConfig'
import { sendNewOrderAdminEmail } from '@/lib/email'

export const runtime = 'nodejs'

function generateOrderId(): string {
  const d = new Date()
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const random = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `ACB-${date}-${random}`
}

export default async function UpgradePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; billing?: string }>
}) {
  const session = await auth()
  const params = await searchParams
  const plan = params.plan
  const billing: 'monthly' | 'yearly' = params.billing === 'yearly' ? 'yearly' : 'monthly'

  // Not logged in → go register with plan pre-selected
  if (!session?.user?.id) {
    redirect(`/login?plan=${plan ?? ''}`)
  }

  // Invalid plan
  if (!plan || (plan !== 'basic' && plan !== 'pro')) {
    redirect('/#pricing')
  }

  await dbConnect()

  // Existing pending order → send user back to that checkout
  const existing = await Order.findOne({ userId: session.user.id, status: 'pending' }).lean() as any
  if (existing) {
    redirect(`/checkout/${existing.orderId}`)
  }

  // Create new order
  const orderId = generateOrderId()
  const amount = PLAN_PRICES[plan][billing]
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

  await Order.create({
    orderId,
    userId: session.user.id,
    type: 'subscription',
    plan,
    billing,
    amount,
    expiresAt,
  })

  // Notify admin (fire-and-forget)
  const userDoc = await User.findById(session.user.id, { email: 1 }).lean() as any
  sendNewOrderAdminEmail({
    orderId,
    userEmail: userDoc?.email ?? session.user.id,
    type: 'subscription',
    plan,
    billing,
    amount,
  }).catch(console.error)

  redirect(`/checkout/${orderId}`)
}
