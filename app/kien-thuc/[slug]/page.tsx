import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ARTICLES } from '@/lib/articles'
import Logo from '@/components/Logo'
import {
  ArrowLeft, Clock, Calendar, ArrowRight,
  Layers, BarChart2, Megaphone, Code2, FileText, Search,
  User, BookOpen, Sparkles,
} from 'lucide-react'

type CategoryKey = 'Landing Page' | 'So sánh' | 'Quảng cáo' | 'Kỹ thuật' | 'Content' | 'SEO'

const CAT: Record<CategoryKey, { text: string; bg: string; grad: string; heroGrad: string; icon: React.ReactNode }> = {
  'Landing Page': { text: 'text-indigo-700', bg: 'bg-indigo-100', grad: 'from-indigo-500 to-violet-600',  heroGrad: 'from-indigo-700 via-indigo-800 to-violet-900', icon: <Layers className="w-4 h-4" /> },
  'So sánh':     { text: 'text-violet-700', bg: 'bg-violet-100', grad: 'from-violet-500 to-purple-600',  heroGrad: 'from-violet-700 via-purple-800 to-fuchsia-900', icon: <BarChart2 className="w-4 h-4" /> },
  'Quảng cáo':   { text: 'text-rose-700',   bg: 'bg-rose-100',   grad: 'from-rose-500 to-pink-600',     heroGrad: 'from-rose-700 via-rose-800 to-pink-900',      icon: <Megaphone className="w-4 h-4" /> },
  'Kỹ thuật':    { text: 'text-emerald-700', bg: 'bg-emerald-100', grad: 'from-emerald-500 to-teal-600', heroGrad: 'from-emerald-700 via-teal-800 to-cyan-900',   icon: <Code2 className="w-4 h-4" /> },
  'Content':     { text: 'text-amber-700',   bg: 'bg-amber-100',   grad: 'from-amber-500 to-orange-500', heroGrad: 'from-amber-700 via-orange-800 to-red-900',    icon: <FileText className="w-4 h-4" /> },
  'SEO':         { text: 'text-blue-700',    bg: 'bg-blue-100',    grad: 'from-blue-500 to-indigo-600',  heroGrad: 'from-blue-700 via-blue-800 to-indigo-900',    icon: <Search className="w-4 h-4" /> },
}

