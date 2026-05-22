import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'

export const runtime = 'nodejs'

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await dbConnect()

  const deleted = await Project.findOneAndDelete({
    _id: id,
    userId: session.user.id,
  })

  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
