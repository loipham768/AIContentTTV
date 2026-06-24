"use client";
import { useState, useMemo, useEffect } from "react";
import { ICON_CATEGORIES } from "@/lib/editor/iconsList";
import { FONT_AWESOME_URL } from "@/lib/editor/googleFonts";
import { Search, X } from "lucide-react";

interface RteIconOverlayProps {
  onSelect: (iconName: string, prefix: string) => void;
  onClose: () => void;
}

export default function RteIconOverlay({ onSelect, onClose }: RteIconOverlayProps) {
  const [search, setSearch] = useState("");

  // Load Font Awesome for icon preview in this overlay
  useEffect(() => {
    const id = "fa-cdn-main";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = FONT_AWESOME_URL;
      document.head.appendChild(link);
    }
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return ICON_CATEGORIES;
    return ICON_CATEGORIES.map((cat) => ({
      ...cat,
      icons: cat.icons.filter(
        (icon) => icon.name.includes(q) || icon.label.toLowerCase().includes(q),
      ),
    })).filter((cat) => cat.icons.length > 0);
  }, [search]);

  return (
    <div
      className="fixed inset-0 z-[9998]"
      // stopPropagation ngăn GrapesJS detect mousedown bên ngoài canvas
      // → RTE không bị deactivate khi user tương tác với overlay này
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onMouseDown={(e) => e.preventDefault()} onClick={onClose} />

      {/* Panel */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] max-h-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-4 py-3 border-b border-slate-100 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Chèn icon tại vị trí con trỏ</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Icon xuất hiện đúng chỗ cursor đang đứng trong text
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 p-1.5 rounded-lg hover:bg-white/80 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-2.5 border-b border-slate-100 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm icon..."
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Icon grid */}
        <div className="flex-1 overflow-y-auto p-3">
          {filtered.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-10">
              Không tìm thấy icon
            </p>
          )}
          {filtered.map((cat) => (
            <div key={cat.id} className="mb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {cat.label}
              </p>
              <div className="grid grid-cols-8 gap-1">
                {cat.icons.map((icon) => (
                  <button
                    key={icon.name}
                    // preventDefault giữ focus trên canvas contenteditable → execCommand hoạt động
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onSelect(icon.name, icon.prefix ?? "fa-solid")}
                    title={icon.label}
                    className="flex items-center justify-center p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors aspect-square"
                  >
                    <i
                      className={`${icon.prefix ?? "fa-solid"} fa-${icon.name} text-base`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
