import { dbConnect } from './mongodb'
export { ARTICLES_PAGE_SIZE } from './constants'
import ArticleModel from '@/models/Article'

export interface Article {
  slug: string
  title: string
  description: string
  category: string
  readTime: string
  publishedDate: string
  author: string
  keywords: string[]
  content: string
  image?: string
}

// List views get everything except the heavy HTML content field
export type ArticleMeta = Omit<Article, 'content'>

function toMeta(doc: Record<string, unknown>): ArticleMeta {
  return {
    slug:          doc.slug as string,
    title:         doc.title as string,
    description:   doc.description as string,
    category:      doc.category as string,
    readTime:      doc.readTime as string,
    publishedDate: doc.publishedDate as string,
    author:        doc.author as string,
    keywords:      (doc.keywords as string[]) ?? [],
    image:         (doc.image as string) ?? undefined,
  }
}

export async function getArticlesMeta(): Promise<ArticleMeta[]> {
  await dbConnect()
  const docs = await ArticleModel
    .find({}, { content: 0, __v: 0, _id: 0 })
    .sort({ publishedDate: -1 })
    .lean()
  return (docs as Record<string, unknown>[]).map(toMeta)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  await dbConnect()
  const doc = await ArticleModel.findOne({ slug }, { __v: 0, _id: 0 }).lean() as Record<string, unknown> | null
  if (!doc) return null
  return { ...toMeta(doc), content: doc.content as string }
}

export async function getAllSlugs(): Promise<string[]> {
  await dbConnect()
  const docs = await ArticleModel.find({}, { slug: 1, _id: 0 }).lean() as { slug: string }[]
  return docs.map((d) => d.slug)
}

export async function insertArticle(article: Article): Promise<void> {
  await dbConnect()
  await ArticleModel.updateOne({ slug: article.slug }, article, { upsert: true })
}

const META_PROJ = { content: 0, __v: 0, _id: 0 }

export async function getArticlesByCategory(
  category: string,
  page: number,
  limit: number,
): Promise<{ articles: ArticleMeta[]; total: number }> {
  await dbConnect()
  const [docs, total] = await Promise.all([
    ArticleModel.find({ category }, META_PROJ)
      .sort({ publishedDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    ArticleModel.countDocuments({ category }),
  ])
  return { articles: (docs as Record<string, unknown>[]).map(toMeta), total }
}

export async function getInitialGroups(
  categories: string[],
  pageSize: number,
): Promise<Record<string, { articles: ArticleMeta[]; total: number }>> {
  await dbConnect()
  const entries = await Promise.all(
    categories.map(async (cat) => {
      const [docs, total] = await Promise.all([
        ArticleModel.find({ category: cat }, META_PROJ)
          .sort({ publishedDate: -1 })
          .limit(pageSize)
          .lean(),
        ArticleModel.countDocuments({ category: cat }),
      ])
      return [cat, { articles: (docs as Record<string, unknown>[]).map(toMeta), total }] as const
    }),
  )
  return Object.fromEntries(entries)
}
