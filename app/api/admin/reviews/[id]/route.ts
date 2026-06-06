import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Review from '@/models/Review'

async function isAdmin(session: any) {
  if (!session?.user?.id) return false
  await dbConnect()
  const u = await User.findById(session.user.id, { isAdmin: 1 }).lean() as any
  return !!u?.isAdmin
}

// PATCH — approve or reject
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth()
  if (!(await isAdmin(session))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const { action } = await req.json() as { action: 'approve' | 'reject' }

  if (action === 'approve') {
    await Review.findByIdAndUpdate(id, { isApproved: true })
  } else {
    await Review.findByIdAndDelete(id)
  }

  return NextResponse.json({ success: true })
}
