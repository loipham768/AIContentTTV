'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import type { Editor } from 'grapesjs'
import TopBar from '@/components/editor/TopBar'
import PromptBar from '@/components/editor/PromptBar'

// MANDATORY per CLAUDE.md: GrapesJS must always be dynamically imported with ssr: false
const GrapesEditor = dynamic(() => import('@/components/editor/GrapesEditor'), { ssr: false })

interface EditorClientWrapperProps {
  userEmail: string
}

export default function EditorClientWrapper({ userEmail }: EditorClientWrapperProps) {
  const editorRef = useRef<Editor | null>(null)

  function handleEditor(editor: Editor) {
    editorRef.current = editor
  }

  return (
    <div className="flex flex-col h-screen">
      <TopBar editorRef={editorRef} userEmail={userEmail} />
      <div className="flex-1 overflow-hidden">
        <GrapesEditor onEditor={handleEditor} />
      </div>
      <PromptBar editorRef={editorRef} />
    </div>
  )
}
