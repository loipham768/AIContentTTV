'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Tạo sentinel ở đầu trang, khi nó out-of-viewport => nút hiện
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
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        document.documentElement.scrollTop = 0
      }}
      aria-label="Về đầu trang"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '20px',
        zIndex: 9999,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <ArrowUp size={20} />
    </button>
  )
}
