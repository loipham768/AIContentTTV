'use client'

import { useEffect, useState } from 'react'
import type { Editor } from 'grapesjs'
import { LogoutButton } from '@/components/auth/LogoutButton'
import {
  Eye, EyeOff, ZoomIn, ZoomOut, Trash2,
  Undo2, Redo2, Monitor, Smartphone, Code2, Plus, Download, Crown, Lock,
} from 'lucide-react'
import Logo from '@/components/Logo'
import Link from 'next/link'

interface TopBarProps {
  editorRef: React.RefObject<Editor | null>
  editor?: Editor | null
  userEmail: string
  isPreview: boolean
  onTogglePreview: () => void
  canExport: boolean
  plan: string
}

export default function TopBar({
  editorRef, editor, userEmail, isPreview, onTogglePreview, canExport, plan,
}: TopBarProps) {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [copied, setCopied]     = useState(false)
  const [copyError, setCopyError] = useState<string | null>(null)
  const [exported, setExported]   = useState(false)
  const [canUndo, setCanUndo]     = useState(false)
  const [canRedo, setCanRedo]     = useState(false)
  const [zoom, setZoom]           = useState(100)
  const [clearPending, setClearPending] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)

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

  // Server-side export: HTML + CSS sent to /api/export-html, returns clean inlined HTML
  async function getCleanHtml(): Promise<string | null> {
    const ed = editorRef.current
    if (!ed) return null

    setLoading(true)
    try {
      const res = await fetch('/api/export-html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: ed.getHtml(), css: ed.getCss() ?? '' }),
      })
      if (res.status === 403) {
        const data = await res.json().catch(() => ({}))
        if (data.upgradeRequired) setShowUpgrade(true)
        setCopyError(data.error ?? 'Tài khoản không có quyền xuất HTML.')
        setTimeout(() => setCopyError(null), 5000)
        return null
      }
      if (!res.ok) {
        setCopyError('Đã xảy ra lỗi. Vui lòng thử lại.')
        setTimeout(() => setCopyError(null), 3000)
        return null
      }
      const { html } = await res.json()
      return html as string
    } catch {
      setCopyError('Đã xảy ra lỗi. Vui lòng thử lại.')
      setTimeout(() => setCopyError(null), 3000)
      return null
    } finally {
      setLoading(false)
    }
  }

  async function handleCopyHtml() {
    if (!canExport) { setShowUpgrade(true); return }
    const html = await getCleanHtml()
    if (!html) return
    try {
      await navigator.clipboard.writeText(html)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      setCopyError('Không thể sao chép. Thử lại.')
      setTimeout(() => setCopyError(null), 3000)
    }
  }

  async function handleExportHtml() {
    if (!canExport) { setShowUpgrade(true); return }
    const body = await getCleanHtml()
    if (!body) return
    const full = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Page</title>
  <style>*,*::before,*::after{box-sizing:border-box;}body{margin:0;padding:0;}</style>
</head>
<body>
${body}
</body>
</html>`
    const blob = new Blob([full], { type: 'text/html;charset=utf-8' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'index.html'
    a.click()
    URL.revokeObjectURL(url)
    setExported(true)
    setTimeout(() => setExported(false), 3000)
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

  const planBadge = plan === 'free'
    ? <span className="hidden xl:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400 font-medium">Free</span>
    : plan === 'basic'
    ? <span className="hidden xl:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-800/60 text-blue-300 font-medium"><Crown className="w-3 h-3" />Basic</span>
    : <span className="hidden xl:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-700/40 text-amber-300 font-medium"><Crown className="w-3 h-3 fill-amber-300" />Pro</span>

  return (
    <>
      <div
        className="flex items-center justify-between px-3 md:px-4 bg-slate-900 flex-shrink-0 border-b border-slate-800"
        style={{ height: '52px' }}
      >
        {/* Brand + New */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Logo iconSize={26} uid="topbar-d" dark className="hidden md:inline-flex" />
          <Logo iconSize={26} uid="topbar-m" dark iconOnly className="md:hidden" />
          <a
            href="/create"
            className="flex items-center gap-1 p-1.5 text-xs font-medium rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
            title="Tạo nội dung mới với AI"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Tạo mới</span>
          </a>
          {planBadge}
        </div>

        {/* Center controls */}
        <div className="flex items-center gap-1 flex-1 justify-center overflow-hidden">
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 gap-0.5">
            {iconBtn(() => editorRef.current?.runCommand('core:undo'), <Undo2 className="w-3.5 h-3.5" />, 'Hoàn tác (Ctrl+Z)', !canUndo)}
            {iconBtn(() => editorRef.current?.runCommand('core:redo'), <Redo2 className="w-3.5 h-3.5" />, 'Làm lại (Ctrl+Y)', !canRedo)}
          </div>

          <div className="hidden md:flex items-center bg-slate-800 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => { editorRef.current?.setDevice('Desktop'); setActiveDevice('desktop') }}
              title="Desktop"
              className={`p-1.5 rounded-md transition-all ${activeDevice === 'desktop' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { editorRef.current?.setDevice('Mobile'); setActiveDevice('mobile') }}
              title="Mobile (390px)"
              className={`p-1.5 rounded-md transition-all ${activeDevice === 'mobile' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="hidden md:flex items-center bg-slate-800 rounded-lg overflow-hidden">
            <button onClick={handleZoomOut}  className="px-1.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" title="Thu nhỏ"><ZoomOut className="w-3 h-3" /></button>
            <button onClick={handleZoomReset} className="px-1.5 py-1 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-700 transition-colors w-9 text-center" title="Reset zoom">{zoom}%</button>
            <button onClick={handleZoomIn}   className="px-1.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" title="Phóng to"><ZoomIn className="w-3 h-3" /></button>
          </div>

          <div className="w-px h-4 bg-slate-700 mx-0.5 flex-shrink-0" />

          <button
            onClick={onTogglePreview}
            title={isPreview ? 'Thoát xem trước (Esc)' : 'Xem trước'}
            className={`flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-lg transition-all flex-shrink-0 ${
              isPreview ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {isPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-xs">{isPreview ? 'Thoát' : 'Preview'}</span>
          </button>

          <button
            onClick={handleClearCanvas}
            title="Xóa toàn bộ canvas"
            className={`hidden sm:flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-lg transition-all flex-shrink-0 ${
              clearPending ? 'bg-red-500 text-white shadow-md shadow-red-500/30' : 'text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{clearPending ? 'Xác nhận?' : 'Xóa'}</span>
          </button>
        </div>

        {/* Right: export + copy + user */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={handleExportHtml}
            disabled={loading}
            title={canExport ? 'Tải file index.html' : 'Cần nâng cấp gói để xuất file'}
            className={`flex items-center gap-1 px-2 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              !canExport
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : exported
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
            }`}
          >
            {canExport ? <Download className="w-3.5 h-3.5 flex-shrink-0" /> : <Lock className="w-3.5 h-3.5 flex-shrink-0" />}
            <span className="hidden lg:inline">{exported ? 'Đã tải!' : 'Xuất HTML'}</span>
          </button>

          <button
            onClick={handleCopyHtml}
            disabled={loading}
            title={canExport ? 'Sao chép HTML đã chuẩn hóa CSS' : 'Cần nâng cấp gói để sao chép HTML'}
            className={`flex items-center gap-1 px-2 py-1.5 text-xs font-semibold rounded-lg transition-colors shadow ${
              !canExport
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : copied
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white shadow-emerald-500/20'
            }`}
          >
            {canExport ? <Code2 className="w-3.5 h-3.5 flex-shrink-0" /> : <Lock className="w-3.5 h-3.5 flex-shrink-0" />}
            <span className="hidden md:inline">{copied ? 'Đã sao chép!' : 'Sao chép'}</span>
          </button>

          <span className="text-xs text-slate-500 hidden xl:block truncate max-w-[120px]">{userEmail}</span>
          <LogoutButton />
        </div>
      </div>

      {/* Upgrade prompt overlay */}
      {showUpgrade && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowUpgrade(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Nâng cấp để xuất HTML</h3>
                <p className="text-xs text-gray-500">Tính năng dành cho gói Basic và Pro</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Gói miễn phí không hỗ trợ sao chép mã HTML. Nâng cấp lên gói <strong>Basic (99.000đ/tháng)</strong> để mở khoá tính năng này.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setShowUpgrade(false)} className="flex-1 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                Để sau
              </button>
              <Link href="/#pricing" onClick={() => setShowUpgrade(false)} className="flex-1 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-center hover:opacity-90 transition-opacity">
                Xem bảng giá
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      {copied && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-medium z-50 border border-slate-700" role="status">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Đã sao chép HTML!
        </div>
      )}
      {exported && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-medium z-50 border border-slate-700" role="status">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          Đã tải index.html!
        </div>
      )}
      {copyError && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-medium z-50 max-w-sm text-center" role="status">
          {copyError}
        </div>
      )}
      {loading && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-full shadow-xl text-sm z-50" role="status">
          <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          Đang xử lý...
        </div>
      )}
    </>
  )
}
