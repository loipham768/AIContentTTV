import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  ArrowLeft,
  Clock,
  Zap,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import Logo, { LogoIcon } from "@/components/Logo";
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_DISPLAY,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Liên hệ hỗ trợ — TaoPage",
  description: `Liên hệ đội ngũ TaoPage để được hỗ trợ nhanh nhất. Hotline: ${SUPPORT_PHONE_DISPLAY} · Email: ${SUPPORT_EMAIL}`,
};

const FAQS = [
  {
    q: "Gói chưa kích hoạt sau khi chuyển khoản?",
    a: "Gói được kích hoạt trong 1–4 giờ sau chuyển khoản. Quá 4 giờ, nhắn Zalo hoặc email kèm ảnh chụp giao dịch — chúng tôi xử lý ngay.",
  },
  {
    q: "Muốn nâng, hạ gói hoặc hoàn tiền?",
    a: "Nhắn Zalo hoặc email, đội ngũ sẽ hỗ trợ trong ngày làm việc. Hoàn tiền được xem xét trong vòng 7 ngày đầu sử dụng.",
  },
  {
    q: "Gặp lỗi kỹ thuật không dùng được?",
    a: "Gửi email mô tả lỗi kèm ảnh chụp màn hình. Chúng tôi phân tích và phản hồi trong vòng 4 giờ trong giờ làm việc.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── HEADER ── */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><LogoIcon size={32} uid="contact-h" /></Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Trang chủ
          </Link>
        </div>
      </header>

      {/* ── HERO — dark full-bleed ── */}
      <section className="relative bg-[#0f0c29] overflow-hidden pt-32 pb-24 px-6">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/30 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-violet-600/25 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-900/40 blur-[80px] pointer-events-none" />

        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            Phản hồi trong vài giờ
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Cần giúp đỡ?
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              Nhắn ngay đi.
            </span>
          </h1>

          <p className="text-lg text-white/50 max-w-lg mx-auto leading-relaxed">
            Không chatbot. Không form dài. Chỉ là một người thật sẵn sàng giải
            quyết vấn đề của bạn — nhanh nhất có thể.
          </p>
        </div>
      </section>

      {/* ── CONTACT CARDS — pulled up over hero ── */}
      <section className="relative max-w-4xl mx-auto px-6 -mt-12 z-10 mb-20">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Phone card */}
          <a
            href={`tel:${SUPPORT_PHONE}`}
            className="group relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Decorative circle */}
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -right-4 w-52 h-52 rounded-full bg-white/5" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                  Nhanh nhất
                </span>
              </div>

              <p className="text-white/70 text-sm font-medium mb-1 uppercase tracking-widest">
                Điện thoại / Zalo
              </p>
              <p className="text-4xl font-black text-white mb-2 tracking-tight">
                {SUPPORT_PHONE_DISPLAY}
              </p>
              <p className="text-white/60 text-sm mb-6">
                Gọi hoặc nhắn Zalo · phản hồi trong vài phút
              </p>

              <div className="flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                Gọi ngay <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* Email card */}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="group relative bg-[#0f0c29] border border-white/10 rounded-2xl p-8 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-indigo-600/20" />
            <div className="absolute -bottom-10 -right-4 w-52 h-52 rounded-full bg-violet-600/10" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-indigo-400" />
                </div>
                <span className="text-xs font-bold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full uppercase tracking-wider">
                  Có lịch sử
                </span>
              </div>

              <p className="text-white/40 text-sm font-medium mb-1 uppercase tracking-widest">
                Email
              </p>
              <p className="text-3xl font-black text-white mb-2 tracking-tight break-all">
                {SUPPORT_EMAIL}
              </p>
              <p className="text-white/40 text-sm mb-6">
                Phản hồi trong 2–8 giờ làm việc
              </p>

              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm group-hover:gap-3 transition-all">
                Gửi email <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── GIỜ LÀM VIỆC — accent strip ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="bg-amber-50 border border-amber-200/70 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-11 h-11 rounded-xl bg-amber-400 flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-200">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 mb-1">Giờ hỗ trợ</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
              <span>
                <span className="font-semibold text-gray-800">
                  Thứ 2 – Thứ 7
                </span>{" "}
                · 8:00 – 21:00
              </span>
              <span>
                <span className="font-semibold text-gray-800">Chủ nhật</span> ·
                9:00 – 17:00
              </span>
            </div>
          </div>
          <p className="text-xs text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg font-medium flex-shrink-0">
            Ngoài giờ? Cứ nhắn — có khi vẫn online 😄
          </p>
        </div>
      </section>

      {/* ── FAQ — bold numbered style ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="flex items-end gap-4 mb-10">
          <h2 className="text-3xl font-black text-gray-900 leading-tight">
            Câu hỏi
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              thường gặp
            </span>
          </h2>
          <div className="mb-1">
            <MessageCircle className="w-6 h-6 text-gray-300" />
          </div>
        </div>

        <div className="space-y-0 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="flex gap-6 p-6 bg-white border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
            >
              <span className="text-4xl font-black text-gray-100 leading-none flex-shrink-0 select-none w-8 text-right">
                {i + 1}
              </span>
              <div>
                <p className="font-bold text-gray-900 mb-1.5">{faq.q}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ZALO CTA — full-bleed dark ── */}
      <section className="relative bg-gradient-to-br from-[#0f0c29] via-indigo-950 to-[#0f0c29] overflow-hidden py-20 px-6">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-white/40 uppercase text-xs tracking-[0.2em] font-bold mb-4">
            Vẫn còn thắc mắc?
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
            Nhắn Zalo — phản hồi
            <br />
            <span className="text-emerald-400">trong vài phút.</span>
          </h2>
          <p className="text-white/40 text-sm mb-10 max-w-sm mx-auto">
            Không cần email dài dòng. Chụp màn hình, nhắn một câu là đủ.
          </p>
          <a
            href={`https://zalo.me/${SUPPORT_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-black px-10 py-4 rounded-2xl transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 text-lg"
          >
            <Phone className="w-5 h-5" />
            Mở Zalo · {SUPPORT_PHONE_DISPLAY}
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <Logo iconSize={60} uid="contact-f" />
          <p>
            © {new Date().getFullYear()} TaoPage · Tất cả quyền được bảo lưu
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Trang chủ
            </Link>
            <Link
              href="/upgrade"
              className="hover:text-gray-700 transition-colors"
            >
              Bảng giá
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
