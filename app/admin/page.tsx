import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Project from '@/models/Project'
import Order from '@/models/Order'
import { Suspense } from 'react'
import AdminDashboard, { type UserRow, type ProjectRow, type OrderRow } from '@/components/admin/AdminDashboard'
import { ADMIN_PAGE_SIZE as PAGE_SIZE } from '@/lib/adminConfig'
import Logo from '@/components/Logo'
import { Users, LayoutTemplate, Activity, TrendingUp } from 'lucide-react'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'


function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function p(v: unknown): number {
  const n = parseInt(String(v ?? '1'))
  return isNaN(n) || n < 1 ? 1 : n
}

async function getAdminData(
  sessionUserId: string,
  sp: Record<string, string>,
) {
  await dbConnect()

  const me = await User.findById(sessionUserId).lean() as any
  const adminOk = !!(me?.isAdmin || me?.email === process.env.ADMIN_EMAIL)
  if (!adminOk) return null

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const startOfMonth = new Date()
  startOfMonth.setDate(1); startOfMonth.setHours(0, 0, 0, 0)

  const oq = (sp.oq ?? '').trim()
  const uq = (sp.uq ?? '').trim()
  const pq = (sp.pq ?? '').trim()
  const op = p(sp.op)
  const up = p(sp.up)
  const pp = p(sp.pp)

  // ── Stats ───────────────────────────────────────────────────────────────
  const [totalUsers, totalProjects, activeUserIds, monthRevenue, pendingCount] =
    await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Project.distinct('userId', { createdAt: { $gte: thirtyDaysAgo } }),
      Order.aggregate([
        { $match: { status: 'paid', activatedAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Order.countDocuments({ status: { $in: ['pending', 'awaiting_confirmation'] } }),
    ])

  // ── Users ───────────────────────────────────────────────────────────────
  const userFilter = uq
    ? {
        $or: [
          { email:    { $regex: escapeRegex(uq), $options: 'i' } },
          { fullName: { $regex: escapeRegex(uq), $options: 'i' } },
          { plan:     { $regex: escapeRegex(uq), $options: 'i' } },
        ],
      }
    : {}

  const [usersTotal, usersRaw] = await Promise.all([
    User.countDocuments(userFilter),
    User.find(userFilter, { passwordHash: 0 })
      .sort({ createdAt: -1 })
      .skip((up - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
  ])

  // projectCounts chỉ scope trên trang users hiện tại — không aggregate toàn bộ collection
  const userIdsOnPage = (usersRaw as any[]).map((u: any) => u._id.toString())
  const projectCounts = userIdsOnPage.length
    ? await Project.aggregate([
        { $match: { userId: { $in: userIdsOnPage } } },
        { $group: { _id: '$userId', count: { $sum: 1 } } },
      ])
    : []

  const countMap: Record<string, number> = Object.fromEntries(
    (projectCounts as any[]).map((c: any) => [c._id, c.count]),
  )

  // ── Orders ──────────────────────────────────────────────────────────────
  // Tìm userIds match email search trực tiếp trên DB (không load toàn bộ users vào RAM)
  const orderEmailMatches = oq
    ? (await User.find({ email: { $regex: escapeRegex(oq), $options: 'i' } }, { _id: 1 }).lean() as any[])
        .map((u: any) => u._id.toString())
    : []

  const ordersFilter = oq
    ? {
        $or: [
          { orderId: { $regex: escapeRegex(oq), $options: 'i' } },
          { status:  { $regex: escapeRegex(oq), $options: 'i' } },
          ...(orderEmailMatches.length ? [{ userId: { $in: orderEmailMatches } }] : []),
        ],
      }
    : {}

  const [ordersTotal, ordersRaw] = await Promise.all([
    Order.countDocuments(ordersFilter),
    Order.find(ordersFilter)
      .sort({ createdAt: -1 })
      .skip((op - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
  ])

  // ── Projects ─────────────────────────────────────────────────────────────
  const projEmailMatches = pq
    ? (await User.find({ email: { $regex: escapeRegex(pq), $options: 'i' } }, { _id: 1 }).lean() as any[])
        .map((u: any) => u._id.toString())
    : []

  const projectsFilter = pq
    ? {
        $or: [
          { name:   { $regex: escapeRegex(pq), $options: 'i' } },
          { prompt: { $regex: escapeRegex(pq), $options: 'i' } },
          ...(projEmailMatches.length ? [{ userId: { $in: projEmailMatches } }] : []),
        ],
      }
    : {}

  const [projectsTotal, projectsRaw] = await Promise.all([
    Project.countDocuments(projectsFilter),
    Project.find(projectsFilter, { blockData: 0 })
      .sort({ createdAt: -1 })
      .skip((pp - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
  ])

  // ── Email map — chỉ lookup emails cho users hiển thị trên trang hiện tại ──
  const visibleUserIds = [
    ...new Set([
      ...(ordersRaw as any[]).map((o: any) => o.userId),
      ...(projectsRaw as any[]).map((p: any) => p.userId),
    ]),
  ]
  const emailDocs = visibleUserIds.length
    ? (await User.find({ _id: { $in: visibleUserIds } }, { email: 1 }).lean() as any[])
    : []
  const emailMap: Record<string, string> = Object.fromEntries(
    emailDocs.map((u: any) => [u._id.toString(), u.email as string]),
  )

  // ── Map rows ─────────────────────────────────────────────────────────────
  const userRows: UserRow[] = (usersRaw as any[]).map(u => ({
    _id:            u._id.toString(),
    email:          u.email as string,
    fullName:       u.fullName ?? '',
    isActive:       u.isActive !== false,
    isAdmin:        !!u.isAdmin,
    paidUntil:      u.paidUntil ? (u.paidUntil as Date).toISOString() : null,
    plan:           u.plan ?? 'free',
    planExpiresAt:  u.planExpiresAt ? (u.planExpiresAt as Date).toISOString() : null,
    credits:        u.credits ?? 0,
    creditsTotal:   u.creditsTotal ?? 0,
    generationsUsed: u.generationsUsed ?? 0,
    projectCount:   countMap[u._id.toString()] ?? 0,
    createdAt:      (u.createdAt as Date).toISOString(),
  }))

  const projectRows: ProjectRow[] = (projectsRaw as any[]).map(p => ({
    _id:       p._id.toString(),
    userId:    p.userId,
    userEmail: emailMap[p.userId] ?? p.userId,
    name:      p.name,
    prompt:    p.prompt,
    createdAt: (p.createdAt as Date).toISOString(),
  }))

  const orderRows: OrderRow[] = (ordersRaw as any[]).map(o => ({
    _id:            o._id.toString(),
    orderId:        o.orderId,
    userId:         o.userId,
    userEmail:      emailMap[o.userId] ?? o.userId,
    type:           o.type,
    plan:           o.plan ?? null,
    billing:        o.billing ?? 'monthly',
    creditsHtml:    o.creditsHtml ?? 0,
    amount:         o.amount,
    status:         o.status,
    expiresAt:      (o.expiresAt as Date).toISOString(),
    activatedAt:    o.activatedAt ? (o.activatedAt as Date).toISOString() : null,
    adminNote:      o.adminNote ?? '',
    paymentProofUrl: o.paymentProofUrl ?? null,
    createdAt:      (o.createdAt as Date).toISOString(),
  }))

  return {
    stats: {
      totalUsers,
      totalProjects,
      activeUsers: activeUserIds.length,
      revenueThisMonth: (monthRevenue as any[])[0]?.total ?? 0,
    },
    userRows,   usersTotal,   usersPage: up,
    projectRows, projectsTotal, projectsPage: pp,
    orderRows,  ordersTotal,  ordersPage: op,
    pendingCount,
    meId: sessionUserId,
  }
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const raw = await searchParams
  const sp: Record<string, string> = {}
  Object.entries(raw).forEach(([k, v]) => { if (typeof v === 'string') sp[k] = v })

  const data = await getAdminData(session.user.id, sp)
  if (!data) redirect('/editor')

  const {
    stats,
    userRows,   usersTotal,   usersPage,
    projectRows, projectsTotal, projectsPage,
    orderRows,  ordersTotal,  ordersPage,
    pendingCount,
    meId,
  } = data

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <Logo iconSize={30} uid="admin-h" />
          <div className="h-5 w-px bg-gray-200 mx-0.5" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">Quản trị</span>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-slate-900 text-white px-2 py-0.5 rounded-md leading-5">
              Admin
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {pendingCount > 0 && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                {pendingCount} đơn chờ xử lý
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Tổng người dùng',     value: stats.totalUsers,    icon: <Users          className="w-5 h-5 text-blue-500"   />, bg: 'bg-blue-50'   },
            { label: 'Hoạt động (30 ngày)',  value: stats.activeUsers,   icon: <Activity       className="w-5 h-5 text-green-500"  />, bg: 'bg-green-50'  },
            { label: 'Tổng nội dung đã tạo', value: stats.totalProjects, icon: <LayoutTemplate className="w-5 h-5 text-purple-500" />, bg: 'bg-purple-50' },
            { label: 'Doanh thu tháng này',  value: stats.revenueThisMonth.toLocaleString('vi-VN') + 'đ', icon: <TrendingUp className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50' },
          ].map(({ label, value, icon, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>{icon}</div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-gray-900 truncate">
                  {typeof value === 'number' ? value.toLocaleString('vi-VN') : value}
                </p>
                <p className="text-xs text-gray-500 leading-tight">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <Suspense>
          <AdminDashboard
            initialOrders={orderRows}   ordersTotal={ordersTotal}   ordersPage={ordersPage}
            initialUsers={userRows}     usersTotal={usersTotal}     usersPage={usersPage}
            initialProjects={projectRows} projectsTotal={projectsTotal} projectsPage={projectsPage}
            pendingCount={pendingCount}
            meId={meId}
          />
        </Suspense>
      </main>
    </div>
  )
}
