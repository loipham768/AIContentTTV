'use client'

import { useEffect, useState, type ReactNode } from 'react'

export default function ScrollHeaderWrapper({ children }: { children: ReactNode }) {
  const [fixed, setFixed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop
      setFixed(y > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      {/* Spacer chỉ xuất hiện khi header đang fixed để tránh content bị giật */}
      {fixed && <div style={{ height: '64px' }} aria-hidden="true" />}

      <header
        style={{
          position: fixed ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: fixed ? '1px solid #f3f4f6' : '1px solid #f3f4f6',
          backgroundColor: fixed ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.90)',
          boxShadow: fixed ? '0 4px 16px rgba(0,0,0,0.07)' : 'none',
          transform: fixed ? 'translateY(0)' : 'none',
          animation: fixed ? 'slideDown 0.3s ease' : 'none',
        }}
      >
        {children}
      </header>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0.7; }
          to   { transform: translateY(0);     opacity: 1;   }
        }
      `}</style>
    </>
  )
}
