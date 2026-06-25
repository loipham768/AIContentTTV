import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import {
  Zap,
  LayoutTemplate,
  Code2,
  Globe,
  ArrowRight,
  Sparkles,
  Copy,
  MousePointer2,
  MessageSquare,
  FileDown,
  BookOpen,
  Tag,
  LogIn,
  UserPlus,
  Phone,
  Mail,
  ArrowUpRight,
  Share2,
  Layers,
  // Link2,  // TODO: dùng lại khi mở tính năng clone từ website
} from "lucide-react";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import PricingSection from "@/components/pricing/PricingSection";
import HashScroll from "@/components/HashScroll";
import {
  getReviewStats,
  getCarouselReviews,
  getUserHasReviewed,
} from "@/components/reviews/ReviewsSection";
import ScrollReveal from "@/components/ScrollReveal";
import FaqAccordion from "@/components/FaqAccordion";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import TemplateCarousel from "@/components/TemplateCarousel";
import Logo from "@/components/Logo";
import MobileNav from "@/components/MobileNav";
import UserMenu from "@/components/UserMenu";
import ScrollHeaderWrapper from "@/components/ScrollHeaderWrapper";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import ArticleModel from "@/models/Article";
import TemplateModel from "@/models/Template";
import {
  SITE_URL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_DISPLAY,
} from "@/lib/constants";

/* ── Template sort ──────────────────────────────────────────────── */

const TEMPLATE_PRIORITY: Record<string, number> = {
  article: 0,
  portfolio: 1,
  cv: 2,
  landing: 3,
  ads: 4,
};

function sortByTemplatePriority<T extends { category: string }>(arr: T[]): T[] {
  return [...arr].sort(
    (a, b) =>
      (TEMPLATE_PRIORITY[a.category] ?? 99) -
      (TEMPLATE_PRIORITY[b.category] ?? 99),
  );
}

/* ── Features (6 tính năng chính) ──────────────────────────────── */

const FEATURES = [
  {
    icon: <MessageSquare className="w-5 h-5 text-white" />,
    iconGrad: "from-violet-500 to-purple-600",
    cardGrad: "from-violet-50/90 to-purple-50/50",
    bar: "from-violet-400 to-purple-500",
    title: "AI hỏi đáp thông minh",
    desc: "AI đặt câu hỏi từng bước — phong cách, màu sắc, đối tượng — rồi tạo HTML hoàn chỉnh đúng ý, không cần biết viết prompt.",
  },
  {
    icon: <LayoutTemplate className="w-5 h-5 text-white" />,
    iconGrad: "from-blue-500 to-indigo-600",
    cardGrad: "from-blue-50/90 to-indigo-50/50",
    bar: "from-blue-400 to-indigo-500",
    title: "Editor kéo thả trực quan",
    desc: "Kéo thả khối, chỉnh màu, font, khoảng cách ngay trên canvas — thấy thay đổi ngay lập tức, không cần code, không cần biết CSS.",
  },

  {
    icon: <Code2 className="w-5 h-5 text-white" />,
    iconGrad: "from-emerald-400 to-teal-600",
    cardGrad: "from-emerald-50/90 to-teal-50/50",
    bar: "from-emerald-400 to-teal-500",
    title: "Sao chép & tải file HTML",
    desc: "CSS inline nhúng vào từng thẻ. Copy HTML dán thẳng vào CKEditor, TinyMCE, WordPress, Haravan, Sapo, Shopify — hoặc tải file .html về máy, dùng bất cứ đâu.",
  },
  {
    icon: <FileDown className="w-5 h-5 text-white" />,
    iconGrad: "from-rose-500 to-red-600",
    cardGrad: "from-rose-50/90 to-red-50/50",
    bar: "from-rose-400 to-red-500",
    title: "Xuất PDF chuyên nghiệp",
    desc: "Tải PDF chất lượng cao một click — phù hợp in ấn, gửi hồ sơ xin việc, nộp hợp đồng hoặc lưu trữ tài liệu.",
  },
  {
    icon: <Share2 className="w-5 h-5 text-white" />,
    iconGrad: "from-teal-500 to-cyan-600",
    cardGrad: "from-teal-50/90 to-cyan-50/50",
    bar: "from-teal-400 to-cyan-500",
    title: "Xuất bản & chia sẻ link công khai",
    desc: "Xuất bản lên internet với một click — nhận link chia sẻ ngay, ai cũng xem được mà không cần tài khoản.",
  },
  {
    icon: <Layers className="w-5 h-5 text-white" />,
    iconGrad: "from-amber-500 to-orange-600",
    cardGrad: "from-amber-50/90 to-orange-50/50",
    bar: "from-amber-400 to-orange-500",
    title: "Kho mẫu template đa dạng",
    desc: "500+ mẫu bài viết, CV, portfolio, landing page thiết kế sẵn — chọn làm điểm khởi đầu, AI chỉnh nội dung theo yêu cầu của bạn.",
  },

  // TODO: Mở lại khi tính năng clone từ website sẵn sàng
  // {
  //   icon: <Link2 className="w-5 h-5 text-white" />,
  //   ...
  // },
];

/* ── Loại nội dung ──────────────────────────────────────────────── */

const CONTENT_TYPES = [
  {
    emoji: "📝",
    grad: "from-blue-500 to-cyan-500",
    bg: "from-blue-50 to-cyan-50",
    border: "border-blue-100",
    title: "Bài Viết & Content",
    desc: "Nội dung chuẩn SEO — AI tạo cả bố cục HTML lẫn văn bản. Sao chép HTML dán thẳng vào CKEditor, TinyMCE, WordPress, Haravan, Sapo — hiển thị đúng ngay.",
    badge: "Blog & SEO",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    emoji: "💼",
    grad: "from-teal-500 to-emerald-600",
    bg: "from-teal-50 to-emerald-50",
    border: "border-teal-100",
    title: "Portfolio & CV",
    desc: "Trang cá nhân chuyên nghiệp, CV online nổi bật — AI hỏi đáp hiểu đúng kỹ năng của bạn. Xuất PDF gửi HR, hoặc xuất bản link công khai chia sẻ qua Zalo, LinkedIn ngay.",
    badge: "Gây ấn tượng HR",
    badgeColor: "bg-teal-100 text-teal-700",
  },
  {
    emoji: "🏠",
    grad: "from-indigo-500 to-violet-600",
    bg: "from-indigo-50 to-violet-50",
    border: "border-indigo-100",
    title: "Landing Page",
    desc: "Trang giới thiệu dịch vụ, chốt đơn, campaign — AI tạo HTML hoàn chỉnh, chỉnh trong editor rồi xuất bản link chia sẻ ngay hoặc tải file HTML về tự triển khai.",
    badge: "Trang giới thiệu",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    emoji: "📣",
    grad: "from-rose-500 to-pink-600",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-100",
    title: "Quảng Cáo & Banner",
    desc: "Banner, Story ads, Zalo OA — AI tạo copy kèm bố cục HTML. Sao chép HTML dán vào tool quảng cáo, tải file .html hoặc xuất bản link gửi khách xem trước khi chạy.",
    badge: "Banner & Ads",
    badgeColor: "bg-rose-100 text-rose-700",
  },
];

