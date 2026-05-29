import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import { TEMPLATES } from '@/lib/templates'
import TemplatesClient from '@/components/templates/TemplatesClient'

export const metadata = { title: 'Thư viện mẫu — AIContentBooster' }

export default async function TemplatesPage() {
  const session = await auth()
  if (!session) redirect('/login')

  await dbConnect()
  const userDoc = await User.findById(session.user.id, { fullName: 1, avatarUrl: 1 }).lean() as any

  return (
    <TemplatesClient
      templates={TEMPLATES}
      userEmail={session.user.email!}
      fullName={userDoc?.fullName ?? ''}
      avatarUrl={userDoc?.avatarUrl ?? ''}
    />
  )
}
