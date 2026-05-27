import Link from 'next/link'
import { auth } from '@/auth'
import {
  Zap, LayoutTemplate, Code2, Globe, History, Languages,
  CheckCircle2, ArrowRight, Star, Sparkles, Copy, MousePointer2,
} from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import Logo from '@/components/Logo'

/* ── Data ───────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: <Zap className="w-5 h-5 text-white" />,
    iconGrad: 'from-amber-400 to-yellow-500',
    cardGrad: 'from-amber-50/90 to-yellow-50/50',
    bar: 'from-amber-400 to-yellow-400',
    title: 'AI tạo nội dung tiếng Việt',
    desc: 'Claude AI được tinh chỉnh để tạo nội dung marketing chất lượng cao bằng tiếng Việt.',
  },
  {
    icon: <LayoutTemplate className="w-5 h-5 text-white" />,
    iconGrad: 'from-blue-500 to-indigo-600',
    cardGrad: 'from-blue-50/90 to-indigo-50/50',
    bar: 'from-blue-400 to-indigo-500',
    title: 'Kéo thả trực quan',
    desc: 'Trình soạn thảo GrapesJS cho phép kéo thả, thêm cột, hàng và chỉnh sửa inline.',
  },
  {
    icon: <Code2 className="w-5 h-5 text-white" />,
    iconGrad: 'from-emerald-400 to-teal-600',
    cardGrad: 'from-emerald-50/90 to-teal-50/50',
    bar: 'from-emerald-400 to-teal-500',
    title: 'HTML inline CSS sẵn sàng',
    desc: 'CSS được tự động nhúng vào từng thẻ HTML — không cần stylesheet riêng.',
  },
  {
    icon: <Globe className="w-5 h-5 text-white" />,
    iconGrad: 'from-violet-500 to-purple-600',
    cardGrad: 'from-violet-50/90 to-purple-50/50',
    bar: 'from-violet-400 to-purple-500',
    title: 'Tương thích mọi CMS',
    desc: 'Hoạt động hoàn hảo với Haravan, Sapo, WordPress, Shopify và TinyMCE.',
  },
  {
    icon: <History className="w-5 h-5 text-white" />,
    iconGrad: 'from-orange-400 to-rose-500',
    cardGrad: 'from-orange-50/90 to-rose-50/50',
    bar: 'from-orange-400 to-rose-400',
    title: 'Lưu lịch sử dự án',
    desc: 'Tất cả khối nội dung được lưu tự động — mở lại, chỉnh sửa bất kỳ lúc nào.',
  },
  {
    icon: <Languages className="w-5 h-5 text-white" />,
    iconGrad: 'from-pink-500 to-fuchsia-600',
    cardGrad: 'from-pink-50/90 to-fuchsia-50/50',
    bar: 'from-pink-400 to-fuchsia-500',
    title: 'Giao diện hoàn toàn tiếng Việt',
    desc: 'Toàn bộ ứng dụng được Việt hóa — không cần biết tiếng Anh để sử dụng.',
  },
]

const STEPS = [
  {
    step: '01',
    stepGrad: 'from-blue-500 to-indigo-600',
    wrapGrad: 'from-blue-100/80 to-indigo-100/60',
    title: 'Nhập mô tả bằng tiếng Việt',
    desc: 'Gõ yêu cầu tự nhiên như: "Banner sale hè, màu xanh, nút CTA vàng".',
    preview: (
      <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
        <div className="text-xs text-gray-400 mb-2">Nhập mô tả nội dung...</div>
        <div className="bg-blue-50 rounded-lg p-3 text-sm text-gray-700 border border-blue-200">
          Banner khuyến mãi Sale Hè 2026, màu xanh gradient, tiêu đề lớn, nút CTA màu vàng &ldquo;Mua ngay&rdquo;
          <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 animate-pulse align-middle" />
        </div>
        <div className="mt-3 flex justify-end">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-md">
            <Zap className="w-3.5 h-3.5" /> Tạo với AI
          </div>
        </div>
      </div>
    ),
  },
  {
    step: '02',
    stepGrad: 'from-violet-500 to-purple-600',
    wrapGrad: 'from-violet-100/80 to-purple-100/60',
    title: 'AI tạo khối HTML ngay lập tức',
    desc: 'Claude AI hiểu tiếng Việt và tạo ra khối HTML đẹp với bố cục và màu sắc phù hợp.',
    preview: (
      <div className="bg-white rounded-xl border border-violet-100 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">AI đang tạo...</span>
          <span className="ml-auto text-xs font-medium text-violet-600">0.8s</span>
        </div>
        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-lg p-4 text-white text-center">
          <div className="text-xs text-violet-200 mb-1">SALE HÈ 2026</div>
          <div className="font-bold text-lg mb-2">Giảm đến <span className="text-yellow-300">50%</span></div>
          <div className="bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full inline-block shadow">
            Mua ngay →
          </div>
        </div>
      </div>
    ),
  },
  {
    step: '03',
    stepGrad: 'from-emerald-500 to-teal-600',
    wrapGrad: 'from-emerald-100/80 to-teal-100/60',
    title: 'Chỉnh sửa & sao chép HTML',
    desc: 'Kéo thả, chỉnh màu sắc, font chữ rồi sao chép HTML inline CSS — dán vào CMS.',
    preview: (
      <div className="bg-white rounded-xl border border-emerald-100 p-4 shadow-sm">
        <div className="text-xs font-mono bg-gray-900 rounded-lg p-3 text-left leading-relaxed">
          <span className="text-gray-500">&lt;</span>
          <span className="text-blue-400">div</span>
          <span className="text-yellow-300"> style</span>
          <span className="text-gray-300">=&quot;background:linear-gradient(...</span>
          <br />
          <span className="text-gray-500 ml-2">&lt;</span>
          <span className="text-blue-400">h2</span>
          <span className="text-yellow-300"> style</span>
          <span className="text-gray-300">=&quot;color:#fff;...&quot;</span>
          <span className="text-gray-500">&gt;</span>
          <span className="text-green-300">SALE HÈ</span>
          <span className="text-gray-500">&lt;/h2&gt;</span>
        </div>
        <button className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs py-2.5 rounded-lg shadow">
          <Copy className="w-3.5 h-3.5" /> Sao chép HTML
        </button>
      </div>
    ),
  },
]

const CMS_BADGES = [
  { name: 'Haravan', color: 'text-orange-600 border-orange-200 bg-orange-50' },
  { name: 'Sapo', color: 'text-blue-600 border-blue-200 bg-blue-50' },
  { name: 'WordPress', color: 'text-indigo-600 border-indigo-200 bg-indigo-50' },
  { name: 'Shopify', color: 'text-green-700 border-green-200 bg-green-50' },
  { name: 'TinyMCE', color: 'text-violet-600 border-violet-200 bg-violet-50' },
  { name: 'CKEditor', color: 'text-rose-600 border-rose-200 bg-rose-50' },
  { name: 'Haravan', color: 'text-orange-600 border-orange-200 bg-orange-50' },
  { name: 'Sapo', color: 'text-blue-600 border-blue-200 bg-blue-50' },
  { name: 'WordPress', color: 'text-indigo-600 border-indigo-200 bg-indigo-50' },
  { name: 'Shopify', color: 'text-green-700 border-green-200 bg-green-50' },
  { name: 'TinyMCE', color: 'text-violet-600 border-violet-200 bg-violet-50' },
  { name: 'CKEditor', color: 'text-rose-600 border-rose-200 bg-rose-50' },
]

/* ── Page ───────────────────────────────────────────────────────── */

