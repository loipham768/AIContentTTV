"use client";

import "grapesjs/dist/css/grapes.min.css";
import { Editor as GjsReactEditor } from "@grapesjs/react";
import type { Editor } from "grapesjs";
import grapesjs from "grapesjs";
import { registerBlocks } from "@/lib/editor/blocks";
import { styleSectors } from "@/lib/editor/styleConfig";
import { registerVietnameseTraits } from "@/lib/editor/componentTraits";
import {
  registerTextGradientType,
  registerBgGradientType,
} from "@/lib/editor/textGradientType";

interface GrapesEditorProps {
  onEditor: (editor: Editor) => void;
  /** onSelect = user picked a URL; onCancel = user closed without picking */
  onOpenImagePicker: (
    onSelect: (url: string) => void,
    onCancel: () => void,
  ) => void;
}

const gradientPlugin = (editor: Editor) => {
  registerTextGradientType(editor);
  registerBgGradientType(editor);
};

// ─── "Xem thêm mẫu" buttons ──────────────────────────────────────────────────

const SEE_MORE_DEFS = [
  { label: 'Mẫu bài viết',     type: 'article' },
  { label: 'Mẫu Landing Page', type: 'landing' },
  { label: 'Mẫu Quảng cáo',   type: 'ads'     },
]

function findCategoryContainer(
  panel: HTMLElement,
  label: string,
): HTMLElement | null {
  // Walk all text nodes; find the one whose trimmed text === label
  const walker = document.createTreeWalker(panel, NodeFilter.SHOW_TEXT, null)
  let textNode: Text | null = null
  while (walker.nextNode()) {
    const t = walker.currentNode as Text
    if (t.textContent?.trim() === label) { textNode = t; break }
  }
  if (!textNode) return null

  // Walk up: find first ancestor with ≥ 2 child elements (title + blocks container)
  let el: HTMLElement | null = textNode.parentElement
  while (el && el !== panel) {
    if (el.children.length >= 2) return el
    el = el.parentElement as HTMLElement
  }
  return null
}

function injectSeeMoreLinks(retries = 8) {
  const panel = document.getElementById('gjs-blocks-panel')
  if (!panel) {
    if (retries > 0) setTimeout(() => injectSeeMoreLinks(retries - 1), 300)
    return
  }

  let pendingCount = 0
  SEE_MORE_DEFS.forEach(({ label, type }) => {
    if (panel.querySelector(`[data-see-more="${type}"]`)) return // already injected

    const container = findCategoryContainer(panel, label)
    if (!container) { pendingCount++; return }

    const a = document.createElement('a')
    a.setAttribute('data-see-more', type)
    a.href    = `/templates?type=${type}`
    a.target  = '_blank'
    a.rel     = 'noopener noreferrer'
    a.style.cssText = [
      'display:flex', 'align-items:center', 'justify-content:center', 'gap:5px',
      'margin:3px 8px 8px', 'padding:7px 10px',
      'background:#f0f4ff', 'border:1.5px dashed #c7d2fe', 'border-radius:8px',
      'font-size:11px', 'font-weight:700', 'color:#4f46e5', 'text-decoration:none',
      "font-family:'Segoe UI',system-ui,sans-serif", 'cursor:pointer',
      'box-sizing:border-box', 'transition:background .15s,border-color .15s',
    ].join(';')
    a.textContent = '+ Xem thêm mẫu'
    a.addEventListener('mouseenter', () => {
      a.style.background   = '#e0e7ff'
      a.style.borderColor  = '#a5b4fc'
    })
    a.addEventListener('mouseleave', () => {
      a.style.background   = '#f0f4ff'
      a.style.borderColor  = '#c7d2fe'
    })
    container.appendChild(a)
  })

  if (pendingCount > 0 && retries > 0) {
    setTimeout(() => injectSeeMoreLinks(retries - 1), 400)
  }
}

