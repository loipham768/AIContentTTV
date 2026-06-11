"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  Layers,
  BarChart2,
  Megaphone,
  Code2,
  FileText,
  Search,
  GraduationCap,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import type { Article } from "@/lib/articles";

type CategoryKey =
  | "Hướng dẫn"
  | "Landing Page"
  | "So sánh"
  | "Quảng cáo"
  | "Kỹ thuật"
  | "Content"
  | "SEO";

const CAT: Record<
  CategoryKey,
  {
    text: string;
    bg: string;
    dot: string;
    icon: React.ReactNode;
    grad: string;
    sectionBg: string;
    headerBg: string;
    border: string;
    filterActiveBg: string;
    filterActiveText: string;
  }
> = {
  "Hướng dẫn": {
    text: "text-teal-700",
    bg: "bg-teal-100",
    dot: "bg-teal-500",
    icon: <GraduationCap className="w-3.5 h-3.5" />,
    grad: "from-teal-500 to-cyan-600",
    sectionBg: "#f0fdfa",
    headerBg: "linear-gradient(135deg,#ccfbf1 0%,#f0fdfa 100%)",
    border: "#99f6e4",
    filterActiveBg: "#0d9488",
    filterActiveText: "#fff",
  },
  "Landing Page": {
    text: "text-indigo-700",
    bg: "bg-indigo-100",
    dot: "bg-indigo-500",
    icon: <Layers className="w-3.5 h-3.5" />,
    grad: "from-indigo-500 to-violet-600",
    sectionBg: "#f5f3ff",
    headerBg: "linear-gradient(135deg,#ede9fe 0%,#f5f3ff 100%)",
    border: "#ddd6fe",
    filterActiveBg: "#4338ca",
    filterActiveText: "#fff",
  },
  "So sánh": {
    text: "text-violet-700",
    bg: "bg-violet-100",
    dot: "bg-violet-500",
    icon: <BarChart2 className="w-3.5 h-3.5" />,
    grad: "from-violet-500 to-purple-600",
    sectionBg: "#faf5ff",
    headerBg: "linear-gradient(135deg,#f3e8ff 0%,#faf5ff 100%)",
    border: "#e9d5ff",
    filterActiveBg: "#7c3aed",
    filterActiveText: "#fff",
  },
  "Quảng cáo": {
    text: "text-rose-700",
    bg: "bg-rose-100",
    dot: "bg-rose-500",
    icon: <Megaphone className="w-3.5 h-3.5" />,
    grad: "from-rose-500 to-pink-600",
    sectionBg: "#fff1f2",
    headerBg: "linear-gradient(135deg,#ffe4e6 0%,#fff1f2 100%)",
    border: "#fecdd3",
    filterActiveBg: "#e11d48",
    filterActiveText: "#fff",
  },
  "Kỹ thuật": {
    text: "text-emerald-700",
    bg: "bg-emerald-100",
    dot: "bg-emerald-500",
    icon: <Code2 className="w-3.5 h-3.5" />,
    grad: "from-emerald-500 to-teal-600",
    sectionBg: "#f0fdf4",
    headerBg: "linear-gradient(135deg,#dcfce7 0%,#f0fdf4 100%)",
    border: "#bbf7d0",
    filterActiveBg: "#059669",
    filterActiveText: "#fff",
  },
  Content: {
    text: "text-amber-700",
    bg: "bg-amber-100",
    dot: "bg-amber-500",
    icon: <FileText className="w-3.5 h-3.5" />,
    grad: "from-amber-500 to-orange-500",
    sectionBg: "#fffbeb",
    headerBg: "linear-gradient(135deg,#fef3c7 0%,#fffbeb 100%)",
    border: "#fde68a",
    filterActiveBg: "#d97706",
    filterActiveText: "#fff",
  },
  SEO: {
    text: "text-blue-700",
    bg: "bg-blue-100",
    dot: "bg-blue-500",
    icon: <Search className="w-3.5 h-3.5" />,
    grad: "from-blue-500 to-indigo-600",
    sectionBg: "#eff6ff",
    headerBg: "linear-gradient(135deg,#dbeafe 0%,#eff6ff 100%)",
    border: "#bfdbfe",
    filterActiveBg: "#1d4ed8",
    filterActiveText: "#fff",
  },
};

