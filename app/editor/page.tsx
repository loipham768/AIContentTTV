import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function EditorPage() {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <main>
      <p>Editor — {session.user.email}</p>
    </main>
  )
}
