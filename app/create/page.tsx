import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import CreatePageClient from '@/components/create/CreatePageClient'

export const metadata: Metadata = {
  title: 'Create AI Content — TaoPage',
  description: 'Create landing pages, articles, and ad copy in standard HTML in 60 seconds with AI.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Create AI Content — TaoPage',
    description: 'Create landing pages, articles, and ad copy in standard HTML in 60 seconds with AI.',
    url: `${SITE_URL}/create`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export const runtime = 'nodejs'

export default function CreatePage() {
  return <CreatePageClient plan="pro" />
}
