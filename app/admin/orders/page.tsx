import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Order from '@/models/Order'
import { Suspense } from 'react'
import AdminDashboard, { type OrderRow } from '@/components/admin/AdminDashboard'
import { ADMIN_PAGE_SIZE as PAGE_SIZE } from '@/lib/adminConfig'
import type { Metadata } from 'next'

export const metadata: Metadata = { robots: { index: false, follow: false } }
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function p(v: unknown): number {
  const n = parseInt(String(v ?? '1'))
  return isNaN(n) || n < 1 ? 1 : n
}

async function getData(userId: string, sp: Record<string, string>) {
  await dbConnect()
  const me = await User.findById(userId).lean() as any
  if (!(me?.isAdmin || me?.email === process.env.ADMIN_EMAIL)) return null

  const oq = (sp.oq ?? '').trim()
  const op = p(sp.op)

  const [pendingCount, orderEmailMatches] = await Promise.all([
    Order.countDocuments({
      $or: [
        { status: 'pending', expiresAt: { $gt: new Date() } },
        { status: 'awaiting_confirmation' },
      ],
    }),
    oq
      ? (await User.find({ email: { $regex: escapeRegex(oq), $options: 'i' } }, { _id: 1 }).lean() as any[])
          .map((u: any) => u._id.toString())
      : [],
  ])

  const ordersFilter = oq
    ? {
        $or: [
          { orderId: { $regex: escapeRegex(oq), $options: 'i' } },
          { status: { $regex: escapeRegex(oq), $options: 'i' } },
          ...(orderEmailMatches.length ? [{ userId: { $in: orderEmailMatches } }] : []),
        ],
      }
    : {}

  const [ordersTotal, ordersRaw] = await Promise.all([
    Order.countDocuments(ordersFilter),
    Order.find(ordersFilter).sort({ createdAt: -1 }).skip((op - 1) * PAGE_SIZE).limit(PAGE_SIZE).lean(),
  ])

  const userIds = (ordersRaw as any[]).map((o: any) => o.userId)
  const emailDocs = userIds.length
    ? (await User.find({ _id: { $in: userIds } }, { email: 1 }).lean() as any[])
    : []
  const emailMap: Record<string, string> = Object.fromEntries(emailDocs.map((u: any) => [u._id.toString(), u.email as string]))

  const orderRows: OrderRow[] = (ordersRaw as any[]).map(o => ({
    _id:             o._id.toString(),
    orderId:         o.orderId,
    userId:          o.userId,
    userEmail:       emailMap[o.userId] ?? o.userId,
    type:            o.type,
    plan:            o.plan ?? null,
    billing:         o.billing ?? 'monthly',
    creditsHtml:     o.creditsHtml ?? 0,
    amount:          o.amount,
    status:          o.status,
    expiresAt:       (o.expiresAt as Date).toISOString(),
    activatedAt:     o.activatedAt ? (o.activatedAt as Date).toISOString() : null,
    adminNote:       o.adminNote ?? '',
    paymentProofUrl: o.paymentProofUrl ?? null,
    createdAt:       (o.createdAt as Date).toISOString(),
  }))

  return { orderRows, ordersTotal, ordersPage: op, pendingCount, meId: userId }
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const raw = await searchParams
  const sp: Record<string, string> = {}
  Object.entries(raw).forEach(([k, v]) => { if (typeof v === 'string') sp[k] = v })

  const data = await getData(session.user.id, sp)
  if (!data) redirect('/login')

  return (
    <div className="px-4 sm:px-6 py-6">
      <Suspense>
        <AdminDashboard
          initialOrders={data.orderRows}
          ordersTotal={data.ordersTotal}
          ordersPage={data.ordersPage}
          pendingCount={data.pendingCount}
          meId={data.meId}
          singleSection="orders"
        />
      </Suspense>
    </div>
  )
}
