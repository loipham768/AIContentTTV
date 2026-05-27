import Link from 'next/link'
import {
  BookOpen, Clock, ArrowRight, TrendingUp,
  Search, Layers, Code2, Megaphone, FileText, BarChart2,
} from 'lucide-react'
import Logo from '@/components/Logo'

export const metadata = {
  title: 'Kiến thức AI Content | AI Content Booster',
  description: 'Hướng dẫn, mẹo và chiến lược tạo nội dung bằng AI cho thị trường Việt Nam. Landing page, content marketing, quảng cáo Facebook & Google.',
  alternates: { canonical: 'https://aicontentbooster.vn/kien-thuc' },
}

type CategoryKey = 'Landing Page' | 'So sánh' | 'Quảng cáo' | 'Kỹ thuật' | 'Content' | 'SEO'

const CAT: Record<CategoryKey, { color: string; bg: string; dot: string; icon: React.ReactNode; grad: string }> = {
  'Landing Page': { color: 'text-indigo-700', bg: 'bg-indigo-100', dot: 'bg-indigo-500', icon: <Layers className="w-3.5 h-3.5" />, grad: 'from-indigo-500 to-violet-600' },
  'So sánh':     { color: 'text-violet-700', bg: 'bg-violet-100', dot: 'bg-violet-500', icon: <BarChart2 className="w-3.5 h-3.5" />, grad: 'from-violet-500 to-purple-600' },
  'Quảng cáo':   { color: 'text-rose-700',   bg: 'bg-rose-100',   dot: 'bg-rose-500',   icon: <Megaphone className="w-3.5 h-3.5" />, grad: 'from-rose-500 to-pink-600' },
  'Kỹ thuật':    { color: 'text-emerald-700', bg: 'bg-emerald-100', dot: 'bg-emerald-500', icon: <Code2 className="w-3.5 h-3.5" />, grad: 'from-emerald-500 to-teal-600' },
  'Content':     { color: 'text-amber-700',   bg: 'bg-amber-100',   dot: 'bg-amber-500',   icon: <FileText className="w-3.5 h-3.5" />, grad: 'from-amber-500 to-orange-500' },
  'SEO':         { color: 'text-blue-700',    bg: 'bg-blue-100',    dot: 'bg-blue-500',    icon: <Search className="w-3.5 h-3.5" />, grad: 'from-blue-500 to-indigo-600' },
}

const ARTICLES = [
  {
    slug: 'cach-tao-landing-page-ban-hang-hieu-qua-2026',
    title: 'Cách tạo landing page bán hàng hiệu quả năm 2026',
    desc: 'Hướng dẫn từng bước xây dựng landing page bán hàng chuyên nghiệp, tối ưu chuyển đổi với AI. Áp dụng được ngay trên Haravan, Sapo và WordPress.',
    category: 'Landing Page' as CategoryKey,
    readTime: '8 phút',
    date: '20/05/2026',
    featured: true,
  },
  {
    slug: 'so-sanh-cong-cu-viet-content-ai-tot-nhat',
    title: 'So sánh 5 công cụ viết content AI tốt nhất cho người Việt 2026',
    desc: 'Đánh giá chi tiết ChatGPT, Claude, Gemini, Jasper và AI Content Booster. Công cụ nào phù hợp nhất cho thị trường Việt Nam?',
    category: 'So sánh' as CategoryKey,
    readTime: '12 phút',
    date: '18/05/2026',
    featured: true,
  },
  {
    slug: 'huong-dan-viet-content-quang-cao-facebook-bang-ai',
    title: 'Hướng dẫn viết content quảng cáo Facebook bằng AI — không cần copywriter',
    desc: 'Từ hook thu hút đến CTA thuyết phục. Cách dùng AI tạo content Facebook Ads hiệu quả, tiết kiệm thời gian và ngân sách.',
    category: 'Quảng cáo' as CategoryKey,
    readTime: '7 phút',
    date: '15/05/2026',
    featured: false,
  },
  {
    slug: 'html-inline-css-la-gi-tai-sao-quan-trong-voi-cms',
    title: 'HTML inline CSS là gì? Tại sao quan trọng với Haravan, Sapo, WordPress?',
    desc: 'Giải thích kỹ thuật inline CSS, lý do các CMS thương mại Việt Nam lọc bỏ <style> tags và cách AI Content Booster giải quyết vấn đề này tự động.',
    category: 'Kỹ thuật' as CategoryKey,
    readTime: '6 phút',
    date: '12/05/2026',
    featured: false,
  },
  {
    slug: 'cach-viet-mo-ta-san-pham-bang-ai-tang-ty-le-chuyen-doi',
    title: 'Cách viết mô tả sản phẩm bằng AI để tăng tỷ lệ chuyển đổi',
    desc: 'Công thức viết mô tả sản phẩm thuyết phục với AI. Tập trung vào lợi ích, không phải tính năng. Ứng dụng thực tế cho shop Haravan và Shopify.',
    category: 'Content' as CategoryKey,
    readTime: '9 phút',
    date: '10/05/2026',
    featured: false,
  },
  {
    slug: 'seo-content-ai-cach-toi-uu-bai-viet-len-top-google',
    title: 'SEO Content AI: Cách tối ưu bài viết lên Top Google năm 2026',
    desc: 'Chiến lược kết hợp AI và SEO để tạo nội dung xếp hạng cao trên Google. Keyword research, E-E-A-T, và cách viết cho cả người đọc lẫn máy tìm kiếm.',
    category: 'SEO' as CategoryKey,
    readTime: '11 phút',
    date: '08/05/2026',
    featured: false,
  },
]

