'use client'

import { useState } from 'react'
import type { Editor } from 'grapesjs'
import { Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { GrapesBlockSchema } from '@/lib/ai/schema'

interface PromptBarProps {
  editorRef: React.RefObject<Editor | null>
  onSuccess?: () => void
}

export default function PromptBar({ editorRef, onSuccess }: PromptBarProps) {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(res.status === 429
          ? 'Vui lòng đợi vài giây trước khi tạo nội dung mới.'
          : 'Đã xảy ra lỗi. Vui lòng thử lại.')
        return
      }

      const parsed = GrapesBlockSchema.safeParse(data.block)
      if (!parsed.success) {
        setError('Dữ liệu nhận được không hợp lệ. Vui lòng thử lại.')
        return
      }
      editorRef.current?.loadProjectData(parsed.data as Parameters<typeof editorRef.current.loadProjectData>[0])
      onSuccess?.()
    } catch {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  function handlePromptChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(e.target.value)
    if (error) setError(null)
  }

  const remaining = 500 - prompt.length
  const nearLimit = remaining <= 50

  return (
    <div className="bg-white border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      {/* Label row */}
      <div className="flex items-center justify-between px-4 pt-2.5 pb-1">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-semibold text-slate-700">Tạo nội dung với AI</span>
        </div>
        <span className={`text-xs tabular-nums ${nearLimit ? 'text-amber-500 font-medium' : 'text-slate-400'}`}>
          {remaining}
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 px-4 pb-3">
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          disabled={isLoading}
          placeholder="Mô tả nội dung muốn tạo... VD: Banner khuyến mãi 50% cho shop thời trang"
          maxLength={500}
          rows={2}
          className={[
            'flex-1 resize-none rounded-xl px-3.5 py-2.5 text-sm border transition-all',
            'placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400',
            isLoading
              ? 'bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200'
              : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300',
          ].join(' ')}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className={[
            'flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
            'sm:w-auto w-full flex-shrink-0',
            isLoading || !prompt.trim()
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 active:scale-[0.97]',
          ].join(' ')}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
              <span>Đang tạo...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span>Tạo nội dung</span>
            </>
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-3 flex items-start gap-2 px-3 py-2 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600" role="alert">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
