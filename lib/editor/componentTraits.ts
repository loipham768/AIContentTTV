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
            placeholder: 'e.g. hero-section',
          },
          {
            name: 'title',
            label: 'Tooltip title',
            type: 'text',
            placeholder: 'Shown on hover...',
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
            label: 'Image URL',
            type: 'text',
            placeholder: 'https://...',
          },
          {
            name: 'alt',
            label: 'Image description (alt)',
            type: 'text',
            placeholder: 'Describe the image content...',
          },
          {
            name: 'title',
            label: 'Image title',
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
            label: 'Link URL',
            type: 'text',
            placeholder: 'https://...',
          },
          {
            name: 'target',
            label: 'Open link',
            type: 'select',
            options: [
              { id: '', label: '— Default —' },
              { id: '_self', label: 'Same tab' },
              { id: '_blank', label: 'New tab' },
            ],
          },
          {
            name: 'title',
            label: 'Tooltip title',
            type: 'text',
          },
          {
            name: 'rel',
            label: 'Relation (rel)',
            type: 'select',
            options: [
              { id: '', label: '— None —' },
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
            label: 'Video URL',
            type: 'text',
            placeholder: 'https://...',
          },
          {
            name: 'poster',
            label: 'Thumbnail image',
            type: 'text',
            placeholder: 'https://...',
          },
          {
            name: 'loop',
            label: 'Loop',
            type: 'checkbox',
          },
          {
            name: 'autoplay',
            label: 'Autoplay',
            type: 'checkbox',
          },
          {
            name: 'controls',
            label: 'Controls',
            type: 'checkbox',
          },
          {
            name: 'muted',
            label: 'Muted',
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
            placeholder: 'e.g. intro-text',
          },
          {
            name: 'title',
            label: 'Tooltip title',
            type: 'text',
          },
        ],
      },
    },
  })
}
