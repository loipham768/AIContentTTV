'use client'

import { useState } from 'react'
import { Star, Send, Sparkles, Loader2 } from 'lucide-react'

interface Props {
  hasReviewed: boolean
}

const LABELS = ['', 'Tệ', 'Chưa tốt', 'Bình thường', 'Tốt', 'Xuất sắc! ✨']

export default function ReviewForm({ hasReviewed }: Props) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  // Đã review trước đó (session khác) → ẩn hoàn toàn
  if (hasReviewed) return null

  // Vừa submit xong trong session này → hiện success đẹp
  if (status === 'done') {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
          <Sparkles className="w-6 h-6 text-emerald-500" />
        </div>
        <p className="font-bold text-gray-900 mb-1">Cảm ơn bạn rất nhiều! 🎉</p>
        <p className="text-sm text-gray-500">Đánh giá của bạn đang chờ duyệt và sẽ hiển thị sớm.</p>
      </div>
    )
  }

  async function submit() {
    if (rating === 0) { setError('Vui lòng chọn số sao'); return }
    if (content.trim().length < 10) { setError('Tối thiểu 10 ký tự'); return }
    setError('')
    setStatus('loading')
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, content: content.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Có lỗi xảy ra'); setStatus('idle'); return }
      setStatus('done')
    } catch {
      setError('Không thể kết nối, thử lại sau')
      setStatus('idle')
    }
  }

  const active = hovered || rating

  return (
    <div className="space-y-4">
      {/* Star picker */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-2">Số sao của bạn</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRating(s)}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110 active:scale-95"
              aria-label={`${s} sao`}
            >
              <Star
                className="w-8 h-8 transition-colors"
                fill={s <= active ? '#f59e0b' : 'none'}
                stroke={s <= active ? '#f59e0b' : '#e5e7eb'}
                strokeWidth={1.5}
              />
            </button>
          ))}
          {active > 0 && (
            <span className="ml-2 text-sm font-bold text-amber-500">
              {LABELS[active]}
            </span>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-2">Nhận xét của bạn</p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="AITaoPage giúp ích gì cho công việc của bạn? (tối thiểu 10 ký tự)"
          rows={3}
          maxLength={500}
          className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none resize-none transition-colors bg-gray-50 focus:bg-white"
        />
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-400">{content.length}/500</span>
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
      </div>

      <button
        onClick={submit}
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-60 transition-colors shadow-sm shadow-indigo-200"
      >
        {status === 'loading'
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang gửi...</>
          : <><Send className="w-4 h-4" /> Gửi đánh giá</>}
      </button>
    </div>
  )
}
