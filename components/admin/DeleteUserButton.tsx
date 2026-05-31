'use client'
import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'

interface Props {
  userId: string
  onDelete: () => void
}

export default function DeleteUserButton({ userId, onDelete }: Props) {
  const [pending, setPending] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (!pending) { setPending(true); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
      if (res.ok) onDelete()
      else alert('Xoá thất bại.')
    } finally { setLoading(false); setPending(false) }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors disabled:opacity-50 ${
        pending
          ? 'text-red-700 bg-red-50 border-red-200'
          : 'text-slate-400 bg-white border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
      }`}
    >
      {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
      {pending ? 'Xác nhận?' : 'Xoá'}
    </button>
  )
}
