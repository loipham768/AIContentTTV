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
  Sparkles,
  Copy,
  MousePointer2,
  MessageSquare,
  ShieldCheck,
  FileDown,
  Layers,
  BookOpen,
  Tag,
  LogIn,
  UserPlus,
  Phone,
  Mail,
  ArrowUpRight,
  Monitor,
  Smartphone,
  Eye,
  Undo2,
  Redo2,
  Palette,
  MoveHorizontal,
  ZoomIn,
  ZoomOut,
  Plus,
  Crown,
  Check,
  ChevronDown,
  Trash2,
  LayoutGrid,
  ArrowUp,
  ArrowDown,
  X,
} from "lucide-react";
import PricingSection from "@/components/pricing/PricingSection";

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
    desc: "AI đặt câu hỏi từng bước — màu sắc, phong cách, đối tượng — rồi tạo landing page chuẩn theo ý bạn.",
  },
  {
    icon: <Zap className="w-5 h-5 text-white" />,
    iconGrad: "from-amber-400 to-yellow-500",
    cardGrad: "from-amber-50/90 to-yellow-50/50",
    bar: "from-amber-400 to-yellow-400",
    title: "Tạo nhanh với AI",
    desc: "Nhập một câu mô tả, AI tạo khối HTML hoàn chỉnh trong chưa đầy 1 giây — không cần hỏi thêm.",
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
    title: "Xuất HTML — dùng được ở bất kỳ đâu",
    desc: "CSS nhúng inline vào từng thẻ, không cần stylesheet riêng. Sao chép hoặc tải file .html — dán vào CMS, gửi email, self-host, hoặc bất kỳ nền tảng nào.",
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

/* ── Loại nội dung có thể tạo ───────────────────────────────────── */

const CONTENT_TYPES = [
  {
    emoji: "🏠",
    grad: "from-indigo-500 to-violet-600",
    bg: "from-indigo-50 to-violet-50",
    border: "border-indigo-100",
    title: "Landing Page",
    desc: "Trang đích chuyển đổi cao cho bất kỳ sản phẩm, dịch vụ hay ý tưởng nào — AI hỏi đáp để hiểu đúng ý bạn trước khi tạo.",
    badge: "Hỏi đáp thông minh",
    badgeColor: "bg-violet-100 text-violet-700",
    examples: [
      "Bán sản phẩm skincare, thực phẩm",
      "Khóa học online, coaching",
      "Agency / freelancer / portfolio",
      "Ra mắt app, SaaS, startup",
      "Phòng khám, spa, gym, nhà hàng",
      "Bất động sản, dự án nhà đất",
    ],
  },
  {
    emoji: "📝",
    grad: "from-blue-500 to-cyan-500",
    bg: "from-blue-50 to-cyan-50",
    border: "border-blue-100",
    title: "Bài Viết & Content",
    desc: "Nội dung chuẩn SEO, đúng định dạng CMS — AI tạo cả bố cục HTML lẫn văn bản, dán thẳng vào WordPress hay Haravan.",
    badge: "Blog & SEO",
    badgeColor: "bg-blue-100 text-blue-700",
    examples: [
      "Blog SEO bài dài lên Top Google",
      "Review & so sánh sản phẩm",
      "Hướng dẫn, tutorial từng bước",
      "Mô tả sản phẩm thương mại điện tử",
      "Tin tức nội bộ, thông báo",
      "Câu hỏi thường gặp (FAQ)",
    ],
  },
  {
    emoji: "📣",
    grad: "from-rose-500 to-pink-600",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-100",
    title: "Quảng Cáo & Marketing",
    desc: "Nội dung chạy ads và email marketing được tối ưu tỷ lệ click — ngắn gọn, đúng thông điệp, sẵn sàng chạy ngay.",
    badge: "Ads chuyển đổi",
    badgeColor: "bg-rose-100 text-rose-700",
    examples: [
      "Banner Facebook & Instagram Ads",
      "Google Display Ads, Responsive Ads",
      "Email marketing / newsletter",
      "Carousel quảng cáo nhiều sản phẩm",
      "Popup khuyến mãi, flash sale",
      "Tin nhắn Zalo OA, SMS marketing",
    ],
  },
];

const USE_CASE_TAGS = [
  {
    label: "Shop thời trang",
    color: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    label: "Phòng khám nha khoa",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    label: "Khóa học ngoại ngữ",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    label: "Nhà hàng & quán cà phê",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    label: "Dịch vụ luật sư",
    color: "bg-slate-50 text-slate-700 border-slate-200",
  },
  {
    label: "Bất động sản",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  { label: "Spa & làm đẹp", color: "bg-pink-50 text-pink-700 border-pink-200" },
  {
    label: "Phòng gym & yoga",
    color: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    label: "Startup & SaaS",
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    label: "Agency marketing",
    color: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    label: "Trung tâm gia sư",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  {
    label: "Cửa hàng điện tử",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    label: "Du lịch & tour",
    color: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    label: "Tư vấn tài chính",
    color: "bg-green-50 text-green-700 border-green-200",
  },
  {
    label: "Event & hội thảo",
    color: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    label: "Vận chuyển & logistics",
    color: "bg-slate-50 text-slate-700 border-slate-200",
  },
  {
    label: "Thú cưng & pet shop",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    label: "Và mọi ý tưởng khác…",
    color:
      "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 border-indigo-200 font-semibold",
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
    title: "Chỉnh sửa kéo thả — xuất ra dùng ngay",
    desc: "Kéo thả, chỉnh màu, font trong editor. Xong: sao chép HTML hoặc tải file .html — dán vào Haravan, Sapo, WordPress, email, landing page tự host, hay bất kỳ đâu bạn muốn.",
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
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> Liên hệ
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
        className="relative overflow-hidden py-10 sm:py-20 lg:py-28"
        style={{
          background:
            "linear-gradient(160deg, #f5f3ff 0%, #fafaff 45%, #ede9fe 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] bg-violet-400/30 animate-blob"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 w-[440px] h-[440px] bg-indigo-500/25 animate-blob-2"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-300/20 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold text-violet-700 bg-violet-50 rounded-full border border-violet-200">
                <Sparkles className="w-3.5 h-3.5" />
                Công cụ AI tạo nội dung cho thị trường Việt Nam
              </div>

              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Landing page, bài viết,
                <br className="hidden sm:block" />
                quảng cáo —
                <span className="gradient-text"> xong trong 60 giây</span>
              </h1>

              <p className="hero-subtitle text-lg sm:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 mb-6">
                Mô tả bằng tiếng Việt, AI tạo HTML chuẩn inline CSS. Chỉnh sửa
                kéo thả trong editor — xuất ra dùng được ở{" "}
                <span className="font-semibold text-gray-700">
                  bất kỳ đâu bạn muốn
                </span>
                .
              </p>

              {/* Export anywhere strip */}
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-5 sm:mb-8 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                  <FileDown className="w-3.5 h-3.5" /> Tải file .html
                </span>
                <span className="text-gray-300 text-xs">·</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
                  <Copy className="w-3.5 h-3.5" /> Sao chép HTML
                </span>
                <span className="text-gray-300 text-xs">·</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-xs font-semibold text-violet-700">
                  <Globe className="w-3.5 h-3.5" /> Dán vào bất kỳ CMS nào
                </span>
              </div>

              {/* Content type pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-5 sm:mb-8">
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
              <div className="hero-stats flex flex-wrap justify-center lg:justify-start gap-6 mt-7 pt-7 sm:gap-8 sm:mt-10 sm:pt-10 border-t border-violet-100">
                {[
                  {
                    value: "3 loại",
                    label: "nội dung có thể tạo",
                    grad: "from-indigo-700 to-violet-600",
                  },
                  {
                    value: "< 1s",
                    label: "thời gian tạo HTML",
                    grad: "from-violet-700 to-purple-600",
                  },
                  {
                    value: "6 CMS",
                    label: "tương thích hoàn hảo",
                    grad: "from-indigo-600 to-blue-500",
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
              <div className="hidden sm:flex absolute -top-5 -left-4 z-20 bg-white rounded-2xl shadow-xl px-4 py-2.5 items-center gap-2 text-sm font-medium text-gray-700 border border-violet-100 animate-float">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                AI đang tạo landing page...
              </div>
              <div className="hidden sm:block absolute -bottom-5 -right-4 z-20 bg-white rounded-2xl shadow-xl px-4 py-3 border border-emerald-100 animate-float-slow">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <FileDown className="w-3 h-3 text-emerald-500" />
                  <span className="text-xs text-gray-400">
                    Xuất HTML — dùng được ở
                  </span>
                </div>
                <div className="text-sm font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Bất kỳ đâu bạn muốn ✓
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-2 ring-indigo-500/30">
                <div className="h-10 bg-gray-900 flex items-center px-4 gap-3">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 bg-gray-700/70 rounded text-gray-400 text-xs px-3 py-1 text-center truncate">
                    https://taopage.vn/create
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
        className="py-6 sm:py-10 overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, #ede9fe 0%, #f5f3ff 50%, #ede9fe 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm font-semibold text-violet-500 mb-6 tracking-widest uppercase">
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
      <section className="py-12 md:py-24" style={{ background: "#fafaff" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-8 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Tạo bất kỳ loại nội dung nào bạn cần
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Bạn chỉ cần mô tả ý tưởng bằng tiếng Việt — AI hiểu ngữ cảnh và
              tạo ra đúng loại nội dung phù hợp, dù là landing page, bài viết
              hay quảng cáo.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 mb-8 sm:mb-12">
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

          {/* Use-case tag cloud */}
          <ScrollReveal delay={120}>
            <div className="rounded-2xl border border-indigo-100 bg-white px-4 py-5 sm:px-6 sm:py-7 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5 text-center">
                Phù hợp với mọi ngành nghề, mọi ý tưởng
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {USE_CASE_TAGS.map(({ label, color }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs border ${color}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-12 md:py-24"
        style={{
          background:
            "linear-gradient(160deg, #faf9ff 0%, #ffffff 55%, #f5f3ff 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Chỉ 3 bước
            </h2>
            <p className="text-gray-500">
              Từ ý tưởng đến HTML production-ready trong chưa đầy một phút
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-12 sm:gap-20">
            {STEPS.map(
              ({ step, stepGrad, wrapGrad, title, desc, preview }, i) => (
                <div
                  key={step}
                  className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-6 md:gap-10`}
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

      {/* ── Editor Showcase ────────────────────────────────────────── */}
      <section
        className="py-12 md:py-24 overflow-hidden"
        style={{ background: "#f8f7ff" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-8 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200">
              <MousePointer2 className="w-3.5 h-3.5" /> Editor kéo thả
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Chỉnh sửa trực tiếp — không cần code
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Sau khi AI tạo HTML, bạn mở ngay trong editor. Kéo thả khối, click
              để đổi màu, font, khoảng cách — mọi thứ cập nhật tức thì trên
              canvas.
            </p>
          </ScrollReveal>

          {/* Editor mockup — matches real editor layout */}
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 select-none">
              {/* ── TopBar (dark) — giống hệt editor thật ── */}
              <div
                className="flex items-center justify-between px-3 bg-slate-900 border-b border-slate-800 gap-2"
                style={{ height: "52px" }}
              >
                {/* Left: Logo + Plus + Templates */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-[26px] h-[26px] rounded-[6px] bg-gradient-to-br from-indigo-900 to-violet-700 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <span className="hidden md:inline font-extrabold text-[0.95rem] leading-none tracking-tight text-white/90 whitespace-nowrap">
                      AI<span className="text-white/40">Tao</span>
                      <span className="text-white/25 font-semibold">Page</span>
                    </span>
                  </div>
                  <button className="p-1.5 rounded-lg text-slate-400">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg text-slate-400">
                    <LayoutTemplate className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Center: controls */}
                <div className="flex items-center gap-1 flex-1 justify-center">
                  <div className="flex items-center bg-slate-800 rounded-lg p-0.5 gap-0.5">
                    <span className="p-1.5 rounded-md text-slate-500">
                      <Undo2 className="w-3.5 h-3.5" />
                    </span>
                    <span className="p-1.5 rounded-md text-slate-400">
                      <Redo2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 gap-0.5">
                    <span className="p-1.5 rounded-md bg-white text-slate-800">
                      <Monitor className="w-3.5 h-3.5" />
                    </span>
                    <span className="p-1.5 text-slate-400">
                      <Smartphone className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="hidden md:flex items-center bg-slate-800 rounded-lg overflow-hidden">
                    <span className="px-1.5 py-1.5 text-slate-400">
                      <ZoomOut className="w-3 h-3" />
                    </span>
                    <span className="px-1.5 py-1 text-xs font-mono text-slate-300 w-9 text-center">
                      100%
                    </span>
                    <span className="px-1.5 py-1.5 text-slate-400">
                      <ZoomIn className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="w-px h-4 bg-slate-700 mx-0.5" />
                  <span className="flex items-center gap-1 px-2 py-1.5 text-xs text-slate-300 rounded-lg">
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Preview</span>
                  </span>
                  <span className="hidden sm:flex items-center gap-1 px-2 py-1.5 text-xs text-slate-400 rounded-lg">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden xl:inline">Xóa</span>
                  </span>
                </div>

                {/* Right: Save + Export + badge + avatar */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Đã lưu</span>
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 rounded-lg text-xs text-slate-300">
                    <Code2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Xuất HTML</span>
                    <ChevronDown className="w-3 h-3" />
                  </span>
                  <div className="w-px h-4 bg-slate-700 mx-0.5" />
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-500">
                    <Crown className="w-2.5 h-2.5" /> Basic
                  </span>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    L
                  </div>
                </div>
              </div>

              {/* ── Edit hint banner (indigo) ── */}
              <div className="flex items-center gap-2.5 px-4 py-2 bg-indigo-600 text-white text-xs">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                <p className="flex-1 leading-relaxed">
                  <span className="font-semibold">
                    Mọi thứ đều chỉnh sửa được!
                  </span>{" "}
                  Nhấn vào bất kỳ phần tử nào để đổi màu, font, gradient, hình
                  ảnh... Kéo thả các khối ở bên trái để thêm nội dung mới.
                </p>
                <X className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
              </div>

              {/* ── Component action bar (white) ── */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-b border-slate-200">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />{" "}
                  Hero Section
                </span>
                <div className="flex items-center gap-0.5 ml-auto">
                  <span className="p-1.5 rounded-lg text-slate-500">
                    <ArrowUp className="w-3.5 h-3.5" />
                  </span>
                  <span className="p-1.5 rounded-lg text-slate-500">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </span>
                  <div className="w-px h-4 bg-slate-200 mx-1" />
                  <span className="p-1.5 rounded-lg text-slate-500">
                    <Copy className="w-3.5 h-3.5" />
                  </span>
                  <span className="p-1.5 rounded-lg text-red-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* ── Main area: Left panel + Canvas + Right panel ── */}
              <div className="flex" style={{ height: "380px" }}>
                {/* Left: Blocks panel — white, like real editor */}
                <div className="w-52 border-r border-slate-200 bg-white hidden md:flex flex-col flex-shrink-0 overflow-hidden">
                  <div
                    className="px-3 py-2.5 border-b border-slate-200 bg-slate-50 flex items-center gap-2"
                    style={{ minHeight: "44px" }}
                  >
                    <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Khối
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { emoji: "𝐓", label: "Tiêu đề" },
                        { emoji: "¶", label: "Đoạn văn" },
                        { emoji: "⬜", label: "Nút CTA" },
                        { emoji: "🖼", label: "Hình ảnh" },
                        { emoji: "⊞", label: "Cột đôi" },
                        { emoji: "🏠", label: "Hero", active: true },
                        { emoji: "≡", label: "Navbar" },
                        { emoji: "⚡", label: "Tính năng" },
                        { emoji: "💬", label: "Đánh giá" },
                        { emoji: "🔖", label: "Footer" },
                      ].map(
                        ({
                          emoji,
                          label,
                          active,
                        }: {
                          emoji: string;
                          label: string;
                          active?: boolean;
                        }) => (
                          <div
                            key={label}
                            className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg border cursor-grab text-center transition-colors ${active ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
                          >
                            <span className="text-lg leading-none">
                              {emoji}
                            </span>
                            <span
                              className={`text-[10px] leading-tight ${active ? "text-blue-700 font-medium" : "text-slate-600"}`}
                            >
                              {label}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* Center: Canvas — gray bg, page inside */}
                <div className="flex-1 bg-gray-100 relative overflow-hidden">
                  <div className="relative mt-5">
                    {/* Selected Hero — blue border + handles */}
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-700 px-6 sm:px-10 py-8 text-white relative">
                      <div className="absolute inset-0 border-2 border-blue-400 pointer-events-none">
                        <div className="absolute -top-[22px] left-0 bg-blue-500 text-white text-[9px] font-bold px-2 py-0.5 flex items-center gap-1">
                          <MoveHorizontal className="w-2.5 h-2.5" /> Hero
                          Section
                        </div>
                        <div className="absolute top-0 left-0 w-2 h-2 bg-blue-400 -translate-x-1 -translate-y-1" />
                        <div className="absolute top-0 right-0 w-2 h-2 bg-blue-400 translate-x-1 -translate-y-1" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-400 -translate-x-1 translate-y-1" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-400 translate-x-1 translate-y-1" />
                      </div>
                      <div className="text-xs text-indigo-200 uppercase tracking-widest mb-1">
                        Khóa học online
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold leading-snug mb-3">
                        Học lập trình Web từ A→Z
                        <br className="hidden sm:block" /> trong 3 tháng
                      </div>
                      <div className="inline-block bg-yellow-400 text-gray-900 font-bold px-5 py-2 rounded-xl text-sm shadow-lg">
                        Đăng ký ngay →
                      </div>
                    </div>
                    <div className="bg-white border-b border-gray-200 px-6 sm:px-10 py-5 grid grid-cols-3 gap-3 text-center">
                      {["✅ 120+ bài học", "🎓 Chứng chỉ", "🏆 Hỗ trợ 1-1"].map(
                        (f) => (
                          <div
                            key={f}
                            className="text-xs sm:text-sm text-gray-700 font-medium"
                          >
                            {f}
                          </div>
                        ),
                      )}
                    </div>
                    <div className="bg-gray-50 px-6 sm:px-10 py-5 flex flex-col items-center gap-1">
                      <div className="text-base font-extrabold text-gray-900">
                        Chỉ 2.990.000đ
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        Trọn đời · Cập nhật miễn phí
                      </div>
                      <div className="inline-block bg-indigo-600 text-white px-7 py-2 rounded-xl text-sm font-semibold shadow">
                        Mua ngay
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Style/Layers/History panel — white, like real editor */}
                <div className="w-60 border-l border-slate-200 bg-white hidden lg:flex flex-col flex-shrink-0 overflow-hidden">
                  {/* 3-tab bar */}
                  <div className="flex border-b border-slate-200 bg-slate-50">
                    <button className="flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-semibold text-blue-600 border-b-2 border-blue-500 bg-white">
                      <Palette className="w-3 h-3" /> Kiểu dáng
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-semibold text-slate-500 border-b-2 border-transparent hover:text-slate-700">
                      <Layers className="w-3 h-3" /> Lớp
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-semibold text-slate-500 border-b-2 border-transparent hover:text-slate-700">
                      <History className="w-3 h-3" /> Lịch sử
                    </button>
                  </div>
                  {/* Style panel content */}
                  <div className="flex-1 overflow-y-auto">
                    {/* Thẻ HTML selector row */}
                    <div className="px-3 pt-3 pb-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                        Thẻ HTML
                      </p>
                      <div className="h-7 border border-slate-200 rounded-lg bg-white flex items-center px-2.5 text-xs text-slate-700 font-mono">
                        div — Khối
                      </div>
                    </div>
                    {/* Typography sector */}
                    <div className="border-t border-slate-100">
                      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-slate-200">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex-1">
                          Kiểu chữ
                        </span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="p-3 space-y-2.5">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-[9px] text-slate-500 mb-1">
                              Cỡ chữ
                            </p>
                            <div className="h-7 border border-slate-200 rounded-lg flex items-center px-2 text-xs text-slate-700 font-mono">
                              28px
                            </div>
                          </div>
                          <div>
                            <p className="text-[9px] text-slate-500 mb-1">
                              Độ đậm
                            </p>
                            <div className="h-7 border border-slate-200 rounded-lg flex items-center px-2 text-xs text-slate-700 font-mono">
                              700
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-500 mb-1">
                            Màu chữ
                          </p>
                          <div className="h-7 border border-slate-200 rounded-lg flex items-center px-2 gap-2">
                            <div className="w-4 h-4 rounded bg-white border border-slate-300 flex-shrink-0" />
                            <span className="text-xs text-slate-700 font-mono">
                              #ffffff
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Background sector */}
                    <div className="border-t border-slate-100">
                      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-slate-200">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex-1">
                          Nền
                        </span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="p-3">
                        <p className="text-[9px] text-slate-500 mb-1">
                          Màu nền
                        </p>
                        <div className="h-7 border border-slate-200 rounded-lg flex items-center px-2 gap-2">
                          <div className="w-4 h-4 rounded bg-gradient-to-r from-indigo-600 to-violet-700 border border-slate-300 flex-shrink-0" />
                          <span className="text-xs text-slate-500 font-mono">
                            gradient
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Collapsed sectors */}
                    <div className="border-t border-slate-100">
                      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex-1">
                          Khoảng cách
                        </span>
                        <ChevronDown className="w-3 h-3 text-slate-400 -rotate-90" />
                      </div>
                    </div>
                    <div className="border-t border-slate-100">
                      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex-1">
                          Kích thước
                        </span>
                        <ChevronDown className="w-3 h-3 text-slate-400 -rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 4 key editor capabilities */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {[
              {
                icon: <MousePointer2 className="w-5 h-5" />,
                bg: "bg-indigo-50 text-indigo-600",
                title: "Kéo & Thả dễ dàng",
                desc: "Kéo khối từ panel vào canvas, sắp xếp thứ tự trong tích tắc",
              },
              {
                icon: <Palette className="w-5 h-5" />,
                bg: "bg-violet-50 text-violet-600",
                title: "Chỉnh style real-time",
                desc: "Click vào phần tử — đổi màu, font, padding, bo góc tức thì",
              },
              {
                icon: <Smartphone className="w-5 h-5" />,
                bg: "bg-emerald-50 text-emerald-600",
                title: "Xem trước Responsive",
                desc: "Kiểm tra giao diện desktop và mobile ngay trong editor",
              },
              {
                icon: <FileDown className="w-5 h-5" />,
                bg: "bg-blue-50 text-blue-600",
                title: "Xuất ngay khi xong",
                desc: "Sao chép HTML hoặc tải file .html — dán vào bất kỳ đâu",
              },
            ].map(({ icon, bg, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
                >
                  {icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-0.5">
                    {title}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal className="text-center mt-10">
            <Link
              href={isLoggedIn ? "/create" : "/login?tab=register"}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-4 h-4" /> Thử editor ngay — miễn phí
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-24"
        style={{
          background:
            "linear-gradient(160deg, #f5f3ff 0%, #fafaff 50%, #ede9fe 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-10 sm:mb-16">
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

      {/* ── Templates update section ───────────────────────────────── */}
      <section
        className="py-10 sm:py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdf4 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-white rounded-3xl border border-emerald-100 shadow-md overflow-hidden">
            {/* Left content */}
            <div className="flex-1 px-5 py-7 sm:px-8 sm:py-10 lg:py-12">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  Cập nhật thường xuyên
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-4">
                  Chúng tôi liên tục bổ sung mẫu giao diện
                  <span className="text-emerald-600"> mới nhất, đẹp nhất</span>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Đội ngũ thiết kế của chúng tôi liên tục cập nhật kho mẫu với
                  những giao diện hiện đại, bắt xu hướng — từ landing page bán
                  hàng, trang dịch vụ, đến banner quảng cáo chuyển đổi cao. Tất
                  cả đều được tối ưu inline CSS, dán vào CMS là dùng được ngay.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 sm:mb-8">
                  {[
                    {
                      icon: (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ),
                      text: "Mẫu mới bổ sung hàng tuần",
                    },
                    {
                      icon: (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ),
                      text: "Tối ưu cho thị trường Việt Nam",
                    },
                    {
                      icon: (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ),
                      text: "Dùng ngay làm điểm khởi đầu với AI",
                    },
                    {
                      icon: (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ),
                      text: "Miễn phí cho mọi tài khoản",
                    },
                  ].map(({ icon, text }) => (
                    <div
                      key={text}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      {icon}
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md"
                >
                  <LayoutTemplate className="w-4 h-4" /> Khám phá kho mẫu
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </ScrollReveal>
            </div>

            {/* Right: template category cards */}
            <ScrollReveal
              className="flex-1 w-full lg:max-w-sm px-5 py-7 sm:px-8 sm:py-10 lg:py-12 lg:border-l border-emerald-100"
              from="right"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
                Các loại mẫu có sẵn
              </p>
              <div className="space-y-3">
                {[
                  {
                    emoji: "🛒",
                    label: "Landing page bán hàng",
                    badge: "Phổ biến",
                    badgeColor: "bg-violet-100 text-violet-700",
                  },
                  {
                    emoji: "📚",
                    label: "Trang khóa học online",
                    badge: "Mới",
                    badgeColor: "bg-emerald-100 text-emerald-700",
                  },
                  {
                    emoji: "🏢",
                    label: "Trang giới thiệu dịch vụ",
                    badge: "Mới",
                    badgeColor: "bg-emerald-100 text-emerald-700",
                  },
                  {
                    emoji: "📣",
                    label: "Banner quảng cáo Facebook",
                    badge: "Hot",
                    badgeColor: "bg-rose-100 text-rose-700",
                  },
                  {
                    emoji: "✉️",
                    label: "Email marketing",
                    badge: "Mới",
                    badgeColor: "bg-emerald-100 text-emerald-700",
                  },
                ].map(({ emoji, label, badge, badgeColor }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 rounded-xl px-4 py-3 transition-colors cursor-default"
                  >
                    <span className="text-xl flex-shrink-0">{emoji}</span>
                    <span className="text-sm text-gray-700 flex-1">
                      {label}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${badgeColor}`}
                    >
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Demo: Before → After ───────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-12 md:py-24"
        style={{
          background:
            "linear-gradient(135deg, #06040f 0%, #0f0a2e 55%, #050310 100%)",
        }}
      >
        <div className="pointer-events-none absolute -left-32 top-1/4 w-96 h-96 bg-indigo-600/30 blur-3xl rounded-full animate-blob" />
        <div className="pointer-events-none absolute -right-32 bottom-1/4 w-80 h-80 bg-violet-700/25 blur-3xl rounded-full animate-blob-2" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Xem kết quả thực tế
            </h2>
            <p className="text-indigo-300/70">
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
                <div className="mt-4 flex items-center gap-2 text-sm text-indigo-400/70">
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
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/25 rounded-full translate-y-16 -translate-x-16" />
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
                  <span className="text-xs text-indigo-400/60">
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
      <PricingSection isLoggedIn={isLoggedIn} />

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-24"
        style={{
          background: "linear-gradient(135deg, #f0edff 0%, #ede9fe 100%)",
        }}
        id="faq"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
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
                  a: "Gói Free: 4 lượt tạo nội dung mỗi tháng (landing page, bài viết hoặc quảng cáo...). Có thể chỉnh sửa trong editor nhưng không sao chép hay tải HTML. Giới hạn này được kiểm tra phía server — không thể vượt qua bằng DevTools.",
                  accent: "border-l-purple-400",
                },
                {
                  q: "Thanh toán như thế nào?",
                  a: "Chuyển khoản ngân hàng — bạn chọn gói, nhận mã đơn hàng, chuyển tiền ghi mã đó vào nội dung. Đội ngũ kích hoạt thủ công trong 1–4 giờ. Thời hạn giữ đơn 24 giờ.",
                  accent: "border-l-blue-400",
                },
                {
                  q: "AI nào được dùng để tạo nội dung?",
                  a: "AITaoPage sử dụng AI thế hệ mới để tạo nội dung — tối ưu riêng cho từng loại yêu cầu: tạo nhanh khối HTML từ một câu mô tả hoặc hỏi đáp nhiều bước cho landing page, nội dung phức tạp.",
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
        className="relative overflow-hidden py-12 md:py-24"
        style={{
          background:
            "linear-gradient(135deg, #06040f 0%, #1a0f4e 40%, #2d1b69 75%, #1e1260 100%)",
        }}
      >
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl animate-blob-2" />
        <ScrollReveal>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold text-violet-200 bg-white/10 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Không cần thẻ tín dụng
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Sẵn sàng tạo nội dung chuyên nghiệp?
            </h2>
            <p className="text-violet-100 text-lg mb-6 sm:mb-10">
              Đăng ký miễn phí — tạo landing page, bài viết hay quảng cáo đầu
              tiên trong 60 giây.
            </p>
            <Link
              href={isLoggedIn ? "/create" : "/login"}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold bg-white text-indigo-900 rounded-xl hover:bg-violet-50 transition-colors shadow-xl"
            >
              {isLoggedIn ? "Tạo nội dung ngay" : "Bắt đầu miễn phí"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer style={{ background: "#06040f" }} className="text-gray-400">
        {/* Top gradient line */}
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6 sm:pt-14 sm:pb-8">
          {/* Main columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 sm:gap-10 sm:mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Logo iconSize={32} uid="footer" dark className="mb-4" />
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                Công cụ AI giúp bạn tạo nội dung HTML đẹp trong 60 giây — không
                cần biết code.
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href="tel:0969986786"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  0969 986 786
                </a>
                <a
                  href="mailto:admin@taopage.vn"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  admin@taopage.vn
                </a>
              </div>
            </div>

            {/* Sản phẩm */}
            <div>
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
                Sản phẩm
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  { href: "/create", label: "Tạo nội dung với AI" },
                  { href: "/editor", label: "Trình soạn thảo" },
                  { href: "/templates", label: "Mẫu có sẵn" },
                  { href: "/#pricing", label: "Bảng giá" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tài nguyên */}
            <div>
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
                Tài nguyên
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  { href: "/kien-thuc", label: "Blog kiến thức" },
                  { href: "/#faq", label: "Câu hỏi thường gặp" },
                  { href: "/contact", label: "Liên hệ hỗ trợ" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
                Bắt đầu ngay
              </p>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Thử miễn phí — không cần thẻ tín dụng.
              </p>
              {isLoggedIn ? (
                <Link
                  href="/create"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <Zap className="w-3.5 h-3.5" /> Tạo nội dung
                </Link>
              ) : (
                <Link
                  href="/login?tab=register"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Đăng ký miễn phí
                </Link>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <p>
              © {new Date().getFullYear()} AITaoPage. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://zalo.me/0969986786"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors inline-flex items-center gap-1"
              >
                Zalo <ArrowUpRight className="w-3 h-3" />
              </a>
              <Link
                href="/contact"
                className="hover:text-gray-400 transition-colors"
              >
                Hỗ trợ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
