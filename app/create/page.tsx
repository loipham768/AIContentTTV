import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getUserPlanInfo } from '@/lib/planGate'
import CreatePageClient from '@/components/create/CreatePageClient'

export const runtime = 'nodejs'

export default async function CreatePage() {
  const session = await auth()
  if (!session) redirect('/login')

  const planInfo = await getUserPlanInfo(session.user.id)

  return <CreatePageClient plan={planInfo?.plan ?? 'free'} />
}