// ─────────────────────────────────────────────────────────────────────────────

const PROP_PLACEHOLDERS: Record<string, string> = {
  color: "#0f172a",
  "background-color": "#ffffff",
  "border-color": "#e2e8f0",
  "box-shadow": "0 4px 12px rgba(0,0,0,0.15)",
};

function injectPlaceholders() {
  const panel = document.getElementById("gjs-styles-panel");
  if (!panel) return;
  Object.entries(PROP_PLACEHOLDERS).forEach(([prop, ph]) => {
    const propEl = panel.querySelector<HTMLElement>(
      `[data-property="${prop}"]`,
    );
    if (!propEl) return;
    const input = propEl.querySelector<HTMLInputElement>("input");
    if (input) input.placeholder = ph;
  });
}

const TAG_OPTIONS = [
  { value: "h1", label: "h1  —  Tiêu đề 1" },
  { value: "h2", label: "h2  —  Tiêu đề 2" },
  { value: "h3", label: "h3  —  Tiêu đề 3" },
  { value: "h4", label: "h4  —  Tiêu đề 4" },
  { value: "h5", label: "h5  —  Tiêu đề 5" },
  { value: "h6", label: "h6  —  Tiêu đề 6" },
  { value: "p", label: "p  —  Đoạn văn" },
  { value: "span", label: "span  —  Nội tuyến" },
  { value: "div", label: "div  —  Khối" },
  // { value: 'strong',     label: 'strong  —  In đậm' },
  // { value: 'em',         label: 'em  —  In nghiêng' },
  // { value: 'a',          label: 'a  —  Liên kết' },
  // { value: 'button',     label: 'button  —  Nút bấm' },
  // { value: 'blockquote', label: 'blockquote  —  Trích dẫn' },
  // { value: 'li',         label: 'li  —  Mục danh sách' },
  // { value: 'label',      label: 'label  —  Nhãn form' },
  // { value: 'section',    label: 'section  —  Phần' },
  // { value: 'article',    label: 'article  —  Bài viết' },
  // { value: 'header',     label: 'header  —  Đầu trang' },
  // { value: 'footer',     label: 'footer  —  Chân trang' },
  // { value: 'nav',        label: 'nav  —  Điều hướng' },
];

// Tạo widget DOM một lần, gắn event listener
function buildTagWidget(editor: Editor): HTMLDivElement {
  const wrap = document.createElement("div");
  wrap.id = "gjs-tag-selector";
  wrap.style.cssText = "padding:6px 0 10px;";

  const lbl = document.createElement("div");
  lbl.textContent = "Thẻ HTML";
  lbl.style.cssText =
    "font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:5px;";

  const sel = document.createElement("select");
  sel.style.cssText =
    "width:100%;padding:5px 8px;font-size:12px;font-family:ui-monospace,SFMono-Regular,monospace;border:1px solid #e2e8f0;border-radius:7px;background:#f8fafc;color:#94a3b8;outline:none;cursor:not-allowed;transition:border-color 0.15s,box-shadow 0.15s,opacity 0.15s;";
  sel.disabled = true;

  // Placeholder khi chưa chọn element
  const ph = document.createElement("option");
  ph.value = "";
  ph.textContent = "— Chưa chọn phần tử —";
  ph.disabled = true;
  ph.selected = true;
  sel.appendChild(ph);

  TAG_OPTIONS.forEach((opt) => {
    const o = document.createElement("option");
    o.value = opt.value;
    o.textContent = opt.label;
    sel.appendChild(o);
  });

  sel.addEventListener("change", () => {
    const comp = editor.getSelected();
    if (comp && sel.value) comp.set("tagName", sel.value);
  });
  sel.addEventListener("focus", () => {
    if (!sel.disabled) {
      sel.style.borderColor = "#6366f1";
      sel.style.boxShadow = "0 0 0 2px rgba(99,102,241,0.15)";
    }
  });
  sel.addEventListener("blur", () => {
    sel.style.borderColor = sel.disabled ? "#e2e8f0" : "#cbd5e1";
    sel.style.boxShadow = "";
  });

  wrap.appendChild(lbl);
  wrap.appendChild(sel);
  return wrap;
}

