'use client'

import 'grapesjs/dist/css/grapes.min.css'
import { Editor as GjsReactEditor } from '@grapesjs/react'
import type { Editor } from 'grapesjs'
import grapesjs from 'grapesjs'
import { MOCK_BLOCK } from '@/lib/mockBlock'

interface GrapesEditorProps {
  onEditor: (editor: Editor) => void
}

export default function GrapesEditor({ onEditor }: GrapesEditorProps) {
  function handleEditor(editor: Editor) {
    editor.loadProjectData(
      MOCK_BLOCK as Parameters<typeof editor.loadProjectData>[0],
    )
    onEditor(editor)
  }

  return (
    <div className="h-full overflow-hidden relative">
      {/* Hidden containers for GrapesJS panel managers (keeps them out of visible UI) */}
      <div id="gjs-hidden-blocks" style={{ display: 'none' }} />
      <div id="gjs-hidden-layers" style={{ display: 'none' }} />
      <GjsReactEditor
        grapesjs={grapesjs}
        className="h-full"
        options={{
          height: '100%',
          storageManager: false,
          blockManager: { appendTo: '#gjs-hidden-blocks' },
          layerManager: { appendTo: '#gjs-hidden-layers' },
          styleManager: { sectors: [] },
          panels: { defaults: [] },
          deviceManager: {
            devices: [
              { id: 'desktop', name: 'Desktop', width: '' },
              { id: 'mobile', name: 'Mobile', width: '390px', widthMedia: '480px' },
            ],
          },
        }}
        onEditor={handleEditor}
      />
    </div>
  )
}
