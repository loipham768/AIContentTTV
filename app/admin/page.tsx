import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Project from '@/models/Project'
import Order from '@/models/Order'
import Feedback from '@/models/Feedback'
import Review from '@/models/Review'
import PageView from '@/models/PageView'
import {
  Users, LayoutTemplate, TrendingUp, ShoppingCart,
  Star, MessageSquarePlus, ArrowUpRight, ArrowDownRight,
  Minus, Clock, CheckCircle2, XCircle, Hourglass,
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { robots: { index: false, follow: false } }
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function getDashboardData(userId: string) {
  await dbConnect()

  const me = await User.findById(userId).lean() as any
  if (!(me?.isAdmin || me?.email === process.env.ADMIN_EMAIL)) return null

  const now = new Date()

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(startOfMonth.getTime() - 1)
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const todayStr = now.toISOString().slice(0, 10)
  const startOfToday = new Date(todayStr + 'T00:00:00.000Z')

  // Build last-14-days date strings for chart
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(now.getTime() - (13 - i) * 24 * 60 * 60 * 1000)
    return d.toISOString().slice(0, 10)
  })

  const [
    totalUsers,
    newUsersThisMonth,
    newUsersLastMonth,
    activeUserIds,
    activeUserIds7d,
    totalProjects,
    projectsThisMonth,
    revenueThis,
    revenueLast,
    orderStatusCounts,
    planCounts,
    pendingCount,
    feedbackNew,
    reviewPending,
    recentOrders,
    recentUsers,
    totalFeedback,
    totalReviews,
    todayActiveUsers,
    todayAnonCount,
    dailyChart,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ createdAt: { $gte: startOfMonth } }),
    User.countDocuments({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
    Project.distinct('userId', { createdAt: { $gte: thirtyDaysAgo } }),
    Project.distinct('userId', { createdAt: { $gte: sevenDaysAgo } }),
    Project.countDocuments(),
    Project.countDocuments({ createdAt: { $gte: startOfMonth } }),
    Order.aggregate([
      { $match: { status: 'paid', activatedAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Order.aggregate([
      { $match: { status: 'paid', activatedAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    User.aggregate([
      { $group: { _id: '$plan', count: { $sum: 1 } } },
    ]),
    Order.countDocuments({
      $or: [
        { status: 'pending', expiresAt: { $gt: now } },
        { status: 'awaiting_confirmation' },
      ],
    }),
    Feedback.countDocuments({ status: 'new' }),
    Review.countDocuments({ isApproved: false }),
    Order.find().sort({ createdAt: -1 }).limit(6).lean(),
    User.find({}, { email: 1, fullName: 1, plan: 1, createdAt: 1 }).sort({ createdAt: -1 }).limit(6).lean(),
    Feedback.countDocuments(),
    Review.countDocuments(),
    // Today's active registered users
    User.find(
      { lastActiveAt: { $gte: startOfToday } },
      { email: 1, fullName: 1, plan: 1, lastActiveAt: 1 }
    ).sort({ lastActiveAt: -1 }).limit(20).lean(),
    // Today's anonymous visitors
    PageView.countDocuments({ date: todayStr, userId: null }),
    // Daily chart: last 14 days
    PageView.aggregate([
      { $match: { date: { $in: last14 } } },
      { $group: {
        _id: { date: '$date', anon: { $cond: [{ $eq: ['$userId', null] }, true, false] } },
        count: { $sum: 1 },
      }},
    ]),
  ])

  // Enrich recent orders with user emails
  const orderUserIds = (recentOrders as any[]).map((o: any) => o.userId)
  const orderEmailDocs = orderUserIds.length
    ? (await User.find({ _id: { $in: orderUserIds } }, { email: 1 }).lean() as any[])
    : []
  const emailMap: Record<string, string> = Object.fromEntries(orderEmailDocs.map((u: any) => [u._id.toString(), u.email as string]))

  const revenueThisMonth = (revenueThis as any[])[0]?.total ?? 0
  const revenueLastMonth = (revenueLast as any[])[0]?.total ?? 0

  const statusMap: Record<string, number> = Object.fromEntries(
    (orderStatusCounts as any[]).map((s: any) => [s._id, s.count])
  )
  const planMap: Record<string, number> = Object.fromEntries(
    (planCounts as any[]).map((p: any) => [p._id ?? 'free', p.count])
  )

  // Build chart: [{date, registered, anonymous}]
  const chartMap: Record<string, { registered: number; anonymous: number }> = {}
  for (const d of last14) chartMap[d] = { registered: 0, anonymous: 0 }
  for (const row of (dailyChart as any[])) {
    const date = row._id.date as string
    if (!chartMap[date]) continue
    if (row._id.anon) chartMap[date].anonymous = row.count
    else chartMap[date].registered = row.count
  }
  const activityChart = last14.map(date => ({
    date,
    label: date.slice(5), // 'MM-DD'
    registered: chartMap[date].registered,
    anonymous: chartMap[date].anonymous,
    total: chartMap[date].registered + chartMap[date].anonymous,
  }))

  return {
    totalUsers,
    newUsersThisMonth,
    newUsersLastMonth,
    activeUsers30d: activeUserIds.length,
    activeUsers7d: activeUserIds7d.length,
    totalProjects,
    projectsThisMonth,
    revenueThisMonth,
    revenueLastMonth,
    statusMap,
    planMap,
    pendingCount,
    feedbackNew,
    reviewPending,
    totalFeedback,
    totalReviews,
    todayActiveUsers: (todayActiveUsers as any[]).map((u: any) => ({
      email: u.email as string,
      fullName: u.fullName ?? '',
      plan: u.plan ?? 'free',
      lastActiveAt: (u.lastActiveAt as Date).toISOString(),
    })),
    todayAnonCount: todayAnonCount as number,
    activityChart,
    recentOrders: (recentOrders as any[]).map((o: any) => ({
      orderId: o.orderId,
      userEmail: emailMap[o.userId] ?? o.userId,
      plan: o.plan ?? null,
      type: o.type,
      amount: o.amount,
      status: o.status,
      expiresAt: (o.expiresAt as Date).toISOString(),
      createdAt: (o.createdAt as Date).toISOString(),
    })),
    recentUsers: (recentUsers as any[]).map((u: any) => ({
      email: u.email as string,
      fullName: u.fullName ?? '',
      plan: u.plan ?? 'free',
      createdAt: (u.createdAt as Date).toISOString(),
    })),
  }
}

function trend(current: number, previous: number) {
  if (previous === 0) return current > 0 ? { dir: 'up', pct: 100 } : { dir: 'flat', pct: 0 }
  const pct = Math.round(((current - previous) / previous) * 100)
  return { dir: pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat', pct: Math.abs(pct) }
}

const PLAN_LABELS: Record<string, string> = { free: 'Free', basic: 'Basic', pro: 'Pro', designer: 'Designer' }
const PLAN_COLORS: Record<string, string> = {
  free:     'bg-gray-200',
  basic:    'bg-blue-400',
  pro:      'bg-indigo-500',
  designer: 'bg-violet-600',
}
const PLAN_TEXT: Record<string, string> = {
  free:     'text-gray-600',
  basic:    'text-blue-600',
  pro:      'text-indigo-600',
  designer: 'text-violet-700',
}

const STATUS_LABEL: Record<string, string> = {
  paid: 'Đã thanh toán',
  pending: 'Chờ thanh toán',
  awaiting_confirmation: 'Chờ xác nhận',
  cancelled: 'Đã huỷ',
  expired: 'Hết hạn',
}
const STATUS_DOT: Record<string, string> = {
  paid: 'bg-emerald-400',
  pending: 'bg-amber-400',
  awaiting_confirmation: 'bg-blue-400',
  cancelled: 'bg-gray-300',
  expired: 'bg-red-400',
}
const STATUS_BADGE: Record<string, string> = {
  paid: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  awaiting_confirmation: 'bg-blue-50 text-blue-700',
  cancelled: 'bg-gray-100 text-gray-500',
  expired: 'bg-red-50 text-red-600',
}

function getEffectiveStatus(status: string, expiresAt: string) {
  if (status === 'pending' && new Date(expiresAt) < new Date()) return 'expired'
  return status
}

export default async function AdminPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const d = await getDashboardData(session.user.id)
  if (!d) redirect('/login')

  const userTrend = trend(d.newUsersThisMonth, d.newUsersLastMonth)
  const revTrend = trend(d.revenueThisMonth, d.revenueLastMonth)

  const totalOrders = Object.values(d.statusMap).reduce((a, b) => a + b, 0)
  const totalPlanUsers = Object.values(d.planMap).reduce((a, b) => a + b, 0)

  const PLANS = ['free', 'basic', 'pro', 'designer']

  return (
    <div className="px-4 sm:px-6 py-6 space-y-6">

      {/* ── Row 1: Key metrics ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total users */}
        <StatCard
          label="Tổng người dùng"
          value={d.totalUsers.toLocaleString('vi-VN')}
          sub={`+${d.newUsersThisMonth} tháng này`}
          trend={userTrend}
          icon={<Users className="w-5 h-5 text-blue-500" />}
          bg="bg-blue-50"
          href="/admin/users"
        />
        {/* Revenue */}
        <StatCard
          label="Doanh thu tháng này"
          value={d.revenueThisMonth.toLocaleString('vi-VN') + 'đ'}
          sub={`Tháng trước: ${d.revenueLastMonth.toLocaleString('vi-VN')}đ`}
          trend={revTrend}
          icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
          bg="bg-emerald-50"
          href="/admin/orders"
        />
        {/* Active users */}
        <StatCard
          label="Người dùng hoạt động"
          value={d.activeUsers30d.toLocaleString('vi-VN')}
          sub={`7 ngày: ${d.activeUsers7d} · tỉ lệ ${d.totalUsers > 0 ? Math.round((d.activeUsers30d / d.totalUsers) * 100) : 0}%`}
          icon={<Users className="w-5 h-5 text-indigo-500" />}
          bg="bg-indigo-50"
        />
        {/* Content */}
        <StatCard
          label="Nội dung đã tạo"
          value={d.totalProjects.toLocaleString('vi-VN')}
          sub={`+${d.projectsThisMonth} tháng này`}
          icon={<LayoutTemplate className="w-5 h-5 text-purple-500" />}
          bg="bg-purple-50"
          href="/admin/projects"
        />
      </div>

      {/* ── Row 2: Pending alerts ── */}
      {(d.pendingCount > 0 || d.feedbackNew > 0 || d.reviewPending > 0) && (
        <div className="flex flex-wrap gap-3">
          {d.pendingCount > 0 && (
            <Link href="/admin/orders" className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <ShoppingCart className="w-4 h-4" />
              {d.pendingCount} đơn chờ xử lý
            </Link>
          )}
          {d.feedbackNew > 0 && (
            <Link href="/admin/feedback" className="flex items-center gap-2 px-4 py-2.5 bg-teal-50 border border-teal-200 rounded-xl text-sm font-medium text-teal-800 hover:bg-teal-100 transition-colors">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <MessageSquarePlus className="w-4 h-4" />
              {d.feedbackNew} góp ý mới chưa xem
            </Link>
          )}
          {d.reviewPending > 0 && (
            <Link href="/admin/reviews" className="flex items-center gap-2 px-4 py-2.5 bg-violet-50 border border-violet-200 rounded-xl text-sm font-medium text-violet-800 hover:bg-violet-100 transition-colors">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <Star className="w-4 h-4" />
              {d.reviewPending} đánh giá chờ duyệt
            </Link>
          )}
        </div>
      )}

      {/* ── Row 3: Plan distribution + Order breakdown ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Plan distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-sm">Phân phối gói</h3>
            <Link href="/admin/users" className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1">
              Xem users <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {PLANS.map(plan => {
              const count = d.planMap[plan] ?? 0
              const pct = totalPlanUsers > 0 ? (count / totalPlanUsers) * 100 : 0
              return (
                <div key={plan}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-semibold ${PLAN_TEXT[plan] ?? 'text-gray-600'}`}>
                      {PLAN_LABELS[plan] ?? plan}
                    </span>
                    <span className="text-xs text-gray-500">{count.toLocaleString('vi-VN')} người · {pct.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${PLAN_COLORS[plan] ?? 'bg-gray-400'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <p className="mt-4 text-xs text-gray-400 border-t border-gray-50 pt-3">
            Tổng {totalPlanUsers.toLocaleString('vi-VN')} tài khoản
          </p>
        </div>

        {/* Order breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-sm">Trạng thái đơn hàng</h3>
            <Link href="/admin/orders" className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1">
              Xem đơn <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['paid', 'pending', 'awaiting_confirmation', 'expired', 'cancelled'].map(status => {
              const count = d.statusMap[status] ?? 0
              const pct = totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0
              const icons: Record<string, React.ReactNode> = {
                paid: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
                pending: <Clock className="w-4 h-4 text-amber-500" />,
                awaiting_confirmation: <Hourglass className="w-4 h-4 text-blue-500" />,
                cancelled: <XCircle className="w-4 h-4 text-gray-400" />,
                expired: <XCircle className="w-4 h-4 text-red-400" />,
              }
              return (
                <div key={status} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  {icons[status]}
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900">{count.toLocaleString('vi-VN')}</p>
                    <p className="text-xs text-gray-400 leading-tight truncate">{STATUS_LABEL[status]} · {pct}%</p>
                  </div>
                </div>
              )
            })}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <ShoppingCart className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm font-bold text-gray-900">{totalOrders.toLocaleString('vi-VN')}</p>
                <p className="text-xs text-gray-400 leading-tight">Tổng tất cả</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Row 4: Recent orders + Recent signups ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
            <h3 className="font-semibold text-gray-900 text-sm">Đơn hàng gần đây</h3>
            <Link href="/admin/orders" className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1">
              Xem tất cả <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {d.recentOrders.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-gray-400">Chưa có đơn hàng.</p>
            )}
            {d.recentOrders.map((o, i) => {
              const effStatus = getEffectiveStatus(o.status, o.expiresAt)
              return (
                <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/60 transition-colors">
                  <span className={`flex-shrink-0 w-2 h-2 rounded-full ${STATUS_DOT[effStatus] ?? 'bg-gray-300'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{o.userEmail}</p>
                    <p className="text-xs text-gray-400">{o.plan ? `Gói ${o.plan}` : o.type} · {o.amount.toLocaleString('vi-VN')}đ</p>
                  </div>
                  <span className={`flex-shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[effStatus] ?? 'bg-gray-100 text-gray-500'}`}>
                    {STATUS_LABEL[effStatus] ?? effStatus}
                  </span>
                  <span className="flex-shrink-0 text-[11px] text-gray-400 hidden sm:block">
                    {`${new Date(o.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}, ${new Date(o.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent signups */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
            <h3 className="font-semibold text-gray-900 text-sm">Người dùng mới</h3>
            <Link href="/admin/users" className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1">
              Xem tất cả <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {d.recentUsers.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-gray-400">Chưa có người dùng.</p>
            )}
            {d.recentUsers.map((u, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/60 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">
                    {(u.fullName || u.email).charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{u.fullName || u.email}</p>
                  {u.fullName && <p className="text-xs text-gray-400 truncate">{u.email}</p>}
                </div>
                <span className={`flex-shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${PLAN_TEXT[u.plan] ?? 'text-gray-600'} bg-gray-50 border border-gray-100`}>
                  {PLAN_LABELS[u.plan] ?? u.plan}
                </span>
                <span className="flex-shrink-0 text-[11px] text-gray-400 hidden sm:block">
                  {`${new Date(u.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}, ${new Date(u.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Row 5: Today's activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Active users today */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Hoạt động hôm nay</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {d.todayActiveUsers.length} thành viên · {d.todayAnonCount} khách ẩn danh
              </p>
            </div>
            <Link href="/admin/users" className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1">
              Xem users <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
            {d.todayActiveUsers.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-gray-400">Chưa có thành viên nào hoạt động hôm nay.</p>
            )}
            {d.todayActiveUsers.map((u, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/60 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">
                    {(u.fullName || u.email).charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{u.fullName || u.email}</p>
                  {u.fullName && <p className="text-xs text-gray-400 truncate">{u.email}</p>}
                </div>
                <span className={`flex-shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${PLAN_TEXT[u.plan] ?? 'text-gray-600'} bg-gray-50 border border-gray-100`}>
                  {PLAN_LABELS[u.plan] ?? u.plan}
                </span>
                <span className="flex-shrink-0 text-[11px] text-gray-400 hidden sm:block">
                  {new Date(u.lastActiveAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 14-day activity chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 text-sm mb-4">Lượt truy cập 14 ngày qua</h3>
          <ActivityChart data={d.activityChart} />
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-400 inline-block" /> Thành viên
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2.5 h-2.5 rounded-sm bg-gray-200 inline-block" /> Ẩn danh
            </span>
          </div>
        </div>

      </div>

      {/* ── Row 6: Interaction summary ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <SummaryCard label="Tổng đơn hàng" value={totalOrders} href="/admin/orders" icon={<ShoppingCart className="w-4 h-4 text-indigo-400" />} />
        <SummaryCard label="Tổng dự án" value={d.totalProjects} href="/admin/projects" icon={<LayoutTemplate className="w-4 h-4 text-purple-400" />} />
        <SummaryCard label="Tổng góp ý" value={d.totalFeedback} href="/admin/feedback" icon={<MessageSquarePlus className="w-4 h-4 text-teal-400" />} badge={d.feedbackNew > 0 ? `${d.feedbackNew} mới` : undefined} />
        <SummaryCard label="Tổng đánh giá" value={d.totalReviews} href="/admin/reviews" icon={<Star className="w-4 h-4 text-amber-400" />} badge={d.reviewPending > 0 ? `${d.reviewPending} chờ` : undefined} />
      </div>

    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
  label, value, sub, trend: t, icon, bg, href,
}: {
  label: string
  value: string
  sub?: string
  trend?: { dir: string; pct: number }
  icon: React.ReactNode
  bg: string
  href?: string
}) {
  const TrendIcon = t?.dir === 'up' ? ArrowUpRight : t?.dir === 'down' ? ArrowDownRight : Minus
  const trendColor = t?.dir === 'up' ? 'text-emerald-600' : t?.dir === 'down' ? 'text-red-500' : 'text-gray-400'

  const inner = (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-sm transition-all h-full">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>{icon}</div>
        {t && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${trendColor}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            {t.pct > 0 ? `${t.pct}%` : '—'}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )

  return href ? <Link href={href} className="block">{inner}</Link> : inner
}

function ActivityChart({ data }: {
  data: { date: string; label: string; registered: number; anonymous: number; total: number }[]
}) {
  const maxVal = Math.max(...data.map(d => d.total), 1)
  const COL = 32   // units per column — wide enough for label
  const BAR_W = 20
  const BAR_PAD = (COL - BAR_W) / 2
  const H = 72     // bar area height
  const LABEL_H = 16
  const W = data.length * COL

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H + LABEL_H}`} className="w-full" preserveAspectRatio="none" style={{ height: 88 }}>
        {data.map((d, i) => {
          const x = i * COL + BAR_PAD
          const regH = Math.round((d.registered / maxVal) * H)
          const anonH = Math.round((d.anonymous / maxVal) * H)
          const totalH = regH + anonH
          const dayNum = d.date.slice(8) // "DD" only — 2 chars, fits cleanly
          // Show label every 2nd bar to avoid crowding on small screens
          const showLabel = i % 2 === 0

          return (
            <g key={d.date}>
              {anonH > 0 && (
                <rect x={x} y={H - anonH} width={BAR_W} height={anonH} rx={2} fill="#e5e7eb" />
              )}
              {regH > 0 && (
                <rect x={x} y={H - totalH} width={BAR_W} height={regH} rx={2} fill="#818cf8" />
              )}
              {totalH === 0 && (
                <rect x={x} y={H - 3} width={BAR_W} height={3} rx={1} fill="#f3f4f6" />
              )}
              {showLabel && (
                <text
                  x={x + BAR_W / 2}
                  y={H + 11}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#9ca3af"
                >
                  {dayNum}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function SummaryCard({
  label, value, href, icon, badge,
}: {
  label: string
  value: number
  href: string
  icon: React.ReactNode
  badge?: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 px-4 py-3.5 hover:border-indigo-100 hover:shadow-sm transition-all"
    >
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-base font-bold text-gray-900">{value.toLocaleString('vi-VN')}</p>
        <p className="text-xs text-gray-400 leading-tight truncate">{label}</p>
      </div>
      {badge && (
        <span className="flex-shrink-0 text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  )
}
