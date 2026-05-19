import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { LoginRegisterCard } from '@/components/auth/LoginRegisterCard'

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth()
  if (session) redirect('/editor')

  const params = await searchParams
  const callbackUrl = params.callbackUrl || '/editor'

  return <LoginRegisterCard callbackUrl={callbackUrl} />
}
