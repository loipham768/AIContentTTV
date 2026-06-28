"use client";

import "grapesjs/dist/css/grapes.min.css";
import { Editor as GjsReactEditor } from "@grapesjs/react";
import type { Editor } from "grapesjs";
import grapesjs from "grapesjs";
import { registerBlocks } from "@/lib/editor/blocks";
import { styleSectors } from "@/lib/editor/styleConfig";
import { registerComponentTraits } from "@/lib/editor/componentTraits";
import {
  registerTextGradientType,
  registerBgGradientType,
} from "@/lib/editor/textGradientType";
import {
  injectGoogleFontsIntoIframe,
  injectFontAwesomeIntoIframe,
  FONT_AWESOME_URL,
} from "@/lib/editor/googleFonts";
import { ICON_CATEGORIES } from "@/lib/editor/iconsList";

// SVG icon cho RTE toolbar button (không phụ thuộc Font Awesome)
const RTE_ICON_BTN =
  '<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
  '<rect x="1" y="1" width="5" height="5" rx="1" opacity=".85"/>' +
  '<rect x="10" y="1" width="5" height="5" rx="1" opacity=".85"/>' +
  '<rect x="1" y="10" width="5" height="5" rx="1" opacity=".85"/>' +
  '<path d="M12.5 9.5v6M9.5 12.5h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>' +
  '</svg>';

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
  { value: "h1", label: "h1  —  Heading 1" },
  { value: "h2", label: "h2  —  Heading 2" },
  { value: "h3", label: "h3  —  Heading 3" },
  { value: "h4", label: "h4  —  Heading 4" },
  { value: "h5", label: "h5  —  Heading 5" },
  { value: "h6", label: "h6  —  Heading 6" },
  { value: "p", label: "p  —  Paragraph" },
  { value: "span", label: "span  —  Inline" },
  { value: "div", label: "div  —  Block" },
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
  lbl.textContent = "HTML Tag";
  lbl.style.cssText =
    "font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:5px;";

  const sel = document.createElement("select");
  sel.style.cssText =
    "width:100%;padding:5px 8px;font-size:12px;font-family:ui-monospace,SFMono-Regular,monospace;border:1px solid #e2e8f0;border-radius:7px;background:#f8fafc;color:#94a3b8;outline:none;cursor:not-allowed;transition:border-color 0.15s,box-shadow 0.15s,opacity 0.15s;";
  sel.disabled = true;

  // Placeholder khi chưa chọn element
  const ph = document.createElement("option");
  ph.value = "";
  ph.textContent = "— No element selected —";
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
    registerComponentTraits(editor);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editor.on("rte:enable", (_view: any, rte: any) => {
      if (document.getElementById("gjs-rte-extra-btns")) return;
      const toolbar = document.querySelector<HTMLElement>(".gjs-rte-toolbar");
      if (!toolbar) return;

      let picker: HTMLElement | null = null;
      let offClick: ((e: MouseEvent) => void) | null = null;

      function closePicker() {
        picker?.remove();
        picker = null;
        if (offClick) {
          document.removeEventListener("mousedown", offClick, true);
          offClick = null;
        }
      }

      function openPicker() {
        if (picker) { closePicker(); return; }
        if (!toolbar) return;

        // Đảm bảo Font Awesome đã load ở main document để preview icon
        if (!document.getElementById("fa-cdn-main")) {
          const link = document.createElement("link");
          link.id = "fa-cdn-main";
          link.rel = "stylesheet";
          link.href = FONT_AWESOME_URL;
          document.head.appendChild(link);
        }

        const rect = toolbar.getBoundingClientRect();
        const PW = 320, PH = 440, GAP = 4, MARGIN = 8;
        // Tính top: ưu tiên hiện bên dưới toolbar, nếu tràn thì hiện bên trên
        let pTop = rect.bottom + GAP;
        if (pTop + PH > window.innerHeight - MARGIN) {
          pTop = Math.max(MARGIN, rect.top - PH - GAP);
        }
        // Tính left: clamp để không tràn phải
        let pLeft = rect.left;
        if (pLeft + PW > window.innerWidth - MARGIN) {
          pLeft = Math.max(MARGIN, window.innerWidth - PW - MARGIN);
        }

        picker = document.createElement("div");
        picker.id = "gjs-icon-picker-panel";
        picker.style.cssText =
          `position:fixed;top:${pTop}px;left:${pLeft}px;` +
          `width:${PW}px;max-height:${PH}px;overflow-y:auto;background:#fff;` +
          "border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.22);" +
          "z-index:99999;padding:8px;";

        ICON_CATEGORIES.forEach((cat) => {
          const lbl = document.createElement("p");
          lbl.style.cssText = "margin:6px 4px 2px;font:700 10px/1 sans-serif;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em;";
          lbl.textContent = cat.label;
          picker!.appendChild(lbl);

          const grid = document.createElement("div");
          grid.style.cssText = "display:grid;grid-template-columns:repeat(8,1fr);gap:2px;margin-bottom:6px;";

          cat.icons.forEach((icon) => {
            const pfx = icon.prefix ?? "fa-solid";
            const cell = document.createElement("button");
            cell.type = "button";
            cell.title = icon.label;
            cell.style.cssText =
              "all:unset;box-sizing:border-box;display:flex;align-items:center;" +
              "justify-content:center;aspect-ratio:1/1;border-radius:6px;" +
              "cursor:pointer;color:#64748b;font-size:14px;";
            cell.innerHTML = `<i class="${pfx} fa-${icon.name}" style="pointer-events:none"></i>`;
            cell.addEventListener("mouseenter", () => { cell.style.background = "#eff6ff"; cell.style.color = "#4338ca"; });
            cell.addEventListener("mouseleave", () => { cell.style.background = ""; cell.style.color = "#64748b"; });

            cell.addEventListener("mousedown", (e) => {
              e.preventDefault();  // giữ focus canvas contenteditable
              e.stopPropagation(); // ngăn GrapesJS deactivate RTE
            });

            cell.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              //   (non-breaking space) sau icon: có visual width thực → user click
              // vào vùng đó được (target = <p>, không phải <i>) → cursor đặt đúng chỗ.
              // Không dùng ​ vì zero-width → không click được.
              const html = `<i class="${pfx} fa-${icon.name}" data-gjs-icon style="font-size:1.1em;"></i> `;
              const canvasDoc = editor.Canvas.getDocument();

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              try { (rte as any).exec("insertHTML", html); } catch {
                try { canvasDoc?.execCommand("insertHTML", false, html); } catch { /* ignore */ }
              }

              closePicker();
              canvasDoc?.querySelector<HTMLElement>('[contenteditable="true"]')?.focus();
            });

            grid.appendChild(cell);
          });
          picker!.appendChild(grid);
        });

        document.body.appendChild(picker);

        // Đóng khi click ngoài (capture phase)
        offClick = (e: MouseEvent) => {
          const iconBtn = document.getElementById("gjs-icon-insert-btn");
          if (!picker?.contains(e.target as Node) && e.target !== iconBtn) {
            closePicker();
          }
        };
        setTimeout(() => document.addEventListener("mousedown", offClick!, true), 0);
      }

      toolbar.style.overflow = "visible";

      // Wrapper chứa tất cả extra buttons ngoài toolbar
      const extraBtns = document.createElement("div");
      extraBtns.id = "gjs-rte-extra-btns";
      extraBtns.style.cssText =
        "position:absolute;left:100%;top:0;height:100%;margin-left:3px;display:flex;align-items:stretch;";
      toolbar.appendChild(extraBtns);

      // ── Icon picker button ─────────────────────────────────────────────
      const btn = document.createElement("span");
      btn.id = "gjs-icon-insert-btn";
      btn.title = "Insert icon";
      btn.textContent = "☺";
      btn.style.cssText =
        "display:inline-flex;align-items:center;padding:0 7px;" +
        "background:#3b97e3;cursor:pointer;font-size:14px;color:#fff;" +
        "user-select:none;border-radius:3px 0 0 3px;white-space:nowrap;";
      btn.addEventListener("mouseenter", () => { btn.style.background = "#2176c7"; });
      btn.addEventListener("mouseleave", () => { btn.style.background = "#3b97e3"; });
      btn.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openPicker();
      });
      extraBtns.appendChild(btn);

      // ── Foreground color button ────────────────────────────────────────
      // Icon picker button là button duy nhất trong extraBtns.
      // Màu chữ dùng sidebar bên phải (style manager) — không thêm foreColor button
      // để tránh xung đột giữa execCommand("foreColor") và component.setStyle().
    });

    editor.on("rte:disable", () => {
      document.getElementById("gjs-rte-extra-btns")?.remove();
      document.getElementById("gjs-icon-picker-panel")?.remove();
    });

    editor.on("load", () => {
      // Inject Google Fonts + Font Awesome into the canvas iframe
      const canvasDoc = editor.Canvas.getDocument();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const canvasWinLoad = editor.Canvas.getWindow() as any;
      if (canvasDoc) {
        injectGoogleFontsIntoIframe(canvasDoc);
        injectFontAwesomeIntoIframe(canvasDoc);

        // Click vào <i data-gjs-icon> trong RTE mode → select nguyên icon đó
        // Giúp foreColor từ RTE toolbar chỉ apply màu cho icon, không apply cả đoạn văn
        canvasDoc.addEventListener('click', (e) => {
          const target = e.target as Element;
          if (target.tagName !== 'I' || !target.hasAttribute('data-gjs-icon')) return;
          if (!canvasDoc.querySelector('[contenteditable="true"]')) return;
          try {
            const sel: Selection | null = canvasWinLoad?.getSelection?.();
            if (!sel) return;
            const r = canvasDoc.createRange();
            r.selectNode(target);
            sel.removeAllRanges();
            sel.addRange(r);
          } catch { /* ignore */ }
        });
      }

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
                  empty: 'Select an element to edit its style',
                  layer: 'Layer',
                  fileButton: 'Image',
                  sectors: {
                    typography: 'Typography',
                    dimension: 'Dimension',
                    layout: 'Layout (Flex/Grid)',
                    general: 'General',
                    decorations: 'Decorations',
                    extra: 'Extra',
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
