import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Review from '@/models/Review'
import { Suspense } from 'react'
import AdminDashboard, { type ReviewRow } from '@/components/admin/AdminDashboard'
import type { Metadata } from 'next'

export const metadata: Metadata = { robots: { index: false, follow: false } }
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function getData(userId: string) {
  await dbConnect()
  const me = await User.findById(userId).lean() as any
  if (!(me?.isAdmin || me?.email === process.env.ADMIN_EMAIL)) return null

  const [reviewsTotal, reviewPendingCount, reviewsRaw] = await Promise.all([
    Review.countDocuments(),
    Review.countDocuments({ isApproved: false }),
    Review.find().sort({ isApproved: 1, createdAt: -1 }).limit(100).lean(),
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

  return { reviewRows, reviewsTotal, reviewPendingCount }
}

export default async function AdminReviewsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const data = await getData(session.user.id)
  if (!data) redirect('/login')

  return (
    <div className="px-4 sm:px-6 py-6">
      <Suspense>
        <AdminDashboard
          initialReviews={data.reviewRows}
          reviewsTotal={data.reviewsTotal}
          reviewPendingCount={data.reviewPendingCount}
          singleSection="reviews"
        />
      </Suspense>
    </div>
  )
}
