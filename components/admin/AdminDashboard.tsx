'use client'
import { useState } from 'react'
import { Users, LayoutTemplate, ShoppingCart, CheckCircle2, Clock, XCircle } from 'lucide-react'
import ActivateUserButton from './ActivateUserButton'
import ToggleUserButton from './ToggleUserButton'
import DeleteProjectButton from './DeleteProjectButton'
import ActivateOrderButton from './ActivateOrderButton'
import RejectOrderButton from './RejectOrderButton'

export interface UserRow {
  _id: string
  email: string
  isActive: boolean
  isAdmin: boolean
  paidUntil: string | null
  plan: string
  credits: number
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

export interface OrderRow {
  _id: string
  orderId: string
  userId: string
  userEmail: string
  type: string
  plan: string | null
  billing: string
  creditsHtml: number
  amount: number
  status: string
  expiresAt: string
  activatedAt: string | null
  adminNote: string
  createdAt: string
}

interface Props {
  initialUsers: UserRow[]
  initialProjects: ProjectRow[]
  initialOrders: OrderRow[]
  meId: string
}

type Tab = 'users' | 'content' | 'orders'

const PLAN_LABELS: Record<string, string> = {
  free: 'Free', basic: 'Basic', pro: 'Pro',
}

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-700',
  paid:      'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-gray-100 text-gray-600',
  expired:   'bg-red-100 text-red-600',
}

function formatVnd(n: number) {
  return n.toLocaleString('vi-VN') + 'đ'
}

export default function AdminDashboard({ initialUsers, initialProjects, initialOrders, meId }: Props) {
  const [tab, setTab]         = useState<Tab>('orders')
  const [users, setUsers]     = useState(initialUsers)
  const [projects, setProjects] = useState(initialProjects)
  const [orders, setOrders]   = useState(initialOrders)

  function updateUser(userId: string, patch: Partial<UserRow>) {
    setUsers(prev => prev.map(u => u._id === userId ? { ...u, ...patch } : u))
  }

  function updateOrder(orderId: string, patch: Partial<OrderRow>) {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, ...patch } : o))
  }

  const tabBtn = (t: Tab, icon: React.ReactNode, label: string, count: number, urgent = false) => (
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
        urgent ? 'bg-amber-100 text-amber-700' : tab === t ? 'bg-slate-100 text-slate-600' : 'bg-slate-200/80 text-slate-500'
      }`}>
        {count}
      </span>
    </button>
  )

  const pendingCount = orders.filter(o => o.status === 'pending').length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {tabBtn('orders',  <ShoppingCart  className="w-4 h-4" />, 'Đơn hàng',    orders.length, pendingCount > 0)}
        {tabBtn('users',   <Users         className="w-4 h-4" />, 'Người dùng',  users.length)}
        {tabBtn('content', <LayoutTemplate className="w-4 h-4" />, 'Nội dung',   projects.length)}
      </div>

      {/* ── Orders tab ── */}
      {tab === 'orders' && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-semibold text-gray-900">Đơn hàng</h2>
            {pendingCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5" /> {pendingCount} đơn chờ thanh toán
              </span>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {['Mã đơn', 'Người dùng', 'Gói / Credits', 'Số tiền', 'Trạng thái', 'Tạo lúc', 'Hành động'].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-10 text-center text-sm text-gray-400">Chưa có đơn hàng nào.</td></tr>
                )}
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs font-bold text-indigo-700">{order.orderId}</span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-600 max-w-[160px] truncate">{order.userEmail}</td>
                    <td className="px-4 py-3.5 text-xs text-gray-700">
                      {order.type === 'subscription'
                        ? `${PLAN_LABELS[order.plan ?? ''] ?? order.plan} — ${order.billing === 'yearly' ? 'Năm' : 'Tháng'}`
                        : `${order.creditsHtml} lượt`}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-gray-900 whitespace-nowrap">{formatVnd(order.amount)}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {order.status === 'paid' && <CheckCircle2 className="w-3 h-3" />}
                        {order.status === 'pending' && <Clock className="w-3 h-3" />}
                        {(order.status === 'cancelled' || order.status === 'expired') && <XCircle className="w-3 h-3" />}
                        {order.status === 'pending' ? 'Chờ TT' : order.status === 'paid' ? 'Đã TT' : order.status === 'cancelled' ? 'Huỷ' : 'Hết hạn'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleString('vi-VN', { hour12: false, day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3.5">
                      {order.status === 'pending' ? (
                        <div className="flex items-start gap-1.5 flex-wrap">
                          <ActivateOrderButton
                            orderId={order.orderId}
                            onActivated={() => updateOrder(order.orderId, { status: 'paid', activatedAt: new Date().toISOString() })}
                          />
                          <RejectOrderButton
                            orderId={order.orderId}
                            onRejected={() => updateOrder(order.orderId, { status: 'cancelled' })}
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Users tab ── */}
      {tab === 'users' && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Danh sách người dùng</h2>
            <span className="text-xs text-gray-400">{users.length} người dùng</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {['Email', 'Gói', 'Credits', 'Khối', 'Ngày đăng ký', 'Vai trò', 'Hành động'].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="font-medium text-gray-900">{user.email}</span>
                      {user._id === meId && <span className="ml-2 text-xs text-blue-500">(bạn)</span>}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                        user.plan === 'pro' ? 'bg-amber-100 text-amber-700' :
                        user.plan === 'basic' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>{PLAN_LABELS[user.plan] ?? user.plan}</span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-600">{user.credits}</td>
                    <td className="px-4 py-3.5 text-center font-medium text-gray-700">{user.projectCount}</td>
                    <td className="px-4 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        user.isAdmin ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
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
                      ) : <span className="text-xs text-gray-400">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Content tab ── */}
      {tab === 'content' && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Nội dung đã tạo</h2>
            <span className="text-xs text-gray-400">{projects.length} nội dung</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {['Tên dự án', 'Người dùng', 'Nội dung yêu cầu', 'Ngày tạo', ''].map((h, i) => (
                    <th key={i} className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {projects.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-400">Chưa có nội dung.</td></tr>
                )}
                {projects.map(project => (
                  <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5">
                      <span className="font-medium text-gray-900 block truncate max-w-[160px]">{project.name}</span>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-gray-500 whitespace-nowrap">{project.userEmail}</td>
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
