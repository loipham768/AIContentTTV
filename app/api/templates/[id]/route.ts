import { NextRequest, NextResponse } from 'next/server'
import { getTemplateById } from '@/lib/templates-db'

export const runtime = 'nodejs'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const tpl = await getTemplateById(id)
  if (!tpl) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(tpl)
}
