import type { Editor } from 'grapesjs'

const PRESETS = [
  { label: 'Tím → Hồng',  value: 'linear-gradient(135deg,#a855f7,#ec4899)' },
  { label: 'Xanh → Tím',  value: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { label: 'Vàng → Cam',  value: 'linear-gradient(135deg,#f6d365,#fda085)' },
  { label: 'Xanh biển',   value: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
  { label: 'Xanh lá',     value: 'linear-gradient(135deg,#43e97b,#38f9d7)' },
  { label: 'Hồng → Vàng', value: 'linear-gradient(135deg,#fa709a,#fee140)' },
  { label: 'Đỏ → Cam',    value: 'linear-gradient(135deg,#f97316,#ef4444)' },
  { label: 'Vàng gold',   value: 'linear-gradient(180deg,#fbbf24,#f59e0b,#d97706)' },
  { label: 'Hồng pastel', value: 'linear-gradient(135deg,#ff9a9e,#fecfef)' },
  { label: 'Tím đen',     value: 'linear-gradient(135deg,#1a1a2e,#6366f1)' },
  { label: 'Cầu vồng',    value: 'linear-gradient(90deg,#ff6b6b,#feca57,#48dbfb,#ff9ff3)' },
  { label: 'Xám trắng',   value: 'linear-gradient(135deg,#f5f7fa,#c3cfe2)' },
]

export function registerTextGradientType(editor: Editor) {
  editor.StyleManager.addType('text-gradient-picker', {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    create({ change }: any) {
      const wrap = document.createElement('div')
      wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:5px;padding:2px 0 6px;'

      PRESETS.forEach((p) => {
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.title = p.label
        btn.dataset['gradient'] = p.value
        btn.style.cssText = [
          `width:20px;height:20px;border-radius:50%;`,
          `background:${p.value};`,
          `border:2px solid white;`,
          `box-shadow:0 1px 3px rgba(0,0,0,.25);`,
          `cursor:pointer;flex-shrink:0;transition:transform .1s;`,
        ].join('')
        btn.addEventListener('mouseenter', () => { btn.style.transform = 'scale(1.15)' })
        btn.addEventListener('mouseleave', () => { btn.style.transform = '' })
        btn.addEventListener('click', () => change({ gradient: p.value }))
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
      clearBtn.addEventListener('click', () => change({ gradient: '' }))
      wrap.appendChild(clearBtn)

      return wrap
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

    // Highlight active preset when target changes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update({ el }: any) {
      const selected = editor.getSelected()
      const currentBg: string = selected?.getStyle?.()?.['background'] ?? ''
      el.querySelectorAll('[data-gradient]').forEach((btn: Element) => {
        const b = btn as HTMLButtonElement
        const match = b.dataset['gradient'] === currentBg
        b.style.boxShadow = match
          ? '0 0 0 2px #6366f1,0 1px 3px rgba(0,0,0,.25)'
          : '0 1px 3px rgba(0,0,0,.25)'
        b.style.transform = match ? 'scale(1.1)' : ''
      })
    },

    destroy() {},
  })
}
