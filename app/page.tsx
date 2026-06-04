import Link from "next/link";
import { auth } from "@/auth";
import {
  Zap,
  LayoutTemplate,
  Code2,
  Globe,
  History,
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
  Copy,
  MousePointer2,
  MessageSquare,
  ShieldCheck,
  FileDown,
  Layers,
  Crown,
  BookOpen,
  Tag,
  LogIn,
  UserPlus,
} from "lucide-react";

import ScrollReveal from "@/components/ScrollReveal";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Logo from "@/components/Logo";
import UserAvatar from "@/components/UserAvatar";
import MobileNav from "@/components/MobileNav";
import UserMenu from "@/components/UserMenu";
import ScrollHeaderWrapper from "@/components/ScrollHeaderWrapper";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

/* ── Tính năng thực tế đã xây dựng ─────────────────────────────── */

const FEATURES = [
  {
    icon: <MessageSquare className="w-5 h-5 text-white" />,
    iconGrad: "from-violet-500 to-purple-600",
    cardGrad: "from-violet-50/90 to-purple-50/50",
    bar: "from-violet-400 to-purple-500",
    title: "AI hỏi đáp để hiểu đúng yêu cầu",
    desc: "Gemini AI đặt câu hỏi từng bước — màu sắc, phong cách, đối tượng — rồi tạo landing page chuẩn theo ý bạn.",
  },
  {
    icon: <Zap className="w-5 h-5 text-white" />,
    iconGrad: "from-amber-400 to-yellow-500",
    cardGrad: "from-amber-50/90 to-yellow-50/50",
    bar: "from-amber-400 to-yellow-400",
    title: "Tạo nhanh với Claude AI",
    desc: "Nhập một câu mô tả, Claude tạo khối HTML hoàn chỉnh trong chưa đầy 1 giây — không cần hỏi thêm.",
  },
  {
    icon: <LayoutTemplate className="w-5 h-5 text-white" />,
    iconGrad: "from-blue-500 to-indigo-600",
    cardGrad: "from-blue-50/90 to-indigo-50/50",
    bar: "from-blue-400 to-indigo-500",
    title: "Editor kéo thả trực quan",
    desc: "GrapesJS cho phép kéo thả khối, chỉnh màu, font, khoảng cách ngay trên canvas — không cần code.",
  },
  {
    icon: <Code2 className="w-5 h-5 text-white" />,
    iconGrad: "from-emerald-400 to-teal-600",
    cardGrad: "from-emerald-50/90 to-teal-50/50",
    bar: "from-emerald-400 to-teal-500",
    title: "Xuất HTML inline CSS sạch",
    desc: "CSS tự động nhúng vào từng thẻ HTML — sao chép hoặc tải file. Không cần stylesheet riêng.",
  },
  {
    icon: <Globe className="w-5 h-5 text-white" />,
    iconGrad: "from-orange-400 to-rose-500",
    cardGrad: "from-orange-50/90 to-rose-50/50",
    bar: "from-orange-400 to-rose-400",
    title: "Tương thích mọi CMS Việt Nam",
    desc: "Dán HTML vào Haravan, Sapo, WordPress, Shopify, TinyMCE, CKEditor — hoạt động hoàn hảo ngay lập tức.",
  },
  {
    icon: <History className="w-5 h-5 text-white" />,
    iconGrad: "from-pink-500 to-fuchsia-600",
    cardGrad: "from-pink-50/90 to-fuchsia-50/50",
    bar: "from-pink-400 to-fuchsia-500",
    title: "Lưu & mở lại dự án",
    desc: "Tất cả nội dung lưu tự động vào tài khoản — mở lại, chỉnh sửa tiếp bất kỳ lúc nào.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-white" />,
    iconGrad: "from-slate-500 to-gray-700",
    cardGrad: "from-slate-50/90 to-gray-50/50",
    bar: "from-slate-400 to-gray-500",
    title: "Bảo mật theo gói — chặn tại server",
    desc: "Giới hạn lượt tạo và xuất HTML được kiểm tra phía server, không thể vượt qua dù dùng DevTools hay Postman.",
  },
  {
    icon: <Layers className="w-5 h-5 text-white" />,
    iconGrad: "from-cyan-400 to-blue-500",
    cardGrad: "from-cyan-50/90 to-blue-50/50",
    bar: "from-cyan-400 to-blue-400",
    title: "Tạo được nhiều loại nội dung, 1 công cụ",
    desc: "Landing page bán hàng, bài viết blog/CMS, nội dung quảng cáo Facebook & Google — tất cả trong một nơi.",
  },
];

/* ── 3 loại nội dung có thể tạo ─────────────────────────────────── */

