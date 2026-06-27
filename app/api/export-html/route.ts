import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { serverIsolateCss } from '@/lib/serverCssIsolation'

export const runtime = 'nodejs'

const exportSchema = z.object({
  html: z.string().max(500_000),
  css:  z.string().max(500_000),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = exportSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { html, css } = parsed.data

  try {
    const output = await serverIsolateCss(html, css)
    return NextResponse.json({ html: output })
  } catch (err) {
    console.error('[/api/export-html] isolation error:', err)
    return NextResponse.json({ error: 'Đã xảy ra lỗi khi xử lý HTML.' }, { status: 500 })
  }
}
