import { NextRequest, NextResponse } from 'next/server'
import { getArticlesByCategory } from '@/lib/articles-db'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const category = searchParams.get('category') ?? ''
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const limit = Math.min(200, Math.max(1, Number(searchParams.get('limit') ?? 6)))

  if (!category) {
    return NextResponse.json({ error: 'category required' }, { status: 400 })
  }

  const data = await getArticlesByCategory(category, page, limit)
  return NextResponse.json(data)
}
