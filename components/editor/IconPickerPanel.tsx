"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import type { Editor } from "grapesjs";
import { ICON_CATEGORIES, type IconDef } from "@/lib/editor/iconsList";
import { FONT_AWESOME_URL } from "@/lib/editor/googleFonts";
import { Search } from "lucide-react";

interface IconPickerPanelProps {
  editor: Editor | null;
}

export default function IconPickerPanel({ editor }: IconPickerPanelProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const mouseDownTime = useRef(0);
  const mouseMovedAfterDown = useRef(false);

  // Load Font Awesome in main document for icon preview in this panel
  useEffect(() => {
    const id = "fa-cdn-main";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = FONT_AWESOME_URL;
    document.head.appendChild(link);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return ICON_CATEGORIES.map((cat) => ({
      ...cat,
      icons: cat.icons.filter(
        (icon) =>
          !q ||
          icon.name.includes(q) ||
          icon.label.toLowerCase().includes(q),
      ),
    })).filter(
      (cat) =>
        (activeCategory === "all" || cat.id === activeCategory) &&
        cat.icons.length > 0,
    );
  }, [search, activeCategory]);

  function getBlockId(icon: IconDef) {
    const prefix = icon.prefix ?? "fa-solid";
    return `__icon__${prefix.replace("fa-", "")}__${icon.name}`;
  }

  // Bắt đầu drag: trigger GrapesJS BlockManager.startDrag
  function handleMouseDown(e: React.MouseEvent, icon: IconDef) {
    if (!editor) return;
    mouseDownTime.current = Date.now();
    mouseMovedAfterDown.current = false;

    const onMove = () => {
      mouseMovedAfterDown.current = true;
    };
    window.addEventListener("mousemove", onMove, { once: true });

    const block = editor.BlockManager.get(getBlockId(icon));
    if (block) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (editor.BlockManager as any).startDrag(block, e.nativeEvent);
      } catch {
        // Fallback: startDrag không có → chỉ dùng click-to-insert
      }
    }
  }

  // Nhấn nhanh (click): chèn inline vào element đang chọn
  function handleMouseUp(icon: IconDef) {
    const elapsed = Date.now() - mouseDownTime.current;
    // Chỉ insert nếu là tap nhanh (< 300ms) và chuột không di chuyển nhiều
    if (!mouseMovedAfterDown.current && elapsed < 300) {
      insertIcon(icon);
    }
  }

  function insertIcon(icon: IconDef) {
    if (!editor) return;
    const prefix = icon.prefix ?? "fa-solid";
    const wrapper = editor.getWrapper();
    const selected = editor.getSelected();

    if (selected && selected !== wrapper) {
      const tagName = ((selected.get("tagName") as string) || "").toLowerCase();

      // Text-level: chèn inline bên trong đoạn text
      const inlineTags = ["p","h1","h2","h3","h4","h5","h6","span","a","li","td","th","label","button","figcaption","blockquote"];
      if (inlineTags.includes(tagName)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selected.append(`<i class="${prefix} fa-${icon.name}" style="font-size:1.1em;"></i>` as any);
        return;
      }

      // Container: chèn bên trong
      const containerTags = ["div","section","article","header","footer","main","nav","figure","form"];
      if (containerTags.includes(tagName)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selected.append(`<i class="${prefix} fa-${icon.name}" style="font-size:32px;display:block;margin:8px 0;"></i>` as any);
        return;
      }

      // Các trường hợp khác: thêm sau element được chọn
      const parent = selected.parent() ?? wrapper;
      const idx = parent?.components().indexOf(selected) ?? -1;
      if (idx >= 0 && parent) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parent.components().add(`<i class="${prefix} fa-${icon.name}" style="font-size:32px;display:block;margin:8px 0;"></i>` as any, { at: idx + 1 });
        return;
      }
    }

    // Không có gì được chọn: append vào cuối trang
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    wrapper?.append(`<i class="${prefix} fa-${icon.name}" style="font-size:32px;display:block;margin:8px auto;text-align:center;"></i>` as any);
  }

  const allTabs = [
    { id: "all", label: "All" },
    ...ICON_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search */}
      <div className="p-2 border-b border-slate-100 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search icons..."
            className="w-full pl-7 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex overflow-x-auto border-b border-slate-100 bg-slate-50 flex-shrink-0">
        {allTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`flex-shrink-0 px-2.5 py-1.5 text-[10px] font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeCategory === tab.id
                ? "text-blue-600 border-blue-500 bg-white"
                : "text-slate-500 border-transparent hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Icon grid */}
      <div className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 && (
          <p className="text-center text-xs text-slate-400 py-8">
            No icons found
          </p>
        )}
        {filtered.map((cat) => (
          <div key={cat.id} className="mb-3">
            {activeCategory === "all" && (
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                {cat.label}
              </p>
            )}
            <div className="grid grid-cols-5 gap-1">
              {cat.icons.map((icon) => (
                <button
                  key={`${cat.id}-${icon.name}`}
                  onMouseDown={(e) => handleMouseDown(e, icon)}
                  onMouseUp={() => handleMouseUp(icon)}
                  title={`${icon.label} · Drag or click to insert`}
                  className="flex flex-col items-center justify-center gap-0.5 p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors group aspect-square cursor-grab active:cursor-grabbing select-none"
                >
                  <i
                    className={`${icon.prefix ?? "fa-solid"} fa-${icon.name} text-[14px]`}
                  />
                  <span className="text-[7px] text-slate-400 group-hover:text-blue-500 truncate w-full text-center leading-tight">
                    {icon.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex-shrink-0">
        <p className="text-[9px] text-slate-400 text-center leading-snug">
          Drag to canvas · Click to insert at selection
        </p>
      </div>
    </div>
  );
}
