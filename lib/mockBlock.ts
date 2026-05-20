/**
 * MOCK_BLOCK — Vietnamese marketing banner for GrapesJS editor canvas.
 *
 * This constant is loaded via `editor.loadProjectData(MOCK_BLOCK)` in the
 * `onEditor` callback of GrapesEditor.tsx. Phase 3 will replace this
 * with AI-generated JSON using the same `loadProjectData()` call pattern.
 *
 * Structure: wrapper → section → [h2, p, button] (three sibling draggable
 * components), enabling ED-02 drag-to-reorder testing.
 *
 * No images — per CLAUDE.md "No base64 images" and D-12 simple content rule.
 */
export const MOCK_BLOCK = {
  assets: [],
  styles: [],
  pages: [
    {
      frames: [
        {
          component: {
            type: "wrapper",
            components: [
              {
                tagName: "section",
                draggable: true,
                droppable: true,
                style: {
                  padding: "40px 24px",
                  background: "#f8f9fa",
                  "text-align": "center",
                  "font-family": "Arial, sans-serif",
                },
                components: [
                  {
                    type: "text",
                    tagName: "h2",
                    draggable: true,
                    content: "Tiêu đề quảng cáo chính",
                    style: {
                      "font-size": "28px",
                      "font-weight": "bold",
                      color: "#1a1a1a",
                      "margin-bottom": "12px",
                      "margin-top": "0",
                    },
                  },
                  {
                    type: "text",
                    tagName: "p",
                    draggable: true,
                    content:
                      "Mô tả sản phẩm với nội dung tiếng Việt của bạn tại đây.",
                    style: {
                      "font-size": "16px",
                      color: "#444444",
                      "margin-bottom": "24px",
                      "line-height": "1.6",
                    },
                  },
                  {
                    type: "text",
                    tagName: "button",
                    draggable: true,
                    content: "Mua ngay",
                    style: {
                      "background-color": "#e53e3e",
                      color: "#ffffff",
                      padding: "12px 32px",
                      border: "none",
                      "border-radius": "4px",
                      "font-size": "16px",
                      "font-weight": "bold",
                      cursor: "pointer",
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
} as const;
