import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Project from '@/models/Project'
import Link from 'next/link'
import AdminDashboard, { type UserRow, type ProjectRow } from '@/components/admin/AdminDashboard'
import Logo from '@/components/Logo'
import { Users, LayoutTemplate, Activity } from 'lucide-react'

export const runtime = 'nodejs'

async function getAdminData(sessionUserId: string) {
  await dbConnect()

  const me = await User.findById(sessionUserId).lean() as any
  const adminOk = !!(me?.isAdmin || me?.email === process.env.ADMIN_EMAIL)
  if (!adminOk) return null

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const [totalUsers, totalProjects, activeUserIds, users, projectCounts, projects] = await Promise.all([
    User.countDocuments(),
    Project.countDocuments(),
    Project.distinct('userId', { createdAt: { $gte: thirtyDaysAgo } }),
    User.find({}, { passwordHash: 0 }).sort({ createdAt: -1 }).lean(),
    Project.aggregate([{ $group: { _id: '$userId', count: { $sum: 1 } } }]),
    Project.find({}, { blockData: 0 }).sort({ createdAt: -1 }).lean(),
  ])

  const countMap = Object.fromEntries((projectCounts as any[]).map(c => [c._id, c.count]))
  const emailMap = Object.fromEntries((users as any[]).map(u => [u._id.toString(), u.email as string]))

  const userRows: UserRow[] = (users as any[]).map(u => ({
    _id: u._id.toString(),
    email: u.email as string,
    isActive: u.isActive !== false,
    isAdmin: !!u.isAdmin,
    paidUntil: u.paidUntil ? (u.paidUntil as Date).toISOString() : null,
    projectCount: countMap[u._id.toString()] ?? 0,
    createdAt: (u.createdAt as Date).toISOString(),
  }))

  const projectRows: ProjectRow[] = (projects as any[]).map(p => ({
    _id: p._id.toString(),
    userId: p.userId,
    userEmail: emailMap[p.userId] ?? p.userId,
    name: p.name,
    prompt: p.prompt,
    createdAt: (p.createdAt as Date).toISOString(),
  }))

  return {
    stats: { totalUsers, totalProjects, activeUsers: activeUserIds.length },
    userRows,
    projectRows,
    meId: sessionUserId,
  }
}

export default async function AdminPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const data = await getAdminData(session.user.id)
  if (!data) redirect('/editor')

  const { stats, userRows, projectRows, meId } = data

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo iconSize={28} uid="admin-h" />
            <span className="text-slate-300 text-sm font-medium">/ Admin</span>
          </div>
          <Link href="/editor" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Vào trình soạn thảo
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Tổng người dùng',             value: stats.totalUsers,    icon: <Users          className="w-5 h-5 text-blue-500"   />, bg: 'bg-blue-50'   },
            { label: 'Người dùng hoạt động (30 ngày)', value: stats.activeUsers, icon: <Activity       className="w-5 h-5 text-green-500"  />, bg: 'bg-green-50'  },
            { label: 'Tổng khối đã tạo',             value: stats.totalProjects, icon: <LayoutTemplate className="w-5 h-5 text-purple-500" />, bg: 'bg-purple-50' },
          ].map(({ label, value, icon, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                {icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{value.toLocaleString('vi-VN')}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard: tabs + tables */}
        <AdminDashboard
          initialUsers={userRows}
          initialProjects={projectRows}
          meId={meId}
        />

      </main>
    </div>
  )
}
