import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { dbConnect } from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'
import { PLAN_PRICES, CREDIT_PACKS, type CreditPackId } from '@/lib/planConfig'
import { sendNewOrderAdminEmail } from '@/lib/email'

export const runtime = 'nodejs'

function generateOrderId(): string {
  const d = new Date()
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const random = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `ACB-${date}-${random}`
}

type SearchParams = {
  plan?: string
  billing?: string
  type?: string
  pack?: string
}

export default async function UpgradePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const session = await auth()
  const params = await searchParams

  const isCredits = params.type === 'credits'

  // Not logged in → go register, preserve all params
  if (!session?.user?.id) {
    const qs = isCredits
      ? `type=credits&pack=${params.pack ?? ''}`
      : `plan=${params.plan ?? ''}`
    redirect(`/login?${qs}`)
  }

  await dbConnect()

  // ── Credits flow ──────────────────────────────────────────────────────
  if (isCredits) {
    const packId = params.pack as CreditPackId
    const pack = CREDIT_PACKS.find(p => p.id === packId)
    if (!pack) redirect('/#pricing')

    // Existing pending order → resume it
    const existing = await Order.findOne({ userId: session.user.id, status: 'pending' }).lean() as any
    if (existing) redirect(`/checkout/${existing.orderId}`)

    const orderId = generateOrderId()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await Order.create({
      orderId,
      userId: session.user.id,
      type: 'credits',
      creditsHtml: pack!.html,
      creditsLandingPages: pack!.landingPages,
      amount: pack!.amount,
      expiresAt,
    })

    const userDoc = await User.findById(session.user.id, { email: 1 }).lean() as any
    sendNewOrderAdminEmail({
      orderId,
      userEmail: userDoc?.email ?? session.user.id,
      type: 'credits',
      amount: pack!.amount,
    }).catch(console.error)

    redirect(`/checkout/${orderId}`)
  }

  // ── Subscription flow ─────────────────────────────────────────────────
  const plan = params.plan
  const billing: 'monthly' | 'yearly' = params.billing === 'yearly' ? 'yearly' : 'monthly'

  if (!plan || (plan !== 'basic' && plan !== 'pro')) redirect('/#pricing')

  const existing = await Order.findOne({ userId: session.user.id, status: 'pending' }).lean() as any
  if (existing) redirect(`/checkout/${existing.orderId}`)

  const orderId = generateOrderId()
  const amount = PLAN_PRICES[plan as 'basic' | 'pro'][billing]
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
