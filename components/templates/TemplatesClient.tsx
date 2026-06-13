"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  ExternalLink,
  Sparkles,
  LayoutTemplate,
  Monitor,
  Smartphone,
  Tablet,
  Crown,
  Gem,
  LogIn,
  Lock,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { TemplateMeta, TemplateCategory } from "@/lib/templates-db";
import { CATEGORY_META, TEMPLATES_PAGE_SIZE } from "@/lib/constants";
import Logo from "@/components/Logo";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";

interface CatGroup {
  templates: TemplateMeta[];
  total: number;
}

interface Props {
  initialGroups: Record<string, CatGroup>;
  isLoggedIn?: boolean;
  userEmail: string;
  fullName?: string;
  avatarUrl?: string;
  plan?: string;
}

type Tab = "all" | TemplateCategory;

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "all",     label: "Tất cả",       icon: "✦" },
  { id: "landing", label: "Landing Page",  icon: "🏠" },
  { id: "article", label: "Bài viết",      icon: "📝" },
  { id: "ads",     label: "Quảng cáo",     icon: "📣" },
];

const CATEGORY_ORDER: TemplateCategory[] = ["landing", "article", "ads"];

type CatState = CatGroup & { page: number; loading: boolean };

function getPageNums(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

function Pagination({
  page,
  total,
  pageSize,
  onChange,
}: {
  page: number;
  total: number;
  pageSize: number;
  onChange: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;
  const nums = getPageNums(page, totalPages);
  return (
    <div className="flex flex-col items-center gap-2 py-3">
      <p className="text-xs text-gray-400">
        <span className="font-semibold text-gray-600">
          {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)}
        </span>{" "}
        / {total} mẫu
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          ←
        </button>
        {nums.map((n, i) =>
          n === "…" ? (
            <span key={`e${i}`} className="px-1.5 text-xs text-gray-400">…</span>
          ) : (
            <button
              key={n}
              onClick={() => onChange(n as number)}
              className="w-8 h-8 text-xs font-bold rounded-lg border transition-all cursor-pointer"
              style={
                page === n
                  ? { background: "linear-gradient(135deg,#4338ca,#7c3aed)", color: "#fff", borderColor: "transparent" }
                  : { background: "#fff", color: "#374151", borderColor: "#e5e7eb" }
              }
            >
              {n}
            </button>
          ),
        )}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === Math.ceil(total / pageSize)}
          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          →
        </button>
      </div>
    </div>
  );
}

const NEW_DAYS = 7

function isNew(createdAt?: string) {
  if (!createdAt) return false
  return Date.now() - new Date(createdAt).getTime() < NEW_DAYS * 86_400_000
}

function TemplateCard({
  tpl,
  isLoggedIn,
  onPreview,
  onUse,
  isPreviewLoading = false,
  isUseLoading = false,
}: {
  tpl: TemplateMeta;
  isLoggedIn: boolean;
  onPreview: (tpl: TemplateMeta) => void;
  onUse: (tpl: TemplateMeta) => void;
  isPreviewLoading?: boolean;
  isUseLoading?: boolean;
}) {
  const catMeta = CATEGORY_META[tpl.category];
  const newTemplate = isNew(tpl.createdAt);
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-200">
      <div
        className={`h-40 bg-gradient-to-br ${tpl.gradient} flex flex-col items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/10 rounded-full translate-y-6 -translate-x-6" />
        {newTemplate && (
          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1 bg-emerald-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse inline-block" />
            Mới
          </div>
        )}
        <div className="text-4xl mb-2 relative z-10">{catMeta.icon}</div>
        <div className="relative z-10 px-4 text-center">
          <div className="text-white font-bold text-sm leading-tight">{tpl.name}</div>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-2 z-20">
          <button
            onClick={() => onPreview(tpl)}
            disabled={isPreviewLoading}
            className="flex items-center gap-1.5 bg-white/90 text-gray-900 rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-white transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-wait"
          >
            {isPreviewLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <ExternalLink className="w-3 h-3" />}
            {isPreviewLoading ? "Đang tải..." : "Xem trước"}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{tpl.name}</h3>
          <span
            className="flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${tpl.accentColor}18`, color: tpl.accentColor }}
          >
            {catMeta.label}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{tpl.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {tpl.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        {/* Nút xem trước chỉ hiện trên mobile — desktop dùng hover overlay */}
        <button
          onClick={() => onPreview(tpl)}
          disabled={isPreviewLoading}
          className="sm:hidden w-full mb-2 py-2 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-700 bg-white transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
        >
          {isPreviewLoading
            ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang tải...</>
            : <><ExternalLink className="w-3.5 h-3.5" /> Xem trước</>}
        </button>
        <button
          onClick={() => onUse(tpl)}
          disabled={isUseLoading}
          className="w-full py-2 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-80 disabled:cursor-wait"
          style={{ background: `linear-gradient(135deg, ${tpl.accentColor}, ${tpl.accentColor}cc)` }}
        >
          {isUseLoading ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang mở...</>
          ) : isLoggedIn ? (
            <>Dùng mẫu này →</>
          ) : (
            <><Lock className="w-3.5 h-3.5" /> Đăng nhập để dùng</>
          )}
        </button>
      </div>
    </div>
  );
}