function CategoryBadge({ category }: { category: CategoryKey }) {
  const c = CAT[category]
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full ${c.bg} ${c.color}`}>
      {c.icon} {category}
    </span>
  )
}

export default function KienThucPage() {
  const featured = ARTICLES.filter(a => a.featured)
  const rest     = ARTICLES.filter(a => !a.featured)

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo iconSize={30} uid="kb-nav" />
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/#pricing" className="text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">Bảng giá</Link>
            <Link href="/login" className="px-4 py-2 font-semibold btn-gradient text-white rounded-lg text-xs shadow-sm">
              Dùng thử miễn phí
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-100/40 rounded-full blur-2xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full border border-indigo-200 shadow-sm">
            <BookOpen className="w-3.5 h-3.5" /> Kiến thức AI Content
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            Hướng dẫn &amp; Chiến lược{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              tạo nội dung với AI
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Từ landing page đến quảng cáo Facebook — học cách dùng AI để tạo nội dung chuyên nghiệp,
            tối ưu chuyển đổi cho thị trường Việt Nam.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {(Object.keys(CAT) as CategoryKey[]).map(cat => {
              const c = CAT[cat]
              return (
                <span key={cat} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${c.bg} ${c.color} shadow-sm border border-white`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                  {cat}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-center gap-8 sm:gap-16 text-center">
            {[
              { value: '6', label: 'Bài viết' },
              { value: '5', label: 'Chủ đề' },
              { value: 'Hàng tuần', label: 'Cập nhật' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-lg font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-14">

        {/* Featured */}
        <section>
          <div className="flex items-center gap-2 mb-7">
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">Bài viết nổi bật</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((article, i) => {
              const c = CAT[article.category]
              return (
                <Link
                  key={article.slug}
                  href={`/kien-thuc/${article.slug}`}
                  className="group relative block rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Gradient top strip */}
                  <div className={`h-1.5 bg-gradient-to-r ${c.grad}`} />

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <CategoryBadge category={article.category} />
                      {i === 0 && (
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          ⭐ Phổ biến nhất
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">{article.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                        <span>{article.date}</span>
                      </div>
                      <span className={`flex items-center gap-1 text-xs font-bold ${c.color} group-hover:gap-2 transition-all`}>
                        Đọc tiếp <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* All articles */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-7 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500 inline-block" />
            Tất cả bài viết
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {rest.map(article => {
              const c = CAT[article.category]
              return (
                <Link
                  key={article.slug}
                  href={`/kien-thuc/${article.slug}`}
                  className="group flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Category icon block */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center text-white shadow-sm`}>
                    {c.icon && <span className="scale-110">{c.icon}</span>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <CategoryBadge category={article.category} />
                      <span className="flex items-center gap-0.5 text-xs text-gray-400">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-indigo-700 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-1">{article.desc}</p>
                  </div>

                  <ArrowRight className="flex-shrink-0 w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all self-center" />
                </Link>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 text-center text-white shadow-2xl">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-200 bg-white/10 px-3 py-1 rounded-full mb-4">
              ✨ Áp dụng ngay hôm nay
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Sẵn sàng tạo nội dung với AI?</h2>
            <p className="text-indigo-200 mb-7 max-w-lg mx-auto">
              Áp dụng những gì bạn vừa học — tạo landing page và content ngay trong 60 giây.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-sm"
            >
              Bắt đầu miễn phí <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-10 bg-gray-950 text-gray-500 text-center text-xs">
        <Logo iconSize={24} uid="kb-footer" className="inline-flex mb-3 brightness-75" />
        <p className="mt-1">© 2026 AI Content Booster · <Link href="/" className="hover:text-gray-300 transition-colors">Trang chủ</Link> · <Link href="/kien-thuc" className="hover:text-gray-300 transition-colors">Kiến thức</Link></p>
      </footer>
    </div>
  )
}
