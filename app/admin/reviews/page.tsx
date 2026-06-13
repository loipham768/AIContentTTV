import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Review from '@/models/Review'
import { Suspense } from 'react'
import AdminDashboard, { type ReviewRow } from '@/components/admin/AdminDashboard'
import { ADMIN_PAGE_SIZE } from '@/lib/adminConfig'
import type { Metadata } from 'next'

export const metadata: Metadata = { robots: { index: false, follow: false } }
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function getData(userId: string, page: number, filter: string) {
  await dbConnect()
  const me = await User.findById(userId).lean() as any
  if (!(me?.isAdmin || me?.email === process.env.ADMIN_EMAIL)) return null

  const filterQuery =
    filter === 'pending'  ? { isApproved: false } :
    filter === 'approved' ? { isApproved: true  } : {}

  const [reviewsTotal, reviewsAllTotal, reviewPendingCount, reviewsRaw] = await Promise.all([
    Review.countDocuments(filterQuery),
    Review.countDocuments({}),
    Review.countDocuments({ isApproved: false }),
    Review.find(filterQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * ADMIN_PAGE_SIZE)
      .limit(ADMIN_PAGE_SIZE)
      .lean(),
  ])

  const reviewRows: ReviewRow[] = (reviewsRaw as any[]).map(r => ({
    _id:        r._id.toString(),
    userId:     r.userId,
    userName:   r.userName,
    userEmail:  r.userEmail,
    plan:       r.plan ?? 'free',
    rating:     r.rating,
    content:    r.content,
    isApproved: r.isApproved,
    createdAt:  (r.createdAt as Date).toISOString(),
  }))

  return { reviewRows, reviewsTotal, reviewsAllTotal, reviewPendingCount }
}

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const sp = await searchParams
  const page   = Math.max(1, parseInt(sp.rp ?? '1', 10))
  const filter = ['pending', 'approved'].includes(sp.rf ?? '') ? (sp.rf ?? '') : ''

  const data = await getData(session.user.id, page, filter)
  if (!data) redirect('/login')

  return (
    <div className="px-4 sm:px-6 py-6">
      <Suspense>
        <AdminDashboard
          initialReviews={data.reviewRows}
          reviewsTotal={data.reviewsTotal}
          reviewsAllTotal={data.reviewsAllTotal}
          reviewPendingCount={data.reviewPendingCount}
          reviewsPage={page}
          reviewsFilter={filter}
          singleSection="reviews"
        />
      </Suspense>
    </div>
  )
}
