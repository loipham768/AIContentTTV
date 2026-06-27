import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import mongoose from 'mongoose'
import { dbConnect } from '@/lib/mongodb'
import { serverIsolateCss } from '@/lib/serverCssIsolation'
import { generateInteractiveScripts } from '@/lib/editor/interactiveScripts'
import Project from '@/models/Project'
import PublishedPage from '@/models/PublishedPage'

export const runtime = 'nodejs'

const publishSchema = z.object({
  projectId: z.string(),
  html: z.string().max(500_000),
  css: z.string().max(500_000),
  title: z.string().max(200).optional().default(''),
})

function removeVietnameseDiacritics(str: string): string {
  return str
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A')
    .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E')
    .replace(/[ÌÍỊỈĨ]/g, 'I')
    .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O')
    .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U')
    .replace(/[ỲÝỴỶỸ]/g, 'Y')
    .replace(/Đ/g, 'D')
}

async function generateUniqueSlug(base: string): Promise<string> {
  const baseSlug = removeVietnameseDiacritics(base)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
    .slice(0, 40) || 'trang'

  for (let i = 0; i < 5; i++) {
    const suffix = Math.random().toString(36).slice(2, 7)
    const slug = `${baseSlug}-${suffix}`
    const existing = await PublishedPage.findOne({ slug }, { _id: 1 }).lean()
    if (!existing) return slug
  }
  return `${baseSlug}-${Date.now().toString(36)}`
}

function siteOrigin(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-proto')
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? 'localhost:3000'
  const proto = forwarded ?? (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}

export async function POST(req: NextRequest) {
  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = publishSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 })
  }

  const { projectId, html, css, title } = parsed.data

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return NextResponse.json({ error: 'Project không tồn tại.' }, { status: 404 })
  }

  await dbConnect()

  const project = await Project.findById(projectId, { name: 1 }).lean()
  if (!project) {
    return NextResponse.json({ error: 'Project không tồn tại.' }, { status: 404 })
  }

  let cleanBody: string
  try {
    cleanBody = await serverIsolateCss(html, css)
  } catch {
    return NextResponse.json({ error: 'Lỗi khi xử lý HTML.' }, { status: 500 })
  }

  const scripts = generateInteractiveScripts(cleanBody)
  const pageTitle = title.trim() || (project as any).name || 'Trang của tôi'
  const htmlSnapshot = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</title>
  <style>*,*::before,*::after{box-sizing:border-box;}body{margin:0;padding:0;}</style>
</head>
<body>
${cleanBody}${scripts ? '\n' + scripts : ''}
</body>
</html>`

  const existing = await PublishedPage.findOne({ projectId })

  let slug: string
  if (existing) {
    existing.htmlSnapshot = htmlSnapshot
    existing.title = pageTitle
    existing.isActive = true
    existing.publishedAt = new Date()
    await existing.save()
    slug = existing.slug
  } else {
    slug = await generateUniqueSlug((project as any).name || 'trang')
    await PublishedPage.create({
      slug,
      projectId,
      htmlSnapshot,
      title: pageTitle,
      isActive: true,
      publishedAt: new Date(),
    })
  }

  const url = `${siteOrigin(req)}/view/${slug}`
  return NextResponse.json({ slug, url, publishedAt: new Date().toISOString() })
}

export async function GET(req: NextRequest) {
  await dbConnect()

  const projectId = req.nextUrl.searchParams.get('projectId')

  if (projectId) {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return NextResponse.json({ published: false })
    }

    const page = await PublishedPage.findOne(
      { projectId, isActive: true },
      { slug: 1, publishedAt: 1 }
    ).lean()

    if (!page) return NextResponse.json({ published: false })

    return NextResponse.json({
      published: true,
      slug: (page as any).slug,
      url: `${siteOrigin(req)}/view/${(page as any).slug}`,
      publishedAt: (page as any).publishedAt,
    })
  }

  const pages = await PublishedPage.find(
    { isActive: true },
    { slug: 1, title: 1, projectId: 1, publishedAt: 1 }
  ).sort({ publishedAt: -1 }).lean()

  const origin = siteOrigin(req)
  return NextResponse.json({
    pages: pages.map((p: any) => ({
      slug: p.slug,
      title: p.title || p.slug,
      projectId: p.projectId,
      url: `${origin}/view/${p.slug}`,
      publishedAt: p.publishedAt,
    }))
  })
}