const CONTENT_TYPES = [
  {
    emoji: "🏠",
    grad: "from-indigo-500 to-violet-600",
    bg: "from-indigo-50 to-violet-50",
    border: "border-indigo-100",
    title: "Landing Page",
    desc: "Trang bán hàng, khóa học online, dịch vụ agency, SaaS, sự kiện.",
    badge: "Gemini AI hỏi đáp",
    badgeColor: "bg-violet-100 text-violet-700",
    examples: [
      "Bán sản phẩm skincare",
      "Khóa học lập trình",
      "Agency thiết kế",
      "Ra mắt app mobile",
    ],
  },
  {
    emoji: "📝",
    grad: "from-blue-500 to-cyan-500",
    bg: "from-blue-50 to-cyan-50",
    border: "border-blue-100",
    title: "Bài Viết & Content",
    desc: "Blog SEO, review sản phẩm, hướng dẫn sử dụng, tin tức.",
    badge: "Claude AI nhanh",
    badgeColor: "bg-blue-100 text-blue-700",
    examples: [
      "Blog SEO lên Top Google",
      "Review sản phẩm",
      "Hướng dẫn & tutorial",
      "Mô tả sản phẩm",
    ],
  },
  {
    emoji: "📣",
    grad: "from-rose-500 to-pink-600",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-100",
    title: "Quảng Cáo",
    desc: "Banner Facebook Ads, Google Ads, email marketing.",
    badge: "Claude AI nhanh",
    badgeColor: "bg-rose-100 text-rose-700",
    examples: [
      "Banner Facebook Ads",
      "Google Display Ads",
      "Email marketing",
      "Carousel quảng cáo",
    ],
  },
];

/* ── Quy trình thực tế ───────────────────────────────────────────── */

