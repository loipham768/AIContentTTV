import AdminContentManager from '@/components/admin/AdminContentManager'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default function AdminContentPage() {
  return (
    <div className="px-4 sm:px-6 py-6">
      <AdminContentManager />
    </div>
  )
}
