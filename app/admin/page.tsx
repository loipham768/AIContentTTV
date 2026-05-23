import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Project from '@/models/Project'
import Link from 'next/link'
import ToggleUserButton from '@/components/admin/ToggleUserButton'
import { Users, LayoutTemplate, Activity, ShieldCheck } from 'lucide-react'

export const runtime = 'nodejs'

async function getAdminData(sessionUserId: string) {
  await dbConnect()

  const me = await User.findById(sessionUserId).lean() as any
  const adminOk = !!(me?.isAdmin || me?.email === process.env.ADMIN_EMAIL)
  if (!adminOk) return null

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const [totalUsers, totalProjects, activeUserIds, users, projectCounts] = await Promise.all([
    User.countDocuments(),
    Project.countDocuments(),
    Project.distinct('userId', { createdAt: { $gte: thirtyDaysAgo } }),
    User.find({}, { passwordHash: 0 }).sort({ createdAt: -1 }).lean(),
    Project.aggregate([{ $group: { _id: '$userId', count: { $sum: 1 } } }]),
  ])

  const countMap = Object.fromEntries((projectCounts as any[]).map(c => [c._id, c.count]))

  return {
    stats: { totalUsers, totalProjects, activeUsers: activeUserIds.length },
    users: (users as any[]).map(u => ({
      _id: u._id.toString(),
      email: u.email as string,
      isActive: u.isActive !== false,
      isAdmin: !!u.isAdmin,
      projectCount: countMap[u._id.toString()] ?? 0,
      createdAt: (u.createdAt as Date).toISOString(),
    })),
    meId: sessionUserId,
  }
}

export default async function AdminPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const data = await getAdminData(session.user.id)
  if (!data) redirect('/editor')

  const { stats, users, meId } = data

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Admin — AI Content Booster</span>
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
            { label: 'Tổng người dùng', value: stats.totalUsers, icon: <Users className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50' },
            { label: 'Người dùng hoạt động (30 ngày)', value: stats.activeUsers, icon: <Activity className="w-5 h-5 text-green-500" />, bg: 'bg-green-50' },
            { label: 'Tổng khối đã tạo', value: stats.totalProjects, icon: <LayoutTemplate className="w-5 h-5 text-purple-500" />, bg: 'bg-purple-50' },
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

        {/* Users table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Danh sách người dùng</h2>
            <span className="text-xs text-gray-400">{users.length} người dùng</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ngày đăng ký</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Số khối</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Trạng thái</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Vai trò</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5">
                      <span className="font-medium text-gray-900">{user.email}</span>
                      {user._id === meId && <span className="ml-2 text-xs text-blue-500">(bạn)</span>}
                    </td>
                    <td className="px-6 py-3.5 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-3.5 text-center font-medium text-gray-700">
                      {user.projectCount}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {user.isActive ? 'Hoạt động' : 'Đã khoá'}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${user.isAdmin ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {user.isAdmin ? 'Admin' : 'Người dùng'}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      {user._id !== meId ? (
                        <div className="flex items-center gap-2">
                          <ToggleUserButton
                            userId={user._id}
                            field="isActive"
                            currentValue={user.isActive}
                            label={['Khoá tài khoản', 'Mở khoá']}
                            variant="danger"
                          />
                          <ToggleUserButton
                            userId={user._id}
                            field="isAdmin"
                            currentValue={user.isAdmin}
                            label={['Bỏ quyền Admin', 'Cấp quyền Admin']}
                            variant="neutral"
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  )
}
