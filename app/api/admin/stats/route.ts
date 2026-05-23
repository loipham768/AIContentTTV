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

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [totalUsers, totalProjects, activeUserIds] = await Promise.all([
    User.countDocuments(),
    Project.countDocuments(),
    Project.distinct('userId', { createdAt: { $gte: thirtyDaysAgo } }),
  ])

  return NextResponse.json({
    totalUsers,
    totalProjects,
    activeUsers: activeUserIds.length,
  })
}
