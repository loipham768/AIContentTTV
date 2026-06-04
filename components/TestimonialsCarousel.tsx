"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const TESTIMONIALS = [
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

export default function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () =>
      setVisible(
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1,
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = TESTIMONIALS.length;
  const maxIdx = total - visible;

  // Clamp idx when visible count changes (e.g. on resize)
  useEffect(() => {
    setIdx((i) => Math.min(i, Math.max(0, total - visible)));
  }, [visible, total]);

  const next = useCallback(
    () => setIdx((i) => (i >= maxIdx ? 0 : i + 1)),
    [maxIdx],
  );
  const prev = () => setIdx((i) => (i <= 0 ? maxIdx : i - 1));

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        background:
          "linear-gradient(135deg, #4c1d95 0%, #6b21a8 50%, #3b0764 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-violet-400/40 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full bg-fuchsia-400/30 blur-3xl animate-blob-2" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-purple-400/25 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-medium text-fuchsia-200 bg-fuchsia-400/20 rounded-full border border-fuchsia-300/40">
            <Star className="w-3.5 h-3.5 fill-fuchsia-200" />
            Hơn 50 ngàn người dùng tin tưởng
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Khách hàng nói gì?
          </h2>
          <p className="text-gray-400">
            Người sáng tạo nội dung Việt Nam từ freelancer đến doanh nghiệp
          </p>
        </div>

        {/* Slider track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${idx * (100 / visible)}%)` }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="shrink-0 px-3"
                style={{ width: `${100 / visible}%` }}
              >
                <TestimonialCard {...t} />
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
                    ? "w-7 h-2.5 bg-blue-400"
                    : "w-2.5 h-2.5 bg-white/25 hover:bg-white/45"
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
      </div>
    </section>
  );
}

type CardProps = (typeof TESTIMONIALS)[number];

function TestimonialCard({ name, role, quote, gradient, initial }: CardProps) {
  return (
    <div className="relative h-full group">
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300 rounded-2xl" />

      <div className="relative h-full flex flex-col bg-white/[0.07] backdrop-blur-md rounded-2xl p-6 border border-white/10 group-hover:border-white/25 group-hover:bg-white/[0.11] transition-all duration-300">
        {/* Decorative quote icon */}
        <div className="absolute top-5 right-5 text-white/10">
          <Quote className="w-9 h-9" />
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
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
