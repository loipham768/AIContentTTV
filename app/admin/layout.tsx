import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import Order from '@/models/Order'
import Project from '@/models/Project'
import Feedback from '@/models/Feedback'
import Review from '@/models/Review'
import AdminLayoutShell from '@/components/admin/AdminLayoutShell'
import { Suspense } from 'react'

export const runtime = 'nodejs'

async function getLayoutData(userId: string) {
  const [me, pendingOrders, ordersTotal, usersTotal, projectsTotal, feedbackTotal, reviewsTotal, reviewPendingCount] =
    await Promise.all([
      User.findById(userId).lean() as Promise<any>,
      Order.countDocuments({
        $or: [
          { status: 'pending', expiresAt: { $gt: new Date() } },
          { status: 'awaiting_confirmation' },
        ],
      }),
      Order.countDocuments(),
      User.countDocuments(),
      Project.countDocuments(),
      Feedback.countDocuments(),
      Review.countDocuments(),
      Review.countDocuments({ isApproved: false }),
    ])
  return { me, pendingOrders, ordersTotal, usersTotal, projectsTotal, feedbackTotal, reviewsTotal, reviewPendingCount }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  await dbConnect()
  const data = await getLayoutData(session.user.id)

  const isAdmin = !!(data.me?.isAdmin || data.me?.email === process.env.ADMIN_EMAIL)
  if (!isAdmin) redirect('/editor')

  return (
    <Suspense>
      <AdminLayoutShell
        pendingOrdersCount={data.pendingOrders}
        reviewPendingCount={data.reviewPendingCount}
        ordersTotal={data.ordersTotal}
        usersTotal={data.usersTotal}
        projectsTotal={data.projectsTotal}
        feedbackTotal={data.feedbackTotal}
        reviewsTotal={data.reviewsTotal}
      >
        {children}
      </AdminLayoutShell>
    </Suspense>
  )
}
