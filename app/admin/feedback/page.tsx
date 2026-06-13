import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Feedback from '@/models/Feedback'
import { Suspense } from 'react'
import AdminDashboard, { type FeedbackRow } from '@/components/admin/AdminDashboard'
import { ADMIN_PAGE_SIZE as PAGE_SIZE } from '@/lib/adminConfig'
import type { Metadata } from 'next'

export const metadata: Metadata = { robots: { index: false, follow: false } }
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function p(v: unknown): number {
  const n = parseInt(String(v ?? '1'))
  return isNaN(n) || n < 1 ? 1 : n
}

async function getData(userId: string, sp: Record<string, string>) {
  await dbConnect()
  const me = await User.findById(userId).lean() as any
  if (!(me?.isAdmin || me?.email === process.env.ADMIN_EMAIL)) return null

  const fs = (sp.fs ?? '').trim()
  const fp = p(sp.fp)

  const feedbackFilter = fs ? { status: fs } : {}
  const [feedbackTotal, feedbackRaw] = await Promise.all([
    Feedback.countDocuments(feedbackFilter),
    Feedback.find(feedbackFilter).sort({ createdAt: -1 }).skip((fp - 1) * PAGE_SIZE).limit(PAGE_SIZE).lean(),
  ])

  const feedbackRows: FeedbackRow[] = (feedbackRaw as any[]).map(f => ({
    _id:       f._id.toString(),
    userId:    f.userId ?? null,
    userEmail: f.userEmail ?? null,
    category:  f.category,
    title:     f.title,
    content:   f.content,
    status:    f.status,
    adminNote: f.adminNote ?? '',
    createdAt: (f.createdAt as Date).toISOString(),
  }))

  return { feedbackRows, feedbackTotal, feedbackPage: fp }
}

export default async function AdminFeedbackPage({
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
          initialFeedback={data.feedbackRows}
          feedbackTotal={data.feedbackTotal}
          feedbackPage={data.feedbackPage}
          singleSection="feedback"
        />
      </Suspense>
    </div>
  )
}
