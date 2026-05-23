'use client'

import 'grapesjs/dist/css/grapes.min.css'
import { Editor as GjsReactEditor } from '@grapesjs/react'
import type { Editor } from 'grapesjs'
import grapesjs from 'grapesjs'
import { registerBlocks } from '@/lib/editor/blocks'
import { styleSectors } from '@/lib/editor/styleConfig'

interface GrapesEditorProps {
  onEditor: (editor: Editor) => void
}

export default function GrapesEditor({ onEditor }: GrapesEditorProps) {
  function handleEditor(editor: Editor) {
    registerBlocks(editor)
    onEditor(editor)
  }

  return (
    <div className="h-full overflow-hidden relative">
      <GjsReactEditor
        grapesjs={grapesjs}
        className="h-full"
        options={{
          height: '100%',
          storageManager: false,
          blockManager: { appendTo: '#gjs-blocks-panel' },
          layerManager: { appendTo: '#gjs-layers-panel' },
          traitManager: { appendTo: '#gjs-traits-panel' },
          styleManager: {
            appendTo: '#gjs-styles-panel',
            sectors: styleSectors,
          },
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
