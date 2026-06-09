import type { Editor } from 'grapesjs'

export function registerVietnameseTraits(editor: Editor) {
  // ── default (base — áp dụng cho mọi component không override traits) ───────
  editor.DomComponents.addType('default', {
    model: {
      defaults: {
        traits: [
          {
            name: 'id',
            label: 'ID phần tử',
            type: 'text',
            placeholder: 'vd: hero-section',
          },
          {
            name: 'title',
            label: 'Tiêu đề tooltip',
            type: 'text',
            placeholder: 'Hiện khi di chuột vào...',
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
            placeholder: 'Mô tả nội dung ảnh...',
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
            label: 'Địa chỉ liên kết',
            type: 'text',
            placeholder: 'https://...',
          },
          {
            name: 'target',
            label: 'Mở liên kết',
            type: 'select',
            options: [
              { id: '', label: '— Mặc định —' },
              { id: '_self', label: 'Cùng tab' },
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
              { id: '', label: '— Không —' },
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
            label: 'Tự động phát',
            type: 'checkbox',
          },
          {
            name: 'controls',
            label: 'Nút điều khiển',
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
            label: 'ID phần tử',
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
