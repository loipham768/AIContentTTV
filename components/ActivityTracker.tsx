'use client'
import { useEffect } from 'react'

export default function ActivityTracker() {
  useEffect(() => {
    let sid = localStorage.getItem('_act_sid')
    if (!sid) {
      sid = crypto.randomUUID()
      localStorage.setItem('_act_sid', sid)
    }
    fetch('/api/ping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sid, path: window.location.pathname }),
    }).catch(() => {})
  }, [])
  return null
}
