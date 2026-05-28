'use client'
import { useState } from 'react'
import { XCircle, Loader2 } from 'lucide-react'

interface Props {
  orderId: string
  onRejected: () => void
}

export default function RejectOrderButton({ orderId, onRejected }: Props) {
  const [loading,   setLoading]   = useState(false)
  const [reason,    setReason]    = useState('')
  const [showForm,  setShowForm]  = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  async function handleReject() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setError(d.error ?? 'Lỗi huỷ đơn')
        return
      }
      onRejected()
    } catch {
      setError('Lỗi kết nối')
    } finally {
      setLoading(false)
      setShowForm(false)
    }
  }

  if (showForm) {
    return (
      <div className="flex flex-col gap-1.5 min-w-[200px]">
        <input
          type="text"
          placeholder="Lý do huỷ (tuỳ chọn)"
          value={reason}
          onChange={e => setReason(e.target.value)}
          className="text-xs px-2 py-1 border border-gray-200 rounded"
        />
        <div className="flex gap-1">
          <button
            onClick={handleReject}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs font-semibold bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}
            Xác nhận huỷ
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="px-2 py-1 text-xs text-gray-500 border border-gray-200 rounded hover:bg-gray-50"
          >
            Không
          </button>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowForm(true)}
      className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 transition-colors whitespace-nowrap"
    >
      <XCircle className="w-3 h-3" />
      Huỷ đơn
    </button>
  )
}
