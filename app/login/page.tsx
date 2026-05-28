import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { LoginRegisterCard } from '@/components/auth/LoginRegisterCard'

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string; plan?: string; type?: string; pack?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth()
  const params = await searchParams
  const plan = params.plan ?? ''
  const isCredits = params.type === 'credits'
  const pack = params.pack ?? ''

  if (session) {
    if (isCredits && pack) {
      redirect(`/upgrade?type=credits&pack=${pack}`)
    }
    if (plan === 'basic' || plan === 'pro') {
      redirect(`/upgrade?plan=${plan}`)
    }
    redirect('/editor')
  }

  const callbackUrl = params.callbackUrl || '/editor'
  // Pass credits intent via initialPlan so card can redirect after register
  const initialPlan = isCredits ? `credits:${pack}` : plan

  return <LoginRegisterCard callbackUrl={callbackUrl} initialPlan={initialPlan} />
}