function CategorySection({
  category,
  data,
  isLoggedIn,
  onPreview,
  onUse,
  onPageChange,
  previewLoadingId,
  useLoadingId,
}: {
  category: TemplateCategory;
  data: CatState;
  isLoggedIn: boolean;
  onPreview: (tpl: TemplateMeta) => void;
  onUse: (tpl: TemplateMeta) => void;
  onPageChange: (p: number) => void;
  previewLoadingId: string | null;
  useLoadingId: string | null;
}) {
  const catMeta = CATEGORY_META[category];
  if (data.total === 0) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-100 bg-gray-50">
        <span className="text-xl">{catMeta.icon}</span>
        <h2 className="text-sm font-extrabold text-gray-900 flex-1">{catMeta.label}</h2>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
          {data.total} mẫu
        </span>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 transition-opacity duration-150 ${data.loading ? "opacity-50 pointer-events-none" : ""}`}>
        {data.templates.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            tpl={tpl}
            isLoggedIn={isLoggedIn}
            onPreview={onPreview}
            onUse={onUse}
            isPreviewLoading={previewLoadingId === tpl.id}
            isUseLoading={useLoadingId === tpl.id}
          />
        ))}
      </div>
      <div className="border-t border-gray-100">
        <Pagination page={data.page} total={data.total} pageSize={TEMPLATES_PAGE_SIZE} onChange={onPageChange} />
      </div>
    </div>
  );
}

export default function TemplatesClient({
  initialGroups,
  isLoggedIn = false,
  userEmail,
  fullName,
  avatarUrl,
  plan = "free",
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [catData, setCatData] = useState<Record<string, CatState>>(() =>
    Object.fromEntries(
      Object.entries(initialGroups).map(([cat, g]) => [
        cat,
        { ...g, page: 1, loading: false },
      ]),
    ),
  );

  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const [tabsScrollState, setTabsScrollState] = useState({ left: false, right: true });

  useEffect(() => {
    const el = tabsScrollRef.current;
    if (!el) return;
    function update() {
      if (!el) return;
      setTabsScrollState({
        left: el.scrollLeft > 4,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
      });
    }
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Preview state
  const [previewMeta, setPreviewMeta] = useState<TemplateMeta | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewLoadingId, setPreviewLoadingId] = useState<string | null>(null);
  const [useLoadingId, setUseLoadingId] = useState<string | null>(null);

  const totalAll = Object.values(catData).reduce((s, d) => s + d.total, 0);

  async function fetchPage(cat: TemplateCategory, page: number) {
    setCatData((prev) => ({ ...prev, [cat]: { ...prev[cat], loading: true } }));
    const res = await fetch(`/api/templates?category=${cat}&page=${page}&limit=${TEMPLATES_PAGE_SIZE}`);
    const data: CatGroup = await res.json();
    setCatData((prev) => ({ ...prev, [cat]: { ...data, page, loading: false } }));
  }

  async function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    if (tab === "all") return;
    // Reload page 1 for the selected category if we haven't loaded it yet
    const current = catData[tab];
    if (!current || current.templates.length === 0) {
      await fetchPage(tab, 1);
    }
  }

  async function openPreview(tpl: TemplateMeta) {
    setPreviewLoadingId(tpl.id);
    setPreviewMeta(tpl);
    setPreviewHtml("");
    setPreviewLoading(true);
    setPreviewDevice("desktop");
    try {
      const res = await fetch(`/api/templates/${tpl.id}`);
      const full = await res.json();
      setPreviewHtml(full.html ?? "");
    } finally {
      setPreviewLoading(false);
      setPreviewLoadingId(null);
    }
  }

  function handleUse(tpl: TemplateMeta) {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setUseLoadingId(tpl.id);
    router.push(`/editor?template=${tpl.id}`);
  }

  const filteredData = activeTab !== "all" ? catData[activeTab] : null;

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
                <Link href="/profile" title={`Gói ${plan === "free" ? "Miễn phí" : plan === "basic" ? "Basic" : "Pro"}`}>
                  {plan === "free" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-gray-500 bg-gray-100 border border-gray-200">
                      <Sparkles className="w-2.5 h-2.5" /> Free
                    </span>
                  )}
                  {plan === "basic" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-500 shadow-sm">
                      <Crown className="w-2.5 h-2.5" /> Basic
                    </span>
                  )}
                  {plan === "pro" && (
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Thư viện mẫu</h1>
          <p className="text-gray-500">Chọn một mẫu để bắt đầu — chỉnh sửa trực tiếp trong editor.</p>
        </div>

        {/* Tabs */}
        <div className="relative mb-8">
          {/* Fade trái */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 transition-opacity duration-200"
            style={{
              background: "linear-gradient(to right, #f9fafb, transparent)",
              opacity: tabsScrollState.left ? 1 : 0,
            }}
          />
          {/* Fade phải + icon gợi ý cuộn */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 flex items-center justify-end pr-1 transition-opacity duration-200"
            style={{
              background: "linear-gradient(to left, #f9fafb, transparent)",
              opacity: tabsScrollState.right ? 1 : 0,
            }}
          >
            <span className="text-gray-400 text-xs">›</span>
          </div>
          <div
            ref={tabsScrollRef}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {TABS.map((tab) => {
              const count =
                tab.id === "all"
                  ? totalAll
                  : (catData[tab.id]?.total ?? 0);
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={[
                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer",
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600",
                  ].join(" ")}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={
                      activeTab === tab.id
                        ? { background: "rgba(255,255,255,0.25)", color: "#fff" }
                        : { background: "#f3f4f6", color: "#6b7280" }
                    }
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* All view — grouped by category */}
        {activeTab === "all" && (
          <div className="space-y-8">
            {CATEGORY_ORDER.filter((cat) => (catData[cat]?.total ?? 0) > 0).map((cat) => (
              <CategorySection
                key={cat}
                category={cat}
                data={catData[cat]}
                isLoggedIn={isLoggedIn}
                onPreview={openPreview}
                onUse={handleUse}
                onPageChange={(p) => fetchPage(cat, p)}
                previewLoadingId={previewLoadingId}
                useLoadingId={useLoadingId}
              />
            ))}
          </div>
        )}

        {/* Filtered view — single category */}
        {activeTab !== "all" && filteredData && (
          <>
            {filteredData.loading ? (
              <div className="text-center py-16 text-gray-400 text-sm">Đang tải...</div>
            ) : filteredData.total === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <LayoutTemplate className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-medium">Không có mẫu nào trong danh mục này.</p>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 transition-opacity duration-150`}>
                  {filteredData.templates.map((tpl) => (
                    <TemplateCard
                      key={tpl.id}
                      tpl={tpl}
                      isLoggedIn={isLoggedIn}
                      onPreview={openPreview}
                      onUse={handleUse}
                      isPreviewLoading={previewLoadingId === tpl.id}
                      isUseLoading={useLoadingId === tpl.id}
                    />
                  ))}
                </div>
                <div className="border-t border-gray-100">
                  <Pagination
                    page={filteredData.page}
                    total={filteredData.total}
                    pageSize={TEMPLATES_PAGE_SIZE}
                    onChange={(p) => fetchPage(activeTab as TemplateCategory, p)}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Preview Modal */}
      {previewMeta && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex flex-col"
          onClick={() => setPreviewMeta(null)}
        >
          {/* Toolbar */}
          <div
            className="flex-shrink-0 h-12 bg-slate-900 border-b border-slate-800 flex items-center gap-2 px-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewMeta(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: previewMeta.accentColor }} />
              <span className="text-white text-sm font-semibold truncate">{previewMeta.name}</span>
              <span className="hidden md:block text-slate-500 text-xs flex-shrink-0">— Xem trước</span>
            </div>

            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 gap-0.5 flex-shrink-0">
              {([
                { id: "desktop", icon: <Monitor className="w-3.5 h-3.5" />, label: "Desktop" },
                { id: "tablet",  icon: <Tablet   className="w-3.5 h-3.5" />, label: "Tablet"  },
                { id: "mobile",  icon: <Smartphone className="w-3.5 h-3.5" />, label: "Mobile" },
              ] as const).map((d) => (
                <button
                  key={d.id}
                  onClick={() => setPreviewDevice(d.id)}
                  title={d.label}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                    previewDevice === d.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {d.icon}
                  <span className="hidden sm:inline">{d.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); handleUse(previewMeta); }}
              disabled={useLoadingId === previewMeta.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex-shrink-0 transition-opacity hover:opacity-90 cursor-pointer disabled:opacity-80 disabled:cursor-wait"
              style={{ background: previewMeta.accentColor }}
            >
              {useLoadingId === previewMeta.id ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="hidden sm:inline">Đang mở...</span>
                  <span className="sm:hidden">...</span>
                </>
              ) : isLoggedIn ? (
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
            className="flex-1 min-h-0 overflow-hidden flex justify-center items-center bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {previewLoading ? (
              <div className="flex flex-col items-center gap-3 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-sm">Đang tải xem trước...</span>
              </div>
            ) : (
              <iframe
                srcDoc={previewHtml}
                className="border-0 block h-full flex-shrink-0"
                style={{
                  width: previewDevice === "desktop" ? "100%" : previewDevice === "tablet" ? "768px" : "390px",
                }}
                sandbox="allow-same-origin"
                title={`Xem trước: ${previewMeta.name}`}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
