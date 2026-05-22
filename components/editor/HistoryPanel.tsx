'use client'

import { useEffect, useState } from 'react'
import type { Editor } from 'grapesjs'

interface Project {
  _id: string
  name: string
  prompt: string
  blockData: Record<string, unknown>
  createdAt: string
}

interface HistoryPanelProps {
  editorRef: React.RefObject<Editor | null>
  refreshKey: number
}

export default function HistoryPanel({ editorRef, refreshKey }: HistoryPanelProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data.projects ?? []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [refreshKey])

  function handleOpen(project: Project) {
    const editor = editorRef.current
    if (!editor) return

    if (editor.getDirtyCount() > 0) {
      if (!window.confirm('Thay thế nội dung hiện tại?')) return
    }

    editor.loadProjectData(project.blockData as Parameters<typeof editor.loadProjectData>[0])
  }

  async function handleDelete(project: Project) {
    if (!window.confirm('Xoá khối này?')) return

    const res = await fetch(`/api/projects/${project._id}`, { method: 'DELETE' })
    if (res.ok) {
      setProjects(prev => prev.filter(p => p._id !== project._id))
    }
  }

  return (
    <div className="w-72 flex flex-col border-l border-gray-200 bg-gray-50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <h2 className="text-sm font-semibold text-gray-700">Lịch sử</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <p className="px-4 py-3 text-xs text-gray-400">Đang tải...</p>
        )}

        {!loading && projects.length === 0 && (
          <p className="px-4 py-6 text-xs text-gray-400 text-center">
            Chưa có nội dung nào.
          </p>
        )}

        {!loading && projects.map(project => (
          <div
            key={project._id}
            className="px-4 py-3 border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors"
          >
            <p className="text-xs font-medium text-gray-800 truncate mb-1" title={project.name}>
              {project.name}
            </p>
            <p className="text-xs text-gray-400 mb-1">
              {new Date(project.createdAt).toLocaleDateString('vi-VN')}
            </p>
            <p className="text-xs text-gray-500 truncate mb-2" title={project.prompt}>
              {project.prompt}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleOpen(project)}
                className="flex-1 text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Mở
              </button>
              <button
                onClick={() => handleDelete(project)}
                className="flex-1 text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              >
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