const STEPS = [
  {
    step: "01",
    stepGrad: "from-violet-500 to-purple-600",
    wrapGrad: "from-violet-100/80 to-purple-100/60",
    title: "Chọn loại nội dung & mô tả",
    desc: "Chọn Landing Page, Bài viết hoặc Quảng cáo. AI sẽ hỏi thêm để hiểu đúng ý bạn — màu sắc, phong cách, đối tượng mục tiêu.",
    preview: (
      <div className="bg-white rounded-xl border border-violet-100 p-4 shadow-sm space-y-2">
        <div className="text-xs text-gray-400 mb-3 font-medium">
          AI đang hỏi thêm thông tin...
        </div>
        <div className="bg-violet-50 rounded-lg p-3 text-sm text-gray-700 border border-violet-100">
          Bạn muốn tạo landing page cho sản phẩm hay dịch vụ?
        </div>
        <div className="bg-indigo-600 rounded-lg p-3 text-sm text-white self-end ml-8">
          Bán khóa học lập trình web cho người mới bắt đầu
        </div>
        <div className="bg-violet-50 rounded-lg p-3 text-sm text-gray-700 border border-violet-100">
          Màu chủ đạo bạn muốn dùng là gì?
        </div>
        <div className="flex gap-2 mt-2">
          {["Xanh dương", "Tím", "Tối (Dark)"].map((c) => (
            <span
              key={c}
              className="text-xs px-2 py-1 bg-white border border-gray-200 rounded-full text-gray-600 cursor-pointer hover:border-violet-300"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    step: "02",
    stepGrad: "from-blue-500 to-indigo-600",
    wrapGrad: "from-blue-100/80 to-indigo-100/60",
    title: "AI tạo HTML hoàn chỉnh",
    desc: "Sau khi thu thập đủ thông tin, AI tạo ra trang HTML đầy đủ — hero, tính năng, CTA, footer — trong vài giây.",
    preview: (
      <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">
            AI đang tạo landing page...
          </span>
          <span className="ml-auto text-xs font-medium text-blue-600">~3s</span>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg p-4 text-white">
          <div className="text-xs text-blue-200 mb-1">
            KHÓA HỌC LẬP TRÌNH WEB
          </div>
          <div className="font-bold text-base mb-1">
            Từ 0 đến Junior Developer
          </div>
          <div className="text-blue-100 text-xs mb-3">
            Học trong 3 tháng — có việc làm ngay
          </div>
          <div className="flex gap-2">
            <div className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg">
              Đăng ký ngay
            </div>
            <div className="border border-white/40 text-white text-xs px-3 py-1.5 rounded-lg">
              Xem chương trình
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span className="text-xs text-gray-400">
            HTML đầy đủ · inline CSS · sẵn sàng chỉnh sửa
          </span>
        </div>
      </div>
    ),
  },
  {
    step: "03",
    stepGrad: "from-emerald-500 to-teal-600",
    wrapGrad: "from-emerald-100/80 to-teal-100/60",
    title: "Chỉnh sửa kéo thả — rồi sao chép",
    desc: "Mở trong editor GrapesJS, kéo thả khối, chỉnh màu, font chữ. Xong thì sao chép HTML hoặc tải file — dán vào CMS.",
    preview: (
      <div className="bg-white rounded-xl border border-emerald-100 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-gray-400">GrapesJS Editor</span>
        </div>
        <div className="text-xs font-mono bg-gray-900 rounded-lg p-3 text-left leading-relaxed mb-3">
          <span className="text-blue-400">&lt;div</span>
          <span className="text-yellow-300"> style</span>
          <span className="text-gray-300">
            =&quot;background:#2563eb;...&quot;
          </span>
          <span className="text-blue-400">&gt;</span>
          <br />
          <span className="text-gray-500 ml-3">&lt;</span>
          <span className="text-blue-400">h1</span>
          <span className="text-yellow-300"> style</span>
          <span className="text-gray-300">
            =&quot;color:#fff;font-size:32px&quot;
          </span>
          <span className="text-gray-500">&gt;</span>
          <span className="text-green-300">Khóa học...</span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500 text-white text-xs py-2 rounded-lg font-semibold">
            <Copy className="w-3 h-3" /> Sao chép HTML
          </button>
          <button className="flex items-center justify-center gap-1.5 bg-slate-700 text-white text-xs py-2 px-3 rounded-lg font-semibold">
            <FileDown className="w-3 h-3" /> Tải file
          </button>
        </div>
      </div>
    ),
  },
];

const CMS_BADGES = [
  { name: "Haravan", color: "text-orange-600 border-orange-200 bg-orange-50" },
  { name: "Sapo", color: "text-blue-600 border-blue-200 bg-blue-50" },
  {
    name: "WordPress",
    color: "text-indigo-600 border-indigo-200 bg-indigo-50",
  },
  { name: "Shopify", color: "text-green-700 border-green-200 bg-green-50" },
  { name: "TinyMCE", color: "text-violet-600 border-violet-200 bg-violet-50" },
  { name: "CKEditor", color: "text-rose-600 border-rose-200 bg-rose-50" },
  { name: "Haravan", color: "text-orange-600 border-orange-200 bg-orange-50" },
  { name: "Sapo", color: "text-blue-600 border-blue-200 bg-blue-50" },
  {
    name: "WordPress",
    color: "text-indigo-600 border-indigo-200 bg-indigo-50",
  },
  { name: "Shopify", color: "text-green-700 border-green-200 bg-green-50" },
  { name: "TinyMCE", color: "text-violet-600 border-violet-200 bg-violet-50" },
  { name: "CKEditor", color: "text-rose-600 border-rose-200 bg-rose-50" },
];

/* ── Page ───────────────────────────────────────────────────────── */

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  let userProfile: { fullName: string; avatarUrl: string } | null = null;
  if (session?.user?.id) {
    await dbConnect();
    const u = (await User.findById(session.user.id, {
      fullName: 1,
      avatarUrl: 1,
    }).lean()) as any;
    if (u)
      userProfile = {
        fullName: u.fullName ?? "",
        avatarUrl: u.avatarUrl ?? "",
      };
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <ScrollHeaderWrapper>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo iconSize={32} uid="nav" />

          {/* Desktop nav — ẩn hoàn toàn trên mobile */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/kien-thuc"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Kiến thức
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <LayoutTemplate className="w-4 h-4" /> Mẫu có sẵn
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Tag className="w-4 h-4" /> Bảng giá
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-2 ml-2">
                <Link
                  href="/create"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold btn-gradient text-white rounded-lg shadow-sm"
                >
                  <Zap className="w-3.5 h-3.5" /> Tạo nội dung
                </Link>
                <UserMenu
                  avatarUrl={userProfile?.avatarUrl}
                  fullName={userProfile?.fullName}
                  email={session!.user!.email ?? ""}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <LogIn className="w-4 h-4" /> Đăng nhập
                </Link>
                <Link
                  href="/login?tab=register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold btn-gradient text-white rounded-lg shadow-sm"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Đăng ký miễn phí
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile — chỉ hiện hamburger */}
          <MobileNav
            isLoggedIn={isLoggedIn}
            userName={
              userProfile?.fullName ?? session?.user?.email ?? undefined
            }
            avatarUrl={userProfile?.avatarUrl}
            email={session?.user?.email ?? undefined}
          />
        </div>
      </ScrollHeaderWrapper>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 sm:py-28"
        style={{
          background:
            "linear-gradient(135deg, #ddd6fe 0%, #faf5ff 45%, #e0e7ff 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] bg-indigo-500/40 animate-blob"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 w-[440px] h-[440px] bg-violet-500/35 animate-blob-2"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-400/20 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-10">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full border border-indigo-200">
                <Sparkles className="w-3.5 h-3.5" />
                Công cụ AI tạo nội dung cho thị trường Việt Nam
              </div>

              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Landing page, bài viết,
                <br className="hidden sm:block" />
                quảng cáo —
                <span className="gradient-text"> xong trong 60 giây</span>
              </h1>

              <p className="hero-subtitle text-lg sm:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 mb-8">
                Mô tả bằng tiếng Việt, AI tạo HTML chuẩn inline CSS. Chỉnh sửa
                kéo thả trong editor — dán ngay vào Haravan, Sapo, WordPress.
              </p>

              {/* Content type pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                {[
                  {
                    label: "🏠 Landing Page",
                    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
                  },
                  {
                    label: "📝 Bài Viết & Blog",
                    color: "bg-blue-100 text-blue-700 border-blue-200",
                  },
                  {
                    label: "📣 Quảng Cáo",
                    color: "bg-rose-100 text-rose-700 border-rose-200",
                  },
                ].map(({ label, color }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${color}`}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="hero-cta flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                {isLoggedIn ? (
                  <Link
                    href="/create"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold btn-gradient text-white rounded-xl animate-pulse-glow"
                  >
                    <Zap className="w-4 h-4" /> Tạo nội dung ngay
                  </Link>
                ) : (
                  <Link
                    href="/login?tab=register"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold btn-gradient text-white rounded-xl animate-pulse-glow"
                  >
                    Bắt đầu miễn phí
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-indigo-700 bg-white border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  Xem cách hoạt động
                </a>
              </div>

              {/* Stats */}
              <div className="hero-stats flex flex-wrap justify-center lg:justify-start gap-8 mt-10 pt-10 border-t border-indigo-100">
                {[
                  {
                    value: "3 loại",
                    label: "nội dung có thể tạo",
                    grad: "from-indigo-600 to-violet-600",
                  },
                  {
                    value: "< 1s",
                    label: "thời gian tạo HTML",
                    grad: "from-violet-600 to-purple-600",
                  },
                  {
                    value: "6 CMS",
                    label: "tương thích hoàn hảo",
                    grad: "from-blue-500 to-cyan-500",
                  },
                ].map(({ value, label, grad }) => (
                  <div key={label} className="text-center lg:text-left">
                    <div
                      className={`text-2xl font-extrabold bg-gradient-to-r ${grad} bg-clip-text text-transparent`}
                    >
                      {value}
                    </div>
                    <div className="text-sm text-gray-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: mockup */}
            <div className="hero-mockup flex-1 w-full max-w-lg relative">
              <div className="hidden sm:flex absolute -top-5 -left-4 z-20 bg-white rounded-2xl shadow-xl px-4 py-2.5 items-center gap-2 text-sm font-medium text-gray-700 border border-indigo-100 animate-float">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                AI đang tạo landing page...
              </div>
              <div className="hidden sm:block absolute -bottom-5 -right-4 z-20 bg-white rounded-2xl shadow-xl px-4 py-3 border border-violet-100 animate-float-slow">
                <div className="text-xs text-gray-400 mb-0.5">
                  HTML sẵn sàng dán vào CMS
                </div>
                <div className="text-sm font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Haravan · Sapo · WordPress
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-2 ring-indigo-500/20">
                <div className="h-10 bg-gray-900 flex items-center px-4 gap-3">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 bg-gray-700/70 rounded text-gray-400 text-xs px-3 py-1 text-center truncate">
                    aicontentbooster.vn/create
                  </div>
                </div>

                <div className="flex bg-gray-100" style={{ height: "340px" }}>
                  <div className="flex-1 p-3 overflow-hidden flex flex-col gap-2">
                    {/* AI chat UI */}
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">
                          AITaoPage
                        </span>
                      </div>
                      <div className="bg-violet-50 rounded-lg p-2.5 text-xs text-gray-700 border border-violet-100">
                        Bạn muốn tạo loại nội dung nào?
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {["🏠 Landing Page", "📝 Bài viết", "📣 Quảng cáo"].map(
                          (t) => (
                            <span
                              key={t}
                              className={`text-xs px-2 py-1 rounded-full border ${t.startsWith("🏠") ? "bg-indigo-600 text-white border-indigo-600" : "bg-white border-gray-200 text-gray-600"}`}
                            >
                              {t}
                            </span>
                          ),
                        )}
                      </div>
                      <div className="bg-violet-50 rounded-lg p-2.5 text-xs text-gray-700 border border-violet-100 mt-1">
                        Landing page cho sản phẩm hay dịch vụ gì?
                      </div>
                      <div className="bg-indigo-600 rounded-lg p-2.5 text-xs text-white self-end max-w-[80%]">
                        Khóa học lập trình web fullstack, giá 2.990.000đ
                      </div>
                      <div className="bg-green-50 rounded-lg p-2.5 text-xs text-gray-700 border border-green-100 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Đang tạo landing page...
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-xl p-3 text-white text-center flex-shrink-0">
                      <div className="text-xs text-indigo-200 mb-0.5">
                        KHÓA HỌC FULLSTACK
                      </div>
                      <div className="font-bold text-sm mb-1.5">
                        Từ 0 đến Junior Dev
                      </div>
                      <div className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full inline-block">
                        Đăng ký ngay →
                      </div>
                    </div>
                  </div>

                  <div className="w-32 bg-white border-l border-gray-200 p-2.5 hidden xl:flex flex-col gap-2 shrink-0">
                    <div className="text-xs font-semibold text-gray-700 mb-1">
                      Style
                    </div>
                    {[
                      {
                        label: "Màu nền",
                        content: (
                          <div className="h-5 rounded bg-gradient-to-r from-indigo-600 to-violet-600 border border-gray-200" />
                        ),
                      },
                      {
                        label: "Font",
                        content: (
                          <div className="h-5 bg-gray-100 rounded border border-gray-200 flex items-center px-1.5 text-xs text-gray-600">
                            24px
                          </div>
                        ),
                      },
                      {
                        label: "Radius",
                        content: (
                          <div className="h-5 bg-gray-100 rounded border border-gray-200 flex items-center px-1.5 text-xs text-gray-600">
                            12px
                          </div>
                        ),
                      },
                    ].map(({ label, content }) => (
                      <div key={label}>
                        <div className="text-xs text-gray-400 mb-0.5">
                          {label}
                        </div>
                        {content}
                      </div>
                    ))}
                    <div className="mt-auto pt-2 border-t border-gray-100">
                      <div className="bg-emerald-500 text-white text-xs text-center py-1.5 rounded-lg flex items-center justify-center gap-1">
                        <Copy className="w-2.5 h-2.5" /> Copy HTML
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-7 bg-gray-900 flex items-center px-4 gap-2">
                  <span className="text-green-400 text-xs">●</span>
                  <span className="text-gray-400 text-xs">
                    HTML inline CSS · 0 JS · Dán vào CMS ngay
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CMS Compatibility strip ─────────────────────────────────── */}
      <section
        className="py-10 overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, #e0e7ff 0%, #ede9fe 50%, #e0e7ff 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm font-semibold text-indigo-400 mb-6 tracking-widest uppercase">
            HTML tạo ra tương thích hoàn hảo với
          </p>
          <div className="flex overflow-hidden">
            <div className="flex gap-6 animate-marquee whitespace-nowrap shrink-0">
              {CMS_BADGES.map(({ name, color }, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold shrink-0 ${color}`}
                >
                  <Globe className="w-4 h-4" /> {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content Types ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              3 loại nội dung bạn có thể tạo
            </h2>
            <p className="text-gray-500">
              Mỗi loại được tối ưu với AI phù hợp — đúng mục đích, đúng định
              dạng
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {CONTENT_TYPES.map((ct, i) => (
              <ScrollReveal key={ct.title} delay={i * 80} className="h-full">
                <div
                  className={`h-full rounded-2xl bg-gradient-to-br ${ct.bg} border ${ct.border} p-6 flex flex-col`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ct.grad} flex items-center justify-center text-2xl mb-4 shadow-md flex-shrink-0`}
                  >
                    {ct.emoji}
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {ct.title}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ct.badgeColor} flex-shrink-0 ml-2`}
                    >
                      {ct.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{ct.desc}</p>
                  <ul className="space-y-1.5 flex-1">
                    {ct.examples.map((ex) => (
                      <li
                        key={ex}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />{" "}
                        {ex}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={isLoggedIn ? "/create" : "/login?tab=register"}
                    className={`mt-5 block text-center py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r ${ct.grad} text-white hover:opacity-90 transition-opacity shadow-sm`}
                  >
                    Tạo {ct.title} →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-24"
        style={{
          background:
            "linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #d1fae5 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Chỉ 3 bước
            </h2>
            <p className="text-gray-500">
              Từ ý tưởng đến HTML production-ready trong chưa đầy một phút
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-20">
            {STEPS.map(
              ({ step, stepGrad, wrapGrad, title, desc, preview }, i) => (
                <div
                  key={step}
                  className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10`}
                >
                  <ScrollReveal
                    className="flex-1"
                    from={i % 2 === 0 ? "left" : "right"}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${stepGrad} text-white font-extrabold text-lg mb-5 shadow-lg`}
                    >
                      {step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {title}
                    </h3>
                    <p className="text-gray-500 text-lg leading-relaxed">
                      {desc}
                    </p>
                  </ScrollReveal>
                  <ScrollReveal
                    className="flex-1 w-full"
                    from={i % 2 === 0 ? "right" : "left"}
                    delay={100}
                  >
                    <div
                      className={`rounded-2xl overflow-hidden shadow-xl p-1.5 bg-gradient-to-br ${wrapGrad} border border-white/60`}
                    >
                      {preview}
                    </div>
                  </ScrollReveal>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(135deg, #ede9fe 0%, #faf5ff 50%, #e0e7ff 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Tính năng đã có sẵn
            </h2>
            <p className="text-gray-500">
              Xây dựng dành riêng cho thị trường Việt Nam
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(
              ({ icon, iconGrad, cardGrad, bar, title, desc }, i) => (
                <ScrollReveal key={title} delay={i * 50} className="h-full">
                  <div
                    className={`relative bg-gradient-to-br ${cardGrad} rounded-2xl p-5 border border-white/80 shadow-sm card-lift h-full overflow-hidden flex flex-col`}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${bar}`}
                    />
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconGrad} flex items-center justify-center mb-3 shadow-md mt-3 flex-shrink-0`}
                    >
                      {icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1.5 text-sm">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </ScrollReveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Demo: Before → After ───────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24"
        style={{
          background:
            "linear-gradient(135deg, #312e81 0%, #4c1d95 55%, #1e1a4e 100%)",
        }}
      >
        <div className="pointer-events-none absolute -left-32 top-1/4 w-96 h-96 bg-indigo-400/40 blur-3xl rounded-full animate-blob" />
        <div className="pointer-events-none absolute -right-32 bottom-1/4 w-80 h-80 bg-violet-400/35 blur-3xl rounded-full animate-blob-2" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Xem kết quả thực tế
            </h2>
            <p className="text-gray-400">
              Từ mô tả tiếng Việt đến HTML production-ready
            </p>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row items-stretch gap-6">
            <ScrollReveal className="flex-1" from="left">
              <div className="h-full bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30">
                    <MousePointer2 className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="font-semibold text-gray-200">Bạn mô tả</span>
                </div>
                <div className="bg-white/10 rounded-xl border border-white/10 p-4 flex-1 text-sm text-gray-300 leading-relaxed">
                  Tạo banner quảng cáo mùa hè cho shop thời trang. Nền gradient
                  xanh đậm sang tím. Tiêu đề &ldquo;SALE HÈ 2026&rdquo;, phụ đề
                  &ldquo;Giảm đến 50%&rdquo;. Nút CTA màu vàng &ldquo;Mua
                  ngay&rdquo;.
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  AI xử lý trong &lt; 1 giây
                </div>
              </div>
            </ScrollReveal>

            <div className="flex items-center justify-center md:flex-col gap-2 text-indigo-400 shrink-0">
              <div className="hidden md:flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-indigo-500/40" />
                <ArrowRight className="w-6 h-6 rotate-90" />
                <div className="text-xs text-indigo-400/70">0.8s</div>
                <div className="w-px h-8 bg-indigo-500/40" />
              </div>
              <ArrowRight className="w-6 h-6 md:hidden" />
            </div>

            <ScrollReveal className="flex-1" from="right" delay={100}>
              <div className="h-full bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="font-semibold text-gray-200">AI tạo ra</span>
                </div>
                <div className="flex-1 rounded-xl overflow-hidden shadow-xl">
                  <div className="h-full bg-gradient-to-br from-indigo-700 via-violet-600 to-purple-800 p-6 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 rounded-full translate-y-16 -translate-x-16" />
                    <div className="relative">
                      <div className="text-xs text-indigo-200 tracking-widest uppercase mb-2 font-medium">
                        Bộ sưu tập hè 2026
                      </div>
                      <h3 className="text-3xl font-black tracking-tight leading-none mb-1">
                        SALE HÈ
                      </h3>
                      <h3 className="text-3xl font-black tracking-tight text-yellow-300 mb-4">
                        2026
                      </h3>
                      <p className="text-indigo-100 text-sm mb-6">
                        Giảm đến{" "}
                        <span className="text-yellow-300 font-bold text-lg">
                          50%
                        </span>{" "}
                        toàn bộ
                        <br />
                        sản phẩm thời trang hot nhất!
                      </p>
                      <button className="bg-yellow-400 text-gray-900 font-bold px-6 py-2.5 rounded-xl text-sm shadow-lg">
                        Mua ngay →
                      </button>
                    </div>
                    <div className="relative mt-4 bg-white/10 rounded-lg px-3 py-2 text-xs text-indigo-200 font-mono truncate">
                      &lt;div
                      style=&quot;background:linear-gradient(135deg,#4338ca...&quot;&gt;
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    HTML inline CSS · 0 JS · CMS-ready
                  </span>
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                    <Copy className="w-3.5 h-3.5" /> Sao chép
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────── */}
      <TestimonialsCarousel />

      {/* ── Pricing ────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className="py-24"
        style={{
          background:
            "linear-gradient(135deg, #e0e7ff 0%, #faf5ff 50%, #ede9fe 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Bảng giá
            </h2>
            <p className="text-gray-500">
              Bắt đầu miễn phí — nâng cấp khi bạn cần nhiều hơn
            </p>
          </ScrollReveal>

          <ScrollReveal className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-xl px-4 py-2 text-sm text-gray-600 shadow-sm">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="font-medium text-indigo-700">
                Mua theo năm tiết kiệm ~20%
              </span>
              <span className="text-xs text-gray-400">
                · Thanh toán chuyển khoản ngân hàng
              </span>
            </div>
          </ScrollReveal>

          {/* Subscription plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pt-2 mb-16">
            {/* Free */}
            <ScrollReveal from="left" className="h-full">
              <div className="rounded-2xl border border-gray-200 bg-white p-7 card-lift h-full flex flex-col">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  Miễn phí
                </p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">
                    0đ
                  </span>
                  <span className="text-gray-400 mb-1 text-sm">/tháng</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-500">
                  Không cần thẻ ngân hàng
                </p>
                <Link
                  href={isLoggedIn ? "/create" : "/login?plan=free"}
                  className="mt-5 block text-center py-2.5 text-sm font-semibold text-indigo-600 border border-indigo-300 rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  {isLoggedIn ? "Tạo nội dung ngay" : "Bắt đầu miễn phí"}
                </Link>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {[
                    { text: "4 lượt tạo nội dung/tháng", ok: true },
                    { text: "Chỉnh sửa trong editor", ok: true },
                    { text: "3 template mẫu", ok: false },
                    { text: "Sao chép / xuất HTML", ok: false },
                  ].map(({ text, ok }) => (
                    <li
                      key={text}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${ok ? "text-emerald-500" : "text-gray-300"}`}
                      />
                      <span className={ok ? "" : "text-gray-400"}>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Designer */}
            <ScrollReveal delay={60} className="h-full">
              <div className="rounded-2xl border-2 border-teal-200 bg-white p-7 card-lift h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-bl-full" />
                <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
                  Designer
                </p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">
                    59.000đ
                  </span>
                  <span className="text-gray-500 mb-1 text-sm">/tháng</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-500">
                  hoặc 47.000đ/tháng khi mua năm
                </p>
                <Link
                  href="/upgrade?plan=designer"
                  className="mt-5 block text-center py-2.5 text-sm font-semibold text-teal-700 border-2 border-teal-400 rounded-xl hover:bg-teal-50 transition-colors"
                >
                  Đăng ký Designer
                </Link>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {[
                    "Kéo thả không giới hạn",
                    "Sao chép & xuất file HTML",
                    "Toàn bộ template mẫu",
                    "Lưu lịch sử 30 ngày",
                    { text: "Tạo nội dung bằng AI", disabled: true },
                  ].map((f) => {
                    const disabled = typeof f === "object" && f.disabled;
                    const text = typeof f === "string" ? f : f.text;
                    return (
                      <li
                        key={text}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${disabled ? "text-gray-300" : "text-emerald-500"}`}
                        />
                        <span className={disabled ? "text-gray-400" : ""}>
                          {text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </ScrollReveal>

            {/* Basic */}
            <ScrollReveal delay={80} className="h-full">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-7 shadow-2xl relative card-lift text-white h-full flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-amber-400 text-gray-900 rounded-full shadow">
                    <Star className="w-3 h-3 fill-gray-900" /> Phổ biến nhất
                  </span>
                </div>
                <p className="text-sm font-semibold text-indigo-200 uppercase tracking-wide">
                  Basic
                </p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    99.000đ
                  </span>
                  <span className="text-indigo-200 mb-1 text-sm">/tháng</span>
                </div>
                <p className="mt-1.5 text-sm text-indigo-300">
                  hoặc 79.000đ/tháng khi mua năm
                </p>
                <Link
                  href="/upgrade?plan=basic"
                  className="mt-5 block text-center py-2.5 text-sm font-bold bg-white text-indigo-700 rounded-xl hover:bg-indigo-50 transition-colors shadow-md"
                >
                  Nâng cấp Basic
                </Link>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {[
                    "25 lượt tạo nội dung/tháng",
                    "Sao chép & xuất file HTML",
                    "Toàn bộ template mẫu",
                    "Lưu lịch sử 30 ngày",
                    "Hỗ trợ qua email",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-white/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-indigo-200 shrink-0" />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Pro */}
            <ScrollReveal from="right" className="h-full">
              <div className="rounded-2xl border-2 border-indigo-200 bg-white p-7 card-lift h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-bl-full" />
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                  Pro
                </p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">
                    199.000đ
                  </span>
                  <span className="text-gray-500 mb-1 text-sm">/tháng</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-500">
                  hoặc 159.000đ/tháng khi mua năm
                </p>
                <Link
                  href="/upgrade?plan=pro"
                  className="mt-5 block text-center py-2.5 text-sm font-semibold text-indigo-700 border-2 border-indigo-400 rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  Nâng cấp Pro
                </Link>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {[
                    "Không giới hạn bài viết HTML",
                    "Không giới hạn lượt tạo nội dung",
                    "Toàn bộ tính năng Basic",
                    "Lưu lịch sử không giới hạn",
                    "Hỗ trợ Zalo ưu tiên trong 4h",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Credits */}
          <ScrollReveal className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Hoặc nạp credits
            </h3>
            <p className="text-gray-500 text-sm">
              Không cần đăng ký tháng — nạp khi cần, dùng bao nhiêu trả bấy
              nhiêu. Credits không hết hạn.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                packId: "c1",
                amount: "20.000đ",
                desc: "4 lượt tạo nội dung",
                highlight: false,
              },
              {
                packId: "c2",
                amount: "50.000đ",
                desc: "12 lượt tạo nội dung",
                highlight: false,
              },
              {
                packId: "c3",
                amount: "100.000đ",
                desc: "30 lượt tạo nội dung",
                highlight: true,
                badge: "Tiết kiệm nhất",
              },
              {
                packId: "c4",
                amount: "200.000đ",
                desc: "72 lượt tạo nội dung",
                highlight: false,
              },
            ].map(({ packId, amount, desc, highlight, badge }) => (
              <ScrollReveal key={packId} className="h-full">
                <div
                  className={`rounded-2xl p-5 h-full flex flex-col gap-3 relative ${highlight ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20" : "bg-white border border-gray-200"}`}
                >
                  {badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-0.5 bg-amber-400 text-gray-900 rounded-full shadow whitespace-nowrap">
                      {badge}
                    </span>
                  )}
                  <p
                    className={`text-2xl font-extrabold ${highlight ? "text-white" : "text-gray-900"}`}
                  >
                    {amount}
                  </p>
                  <p
                    className={`text-sm flex-1 ${highlight ? "text-emerald-50" : "text-gray-600"}`}
                  >
                    {desc}
                  </p>
                  <Link
                    href={`/upgrade?type=credits&pack=${packId}`}
                    className={`block text-center py-2 text-xs font-semibold rounded-xl transition-colors ${highlight ? "bg-white text-emerald-700 hover:bg-emerald-50" : "text-indigo-600 border border-indigo-200 hover:bg-indigo-50"}`}
                  >
                    Nạp ngay
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-8">
            <p className="text-sm text-gray-400">
              Chúng tôi rất fairplay — dùng bao nhiêu trả bấy nhiêu, không gói
              cước, không ràng buộc, không phí ẩn.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{
          background: "linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Câu hỏi thường gặp
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {(
              [
                {
                  q: "Tôi có cần biết code HTML/CSS không?",
                  a: "Không. Bạn chỉ cần mô tả bằng tiếng Việt tự nhiên. AI tạo toàn bộ HTML và CSS, rồi bạn chỉnh sửa trực tiếp bằng cách kéo thả trong editor.",
                  accent: "border-l-indigo-400",
                },
                {
                  q: "HTML tạo ra có dán vào Haravan/Sapo được không?",
                  a: 'Có. Khi bạn nhấn "Sao chép HTML", hệ thống xử lý phía server để nhúng toàn bộ CSS vào từng thẻ HTML (inline style). CMS không lọc bỏ định dạng vì không có thẻ <style> hay <script>.',
                  accent: "border-l-violet-400",
                },
                {
                  q: "Gói miễn phí bị giới hạn ở đâu?",
                  a: "Gói Free: 4 lượt tạo nội dung mỗi tháng (landing page, bài viết hoặc quảng cáo). Có thể chỉnh sửa trong editor nhưng không sao chép hay tải HTML. Giới hạn này được kiểm tra phía server — không thể vượt qua bằng DevTools.",
                  accent: "border-l-purple-400",
                },
                {
                  q: "Thanh toán như thế nào?",
                  a: "Chuyển khoản ngân hàng — bạn chọn gói, nhận mã đơn hàng, chuyển tiền ghi mã đó vào nội dung. Đội ngũ kích hoạt thủ công trong 1–4 giờ. Thời hạn giữ đơn 24 giờ.",
                  accent: "border-l-blue-400",
                },
                {
                  q: "AI nào được dùng để tạo nội dung?",
                  a: "Hai AI: Claude (Anthropic) cho tạo nhanh khối HTML từ một câu mô tả; Gemini (Google) cho luồng hỏi đáp nhiều bước khi tạo landing page phức tạp cần hiểu rõ yêu cầu.",
                  accent: "border-l-emerald-400",
                },
              ] as const
            ).map(({ q, a, accent }, i) => (
              <ScrollReveal key={q} delay={i * 60}>
                <div
                  className={`bg-white rounded-2xl p-6 border border-indigo-100 border-l-4 ${accent} card-lift shadow-sm`}
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24"
        style={{
          background:
            "linear-gradient(135deg, #4338ca 0%, #7c3aed 40%, #a21caf 75%, #db2777 100%)",
        }}
      >
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full animate-blob" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 bg-pink-400/20 rounded-full animate-blob-2" />
        <ScrollReveal>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold text-pink-200 bg-white/10 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Không cần thẻ tín dụng
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Sẵn sàng tạo nội dung chuyên nghiệp?
            </h2>
            <p className="text-purple-100 text-lg mb-10">
              Đăng ký miễn phí — tạo landing page, bài viết hay quảng cáo đầu
              tiên trong 60 giây.
            </p>
            <Link
              href={isLoggedIn ? "/create" : "/login"}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold bg-white text-indigo-700 rounded-xl hover:bg-purple-50 transition-colors shadow-xl"
            >
              {isLoggedIn ? "Tạo nội dung ngay" : "Bắt đầu miễn phí"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="py-10 bg-gray-950 text-gray-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Logo iconSize={28} uid="footer" className="brightness-110" />
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
              <Link
                href="/#pricing"
                className="hover:text-white transition-colors"
              >
                Bảng giá
              </Link>
              <Link
                href="/templates"
                className="hover:text-white transition-colors"
              >
                Mẫu có sẵn
              </Link>
              <Link
                href="/kien-thuc"
                className="hover:text-white transition-colors"
              >
                Kiến thức
              </Link>
              <a
                href="mailto:support@aicontentbooster.vn"
                className="hover:text-white transition-colors"
              >
                Liên hệ
              </a>
              {!isLoggedIn && (
                <Link
                  href="/login"
                  className="hover:text-white transition-colors"
                >
                  Đăng nhập
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  href="/create"
                  className="hover:text-white transition-colors"
                >
                  Tạo nội dung
                </Link>
              )}
            </div>
            <p className="text-xs text-center text-gray-600">
              © 2026 AITaoPage
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
