'use client'
import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  from?: 'bottom' | 'left' | 'right'
}

export default function ScrollReveal({ children, className = '', delay = 0, from = 'bottom' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) el.style.transitionDelay = `${delay}ms`
          el.classList.add('sr-visible')
          obs.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  const fromClass =
    from === 'left' ? 'sr-from-left' : from === 'right' ? 'sr-from-right' : 'sr-from-bottom'

  return (
    <div ref={ref} className={`sr-init ${fromClass} ${className}`}>
      {children}
    </div>
  )
}