/* ── 3 bước đơn giản ────────────────────────────────────────────── */

const STEPS = [
  {
    step: "01",
    stepGrad: "from-violet-500 to-purple-600",
    title: "Chọn loại nội dung & mô tả",
    desc: "Chọn Bài viết, CV, Portfolio hoặc Landing page. AI hỏi thêm từng bước để hiểu đúng phong cách, màu sắc và mục đích của bạn.",
  },
  {
    step: "02",
    stepGrad: "from-blue-500 to-indigo-600",
    title: "AI tạo HTML hoàn chỉnh",
    desc: "Sau khi có đủ thông tin, AI tạo HTML đầy đủ trong vài phút — bố cục, màu sắc, nội dung — inline CSS, không có JS, không phụ thuộc gì.",
  },
  {
    step: "03",
    stepGrad: "from-emerald-500 to-teal-600",
    title: "Chỉnh trong editor & xuất ra file",
    desc: "Kéo thả, chỉnh màu, font ngay trên canvas. Xong thì sao chép HTML, tải file .html, hoặc xuất PDF — bạn tự làm gì với file đó tùy ý.",
  },
];

/* ── CMS Badges (marquee) ───────────────────────────────────────── */

const CMS_BADGES = [
  { name: "CKEditor", color: "text-rose-600 border-rose-200 bg-rose-50" },
  { name: "TinyMCE", color: "text-violet-600 border-violet-200 bg-violet-50" },
  {
    name: "WordPress",
    color: "text-indigo-600 border-indigo-200 bg-indigo-50",
  },
  { name: "Haravan", color: "text-orange-600 border-orange-200 bg-orange-50" },
  { name: "Sapo", color: "text-blue-600 border-blue-200 bg-blue-50" },
  { name: "Shopify", color: "text-green-700 border-green-200 bg-green-50" },
  { name: "Quill Editor", color: "text-teal-600 border-teal-200 bg-teal-50" },
  { name: "CKEditor", color: "text-rose-600 border-rose-200 bg-rose-50" },
  { name: "TinyMCE", color: "text-violet-600 border-violet-200 bg-violet-50" },
  {
    name: "WordPress",
    color: "text-indigo-600 border-indigo-200 bg-indigo-50",
  },
  { name: "Haravan", color: "text-orange-600 border-orange-200 bg-orange-50" },
  { name: "Sapo", color: "text-blue-600 border-blue-200 bg-blue-50" },
  { name: "Shopify", color: "text-green-700 border-green-200 bg-green-50" },
  { name: "Quill Editor", color: "text-teal-600 border-teal-200 bg-teal-50" },
];

/* ── Article thumbnail palettes & icons ────────────────────────── */

const ARTICLE_PALETTES: Record<string, string> = {
  "Hướng dẫn": "from-teal-500 to-cyan-600",
  "Landing Page": "from-indigo-500 to-violet-600",
  "So sánh": "from-violet-500 to-purple-600",
  "Quảng cáo": "from-rose-500 to-pink-600",
  "Kỹ thuật": "from-emerald-500 to-teal-600",
  Content: "from-amber-500 to-orange-500",
  SEO: "from-blue-500 to-indigo-600",
};

const ARTICLE_ICONS: Record<string, string> = {
  "Hướng dẫn": "🎓",
  "Landing Page": "🏠",
  "So sánh": "📊",
  "Quảng cáo": "📣",
  "Kỹ thuật": "⚙️",
  Content: "📝",
  SEO: "🔍",
};

/* ── Server cache functions ─────────────────────────────────────── */

const getHomeTemplates = unstable_cache(
  async () => {
    await dbConnect();
    const docs = await TemplateModel.find({}, { html: 0, __v: 0, _id: 0 })
      .sort({ createdAt: -1 })
      .limit(18)
      .lean();
    return docs as Array<{
      id: string;
      name: string;
      category: string;
      description: string;
      gradient: string;
      accentColor: string;
    }>;
  },
  ["home-templates"],
  { revalidate: 3600 },
);

const getHomeArticles = unstable_cache(
  async () => {
    await dbConnect();
    const docs = await ArticleModel.find(
      {},
      { content: 0, keywords: 0, __v: 0, _id: 0 },
    )
      .sort({ publishedDate: -1 })
      .limit(3)
      .lean();
    return docs as Array<{
      slug: string;
      title: string;
      description: string;
      category: string;
      readTime: string;
      publishedDate: string;
      image: string | null;
    }>;
  },
  ["home-articles"],
  { revalidate: 3600 },
);