// Đảm bảo widget luôn tồn tại trong Typography sector và cập nhật giá trị
function syncTagSelector(editor: Editor, retries = 5) {
  const stylePanel = document.getElementById("gjs-styles-panel");
  if (!stylePanel) return;

  // GrapesJS 0.22: style manager dùng prefix 'sm-'
  const typographySector = stylePanel.querySelector<HTMLElement>(
    '[class*="sector__typography"]',
  );
  if (!typographySector) {
    if (retries > 0) setTimeout(() => syncTagSelector(editor, retries - 1), 80);
    return;
  }
  const propsContainer = typographySector.querySelector<HTMLElement>(
    '[class*="properties"]',
  );
  if (!propsContainer) {
    if (retries > 0) setTimeout(() => syncTagSelector(editor, retries - 1), 80);
    return;
  }

  // Inject nếu chưa có (bị GrapesJS xóa khi re-render sector)
  let wrap = document.getElementById(
    "gjs-tag-selector",
  ) as HTMLDivElement | null;
  if (!wrap) {
    wrap = buildTagWidget(editor);
    propsContainer.prepend(wrap);
  }

  const sel = wrap.querySelector<HTMLSelectElement>("select")!;
  const selected = editor.getSelected();
  const tagName = ((selected?.get("tagName") as string) || "").toLowerCase();

  if (!selected || !tagName) {
    // Không có element được chọn → disabled
    sel.disabled = true;
    sel.value = "";
    sel.style.cssText = sel.style.cssText
      .replace(/background:[^;]+;/, "background:#f8fafc;")
      .replace(/color:[^;]+;/, "color:#94a3b8;");
    sel.style.borderColor = "#e2e8f0";
    sel.style.cursor = "not-allowed";
    return;
  }

  // Enable
  sel.disabled = false;
  sel.style.background = "#fff";
  sel.style.color = "#0f172a";
  sel.style.borderColor = "#cbd5e1";
  sel.style.cursor = "pointer";

  // Tìm option khớp tagName
  const match = Array.from(sel.options).find((o) => o.value === tagName);
  if (match) {
    sel.value = tagName;
  } else {
    // Xóa custom option cũ nếu có, thêm mới
    const prev = sel.querySelector<HTMLOptionElement>("[data-custom]");
    prev?.remove();
    const o = document.createElement("option");
    o.value = tagName;
    o.textContent = `<${tagName}>`;
    o.setAttribute("data-custom", "1");
    sel.insertBefore(o, sel.options[1]);
    sel.value = tagName;
  }
}

