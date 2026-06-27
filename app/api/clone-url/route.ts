import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'
import { preprocessTemplateForEditor } from '@/lib/serverCssIsolation'

export const runtime = 'nodejs'

const cloneSchema = z.object({
  url: z.string().url().max(2000),
})

const CLONE_SYSTEM_PROMPT = `Bạn là chuyên gia tái tạo giao diện web. Nhiệm vụ: phân tích HTML gốc của một trang web và tạo lại một trang HTML hoàn chỉnh với thiết kế tương tự.

QUY TẮC BẮT BUỘC:
1. Tạo file HTML hoàn chỉnh từ <!DOCTYPE html> đến </html>
2. CSS viết trong thẻ <style> trong <head>; có thể dùng Google Fonts qua @import
3. TUYỆT ĐỐI KHÔNG dùng <script> hay JavaScript
4. TUYỆT ĐỐI KHÔNG dùng CSS custom properties (var(--x), :root) — viết giá trị literal trực tiếp
5. KHÔNG dùng shorthand background khi chỉ cần background-color
6. Responsive với flexbox/grid; media query @media (max-width: 768px): layout 1 cột, font nhỏ lại
7. Font size dùng clamp(); padding/margin dùng clamp() hoặc %
8. Giữ nguyên bố cục, màu sắc, typography của trang gốc càng sát càng tốt
9. Giữ nguyên nội dung text thực từ trang gốc — KHÔNG dùng lorem ipsum
10. Thêm <!-- TODO: thay ảnh thực --> cho các vị trí ảnh
11. Chỉ trả về HTML thuần, KHÔNG markdown code fence, KHÔNG giải thích`

function isSafeUrl(url: string): boolean {
  try {
    const u = new URL(url)
    if (!['http:', 'https:'].includes(u.protocol)) return false
    const hostname = u.hostname.toLowerCase()
    if (['localhost', '127.0.0.1', '::1', '0.0.0.0'].includes(hostname)) return false
    if (hostname.endsWith('.local') || hostname.endsWith('.internal')) return false
    const ipv4 = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
    if (ipv4) {
      const [, a, b] = ipv4.map(Number)
      if (a === 10) return false
      if (a === 172 && b >= 16 && b <= 31) return false
      if (a === 192 && b === 168) return false
    }
    return true
  } catch {
    return false
  }
}

async function fetchPageHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
    },
    signal: AbortSignal.timeout(30_000),
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const contentType = res.headers.get('content-type') ?? ''
  if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
    throw new Error('URL không phải trang HTML')
  }
  return res.text()
}

function cleanHtml(html: string): string {
  let out = html
  out = out.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  out = out.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '')
  out = out.replace(/<link\b[^>]*>/gi, '')
  out = out.replace(/<meta\b[^>]*>/gi, '')
  out = out.replace(/<!--[\s\S]*?-->/g, '')
  out = out.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '')
  out = out.replace(/\n{3,}/g, '\n')
  out = out.replace(/[ \t]{2,}/g, ' ')
  if (out.length > 15000) {
    out = out.slice(0, 15000) + '\n<!-- ... truncated ... -->'
  }
  return out.trim()
}

async function callGeminiForHtml(pageUrl: string, pageHtml: string): Promise<string> {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  if (!apiKey) throw new Error('GOOGLE_AI_API_KEY is not configured')

  const userContent = `URL gốc: ${pageUrl}\n\nHTML của trang:\n\`\`\`html\n${pageHtml}\n\`\`\`\n\nHãy tạo lại trang này dưới dạng HTML hoàn chỉnh, standalone. Chỉ trả về HTML thuần, không markdown, không giải thích.`

  const models = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.0-flash']
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: CLONE_SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: userContent }] }],
    generationConfig: { temperature: 0.4, maxOutputTokens: 16384 },
  })

  let lastErr = ''
  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-goog-api-key': apiKey },
      body,
    })
    if (!res.ok) {
      lastErr = await res.text()
      if (![404, 429, 500, 503].includes(res.status)) break
      console.warn(`[clone-url] ${model} returned ${res.status}, trying next...`)
      continue
    }
    const data = await res.json()
    const rawText: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    if (!rawText) throw new Error('Gemini returned empty response')

    let html = rawText
    const fenceMatch = html.match(/```(?:html)?\s*([\s\S]*)```/i)
    if (fenceMatch) {
      html = fenceMatch[1].trim()
    } else {
      const doctypeIdx = html.search(/<!DOCTYPE\s+html/i)
      const htmlTagIdx = html.search(/<html[\s>]/i)
      const startIdx = doctypeIdx !== -1 ? doctypeIdx : htmlTagIdx
      if (startIdx > 0) html = html.slice(startIdx)
      html = html.replace(/```\s*$/, '').trim()
    }

    if (!html || (!html.includes('<html') && !html.includes('<!DOCTYPE'))) {
      throw new Error('Gemini did not return valid HTML')
    }

    const bodyTagIdx = html.search(/<body[^>]*>/i)
    if (bodyTagIdx === -1) {
      lastErr = 'HTML missing body tag'
      continue
    }
    const bodyOpenTag = html.match(/<body[^>]*>/i)![0]
    const afterBody = html.slice(bodyTagIdx + bodyOpenTag.length).replace(/<\/body>[\s\S]*$/i, '').trim()
    if (afterBody.length < 50) {
      lastErr = 'HTML body content too short'
      continue
    }

    return html
  }

  throw new Error(`Gemini API error: ${lastErr}`)
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = cloneSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'URL không hợp lệ' }, { status: 400 })
  }
  const { url } = parsed.data

  if (!isSafeUrl(url)) {
    return NextResponse.json({ error: 'URL không được phép' }, { status: 400 })
  }

  let rawHtml: string
  try {
    rawHtml = await fetchPageHtml(url)
  } catch (fetchErr) {
    const errName = fetchErr instanceof Error ? (fetchErr as any).name ?? '' : ''
    const errCode = (fetchErr as any)?.cause?.code ?? ''
    let msg = 'Lỗi không xác định'
    if (errName === 'TimeoutError' || errName === 'AbortError' || errCode === 'UND_ERR_CONNECT_TIMEOUT') {
      msg = 'Kết nối tới URL quá chậm hoặc bị từ chối (timeout). Trang có thể dùng Cloudflare hoặc chặn bot.'
    } else if (fetchErr instanceof Error) {
      msg = fetchErr.message
    }
    return NextResponse.json({ error: `Không thể tải trang: ${msg}` }, { status: 400 })
  }

  const cleanedHtml = cleanHtml(rawHtml)

  try {
    const rawHtmlFromAi = await callGeminiForHtml(url, cleanedHtml)
    const html = await preprocessTemplateForEditor(rawHtmlFromAi)

    let projectId: string | null = null
    try {
      await dbConnect()
      const hostname = new URL(url).hostname
      const project = await Project.create({
        name: `Clone: ${hostname}`.slice(0, 50),
        prompt: `Clone từ URL: ${url}`.slice(0, 500),
        blockData: { type: 'html', html },
      })
      projectId = project._id.toString()
    } catch (saveErr) {
      console.error('[/api/clone-url] save failed:', saveErr)
    }

    return NextResponse.json({ type: 'html', projectId })
  } catch (err) {
    console.error('[/api/clone-url] Gemini error:', err)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tạo nội dung. Vui lòng thử lại.' },
      { status: 500 }
    )
  }
}
