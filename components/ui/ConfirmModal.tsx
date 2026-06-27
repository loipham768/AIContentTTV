'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  subText?: string
  confirmLabel: string
  confirmVariant: 'primary' | 'danger'
  onConfirm: () => void | Promise<void>
  onCancel: () => void
}

export function ConfirmModal({ isOpen, title, subText, confirmLabel, confirmVariant, onConfirm, onCancel }: ConfirmModalProps) {
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  async function handleConfirm() {
    setLoading(true)
    try { await onConfirm() } finally { setLoading(false) }
  }

  const btnBase = 'flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-colors'
  const btnVariant = confirmVariant === 'danger'
    ? 'bg-red-600 text-white hover:bg-red-700'
    : 'bg-blue-600 text-white hover:bg-blue-700'

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={loading ? undefined : onCancel}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-gray-900 mb-2">{title}</h2>
        {subText && <p className="text-sm text-gray-500 mb-4">{subText}</p>}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`${btnBase} ${btnVariant}`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Processing…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
