import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import TemplateModel from '@/models/Template'

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
    TemplateModel.find(filter, { html: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    TemplateModel.countDocuments(filter),
  ])

  return NextResponse.json({ templates: docs, total, page, limit })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await dbConnect()
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const { id, name, category, description, tags, gradient, accentColor, html } = body

  if (!id || !name || !category || !html) {
    return NextResponse.json({ error: 'id, name, category, html are required' }, { status: 400 })
  }

  const maxOrder = await TemplateModel.findOne({}, { order: 1 }).sort({ order: -1 }).lean() as any
  const order = (maxOrder?.order ?? -1) + 1

  const doc = await TemplateModel.create({
    id, name, category,
    description: description ?? '',
    tags: Array.isArray(tags) ? tags : [],
    gradient: gradient ?? 'from-indigo-500 to-violet-600',
    accentColor: accentColor ?? '#6366f1',
    html,
    order,
  })

  return NextResponse.json({ ok: true, id: doc.id })
}
