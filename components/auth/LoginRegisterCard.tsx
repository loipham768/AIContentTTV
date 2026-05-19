'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { z } from 'zod'

const emailSchema = z.string().email()
const passwordSchema = z.string().min(8)

interface LoginRegisterCardProps {
  callbackUrl?: string
}

export function LoginRegisterCard({ callbackUrl = '/editor' }: LoginRegisterCardProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  function validateFields() {
    const errors: { email?: string; password?: string } = {}
    const emailResult = emailSchema.safeParse(email)
    if (!emailResult.success) errors.email = 'Email không hợp lệ'
    const passResult = passwordSchema.safeParse(password)
    if (!passResult.success) errors.password = 'Mật khẩu phải có ít nhất 8 ký tự'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleLogin() {
    if (!validateFields()) return
    setLoading(true)
    setError('')
    try {
      const result = await signIn('credentials', { email, password, redirect: false })
      if (result?.error) {
        setError('Email hoặc mật khẩu không đúng')
      } else {
        window.location.href = callbackUrl
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister() {
    if (!validateFields()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Đăng ký thất bại')
        return
      }
      await handleLogin()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
        <div className="flex mb-6 border-b">
          <button
            className={`pb-2 px-4 text-sm font-medium ${tab === 'login' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500'}`}
            onClick={() => { setTab('login'); setError(''); setFieldErrors({}) }}
          >
            Đăng nhập
          </button>
          <button
            className={`pb-2 px-4 text-sm font-medium ${tab === 'register' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500'}`}
            onClick={() => { setTab('register'); setError(''); setFieldErrors({}) }}
          >
            Đăng ký
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="you@example.com"
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="••••••••"
            />
            {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            onClick={tab === 'login' ? handleLogin : handleRegister}
            disabled={loading}
            className="w-full bg-gray-900 text-white rounded py-2 text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </div>
      </div>
    </div>
  )
}
