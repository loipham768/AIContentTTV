import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'

export const runtime = 'nodejs'

export async function PATCH(
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

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { blockData, name } = body as Record<string, unknown>

  const update: Record<string, unknown> = {}

  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'name must be a non-empty string' }, { status: 400 })
    }
    if (name.trim().length > 200) {
      return NextResponse.json({ error: 'name too long' }, { status: 400 })
    }
    update.name = name.trim()
  }

  if (blockData !== undefined) {
    if (!blockData || typeof blockData !== 'object') {
      return NextResponse.json({ error: 'blockData must be an object' }, { status: 400 })
    }
    if (JSON.stringify(blockData).length > 500_000) {
      return NextResponse.json({ error: 'blockData exceeds size limit' }, { status: 413 })
    }
    update.blockData = blockData
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
  }

  await dbConnect()

  const project = await Project.findOneAndUpdate(
    { _id: id, userId: session.user.id },
    { $set: update },
    { new: true }
  )

  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}

export async function GET(
  _req: NextRequest,
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

  const project = await Project.findOne({ _id: id, userId: session.user.id }).lean()
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ project })
}

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
