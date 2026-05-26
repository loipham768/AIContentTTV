import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import CreatePageClient from '@/components/create/CreatePageClient'

export default async function CreatePage() {
  const session = await auth()
  if (!session) redirect('/login')
  return <CreatePageClient />
}
