import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Project from '@/models/Project'

export const runtime = 'nodejs'

function classNames(classes: unknown[]): string {
  if (!Array.isArray(classes)) return ''
  return classes
    .map(c => (typeof c === 'string' ? c : (c as any)?.name ?? ''))
    .filter(Boolean)
    .join(' ')
}

function componentToHtml(comp: unknown): string {
  // Handle JSON string (GrapesJS sometimes serializes as string)
  if (typeof comp === 'string') {
    try { comp = JSON.parse(comp) } catch { return comp as string }
  }
  if (!comp || typeof comp !== 'object') return ''
  const c = comp as Record<string, unknown>

  if (c.type === 'textnode') return String(c.content ?? '')

  const tag = typeof c.tagName === 'string' ? c.tagName : null
  const isWrapper = c.type === 'wrapper' || (!tag && c.type !== 'textnode')

  const cls = classNames((c.classes as unknown[]) ?? [])
  const inlineStyle = c.style
    ? Object.entries(c.style as Record<string, string>)
        .map(([k, v]) => `${k}:${v}`)
        .join(';')
    : ''

  const attrs: string[] = []
  if (cls) attrs.push(`class="${cls}"`)
  if (inlineStyle) attrs.push(`style="${inlineStyle}"`)
  if (c.attributes && typeof c.attributes === 'object') {
    Object.entries(c.attributes as Record<string, string>).forEach(([k, v]) => {
      if (k === 'class' || k === 'style') return
      attrs.push(`${k}="${String(v).replace(/"/g, '&quot;')}"`)
    })
  }

  const childrenHtml = Array.isArray(c.components)
    ? (c.components as unknown[]).map(componentToHtml).join('')
    : ''
  const textContent = typeof c.content === 'string' ? c.content : ''

  if (isWrapper) return childrenHtml || textContent

  const attrStr = attrs.length ? ' ' + attrs.join(' ') : ''
  const selfClosing = new Set(['img', 'br', 'hr', 'input', 'link', 'meta', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr'])
  if (selfClosing.has(tag!)) return `<${tag}${attrStr}>`

  return `<${tag}${attrStr}>${textContent}${childrenHtml}</${tag}>`
}

function stylesToCss(styles: unknown[]): string {
  if (!Array.isArray(styles)) return ''
  return styles
    .map(rule => {
      const r = rule as Record<string, unknown>
      const selectors = ((r.selectors as unknown[]) ?? []).map(s =>
        typeof s === 'string' ? s : `.${(s as any)?.name ?? ''}`
      ).filter(Boolean)
      if (!selectors.length || !r.style) return ''
      const decls = Object.entries(r.style as Record<string, string>)
        .map(([k, v]) => `  ${k}: ${v};`)
        .join('\n')
      return `${selectors.join(', ')} {\n${decls}\n}`
    })
    .filter(Boolean)
    .join('\n\n')
}

function extractComponent(blockData: Record<string, unknown>): unknown {
  const pages = (blockData?.pages as any[]) ?? []
  if (!pages.length) return null
  const page = pages[0]

  // Format A: pages[0].frames[0].component  (MOCK_BLOCK / AI / GrapesJS)
  if (page?.frames?.[0]?.component != null) return page.frames[0].component

  // Format B: pages[0].component  (some GrapesJS versions)
  if (page?.component != null) return page.component

  // Format C: blockData.component  (rare)
  if (blockData?.component != null) return blockData.component

  return null
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) return new NextResponse('Unauthorized', { status: 401 })

  await dbConnect()
  const me = await User.findById(session.user.id).lean() as any
  if (!(me?.isAdmin || me?.email === process.env.ADMIN_EMAIL)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const { id } = await params
  const project = await Project.findById(id).lean() as any
  if (!project) return new NextResponse('Not found', { status: 404 })

  const blockData = project.blockData as Record<string, unknown>

  // ── Format A: raw HTML from Claude chat { type: 'html', html: '...' } ──
  if (blockData?.type === 'html' && typeof blockData.html === 'string') {
    return new NextResponse(blockData.html as string, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'SAMEORIGIN',
      },
    })
  }

  // ── Format B: GrapesJS project JSON ──
  let bodyHtml = ''
  let css = ''

  try {
    const rootComp = extractComponent(blockData)
    if (rootComp) bodyHtml = componentToHtml(rootComp)
    css = stylesToCss((blockData?.styles as unknown[]) ?? [])
  } catch { /* ignore */ }

  if (!bodyHtml.trim()) {
    bodyHtml = '<p style="padding:2rem;color:#888;text-align:center;font-family:system-ui">Không thể hiển thị nội dung này.</p>'
  }

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${String(project.name ?? 'Preview')}</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
${css}
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Frame-Options': 'SAMEORIGIN',
    },
  })
}
