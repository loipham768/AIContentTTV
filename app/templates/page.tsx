import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import { TEMPLATES } from '@/lib/templates'
import { getUserPlanInfo } from '@/lib/planGate'
import TemplatesClient from '@/components/templates/TemplatesClient'

export const runtime = 'nodejs'
export const metadata = { title: 'Thư viện mẫu — AIContentBooster' }

export default async function TemplatesPage() {
  const session = await auth()
  if (!session) redirect('/login')

  await dbConnect()
  const [userDoc, planInfo] = await Promise.all([
    User.findById(session.user.id, { fullName: 1, avatarUrl: 1 }).lean() as any,
    getUserPlanInfo(session.user.id),
  ])

  return (
    <TemplatesClient
      templates={TEMPLATES}
      userEmail={session.user.email!}
      fullName={userDoc?.fullName ?? ''}
      avatarUrl={userDoc?.avatarUrl ?? ''}
      plan={planInfo?.plan ?? 'free'}
    />
  )
}
