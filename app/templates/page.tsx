import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import { TEMPLATES } from '@/lib/templates'
import { getUserPlanInfo } from '@/lib/planGate'
import TemplatesClient from '@/components/templates/TemplatesClient'

export const runtime = 'nodejs'
export const metadata = {
  title: 'Thư viện mẫu — AITaoPage',
  description: 'Khám phá hàng trăm mẫu landing page, bài viết và quảng cáo được tạo sẵn bằng AI. Dùng ngay, chỉnh sửa theo thương hiệu của bạn.',
  openGraph: {
    title: 'Thư viện mẫu — AITaoPage',
    description: 'Khám phá hàng trăm mẫu landing page, bài viết và quảng cáo được tạo sẵn bằng AI.',
    url: 'https://taopage.vn/templates',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default async function TemplatesPage() {
  const session = await auth()
  const isLoggedIn = !!session?.user?.id

  let userDoc: any = null
  let planInfo = null

  if (isLoggedIn) {
    await dbConnect()
    ;[userDoc, planInfo] = await Promise.all([
      User.findById(session!.user!.id, { fullName: 1, avatarUrl: 1 }).lean(),
      getUserPlanInfo(session!.user!.id),
    ])
  }

  return (
    <TemplatesClient
      templates={TEMPLATES}
      isLoggedIn={isLoggedIn}
      userEmail={session?.user?.email ?? ''}
      fullName={userDoc?.fullName ?? ''}
      avatarUrl={userDoc?.avatarUrl ?? ''}
      plan={planInfo?.plan ?? 'free'}
    />
  )
}
