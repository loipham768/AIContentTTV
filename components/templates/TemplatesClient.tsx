"use client";

import { useState } from "react";
import { X, ExternalLink, Sparkles, LayoutTemplate, Monitor, Smartphone, Tablet, Crown, Gem, LogIn, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Template, TemplateCategory } from "@/lib/templates";
import { CATEGORY_META } from "@/lib/templates";
import Logo from "@/components/Logo";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";

interface Props {
  templates: Template[];
  isLoggedIn?: boolean;
  userEmail: string;
  fullName?: string;
  avatarUrl?: string;
  plan?: string;
  initialCategory?: string;
}

type Tab = "all" | TemplateCategory;

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "all",     label: "Tất cả",       icon: "✦" },
  { id: "landing", label: "Landing Page",  icon: "🏠" },
  { id: "article", label: "Bài viết",      icon: "📝" },
  { id: "ads",     label: "Quảng cáo",     icon: "📣" },
];

function toTab(raw?: string): Tab {
  if (raw === "landing" || raw === "article" || raw === "ads") return raw;
  return "all";
}

export default function TemplatesClient({ templates, isLoggedIn = false, userEmail, fullName, avatarUrl, plan = 'free', initialCategory }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>(toTab(initialCategory));
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const filtered =
    activeTab === "all"
      ? templates
      : templates.filter((t) => t.category === activeTab);

  function handleUse(template: Template) {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
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
            {isLoggedIn ? (
              <>
                <Link
                  href="/create"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 transition-opacity"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Tạo với AI
                </Link>
                <Link href="/profile" title={`Gói ${plan === 'free' ? 'Miễn phí' : plan === 'basic' ? 'Basic' : 'Pro'}`}>
                  {plan === 'free' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-gray-500 bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors">
                      <Sparkles className="w-2.5 h-2.5" /> Free
                    </span>
                  )}
                  {plan === 'basic' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-500 shadow-sm">
                      <Crown className="w-2.5 h-2.5" /> Basic
                    </span>
                  )}
                  {plan === 'pro' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-900 bg-gradient-to-r from-amber-400 to-orange-400 shadow-sm">
                      <Gem className="w-2.5 h-2.5" /> Pro
                    </span>
                  )}
                </Link>
                <Link href="/profile" title={fullName || userEmail} className="hover:opacity-80 transition-opacity">
                  <UserAvatar avatarUrl={avatarUrl} fullName={fullName} email={userEmail} size={28} />
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 transition-opacity"
              >
                <LogIn className="w-3.5 h-3.5" /> Đăng nhập
              </Link>
            )}
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
                      onClick={() => { setPreviewTemplate(tpl); setPreviewDevice("desktop"); }}
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
                    className="w-full py-2 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
                    style={{ background: `linear-gradient(135deg, ${tpl.accentColor}, ${tpl.accentColor}cc)` }}
                  >
                    {isLoggedIn ? (
                      <>Dùng mẫu này →</>
                    ) : (
                      <><Lock className="w-3.5 h-3.5" /> Đăng nhập để dùng</>
                    )}
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
          {/* Toolbar */}
          <div
            className="flex-shrink-0 h-12 bg-slate-900 border-b border-slate-800 flex items-center gap-2 px-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setPreviewTemplate(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Name */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: previewTemplate.accentColor }} />
              <span className="text-white text-sm font-semibold truncate">{previewTemplate.name}</span>
              <span className="hidden md:block text-slate-500 text-xs flex-shrink-0">— Xem trước</span>
            </div>

            {/* Device toggle */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 gap-0.5 flex-shrink-0">
              {([
                { id: "desktop", icon: <Monitor    className="w-3.5 h-3.5" />, label: "Desktop" },
                { id: "tablet",  icon: <Tablet     className="w-3.5 h-3.5" />, label: "Tablet"  },
                { id: "mobile",  icon: <Smartphone className="w-3.5 h-3.5" />, label: "Mobile"  },
              ] as const).map((d) => (
                <button
                  key={d.id}
                  onClick={() => setPreviewDevice(d.id)}
                  title={d.label}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                    previewDevice === d.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {d.icon}
                  <span className="hidden sm:inline">{d.label}</span>
                </button>
              ))}
            </div>

            {/* Use button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleUse(previewTemplate); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex-shrink-0 transition-opacity hover:opacity-90"
              style={{ background: previewTemplate.accentColor }}
            >
              {isLoggedIn ? (
                <>
                  <Sparkles className="w-3 h-3" />
                  <span className="hidden sm:inline">Dùng mẫu này</span>
                  <span className="sm:hidden">Dùng</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3" />
                  <span className="hidden sm:inline">Đăng nhập để dùng</span>
                  <span className="sm:hidden">Đăng nhập</span>
                </>
              )}
            </button>
          </div>

          {/* Preview area */}
          <div
            className="flex-1 min-h-0 overflow-hidden flex justify-center bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              srcDoc={previewTemplate.html}
              className="border-0 block h-full flex-shrink-0"
              style={{
                width: previewDevice === "desktop" ? "100%" : previewDevice === "tablet" ? "768px" : "390px",
              }}
              sandbox="allow-same-origin"
              title={`Xem trước: ${previewTemplate.name}`}
            />
          </div>

        </div>
      )}
    </div>
  );
}
