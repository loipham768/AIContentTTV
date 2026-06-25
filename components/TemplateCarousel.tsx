"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { CATEGORY_META } from "@/lib/constants";

type TemplateItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  gradient: string;
  accentColor: string;
};

function MiniPreview({
  category,
  gradient,
  accentColor,
}: {
  category: string;
  gradient: string;
  accentColor: string;
}) {
  if (category === "article") {
    return (
      <div className="h-40 bg-white relative overflow-hidden">
        <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />
        <div className="p-3 pt-2.5">
          <div className="flex gap-1 mb-2 items-center">
            <div className="w-8 h-1 rounded" style={{ background: `${accentColor}60` }} />
            <div className="w-1 h-1 bg-gray-200 rounded-full" />
            <div className="w-12 h-1 bg-gray-200 rounded" />
          </div>
          <div className="w-full h-2.5 bg-gray-800 rounded mb-1" />
          <div className="w-4/5 h-2.5 bg-gray-700 rounded mb-2.5" />
          <div className="flex gap-2 mb-2.5">
            <div className="w-10 h-1 bg-gray-200 rounded" />
            <div className="w-px h-1 bg-gray-200" />
            <div className="w-8 h-1 bg-gray-200 rounded" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-1 bg-gray-100 rounded mb-1.5 ${i === 4 ? "w-1/2" : "w-full"}`} />
          ))}
        </div>
      </div>
    );
  }

  if (category === "portfolio") {
    return (
      <div className="h-40 bg-gray-900 relative overflow-hidden">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex-shrink-0`} />
            <div>
              <div className="w-16 h-1.5 bg-white/80 rounded mb-1" />
              <div className="w-10 h-1 bg-white/40 rounded" />
            </div>
            <div className="ml-auto w-12 h-4 rounded-lg" style={{ background: `${accentColor}90` }} />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              "from-indigo-400 to-violet-500",
              "from-teal-400 to-cyan-500",
              "from-rose-400 to-pink-500",
              "from-amber-400 to-orange-500",
              "from-blue-400 to-indigo-500",
              "from-emerald-400 to-teal-500",
            ].map((g, i) => (
              <div key={i} className={`h-10 rounded-lg bg-gradient-to-br ${g}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (category === "cv") {
    return (
      <div className="h-40 bg-white relative overflow-hidden flex">
        <div className={`w-14 bg-gradient-to-b ${gradient} flex-shrink-0 p-2 flex flex-col items-center gap-1.5 pt-3`}>
          <div className="w-8 h-8 rounded-full bg-white/30 mb-0.5" />
          <div className="w-8 h-1 bg-white/70 rounded" />
          <div className="w-6 h-1 bg-white/50 rounded" />
          <div className="mt-2 w-full space-y-1">
            {[0.7, 0.9, 0.6, 0.8].map((o, i) => (
              <div key={i} className="h-0.5 rounded" style={{ background: `rgba(255,255,255,${o})` }} />
            ))}
          </div>
        </div>
        <div className="flex-1 p-2.5">
          <div className="w-20 h-2 bg-gray-800 rounded mb-1" />
          <div className="w-14 h-1 bg-gray-400 rounded mb-2" />
          <div className="w-full h-px bg-gray-100 mb-1.5" />
          {[1, 2].map((i) => (
            <div key={i} className="mb-2">
              <div className="w-16 h-1.5 bg-gray-700 rounded mb-0.5" />
              <div className="w-10 h-1 bg-gray-300 rounded mb-1" />
              <div className="w-full h-0.5 bg-gray-100 rounded" />
              <div className="w-3/4 h-0.5 bg-gray-100 rounded mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (category === "ads") {
    return (
      <div className={`h-40 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full" />
        <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute inset-0 p-4 flex flex-col justify-center">
          <div className="w-14 h-4 rounded-full bg-yellow-400/90 mb-2.5 flex items-center px-2">
            <div className="w-8 h-1 bg-yellow-900/40 rounded" />
          </div>
          <div className="w-28 h-3 bg-white/90 rounded mb-1.5" />
          <div className="w-20 h-2 bg-white/60 rounded mb-3" />
          <div className="w-20 h-6 bg-yellow-400 rounded-lg shadow-lg" />
        </div>
      </div>
    );
  }

  /* landing (default) */
  return (
    <div className={`h-40 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
      <div className="absolute inset-0 p-3 flex flex-col">
        <div className="flex items-center gap-1 mb-2.5">
          <div className="w-12 h-1.5 bg-white/60 rounded" />
          <div className="ml-auto flex gap-1">
            <div className="w-5 h-1.5 bg-white/30 rounded" />
            <div className="w-5 h-1.5 bg-white/30 rounded" />
            <div className="w-10 h-1.5 bg-yellow-300/80 rounded" />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-1.5">
          <div className="w-28 h-2.5 bg-white/90 rounded" />
          <div className="w-20 h-1.5 bg-white/60 rounded" />
          <div className="w-16 h-1.5 bg-white/50 rounded" />
          <div className="w-16 h-5 bg-yellow-400/90 rounded-lg mt-1.5" />
        </div>
        <div className="flex gap-1.5 mt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 bg-white/10 rounded p-1.5 flex flex-col items-center gap-1">
              <div className="w-3 h-3 rounded bg-white/30" />
              <div className="w-full h-0.5 bg-white/25 rounded" />
              <div className="w-3/4 h-0.5 bg-white/20 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CATEGORY_PRIORITY: Record<string, number> = {
  article: 0,
  portfolio: 1,
  cv: 2,
  landing: 3,
  ads: 4,
};

function TemplateCard({ t, hasRealData }: { t: TemplateItem; hasRealData: boolean }) {
  const catMeta = CATEGORY_META[t.category as keyof typeof CATEGORY_META];
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-200 flex flex-col h-full">
      <div className="relative flex-shrink-0">
        <MiniPreview category={t.category} gradient={t.gradient} accentColor={t.accentColor} />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center z-20">
          <Link
            href={hasRealData ? `/templates?preview=${t.id}` : "/templates"}
            className="flex items-center gap-1.5 bg-white/90 text-gray-900 rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-white transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> Xem trước
          </Link>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{t.name}</h3>
          <span
            className="flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${t.accentColor}18`, color: t.accentColor }}
          >
            {catMeta?.label ?? t.category}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2 flex-1">
          {t.description}
        </p>
        <Link
          href={hasRealData ? `/templates?preview=${t.id}` : "/templates"}
          className="sm:hidden w-full mb-2 py-2 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-700 flex items-center justify-center gap-1.5"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Xem trước
        </Link>
        <Link
          href={hasRealData ? `/editor?template=${t.id}` : "/templates"}
          className="w-full py-2 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
          style={{ background: `linear-gradient(135deg, ${t.accentColor}, ${t.accentColor}cc)` }}
        >
          Dùng mẫu này →
        </Link>
      </div>
    </div>
  );
}

export default function TemplateCarousel({
  templates,
  hasRealData,
}: {
  templates: TemplateItem[];
  hasRealData: boolean;
}) {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const update = () => setItemsPerPage(window.innerWidth < 640 ? 3 : 6);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = Math.ceil(templates.length / itemsPerPage);

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  const pages = Array.from({ length: totalPages }, (_, i) =>
    templates.slice(i * itemsPerPage, (i + 1) * itemsPerPage),
  );

  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  const next = useCallback(
    () => setPage((p) => Math.min(totalPages - 1, p + 1)),
    [totalPages],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
    touchStartX.current = null;
  };

  return (
    <div>
      {/* Sliding track */}
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((pageItems, pageIdx) => (
            <div key={pageIdx} className="w-full shrink-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pageItems.map((t) => (
                <TemplateCard key={t.id} t={t} hasRealData={hasRealData} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            disabled={page === 0}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            aria-label="Trang trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-7 h-2.5 bg-indigo-600"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-indigo-300"
                }`}
                aria-label={`Trang ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={page === totalPages - 1}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            aria-label="Trang sau"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
