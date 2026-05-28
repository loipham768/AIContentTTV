import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { LoginRegisterCard } from '@/components/auth/LoginRegisterCard'

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string; plan?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth()
  const params = await searchParams
  const plan = params.plan ?? ''

  if (session) {
    // Logged-in user with a paid plan selected → create order via /upgrade
    if (plan === 'basic' || plan === 'pro') {
      redirect(`/upgrade?plan=${plan}`)
    }
    redirect('/editor')
  }

  const callbackUrl = params.callbackUrl || '/editor'

  return <LoginRegisterCard callbackUrl={callbackUrl} initialPlan={plan} />
}