/* ── Page ───────────────────────────────────────────────────────── */

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  let userProfile: {
    fullName: string;
    avatarUrl: string;
    isAdmin: boolean;
  } | null = null;
  if (session?.user?.id) {
    await dbConnect();
    const u = (await User.findById(session.user.id, {
      fullName: 1,
      avatarUrl: 1,
      isAdmin: 1,
    }).lean()) as any;
    if (u)
      userProfile = {
        fullName: u.fullName ?? "",
        avatarUrl: u.avatarUrl ?? "",
        isAdmin: u.isAdmin === true,
      };
  }

  const [
    reviewStats,
    carouselReviews,
    hasReviewed,
    homeTemplates,
    homeArticles,
  ] = await Promise.all([
    getReviewStats(),
    getCarouselReviews(),
    session?.user?.id
      ? getUserHasReviewed(session.user.id)
      : Promise.resolve(false),
    getHomeTemplates(),
    getHomeArticles(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TaoPage",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Công cụ AI tạo bài viết, CV, portfolio và landing page HTML chuẩn inline CSS — xuất file HTML hoặc PDF, không kết nối dịch vụ bên ngoài.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
    },
    ...(reviewStats.count >= 3 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: reviewStats.avg,
        reviewCount: reviewStats.count,
        bestRating: 5,
        worstRating: 1,
      },
      review: reviewStats.recent.map((r: any) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.userName },
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: r.content,
        datePublished: new Date(r.createdAt).toISOString().split("T")[0],
      })),
    }),
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Suspense fallback={null}>
        <HashScroll />
      </Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <ScrollHeaderWrapper>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo iconSize={60} uid="nav" />

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
                  isAdmin={userProfile?.isAdmin ?? false}
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

          <MobileNav
            isLoggedIn={isLoggedIn}
            userName={
              userProfile?.fullName ?? session?.user?.email ?? undefined
            }
            avatarUrl={userProfile?.avatarUrl}
            email={session?.user?.email ?? undefined}
            isAdmin={userProfile?.isAdmin ?? false}
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
              <div className="hero-badge flex flex-wrap gap-2 mb-7">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-violet-700 bg-violet-50 rounded-full border border-violet-200 shadow-sm whitespace-nowrap">
                  <Sparkles className="w-3 h-3 flex-shrink-0" />
                  Content · CV · Portfolio · Landing page · Ads
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200 shadow-sm whitespace-nowrap">
                  Copy HTML · Xuất HTML · Xuất PDF · Xuất bản link
                </span>
              </div>

              <h1 className="hero-title text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-gray-900 leading-[1.2] tracking-tight mb-5">
                Tạo Content, CV & Portfolio
                <br />
                <span className="text-2xl sm:text-3xl lg:text-[2rem] font-semibold text-gray-500">
                  Landing page, Ads — đủ loại
                </span>
                <br />
                <span className="gradient-text">bằng AI — trong vài phút</span>
              </h1>

              <div className="hero-subtitle text-sm text-gray-500 max-w-xl mx-auto lg:mx-0 mb-6 grid grid-cols-2 gap-x-4 gap-y-2">
                {[
                  {
                    icon: "💬",
                    bold: "AI hỏi đáp",
                    rest: "mô tả tiếng Việt, AI tạo HTML",
                  },
                  {
                    icon: "🖱️",
                    bold: "Editor kéo thả",
                    rest: "chỉnh màu, font, bố cục",
                  },
                  {
                    icon: "📋",
                    bold: "Sao chép HTML",
                    rest: "dán vào CKEditor, WordPress…",
                  },
                  {
                    icon: "💾",
                    bold: "Tải file .html",
                    rest: "lưu về máy, dùng bất cứ đâu",
                  },
                  {
                    icon: "📄",
                    bold: "Xuất PDF",
                    rest: "gửi HR, in ấn, lưu trữ",
                  },
                  {
                    icon: "🔗",
                    bold: "Xuất bản link",
                    rest: "chia sẻ công khai, 1 click",
                  },
                ].map(({ icon, bold, rest }, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-1.5 leading-snug"
                  >
                    <span className="flex-shrink-0 mt-0.5">{icon}</span>
                    <span>
                      <span className="font-semibold text-gray-800">
                        {bold}
                      </span>{" "}
                      — {rest}
                    </span>
                  </div>
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
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-indigo-700 bg-white border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  <MousePointer2 className="w-4 h-4" /> Xem demo
                </Link>
              </div>
            </div>

            {/* Right: mockup — Editor view */}
            <div className="hero-mockup flex-1 w-full max-w-lg relative">
              {/* Floating badges */}
              <div className="hidden sm:flex absolute -top-4 -left-3 z-20 bg-white rounded-xl shadow-lg px-3 py-2 items-center gap-2 text-xs font-medium text-gray-700 border border-violet-100 animate-float">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                AI vừa tạo xong CV
              </div>
              <div className="hidden sm:flex absolute -bottom-4 -right-3 z-20 bg-white rounded-xl shadow-lg px-3 py-2 items-center gap-2 text-xs font-semibold border border-emerald-100 animate-float-slow">
                <FileDown className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                <span className="text-emerald-700">PDF · HTML · Link ✓</span>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-2 ring-indigo-500/30">
                {/* Browser bar */}
                <div className="h-9 bg-gray-900 flex items-center px-3 gap-2">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 bg-gray-700/70 rounded text-gray-400 text-[11px] px-3 py-0.5 text-center truncate">
                    {SITE_URL}/editor
                  </div>
                </div>

                {/* Editor toolbar */}
                <div className="bg-gray-800 h-8 flex items-center px-2 gap-1.5 border-b border-gray-700">
                  <div className="flex gap-1">
                    {["B", "I", "U"].map((t) => (
                      <div
                        key={t}
                        className="w-5 h-5 rounded bg-gray-700 flex items-center justify-center text-[9px] text-gray-300 font-bold"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="w-px h-4 bg-gray-600 mx-0.5" />
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded bg-gray-700" />
                    ))}
                  </div>
                  <div className="ml-auto flex gap-1.5">
                    <div className="px-2 h-5 rounded bg-violet-600 text-[9px] text-white flex items-center font-semibold gap-1">
                      <Copy className="w-2 h-2" /> HTML
                    </div>
                    <div className="px-2 h-5 rounded bg-rose-600 text-[9px] text-white flex items-center font-semibold">
                      PDF
                    </div>
                    <div className="px-2 h-5 rounded bg-emerald-600 text-[9px] text-white flex items-center font-semibold">
                      Link
                    </div>
                  </div>
                </div>

                {/* Main editor area */}
                <div className="flex bg-gray-100" style={{ height: "310px" }}>
                  {/* Blocks panel */}
                  <div className="w-12 bg-gray-900 border-r border-gray-700 p-1.5 flex flex-col gap-1.5 shrink-0">
                    <div className="text-[7px] text-gray-500 uppercase tracking-wider mb-0.5">
                      Khối
                    </div>
                    {[
                      { label: "Text", icon: "T" },
                      { label: "Ảnh", icon: "⬜" },
                      { label: "Nút", icon: "▬" },
                      { label: "Cột", icon: "⊟" },
                      { label: "Video", icon: "▷" },
                    ].map(({ label, icon }) => (
                      <div
                        key={label}
                        className="w-full bg-gray-800 rounded p-1 flex flex-col items-center gap-0.5 border border-gray-700 cursor-pointer hover:bg-gray-700"
                      >
                        <span className="text-[10px] text-gray-300 font-bold leading-none">
                          {icon}
                        </span>
                        <span className="text-[7px] text-gray-500">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Canvas */}
                  <div className="flex-1 overflow-hidden p-2.5 relative">
                    {/* Canvas grid bg */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    {/* CV being edited */}
                    <div className="relative bg-white rounded-lg shadow-md overflow-hidden h-full">
                      {/* CV sidebar */}
                      <div className="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-b from-indigo-600 to-violet-700 flex flex-col items-center py-3 gap-2">
                        <div className="w-9 h-9 rounded-full bg-white/25" />
                        <div className="w-9 h-1.5 bg-white/70 rounded" />
                        <div className="w-7 h-1 bg-white/40 rounded" />
                        <div className="mt-2 w-9 space-y-1.5">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="h-0.5 bg-white/40 rounded"
                            />
                          ))}
                        </div>
                      </div>
                      {/* CV content */}
                      <div className="ml-14 p-2.5">
                        <div className="w-20 h-2.5 bg-gray-800 rounded mb-1" />
                        <div className="w-14 h-1.5 bg-gray-400 rounded mb-2" />
                        <div className="w-full h-px bg-gray-100 mb-2" />
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="mb-2.5">
                            <div className="w-16 h-2 bg-gray-700 rounded mb-1" />
                            <div className="w-10 h-1 bg-gray-300 rounded mb-1" />
                            <div className="w-full h-0.5 bg-gray-100 rounded" />
                            <div className="w-3/4 h-0.5 bg-gray-100 rounded mt-0.5" />
                          </div>
                        ))}
                      </div>
                      {/* Selection handles */}
                      <div className="absolute inset-x-1.5 top-1.5 bottom-1.5 border-2 border-indigo-400 rounded pointer-events-none">
                        {[
                          "-top-1 -left-1",
                          "-top-1 -right-1",
                          "-bottom-1 -left-1",
                          "-bottom-1 -right-1",
                        ].map((pos) => (
                          <div
                            key={pos}
                            className={`absolute ${pos} w-2 h-2 bg-indigo-500 rounded-sm`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Properties panel */}
                  <div className="w-20 bg-white border-l border-gray-200 p-2 shrink-0 flex flex-col gap-1.5">
                    <div className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                      Style
                    </div>
                    {[
                      {
                        label: "Màu",
                        el: (
                          <div className="h-4 rounded bg-gradient-to-r from-indigo-600 to-violet-600" />
                        ),
                      },
                      {
                        label: "Font",
                        el: (
                          <div className="h-4 bg-gray-50 rounded border border-gray-200 text-[8px] text-gray-600 flex items-center px-1">
                            Inter
                          </div>
                        ),
                      },
                      {
                        label: "Size",
                        el: (
                          <div className="h-4 bg-gray-50 rounded border border-gray-200 text-[8px] text-gray-600 flex items-center px-1">
                            16px
                          </div>
                        ),
                      },
                      {
                        label: "Bold",
                        el: (
                          <div className="h-4 bg-gray-50 rounded border border-gray-200 text-[8px] text-gray-700 font-bold flex items-center px-1">
                            B
                          </div>
                        ),
                      },
                      {
                        label: "Radius",
                        el: (
                          <div className="h-4 bg-gray-50 rounded border border-gray-200 text-[8px] text-gray-600 flex items-center px-1">
                            8px
                          </div>
                        ),
                      },
                    ].map(({ label, el }) => (
                      <div key={label}>
                        <div className="text-[7px] text-gray-400 mb-0.5">
                          {label}
                        </div>
                        {el}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export bar */}
                <div className="h-9 bg-gray-900 flex items-center px-3 gap-2">
                  <span className="text-green-400 text-[10px] flex-shrink-0">
                    ● Sẵn sàng xuất
                  </span>
                  <div className="flex gap-1.5 ml-auto">
                    {[
                      { label: "Copy HTML", bg: "bg-violet-600" },
                      { label: "↓ .html", bg: "bg-blue-600" },
                      { label: "PDF", bg: "bg-rose-600" },
                      { label: "🔗 Xuất bản", bg: "bg-emerald-600" },
                    ].map(({ label, bg }) => (
                      <div
                        key={label}
                        className={`${bg} text-white text-[9px] font-semibold px-2 h-5 rounded flex items-center whitespace-nowrap`}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CMS Compatibility Strip ────────────────────────────────── */}
      <section
        className="py-6 sm:py-10 overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, #ede9fe 0%, #f5f3ff 50%, #ede9fe 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm font-semibold text-violet-500 mb-6 tracking-widest uppercase">
            Sao chép HTML · Dán thẳng vào bất kỳ editor hoặc CMS nào
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

      {/* ── Demo: Before → After ───────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-12 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, #06040f 0%, #0f0a2e 55%, #050310 100%)",
        }}
      >
        <div className="pointer-events-none absolute -left-32 top-1/4 w-96 h-96 bg-indigo-600/30 blur-3xl rounded-full animate-blob" />
        <div className="pointer-events-none absolute -right-32 bottom-1/4 w-80 h-80 bg-violet-700/25 blur-3xl rounded-full animate-blob-2" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Xem kết quả thực tế
            </h2>
            <p className="text-indigo-300/70">
              Mô tả bằng tiếng Việt — AI tạo nội dung, mở thẳng trong editor kéo
              thả để chỉnh sửa &amp; xuất file
            </p>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row items-stretch gap-6">
            {/* LEFT: User input */}
            <ScrollReveal className="flex-1" from="left">
              <div className="h-full bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30">
                    <MousePointer2 className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="font-semibold text-gray-200">Bạn mô tả</span>
                  <span className="ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/20">
                    CV / Portfolio
                  </span>
                </div>
                <div className="bg-white/10 rounded-xl border border-white/10 p-4 flex-1 text-sm text-gray-300 leading-relaxed">
                  Tạo CV cho mình — mình là Frontend Developer 3 năm kinh
                  nghiệm, quen với React và TypeScript. Phong cách tối giản,
                  chuyên nghiệp. Màu chủ đạo xanh navy. Mình muốn xuất PDF để
                  gửi HR.
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-indigo-400/70">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  AI phân tích &amp; tạo HTML hoàn chỉnh
                </div>
              </div>
            </ScrollReveal>

            {/* Arrow */}
            <div className="flex items-center justify-center md:flex-col gap-2 text-indigo-400 shrink-0">
              <div className="hidden md:flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-indigo-500/40" />
                <ArrowRight className="w-6 h-6 rotate-90" />
                <div className="w-px h-8 bg-indigo-500/40" />
              </div>
              <ArrowRight className="w-6 h-6 md:hidden" />
            </div>

            {/* RIGHT: Editor opens with AI content */}
            <ScrollReveal className="flex-1" from="right" delay={100}>
              <div className="h-full bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
                    <LayoutTemplate className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="font-semibold text-gray-200">
                    Editor mở với nội dung AI
                  </span>
                </div>
                {/* Mini editor mockup */}
                <div className="flex-1 rounded-xl overflow-hidden border border-white/10 bg-gray-900 flex flex-col">
                  {/* Editor toolbar */}
                  <div className="bg-gray-800/80 px-3 py-2 flex items-center gap-2 border-b border-white/10">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-2">
                      <div className="w-16 h-1.5 bg-white/20 rounded" />
                      <div className="w-10 h-1.5 bg-white/20 rounded" />
                      <div className="w-14 h-1.5 bg-white/20 rounded" />
                    </div>
                    <div className="w-14 h-5 rounded bg-emerald-500/80 flex items-center justify-center">
                      <div className="w-8 h-1 bg-white/70 rounded" />
                    </div>
                  </div>
                  {/* Canvas preview */}
                  <div className="flex-1 bg-gradient-to-br from-blue-900 to-indigo-900 p-5 flex flex-col justify-between relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px,white 1px,transparent 0)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="relative">
                      <div className="w-3/4 h-3 bg-white/90 rounded mb-2" />
                      <div className="w-1/2 h-2 bg-white/50 rounded mb-1" />
                      <div className="w-2/3 h-2 bg-white/40 rounded mb-4" />
                      <div className="w-28 h-7 bg-blue-400 rounded-lg shadow-lg" />
                    </div>
                    {/* Selection ring on button */}
                    <div className="relative self-start mt-2 border border-blue-400 rounded px-2 py-1 flex items-center gap-1.5">
                      <div className="w-12 h-1.5 bg-white/40 rounded" />
                      <div className="w-8 h-1 bg-white/25 rounded" />
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-sm" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-sm" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-sm" />
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-sm" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-indigo-400/60">
                    Kéo thả · Thay màu · Font · Xuất HTML hoặc PDF
                  </span>
                  <span className="text-xs text-indigo-400/60">
                    0 JS · CSS inline · Không cần kết nối
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 3 bước đơn giản ────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-12 md:py-20"
        style={{
          background: "linear-gradient(180deg,#f5f4fb 0%,#edeaf8 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Chỉ 3 bước đơn giản
            </h2>
            <p className="text-gray-500">
              Từ ý tưởng đến HTML production-ready trong chưa đầy một phút
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-10">
            {STEPS.map(({ step, stepGrad, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 100} className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${stepGrad} text-white font-extrabold text-xl mb-5 shadow-lg`}
                >
                  {step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-10">
            <Link
              href={isLoggedIn ? "/create" : "/demo"}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25"
            >
              <MousePointer2 className="w-4 h-4" /> Thử editor ngay — không cần
              đăng ký
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Content Types compact ──────────────────────────────────── */}
      <section
        className="py-12 md:py-16 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg,#ebebf8 0%,#e3e1f4 60%,#e8e6f6 100%)",
        }}
      >
        <div className="pointer-events-none absolute -left-40 top-1/3 w-96 h-96 bg-indigo-400/6 blur-3xl rounded-full" />
        <div className="pointer-events-none absolute -right-40 bottom-0 w-80 h-80 bg-violet-400/6 blur-3xl rounded-full" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Bạn làm được gì với TaoPage?
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Mô tả bằng tiếng Việt — AI tạo HTML hoàn chỉnh, bạn chỉnh sửa rồi
              xuất file HTML hoặc PDF
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT_TYPES.map((ct, i) => (
              <ScrollReveal key={ct.title} delay={i * 60}>
                <Link
                  href={isLoggedIn ? "/create" : "/login?tab=register"}
                  className={`block h-full rounded-2xl bg-gradient-to-br ${ct.bg} border ${ct.border} p-5 hover:shadow-md transition-all group`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ct.grad} flex items-center justify-center text-2xl mb-4 shadow-md`}
                  >
                    {ct.emoji}
                  </div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-sm font-bold text-gray-900">
                      {ct.title}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ct.badgeColor}`}
                    >
                      {ct.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    {ct.desc}
                  </p>
                  <span
                    className={`text-xs font-semibold bg-gradient-to-r ${ct.grad} bg-clip-text text-transparent group-hover:opacity-80`}
                  >
                    Tạo ngay →
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Template mới nhất từ DB ────────────────────────────────── */}
      <section
        className="py-12 md:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg,#eeedf9 0%,#e5e3f5 55%,#eeedf9 100%)",
        }}
      >
        <div className="pointer-events-none absolute -right-48 top-0 w-[500px] h-[500px] bg-emerald-400/5 blur-3xl rounded-full" />
        <div className="pointer-events-none absolute -left-32 bottom-0 w-80 h-80 bg-indigo-400/5 blur-3xl rounded-full" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Mẫu template có sẵn
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Chọn mẫu làm điểm khởi đầu, chỉnh sửa trong editor rồi xuất HTML,
              PDF hoặc xuất bản link ngay
            </p>
          </ScrollReveal>
          <div className="flex items-center justify-end mb-6">
            <Link
              href="/templates"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex-shrink-0"
            >
              Xem tất cả mẫu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <TemplateCarousel
            templates={sortByTemplatePriority(
              homeTemplates.length > 0
                ? homeTemplates
                : [
                    /* ── Article (4) ── */
                    {
                      id: "art-1",
                      name: "Bài viết SEO chuẩn",
                      category: "article",
                      description:
                        "Mẫu bài viết blog chuẩn SEO với heading structure rõ ràng",
                      gradient: "from-blue-500 to-cyan-500",
                      accentColor: "#3b82f6",
                    },
                    {
                      id: "art-2",
                      name: "Review sản phẩm",
                      category: "article",
                      description:
                        "Bài viết đánh giá sản phẩm chuyên sâu, kèm bảng so sánh",
                      gradient: "from-sky-500 to-blue-600",
                      accentColor: "#0ea5e9",
                    },
                    {
                      id: "art-3",
                      name: "Hướng dẫn từng bước",
                      category: "article",
                      description:
                        "Bài viết how-to dạng số thứ tự, dễ đọc và dễ chia sẻ",
                      gradient: "from-cyan-500 to-teal-500",
                      accentColor: "#06b6d4",
                    },
                    {
                      id: "art-4",
                      name: "Tin tức & thông báo",
                      category: "article",
                      description:
                        "Mẫu bài tin tức chuẩn báo điện tử, hiển thị tốt trên mobile",
                      gradient: "from-indigo-400 to-blue-500",
                      accentColor: "#6366f1",
                    },
                    /* ── Portfolio (4) ── */
                    {
                      id: "port-1",
                      name: "Portfolio freelancer",
                      category: "portfolio",
                      description:
                        "Trang portfolio chuyên nghiệp cho freelancer đa lĩnh vực",
                      gradient: "from-teal-500 to-emerald-600",
                      accentColor: "#14b8a6",
                    },
                    {
                      id: "port-2",
                      name: "Portfolio designer",
                      category: "portfolio",
                      description:
                        "Showcase thiết kế sáng tạo với grid ảnh nổi bật",
                      gradient: "from-violet-500 to-purple-600",
                      accentColor: "#8b5cf6",
                    },
                    {
                      id: "port-3",
                      name: "Portfolio developer",
                      category: "portfolio",
                      description:
                        "Trang cá nhân cho lập trình viên, nổi bật kỹ năng & dự án",
                      gradient: "from-emerald-500 to-cyan-600",
                      accentColor: "#10b981",
                    },
                    {
                      id: "port-4",
                      name: "Agency showcase",
                      category: "portfolio",
                      description:
                        "Trang giới thiệu agency với case study và số liệu ấn tượng",
                      gradient: "from-fuchsia-500 to-pink-600",
                      accentColor: "#d946ef",
                    },
                    /* ── CV (4) ── */
                    {
                      id: "cv-1",
                      name: "CV lập trình viên",
                      category: "cv",
                      description:
                        "CV online nổi bật cho developer, highlight kỹ năng và dự án",
                      gradient: "from-amber-500 to-orange-500",
                      accentColor: "#f59e0b",
                    },
                    {
                      id: "cv-2",
                      name: "CV marketing",
                      category: "cv",
                      description:
                        "Hồ sơ xin việc chuyên ngành marketing & truyền thông",
                      gradient: "from-orange-500 to-red-500",
                      accentColor: "#f97316",
                    },
                    {
                      id: "cv-3",
                      name: "CV kinh doanh",
                      category: "cv",
                      description:
                        "CV sales & business development chuyên nghiệp",
                      gradient: "from-yellow-500 to-amber-600",
                      accentColor: "#eab308",
                    },
                    {
                      id: "cv-4",
                      name: "CV thiết kế sáng tạo",
                      category: "cv",
                      description:
                        "CV visual độc đáo cho designer, phù hợp gửi HR ngành sáng tạo",
                      gradient: "from-pink-500 to-rose-600",
                      accentColor: "#ec4899",
                    },
                    /* ── Landing (3) ── */
                    {
                      id: "lp-1",
                      name: "Landing page bán hàng",
                      category: "landing",
                      description:
                        "Trang bán hàng chuyển đổi cao cho e-commerce",
                      gradient: "from-indigo-500 to-violet-600",
                      accentColor: "#6366f1",
                    },
                    {
                      id: "lp-2",
                      name: "Trang giới thiệu dịch vụ",
                      category: "landing",
                      description:
                        "Landing page dịch vụ chuyên nghiệp và uy tín",
                      gradient: "from-violet-500 to-indigo-600",
                      accentColor: "#7c3aed",
                    },
                    {
                      id: "lp-3",
                      name: "Trang sự kiện & webinar",
                      category: "landing",
                      description:
                        "Trang đăng ký sự kiện, hội thảo với countdown timer",
                      gradient: "from-blue-600 to-indigo-700",
                      accentColor: "#2563eb",
                    },
                    /* ── Ads (3) ── */
                    {
                      id: "ads-1",
                      name: "Banner quảng cáo Facebook",
                      category: "ads",
                      description:
                        "Banner ads tỷ lệ chuyển đổi cao cho Facebook & Instagram",
                      gradient: "from-rose-500 to-pink-600",
                      accentColor: "#f43f5e",
                    },
                    {
                      id: "ads-2",
                      name: "Khuyến mãi flash sale",
                      category: "ads",
                      description:
                        "Banner flash sale nổi bật với countdown và badge giảm giá",
                      gradient: "from-red-500 to-orange-600",
                      accentColor: "#ef4444",
                    },
                    {
                      id: "ads-3",
                      name: "Story Zalo OA",
                      category: "ads",
                      description:
                        "Mẫu story dọc cho Zalo OA, tỷ lệ 9:16 chuẩn mobile",
                      gradient: "from-pink-500 to-fuchsia-600",
                      accentColor: "#ec4899",
                    },
                  ],
            )}
            hasRealData={homeTemplates.length > 0}
          />

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600"
            >
              Xem tất cả mẫu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tính năng nổi bật (6 tính năng) ───────────────────────── */}
      <section
        className="py-12 md:py-20"
        style={{
          background:
            "linear-gradient(180deg,#f2f1fb 0%,#e9e7f7 50%,#f2f1fb 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Tính năng nổi bật
            </h2>
            <p className="text-gray-500">
              AI tạo HTML hoàn chỉnh · Editor kéo thả mạnh mẽ · Copy, Xuất HTML,
              PDF & link — không phụ thuộc dịch vụ bên ngoài
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(
              ({ icon, iconGrad, cardGrad, bar, title, desc }, i) => {
                const rem = FEATURES.length % 3;
                const colClass =
                  rem === 1 && i === FEATURES.length - 1
                    ? "lg:col-start-2"
                    : rem === 2 && i === FEATURES.length - 1
                      ? "lg:col-start-3"
                      : "";
                return (
                  <ScrollReveal
                    key={title}
                    delay={i * 60}
                    className={`h-full ${colClass}`}
                  >
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
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────── */}
      <TestimonialsCarousel
        realReviews={carouselReviews}
        reviewStats={reviewStats}
        userId={session?.user?.id ?? undefined}
        hasReviewed={hasReviewed}
      />

      {/* ── Pricing ────────────────────────────────────────────────── */}
      <PricingSection isLoggedIn={isLoggedIn} />

      {/* ── Bài viết mới nhất ─────────────────────────────────────── */}
      <section
        className="py-12 md:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg,#09070f 0%,#0d0b1e 60%,#070512 100%)",
        }}
      >
        <div className="pointer-events-none absolute -right-40 top-1/4 w-96 h-96 bg-indigo-600/10 blur-3xl rounded-full" />
        <div className="pointer-events-none absolute -left-32 bottom-0 w-72 h-72 bg-violet-700/8 blur-3xl rounded-full" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  Kiến thức & Hướng dẫn
                </h2>
                <p className="text-gray-400 text-sm">
                  Bài viết về landing page, HTML, AI content và marketing Việt
                  Nam
                </p>
              </div>
              <Link
                href="/kien-thuc"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex-shrink-0"
              >
                Xem tất cả bài viết <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {homeArticles.length > 0 ? (
            <div className="grid sm:grid-cols-3 gap-5">
              {homeArticles.map((a, i) => (
                <ScrollReveal key={a.slug} delay={i * 80}>
                  <Link href={`/kien-thuc/${a.slug}`} className="block group">
                    <article className="rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.07] hover:border-white/20 transition-all h-full">
                      {a.image ? (
                        <div className="relative h-40">
                          <Image
                            src={a.image}
                            alt={a.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div
                          className={`h-40 bg-gradient-to-br ${ARTICLE_PALETTES[a.category] ?? "from-indigo-500 to-violet-600"} flex items-center justify-center relative overflow-hidden`}
                        >
                          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
                          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
                          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner relative z-10">
                            <span className="text-2xl">
                              {ARTICLE_ICONS[a.category] ?? "📖"}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <span className="capitalize">{a.category}</span>
                          <span>·</span>
                          <span>{a.readTime}</span>
                        </div>
                        <h3 className="font-bold text-gray-100 text-sm leading-snug mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                          {a.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                          {a.description}
                        </p>
                        <div className="mt-3 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                          Đọc tiếp →
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                Đang cập nhật bài viết mới...
              </p>
              <Link
                href="/kien-thuc"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400"
              >
                Xem thư viện kiến thức <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/kien-thuc"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400"
            >
              Xem tất cả bài viết <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-20"
        style={{
          background: "linear-gradient(180deg,#f5f4fb 0%,#edeaf8 100%)",
        }}
        id="faq"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
              Câu hỏi thường gặp
            </h2>
          </ScrollReveal>
          <FaqAccordion
            items={[
              {
                q: "TaoPage tạo ra được loại file gì?",
                a: (
                  <>
                    <p>
                      TaoPage xuất ra{" "}
                      <strong className="text-gray-700">3 dạng</strong>:
                    </p>
                    <ul className="mt-2 space-y-1.5 pl-1">
                      <li className="flex gap-2">
                        <span className="text-indigo-400 flex-shrink-0">▸</span>
                        <span>
                          <strong className="text-gray-700">File HTML</strong>{" "}
                          với CSS inline — dán thẳng vào CMS hoặc mở bằng trình
                          duyệt, không phụ thuộc dịch vụ ngoài.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-indigo-400 flex-shrink-0">▸</span>
                        <span>
                          <strong className="text-gray-700">File PDF</strong>{" "}
                          chất lượng cao — gửi hồ sơ xin việc, hợp đồng, tài
                          liệu in ấn.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-indigo-400 flex-shrink-0">▸</span>
                        <span>
                          <strong className="text-gray-700">
                            Link công khai
                          </strong>{" "}
                          — ai có link đều xem được ngay, không cần tài khoản.
                        </span>
                      </li>
                    </ul>
                    <p className="mt-2 text-xs text-gray-400">
                      Chúng tôi không kết nối hay tích hợp với bất kỳ dịch vụ
                      bên ngoài nào.
                    </p>
                  </>
                ),
                accent: "border-l-indigo-400",
              },
              {
                q: "Tôi là Content Creator, TaoPage giúp gì được?",
                a: (
                  <>
                    <p>
                      Mô tả chủ đề bằng tiếng Việt → AI hỏi thêm về phong cách,
                      đối tượng → tạo bài viết HTML hoàn chỉnh (heading, đoạn
                      văn, call-to-action, chuẩn SEO, inline CSS).
                    </p>
                    <p className="mt-2">
                      Kéo thả chỉnh sửa trong editor → nhấn{" "}
                      <strong className="text-gray-700">
                        &quot;Sao chép HTML&quot;
                      </strong>{" "}
                      → dán thẳng vào CKEditor, TinyMCE, WordPress, Haravan,
                      Sapo... → hiển thị đúng ngay, không cần code.
                    </p>
                  </>
                ),
                accent: "border-l-blue-400",
              },
              {
                q: "Tôi muốn tạo CV để xin việc, dùng được không?",
                a: (
                  <>
                    <p>
                      Hoàn toàn được. Chọn loại{" "}
                      <strong className="text-gray-700">CV</strong> hoặc{" "}
                      <strong className="text-gray-700">Portfolio</strong>, AI
                      hỏi về kinh nghiệm, kỹ năng và phong cách của bạn, rồi tạo
                      HTML chuyên nghiệp.
                    </p>
                    <ul className="mt-2 space-y-1.5 pl-1">
                      <li className="flex gap-2">
                        <span className="text-teal-400 flex-shrink-0">▸</span>
                        <span>
                          Chỉnh màu, font, bố cục trong editor kéo thả
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-teal-400 flex-shrink-0">▸</span>
                        <span>
                          <strong className="text-gray-700">
                            Xuất PDF 1 click
                          </strong>{" "}
                          để gửi HR qua email
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-teal-400 flex-shrink-0">▸</span>
                        <span>
                          <strong className="text-gray-700">
                            Xuất bản link công khai
                          </strong>{" "}
                          — nhà tuyển dụng xem trực tiếp qua Zalo, LinkedIn
                        </span>
                      </li>
                    </ul>
                  </>
                ),
                accent: "border-l-teal-400",
              },
              {
                q: "Tôi có cần biết code HTML/CSS không?",
                a: (
                  <p>
                    Không cần. Mô tả bằng tiếng Việt tự nhiên — AI tạo toàn bộ
                    HTML & CSS. Bạn kéo thả, đổi màu, chỉnh font ngay trong
                    editor mà{" "}
                    <strong className="text-gray-700">
                      không cần chạm vào một dòng code nào
                    </strong>
                    .
                  </p>
                ),
                accent: "border-l-violet-400",
              },
              {
                q: "HTML tạo ra có dán vào CKEditor/TinyMCE/WordPress được không?",
                a: (
                  <>
                    <p>
                      Được. Khi nhấn{" "}
                      <strong className="text-gray-700">
                        &quot;Sao chép HTML&quot;
                      </strong>
                      , hệ thống nhúng toàn bộ CSS vào từng thẻ (inline style) —
                      không có thẻ{" "}
                      <code className="bg-gray-100 px-1 rounded text-xs text-gray-600">
                        &lt;style&gt;
                      </code>{" "}
                      hay{" "}
                      <code className="bg-gray-100 px-1 rounded text-xs text-gray-600">
                        &lt;script&gt;
                      </code>{" "}
                      nên CMS không lọc mất định dạng.
                    </p>
                    <p className="mt-2">
                      Dán vào CKEditor, TinyMCE, WordPress, Haravan, Sapo... →{" "}
                      <strong className="text-gray-700">
                        hiển thị đúng ngay
                      </strong>
                      .
                    </p>
                  </>
                ),
                accent: "border-l-emerald-400",
              },
              {
                q: "Tôi có thể dán HTML có sẵn vào editor để chỉnh sửa không?",
                a: (
                  <>
                    <p>
                      Có. Mở editor → nhấn nút{" "}
                      <strong className="text-gray-700">
                        &quot;Dán HTML&quot;
                      </strong>{" "}
                      hoặc vào tab Code → paste HTML của bạn vào. Editor nhận
                      HTML và render thành các khối có thể kéo thả, đổi màu,
                      chỉnh font ngay.
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      Dùng khi bạn đã có HTML từ nguồn khác và muốn chỉnh sửa
                      trực quan, hoặc muốn tái sử dụng template cũ.
                    </p>
                  </>
                ),
                accent: "border-l-cyan-400",
              },
              {
                q: "Gói miễn phí bị giới hạn ở đâu?",
                a: (
                  <>
                    <p>
                      <strong className="text-gray-700">Gói Miễn phí:</strong> 5
                      lượt tạo nội dung bằng AI mỗi tháng. Đầy đủ các tính năng
                      còn lại:
                    </p>
                    <ul className="mt-2 space-y-1 pl-1">
                      <li className="flex gap-2">
                        <span className="text-purple-400 flex-shrink-0">▸</span>
                        <span>Editor kéo thả đầy đủ tính năng</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-400 flex-shrink-0">▸</span>
                        <span>Toàn bộ template mẫu</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-400 flex-shrink-0">▸</span>
                        <span>
                          Sao chép HTML, xuất PDF, xuất bản link công khai
                        </span>
                      </li>
                    </ul>
                    <p className="mt-2 text-xs">
                      Hết 5 lượt? Mua thêm{" "}
                      <strong className="text-gray-700">15.000đ/lượt</strong>{" "}
                      hoặc nâng cấp{" "}
                      <strong className="text-gray-700">gói Cơ bản</strong> để
                      có 20 lượt/tháng.
                    </p>
                  </>
                ),
                accent: "border-l-purple-400",
              },
              {
                q: "Thanh toán như thế nào?",
                a: (
                  <>
                    <p>
                      Thanh toán bằng{" "}
                      <strong className="text-gray-700">
                        chuyển khoản ngân hàng
                      </strong>
                      :
                    </p>
                    <ol className="mt-2 space-y-1.5 pl-1">
                      {[
                        "Chọn gói hoặc số lượt cần mua",
                        "Nhận mã đơn hàng",
                        "Chuyển tiền — ghi mã đơn vào nội dung chuyển khoản",
                        "Đội ngũ kích hoạt trong 1–4 giờ",
                      ].map((s, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-2 text-xs text-gray-400">
                      Thời hạn giữ đơn 24 giờ. Không phí ẩn.
                    </p>
                  </>
                ),
                accent: "border-l-rose-400",
              },
              {
                q: "Link xuất bản là gì và ai có thể xem?",
                a: (
                  <>
                    <p>
                      Nhấn{" "}
                      <strong className="text-gray-700">
                        &quot;Xuất bản&quot;
                      </strong>{" "}
                      → hệ thống tạo trang web với URL duy nhất. Bất kỳ ai có
                      link đều xem được ngay, không cần tài khoản.
                    </p>
                    <ul className="mt-2 space-y-1.5 pl-1">
                      <li className="flex gap-2">
                        <span className="text-amber-400 flex-shrink-0">▸</span>
                        <span>Chia sẻ portfolio qua Zalo, email, LinkedIn</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-400 flex-shrink-0">▸</span>
                        <span>
                          Gửi khách xem landing page trước khi chạy ads
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-400 flex-shrink-0">▸</span>
                        <span>Kèm nút tải PDF ngay trên trang xuất bản</span>
                      </li>
                    </ul>
                  </>
                ),
                accent: "border-l-amber-400",
              },
            ]}
          />
        </div>
      </section>

      {/* ── Referral strip ─────────────────────────────────────────── */}
      <section className="py-8 md:py-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="pointer-events-none absolute -left-16 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative">
          <div className="flex items-center gap-4 text-white">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0 text-xl">
              🎁
            </div>
            <div>
              <p className="font-bold text-base sm:text-lg leading-snug">
                Giới thiệu người dùng mới — nhận ngay 5 lượt tạo miễn phí
              </p>
              <p className="text-sm text-white/75 mt-0.5">
                Mỗi khi bạn bè đăng ký bằng email của bạn, tài khoản bạn được
                cộng thêm 5 lượt.
              </p>
            </div>
          </div>
          <a
            href="/register"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors whitespace-nowrap"
          >
            Đăng ký & mời ngay →
          </a>
        </div>
      </section>

      {/* ── CTA banner ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-12 md:py-20"
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
              Đăng ký miễn phí — tạo bài viết, Portfolio, CV, Landing page và
              Quảng cáo đầu tiên. Copy, Xuất HTML & PDF ngay, không cần kết nối
              thêm gì.
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
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6 sm:pt-14 sm:pb-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-8 sm:gap-10 sm:mb-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <Logo iconSize={60} uid="footer" dark className="mb-4" />
              <p className="text-sm text-gray-500 leading-relaxed mb-5 text-[10px]">
                Tạo bài viết, Portfolio, CV, Landing page, Quảng cáo bằng HTML
                chuyên nghiệp với AI — Copy, Xuất file HTML hoặc PDF ngay, không
                cần kết nối dịch vụ bên ngoài.
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href={`tel:${SUPPORT_PHONE}`}
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  {SUPPORT_PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  {SUPPORT_EMAIL}
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

            {/* Tài nguyên — thêm SEO links */}
            <div>
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
                Tài nguyên
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  { href: "/kien-thuc", label: "Blog kiến thức" },
                  {
                    href: "/kien-thuc/landing-page-la-gi",
                    label: "Landing page là gì",
                  },
                  {
                    href: "/kien-thuc/ai-viet-content-la-gi",
                    label: "AI viết content",
                  },
                  {
                    href: "/kien-thuc/inline-css-la-gi",
                    label: "Inline CSS là gì",
                  },
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

            {/* Dành cho */}
            <div>
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
                Dành cho
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  { href: "/create", label: "Content Creator & Blogger" },
                  { href: "/create", label: "Xin việc & HR Portfolio" },
                  { href: "/create", label: "Freelancer & Agency" },
                  { href: "/create", label: "Marketing & Landing page" },
                  { href: "/create", label: "Bất kỳ ai cần HTML/PDF" },
                ].map(({ href, label }) => (
                  <li key={label}>
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

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <p>
              © {new Date().getFullYear()} TaoPage. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-5">
              <a
                href={`https://zalo.me/${SUPPORT_PHONE}`}
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
