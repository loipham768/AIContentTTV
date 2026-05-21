'use client'

import type { Editor } from 'grapesjs'
import { useState } from 'react'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { isolateCss } from '@/lib/cssIsolation'

interface TopBarProps {
  editorRef: React.RefObject<Editor | null>
  userEmail: string
}

export default function TopBar({ editorRef, userEmail }: TopBarProps) {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [copied, setCopied] = useState(false)

  async function handleCopyHtml() {
    const editor = editorRef.current
    if (!editor) return
    try {
      const html = await isolateCss(editor.getHtml(), editor.getCss() ?? '')
      await navigator.clipboard.writeText(html)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // clipboard unavailable — silent in v1
    }
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 h-12">
        {/* Left: App name */}
        <span className="text-sm font-semibold text-gray-800">AI Content Booster</span>

        {/* Center: Editor controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editorRef.current?.runCommand('core:undo')}
            className="px-3 py-1 text-sm rounded text-gray-600 hover:bg-gray-100"
            title="Undo (Ctrl+Z)"
          >
            Undo
          </button>
          <button
            onClick={() => editorRef.current?.runCommand('core:redo')}
            className="px-3 py-1 text-sm rounded text-gray-600 hover:bg-gray-100"
            title="Redo (Ctrl+Y)"
          >
            Redo
          </button>

          <div className="w-px h-5 bg-gray-300 mx-2" />

          <button
            onClick={() => {
              editorRef.current?.setDevice('Desktop')
              setActiveDevice('desktop')
            }}
            className={`px-3 py-1 text-sm rounded ${
              activeDevice === 'desktop'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Desktop preview"
          >
            Desktop
          </button>
          <button
            onClick={() => {
              editorRef.current?.setDevice('Mobile')
              setActiveDevice('mobile')
            }}
            className={`px-3 py-1 text-sm rounded ${
              activeDevice === 'mobile'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Mobile preview (390px)"
          >
            Mobile
          </button>
        </div>

        {/* Right: Copy HTML + User email + logout */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyHtml}
            className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
            title="Copy zero-JS inline-CSS HTML to clipboard"
          >
            Copy HTML
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
    </>
  )
}
