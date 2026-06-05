'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'position:absolute;top:300px;left:0;width:1px;height:1px;pointer-events:none'
    document.body.appendChild(sentinel)

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(sentinel)

    return () => {
      obs.disconnect()
      sentinel.remove()
    }
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Về đầu trang"
      className={[
        'fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[9999]',
        'flex items-center justify-center',
        'w-12 h-12 md:w-14 md:h-14 rounded-full border-0 cursor-pointer',
        'bg-gradient-to-br from-indigo-600 to-violet-600 text-white',
        'shadow-[0_8px_24px_rgba(99,102,241,0.35)]',
        'transition-all duration-300',
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-3 scale-90 pointer-events-none',
      ].join(' ')}
    >
      <ArrowUp size={22} />
    </button>
  )
}
