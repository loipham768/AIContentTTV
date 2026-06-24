import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import ArticleModel from '@/models/Article'

export const runtime = 'nodejs'

async function isAdmin(userId: string) {
  const user = await User.findById(userId).lean() as any
  return !!(user?.isAdmin || user?.email === process.env.ADMIN_EMAIL)
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await dbConnect()
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = req.nextUrl
  const category = searchParams.get('category') ?? ''
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') ?? 20)))

  const filter = category ? { category } : {}
  const [docs, total] = await Promise.all([
    ArticleModel.find(filter, { content: 0, __v: 0 })
      .sort({ publishedDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    ArticleModel.countDocuments(filter),
  ])

  return NextResponse.json({ articles: docs, total, page, limit })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await dbConnect()
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const { slug, title, description, category, readTime, publishedDate, author, keywords, image, content } = body

  if (!slug || !title || !category || !content) {
    return NextResponse.json({ error: 'slug, title, category, content are required' }, { status: 400 })
  }

  const existing = await ArticleModel.findOne({ slug })
  if (existing) return NextResponse.json({ error: 'Slug đã tồn tại' }, { status: 409 })

  await ArticleModel.create({
    slug, title,
    description: description ?? '',
    category,
    readTime: readTime ?? '5 phút đọc',
    publishedDate: publishedDate ?? new Date().toISOString().slice(0, 10),
    author: author ?? 'TaoPage',
    keywords: Array.isArray(keywords) ? keywords : [],
    image: image ?? null,
    content,
  })

  return NextResponse.json({ ok: true, slug })
}
