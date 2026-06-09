"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2, LogIn } from "lucide-react";
import Link from "next/link";
import ReviewForm from "@/components/reviews/ReviewForm";

interface RealReview {
  _id: any;
  userName: string;
  content: string;
  rating: number;
  plan?: string;
}

interface ReviewStats {
  avg: number;
  count: number;
  dist: { star: number; count: number }[];
}

const STATIC_TESTIMONIALS = [
  {
    name: "Nguyễn Thị Lan",
    role: "Content Writer · Haravan",
    quote:
      "Trước đây tôi mất cả buổi để làm một banner. Bây giờ AI tạo xong trong 1 phút, tôi chỉ cần chỉnh vài chi tiết rồi paste vào là xong. Năng suất tăng gấp 5 lần.",
    gradient: "from-blue-500 to-indigo-600",
    initial: "L",
  },
  {
    name: "Trần Quốc Huy",
    role: "Chủ shop thời trang · Sapo",
    quote:
      "HTML inline CSS dán vào Sapo không bị lỗi giao diện. Tôi không cần biết code vẫn tạo được khối content đẹp như chuyên nghiệp thiết kế.",
    gradient: "from-emerald-500 to-teal-600",
    initial: "H",
  },
  {
    name: "Lê Thị Mai",
    role: "Digital Marketing Manager",
    quote:
      "Nhập tiếng Việt hoàn toàn tự nhiên mà AI vẫn hiểu đúng ý định. Tính năng lưu lịch sử giúp tôi tái sử dụng template cũ rất tiện lợi.",
    gradient: "from-orange-500 to-pink-600",
    initial: "M",
  },
  {
    name: "Phạm Minh Tuấn",
    role: "SEO & Content Specialist",
    quote:
      "Tôi dùng tool này mỗi ngày để tạo banner khuyến mãi cho WordPress. Tốc độ nhanh, HTML sạch, không cần plugin thêm hay lo CSS conflict.",
    gradient: "from-violet-500 to-purple-600",
    initial: "T",
  },
  {
    name: "Hoàng Thị Thu",
    role: "Freelance Content Creator",
    quote:
      "Khách hàng cứ nghĩ tôi thuê designer riêng, nhưng thực ra AI làm hết chỉ trong vài giây. Tôi tiết kiệm được 3-4 triệu/tháng tiền outsource.",
    gradient: "from-rose-500 to-pink-500",
    initial: "T",
  },
  {
    name: "Vũ Đức Anh",
    role: "E-commerce Manager · Sapo",
    quote:
      "Dùng cho team marketing 5 người. Mỗi chiến dịch tiết kiệm được 2-3 ngày công so với làm thủ công. ROI cực kỳ cao so với chi phí đăng ký.",
    gradient: "from-cyan-500 to-blue-600",
    initial: "A",
  },
  {
    name: "Đặng Thị Hương",
    role: "Social Media Manager",
    quote:
      "Rất phù hợp cho team nhỏ không có designer. Chỉ cần mô tả bằng tiếng Việt là ra ngay banner đẹp để đăng lên Shopee, Lazada hay Facebook.",
    gradient: "from-amber-500 to-orange-600",
    initial: "H",
  },
  {
    name: "Bùi Văn Long",
    role: "WordPress Developer · Freelancer",
    quote:
      "Tôi integrate thẳng vào quy trình build site cho khách hàng. Inline CSS không conflict với theme, khách mới hoàn toàn cũng tự chỉnh sửa được.",
    gradient: "from-green-500 to-emerald-600",
    initial: "L",
  },
];

const REAL_GRADIENTS = [
  "from-indigo-500 to-violet-600",
  "from-violet-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-cyan-500 to-blue-600",
  "from-rose-500 to-pink-600",
  "from-sky-500 to-blue-500",
  "from-fuchsia-500 to-purple-600",
  "from-lime-500 to-green-600",
  "from-teal-500 to-cyan-600",
];

const PLAN_LABELS: Record<string, string> = {
  designer: "Designer",
  basic: "Basic",
  pro: "Pro",
};

type CardItem = {
  name: string;
  role: string;
  quote: string;
  gradient: string;
  initial: string;
  rating: number;
  verified: boolean;
};

