import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";
import { getInitialGroups, ARTICLES_PAGE_SIZE } from "@/lib/articles-db";
import { auth } from "@/auth";
import KienThucArticles from "@/components/KienThucArticles";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 3600; // ISR: recheck every hour

export const metadata = {
  title: "Kiến thức AI Content | TaoPage",
  description: "Hướng dẫn, mẹo và chiến lược tạo nội dung bằng AI cho thị trường Việt Nam.",
  alternates: { canonical: `${SITE_URL}/kien-thuc` },
  openGraph: {
    title: "Kiến thức AI Content | TaoPage",
    description: "Hướng dẫn, mẹo và chiến lược tạo nội dung bằng AI cho thị trường Việt Nam.",
    url: `${SITE_URL}/kien-thuc`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default async function KienThucPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  let initialGroups: Awaited<ReturnType<typeof getInitialGroups>> = {};
  try {
    initialGroups = await getInitialGroups(
      ["Hướng dẫn", "Landing Page", "So sánh", "Quảng cáo", "Kỹ thuật", "Content", "SEO"],
      ARTICLES_PAGE_SIZE,
    );
  } catch {
    // DB not available at build time
  }

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
              href={isLoggedIn ? "/create" : "/login"}
              className="px-4 py-2 text-sm font-bold text-white rounded-lg btn-gradient shadow"
            >
              {isLoggedIn ? "Tạo nội dung ngay" : "Dùng thử miễn phí"}
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
        {/* ── Articles with filter ── */}
        <KienThucArticles initialGroups={initialGroups} isLoggedIn={isLoggedIn} />

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
              href={isLoggedIn ? "/create" : "/login"}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-extrabold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-sm"
            >
              {isLoggedIn ? "Tạo nội dung ngay" : "Bắt đầu miễn phí"}{" "}
              <ArrowRight className="w-4 h-4" />
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
          © 2026 TaoPage ·{" "}
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Trang chủ
          </Link>{" "}
          ·{" "}
          <Link href="/kien-thuc" className="hover:text-gray-300 transition-colors">
            Kiến thức
          </Link>
        </p>
      </footer>
    </div>
  );
}
