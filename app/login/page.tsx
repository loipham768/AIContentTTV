import type { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { LoginRegisterCard } from '@/components/auth/LoginRegisterCard'

export const metadata: Metadata = {
  title: 'Đăng nhập / Đăng ký — AITaoPage',
  description: 'Đăng nhập hoặc tạo tài khoản AITaoPage để bắt đầu tạo nội dung HTML đẹp với AI.',
  robots: { index: false, follow: false },
}

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string; plan?: string; billing?: string; type?: string; pack?: string; tab?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth()
  const params = await searchParams
  const plan = params.plan ?? ''
  const billing = params.billing === 'yearly' ? 'yearly' : 'monthly'
  const isCredits = params.type === 'credits'
  const pack = params.pack ?? ''

  if (session) {
    if (isCredits && pack) {
      redirect(`/upgrade?type=credits&pack=${pack}`)
    }
    if (plan === 'designer' || plan === 'basic' || plan === 'pro') {
      redirect(`/upgrade?plan=${plan}&billing=${billing}`)
    }
    redirect('/')
  }

  const callbackUrl = params.callbackUrl || '/'
  const initialPlan = isCredits ? `credits:${pack}` : plan
  const initialTab = params.tab === 'register' ? 'register' : undefined

  return <LoginRegisterCard callbackUrl={callbackUrl} initialPlan={initialPlan} initialTab={initialTab} initialBilling={billing} />
}
