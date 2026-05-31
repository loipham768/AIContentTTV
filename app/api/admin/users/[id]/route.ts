import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Project from '@/models/Project'

export const runtime = 'nodejs'

async function isAdmin(userId: string): Promise<boolean> {
  const user = await User.findById(userId).lean() as any
  return !!(user?.isAdmin || user?.email === process.env.ADMIN_EMAIL)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  if (!(await isAdmin(session.user.id))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  if (id === session.user.id) {
    return NextResponse.json({ error: 'Cannot modify your own account' }, { status: 400 })
  }

  const update: Record<string, unknown> = {}
  if (typeof body.isActive === 'boolean') update.isActive = body.isActive
  if (typeof body.isAdmin === 'boolean') update.isAdmin = body.isAdmin
  if ('paidUntil' in body) update.paidUntil = body.paidUntil ? new Date(body.paidUntil) : null

  if (!Object.keys(update).length) {
    return NextResponse.json({ error: 'No valid fields' }, { status: 400 })
  }

  const user = await User.findByIdAndUpdate(id, update, { new: true, projection: { passwordHash: 0 } }).lean() as any
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  return NextResponse.json({ user: { _id: user._id.toString(), email: user.email, isActive: user.isActive !== false, isAdmin: !!user.isAdmin } })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  if (id === session.user.id) return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })

  const deleted = await User.findByIdAndDelete(id)
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await Project.deleteMany({ userId: id })

  return NextResponse.json({ success: true })
}
