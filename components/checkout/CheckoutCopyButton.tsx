'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CheckoutCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded text-gray-400 hover:text-indigo-600 transition-colors"
      title="Sao chép"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}