function isNew(publishedDate: string) {
  return (Date.now() - new Date(publishedDate).getTime()) / 86_400_000 <= 7;
}

const CATEGORY_ORDER: CategoryKey[] = [
  "Hướng dẫn",
  "Landing Page",
  "Content",
  "Quảng cáo",
  "SEO",
  "Kỹ thuật",
  "So sánh",
];

interface Props {
  articles: Article[];
  isLoggedIn: boolean;
}

export default function KienThucArticles({ articles, isLoggedIn }: Props) {
  const [active, setActive] = useState<"all" | CategoryKey>("all");

  const tutorials = articles.filter((a) => a.category === "Hướng dẫn");
  const knowledge = articles.filter((a) => a.category !== "Hướng dẫn");

  // Count per category for filter chips
  const counts = CATEGORY_ORDER.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = articles.filter((a) => a.category === cat).length;
    return acc;
  }, {});

  // Filtered flat list when a category is active
  const filtered =
    active === "all" ? [] : articles.filter((a) => a.category === active);

  return (
    <div className="space-y-8">
      {/* ── Filter bar ── */}
      <div className="flex flex-wrap gap-2">
        {/* All chip */}
        <button
          onClick={() => setActive("all")}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold transition-all duration-150 border"
          style={
            active === "all"
              ? {
                  background: "linear-gradient(135deg,#4338ca,#7c3aed)",
                  color: "#fff",
                  borderColor: "transparent",
                  boxShadow: "0 2px 8px rgba(99,102,241,0.35)",
                }
              : {
                  background: "#fff",
                  color: "#374151",
                  borderColor: "#e5e7eb",
                }
          }
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          Tất cả
          <span
            className="text-xs px-1.5 py-0.5 rounded-full"
            style={
              active === "all"
                ? { background: "rgba(255,255,255,0.25)", color: "#fff" }
                : { background: "#f3f4f6", color: "#6b7280" }
            }
          >
            {articles.length}
          </span>
        </button>

        {/* Category chips */}
        {CATEGORY_ORDER.filter((cat) => (counts[cat] ?? 0) > 0).map((cat) => {
          const c = CAT[cat];
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold transition-all duration-150 border"
              style={
                isActive
                  ? {
                      background: c.filterActiveBg,
                      color: c.filterActiveText,
                      borderColor: "transparent",
                      boxShadow: `0 2px 8px ${c.filterActiveBg}55`,
                    }
                  : {
                      background: "#fff",
                      color: "#374151",
                      borderColor: "#e5e7eb",
                    }
              }
            >
              {c.icon}
              {cat}
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={
                  isActive
                    ? { background: "rgba(255,255,255,0.25)", color: "#fff" }
                    : { background: "#f3f4f6", color: "#6b7280" }
                }
              >
                {counts[cat]}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Filtered flat grid ── */}
      {active !== "all" && (
        <FilteredGrid articles={filtered} category={active} />
      )}

      {/* ── Default two-section layout ── */}
      {active === "all" && (
        <>
          {/* Tutorials */}
          {tutorials.length > 0 && (
            <section
              className="rounded-2xl overflow-hidden border border-teal-100"
              style={{
                background: "linear-gradient(135deg,#f0fdfa 0%,#e0f2fe 100%)",
              }}
            >
              <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-sm">
                    <GraduationCap className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-gray-900">
                      Bắt đầu từ đây
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Hướng dẫn sử dụng AITaoPage
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-teal-600 bg-teal-100 px-2.5 py-1 rounded-full">
                  {tutorials.length} bài
                </span>
              </div>
              <div className="px-4 pb-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {tutorials.map((article, i) => (
                  <Link
                    key={article.slug}
                    href={`/kien-thuc/${article.slug}`}
                    className="group flex items-start gap-3 p-4 rounded-xl bg-white border border-teal-100 hover:border-teal-300 hover:shadow-lg transition-all duration-200"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white text-xs font-extrabold flex items-center justify-center shadow-sm">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-1.5">
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2 flex-1">
                          {article.title}
                        </h3>
                        {isNew(article.publishedDate) && (
                          <span className="flex-shrink-0 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-green-500 text-white leading-none mt-0.5">
                            Mới
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-teal-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Knowledge grouped by category */}
          <section className="space-y-8">
            <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-3">
              <span
                className="inline-block w-1 h-5 rounded-full"
                style={{
                  background: "linear-gradient(to bottom,#6366f1,#8b5cf6)",
                }}
              />
              Kiến thức AI Marketing
              <span className="text-sm font-medium text-gray-400">
                {knowledge.length} bài
              </span>
            </h2>

            {(["Landing Page", "Content", "Quảng cáo", "SEO", "Kỹ thuật", "So sánh"] as CategoryKey[])
              .map((cat) => ({
                cat,
                items: knowledge.filter((a) => a.category === cat),
              }))
              .filter((g) => g.items.length > 0)
              .map(({ cat, items }) => {
                const c = CAT[cat];
                return (
                  <div
                    key={cat}
                    className="rounded-2xl overflow-hidden"
                    style={{ border: `1px solid ${c.border}`, background: c.sectionBg }}
                  >
                    <div
                      className="flex items-center gap-2.5 px-5 py-3.5 border-b"
                      style={{ background: c.headerBg, borderColor: c.border }}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c.grad} flex items-center justify-center text-white shadow-sm flex-shrink-0`}
                      >
                        {c.icon}
                      </div>
                      <h3 className={`text-sm font-extrabold ${c.text} flex-1`}>
                        {cat}
                      </h3>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}
                      >
                        {items.length} bài
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                      {items.map((article) => (
                        <Link
                          key={article.slug}
                          href={`/kien-thuc/${article.slug}`}
                          className="group flex flex-col p-4 rounded-xl bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                          style={{ border: `1px solid ${c.border}` }}
                        >
                          <div className="flex items-start gap-1.5 flex-1">
                            <h4 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 flex-1">
                              {article.title}
                            </h4>
                            {isNew(article.publishedDate) && (
                              <span className="relative flex-shrink-0 mt-0.5">
                                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                                <span className="relative text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-green-500 text-white leading-none inline-block">
                                  Mới
                                </span>
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock className="w-3 h-3" /> {article.readTime}
                            </span>
                            <span
                              className={`flex items-center gap-0.5 text-xs font-bold ${c.text}`}
                            >
                              Đọc <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
          </section>
        </>
      )}
    </div>
  );
}

function FilteredGrid({
  articles,
  category,
}: {
  articles: Article[];
  category: CategoryKey;
}) {
  const c = CAT[category];

  if (articles.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 text-sm">
        Chưa có bài viết trong mục này.
      </div>
    );
  }

  return (
    <section>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${c.border}`, background: c.sectionBg }}
      >
        <div
          className="flex items-center gap-2.5 px-5 py-3.5 border-b"
          style={{ background: c.headerBg, borderColor: c.border }}
        >
          <div
            className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c.grad} flex items-center justify-center text-white shadow-sm flex-shrink-0`}
          >
            {c.icon}
          </div>
          <h2 className={`text-sm font-extrabold ${c.text} flex-1`}>
            {category}
          </h2>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}
          >
            {articles.length} bài
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/kien-thuc/${article.slug}`}
              className="group flex flex-col p-4 rounded-xl bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              style={{ border: `1px solid ${c.border}` }}
            >
              <div className="flex items-start gap-1.5 flex-1">
                <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 flex-1">
                  {article.title}
                </h3>
                {isNew(article.publishedDate) && (
                  <span className="flex-shrink-0 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-green-500 text-white leading-none mt-0.5">
                    Mới
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" /> {article.readTime}
                </span>
                <span
                  className={`flex items-center gap-0.5 text-xs font-bold ${c.text}`}
                >
                  Đọc <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
