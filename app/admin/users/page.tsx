import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Project from '@/models/Project'
import { Suspense } from 'react'
import AdminDashboard, { type UserRow } from '@/components/admin/AdminDashboard'
import { ADMIN_PAGE_SIZE as PAGE_SIZE } from '@/lib/adminConfig'
import type { Metadata } from 'next'

export const metadata: Metadata = { robots: { index: false, follow: false } }
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function p(v: unknown): number {
  const n = parseInt(String(v ?? '1'))
  return isNaN(n) || n < 1 ? 1 : n
}

async function getData(userId: string, sp: Record<string, string>) {
  await dbConnect()
  const me = await User.findById(userId).lean() as any
  if (!(me?.isAdmin || me?.email === process.env.ADMIN_EMAIL)) return null

  const uq = (sp.uq ?? '').trim()
  const up = p(sp.up)

  const userFilter = uq
    ? { $or: [
        { email:    { $regex: escapeRegex(uq), $options: 'i' } },
        { fullName: { $regex: escapeRegex(uq), $options: 'i' } },
        { plan:     { $regex: escapeRegex(uq), $options: 'i' } },
      ] }
    : {}

  const [usersTotal, usersRaw] = await Promise.all([
    User.countDocuments(userFilter),
    User.find(userFilter, { passwordHash: 0 }).sort({ createdAt: -1 }).skip((up - 1) * PAGE_SIZE).limit(PAGE_SIZE).lean(),
  ])

  const userIds = (usersRaw as any[]).map((u: any) => u._id.toString())
  const projectCounts = userIds.length
    ? await Project.aggregate([{ $match: { userId: { $in: userIds } } }, { $group: { _id: '$userId', count: { $sum: 1 } } }])
    : []
  const countMap: Record<string, number> = Object.fromEntries((projectCounts as any[]).map((c: any) => [c._id, c.count]))

  const userRows: UserRow[] = (usersRaw as any[]).map(u => ({
    _id:                  u._id.toString(),
    email:                u.email as string,
    fullName:             u.fullName ?? '',
    isActive:             u.isActive !== false,
    isAdmin:              !!u.isAdmin,
    paidUntil:            u.paidUntil ? (u.paidUntil as Date).toISOString() : null,
    plan:                 u.plan ?? 'free',
    planExpiresAt:        u.planExpiresAt ? (u.planExpiresAt as Date).toISOString() : null,
    credits:              u.credits ?? 0,
    creditsTotal:         u.creditsTotal ?? 0,
    generationsUsed:      u.generationsUsed ?? 0,
    projectCount:         countMap[u._id.toString()] ?? 0,
    createdAt:            (u.createdAt as Date).toISOString(),
    registrationIp:       u.registrationIp ?? '',
    registrationCity:     u.registrationCity ?? '',
    registrationCountry:  u.registrationCountry ?? '',
    registrationRegion:   u.registrationRegion ?? '',
  }))

  return { userRows, usersTotal, usersPage: up, meId: userId }
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const raw = await searchParams
  const sp: Record<string, string> = {}
  Object.entries(raw).forEach(([k, v]) => { if (typeof v === 'string') sp[k] = v })

  const data = await getData(session.user.id, sp)
  if (!data) redirect('/login')

  return (
    <div className="px-4 sm:px-6 py-6">
      <Suspense>
        <AdminDashboard
          initialUsers={data.userRows}
          usersTotal={data.usersTotal}
          usersPage={data.usersPage}
          meId={data.meId}
          singleSection="users"
        />
      </Suspense>
    </div>
  )
}