function getCat(category: string) {
  return CAT[category as CategoryKey] ?? CAT['Content']
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = ARTICLES[slug]
  if (!article) return {}
  return {
    title: `${article.title} | AI Content Booster`,
    description: article.description,
    keywords: article.keywords.join(', '),
    alternates: { canonical: `https://aicontentbooster.vn/kien-thuc/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.author],
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = ARTICLES[slug]
  if (!article) notFound()

  const otherArticles = Object.values(ARTICLES).filter(a => a.slug !== slug).slice(0, 4)
  const c = getCat(article.category)

  return (
    <div className="min-h-screen" style={{ background: '#f4f6fb' }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-gray-200 shadow-sm" style={{ background: '#fff' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo iconSize={28} uid="art-nav" />
          <nav className="flex items-center gap-3">
            <Link href="/kien-thuc" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              <BookOpen className="w-4 h-4" /> Kiến thức
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-bold text-white rounded-lg btn-gradient shadow"
            >
              Dùng thử miễn phí
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero banner ── */}
      <section className={`relative overflow-hidden py-16 bg-gradient-to-br ${c.heroGrad}`}>
        {/* Decorative orbs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-15 blur-2xl" style={{ background: '#fff' }} />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-15 blur-2xl" style={{ background: '#fff' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <Link href="/kien-thuc" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Kiến thức AI Content
          </Link>

          {/* Category badge */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full text-white border border-white/30" style={{ background: 'rgba(255,255,255,0.15)' }}>
              {c.icon} {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight max-w-3xl">
            {article.title}
          </h1>
          <p className="text-white/80 text-base mb-8 max-w-2xl leading-relaxed">{article.description}</p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { icon: <Calendar className="w-3.5 h-3.5" />, label: new Date(article.publishedDate).toLocaleDateString('vi-VN') },
              { icon: <Clock className="w-3.5 h-3.5" />,    label: `${article.readTime} đọc` },
              { icon: <User className="w-3.5 h-3.5" />,     label: article.author },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-white/90 px-3 py-1.5 rounded-full border border-white/20" style={{ background: 'rgba(255,255,255,0.12)' }}>
                {m.icon} {m.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content layout ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_296px] gap-8">

          {/* ── Article ── */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10" style={{ background: '#fff' }}>
              <article
                className="prose prose-lg max-w-none
                  prose-headings:font-extrabold prose-headings:text-gray-900
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-100
                  prose-h3:text-xl prose-h3:mt-7 prose-h3:mb-3 prose-h3:text-gray-800
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base
                  prose-li:text-gray-700 prose-li:leading-relaxed
                  prose-a:text-indigo-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-indigo-400 prose-blockquote:bg-indigo-50 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-5
                  prose-code:bg-gray-100 prose-code:text-indigo-700 prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono
                  prose-pre:bg-gray-900 prose-pre:rounded-2xl prose-pre:shadow-lg
                  prose-ol:my-5 prose-ul:my-5
                  prose-img:rounded-2xl prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Author card */}
            <div className="rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4" style={{ background: '#fff' }}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 shadow-sm`}>
                AI
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">{article.author}</div>
                <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Chuyên gia AI Content Marketing · Viết nội dung tối ưu cho thị trường Việt Nam</div>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">

              {/* CTA card */}
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.grad} p-6 shadow-lg`}>
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20" style={{ background: 'radial-gradient(circle,#fff,transparent 70%)' }} />
                <div className="relative">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-white/70" />
                    <span className="text-xs font-bold text-white/70">AI Content Booster</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mb-2 leading-snug">
                    Áp dụng ngay những gì bạn học được
                  </h3>
                  <p className="text-xs text-white/80 mb-5 leading-relaxed">
                    Tạo landing page, bài viết, quảng cáo chuyên nghiệp bằng tiếng Việt — trong 60 giây.
                  </p>
                  <Link
                    href="/login"
                    className="block w-full text-center py-2.5 text-sm font-extrabold text-indigo-700 bg-white rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                  >
                    Dùng thử miễn phí →
                  </Link>
                </div>
              </div>

              {/* Related articles */}
              {otherArticles.length > 0 && (
                <div className="rounded-2xl border border-gray-200 shadow-sm p-5" style={{ background: '#fff' }}>
                  <h3 className="text-sm font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-500" /> Bài viết khác
                  </h3>
                  <div className="space-y-1">
                    {otherArticles.map(related => {
                      const rc = getCat(related.category)
                      return (
                        <Link
                          key={related.slug}
                          href={`/kien-thuc/${related.slug}`}
                          className="group flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${rc.grad} flex items-center justify-center text-white shadow-sm`}>
                            {rc.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-gray-800 group-hover:text-indigo-700 transition-colors line-clamp-2 leading-snug mb-1">
                              {related.title}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" /> {related.readTime}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

            </div>
          </aside>

        </div>

        {/* ── Mobile CTA ── */}
        <div className={`mt-8 lg:hidden relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.grad} p-7 text-center text-white shadow-xl`}>
          <h2 className="text-lg font-extrabold mb-2">Áp dụng ngay với AI Content Booster</h2>
          <p className="text-white/80 text-sm mb-5">Tạo landing page, content bán hàng và quảng cáo chuyên nghiệp — chỉ cần nhập mô tả bằng tiếng Việt.</p>
          <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-extrabold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-sm">
            Dùng thử miễn phí <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Mobile related articles ── */}
        {otherArticles.length > 0 && (
          <section className="mt-8 lg:hidden">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" /> Bài viết liên quan
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {otherArticles.map(related => {
                const rc = getCat(related.category)
                return (
                  <Link
                    key={related.slug}
                    href={`/kien-thuc/${related.slug}`}
                    className="group flex gap-3 p-4 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all"
                    style={{ background: '#fff' }}
                  >
                    <div className={`flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${rc.grad} flex items-center justify-center text-white shadow-sm`}>
                      {rc.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition-colors line-clamp-2 leading-snug mb-1">{related.title}</h3>
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {related.readTime}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

      </div>

      {/* ── Footer ── */}
      <footer className="py-10 text-center text-xs mt-6" style={{ background: '#0f0f11', color: '#6b7280' }}>
        <Logo iconSize={22} uid="art-footer" className="inline-flex mb-3 brightness-75" />
        <p className="mt-1">
          © 2026 AI Content Booster ·{' '}
          <Link href="/" className="hover:text-gray-300 transition-colors">Trang chủ</Link> ·{' '}
          <Link href="/kien-thuc" className="hover:text-gray-300 transition-colors">Kiến thức</Link>
        </p>
      </footer>
    </div>
  )
}
