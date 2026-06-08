'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function HashScroll() {
  useSearchParams() // subscribe to query changes (satisfies Suspense boundary requirement)

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.slice(1)
    // Delay to let the page finish rendering before scrolling
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return null
}
