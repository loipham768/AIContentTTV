'use client'
import { useEffect, useState } from 'react'
import type { Editor } from 'grapesjs'
import { GrapesBlockSchema } from '@/lib/ai/schema'
import { ConfirmModal } from '@/components/ui/ConfirmModal'

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

  useEffect(() => {
    setLoading(true)
    setFetchError(false)
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) { setFetchError(true); return { projects: [] } }
        return res.json()
      })
      .then(data => setProjects(data.projects ?? []))
      .catch(() => { setFetchError(true); setProjects([]) })
      .finally(() => setLoading(false))
  }, [refreshKey])

  function handleOpen(project: Project) {
    const editor = editorRef.current
    if (!editor) return
    const parsed = GrapesBlockSchema.safeParse(project.blockData)
    if (!parsed.success) { alert('Khối dữ liệu không hợp lệ, không thể mở.'); return }
    if (editor.getDirtyCount() > 0) {
      setModalState({ type: 'reopen', project })
      return
    }
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

  function handleDelete(project: Project) {
    setModalState({ type: 'delete', project })
  }

  async function handleConfirmDelete(project: Project) {
    setModalState({ type: 'none' })
    try {
      const res = await fetch(`/api/projects/${project._id}`, { method: 'DELETE' })
      if (res.ok) { setProjects(prev => prev.filter(p => p._id !== project._id)) }
      else { alert('Xoá thất bại. Vui lòng thử lại.') }
    } catch { alert('Lỗi kết nối. Vui lòng thử lại.') }
  }

  return (
    <div className="w-72 flex flex-col border-l border-gray-200 bg-gray-50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <h2 className="text-sm font-semibold text-gray-700">Lịch sử</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {loading && <p className="px-4 py-3 text-xs text-gray-400">Đang tải...</p>}
        {!loading && fetchError && (
          <p className="px-4 py-6 text-xs text-red-500 text-center">
            Đã xảy ra lỗi khi tải lịch sử. Vui lòng làm mới trang.
          </p>
        )}
        {!loading && !fetchError && projects.length === 0 && (
          <p className="px-4 py-6 text-xs text-gray-400 text-center">Chưa có nội dung nào.</p>
        )}
        {!loading && !fetchError && projects.map(project => (
          <div key={project._id} className="px-4 py-3 border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors">
            <p className="text-xs font-medium text-gray-800 truncate mb-1">{project.name}</p>
            <p className="text-xs text-gray-400 mb-1">{new Date(project.createdAt).toLocaleDateString('vi-VN')}</p>
            <p className="text-xs text-gray-500 truncate mb-2">{project.prompt}</p>
            <div className="flex gap-2">
              <button onClick={() => handleOpen(project)} className="flex-1 text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Mở</button>
              <button onClick={() => handleDelete(project)} className="flex-1 text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200">Xoá</button>
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