export default function GrapesEditor({
  onEditor,
  onOpenImagePicker,
}: GrapesEditorProps) {
  function handleEditor(editor: Editor) {
    registerBlocks(editor);
    registerVietnameseTraits(editor);

    editor.on("load", () => {
      const stylesPanel = document.getElementById("gjs-styles-panel");
      if (stylesPanel) {
        const obs = new MutationObserver(() => {
          injectPlaceholders();
          syncTagSelector(editor);
        });
        obs.observe(stylesPanel, { childList: true, subtree: true });
        injectPlaceholders();
        setTimeout(() => syncTagSelector(editor), 150);
      }

      // "Xem thêm mẫu" links — inject after blocks render, re-inject on panel changes
      setTimeout(() => injectSeeMoreLinks(), 400);
      const blocksPanel = document.getElementById("gjs-blocks-panel");
      if (blocksPanel) {
        const blocksObs = new MutationObserver(() => injectSeeMoreLinks(0));
        blocksObs.observe(blocksPanel, { childList: true, subtree: false });
      }
    });

    // Tag selector luôn sync theo selection (setTimeout(0) để chờ React render style panel)
    editor.on("component:selected", () =>
      setTimeout(() => syncTagSelector(editor), 0),
    );
    editor.on("component:deselected", () => syncTagSelector(editor));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editor.on("component:update:tagName", () => syncTagSelector(editor));

    // Fix: GrapesJS mặc định width:100% cho ảnh mới — đổi sang max-width:100%/auto
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editor.on("component:add", (component: any) => {
      if (component.get("type") === "image") {
        const style = component.getStyle();
        if (style["width"] === "100%" && !style["max-width"]) {
          component.setStyle({
            "max-width": "100%",
            height: "auto",
            display: "block",
          });
        }
      }
    });

    // Override 'open-assets' command: chặn GrapesJS mở modal mặc định của nó.
    // __trgCustom() chỉ fire asset:custom khi bhv.container có giá trị — dùng dummy div.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editor.Commands.add("open-assets", {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      run(ed: any, _: any, opts: any = {}) {
        const am = ed.AssetManager;
        const dummy = document.createElement("div");
        am.__behaviour({
          select: opts.select,
          types: opts.types || [],
          options: opts,
          container: dummy,
        });
        am.__trgCustom();
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stop(ed: any) {
        const am = ed.AssetManager;
        const dummy = document.createElement("div");
        am.__behaviour({ select: undefined, types: [], container: dummy });
        am.__trgCustom();
      },
    });

    // asset:custom fires khi AM mở/đóng với { open, select, close, ... }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor as any).on(
      "asset:custom",
      ({ open, select, close: amClose }: any) => {
        if (!open) return;
        onOpenImagePicker(
          (url: string) => {
            select(
              {
                src: url,
                type: "image",
                name: url.split("/").pop() ?? "image",
              },
              true,
            );
            amClose();
          },
          () => amClose(),
        );
      },
    );

    onEditor(editor);
  }

  return (
    <div className="h-full overflow-hidden relative">
      <GjsReactEditor
        grapesjs={grapesjs}
        className="h-full"
        options={{
          height: "100%",
          plugins: [gradientPlugin],
          storageManager: false,
          // GrapesJS 0.22 changed default to true; inline HTML styles then override class-based SM changes
          avoidInlineStyle: false,
          blockManager: { appendTo: "#gjs-blocks-panel" },
          layerManager: { appendTo: "#gjs-layers-panel" },
          traitManager: { appendTo: "#gjs-traits-panel" },
          styleManager: {
            appendTo: "#gjs-styles-panel",
            sectors: styleSectors,
          },
          i18n: {
            messages: {
              en: {
                styleManager: {
                  empty: 'Chọn một phần tử để chỉnh sửa kiểu dáng',
                  layer: 'Lớp',
                  fileButton: 'Hình ảnh',
                  sectors: {
                    // Override GrapesJS built-in English sector names
                    typography: 'Kiểu chữ',
                    dimension: 'Kích thước',
                    layout: 'Bố cục (Flex/Grid)',
                    general: 'Chung',
                    decorations: 'Trang trí',
                    extra: 'Bổ sung',
                    flex: 'Flex',
                  },
                },
              },
            },
          },
          // @ts-expect-error — allowScripts is a valid GrapesJS option not in older type defs
          allowScripts: 1,
          panels: { defaults: [] },
          assetManager: {
            upload: "/api/upload",
            uploadName: "files",
            multiUpload: false,
            autoAdd: true,
            assets: [],
            // Dùng custom: true để GrapesJS không mở modal mặc định — ta tự xử lý qua asset:open event
            custom: true,
          },
          deviceManager: {
            devices: [
              { id: "desktop", name: "Desktop", width: "" },
              {
                id: "mobile",
                name: "Mobile",
                width: "390px",
                widthMedia: "480px",
              },
            ],
          },
        }}
        onEditor={handleEditor}
      />
    </div>
  );
}
