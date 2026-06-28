import type { Editor } from 'grapesjs'

const PRESETS = [
  { label: 'Purple → Pink',  value: 'linear-gradient(135deg,#a855f7,#ec4899)' },
  { label: 'Blue → Purple',  value: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { label: 'Yellow → Orange',value: 'linear-gradient(135deg,#f6d365,#fda085)' },
  { label: 'Ocean Blue',     value: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
  { label: 'Mint Green',     value: 'linear-gradient(135deg,#43e97b,#38f9d7)' },
  { label: 'Pink → Yellow',  value: 'linear-gradient(135deg,#fa709a,#fee140)' },
  { label: 'Red → Orange',   value: 'linear-gradient(135deg,#f97316,#ef4444)' },
  { label: 'Gold',           value: 'linear-gradient(180deg,#fbbf24,#f59e0b,#d97706)' },
  { label: 'Pink Pastel',    value: 'linear-gradient(135deg,#ff9a9e,#fecfef)' },
  { label: 'Dark Purple',    value: 'linear-gradient(135deg,#1a1a2e,#6366f1)' },
  { label: 'Rainbow',        value: 'linear-gradient(90deg,#ff6b6b,#feca57,#48dbfb,#ff9ff3)' },
  { label: 'Gray White',     value: 'linear-gradient(135deg,#f5f7fa,#c3cfe2)' },
]

const BG_PRESETS = [
  ...PRESETS,
  { label: 'Light Lavender', value: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
  { label: 'Dark Night',     value: 'linear-gradient(135deg,#0f172a,#1e1b4b)' },
  { label: 'Fiery Orange',   value: 'linear-gradient(135deg,#e96c1a,#c0392b)' },
  { label: 'Dark Slate',     value: 'linear-gradient(135deg,#2c3e50,#4ca1af)' },
]

// ─── Shared UI factory ────────────────────────────────────────────────────────

function buildPickerEl(
  presets: { label: string; value: string }[],
  onChange: (value: string) => void
): HTMLDivElement {
  const wrap = document.createElement('div')
  wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:5px;padding:2px 0 6px;'

  presets.forEach((p) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.title = p.label
    btn.dataset['gradient'] = p.value
    btn.style.cssText = [
      'width:22px;height:22px;border-radius:50%;',
      `background:${p.value};`,
      'border:2px solid white;',
      'box-shadow:0 1px 3px rgba(0,0,0,.25);',
      'cursor:pointer;flex-shrink:0;transition:transform .1s,box-shadow .1s;',
    ].join('')
    btn.addEventListener('mouseenter', () => { btn.style.transform = 'scale(1.18)' })
    btn.addEventListener('mouseleave', () => { btn.style.transform = '' })
    btn.addEventListener('click', () => onChange(p.value))
    wrap.appendChild(btn)
  })

  const clearBtn = document.createElement('button')
  clearBtn.type = 'button'
  clearBtn.textContent = '✕ Xóa gradient'
  clearBtn.style.cssText = [
    'font-size:10px;color:#94a3b8;cursor:pointer;',
    'background:none;border:none;padding:0;',
    'margin-top:2px;width:100%;text-align:left;',
  ].join('')
  clearBtn.addEventListener('mouseenter', () => { clearBtn.style.color = '#ef4444' })
  clearBtn.addEventListener('mouseleave', () => { clearBtn.style.color = '#94a3b8' })
  clearBtn.addEventListener('click', () => onChange(''))
  wrap.appendChild(clearBtn)

  return wrap
}

function highlightActive(el: HTMLElement, activeValue: string) {
  el.querySelectorAll('[data-gradient]').forEach((node) => {
    const btn = node as HTMLButtonElement
    const match = btn.dataset['gradient'] === activeValue
    btn.style.boxShadow = match
      ? '0 0 0 2px #6366f1,0 1px 3px rgba(0,0,0,.25)'
      : '0 1px 3px rgba(0,0,0,.25)'
    btn.style.transform = match ? 'scale(1.12)' : ''
  })
}

// ─── Text gradient ────────────────────────────────────────────────────────────

export function registerTextGradientType(editor: Editor) {
  editor.StyleManager.addType('text-gradient-picker', {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    create({ change }: any) {
      return buildPickerEl(PRESETS, (v) => change({ gradient: v }))
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emit(_clbOpts: any, changeData: any) {
      const gradient: string = changeData?.gradient ?? ''
      const selected = editor.getSelected()
      if (!selected) return

      if (gradient) {
        selected.setStyle({
          ...selected.getStyle(),
          background: gradient,
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        })
      } else {
        const style = { ...selected.getStyle() }
        delete style['background']
        delete style['-webkit-background-clip']
        delete style['-webkit-text-fill-color']
        delete style['background-clip']
        selected.setStyle(style)
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update({ el }: any) {
      const selected = editor.getSelected()
      const style = selected?.getStyle?.() ?? {}
      const isTextGrad = style['-webkit-text-fill-color'] === 'transparent'
      highlightActive(el, isTextGrad ? String(style['background'] ?? '') : '')
    },

    destroy() {},
  })
}

// ─── Background gradient ──────────────────────────────────────────────────────

export function registerBgGradientType(editor: Editor) {
  editor.StyleManager.addType('bg-gradient-picker', {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    create({ change }: any) {
      return buildPickerEl(BG_PRESETS, (v) => change({ gradient: v }))
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emit(_clbOpts: any, changeData: any) {
      const gradient: string = changeData?.gradient ?? ''
      const selected = editor.getSelected()
      if (!selected) return

      if (gradient) {
        selected.setStyle({
          ...selected.getStyle(),
          'background-image': gradient,
        })
      } else {
        const style = { ...selected.getStyle() }
        delete style['background-image']
        selected.setStyle(style)
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update({ el }: any) {
      const selected = editor.getSelected()
      const current: string = String(selected?.getStyle?.()?.['background-image'] ?? '')
      highlightActive(el, current)
    },

    destroy() {},
  })
}
