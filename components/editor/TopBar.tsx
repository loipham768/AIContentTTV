'use client'

import { useEffect, useState } from 'react'
import type { Editor } from 'grapesjs'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { isolateCss } from '@/lib/cssIsolation'
import {
  Eye, EyeOff, ZoomIn, ZoomOut, Trash2,
  Undo2, Redo2, Monitor, Smartphone, Code2, Plus,
} from 'lucide-react'
import Logo from '@/components/Logo'

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

  function handleZoomIn()    { const n = Math.min(zoom + 10, 200); editorRef.current?.Canvas.setZoom(n); setZoom(n) }
  function handleZoomOut()   { const n = Math.max(zoom - 10, 30);  editorRef.current?.Canvas.setZoom(n); setZoom(n) }
  function handleZoomReset() { editorRef.current?.Canvas.setZoom(100); setZoom(100) }

  function handleClearCanvas() {
    if (!clearPending) { setClearPending(true); return }
    editorRef.current?.DomComponents.clear()
    setClearPending(false)
  }

  const iconBtn = (onClick: () => void, icon: React.ReactNode, title: string, disabled = false) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded-md transition-all ${
        disabled
          ? 'opacity-30 cursor-not-allowed text-slate-500'
          : 'text-slate-400 hover:text-white hover:bg-slate-700 active:bg-slate-600'
      }`}
    >
      {icon}
    </button>
  )

  return (
    <>
      <div className="flex items-center justify-between px-3 md:px-4 bg-slate-900 h-13 gap-3 flex-shrink-0 border-b border-slate-800 overflow-hidden" style={{ height: '52px' }}>

        {/* ── Brand + New content ── */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Logo iconSize={28} uid="topbar-d" dark className="hidden md:inline-flex" />
          <Logo iconSize={28} uid="topbar-m" dark iconOnly className="md:hidden" />
          <a
            href="/create"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
            title="Tạo nội dung mới với AI"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Tạo mới</span>
          </a>
        </div>

        {/* ── Center controls ── */}
        <div className="flex items-center gap-1.5 flex-1 justify-center flex-wrap">

          {/* Undo / Redo */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 gap-0.5">
            {iconBtn(
              () => editorRef.current?.runCommand('core:undo'),
              <Undo2 className="w-3.5 h-3.5" />,
              'Hoàn tác (Ctrl+Z)',
              !canUndo,
            )}
            {iconBtn(
              () => editorRef.current?.runCommand('core:redo'),
              <Redo2 className="w-3.5 h-3.5" />,
              'Làm lại (Ctrl+Y)',
              !canRedo,
            )}
          </div>

          {/* Device toggle — hidden on mobile */}
          <div className="hidden md:flex items-center bg-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => { editorRef.current?.setDevice('Desktop'); setActiveDevice('desktop') }}
              className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-all ${
                activeDevice === 'desktop'
                  ? 'bg-white text-slate-800 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Chế độ máy tính"
            >
              <Monitor className="w-3 h-3" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => { editorRef.current?.setDevice('Mobile'); setActiveDevice('mobile') }}
              className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-all ${
                activeDevice === 'mobile'
                  ? 'bg-white text-slate-800 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Chế độ di động (390px)"
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Zoom — hidden on mobile */}
          <div className="hidden md:flex items-center bg-slate-800 rounded-lg overflow-hidden">
            <button onClick={handleZoomOut} className="px-2 py-1.5 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" title="Thu nhỏ">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button onClick={handleZoomReset} className="px-2 py-1.5 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-700 transition-colors w-11 text-center" title="Đặt lại zoom về 100%">
              {zoom}%
            </button>
            <button onClick={handleZoomIn} className="px-2 py-1.5 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" title="Phóng to">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-slate-700 mx-0.5" />

          {/* Preview toggle */}
          <button
            onClick={onTogglePreview}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              isPreview
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
            title={isPreview ? 'Thoát xem trước (Esc)' : 'Xem trước'}
          >
            {isPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPreview ? 'Thoát' : 'Xem trước'}</span>
          </button>

          {/* Clear canvas — hidden on mobile */}
          <button
            onClick={handleClearCanvas}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              clearPending
                ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                : 'text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
            title="Xóa toàn bộ canvas"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{clearPending ? 'Xác nhận?' : 'Xóa canvas'}</span>
          </button>
        </div>

        {/* ── Right: copy + user ── */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white transition-colors shadow shadow-emerald-500/20"
            title="Sao chép HTML đã chuẩn hóa CSS"
          >
            <Code2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden md:inline">Sao chép HTML</span>
          </button>
          <span className="text-xs text-slate-500 hidden xl:block truncate max-w-[140px]">{userEmail}</span>
          <LogoutButton />
        </div>
      </div>

      {/* Toast: copy success */}
      {copied && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-medium z-50 border border-slate-700" role="status">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Đã sao chép HTML!
        </div>
      )}
      {copyError && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-medium z-50" role="status">
          Không thể sao chép. Vui lòng thử lại.
        </div>
      )}
    </>
  )
}
