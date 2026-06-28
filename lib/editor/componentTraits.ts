import type { Editor } from 'grapesjs'

export function registerComponentTraits(editor: Editor) {
  // ── default (base — applies to all components that don't override traits) ──
  editor.DomComponents.addType('default', {
    model: {
      defaults: {
        traits: [
          {
            name: 'id',
            label: 'Element ID',
            type: 'text',
            placeholder: 'vd: hero-section',
          },
          {
            name: 'title',
            label: 'Tiêu đề tooltip',
            type: 'text',
            placeholder: 'Hiển thị khi hover...',
          },
        ],
      },
    },
  })

  // ── image ─────────────────────────────────────────────────────────────────
  editor.DomComponents.addType('image', {
    model: {
      defaults: {
        traits: [
          {
            name: 'src',
            label: 'URL hình ảnh',
            type: 'text',
            placeholder: 'https://...',
          },
          {
            name: 'alt',
            label: 'Mô tả ảnh (alt)',
            type: 'text',
            placeholder: 'Mô tả nội dung hình ảnh...',
          },
          {
            name: 'title',
            label: 'Tiêu đề ảnh',
            type: 'text',
          },
        ],
      },
    },
  })

  // ── link ──────────────────────────────────────────────────────────────────
  editor.DomComponents.addType('link', {
    model: {
      defaults: {
        traits: [
          {
            name: 'href',
            label: 'URL liên kết',
            type: 'text',
            placeholder: 'https://...',
          },
          {
            name: 'target',
            label: 'Mở liên kết',
            type: 'select',
            options: [
              { id: '', label: '— Mặc định —' },
              { id: '_self', label: 'Tab hiện tại' },
              { id: '_blank', label: 'Tab mới' },
            ],
          },
          {
            name: 'title',
            label: 'Tiêu đề tooltip',
            type: 'text',
          },
          {
            name: 'rel',
            label: 'Quan hệ (rel)',
            type: 'select',
            options: [
              { id: '', label: '— Không có —' },
              { id: 'noopener noreferrer', label: 'noopener noreferrer' },
              { id: 'nofollow', label: 'nofollow' },
              { id: 'nofollow noopener noreferrer', label: 'nofollow + noopener' },
            ],
          },
        ],
      },
    },
  })

  // ── video ─────────────────────────────────────────────────────────────────
  editor.DomComponents.addType('video', {
    model: {
      defaults: {
        traits: [
          {
            name: 'src',
            label: 'URL video',
            type: 'text',
            placeholder: 'https://...',
          },
          {
            name: 'poster',
            label: 'Ảnh thumbnail',
            type: 'text',
            placeholder: 'https://...',
          },
          {
            name: 'loop',
            label: 'Lặp lại',
            type: 'checkbox',
          },
          {
            name: 'autoplay',
            label: 'Tự phát',
            type: 'checkbox',
          },
          {
            name: 'controls',
            label: 'Hiện điều khiển',
            type: 'checkbox',
          },
          {
            name: 'muted',
            label: 'Tắt tiếng',
            type: 'checkbox',
          },
        ],
      },
    },
  })

  // ── text ──────────────────────────────────────────────────────────────────
  editor.DomComponents.addType('text', {
    model: {
      defaults: {
        traits: [
          {
            name: 'id',
            label: 'Element ID',
            type: 'text',
            placeholder: 'vd: intro-text',
          },
          {
            name: 'title',
            label: 'Tiêu đề tooltip',
            type: 'text',
          },
        ],
      },
    },
  })
}
