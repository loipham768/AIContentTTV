import { NextRequest, NextResponse } from 'next/server'
import { getTemplatesByCategory } from '@/lib/templates-db'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const category = searchParams.get('category') ?? ''
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') ?? 8)))

  if (!category) {
    return NextResponse.json({ error: 'category required' }, { status: 400 })
  }

  const data = await getTemplatesByCategory(category, page, limit)
  return NextResponse.json(data)
}
