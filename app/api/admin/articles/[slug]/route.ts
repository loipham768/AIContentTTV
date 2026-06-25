import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import ArticleModel from '@/models/Article'

export const runtime = 'nodejs'

async function isAdmin(userId: string) {
  const user = await User.findById(userId).lean() as any
  return !!(user?.isAdmin || user?.email === process.env.ADMIN_EMAIL)
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await dbConnect()
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { slug } = await params
  const doc = await ArticleModel.findOne({ slug }, { __v: 0, _id: 0 }).lean()
  if (!doc) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(doc)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await dbConnect()
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { slug } = await params
  const body = await req.json()

  const allowed = ['title', 'description', 'category', 'readTime', 'publishedDate', 'author', 'keywords', 'image', 'content']
  const update: Record<string, unknown> = {}
  for (const k of allowed) {
    if (k in body) update[k] = body[k]
  }

  const result = await ArticleModel.updateOne({ slug }, { $set: update })
  if (result.matchedCount === 0) return NextResponse.json({ error: 'not found' }, { status: 404 })
  revalidateTag('home-articles')
  return NextResponse.json({ ok: true })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await dbConnect()
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { slug } = await params
  const result = await ArticleModel.deleteOne({ slug })
  if (result.deletedCount === 0) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
