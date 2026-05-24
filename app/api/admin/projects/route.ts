import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Project from '@/models/Project'

export const runtime = 'nodejs'

async function isAdmin(userId: string): Promise<boolean> {
  const user = await User.findById(userId).lean() as any
  return !!(user?.isAdmin || user?.email === process.env.ADMIN_EMAIL)
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  if (!(await isAdmin(session.user.id))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const projects = await Project.find({}, { blockData: 0 }).sort({ createdAt: -1 }).lean()
  return NextResponse.json({
    projects: (projects as any[]).map(p => ({
      _id: p._id.toString(),
      userId: p.userId,
      name: p.name,
      prompt: p.prompt,
      createdAt: (p.createdAt as Date).toISOString(),
    })),
  })
}