export default function TestimonialsCarousel({
  realReviews = [],
  reviewStats,
  userId,
  hasReviewed = false,
}: {
  realReviews?: RealReview[];
  reviewStats?: ReviewStats;
  userId?: string;
  hasReviewed?: boolean;
}) {
  const mappedReal: CardItem[] = realReviews.map((r, i) => ({
    name: r.userName,
    role: r.plan ? `${PLAN_LABELS[r.plan] ?? r.plan} · AITaoPage` : "Người dùng AITaoPage",
    quote: r.content,
    gradient: REAL_GRADIENTS[i % REAL_GRADIENTS.length],
    initial: r.userName.charAt(0).toUpperCase(),
    rating: r.rating,
    verified: true,
  }));

  const allItems: CardItem[] = [
    ...STATIC_TESTIMONIALS.map((t) => ({ ...t, rating: 5, verified: false })),
    ...mappedReal,
  ];

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(3);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () =>
      setVisible(
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1,
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = allItems.length;
  const maxIdx = Math.max(0, total - visible);

  useEffect(() => {
    setIdx((i) => Math.min(i, maxIdx));
  }, [visible, maxIdx]);

  const next = useCallback(
    () => setIdx((i) => (i >= maxIdx ? 0 : i + 1)),
    [maxIdx],
  );
  const prev = () => setIdx((i) => (i <= 0 ? maxIdx : i - 1));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, inView, next]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24"
      style={{
        background:
          "linear-gradient(135deg, #06040f 0%, #130d35 55%, #0a0720 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-indigo-600/25 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full bg-violet-700/20 blur-3xl animate-blob-2" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-indigo-800/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-medium text-violet-200 bg-indigo-500/20 rounded-full border border-violet-400/30">
            <Star className="w-3.5 h-3.5 fill-violet-200" />
            Hơn 50 ngàn người dùng tin tưởng
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Khách hàng nói gì?
          </h2>
          <p className="text-indigo-300/70">
            Người sáng tạo nội dung Việt Nam từ freelancer đến doanh nghiệp
          </p>
        </div>

        {/* Slider track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${idx * (100 / visible)}%)` }}
          >
            {allItems.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="shrink-0 px-3"
                style={{ width: `${100 / visible}%` }}
              >
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <button
            onClick={prev}
            aria-label="Trước"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 border border-white/20 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIdx + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Trang ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === idx
                    ? "w-7 h-2.5 bg-indigo-400"
                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Tiếp theo"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 border border-white/20 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Rating summary + review form */}
        <div className="mt-12 grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* Stats strip — chỉ hiện khi có >= 3 đánh giá */}
          {reviewStats && reviewStats.count >= 3 ? (
            <div className="flex flex-col sm:flex-row items-center gap-6 px-6 py-5 rounded-2xl border border-white/6" style={{ background: "rgba(255,255,255,0.03)" }}>
              {/* Avg + stars */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-5xl font-black text-white tabular-nums leading-none">{reviewStats.avg}</span>
                <div className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4"
                        fill={s <= Math.round(reviewStats.avg) ? "#f59e0b" : "none"}
                        stroke={s <= Math.round(reviewStats.avg) ? "#f59e0b" : "#374151"}
                        strokeWidth={1.5}
                      />
                    ))}
                  </span>
                  <p className="text-xs text-gray-500">{reviewStats.count} đánh giá thực</p>
                </div>
              </div>

              <div className="w-px h-12 bg-white/8 hidden sm:block shrink-0" />

              {/* Distribution bars */}
              <div className="flex-1 w-full space-y-1.5">
                {reviewStats.dist.map(({ star, count }) => {
                  const pct = reviewStats.count > 0 ? Math.round((count / reviewStats.count) * 100) : 0;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-[11px] text-gray-600 w-2.5 shrink-0 text-right">{star}</span>
                      <Star className="w-2.5 h-2.5 shrink-0" fill="#f59e0b" stroke="none" />
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background: star >= 4 ? "#f59e0b" : star === 3 ? "#6366f1" : "#374151",
                          }}
                        />
                      </div>
                      <span className="text-[11px] text-gray-700 w-3 shrink-0">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/6 px-6 py-5 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-sm text-gray-600">Chưa đủ đánh giá để hiển thị thống kê.</p>
            </div>
          )}

          {/* Form panel */}
          <div
            className="rounded-2xl border border-white/8 p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(150deg, rgba(99,102,241,0.08), #0d0b1f 55%)" }}
          >
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-24 pointer-events-none opacity-50"
              style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.35), transparent 70%)" }}
            />
            <div className="relative">
              <h3 className="text-sm font-bold text-white mb-1">
                {hasReviewed ? "✓ Đã gửi đánh giá" : "Chia sẻ trải nghiệm của bạn"}
              </h3>
              <p className="text-xs text-gray-500 mb-5">
                {hasReviewed
                  ? "Đánh giá của bạn đang chờ duyệt và sẽ xuất hiện sớm."
                  : "Đánh giá thực giúp cộng đồng và giúp AITaoPage phát triển."}
              </p>
              {userId ? (
                <ReviewForm hasReviewed={hasReviewed} />
              ) : (
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-3 text-white text-sm font-bold rounded-xl transition-all"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                >
                  <LogIn className="w-4 h-4" /> Đăng nhập để đánh giá
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, quote, gradient, initial, rating, verified }: CardItem) {
  return (
    <div className="relative h-full group">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 to-violet-500/0 group-hover:from-indigo-500/10 group-hover:to-violet-500/10 transition-all duration-300" />

      <div className="relative h-full flex flex-col bg-white/[0.07] backdrop-blur-md rounded-2xl p-6 border border-white/10 group-hover:border-white/25 group-hover:bg-white/[0.11] transition-all duration-300">
        {/* Decorative quote icon */}
        <div className="absolute top-5 right-5 text-white/10">
          <Quote className="w-9 h-9" />
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className="w-4 h-4"
              fill={s <= rating ? "#f59e0b" : "none"}
              stroke={s <= rating ? "#f59e0b" : "#4b5563"}
              strokeWidth={1.5}
            />
          ))}
          {verified && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1.5 shrink-0" />
          )}
        </div>

        {/* Quote */}
        <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-5" />

        {/* Author */}
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-base shrink-0 shadow-lg ring-2 ring-white/10`}
          >
            {initial}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{name}</div>
            <div className="text-xs text-gray-400 mt-0.5">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
