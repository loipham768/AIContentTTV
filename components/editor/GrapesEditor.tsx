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

// GrapesJS 0.22 renders StyleManager via React — placeholder must be injected via DOM.
// GrapesJS sets data-property="{name}" on each property container.
const PROP_PLACEHOLDERS: Record<string, string> = {
  'color':            '#0f172a',
  'background-color': '#ffffff',
  'border-color':     '#e2e8f0',
  'box-shadow':       '0 4px 12px rgba(0,0,0,0.15)',
}

function injectPlaceholders() {
  const panel = document.getElementById('gjs-styles-panel')
  if (!panel) return
  Object.entries(PROP_PLACEHOLDERS).forEach(([prop, ph]) => {
    const propEl = panel.querySelector<HTMLElement>(`[data-property="${prop}"]`)
    if (!propEl) return
    const input = propEl.querySelector<HTMLInputElement>('input')
    if (input) input.placeholder = ph
  })
}

export default function GrapesEditor({ onEditor }: GrapesEditorProps) {
  function handleEditor(editor: Editor) {
    registerBlocks(editor)

    // MutationObserver fires immediately when React commits the style panel DOM
    editor.on('load', () => {
      const panel = document.getElementById('gjs-styles-panel')
      if (!panel) return
      const obs = new MutationObserver(injectPlaceholders)
      obs.observe(panel, { childList: true, subtree: true })
      injectPlaceholders()
    })

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
