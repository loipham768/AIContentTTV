import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import EditorClientWrapper from '@/components/editor/EditorClientWrapper'

export default async function EditorPage() {
  const session = await auth()
  if (!session) redirect('/login')

  return <EditorClientWrapper userEmail={session.user.email!} />
}
