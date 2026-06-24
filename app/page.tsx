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
  ExternalLink,
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
  CATEGORY_META,
} from "@/lib/constants";

/* ── Features (6 tính năng chính) ──────────────────────────────── */

const FEATURES = [
  {
    icon: <MessageSquare className="w-5 h-5 text-white" />,
    iconGrad: "from-violet-500 to-purple-600",
    cardGrad: "from-violet-50/90 to-purple-50/50",
    bar: "from-violet-400 to-purple-500",
    title: "AI hỏi đáp thông minh",
    desc: "AI đặt câu hỏi từng bước — màu sắc, phong cách, đối tượng — rồi tạo nội dung chuẩn theo đúng ý bạn.",
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
    title: "HTML inline CSS — dán vào bất kỳ đâu",
    desc: "CSS nhúng trực tiếp vào từng thẻ. Sao chép rồi dán vào Haravan, Sapo, WordPress, Shopify — hoạt động ngay lập tức.",
  },
  {
    icon: <FileDown className="w-5 h-5 text-white" />,
    iconGrad: "from-rose-500 to-red-600",
    cardGrad: "from-rose-50/90 to-red-50/50",
    bar: "from-rose-400 to-red-500",
    title: "Xuất PDF chuyên nghiệp",
    desc: "Tải PDF chất lượng cao từ nội dung đã thiết kế — phù hợp in ấn, gửi hồ sơ hoặc lưu trữ tài liệu.",
  },
  // TODO: Mở lại khi tính năng clone từ website sẵn sàng
  // {
  //   icon: <Link2 className="w-5 h-5 text-white" />,
  //   iconGrad: "from-sky-500 to-blue-600",
  //   cardGrad: "from-sky-50/90 to-blue-50/50",
  //   bar: "from-sky-400 to-blue-500",
  //   title: "Clone website từ URL",
  //   desc: "Dán link bất kỳ trang web — AI phân tích bố cục, màu sắc rồi tái tạo thành HTML chỉnh sửa được ngay trong editor.",
  // },
  {
    icon: <Layers className="w-5 h-5 text-white" />,
    iconGrad: "from-amber-500 to-orange-600",
    cardGrad: "from-amber-50/90 to-orange-50/50",
    bar: "from-amber-400 to-orange-500",
    title: "Kho mẫu template đa dạng",
    desc: "500+ mẫu landing page, quảng cáo, bài viết & portfolio được thiết kế sẵn — chọn ngay rồi tùy chỉnh theo thương hiệu trong vài giây.",
  },
  {
    icon: <Share2 className="w-5 h-5 text-white" />,
    iconGrad: "from-teal-500 to-cyan-600",
    cardGrad: "from-teal-50/90 to-cyan-50/50",
    bar: "from-teal-400 to-cyan-500",
    title: "Xuất bản & chia sẻ link công khai",
    desc: "Xuất bản lên internet với một click — nhận link chia sẻ ngay, ai cũng xem được mà không cần tài khoản.",
  },
];

/* ── Loại nội dung ──────────────────────────────────────────────── */

const CONTENT_TYPES = [
  {
    emoji: "🏠",
    grad: "from-indigo-500 to-violet-600",
    bg: "from-indigo-50 to-violet-50",
    border: "border-indigo-100",
    title: "Landing Page",
    desc: "Flash sale, trang chốt đơn TikTok Shop, campaign Facebook/Google Ads, remarketing — AI hỏi đáp tạo đúng ý bạn.",
    badge: "Chốt đơn nhanh",
    badgeColor: "bg-violet-100 text-violet-700",
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
  },
  {
    emoji: "📣",
    grad: "from-rose-500 to-pink-600",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-100",
    title: "Quảng Cáo & Marketing",
    desc: "Banner TikTok Shop, Facebook/Instagram Ads, Story ads, Zalo OA broadcast — copy chuyển đổi cao, sẵn sàng chạy ngay.",
    badge: "Ads chuyển đổi",
    badgeColor: "bg-rose-100 text-rose-700",
  },
  {
    emoji: "💼",
    grad: "from-teal-500 to-emerald-600",
    bg: "from-teal-50 to-emerald-50",
    border: "border-teal-100",
    title: "Portfolio & CV",
    desc: "Trang cá nhân chuyên nghiệp để gây ấn tượng nhà tuyển dụng — AI hỏi đáp để hiểu đúng kỹ năng và phong cách của bạn.",
    badge: "Gây ấn tượng HR",
    badgeColor: "bg-teal-100 text-teal-700",
  },
];

