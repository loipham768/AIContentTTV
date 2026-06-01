import type { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getUserPlanInfo } from '@/lib/planGate'
import CreatePageClient from '@/components/create/CreatePageClient'

export const metadata: Metadata = {
  title: 'Tạo nội dung AI — AITaoPage',
  description: 'Tạo landing page, bài viết, quảng cáo chuẩn HTML chỉ trong 60 giây với AI.',
  openGraph: {
    title: 'Tạo nội dung AI — AITaoPage',
    description: 'Tạo landing page, bài viết, quảng cáo chuẩn HTML chỉ trong 60 giây với AI.',
    url: 'https://taopage.vn/create',
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
