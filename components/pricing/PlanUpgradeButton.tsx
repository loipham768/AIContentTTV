'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface Props {
  type: 'subscription'
  plan: 'designer' | 'basic' | 'pro'
  billing: 'monthly' | 'yearly'
  label?: string
  className?: string
}

interface CreditsProps {
  type: 'credits'
  packId: 'c1' | 'c2' | 'c3' | 'c4'
  label?: string
  className?: string
}

export default function PlanUpgradeButton(props: Props | CreditsProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const router = useRouter()

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const body = props.type === 'subscription'
        ? { type: 'subscription', plan: props.plan, billing: props.billing }
        : { type: 'credits', packId: props.packId }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.status === 401) {
        router.push('/login')
        return
      }

      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setError(d.error ?? 'Đã có lỗi xảy ra')
        return
      }

      const { orderId } = await res.json()
      router.push(`/checkout/${orderId}`)
    } catch {
      setError('Lỗi kết nối. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={props.className ?? 'w-full py-2.5 text-sm font-semibold rounded-xl transition-colors bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60'}
      >
        {loading
          ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Đang xử lý...</span>
          : (props.label ?? 'Nâng cấp')}
      </button>
      {error && <p className="mt-1 text-xs text-red-500 text-center">{error}</p>}
    </div>
  )
}
