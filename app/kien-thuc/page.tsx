import Link from "next/link";
import {
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  Layers,
  Code2,
  Megaphone,
  FileText,
  BarChart2,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import Logo from "@/components/Logo";
import { ARTICLES } from "@/lib/articles";

export const metadata = {
  title: "Kiến thức AI Content | AI Content Booster",
  description:
    "Hướng dẫn, mẹo và chiến lược tạo nội dung bằng AI cho thị trường Việt Nam.",
  alternates: { canonical: "https://aicontentbooster.vn/kien-thuc" },
};

type CategoryKey =
  | "Landing Page"
  | "So sánh"
  | "Quảng cáo"
  | "Kỹ thuật"
  | "Content"
  | "SEO"
  | "Hướng dẫn";

const CAT: Record<
  CategoryKey,
  { text: string; bg: string; dot: string; icon: React.ReactNode; grad: string }
> = {
  "Landing Page": {
    text: "text-indigo-700",
    bg: "bg-indigo-100",
    dot: "bg-indigo-500",
    icon: <Layers className="w-3.5 h-3.5" />,
    grad: "from-indigo-500 to-violet-600",
  },
  "So sánh": {
    text: "text-violet-700",
    bg: "bg-violet-100",
    dot: "bg-violet-500",
    icon: <BarChart2 className="w-3.5 h-3.5" />,
    grad: "from-violet-500 to-purple-600",
  },
  "Quảng cáo": {
    text: "text-rose-700",
    bg: "bg-rose-100",
    dot: "bg-rose-500",
    icon: <Megaphone className="w-3.5 h-3.5" />,
    grad: "from-rose-500 to-pink-600",
  },
  "Kỹ thuật": {
    text: "text-emerald-700",
    bg: "bg-emerald-100",
    dot: "bg-emerald-500",
    icon: <Code2 className="w-3.5 h-3.5" />,
    grad: "from-emerald-500 to-teal-600",
  },
  Content: {
    text: "text-amber-700",
    bg: "bg-amber-100",
    dot: "bg-amber-500",
    icon: <FileText className="w-3.5 h-3.5" />,
    grad: "from-amber-500 to-orange-500",
  },
  SEO: {
    text: "text-blue-700",
    bg: "bg-blue-100",
    dot: "bg-blue-500",
    icon: <Search className="w-3.5 h-3.5" />,
    grad: "from-blue-500 to-indigo-600",
  },
  "Hướng dẫn": {
    text: "text-teal-700",
    bg: "bg-teal-100",
    dot: "bg-teal-500",
    icon: <GraduationCap className="w-3.5 h-3.5" />,
    grad: "from-teal-500 to-cyan-600",
  },
};

function getCat(category: string) {
  return CAT[category as CategoryKey] ?? CAT["Content"];
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

export default function KienThucPage() {
  const all = Object.values(ARTICLES).sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  const tutorials = all.filter((a) => a.category === "Hướng dẫn");
  const knowledge = all.filter((a) => a.category !== "Hướng dẫn");

  return (
    <div className="min-h-screen" style={{ background: "#f4f6fb" }}>
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 border-b border-gray-200 shadow-sm"
        style={{ background: "#fff" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo iconSize={30} uid="kb-nav" />
          <nav className="flex items-center gap-4">
            <Link
              href="/#pricing"
              className="hidden sm:block text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              Bảng giá
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-bold text-white rounded-lg btn-gradient shadow"
            >
              Dùng thử miễn phí
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-16"
        style={{
          background:
            "linear-gradient(135deg,#4338ca 0%,#7c3aed 55%,#9333ea 100%)",
        }}
      >
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle,#fff 0%,transparent 70%)",
            transform: "translate(-40%,-40%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle,#fff 0%,transparent 70%)",
            transform: "translate(40%,40%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-bold rounded-full border border-white/30"
            style={{ background: "rgba(255,255,255,0.15)", color: "#e0e7ff" }}
          >
            <BookOpen className="w-3.5 h-3.5" /> Kiến thức AI Content
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Hướng dẫn &amp; Chiến lược tạo nội dung với AI
          </h1>
          <p className="text-indigo-200 text-base max-w-xl mx-auto leading-relaxed">
            Từ landing page đến quảng cáo Facebook — học cách dùng AI tạo nội
            dung chuyên nghiệp cho thị trường Việt Nam.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* ── Hướng dẫn sử dụng ── */}
        <section
          className="rounded-2xl overflow-hidden border border-teal-100"
          style={{ background: "linear-gradient(135deg,#f0fdfa 0%,#e0f2fe 100%)" }}
        >
          <div className="px-6 pt-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-gray-900">Bắt đầu từ đây</h2>
                <p className="text-xs text-gray-500 mt-0.5">Hướng dẫn sử dụng AI Content Booster</p>
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
                className="group flex items-start gap-3 p-4 rounded-xl bg-white border border-teal-100 hover:border-teal-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-gray-400 mt-1.5">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                </div>
                <ChevronRight className="flex-shrink-0 w-4 h-4 text-teal-300 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all self-center" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Kiến thức AI Marketing ── */}
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-5 flex items-center gap-3">
            <span
              className="inline-block w-1 h-5 rounded-full"
              style={{ background: "linear-gradient(to bottom,#6366f1,#8b5cf6)" }}
            />
            Kiến thức AI Marketing
            <span className="text-sm font-medium text-gray-400 ml-1">
              {knowledge.length} bài
            </span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {knowledge.map((article) => {
              const c = getCat(article.category);
              return (
                <Link
                  key={article.slug}
                  href={`/kien-thuc/${article.slug}`}
                  className="group flex flex-col p-5 rounded-2xl border border-gray-200 bg-white hover:border-indigo-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Category + time */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${c.bg} ${c.text}`}
                    >
                      {c.icon}&nbsp;{article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-indigo-700 transition-colors flex-1">
                    {article.title}
                  </h3>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{formatDate(article.publishedDate)}</span>
                    <span className={`flex items-center gap-1 text-xs font-bold ${c.text} group-hover:gap-1.5 transition-all`}>
                      Đọc <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="relative overflow-hidden rounded-3xl p-10 text-center text-white shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg,#4338ca 0%,#7c3aed 60%,#9333ea 100%)",
          }}
        >
          <div
            className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle,#fff,transparent 70%)" }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle,#fff,transparent 70%)" }}
          />
          <div className="relative">
            <div
              className="inline-flex items-center gap-1.5 text-xs font-bold mb-4 px-3 py-1.5 rounded-full border border-white/30"
              style={{ background: "rgba(255,255,255,0.15)", color: "#e0e7ff" }}
            >
              <Sparkles className="w-3.5 h-3.5" /> Áp dụng ngay hôm nay
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Sẵn sàng tạo nội dung với AI?
            </h2>
            <p className="text-indigo-200 mb-7 max-w-lg mx-auto text-sm leading-relaxed">
              Áp dụng những gì bạn vừa học — tạo landing page và content ngay
              trong 60 giây.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-extrabold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-sm"
            >
              Bắt đầu miễn phí <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-10 text-center text-xs"
        style={{ background: "#0f0f11", color: "#6b7280" }}
      >
        <Logo iconSize={22} uid="kb-footer" className="inline-flex mb-3 brightness-75" />
        <p className="mt-1">
          © 2026 AI Content Booster ·{" "}
          <Link href="/" className="hover:text-gray-300 transition-colors">Trang chủ</Link>{" "}
          ·{" "}
          <Link href="/kien-thuc" className="hover:text-gray-300 transition-colors">Kiến thức</Link>
        </p>
      </footer>
    </div>
  );
}
