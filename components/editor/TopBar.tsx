'use client'

import { useEffect, useState } from 'react'
import type { Editor } from 'grapesjs'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { isolateCss } from '@/lib/cssIsolation'
import { Eye, EyeOff, ZoomIn, ZoomOut, Trash2 } from 'lucide-react'

interface TopBarProps {
  editorRef: React.RefObject<Editor | null>
  editor?: Editor | null
  userEmail: string
  isPreview: boolean
  onTogglePreview: () => void
}

export default function TopBar({ editorRef, editor, userEmail, isPreview, onTogglePreview }: TopBarProps) {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [clearPending, setClearPending] = useState(false)

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

  // Auto-cancel the clear confirmation after 3 s
  useEffect(() => {
    if (!clearPending) return
    const t = setTimeout(() => setClearPending(false), 3000)
    return () => clearTimeout(t)
  }, [clearPending])

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

  function handleZoomIn() {
    const next = Math.min(zoom + 10, 200)
    editorRef.current?.Canvas.setZoom(next)
    setZoom(next)
  }

  function handleZoomOut() {
    const next = Math.max(zoom - 10, 30)
    editorRef.current?.Canvas.setZoom(next)
    setZoom(next)
  }

  function handleZoomReset() {
    editorRef.current?.Canvas.setZoom(100)
    setZoom(100)
  }

  function handleClearCanvas() {
    if (!clearPending) {
      setClearPending(true)
      return
    }
    editorRef.current?.DomComponents.clear()
    setClearPending(false)
  }

  const btnBase = 'px-2 py-1 text-sm rounded transition-colors'
  const btnGhost = `${btnBase} text-gray-600 hover:bg-gray-100`
  const btnDisabled = `${btnBase} opacity-40 cursor-not-allowed text-gray-600`

  return (
    <>
      <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b border-gray-200 h-12 gap-2 flex-shrink-0">

        {/* Brand */}
        <span className="text-base font-bold text-gray-800 whitespace-nowrap">AI Content Booster</span>

        {/* Center controls */}
        <div className="flex items-center gap-0.5 flex-1 justify-center flex-wrap">

          {/* Undo / Redo */}
          <button
            onClick={() => editorRef.current?.runCommand('core:undo')}
            disabled={!canUndo}
            className={!canUndo ? btnDisabled : btnGhost}
            title="Hoàn tác (Ctrl+Z)"
          >Hoàn tác</button>
          <button
            onClick={() => editorRef.current?.runCommand('core:redo')}
            disabled={!canRedo}
            className={!canRedo ? btnDisabled : btnGhost}
            title="Làm lại (Ctrl+Y)"
          >Làm lại</button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Device */}
          <button
            onClick={() => { editorRef.current?.setDevice('Desktop'); setActiveDevice('desktop') }}
            className={`${btnBase} ${activeDevice === 'desktop' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            title="Xem trước màn hình máy tính"
          >Máy tính</button>
          <button
            onClick={() => { editorRef.current?.setDevice('Mobile'); setActiveDevice('mobile') }}
            className={`${btnBase} ${activeDevice === 'mobile' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            title="Xem trước màn hình di động (390px)"
          >Di động</button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Zoom */}
          <button onClick={handleZoomOut} className={btnGhost} title="Thu nhỏ">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomReset}
            className="px-2 py-1 text-xs font-mono text-gray-600 hover:bg-gray-100 rounded w-12 text-center"
            title="Đặt lại zoom về 100%"
          >{zoom}%</button>
          <button onClick={handleZoomIn} className={btnGhost} title="Phóng to">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Preview */}
          <button
            onClick={onTogglePreview}
            className={`${btnBase} flex items-center gap-1 ${isPreview ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            title={isPreview ? 'Thoát xem trước' : 'Xem trước trang'}
          >
            {isPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {isPreview ? 'Thoát' : 'Xem trước'}
          </button>

          {/* Clear canvas */}
          <button
            onClick={handleClearCanvas}
            className={`${btnBase} flex items-center gap-1 ${clearPending ? 'bg-red-100 text-red-700 font-medium' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Xóa toàn bộ nội dung canvas"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {clearPending ? 'Xác nhận xóa?' : 'Xóa canvas'}
          </button>
        </div>

        {/* Right: copy + user */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopyHtml}
            className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
            title="Sao chép mã HTML đã chuẩn hóa CSS"
          >Sao chép HTML</button>
          <span className="text-xs text-gray-500 hidden lg:block">{userEmail}</span>
          <LogoutButton />
        </div>
      </div>

      {/* Toast: copy success */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium z-50" role="status">
          Sao chép thành công!
        </div>
      )}
      {/* Toast: copy error */}
      {copyError && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium z-50" role="status">
          Không thể sao chép. Vui lòng thử lại.
        </div>
      )}
    </>
  )
}
