import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import PublishedPage from '@/models/PublishedPage'

export const runtime = 'nodejs'

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  await dbConnect()

  const page = await PublishedPage.findOneAndUpdate(
    { slug },
    { $set: { isActive: false } },
    { new: true }
  )

  if (!page) {
    return NextResponse.json({ error: 'Không tìm thấy trang.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
