'use client'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  subText?: string
  confirmLabel: string
  confirmVariant: 'primary' | 'danger'
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({ isOpen, title, subText, confirmLabel, confirmVariant, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={onCancel}
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
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className={
              confirmVariant === 'danger'
                ? 'px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700'
                : 'px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700'
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
