import { NextRequest, NextResponse } from 'next/server'
import { getTemplateById } from '@/lib/templates-db'

export const runtime = 'nodejs'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const tpl = await getTemplateById(id)
  if (!tpl) return new NextResponse('Not found', { status: 404 })
  return new NextResponse(tpl.html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
