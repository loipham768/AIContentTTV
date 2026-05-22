'use client'

import { useEffect, useState } from 'react'
import type { Editor } from 'grapesjs'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { isolateCss } from '@/lib/cssIsolation'

interface TopBarProps {
  editorRef: React.RefObject<Editor | null>
  editor?: Editor | null
  userEmail: string
}

export default function TopBar({ editorRef, editor, userEmail }: TopBarProps) {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  useEffect(() => {
    if (!editor) return
    function update() {
      setCanUndo(editor!.UndoManager.hasUndo())
      setCanRedo(editor!.UndoManager.hasRedo())
    }
    update()
    editor.on('undo redo update', update)
    return () => { editor.off('undo redo update', update) }
  }, [editor])

  async function handleCopyHtml() {
    const ed = editorRef.current
    if (!ed) return
    try {
      const html = await isolateCss(ed.getHtml(), ed.getCss() ?? '')
      await navigator.clipboard.writeText(html)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      setCopyError(true)
      setTimeout(() => setCopyError(false), 3000)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 h-12">
        <span className="text-base font-bold text-gray-800">AI Content Booster</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => editorRef.current?.runCommand('core:undo')}
            disabled={!canUndo}
            className={`px-3 py-1 text-sm rounded text-gray-600 ${!canUndo ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            title="Hoàn tác (Ctrl+Z)"
          >
            Hoàn tác
          </button>
          <button
            onClick={() => editorRef.current?.runCommand('core:redo')}
            disabled={!canRedo}
            className={`px-3 py-1 text-sm rounded text-gray-600 ${!canRedo ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            title="Làm lại (Ctrl+Y)"
          >
            Làm lại
          </button>
          <div className="w-px h-5 bg-gray-300 mx-2" />
          <button
            onClick={() => { editorRef.current?.setDevice('Desktop'); setActiveDevice('desktop') }}
            className={`px-3 py-1 text-sm rounded ${activeDevice === 'desktop' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            title="Xem trước màn hình máy tính"
          >
            Máy tính
          </button>
          <button
            onClick={() => { editorRef.current?.setDevice('Mobile'); setActiveDevice('mobile') }}
            className={`px-3 py-1 text-sm rounded ${activeDevice === 'mobile' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            title="Xem trước màn hình di động (390px)"
          >
            Di động
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyHtml}
            className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
            title="Sao chép mã HTML đã chuẩn hóa CSS"
          >
            Sao chép HTML
          </button>
          <span className="text-sm text-gray-600">{userEmail}</span>
          <LogoutButton />
        </div>
      </div>
      {copied && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium z-50"
          role="status"
        >
          Sao chép thành công!
        </div>
      )}
      {copyError && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium z-50"
          role="status"
        >
          Không thể sao chép. Vui lòng thử lại.
        </div>
      )}
    </>
  )
}
