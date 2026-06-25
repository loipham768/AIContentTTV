import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/auth'
import { checkOutputAllowed } from '@/lib/planGate'
import { serverIsolateCss } from '@/lib/serverCssIsolation'

export const runtime = 'nodejs'

const exportSchema = z.object({
  html: z.string().max(500_000),
  css:  z.string().max(500_000),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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

  const gate = await checkOutputAllowed(session.user.id)
  if (!gate.allowed) {
    return NextResponse.json(
      { error: gate.reason, code: gate.code, upgradeRequired: gate.upgradeRequired },
      { status: 403 }
    )
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
