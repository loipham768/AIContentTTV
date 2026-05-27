'use client'
import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface Props {
  orderId: string
  onActivated: () => void
}

export default function ActivateOrderButton({ orderId, onActivated }: Props) {
  const [loading, setLoading] = useState(false)
  const [note, setNote]       = useState('')
  const [showNote, setShowNote] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  async function handleActivate() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setError(d.error ?? 'Lỗi kích hoạt')
        return
      }
      onActivated()
    } catch {
      setError('Lỗi kết nối')
    } finally {
      setLoading(false)
      setShowNote(false)
    }
  }

  if (showNote) {
    return (
      <div className="flex flex-col gap-1.5 min-w-[200px]">
        <input
          type="text"
          placeholder="Ghi chú (tuỳ chọn)"
          value={note}
          onChange={e => setNote(e.target.value)}
          className="text-xs px-2 py-1 border border-gray-200 rounded"
        />
        <div className="flex gap-1">
          <button
            onClick={handleActivate}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs font-semibold bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
            Xác nhận
          </button>
          <button
            onClick={() => setShowNote(false)}
            className="px-2 py-1 text-xs text-gray-500 border border-gray-200 rounded hover:bg-gray-50"
          >
            Huỷ
          </button>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowNote(true)}
      className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded hover:bg-emerald-100 transition-colors whitespace-nowrap"
    >
      <CheckCircle2 className="w-3 h-3" />
      Kích hoạt
    </button>
  )
}
