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

  const users = await User.find({}, { passwordHash: 0 }).sort({ createdAt: -1 }).lean()

  // Count projects per user in one aggregation
  const counts = await Project.aggregate([
    { $group: { _id: '$userId', count: { $sum: 1 } } },
  ])
  const countMap = Object.fromEntries(counts.map((c: any) => [c._id, c.count]))

  const result = users.map((u: any) => ({
    _id: u._id.toString(),
    email: u.email,
    isActive: u.isActive !== false,
    isAdmin: !!u.isAdmin,
    projectCount: countMap[u._id.toString()] ?? 0,
    createdAt: u.createdAt,
  }))

  return NextResponse.json({ users: result })
}
