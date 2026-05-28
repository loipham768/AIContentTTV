import Link from "next/link";
import {
  BookOpen,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Search,
  Layers,
  Code2,
  Megaphone,
  FileText,
  BarChart2,
  GraduationCap,
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
  {
    text: string;
    bg: string;
    dot: string;
    icon: React.ReactNode;
    grad: string;
    light: string;
  }
> = {
  "Landing Page": {
    text: "text-indigo-700",
    bg: "bg-indigo-100",
    dot: "bg-indigo-500",
    icon: <Layers className="w-3.5 h-3.5" />,
    grad: "from-indigo-500 to-violet-600",
    light: "bg-indigo-50",
  },
  "So sánh": {
    text: "text-violet-700",
    bg: "bg-violet-100",
    dot: "bg-violet-500",
    icon: <BarChart2 className="w-3.5 h-3.5" />,
    grad: "from-violet-500 to-purple-600",
    light: "bg-violet-50",
  },
  "Quảng cáo": {
    text: "text-rose-700",
    bg: "bg-rose-100",
    dot: "bg-rose-500",
    icon: <Megaphone className="w-3.5 h-3.5" />,
    grad: "from-rose-500 to-pink-600",
    light: "bg-rose-50",
  },
  "Kỹ thuật": {
    text: "text-emerald-700",
    bg: "bg-emerald-100",
    dot: "bg-emerald-500",
    icon: <Code2 className="w-3.5 h-3.5" />,
    grad: "from-emerald-500 to-teal-600",
    light: "bg-emerald-50",
  },
  Content: {
    text: "text-amber-700",
    bg: "bg-amber-100",
    dot: "bg-amber-500",
    icon: <FileText className="w-3.5 h-3.5" />,
    grad: "from-amber-500 to-orange-500",
    light: "bg-amber-50",
  },
  SEO: {
    text: "text-blue-700",
    bg: "bg-blue-100",
    dot: "bg-blue-500",
    icon: <Search className="w-3.5 h-3.5" />,
    grad: "from-blue-500 to-indigo-600",
    light: "bg-blue-50",
  },
  "Hướng dẫn": {
    text: "text-teal-700",
    bg: "bg-teal-100",
    dot: "bg-teal-500",
    icon: <GraduationCap className="w-3.5 h-3.5" />,
    grad: "from-teal-500 to-cyan-600",
    light: "bg-teal-50",
  },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function getCat(category: string) {
  return CAT[category as CategoryKey] ?? CAT["Content"];
}

export default function KienThucPage() {
  const allArticles = Object.values(ARTICLES).sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
  const featured = allArticles.slice(0, 2);
  const rest = allArticles.slice(2);

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
        className="relative overflow-hidden py-20"
        style={{
          background:
            "linear-gradient(135deg,#4338ca 0%,#7c3aed 55%,#9333ea 100%)",
        }}
      >
        {/* Decorative orbs */}
        <div
          className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle,#fff 0%,transparent 70%)",
            transform: "translate(-40%,-40%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle,#fff 0%,transparent 70%)",
            transform: "translate(40%,40%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-bold rounded-full border border-white/30"
            style={{ background: "rgba(255,255,255,0.15)", color: "#e0e7ff" }}
          >
            <BookOpen className="w-3.5 h-3.5" /> Kiến thức AI Content
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Hướng dẫn &amp; Chiến lược
            <br className="hidden sm:block" />
            <span className="opacity-90"> tạo nội dung với AI</span>
          </h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Từ landing page đến quảng cáo Facebook — học cách dùng AI để tạo nội
            dung chuyên nghiệp, tối ưu chuyển đổi cho thị trường Việt Nam.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {(
              Object.entries(CAT) as [CategoryKey, (typeof CAT)[CategoryKey]][]
            ).map(([cat, c]) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-white/20"
                style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} /> {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* ── Featured ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-200"
              style={{ background: "#fffbeb" }}
            >
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">
                Bài viết mới nhất
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((article, i) => {
              const c = getCat(article.category);
              return (
                <Link
                  key={article.slug}
                  href={`/kien-thuc/${article.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-gray-200 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                  style={{ background: "#fff" }}
                >
                  {/* Gradient header band */}
                  <div
                    className={`h-32 bg-gradient-to-br ${c.grad} flex items-end p-5`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border border-white/30 text-white"
                        style={{ background: "rgba(255,255,255,0.2)" }}
                      >
                        {c.icon} {article.category}
                      </span>
                      {i === 0 && (
                        <span className="text-xs font-bold text-white bg-amber-500 px-2.5 py-1 rounded-full">
                          ⭐ Mới nhất
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="p-6">
                    <h2 className="text-lg font-extrabold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {article.readTime}
                        </span>
                        <span>{formatDate(article.publishedDate)}</span>
                      </div>
                      <span
                        className={`flex items-center gap-1 text-xs font-bold ${c.text} group-hover:gap-2 transition-all`}
                      >
                        Đọc tiếp <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── All articles ── */}
        <section>
          <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
            <span
              className="inline-block w-1 h-6 rounded-full"
              style={{
                background: "linear-gradient(to bottom,#6366f1,#8b5cf6)",
              }}
            />
            Tất cả bài viết
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {rest.map((article) => {
              const c = getCat(article.category);
              return (
                <Link
                  key={article.slug}
                  href={`/kien-thuc/${article.slug}`}
                  className="group flex gap-4 p-5 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  style={{ background: "#fff" }}
                >
                  {/* Icon block */}
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm bg-gradient-to-br ${c.grad}`}
                  >
                    {c.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${c.bg} ${c.text}`}
                      >
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-indigo-700 transition-colors mb-1">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1 leading-relaxed">
                      {article.description}
                    </p>
                  </div>

                  <ArrowRight className="flex-shrink-0 w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all self-center" />
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
            className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle,#fff,transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle,#fff,transparent 70%)",
            }}
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
        <Logo
          iconSize={22}
          uid="kb-footer"
          className="inline-flex mb-3 brightness-75"
        />
        <p className="mt-1">
          © 2026 AI Content Booster ·{" "}
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Trang chủ
          </Link>{" "}
          ·{" "}
          <Link
            href="/kien-thuc"
            className="hover:text-gray-300 transition-colors"
          >
            Kiến thức
          </Link>
        </p>
      </footer>
    </div>
  );
}
