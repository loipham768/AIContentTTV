import Link from 'next/link'
import { auth } from '@/auth'
import {
  Zap, LayoutTemplate, Code2, Globe, History, Languages,
  CheckCircle2, ArrowRight, Star
} from 'lucide-react'

export default async function LandingPage() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">AI Content Booster</span>
          <nav className="flex items-center gap-2">
            {isLoggedIn ? (
              <Link href="/editor" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Vào trình soạn thảo →
              </Link>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Đăng nhập
                </Link>
                <Link href="/login" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Dùng thử miễn phí
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
            <Zap className="w-3.5 h-3.5" />
            Công cụ AI cho người sáng tạo nội dung Việt Nam
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Tạo nội dung HTML đẹp<br className="hidden sm:block" />
            <span className="text-blue-600"> trong 60 giây</span> với AI
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Nhập mô tả bằng tiếng Việt, AI tự động tạo khối nội dung HTML chuẩn inline CSS —
            sẵn sàng dán vào Haravan, Sapo, WordPress hay bất kỳ CMS nào.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md">
              Bắt đầu miễn phí
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#pricing" className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              Xem bảng giá
            </a>
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Chỉ 3 bước đơn giản</h2>
            <p className="mt-2 text-gray-500">Từ ý tưởng đến HTML hoàn chỉnh trong chưa đầy một phút</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Nhập mô tả', desc: 'Gõ yêu cầu bằng tiếng Việt — AI hiểu ngôn ngữ tự nhiên của bạn.' },
              { step: '02', title: 'AI tạo khối nội dung', desc: 'Claude AI tức thì tạo ra khối HTML đẹp với bố cục và màu sắc phù hợp.' },
              { step: '03', title: 'Chỉnh sửa & sao chép', desc: 'Kéo thả, chỉnh màu sắc, font chữ rồi sao chép HTML đã inlined CSS.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative pl-6 border-l-2 border-blue-100">
                <span className="text-4xl font-extrabold text-blue-100 select-none">{step}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">{title}</h3>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Tính năng nổi bật</h2>
            <p className="mt-2 text-gray-500">Được thiết kế đặc biệt cho thị trường Việt Nam</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Zap className="w-5 h-5 text-yellow-500" />, title: 'AI tạo nội dung tiếng Việt', desc: 'Claude AI được tinh chỉnh để tạo nội dung marketing chất lượng cao bằng tiếng Việt.' },
              { icon: <LayoutTemplate className="w-5 h-5 text-blue-500" />, title: 'Kéo thả trực quan', desc: 'Trình soạn thảo GrapesJS cho phép kéo thả, thêm cột, hàng và chỉnh sửa inline.' },
              { icon: <Code2 className="w-5 h-5 text-green-500" />, title: 'HTML inline CSS sẵn sàng', desc: 'CSS được tự động nhúng vào từng thẻ HTML — không cần stylesheet riêng.' },
              { icon: <Globe className="w-5 h-5 text-purple-500" />, title: 'Tương thích mọi CMS', desc: 'Hoạt động hoàn hảo với Haravan, Sapo, WordPress, Shopify và TinyMCE.' },
              { icon: <History className="w-5 h-5 text-orange-500" />, title: 'Lưu lịch sử dự án', desc: 'Tất cả khối nội dung được lưu tự động — mở lại, chỉnh sửa bất kỳ lúc nào.' },
              { icon: <Languages className="w-5 h-5 text-red-500" />, title: 'Giao diện hoàn toàn tiếng Việt', desc: 'Toàn bộ ứng dụng được Việt hóa — không cần biết tiếng Anh để sử dụng.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Bảng giá</h2>
            <p className="mt-2 text-gray-500">Lựa chọn gói phù hợp với nhu cầu của bạn</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 items-start">

            {/* Free */}
            <div className="rounded-2xl border border-gray-200 p-8">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Miễn phí</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-gray-900">0đ</span>
                <span className="text-gray-400 mb-1">/tháng</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">Dùng thử không giới hạn thời gian</p>
              <Link href="/login" className="mt-6 block text-center py-2.5 text-sm font-semibold text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 transition-colors">
                Bắt đầu miễn phí
              </Link>
              <ul className="mt-8 space-y-3">
                {['5 khối nội dung/tháng', 'Lưu tối đa 10 dự án', 'Xuất HTML inline CSS', 'Hỗ trợ cộng đồng'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro — highlighted */}
            <div className="rounded-2xl border-2 border-blue-600 p-8 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">
                  <Star className="w-3 h-3" /> Phổ biến nhất
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Pro</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-gray-900">199.000đ</span>
                <span className="text-gray-400 mb-1">/tháng</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">Dành cho cá nhân & freelancer</p>
              <Link href="/login" className="mt-6 block text-center py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                Nâng cấp ngay
              </Link>
              <ul className="mt-8 space-y-3">
                {['100 khối nội dung/tháng', 'Lưu không giới hạn dự án', 'Xuất HTML inline CSS', 'Lịch sử 6 tháng', 'Ưu tiên hỗ trợ', '20+ mẫu khối có sẵn'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Business */}
            <div className="rounded-2xl border border-gray-200 p-8">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Business</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-gray-900">499.000đ</span>
                <span className="text-gray-400 mb-1">/tháng</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">Dành cho đội nhóm & doanh nghiệp</p>
              <a href="mailto:support@aicontentbooster.vn" className="mt-6 block text-center py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                Liên hệ tư vấn
              </a>
              <ul className="mt-8 space-y-3">
                {['Không giới hạn khối/tháng', 'Lưu không giới hạn', 'Nhiều tài khoản thành viên', 'API access', 'Lịch sử không giới hạn', 'Hỗ trợ riêng 24/7'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Câu hỏi thường gặp</h2>
          <div className="space-y-6">
            {[
              { q: 'Tôi có cần biết code HTML/CSS không?', a: 'Không. Bạn chỉ cần nhập mô tả bằng tiếng Việt. AI sẽ tự tạo toàn bộ HTML và CSS cho bạn.' },
              { q: 'HTML tạo ra có dùng được trên Haravan/Sapo không?', a: 'Có. CSS được nhúng trực tiếp vào từng thẻ HTML (inline style) nên hoạt động ổn định trên mọi CMS bao gồm Haravan, Sapo và WordPress.' },
              { q: 'Dữ liệu của tôi có được lưu trữ an toàn không?', a: 'Có. Toàn bộ dự án được lưu trên MongoDB Atlas với xác thực bảo mật. Chúng tôi không bao giờ chia sẻ dữ liệu của bạn.' },
              { q: 'Tôi có thể thay đổi gói sau khi đăng ký không?', a: 'Có. Bạn có thể nâng cấp hoặc hạ cấp gói bất kỳ lúc nào. Thay đổi có hiệu lực ngay từ chu kỳ thanh toán tiếp theo.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Sẵn sàng tạo nội dung đẹp hơn?</h2>
          <p className="text-blue-100 mb-8">Đăng ký miễn phí ngay hôm nay. Không cần thẻ tín dụng.</p>
          <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors shadow-md">
            Bắt đầu miễn phí
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="py-10 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold text-white">AI Content Booster</span>
          <p className="text-xs text-center">© 2026 AI Content Booster. Được xây dựng cho người sáng tạo nội dung Việt Nam.</p>
          <div className="flex gap-4 text-xs">
            <a href="mailto:support@aicontentbooster.vn" className="hover:text-white transition-colors">Liên hệ</a>
            <Link href="/login" className="hover:text-white transition-colors">Đăng nhập</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