/* ── 3 bước đơn giản ────────────────────────────────────────────── */

const STEPS = [
  {
    step: "01",
    stepGrad: "from-violet-500 to-purple-600",
    title: "Chọn loại nội dung & mô tả",
    desc: "Chọn Landing Page, Bài viết, Quảng cáo hoặc Portfolio. AI hỏi thêm để hiểu đúng ý bạn — màu sắc, phong cách, đối tượng mục tiêu.",
  },
  {
    step: "02",
    stepGrad: "from-blue-500 to-indigo-600",
    title: "AI tạo HTML hoàn chỉnh",
    desc: "Sau khi có đủ thông tin, AI tạo HTML đầy đủ trong vài giây — hero, tính năng, CTA, footer — inline CSS sẵn sàng dùng ngay.",
  },
  {
    step: "03",
    stepGrad: "from-emerald-500 to-teal-600",
    title: "Chỉnh sửa & xuất theo cách bạn muốn",
    desc: "Kéo thả, chỉnh màu, font trong editor. Sao chép HTML, tải .html, xuất PDF, hoặc xuất bản link công khai — tất cả một click.",
  },
];

/* ── CMS Badges (marquee) ───────────────────────────────────────── */

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

/* ── Mini template preview per category ────────────────────────── */

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
            <div
              className="w-8 h-1 rounded"
              style={{ background: `${accentColor}60` }}
            />
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
            <div
              key={i}
              className={`h-1 bg-gray-100 rounded mb-1.5 ${i === 4 ? "w-1/2" : "w-full"}`}
            />
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
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex-shrink-0`}
            />
            <div>
              <div className="w-16 h-1.5 bg-white/80 rounded mb-1" />
              <div className="w-10 h-1 bg-white/40 rounded" />
            </div>
            <div
              className="ml-auto w-12 h-4 rounded-lg"
              style={{ background: `${accentColor}90` }}
            />
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
              <div
                key={i}
                className={`h-10 rounded-lg bg-gradient-to-br ${g}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (category === "cv") {
    return (
      <div className="h-40 bg-white relative overflow-hidden flex">
        <div
          className={`w-14 bg-gradient-to-b ${gradient} flex-shrink-0 p-2 flex flex-col items-center gap-1.5 pt-3`}
        >
          <div className="w-8 h-8 rounded-full bg-white/30 mb-0.5" />
          <div className="w-8 h-1 bg-white/70 rounded" />
          <div className="w-6 h-1 bg-white/50 rounded" />
          <div className="mt-2 w-full space-y-1">
            {[0.7, 0.9, 0.6, 0.8].map((o, i) => (
              <div
                key={i}
                className="h-0.5 rounded"
                style={{ background: `rgba(255,255,255,${o})` }}
              />
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
      <div
        className={`h-40 bg-gradient-to-br ${gradient} relative overflow-hidden`}
      >
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
    <div
      className={`h-40 bg-gradient-to-br ${gradient} relative overflow-hidden`}
    >
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
            <div
              key={i}
              className="flex-1 bg-white/10 rounded p-1.5 flex flex-col items-center gap-1"
            >
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

/* ── Server cache functions ─────────────────────────────────────── */

const getHomeTemplates = unstable_cache(
  async () => {
    await dbConnect();
    const docs = await TemplateModel.find({}, { html: 0, __v: 0, _id: 0 })
      .sort({ createdAt: -1 })
      .limit(6)
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
    name: "AITaoPage",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Công cụ AI tạo landing page, bài viết và quảng cáo HTML chuẩn inline CSS trong 60 giây cho thị trường Việt Nam.",
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
          <Logo iconSize={32} uid="nav" />

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
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold text-violet-700 bg-violet-50 rounded-full border border-violet-200">
                <Sparkles className="w-3.5 h-3.5" />
                Công cụ AI tạo trang bán hàng · TikTok Shop · Facebook Ads
              </div>

              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Tạo trang bán hàng đẹp,
                <br className="hidden sm:block" />
                chốt đơn nhiều hơn —
                <span className="gradient-text"> không cần designer</span>
              </h1>

              <p className="hero-subtitle text-lg sm:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 mb-6">
                Mô tả bằng tiếng Việt, AI tạo ngay trang bán hàng, banner quảng
                cáo, bài viết đẹp — kéo thả chỉnh sửa,{" "}
                <span className="font-semibold text-gray-700">
                  dán vào Haravan/Sapo/TikTok bio là xong
                </span>
                .
              </p>

              {/* Content type pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6 sm:mb-8">
                {[
                  {
                    label: "🛒 Trang bán hàng",
                    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
                  },
                  {
                    label: "📣 Banner quảng cáo",
                    color: "bg-rose-100 text-rose-700 border-rose-200",
                  },
                  {
                    label: "📝 Bài viết SEO",
                    color: "bg-blue-100 text-blue-700 border-blue-200",
                  },
                  {
                    label: "💼 Portfolio & CV",
                    color: "bg-teal-100 text-teal-700 border-teal-200",
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
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-indigo-700 bg-white border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  <MousePointer2 className="w-4 h-4" /> Xem demo
                </Link>
              </div>

              {/* Stats */}
              <div className="hero-stats flex flex-wrap justify-center lg:justify-start gap-6 mt-7 pt-7 sm:gap-8 sm:mt-10 sm:pt-10 border-t border-violet-100">
                {[
                  {
                    value: "60 giây",
                    label: "tạo xong trang flash sale",
                    grad: "from-indigo-700 to-violet-600",
                  },
                  {
                    value: "< 1s",
                    label: "thời gian tạo HTML",
                    grad: "from-violet-700 to-purple-600",
                  },
                  {
                    value: "TikTok · 6 CMS",
                    label: "tương thích dán vào ngay",
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
                    {SITE_URL}/create
                  </div>
                </div>

                <div className="flex bg-gray-100" style={{ height: "340px" }}>
                  <div className="flex-1 p-3 overflow-hidden flex flex-col gap-2">
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
                        {[
                          "🏠 Landing Page",
                          "📝 Bài viết",
                          "📣 Quảng cáo",
                          "💼 Portfolio",
                        ].map((t) => (
                          <span
                            key={t}
                            className={`text-xs px-2 py-1 rounded-full border ${t.startsWith("🏠") ? "bg-indigo-600 text-white border-indigo-600" : "bg-white border-gray-200 text-gray-600"}`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="bg-violet-50 rounded-lg p-2.5 text-xs text-gray-700 border border-violet-100 mt-1">
                        Bạn đang bán gì? Mô tả sản phẩm và ưu đãi hôm nay?
                      </div>
                      <div className="bg-indigo-600 rounded-lg p-2.5 text-xs text-white self-end max-w-[80%]">
                        Son môi dưỡng ẩm 189k, giảm 30% hôm nay thôi, freeship
                      </div>
                      <div className="bg-green-50 rounded-lg p-2.5 text-xs text-gray-700 border border-green-100 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Đang tạo trang bán hàng...
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-rose-500 via-pink-600 to-red-600 rounded-xl p-3 text-white text-center flex-shrink-0">
                      <div className="text-xs text-rose-200 mb-0.5">
                        🔥 FLASH SALE HÔM NAY
                      </div>
                      <div className="font-bold text-sm mb-1.5">
                        Son Môi Dưỡng Ẩm — Giảm 30%
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

      {/* ── Dành cho ai? ───────────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Dành cho ai?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Từ shop online đến agency — AITaoPage giúp bạn tạo nội dung chốt đơn nhanh hơn, không cần designer
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                emoji: "🛒",
                grad: "from-orange-500 to-rose-500",
                bg: "bg-orange-50",
                border: "border-orange-100",
                accent: "text-orange-600",
                title: "Shop online & TikTok Shop",
                desc: "Tạo trang sản phẩm đẹp, flash sale hấp dẫn, link bio TikTok chốt đơn cao hơn — trong 60 giây.",
                tags: ["Flash sale", "Trang sản phẩm", "Link bio TikTok", "Banner khuyến mãi"],
              },
              {
                emoji: "📣",
                grad: "from-blue-500 to-indigo-600",
                bg: "bg-blue-50",
                border: "border-blue-100",
                accent: "text-blue-600",
                title: "Chạy Facebook Ads & TikTok Ads",
                desc: "Tạo landing page riêng cho từng campaign, tối ưu tỷ lệ chuyển đổi, không cần chờ designer.",
                tags: ["Facebook Ads", "TikTok Ads", "Google Ads", "Zalo Ads"],
              },
              {
                emoji: "🔄",
                grad: "from-violet-500 to-purple-600",
                bg: "bg-violet-50",
                border: "border-violet-100",
                accent: "text-violet-600",
                title: "Remarketing & Email Marketing",
                desc: "Tạo nhiều version landing page nhanh để A/B test, email HTML đẹp gửi remarketing list.",
                tags: ["A/B Testing", "Email HTML", "Retargeting", "Multi-campaign"],
              },
              {
                emoji: "✍️",
                grad: "from-teal-500 to-cyan-600",
                bg: "bg-teal-50",
                border: "border-teal-100",
                accent: "text-teal-600",
                title: "Content Creator & Agency",
                desc: "Bài viết HTML đẹp đăng CMS, portfolio chuyên nghiệp, CV xin việc — không cần designer riêng.",
                tags: ["Blog SEO", "Portfolio", "CV", "CMS Content"],
              },
            ].map(({ emoji, grad, bg, border, accent, title, desc, tags }, i) => (
              <ScrollReveal key={title} delay={i * 80}>
                <div className={`h-full rounded-2xl ${bg} border ${border} p-5 flex flex-col`}>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-2xl mb-4 shadow-md flex-shrink-0`}>
                    {emoji}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span key={tag} className={`text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white border ${border} ${accent}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-10">
            <Link
              href={isLoggedIn ? "/create" : "/login?tab=register"}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-4 h-4" /> Bắt đầu miễn phí — không cần thẻ tín dụng
            </Link>
          </ScrollReveal>
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
              Mô tả bằng tiếng Việt — Claude &amp; Gemini AI tạo nội dung, mở
              thẳng trong editor để chỉnh sửa
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
                  <span className="ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                    Landing Page
                  </span>
                </div>
                <div className="bg-white/10 rounded-xl border border-white/10 p-4 flex-1 text-sm text-gray-300 leading-relaxed">
                  Tạo landing page bán khóa học lập trình Python. Đối tượng:
                  sinh viên và người đi làm muốn chuyển ngành. Màu chủ đạo xanh
                  navy. Nút CTA &ldquo;Đăng ký học thử miễn phí&rdquo;.
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-indigo-400/70">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  Claude AI phân tích &amp; tạo nội dung
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
                    Kéo thả · Thêm ảnh · Thay màu · Xuất HTML
                  </span>
                  <span className="text-xs text-indigo-400/60">
                    0 JS · CSS inline
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
              Tạo bất kỳ loại nội dung nào
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Mô tả bằng tiếng Việt — AI hiểu và tạo đúng loại, đúng mục đích
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
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                  Mẫu giao diện có sẵn
                </h2>
                <p className="text-gray-500 text-sm">
                  Dùng ngay làm điểm khởi đầu, chỉnh sửa theo thương hiệu của
                  bạn
                </p>
              </div>
              <Link
                href="/templates"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex-shrink-0"
              >
                Xem tất cả mẫu <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(homeTemplates.length > 0
              ? homeTemplates
              : [
                  {
                    id: "lp-1",
                    name: "Landing page bán hàng",
                    category: "landing",
                    description:
                      "Mẫu landing page chuyển đổi cao cho e-commerce",
                    gradient: "from-indigo-500 to-violet-600",
                    accentColor: "#6366f1",
                  },
                  {
                    id: "art-1",
                    name: "Bài viết SEO chuẩn",
                    category: "article",
                    description:
                      "Mẫu bài viết blog chuẩn SEO với heading structure",
                    gradient: "from-blue-500 to-cyan-500",
                    accentColor: "#3b82f6",
                  },
                  {
                    id: "ads-1",
                    name: "Banner quảng cáo Facebook",
                    category: "ads",
                    description: "Banner ads tỷ lệ chuyển đổi cao cho Facebook",
                    gradient: "from-rose-500 to-pink-600",
                    accentColor: "#f43f5e",
                  },
                  {
                    id: "port-1",
                    name: "Portfolio freelancer",
                    category: "portfolio",
                    description: "Trang portfolio chuyên nghiệp cho freelancer",
                    gradient: "from-teal-500 to-emerald-600",
                    accentColor: "#14b8a6",
                  },
                  {
                    id: "cv-1",
                    name: "CV xin việc lập trình",
                    category: "cv",
                    description: "CV online nổi bật cho developer và designer",
                    gradient: "from-amber-500 to-orange-500",
                    accentColor: "#f59e0b",
                  },
                  {
                    id: "lp-2",
                    name: "Trang giới thiệu dịch vụ",
                    category: "landing",
                    description: "Landing page dịch vụ chuyên nghiệp và uy tín",
                    gradient: "from-sky-500 to-blue-600",
                    accentColor: "#0ea5e9",
                  },
                ]
            ).map((t, i) => {
              const catMeta =
                CATEGORY_META[t.category as keyof typeof CATEGORY_META];
              return (
                <ScrollReveal key={t.id} delay={i * 60}>
                  <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-200 flex flex-col h-full">
                    {/* Mini preview + hover overlay */}
                    <div className="relative flex-shrink-0">
                      <MiniPreview
                        category={t.category}
                        gradient={t.gradient}
                        accentColor={t.accentColor}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center z-20">
                        <Link
                          href={
                            homeTemplates.length > 0
                              ? `/templates?preview=${t.id}`
                              : "/templates"
                          }
                          className="flex items-center gap-1.5 bg-white/90 text-gray-900 rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-white transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" /> Xem trước
                        </Link>
                      </div>
                    </div>
                    {/* Card body */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                          {t.name}
                        </h3>
                        <span
                          className="flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${t.accentColor}18`,
                            color: t.accentColor,
                          }}
                        >
                          {catMeta?.label ?? t.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2 flex-1">
                        {t.description}
                      </p>
                      {/* Mobile: Xem trước button */}
                      <Link
                        href={
                          homeTemplates.length > 0
                            ? `/templates?preview=${t.id}`
                            : "/templates"
                        }
                        className="sm:hidden w-full mb-2 py-2 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-700 flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Xem trước
                      </Link>
                      <Link
                        href={
                          homeTemplates.length > 0
                            ? `/editor?template=${t.id}`
                            : "/templates"
                        }
                        className="w-full py-2 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                        style={{
                          background: `linear-gradient(135deg, ${t.accentColor}, ${t.accentColor}cc)`,
                        }}
                      >
                        Dùng mẫu này →
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

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
              Tính năng đã có sẵn
            </h2>
            <p className="text-gray-500">
              Xây dựng dành riêng cho thị trường Việt Nam
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
                q: "Tôi bán hàng trên TikTok Shop, dùng AITaoPage được không?",
                a: "Hoàn toàn được. Bạn tạo trang sản phẩm hoặc landing page trên AITaoPage, xuất link công khai rồi dán vào bio TikTok hoặc link trong video. Khách click vào là thấy trang bán hàng đẹp ngay — không cần tài khoản, không cần cài app.",
                accent: "border-l-orange-400",
              },
              {
                q: "Tôi chạy Facebook Ads, AITaoPage giúp gì được?",
                a: "AITaoPage giúp bạn tạo landing page riêng cho từng campaign trong 60 giây — không cần designer, không cần code. Mỗi ad set có thể có landing page khác nhau để A/B test tỷ lệ chuyển đổi, tối ưu chi phí quảng cáo.",
                accent: "border-l-blue-400",
              },
              {
                q: "Tôi muốn làm remarketing, AITaoPage có phù hợp không?",
                a: "Phù hợp. Bạn tạo nhiều version landing page nhanh cho các nhóm remarketing khác nhau — khách xem sản phẩm A thấy trang A, khách bỏ giỏ hàng thấy trang có ưu đãi riêng. Xuất HTML dán vào bất kỳ CMS nào hoặc dùng link xuất bản trực tiếp.",
                accent: "border-l-violet-400",
              },
              {
                q: "Tôi có cần biết code HTML/CSS không?",
                a: "Không. Bạn chỉ cần mô tả bằng tiếng Việt tự nhiên. AI tạo toàn bộ HTML và CSS, rồi bạn chỉnh sửa trực tiếp bằng cách kéo thả trong editor.",
                accent: "border-l-indigo-400",
              },
              {
                q: "HTML tạo ra có dán vào Haravan/Sapo được không?",
                a: 'Có. Khi bạn nhấn "Sao chép HTML", hệ thống xử lý phía server để nhúng toàn bộ CSS vào từng thẻ HTML (inline style). CMS không lọc bỏ định dạng vì không có thẻ <style> hay <script>.',
                accent: "border-l-emerald-400",
              },
              {
                q: "Gói miễn phí bị giới hạn ở đâu?",
                a: "Gói Free: 4 lượt tạo nội dung mỗi tháng (landing page, bài viết hoặc quảng cáo...). Có thể chỉnh sửa trong editor nhưng không sao chép hay tải HTML. Giới hạn này được kiểm tra phía server — không thể vượt qua bằng DevTools.",
                accent: "border-l-purple-400",
              },
              {
                q: "Thanh toán như thế nào?",
                a: "Chuyển khoản ngân hàng — bạn chọn gói, nhận mã đơn hàng, chuyển tiền ghi mã đó vào nội dung. Đội ngũ kích hoạt thủ công trong 1–4 giờ. Thời hạn giữ đơn 24 giờ.",
                accent: "border-l-rose-400",
              },
              {
                q: "Link xuất bản là gì và ai có thể xem?",
                a: "Khi nhấn 'Xuất bản', hệ thống tạo một trang web công khai với URL duy nhất — bất kỳ ai có link đều xem được ngay, không cần đăng nhập hay tài khoản. Dùng để chia sẻ qua Zalo, Facebook, email hoặc dán vào bio TikTok. Tính năng xuất PDF cũng có sẵn ngay trong editor, tải file PDF chất lượng cao chỉ một click.",
                accent: "border-l-teal-400",
              },
            ]}
          />
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
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6 sm:pt-14 sm:pb-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-8 sm:gap-10 sm:mb-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <Logo iconSize={32} uid="footer" dark className="mb-4" />
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                Công cụ AI giúp bạn tạo nội dung HTML đẹp trong 60 giây — không
                cần biết code.
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
                  { href: "/create", label: "Shop online & TikTok Shop" },
                  { href: "/create", label: "Dân chạy Facebook Ads" },
                  { href: "/create", label: "Remarketing & Email" },
                  { href: "/create", label: "Content Creator" },
                  { href: "/create", label: "Agency & Freelancer" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-white transition-colors">
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
              © {new Date().getFullYear()} AITaoPage. Tất cả quyền được bảo lưu.
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
