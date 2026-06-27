import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import fs from 'fs'

export const runtime = 'nodejs'
export const maxDuration = 60

const schema = z.object({
  html: z.string().max(500_000),
  css: z.string().max(500_000),
  format: z.enum(['A4', 'Letter']).default('A4'),
  landscape: z.boolean().default(false),
})

const PAPER_DIMS: Record<string, { w: number; h: number }> = {
  A4:     { w: 794,  h: 1123 },
  Letter: { w: 816,  h: 1056 },
}

const WIN_CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
]

async function launchBrowser() {
  const puppeteer = (await import('puppeteer-core')).default

  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    const chromium = (await import('@sparticuz/chromium-min')).default
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(
        process.env.CHROMIUM_URL ??
          'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'
      ),
      headless: true,
      defaultViewport: null,
    })
  }

  const execPath =
    process.env.PUPPETEER_EXECUTABLE_PATH ??
    WIN_CHROME_PATHS.find((p) => {
      try { fs.accessSync(p); return true } catch { return false }
    }) ??
    WIN_CHROME_PATHS[0]

  return puppeteer.launch({
    executablePath: execPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: null,
  })
}

const PDF_BASE_CSS = `
*, *::before, *::after {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
h1, h2, h3, h4, h5, h6 {
  break-after: avoid;
  page-break-after: avoid;
  orphans: 4;
  widows: 4;
}
img, figure, svg, video, table, tr, pre, blockquote {
  break-inside: avoid;
  page-break-inside: avoid;
}
p, li { orphans: 3; widows: 3; }
`

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { html, css, format, landscape } = parsed.data
  const dims = PAPER_DIMS[format] ?? PAPER_DIMS['A4']
  const pageW = landscape ? dims.h : dims.w
  const pageH = landscape ? dims.w : dims.h

  const fullHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=${pageW}, initial-scale=1.0">
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; padding: 0; width: ${pageW}px; }
    ${css}
  </style>
  <style>${PDF_BASE_CSS}</style>
</head>
<body>
${html}
</body>
</html>`

  let browser
  try {
    browser = await launchBrowser()
    const page = await browser.newPage()

    await page.setViewport({ width: pageW, height: pageH })
    await page.setContent(fullHtml, { waitUntil: 'load', timeout: 30_000 })
    await page.evaluate(() => document.fonts.ready)

    await page.evaluate((PAGE_H: number) => {
      const blocks = Array.from(document.body.children) as HTMLElement[]
      const positions = blocks.map((el) => {
        const rect = el.getBoundingClientRect()
        const top = rect.top + window.pageYOffset
        return { el, top, bottom: top + rect.height, height: rect.height }
      })
      for (let i = 0; i < positions.length; i++) {
        const pos = positions[i]
        const startPage = Math.floor(pos.top / PAGE_H)
        const endPage = Math.floor((pos.bottom - 1) / PAGE_H)
        if (startPage < endPage && pos.height < PAGE_H) {
          const nextPageStart = (startPage + 1) * PAGE_H
          const push = nextPageStart - pos.top
          const existingMargin = parseFloat(window.getComputedStyle(pos.el).marginTop) || 0
          pos.el.style.marginTop = (existingMargin + push) + 'px'
          for (let j = i + 1; j < positions.length; j++) {
            positions[j].top += push
            positions[j].bottom += push
          }
        }
      }
    }, pageH)

    const pdfBytes = await page.pdf({
      format,
      landscape,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="export.pdf"',
      },
    })
  } catch (err) {
    console.error('[/api/export-pdf]', err)
    return NextResponse.json({ error: 'Đã xảy ra lỗi khi tạo PDF.' }, { status: 500 })
  } finally {
    await browser?.close()
  }
}
