import { auth } from '@/auth'
import { SITE_URL } from '@/lib/constants'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import { getInitialTemplateGroups } from '@/lib/templates-db'
import { getUserPlanInfo } from '@/lib/planGate'
import TemplatesClient from '@/components/templates/TemplatesClient'
import { TEMPLATES_PAGE_SIZE } from '@/lib/constants'

export const runtime = 'nodejs'
export const revalidate = 3600
export const metadata = {
  title: 'Thư viện mẫu — AITaoPage',
  description: 'Khám phá hàng trăm mẫu landing page, bài viết và quảng cáo được tạo sẵn bằng AI. Dùng ngay, chỉnh sửa theo thương hiệu của bạn.',
  openGraph: {
    title: 'Thư viện mẫu — AITaoPage',
    description: 'Khám phá hàng trăm mẫu landing page, bài viết và quảng cáo được tạo sẵn bằng AI.',
    url: `${SITE_URL}/templates`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default async function TemplatesPage() {
  const session = await auth()
  const isLoggedIn = !!session?.user?.id

  const [initialGroups, userDoc, planInfo] = await Promise.all([
    getInitialTemplateGroups(['landing', 'article', 'ads', 'portfolio', 'cv'], TEMPLATES_PAGE_SIZE),
    isLoggedIn
      ? (await dbConnect(), User.findById(session!.user!.id, { fullName: 1, avatarUrl: 1 }).lean())
      : Promise.resolve(null),
    isLoggedIn ? getUserPlanInfo(session!.user!.id) : Promise.resolve(null),
  ])

  return (
    <TemplatesClient
      initialGroups={initialGroups}
      isLoggedIn={isLoggedIn}
      userEmail={session?.user?.email ?? ''}
      fullName={(userDoc as any)?.fullName ?? ''}
      avatarUrl={(userDoc as any)?.avatarUrl ?? ''}
      plan={planInfo?.plan ?? 'free'}
    />
  )
}
