'use client'

import { useState } from 'react'
import { Star, Send, CheckCircle2, Loader2 } from 'lucide-react'

interface Props {
  hasReviewed: boolean
}

export default function ReviewForm({ hasReviewed }: Props) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  if (hasReviewed || status === 'done') {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium">
          {status === 'done'
            ? 'Cảm ơn! Đánh giá của bạn đang chờ duyệt và sẽ hiển thị sớm.'
            : 'Bạn đã gửi đánh giá rồi. Cảm ơn bạn!'}
        </p>
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
    <div className="space-y-3">
      {/* Star picker */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setRating(s)}
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(0)}
            className="p-0.5 transition-transform hover:scale-110"
            aria-label={`${s} sao`}
          >
            <Star
              className="w-7 h-7 transition-colors"
              fill={s <= active ? '#f59e0b' : 'none'}
              stroke={s <= active ? '#f59e0b' : '#d1d5db'}
              strokeWidth={1.5}
            />
          </button>
        ))}
        {active > 0 && (
          <span className="ml-2 text-sm font-semibold text-amber-600">
            {['', 'Tệ', 'Chưa tốt', 'Bình thường', 'Tốt', 'Xuất sắc'][active]}
          </span>
        )}
      </div>

      {/* Textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Chia sẻ trải nghiệm của bạn với AITaoPage... (tối thiểu 10 ký tự)"
        rows={3}
        maxLength={500}
        className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none resize-none transition-colors"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{content.length}/500</span>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>

      <button
        onClick={submit}
        disabled={status === 'loading'}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-60 transition-colors"
      >
        {status === 'loading' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        Gửi đánh giá
      </button>
    </div>
  )
}
