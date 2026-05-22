'use client'

import { useState } from 'react'
import type { Editor } from 'grapesjs'
import { Loader2 } from 'lucide-react'

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
        if (res.status === 429) {
          setError('Vui lòng đợi vài giây trước khi tạo nội dung mới.')
        } else {
          setError('Đã xảy ra lỗi. Vui lòng thử lại.')
        }
        return
      }

      editorRef.current?.loadProjectData(data.block)
      onSuccess?.()
    } catch {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  function handlePromptChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(e.target.value)
    if (error) setError(null) // clear error on any keystroke (D-08)
  }

  return (
    <div className="border-t border-gray-200 bg-white">
      <form onSubmit={handleSubmit} className="flex items-start gap-3 px-4 py-3">
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          disabled={isLoading}
          placeholder="Nhập nội dung bạn muốn tạo (tối đa 500 ký tự)..."
          maxLength={500}
          rows={2}
          className={[
            'flex-1 resize-none border border-gray-200 rounded px-3 py-2 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            isLoading ? 'bg-gray-50 text-gray-400 cursor-not-allowed opacity-50' : 'bg-white text-gray-900',
          ].join(' ')}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className={[
            'flex items-center gap-2 px-6 py-2 rounded text-sm font-medium transition-colors',
            isLoading || !prompt.trim()
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
              : 'bg-blue-600 text-white hover:bg-blue-700',
          ].join(' ')}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Đang tạo...</span>
            </>
          ) : (
            'Tạo nội dung'
          )}
        </button>
      </form>
      {error && (
        <p className="px-4 pb-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
