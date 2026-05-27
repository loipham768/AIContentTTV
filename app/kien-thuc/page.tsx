import Link from 'next/link'
import { BookOpen, Clock, ArrowRight, TrendingUp } from 'lucide-react'
import Logo from '@/components/Logo'

export const metadata = {
  title: 'Kiến thức AI Content | AI Content Booster',
  description: 'Hướng dẫn, mẹo và chiến lược tạo nội dung bằng AI cho thị trường Việt Nam. Landing page, content marketing, quảng cáo Facebook & Google.',
  alternates: { canonical: 'https://aicontentbooster.vn/kien-thuc' },
}

const ARTICLES = [
  {
    slug: 'cach-tao-landing-page-ban-hang-hieu-qua-2026',
    title: 'Cách tạo landing page bán hàng hiệu quả năm 2026',
    desc: 'Hướng dẫn từng bước xây dựng landing page bán hàng chuyên nghiệp, tối ưu chuyển đổi với AI. Áp dụng được ngay trên Haravan, Sapo và WordPress.',
    category: 'Landing Page',
    categoryColor: 'bg-indigo-100 text-indigo-700',
    readTime: '8 phút',
    date: '2026-05-20',
    featured: true,
  },
  {
    slug: 'so-sanh-cong-cu-viet-content-ai-tot-nhat',
    title: 'So sánh 5 công cụ viết content AI tốt nhất cho người Việt 2026',
    desc: 'Đánh giá chi tiết ChatGPT, Claude, Gemini, Jasper và AI Content Booster. Công cụ nào phù hợp nhất cho thị trường Việt Nam?',
    category: 'So sánh',
    categoryColor: 'bg-violet-100 text-violet-700',
    readTime: '12 phút',
    date: '2026-05-18',
    featured: true,
  },
  {
    slug: 'huong-dan-viet-content-quang-cao-facebook-bang-ai',
    title: 'Hướng dẫn viết content quảng cáo Facebook bằng AI — không cần copywriter',
    desc: 'Từ hook thu hút đến CTA thuyết phục. Cách dùng AI tạo content Facebook Ads hiệu quả, tiết kiệm thời gian và ngân sách quảng cáo.',
    category: 'Quảng cáo',
    categoryColor: 'bg-rose-100 text-rose-700',
    readTime: '7 phút',
    date: '2026-05-15',
    featured: false,
  },
  {
    slug: 'html-inline-css-la-gi-tai-sao-quan-trong-voi-cms',
    title: 'HTML inline CSS là gì? Tại sao quan trọng với Haravan, Sapo, WordPress?',
    desc: 'Giải thích kỹ thuật inline CSS, lý do các CMS thương mại Việt Nam lọc bỏ <style> tags và cách AI Content Booster giải quyết vấn đề này tự động.',
    category: 'Kỹ thuật',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    readTime: '6 phút',
    date: '2026-05-12',
    featured: false,
  },
  {
    slug: 'cach-viet-mo-ta-san-pham-bang-ai-tang-ty-le-chuyen-doi',
    title: 'Cách viết mô tả sản phẩm bằng AI để tăng tỷ lệ chuyển đổi',
    desc: 'Công thức viết mô tả sản phẩm thuyết phục với AI. Tập trung vào lợi ích, không phải tính năng. Ứng dụng thực tế cho shop Haravan và Shopify.',
    category: 'Content',
    categoryColor: 'bg-amber-100 text-amber-700',
    readTime: '9 phút',
    date: '2026-05-10',
    featured: false,
  },
  {
    slug: 'seo-content-ai-cach-toi-uu-bai-viet-len-top-google',
    title: 'SEO Content AI: Cách tối ưu bài viết lên Top Google năm 2026',
    desc: 'Chiến lược kết hợp AI và SEO để tạo nội dung xếp hạng cao trên Google. Keyword research, E-E-A-T, và cách viết cho cả người đọc lẫn máy tìm kiếm.',
    category: 'SEO',
    categoryColor: 'bg-blue-100 text-blue-700',
    readTime: '11 phút',
    date: '2026-05-08',
    featured: false,
  },
]

export default function KienThucPage() {
  const featured = ARTICLES.filter(a => a.featured)
  const rest     = ARTICLES.filter(a => !a.featured)

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo iconSize={30} uid="kb-nav" />
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/#pricing" className="text-gray-500 hover:text-gray-900 transition-colors">Bảng giá</Link>
            <Link href="/login" className="px-4 py-2 font-semibold btn-gradient text-white rounded-lg text-xs">
              Dùng thử miễn phí
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #faf5ff 60%, #ede9fe 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full border border-indigo-200">
            <BookOpen className="w-3.5 h-3.5" /> Kiến thức AI Content
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Hướng dẫn & Chiến lược tạo nội dung với AI
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Từ landing page đến quảng cáo Facebook — học cách dùng AI để tạo nội dung chuyên nghiệp, tối ưu chuyển đổi cho thị trường Việt Nam.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Featured */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Bài viết nổi bật</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map(article => (
              <Link key={article.slug} href={`/kien-thuc/${article.slug}`} className="group block rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full mb-3 ${article.categoryColor}`}>
                  {article.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{article.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" /> {article.readTime}
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                    Đọc tiếp <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All articles */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-8">Tất cả bài viết</h2>
          <div className="space-y-4">
            {rest.map(article => (
              <Link key={article.slug} href={`/kien-thuc/${article.slug}`} className="group flex gap-5 p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-md hover:border-indigo-100 transition-all">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${article.categoryColor}`}>
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{article.desc}</p>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Sẵn sàng tạo nội dung với AI?</h2>
          <p className="text-indigo-200 mb-6">Áp dụng những gì bạn vừa học — tạo landing page và content ngay trong 60 giây.</p>
          <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
            Bắt đầu miễn phí <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 bg-gray-950 text-gray-500 text-center text-xs">
        <Logo iconSize={24} uid="kb-footer" className="inline-flex mb-3 brightness-75" />
        <p>© 2026 AI Content Booster · <Link href="/" className="hover:text-gray-300">Trang chủ</Link> · <Link href="/kien-thuc" className="hover:text-gray-300">Kiến thức</Link></p>
      </footer>
    </div>
  )
}
