'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X, ImageIcon, Loader2, CheckCircle2 } from 'lucide-react'

interface Props {
  orderId: string
}

export default function ConfirmPaymentModal({ orderId }: Props) {
  const router = useRouter()
  const [open, setOpen]         = useState(false)
  const [file, setFile]         = useState<File | null>(null)
  const [preview, setPreview]   = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith('image/')) { setError('Vui lòng chọn file ảnh'); return }
    if (f.size > 3 * 1024 * 1024) { setError('Ảnh quá lớn (tối đa 3MB)'); return }
    setError(null)
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (!f) return
    if (!f.type.startsWith('image/')) { setError('Vui lòng chọn file ảnh'); return }
    if (f.size > 3 * 1024 * 1024) { setError('Ảnh quá lớn (tối đa 3MB)'); return }
    setError(null)
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  async function handleSubmit() {
    if (!file) { setError('Vui lòng chọn ảnh chuyển khoản'); return }
    setLoading(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append('proof', file)
      const res = await fetch(`/api/orders/${orderId}/submit-proof`, { method: 'POST', body: fd })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { setError(data.error ?? 'Có lỗi xảy ra'); return }
      setOpen(false)
      router.refresh()
    } catch {
      setError('Lỗi kết nối, vui lòng thử lại')
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    if (loading) return
    setOpen(false)
    setFile(null)
    setPreview(null)
    setError(null)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
      >
        <CheckCircle2 className="w-5 h-5" />
        Tôi đã chuyển khoản
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Xác nhận đã chuyển khoản</h3>
              <button onClick={handleClose} disabled={loading} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <p className="text-sm text-gray-600">
                Vui lòng chụp màn hình hoặc tải ảnh biên lai chuyển khoản để chúng tôi xác nhận nhanh hơn.
              </p>

              {/* Drop zone */}
              <div
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/40 transition-colors min-h-[160px]"
              >
                {preview ? (
                  <img src={preview} alt="preview" className="max-h-40 max-w-full object-contain rounded-lg" />
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 text-gray-300" />
                    <p className="text-sm text-gray-500 text-center">
                      Kéo thả ảnh vào đây hoặc <span className="text-indigo-600 font-medium">chọn file</span>
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP — tối đa 3MB</p>
                  </>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {file && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Upload className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{file.name}</span>
                  <button
                    onClick={() => { setFile(null); setPreview(null) }}
                    className="ml-auto text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Huỷ
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !file}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {loading ? 'Đang gửi...' : 'Gửi xác nhận'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
