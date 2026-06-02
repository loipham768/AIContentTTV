'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Upload, X, ImageIcon, Check, Loader2, Trash2, RefreshCw } from 'lucide-react'

interface UserImage {
  _id: string
  url: string
  name: string
  size: number
  createdAt: string
}

interface Props {
  open: boolean
  onSelect: (url: string) => void
  onClose: () => void
}

export default function ImagePickerModal({ open, onSelect, onClose }: Props) {
  const [tab, setTab] = useState<'library' | 'upload'>('library')
  const [images, setImages] = useState<UserImage[]>([])
  const [loadingLibrary, setLoadingLibrary] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)

  const fetchImages = useCallback(async () => {
    setLoadingLibrary(true)
    try {
      const res = await fetch('/api/images')
      if (res.ok) {
        const data = await res.json()
        setImages(data.images ?? [])
      }
    } finally {
      setLoadingLibrary(false)
    }
  }, [])

  useEffect(() => {
    if (open) {
      fetchImages()
      setUploadError('')
    }
  }, [open, fetchImages])

  const uploadFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File vượt quá 5 MB. Vui lòng chọn file nhỏ hơn.')
      return
    }
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if (!allowed.includes(file.type)) {
      setUploadError('Chỉ hỗ trợ JPG, PNG, GIF, WebP, SVG.')
      return
    }

    setUploading(true)
    setUploadError('')
    const fd = new FormData()
    fd.append('files', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) {
        setUploadError(data.error ?? 'Lỗi tải lên. Vui lòng thử lại.')
        return
      }
      const url = data.data?.[0]?.src as string | undefined
      if (url) {
        onSelect(url) // parent xử lý close
      }
    } catch {
      setUploadError('Lỗi kết nối. Vui lòng thử lại.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current = 0
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) uploadFile(file)
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current++
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current--
    if (dragCounter.current === 0) setDragOver(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
    e.target.value = ''
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await fetch(`/api/images/${id}`, { method: 'DELETE' })
      setImages(prev => prev.filter(img => img._id !== id))
    } catch {
      // silent
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)' }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: 'min(85vh, 640px)' }}>

        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <ImageIcon className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-slate-800">Thư viện hình ảnh</h2>
            <p className="text-xs text-slate-400 mt-0.5">Chọn ảnh có sẵn hoặc tải lên ảnh mới</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="flex border-b border-slate-100 bg-slate-50 flex-shrink-0">
          {(['library', 'upload'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-semibold transition-all border-b-2 ${
                tab === t
                  ? 'text-indigo-600 border-indigo-500 bg-white'
                  : 'text-slate-500 border-transparent hover:text-slate-700'
              }`}
            >
              {t === 'library' ? `Thư viện${images.length > 0 ? ` (${images.length})` : ''}` : 'Tải lên mới'}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div className="flex-1 overflow-y-auto min-h-0">

          {/* Upload tab */}
          {tab === 'upload' && (
            <div className="p-6">
              <div
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onClick={() => !uploading && fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-4 py-14 px-8 rounded-2xl border-2 border-dashed transition-all ${
                  uploading
                    ? 'border-indigo-200 bg-indigo-50 cursor-default'
                    : dragOver
                    ? 'border-indigo-400 bg-indigo-50 cursor-copy scale-[1.01]'
                    : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 cursor-pointer'
                }`}
              >
                {uploading ? (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                      <Loader2 className="w-7 h-7 text-indigo-500 animate-spin" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-indigo-700">Đang tải lên…</p>
                      <p className="text-xs text-indigo-400 mt-1">Vui lòng đợi</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${dragOver ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                      <Upload className={`w-7 h-7 transition-colors ${dragOver ? 'text-indigo-500' : 'text-slate-400'}`} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-700">
                        {dragOver ? 'Thả ảnh vào đây' : 'Kéo & thả ảnh vào đây'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1.5">
                        hoặc{' '}
                        <span className="text-indigo-500 font-semibold">nhấn để chọn file</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                      <span className="text-xs text-slate-500 font-medium">Tối đa</span>
                      <span className="text-xs font-bold text-slate-700">5 MB</span>
                      <span className="w-px h-3 bg-slate-300" />
                      <span className="text-xs text-slate-500">JPG · PNG · GIF · WebP · SVG</span>
                    </div>
                  </>
                )}
              </div>

              {uploadError && (
                <div className="mt-4 flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                  <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-500 text-[10px] font-bold">!</span>
                  </div>
                  <p className="text-xs text-red-600 leading-relaxed">{uploadError}</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}

          {/* Library tab */}
          {tab === 'library' && (
            <div className="p-4">
              {loadingLibrary ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                  <p className="text-xs text-slate-400">Đang tải thư viện…</p>
                </div>
              ) : images.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-500">Chưa có hình ảnh nào</p>
                    <p className="text-xs text-slate-400 mt-1">
                      <button onClick={() => setTab('upload')} className="text-indigo-500 hover:text-indigo-600 font-medium hover:underline">
                        Tải lên ảnh đầu tiên →
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {images.map((img) => (
                    // div thay vì button để tránh button lồng button (HTML invalid)
                    <div
                      key={img._id}
                      role="button"
                      tabIndex={0}
                      onClick={() => { onSelect(img.url) }}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(img.url) }}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border-2 border-transparent hover:border-indigo-400 transition-all shadow-sm hover:shadow-lg focus:outline-none focus:border-indigo-500 cursor-pointer"
                      title={`${img.name} (${formatSize(img.size)})`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Select overlay */}
                      <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-colors flex items-center justify-center pointer-events-none">
                        <div className="w-9 h-9 rounded-full bg-white/0 group-hover:bg-white/90 transition-all scale-75 group-hover:scale-100 flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>

                      {/* Name bar */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent pt-4 pb-1.5 px-2 translate-y-full group-hover:translate-y-0 transition-transform pointer-events-none">
                        <p className="text-white text-[10px] truncate">{img.name}</p>
                      </div>

                      {/* Delete button — dùng button hợp lệ vì parent là div */}
                      <button
                        onClick={(e) => handleDelete(img._id, e)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/0 group-hover:bg-white/80 hover:!bg-red-500 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center shadow"
                        title="Xóa khỏi thư viện"
                      >
                        <Trash2 className="w-3 h-3 text-slate-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50 flex-shrink-0">
          <button
            onClick={fetchImages}
            disabled={loadingLibrary}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${loadingLibrary ? 'animate-spin' : ''}`} />
            Làm mới
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab(tab === 'library' ? 'upload' : 'library')}
              className="px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              {tab === 'library' ? 'Tải lên mới' : 'Xem thư viện'}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
