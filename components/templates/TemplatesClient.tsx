"use client";

import { useState } from "react";
import { X, ExternalLink, Sparkles, LayoutTemplate } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Template, TemplateCategory } from "@/lib/templates";
import { CATEGORY_META } from "@/lib/templates";
import Logo from "@/components/Logo";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";

interface Props {
  templates: Template[];
  userEmail: string;
  fullName?: string;
  avatarUrl?: string;
}

type Tab = "all" | TemplateCategory;

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "all", label: "Tất cả", icon: "✦" },
  { id: "landing", label: "Landing Page", icon: "🏠" },
  { id: "article", label: "Bài viết", icon: "📝" },
  { id: "ads", label: "Quảng cáo", icon: "📣" },
];

export default function TemplatesClient({ templates, userEmail, fullName, avatarUrl }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filtered =
    activeTab === "all"
      ? templates
      : templates.filter((t) => t.category === activeTab);

  function handleUse(template: Template) {
    router.push(`/editor?template=${template.id}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo iconSize={28} uid="tpl-nav" />
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-400">
              <span>/</span>
              <span className="font-medium text-gray-700 flex items-center gap-1">
                <LayoutTemplate className="w-3.5 h-3.5" /> Thư viện mẫu
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/create"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-3.5 h-3.5" /> Tạo với AI
            </Link>
            <Link href="/profile" title={fullName || userEmail} className="hover:opacity-80 transition-opacity">
              <UserAvatar avatarUrl={avatarUrl} fullName={fullName} email={userEmail} size={28} />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Thư viện mẫu
          </h1>
          <p className="text-gray-500">
            Chọn một mẫu để bắt đầu — chỉnh sửa trực tiếp trong editor.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border",
                activeTab === tab.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600",
              ].join(" ")}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
          <div className="ml-auto flex-shrink-0 self-center text-sm text-gray-400">
            {filtered.length} mẫu
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((tpl) => {
            const catMeta = CATEGORY_META[tpl.category];
            return (
              <div
                key={tpl.id}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-200"
              >
                {/* Visual preview */}
                <div
                  className={`h-40 bg-gradient-to-br ${tpl.gradient} flex flex-col items-center justify-center relative overflow-hidden`}
                >
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/10 rounded-full translate-y-6 -translate-x-6" />

                  {/* Category icon */}
                  <div className="text-4xl mb-2 relative z-10">{catMeta.icon}</div>
                  <div className="relative z-10 px-4 text-center">
                    <div className="text-white font-bold text-sm leading-tight">{tpl.name}</div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                    <button
                      onClick={() => setPreviewTemplate(tpl)}
                      className="flex items-center gap-1.5 bg-white/90 text-gray-900 rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-white transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" /> Xem trước
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{tpl.name}</h3>
                    <span
                      className="flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${tpl.accentColor}18`,
                        color: tpl.accentColor,
                      }}
                    >
                      {catMeta.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
                    {tpl.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tpl.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleUse(tpl)}
                    className="w-full py-2 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98]"
                    style={{ background: `linear-gradient(135deg, ${tpl.accentColor}, ${tpl.accentColor}cc)` }}
                  >
                    Dùng mẫu này →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <LayoutTemplate className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">Không có mẫu nào trong danh mục này.</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex flex-col"
          onClick={() => setPreviewTemplate(null)}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: previewTemplate.accentColor }}
              />
              <span className="text-white font-semibold text-sm">{previewTemplate.name}</span>
              <span className="text-gray-400 text-xs">— Xem trước</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); handleUse(previewTemplate); }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-white"
                style={{ background: previewTemplate.accentColor }}
              >
                <Sparkles className="w-3.5 h-3.5" /> Dùng mẫu này
              </button>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <iframe
              srcDoc={previewTemplate.html}
              className="w-full h-full border-0"
              sandbox="allow-same-origin"
              title={`Xem trước: ${previewTemplate.name}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
