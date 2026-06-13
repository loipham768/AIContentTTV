import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Project from '@/models/Project'
import { Suspense } from 'react'
import AdminDashboard, { type ProjectRow } from '@/components/admin/AdminDashboard'
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

  const pq = (sp.pq ?? '').trim()
  const pp = p(sp.pp)

  const projEmailMatches = pq
    ? (await User.find({ email: { $regex: escapeRegex(pq), $options: 'i' } }, { _id: 1 }).lean() as any[])
        .map((u: any) => u._id.toString())
    : []

  const projectsFilter = pq
    ? { $or: [
        { name:   { $regex: escapeRegex(pq), $options: 'i' } },
        { prompt: { $regex: escapeRegex(pq), $options: 'i' } },
        ...(projEmailMatches.length ? [{ userId: { $in: projEmailMatches } }] : []),
      ] }
    : {}

  const [projectsTotal, projectsRaw] = await Promise.all([
    Project.countDocuments(projectsFilter),
    Project.find(projectsFilter, { blockData: 0 }).sort({ createdAt: -1 }).skip((pp - 1) * PAGE_SIZE).limit(PAGE_SIZE).lean(),
  ])

  const userIds = (projectsRaw as any[]).map((p: any) => p.userId)
  const emailDocs = userIds.length
    ? (await User.find({ _id: { $in: userIds } }, { email: 1 }).lean() as any[])
    : []
  const emailMap: Record<string, string> = Object.fromEntries(emailDocs.map((u: any) => [u._id.toString(), u.email as string]))

  const projectRows: ProjectRow[] = (projectsRaw as any[]).map(p => ({
    _id:       p._id.toString(),
    userId:    p.userId,
    userEmail: emailMap[p.userId] ?? p.userId,
    name:      p.name,
    prompt:    p.prompt,
    createdAt: (p.createdAt as Date).toISOString(),
  }))

  return { projectRows, projectsTotal, projectsPage: pp, meId: userId }
}

export default async function AdminProjectsPage({
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
          initialProjects={data.projectRows}
          projectsTotal={data.projectsTotal}
          projectsPage={data.projectsPage}
          meId={data.meId}
          singleSection="content"
        />
      </Suspense>
    </div>
  )
}
