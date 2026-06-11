import type { Metadata } from 'next'
import { auth } from '@/auth'
import { SITE_URL } from '@/lib/constants'
import { redirect } from 'next/navigation'
import { getUserPlanInfo } from '@/lib/planGate'
import CreatePageClient from '@/components/create/CreatePageClient'

export const metadata: Metadata = {
  title: 'Tạo nội dung AI — AITaoPage',
  description: 'Tạo landing page, bài viết, quảng cáo chuẩn HTML chỉ trong 60 giây với AI.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Tạo nội dung AI — AITaoPage',
    description: 'Tạo landing page, bài viết, quảng cáo chuẩn HTML chỉ trong 60 giây với AI.',
    url: `${SITE_URL}/create`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export const runtime = 'nodejs'

export default async function CreatePage() {
  const session = await auth()
  if (!session) redirect('/login')

  const planInfo = await getUserPlanInfo(session.user.id)

  return <CreatePageClient plan={planInfo?.plan ?? 'free'} />
}
