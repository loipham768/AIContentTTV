import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { LogoutButton } from '@/components/auth/LogoutButton'

export default async function EditorPage() {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">{session.user.email}</p>
        <LogoutButton />
      </div>
      <p className="text-gray-400 text-sm">Editor — Phase 2</p>
    </main>
  )
}
