import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import PublishedPage from '@/models/PublishedPage'

export const runtime = 'nodejs'

// DELETE — unpublish a page
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params

  await dbConnect()

  const page = await PublishedPage.findOneAndUpdate(
    { slug, userId: session.user.id },
    { $set: { isActive: false } },
    { new: true }
  )

  if (!page) {
    return NextResponse.json({ error: 'Không tìm thấy trang.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
