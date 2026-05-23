'use client'
import { useState } from 'react'

interface Props {
  userId: string
  field: 'isActive' | 'isAdmin'
  currentValue: boolean
  label: [string, string] // [true label, false label]
  variant: 'danger' | 'neutral'
}

export default function ToggleUserButton({ userId, field, currentValue, label, variant }: Props) {
  const [value, setValue] = useState(currentValue)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !value }),
      })
      if (res.ok) setValue(v => !v)
      else alert('Cập nhật thất bại. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const isActive = value
  const dangerStyle = isActive
    ? 'text-red-600 hover:bg-red-50 border-red-200'
    : 'text-green-600 hover:bg-green-50 border-green-200'
  const neutralStyle = isActive
    ? 'text-gray-600 hover:bg-gray-50 border-gray-200'
    : 'text-blue-600 hover:bg-blue-50 border-blue-200'

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors disabled:opacity-50 ${variant === 'danger' ? dangerStyle : neutralStyle}`}
    >
      {loading ? '...' : isActive ? label[0] : label[1]}
    </button>
  )
}
