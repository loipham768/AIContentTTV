import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ARTICLES } from '@/lib/articles'
import Logo from '@/components/Logo'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'

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

  const otherArticles = Object.values(ARTICLES)
    .filter(a => a.slug !== slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo iconSize={28} uid="art-nav" />
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/kien-thuc" className="text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">Kiến thức</Link>
            <Link href="/login" className="px-3 py-1.5 font-semibold btn-gradient text-white rounded-lg text-xs">
              Dùng thử miễn phí
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* Breadcrumb */}
        <Link href="/kien-thuc" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Kiến thức AI Content
        </Link>

        {/* Article header */}
        <header className="mb-8">
          <span className="inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-lg text-gray-500 mb-5 leading-relaxed">{article.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(article.publishedDate).toLocaleDateString('vi-VN')}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime} đọc</span>
            <span>Bởi {article.author}</span>
          </div>
        </header>

        <hr className="border-gray-100 mb-8" />

        {/* Article content */}
        <article
          className="prose prose-lg prose-indigo max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-li:text-gray-700
            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-indigo-400 prose-blockquote:bg-indigo-50 prose-blockquote:rounded-r-lg
            prose-code:bg-gray-100 prose-code:text-indigo-700 prose-code:rounded prose-code:px-1
            prose-pre:bg-gray-900 prose-pre:rounded-xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <hr className="border-gray-100 my-12" />

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 text-center text-white mb-12">
          <h2 className="text-xl font-bold mb-2">Áp dụng ngay với AI Content Booster</h2>
          <p className="text-indigo-200 text-sm mb-5">Tạo landing page, content bán hàng và quảng cáo chuyên nghiệp — chỉ cần nhập mô tả bằng tiếng Việt.</p>
          <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-sm">
            Dùng thử miễn phí <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related articles */}
        {otherArticles.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherArticles.map(related => (
                <Link key={related.slug} href={`/kien-thuc/${related.slug}`} className="group block p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition-all">
                  <span className="text-xs text-indigo-600 font-semibold mb-2 block">{related.category}</span>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors line-clamp-2 leading-snug mb-2">{related.title}</h3>
                  <span className="text-xs text-gray-400">{related.readTime}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      <footer className="py-8 bg-gray-950 text-gray-500 text-center text-xs">
        <p>© 2026 AI Content Booster · <Link href="/" className="hover:text-gray-300">Trang chủ</Link> · <Link href="/kien-thuc" className="hover:text-gray-300">Kiến thức</Link></p>
      </footer>
    </div>
  )
}
