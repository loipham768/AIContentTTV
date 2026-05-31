'use client'
import { useEffect, useRef, useState } from 'react'
import type { Editor } from 'grapesjs'
import { GrapesBlockSchema } from '@/lib/ai/schema'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { Clock, FolderOpen, Trash2, AlertTriangle, Pencil, Check, X } from 'lucide-react'

interface Project { _id: string; name: string; prompt: string; blockData: Record<string, unknown>; createdAt: string }
interface HistoryPanelProps { editorRef: React.RefObject<Editor | null>; refreshKey: number }

type ModalState =
  | { type: 'none' }
  | { type: 'reopen'; project: Project }
  | { type: 'delete'; project: Project }

export default function HistoryPanel({ editorRef, refreshKey }: HistoryPanelProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [modalState, setModalState] = useState<ModalState>({ type: 'none' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [renameLoading, setRenameLoading] = useState(false)
  const renameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLoading(true)
    setFetchError(false)
    fetch('/api/projects')
      .then(res => { if (!res.ok) { setFetchError(true); return { projects: [] } } return res.json() })
      .then(data => setProjects(data.projects ?? []))
      .catch(() => { setFetchError(true); setProjects([]) })
      .finally(() => setLoading(false))
  }, [refreshKey])

  function handleOpen(project: Project) {
    const editor = editorRef.current
    if (!editor) return
    const parsed = GrapesBlockSchema.safeParse(project.blockData)
    if (!parsed.success) { alert('Khối dữ liệu không hợp lệ.'); return }
    if (editor.getDirtyCount() > 0) { setModalState({ type: 'reopen', project }); return }
    editor.loadProjectData(parsed.data as Parameters<typeof editor.loadProjectData>[0])
  }

  function handleConfirmReopen(project: Project) {
    const editor = editorRef.current
    if (!editor) return
    const parsed = GrapesBlockSchema.safeParse(project.blockData)
    if (!parsed.success) return
    editor.loadProjectData(parsed.data as Parameters<typeof editor.loadProjectData>[0])
    setModalState({ type: 'none' })
  }

  async function handleConfirmDelete(project: Project) {
    setModalState({ type: 'none' })
    try {
      const res = await fetch(`/api/projects/${project._id}`, { method: 'DELETE' })
      if (res.ok) setProjects(prev => prev.filter(p => p._id !== project._id))
      else alert('Xoá thất bại. Vui lòng thử lại.')
    } catch { alert('Lỗi kết nối. Vui lòng thử lại.') }
  }

  function startRename(project: Project) {
    setEditingId(project._id)
    setEditingName(project.name)
    setTimeout(() => renameInputRef.current?.select(), 0)
  }

  function cancelRename() {
    setEditingId(null)
    setEditingName('')
  }

  async function commitRename(projectId: string) {
    const trimmed = editingName.trim()
    if (!trimmed) { cancelRename(); return }
    const original = projects.find(p => p._id === projectId)?.name
    if (trimmed === original) { cancelRename(); return }

    setRenameLoading(true)
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      })
      if (res.ok) {
        setProjects(prev => prev.map(p => p._id === projectId ? { ...p, name: trimmed } : p))
      } else {
        alert('Đổi tên thất bại. Vui lòng thử lại.')
      }
    } catch {
      alert('Lỗi kết nối. Vui lòng thử lại.')
    } finally {
      setRenameLoading(false)
      setEditingId(null)
      setEditingName('')
    }
  }

  return (
    <div className="flex flex-col bg-slate-50 overflow-hidden w-full min-h-0">
      <div className="px-4 py-3 border-b border-slate-200 bg-white flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Lịch sử tạo</h2>
        {projects.length > 0 && (
          <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{projects.length}</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {!loading && fetchError && (
          <div className="mx-3 my-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-500">Không thể tải lịch sử. Vui lòng làm mới trang.</p>
          </div>
        )}

        {!loading && !fetchError && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <div className="w-10 h-10 rounded-2xl bg-slate-200 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-xs font-medium text-slate-500">Chưa có nội dung nào</p>
            <p className="text-xs text-slate-400 mt-1">Tạo nội dung đầu tiên bằng AI bên dưới</p>
          </div>
        )}

        {!loading && !fetchError && projects.map(project => (
          <div key={project._id} className="mx-2 my-1.5 bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all group">
            <div className="px-3 pt-3 pb-2">
              <div className="flex items-start justify-between gap-2 mb-1">
                {editingId === project._id ? (
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <input
                      ref={renameInputRef}
                      value={editingName}
                      onChange={e => setEditingName(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') commitRename(project._id)
                        else if (e.key === 'Escape') cancelRename()
                      }}
                      disabled={renameLoading}
                      className="flex-1 min-w-0 text-xs font-semibold text-slate-800 bg-slate-50 border border-indigo-300 rounded-md px-1.5 py-0.5 outline-none focus:ring-1 focus:ring-indigo-400"
                      maxLength={200}
                      autoFocus
                    />
                    <button
                      onClick={() => commitRename(project._id)}
                      disabled={renameLoading}
                      className="p-0.5 rounded text-emerald-500 hover:bg-emerald-50 flex-shrink-0"
                      title="Lưu tên"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                    <button
                      onClick={cancelRename}
                      disabled={renameLoading}
                      className="p-0.5 rounded text-slate-400 hover:bg-slate-100 flex-shrink-0"
                      title="Hủy"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate leading-snug flex-1 min-w-0">{project.name}</p>
                    <button
                      onClick={() => startRename(project)}
                      className="p-0.5 rounded text-slate-300 hover:text-slate-500 hover:bg-slate-100 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Đổi tên"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <time className="text-xs text-slate-400 flex-shrink-0">
                  {new Date(project.createdAt).toLocaleDateString('vi-VN')}
                </time>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{project.prompt}</p>
            </div>
            <div className="flex border-t border-slate-100">
              <button
                onClick={() => handleOpen(project)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                Mở lại
              </button>
              <div className="w-px bg-slate-100" />
              <button
                onClick={() => setModalState({ type: 'delete', project })}
                className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={modalState.type === 'reopen'}
        title="Thay thế nội dung hiện tại?"
        subText="Thay đổi chưa lưu sẽ bị mất."
        confirmLabel="Thay thế"
        confirmVariant="primary"
        onConfirm={() => modalState.type === 'reopen' && handleConfirmReopen(modalState.project)}
        onCancel={() => setModalState({ type: 'none' })}
      />
      <ConfirmModal
        isOpen={modalState.type === 'delete'}
        title="Xóa khối này?"
        subText="Hành động này không thể hoàn tác."
        confirmLabel="Xóa"
        confirmVariant="danger"
        onConfirm={() => modalState.type === 'delete' && handleConfirmDelete(modalState.project)}
        onCancel={() => setModalState({ type: 'none' })}
      />
    </div>
  )
}
