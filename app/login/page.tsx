import type { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { LoginRegisterCard } from '@/components/auth/LoginRegisterCard'

export const metadata: Metadata = {
  title: 'Đăng nhập / Đăng ký — AITaoPage',
  description: 'Đăng nhập hoặc tạo tài khoản AITaoPage để bắt đầu tạo nội dung HTML đẹp với AI.',
  openGraph: {
    title: 'Đăng nhập / Đăng ký — AITaoPage',
    description: 'Đăng nhập hoặc tạo tài khoản AITaoPage để bắt đầu tạo nội dung HTML đẹp với AI.',
    url: 'https://taopage.vn/login',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string; plan?: string; type?: string; pack?: string; tab?: string }>
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
    if (plan === 'designer' || plan === 'basic' || plan === 'pro') {
      redirect(`/upgrade?plan=${plan}`)
    }
    redirect('/')
  }

  const callbackUrl = params.callbackUrl || '/'
  const initialPlan = isCredits ? `credits:${pack}` : plan
  const initialTab = params.tab === 'register' ? 'register' : undefined

  return <LoginRegisterCard callbackUrl={callbackUrl} initialPlan={initialPlan} initialTab={initialTab} />
}
