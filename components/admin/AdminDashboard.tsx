'use client'
import { useState } from 'react'
import { Users, LayoutTemplate } from 'lucide-react'
import ActivateUserButton from './ActivateUserButton'
import ToggleUserButton from './ToggleUserButton'
import DeleteProjectButton from './DeleteProjectButton'

export interface UserRow {
  _id: string
  email: string
  isActive: boolean
  isAdmin: boolean
  paidUntil: string | null
  projectCount: number
  createdAt: string
}

export interface ProjectRow {
  _id: string
  userId: string
  userEmail: string
  name: string
  prompt: string
  createdAt: string
}

interface Props {
  initialUsers: UserRow[]
  initialProjects: ProjectRow[]
  meId: string
}

type Tab = 'users' | 'content'

export default function AdminDashboard({ initialUsers, initialProjects, meId }: Props) {
  const [tab, setTab] = useState<Tab>('users')
  const [users, setUsers] = useState(initialUsers)
  const [projects, setProjects] = useState(initialProjects)

  function updateUser(userId: string, patch: Partial<UserRow>) {
    setUsers(prev => prev.map(u => u._id === userId ? { ...u, ...patch } : u))
  }

  const tabBtn = (t: Tab, icon: React.ReactNode, label: string, count: number) => (
    <button
      key={t}
      onClick={() => setTab(t)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        tab === t
          ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
          : 'text-slate-500 hover:text-slate-700 hover:bg-white/60'
      }`}
    >
      {icon}
      {label}
      <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
        tab === t ? 'bg-slate-100 text-slate-600' : 'bg-slate-200/80 text-slate-500'
      }`}>
        {count}
      </span>
    </button>
  )

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {tabBtn('users',   <Users         className="w-4 h-4" />, 'Người dùng', users.length)}
        {tabBtn('content', <LayoutTemplate className="w-4 h-4" />, 'Nội dung',   projects.length)}
      </div>

      {/* ── Users tab ── */}
      {tab === 'users' && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Danh sách người dùng</h2>
            <span className="text-xs text-gray-400">{users.length} người dùng</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {['Email', 'Đăng ký', 'Khối', 'Kích hoạt đến', 'Vai trò', 'Hành động'].map(h => (
                    <th key={h} className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map(user => {
                  const paidDate = user.paidUntil ? new Date(user.paidUntil) : null
                  const isPaid = paidDate && paidDate > new Date()
                  const daysLeft = paidDate ? Math.ceil((paidDate.getTime() - Date.now()) / 86400_000) : null

                  return (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3.5">
                        <span className="font-medium text-gray-900">{user.email}</span>
                        {user._id === meId && <span className="ml-2 text-xs text-blue-500">(bạn)</span>}
                      </td>
                      <td className="px-6 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-3.5 text-center font-medium text-gray-700">
                        {user.projectCount}
                      </td>
                      <td className="px-6 py-3.5 text-xs whitespace-nowrap">
                        {paidDate ? (
                          isPaid ? (
                            <span className="text-emerald-700 font-medium">
                              Còn {daysLeft} ngày · {paidDate.toLocaleDateString('vi-VN')}
                            </span>
                          ) : (
                            <span className="text-red-500 font-medium">
                              Hết hạn · {paidDate.toLocaleDateString('vi-VN')}
                            </span>
                          )
                        ) : user.isActive ? (
                          <span className="text-slate-400">Thủ công</span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                          user.isAdmin ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {user.isAdmin ? 'Admin' : 'Người dùng'}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        {user._id !== meId ? (
                          <div className="flex items-center gap-2 flex-wrap">
                            <ActivateUserButton
                              userId={user._id}
                              isActive={user.isActive}
                              paidUntil={user.paidUntil}
                              onUpdate={patch => updateUser(user._id, patch)}
                            />
                            <ToggleUserButton
                              userId={user._id}
                              field="isAdmin"
                              currentValue={user.isAdmin}
                              label={['Bỏ Admin', 'Cấp Admin']}
                              variant="neutral"
                              onToggle={v => updateUser(user._id, { isAdmin: v })}
                            />
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Content tab ── */}
      {tab === 'content' && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Danh sách nội dung đã tạo</h2>
            <span className="text-xs text-gray-400">{projects.length} nội dung</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {['Tên dự án', 'Người dùng', 'Nội dung yêu cầu', 'Ngày tạo', ''].map((h, i) => (
                    <th key={i} className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-400">
                      Chưa có nội dung nào được tạo.
                    </td>
                  </tr>
                )}
                {projects.map(project => (
                  <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5">
                      <span className="font-medium text-gray-900 block truncate max-w-[160px]">{project.name}</span>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {project.userEmail}
                    </td>
                    <td className="px-6 py-3.5 max-w-[280px]">
                      <p className="text-xs text-gray-600 line-clamp-2">{project.prompt}</p>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(project.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-3.5">
                      <DeleteProjectButton
                        projectId={project._id}
                        onDelete={id => setProjects(prev => prev.filter(p => p._id !== id))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
