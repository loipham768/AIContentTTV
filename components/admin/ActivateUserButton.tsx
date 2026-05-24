'use client'
import { useState, useRef, useEffect } from 'react'
import { CheckCircle, XCircle, ChevronDown, Loader2 } from 'lucide-react'

interface Props {
  userId: string
  isActive: boolean
  paidUntil: string | null
  onUpdate: (patch: { isActive: boolean; paidUntil: string | null }) => void
}

const PLANS = [
  { label: '+30 ngày', days: 30 },
  { label: '+90 ngày', days: 90 },
  { label: '+1 năm', days: 365 },
]

export default function ActivateUserButton({ userId, isActive, paidUntil, onUpdate }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  async function activate(days: number) {
    setLoading(true)
    setOpen(false)
    const base = paidUntil && new Date(paidUntil) > new Date() ? new Date(paidUntil) : new Date()
    const newDate = new Date(base.getTime() + days * 86400_000)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: true, paidUntil: newDate.toISOString() }),
      })
      if (res.ok) onUpdate({ isActive: true, paidUntil: newDate.toISOString() })
      else alert('Cập nhật thất bại.')
    } finally { setLoading(false) }
  }

  async function deactivate() {
    setLoading(true)
    setOpen(false)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: false, paidUntil: null }),
      })
      if (res.ok) onUpdate({ isActive: false, paidUntil: null })
      else alert('Cập nhật thất bại.')
    } finally { setLoading(false) }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        disabled={loading}
        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors disabled:opacity-50 ${
          isActive
            ? 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
            : 'text-slate-500 bg-slate-50 border-slate-200 hover:bg-slate-100'
        }`}
      >
        {loading
          ? <Loader2 className="w-3 h-3 animate-spin" />
          : isActive
            ? <CheckCircle className="w-3 h-3" />
            : <XCircle className="w-3 h-3" />
        }
        {isActive ? 'Hoạt động' : 'Đã khoá'}
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-xl border border-slate-200 shadow-lg z-30 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Gia hạn</p>
          </div>
          {PLANS.map(({ label, days }) => (
            <button
              key={days}
              onClick={() => activate(days)}
              className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              {label}
            </button>
          ))}
          <div className="border-t border-slate-100">
            <button
              onClick={deactivate}
              className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
            >
              Khoá tài khoản
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