export default async function LandingPage() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo iconSize={32} uid="nav" />
          <nav className="flex items-center gap-2">
            <Link href="/kien-thuc" className="hidden md:block px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Kiến thức
            </Link>
            <Link href="/#pricing" className="hidden md:block px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Bảng giá
            </Link>
            {isLoggedIn ? (
              <Link href="/editor" className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold btn-gradient text-white rounded-lg whitespace-nowrap">
                <span className="sm:hidden">Soạn thảo →</span>
                <span className="hidden sm:inline">Vào trình soạn thảo →</span>
              </Link>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Đăng nhập
                </Link>
                <Link href="/login" className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold btn-gradient text-white rounded-lg shadow-sm whitespace-nowrap">
                  <span className="hidden sm:inline">Dùng thử </span>miễn phí
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: 'linear-gradient(135deg, #ddd6fe 0%, #faf5ff 45%, #e0e7ff 100%)' }}>
        {/* Blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] bg-indigo-500/40 animate-blob" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[440px] h-[440px] bg-violet-500/35 animate-blob-2" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-400/20 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-10">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full border border-indigo-200">
                <Sparkles className="w-3.5 h-3.5" />
                Công cụ AI cho người sáng tạo nội dung Việt Nam
              </div>

              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Tạo nội dung HTML đẹp<br className="hidden sm:block" />
                <span className="gradient-text"> trong 60 giây</span> với AI
              </h1>

              <p className="hero-subtitle text-lg sm:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 mb-10">
                Nhập mô tả bằng tiếng Việt, AI tự động tạo khối nội dung HTML chuẩn inline CSS —
                sẵn sàng dán vào Haravan, Sapo, WordPress hay bất kỳ CMS nào.
              </p>

              <div className="hero-cta flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/login" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold btn-gradient text-white rounded-xl animate-pulse-glow">
                  Bắt đầu miễn phí
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#how-it-works" className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-indigo-700 bg-white border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm">
                  Xem cách hoạt động
                </a>
              </div>

              {/* Stats */}
              <div className="hero-stats flex flex-wrap justify-center lg:justify-start gap-8 mt-10 pt-10 border-t border-indigo-100">
                {[
                  { value: '500+', label: 'người dùng', grad: 'from-indigo-600 to-violet-600' },
                  { value: '10.000+', label: 'khối HTML đã tạo', grad: 'from-violet-600 to-purple-600' },
                  { value: '< 1s', label: 'thời gian tạo', grad: 'from-blue-500 to-cyan-500' },
                ].map(({ value, label, grad }) => (
                  <div key={label} className="text-center lg:text-left">
                    <div className={`text-2xl font-extrabold bg-gradient-to-r ${grad} bg-clip-text text-transparent`}>{value}</div>
                    <div className="text-sm text-gray-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: mockup */}
            <div className="hero-mockup flex-1 w-full max-w-lg relative">
              <div className="hidden sm:flex absolute -top-5 -left-4 z-20 bg-white rounded-2xl shadow-xl px-4 py-2.5 items-center gap-2 text-sm font-medium text-gray-700 border border-indigo-100 animate-float">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                AI đang tạo nội dung...
              </div>
              <div className="hidden sm:block absolute -bottom-5 -right-4 z-20 bg-white rounded-2xl shadow-xl px-4 py-3 border border-violet-100 animate-float-slow">
                <div className="text-xs text-gray-400 mb-0.5">Hoàn thành trong</div>
                <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">0.8s</div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-2 ring-indigo-500/20">
                {/* Browser bar */}
                <div className="h-10 bg-gray-900 flex items-center px-4 gap-3">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 bg-gray-700/70 rounded text-gray-400 text-xs px-3 py-1 text-center truncate">
                    aicontentbooster.vn/editor
                  </div>
                </div>

                {/* Editor */}
                <div className="flex bg-gray-100" style={{ height: '340px' }}>
                  <div className="w-12 bg-gray-800 flex flex-col items-center py-4 gap-3 shrink-0">
                    {[
                      { icon: '⬜', active: true },
                      { icon: '🔤', active: false },
                      { icon: '📷', active: false },
                      { icon: '🎨', active: false },
                    ].map(({ icon, active }) => (
                      <div key={icon} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm cursor-pointer transition-colors ${active ? 'bg-indigo-500' : 'bg-gray-700 hover:bg-gray-600'}`}>
                        {icon}
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 p-3 overflow-hidden flex flex-col gap-2">
                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200 flex items-center gap-2 shrink-0">
                      <span className="text-xs text-gray-400 flex-1 truncate">Banner sale hè, màu xanh gradient...</span>
                      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs px-2.5 py-1 rounded flex items-center gap-1 shrink-0">
                        <Zap className="w-3 h-3" /> Tạo
                      </div>
                    </div>
                    <div className="relative bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-xl p-5 text-white flex-1 overflow-hidden">
                      <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-14 translate-x-14" />
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-10 -translate-x-10" />
                      <div className="relative">
                        <div className="text-xs text-indigo-200 mb-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Tạo bởi AI
                        </div>
                        <div className="text-2xl font-black tracking-tight mb-1">SALE HÈ 2026</div>
                        <div className="text-indigo-100 text-sm mb-4 leading-relaxed">
                          Giảm đến <span className="text-yellow-300 font-bold">50%</span> toàn bộ<br />
                          sản phẩm thời trang hot nhất!
                        </div>
                        <div className="bg-yellow-400 text-gray-900 font-bold text-sm px-5 py-2 rounded-lg inline-block shadow">
                          Mua ngay →
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-40 bg-white border-l border-gray-200 p-3 hidden xl:flex flex-col gap-2 shrink-0">
                    <div className="text-xs font-semibold text-gray-700 mb-1">Style Manager</div>
                    {[
                      { label: 'Màu nền', content: <div className="h-6 rounded bg-gradient-to-r from-indigo-600 to-violet-600 border border-gray-200" /> },
                      { label: 'Font size', content: <div className="h-6 bg-gray-100 rounded border border-gray-200 flex items-center px-2 text-xs text-gray-600">24px</div> },
                      { label: 'Border radius', content: <div className="h-6 bg-gray-100 rounded border border-gray-200 flex items-center px-2 text-xs text-gray-600">12px</div> },
                    ].map(({ label, content }) => (
                      <div key={label}>
                        <div className="text-xs text-gray-400 mb-1">{label}</div>
                        {content}
                      </div>
                    ))}
                    <div className="mt-auto pt-2 border-t border-gray-100">
                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs text-center py-2 rounded-lg flex items-center justify-center gap-1">
                        <Copy className="w-3 h-3" /> Sao chép HTML
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-7 bg-gray-900 flex items-center px-4 gap-2">
                  <span className="text-green-400 text-xs">●</span>
                  <span className="text-gray-400 text-xs">AI tạo xong · 0.8 giây · 320 ký tự HTML</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CMS Compatibility strip ─────────────────────────────────── */}
      <section className="py-10 overflow-hidden" style={{ background: 'linear-gradient(90deg, #e0e7ff 0%, #ede9fe 50%, #e0e7ff 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm font-semibold text-indigo-400 mb-6 tracking-widest uppercase">
            Tương thích hoàn hảo với
          </p>
          <div className="flex overflow-hidden">
            <div className="flex gap-6 animate-marquee whitespace-nowrap shrink-0">
              {CMS_BADGES.map(({ name, color }, i) => (
                <span key={i} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold shrink-0 ${color}`}>
                  <Globe className="w-4 h-4" /> {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #d1fae5 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Chỉ 3 bước đơn giản</h2>
            <p className="text-gray-500">Từ ý tưởng đến HTML hoàn chỉnh trong chưa đầy một phút</p>
          </ScrollReveal>

          <div className="flex flex-col gap-20">
            {STEPS.map(({ step, stepGrad, wrapGrad, title, desc, preview }, i) => (
              <div key={step} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10`}>
                <ScrollReveal className="flex-1" from={i % 2 === 0 ? 'left' : 'right'}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${stepGrad} text-white font-extrabold text-lg mb-5 shadow-lg`}>
                    {step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">{desc}</p>
                </ScrollReveal>
                <ScrollReveal className="flex-1 w-full" from={i % 2 === 0 ? 'right' : 'left'} delay={100}>
                  <div className={`rounded-2xl overflow-hidden shadow-xl p-1.5 bg-gradient-to-br ${wrapGrad} border border-white/60`}>
                    {preview}
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #faf5ff 50%, #e0e7ff 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Tính năng nổi bật</h2>
            <p className="text-gray-500">Được thiết kế đặc biệt cho thị trường Việt Nam</p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon, iconGrad, cardGrad, bar, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 60} className="h-full">
                <div className={`relative bg-gradient-to-br ${cardGrad} rounded-2xl p-6 border border-white/80 shadow-sm card-lift h-full overflow-hidden flex flex-col`}>
                  {/* coloured top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${bar}`} />
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${iconGrad} flex items-center justify-center mb-4 shadow-md mt-3 flex-shrink-0`}>
                    {icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo: Before → After ───────────────────────────────────── */}
      <section className="relative overflow-hidden py-24" style={{ background: 'linear-gradient(135deg, #312e81 0%, #4c1d95 55%, #1e1a4e 100%)' }}>
        {/* blobs */}
        <div className="pointer-events-none absolute -left-32 top-1/4 w-96 h-96 bg-indigo-400/40 blur-3xl rounded-full animate-blob" />
        <div className="pointer-events-none absolute -right-32 bottom-1/4 w-80 h-80 bg-violet-400/35 blur-3xl rounded-full animate-blob-2" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Xem kết quả thực tế</h2>
            <p className="text-gray-400">Từ một câu mô tả tiếng Việt đến khối HTML production-ready</p>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row items-stretch gap-6">
            {/* Input side */}
            <ScrollReveal className="flex-1" from="left">
              <div className="h-full bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30">
                    <MousePointer2 className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="font-semibold text-gray-200">Bạn nhập</span>
                </div>
                <div className="bg-white/10 rounded-xl border border-white/10 p-4 flex-1 text-sm text-gray-300 leading-relaxed">
                  Tạo banner quảng cáo mùa hè cho shop thời trang. Nền gradient xanh đậm sang tím. Tiêu đề &ldquo;SALE HÈ 2026&rdquo;, phụ đề &ldquo;Giảm đến 50%&rdquo;. Nút CTA màu vàng &ldquo;Mua ngay&rdquo;. Style hiện đại, chuyên nghiệp.
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Bấm tạo — AI xử lý trong &lt; 1 giây
                </div>
              </div>
            </ScrollReveal>

            {/* Arrow */}
            <div className="flex items-center justify-center md:flex-col gap-2 text-indigo-400 shrink-0">
              <div className="hidden md:flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-indigo-500/40" />
                <ArrowRight className="w-6 h-6 rotate-90" />
                <div className="text-xs text-indigo-400/70">0.8s</div>
                <div className="w-px h-8 bg-indigo-500/40" />
              </div>
              <ArrowRight className="w-6 h-6 md:hidden" />
            </div>

            {/* Output side */}
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
                      <div className="text-xs text-indigo-200 tracking-widest uppercase mb-2 font-medium">Bộ sưu tập hè 2026</div>
                      <h3 className="text-3xl font-black tracking-tight leading-none mb-1">SALE HÈ</h3>
                      <h3 className="text-3xl font-black tracking-tight text-yellow-300 mb-4">2026</h3>
                      <p className="text-indigo-100 text-sm mb-6">
                        Giảm đến <span className="text-yellow-300 font-bold text-lg">50%</span> toàn bộ<br />
                        sản phẩm thời trang hot nhất mùa hè!
                      </p>
                      <button className="bg-yellow-400 text-gray-900 font-bold px-6 py-2.5 rounded-xl text-sm shadow-lg">
                        Mua ngay →
                      </button>
                    </div>
                    <div className="relative mt-4 bg-white/10 rounded-lg px-3 py-2 text-xs text-indigo-200 font-mono truncate">
                      &lt;div style=&quot;background:linear-gradient(135deg,#4338ca...&quot;&gt;
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">HTML inline CSS · 0 JS · CMS-ready</span>
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                    <Copy className="w-3.5 h-3.5" /> Sao chép
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Testimonials carousel ──────────────────────────────────── */}
      <TestimonialsCarousel />

      {/* ── Pricing ────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24" style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #faf5ff 50%, #ede9fe 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Bảng giá</h2>
            <p className="text-gray-500">Bắt đầu miễn phí — nâng cấp khi bạn cần nhiều hơn</p>
          </ScrollReveal>

          {/* Toggle Monthly/Yearly — static display */}
          <ScrollReveal className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-xl px-4 py-2 text-sm text-gray-600 shadow-sm">
              <span className="font-medium text-indigo-700">Mua theo năm tiết kiệm ~20%</span>
              <span className="text-xs text-gray-400">· Thanh toán chuyển khoản ngân hàng</span>
            </div>
          </ScrollReveal>

          {/* Subscription plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-2 mb-16">
            {/* Free */}
            <ScrollReveal from="left" className="h-full">
              <div className="rounded-2xl border border-gray-200 bg-white p-7 card-lift h-full flex flex-col">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Miễn phí</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">0đ</span>
                  <span className="text-gray-400 mb-1 text-sm">/tháng</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-500">Không cần thẻ ngân hàng</p>
                <Link href="/login" className="mt-5 block text-center py-2.5 text-sm font-semibold text-indigo-600 border border-indigo-300 rounded-xl hover:bg-indigo-50 transition-colors">
                  Bắt đầu miễn phí
                </Link>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {[
                    '3 bài viết HTML/tháng',
                    '1 landing page/tháng',
                    'Chỉnh sửa trong editor',
                    '3 template mẫu',
                    'Không xuất được HTML',
                  ].map((f, i) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${i < 3 ? 'text-emerald-500' : 'text-gray-300'}`} /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Basic — featured */}
            <ScrollReveal delay={80} className="h-full">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-7 shadow-2xl relative card-lift text-white h-full flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-amber-400 text-gray-900 rounded-full shadow">
                    <Star className="w-3 h-3 fill-gray-900" /> Phổ biến nhất
                  </span>
                </div>
                <p className="text-sm font-semibold text-indigo-200 uppercase tracking-wide">Basic</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">99.000đ</span>
                  <span className="text-indigo-200 mb-1 text-sm">/tháng</span>
                </div>
                <p className="mt-1.5 text-sm text-indigo-300">hoặc 79.000đ/tháng khi mua năm</p>
                <Link href="/login" className="mt-5 block text-center py-2.5 text-sm font-bold bg-white text-indigo-700 rounded-xl hover:bg-indigo-50 transition-colors shadow-md">
                  Nâng cấp Basic
                </Link>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {[
                    '20 bài viết HTML/tháng',
                    '5 landing page/tháng',
                    'Sao chép & xuất HTML',
                    'Toàn bộ template mẫu',
                    'Lưu lịch sử 30 ngày',
                    'Hỗ trợ qua email',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-indigo-200 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Pro */}
            <ScrollReveal from="right" className="h-full">
              <div className="rounded-2xl border-2 border-indigo-200 bg-white p-7 card-lift h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-bl-full" />
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Pro</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">199.000đ</span>
                  <span className="text-gray-500 mb-1 text-sm">/tháng</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-500">hoặc 159.000đ/tháng khi mua năm</p>
                <Link href="/login" className="mt-5 block text-center py-2.5 text-sm font-semibold text-indigo-700 border-2 border-indigo-400 rounded-xl hover:bg-indigo-50 transition-colors">
                  Nâng cấp Pro
                </Link>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {[
                    'Không giới hạn bài viết HTML',
                    'Không giới hạn landing page',
                    'Toàn bộ tính năng Basic',
                    'Lưu lịch sử không giới hạn',
                    'Hỗ trợ Zalo ưu tiên trong 4h',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Credits section */}
          <ScrollReveal className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Hoặc nạp credits</h3>
            <p className="text-gray-500 text-sm">Không cần đăng ký tháng — dùng tới đâu tính tiền tới đó. Credits không hết hạn.</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { amount: '20.000đ', desc: '4 bài viết HTML', highlight: false },
              { amount: '50.000đ', desc: '10 bài viết + 2 landing page', highlight: false },
              { amount: '100.000đ', desc: '25 bài viết + 5 landing page', highlight: true, badge: 'Tiết kiệm nhất' },
              { amount: '200.000đ', desc: '60 bài viết + 12 landing page', highlight: false },
            ].map(({ amount, desc, highlight, badge }) => (
              <ScrollReveal key={amount} className="h-full">
                <div className={`rounded-2xl p-5 h-full flex flex-col gap-3 relative ${highlight ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-white border border-gray-200'}`}>
                  {badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-0.5 bg-amber-400 text-gray-900 rounded-full shadow whitespace-nowrap">
                      {badge}
                    </span>
                  )}
                  <p className={`text-2xl font-extrabold ${highlight ? 'text-white' : 'text-gray-900'}`}>{amount}</p>
                  <p className={`text-sm flex-1 ${highlight ? 'text-emerald-50' : 'text-gray-600'}`}>{desc}</p>
                  <Link href="/login" className={`block text-center py-2 text-xs font-semibold rounded-xl transition-colors ${highlight ? 'bg-white text-emerald-700 hover:bg-emerald-50' : 'text-indigo-600 border border-indigo-200 hover:bg-indigo-50'}`}>
                    Nạp ngay
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-8">
            <p className="text-sm text-gray-400">Chúng tôi rất fair — bạn xài tới đâu tính tiền tới đó. Không có phí ẩn.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Câu hỏi thường gặp</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {([
              { q: 'Tôi có cần biết code HTML/CSS không?', a: 'Không. Bạn chỉ cần nhập mô tả bằng tiếng Việt. AI sẽ tự tạo toàn bộ HTML và CSS cho bạn.', accent: 'border-l-indigo-400' },
              { q: 'HTML tạo ra có dùng được trên Haravan/Sapo không?', a: 'Có. CSS được nhúng trực tiếp vào từng thẻ HTML (inline style) nên hoạt động ổn định trên mọi CMS bao gồm Haravan, Sapo và WordPress.', accent: 'border-l-violet-400' },
              { q: 'Dữ liệu của tôi có được lưu trữ an toàn không?', a: 'Có. Toàn bộ dự án được lưu trên MongoDB Atlas với xác thực bảo mật. Chúng tôi không bao giờ chia sẻ dữ liệu của bạn.', accent: 'border-l-purple-400' },
              { q: 'Tôi có thể thay đổi gói sau khi đăng ký không?', a: 'Có. Bạn có thể nâng cấp hoặc hạ cấp gói bất kỳ lúc nào. Thay đổi có hiệu lực ngay từ chu kỳ thanh toán tiếp theo.', accent: 'border-l-blue-400' },
            ] as const).map(({ q, a, accent }, i) => (
              <ScrollReveal key={q} delay={i * 60}>
                <div className={`bg-white rounded-2xl p-6 border border-indigo-100 border-l-4 ${accent} card-lift shadow-sm`}>
                  <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24" style={{ background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 40%, #a21caf 75%, #db2777 100%)' }}>
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full animate-blob" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 bg-pink-400/20 rounded-full animate-blob-2" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/15 rounded-full blur-3xl" />
        <ScrollReveal>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold text-pink-200 bg-white/10 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Không cần thẻ tín dụng
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Sẵn sàng tạo nội dung đẹp hơn?
            </h2>
            <p className="text-purple-100 text-lg mb-10">
              Đăng ký miễn phí ngay hôm nay và tạo khối HTML đầu tiên trong 60 giây.
            </p>
            <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold bg-white text-indigo-700 rounded-xl hover:bg-purple-50 transition-colors shadow-xl">
              Bắt đầu miễn phí
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="py-10 bg-gray-950 text-gray-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo iconSize={28} uid="footer" className="brightness-110" />
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
