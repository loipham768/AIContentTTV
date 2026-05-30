'use client'

import 'grapesjs/dist/css/grapes.min.css'
import { Editor as GjsReactEditor } from '@grapesjs/react'
import type { Editor } from 'grapesjs'
import grapesjs from 'grapesjs'
import { registerBlocks } from '@/lib/editor/blocks'
import { styleSectors } from '@/lib/editor/styleConfig'
import { registerTextGradientType, registerBgGradientType } from '@/lib/editor/textGradientType'

interface GrapesEditorProps {
  onEditor: (editor: Editor) => void
}

// Registered as a GrapesJS plugin so custom types are available before any PropertyView renders.
const gradientPlugin = (editor: Editor) => {
  registerTextGradientType(editor)
  registerBgGradientType(editor)
}

// GrapesJS does not forward `placeholder` to color / default-text inputs — inject via DOM.
const LABEL_PLACEHOLDERS: Record<string, string> = {
  'Màu chữ':  '#0f172a',
  'Màu nền':  '#ffffff',
  'Màu viền': '#e2e8f0',
  'Bóng đổ':  '0 4px 12px rgba(0,0,0,0.15)',
}

function injectPlaceholders() {
  const panel = document.getElementById('gjs-styles-panel')
  if (!panel) return
  panel.querySelectorAll<HTMLElement>('.gjs-sm-property').forEach((propEl) => {
    const label = propEl.querySelector('.gjs-sm-label')?.textContent?.trim() ?? ''
    const ph = LABEL_PLACEHOLDERS[label]
    if (!ph) return
    const input = propEl.querySelector<HTMLInputElement>('input')
    if (input) input.placeholder = ph
  })
}

export default function GrapesEditor({ onEditor }: GrapesEditorProps) {
  function handleEditor(editor: Editor) {
    registerBlocks(editor)
    editor.on('component:selected', () => requestAnimationFrame(injectPlaceholders))
    editor.on('styleManager:update',  () => requestAnimationFrame(injectPlaceholders))
    onEditor(editor)
  }

  return (
    <div className="h-full overflow-hidden relative">
      <GjsReactEditor
        grapesjs={grapesjs}
        className="h-full"
        options={{
          height: '100%',
          plugins: [gradientPlugin],
          storageManager: false,
          blockManager: { appendTo: '#gjs-blocks-panel' },
          layerManager: { appendTo: '#gjs-layers-panel' },
          traitManager: { appendTo: '#gjs-traits-panel' },
          styleManager: {
            appendTo: '#gjs-styles-panel',
            sectors: styleSectors,
          },
          // @ts-expect-error — allowScripts is a valid GrapesJS option not in older type defs
          allowScripts: 1,
          panels: { defaults: [] },
          assetManager: {
            upload: '/api/upload',
            uploadName: 'files',
            multiUpload: false,
            autoAdd: true,
            assets: [],
          },
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
