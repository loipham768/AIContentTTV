'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { User, LogOut, ChevronDown, ShieldCheck } from 'lucide-react'
import UserAvatar from './UserAvatar'

interface Props {
  avatarUrl?: string
  fullName?: string
  email: string
  isAdmin?: boolean
}

export default function UserMenu({ avatarUrl, fullName, email, isAdmin }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const displayName = fullName?.split(' ').pop() || 'Profile'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="group flex items-center gap-2 p-1 pr-3 rounded-full border border-gray-200 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100 transition-all bg-white"
      >
        <UserAvatar avatarUrl={avatarUrl} fullName={fullName} email={email} size={30} />
        <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 max-w-[96px] truncate">
          {displayName}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 overflow-hidden z-50">
          <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">{fullName || 'Tài khoản'}</p>
            <p className="text-xs text-gray-500 truncate">{email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
            >
              <User className="w-4 h-4" />
              Hồ sơ của tôi
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-indigo-700 hover:bg-indigo-50 transition-colors font-medium"
              >
                <ShieldCheck className="w-4 h-4" />
                Trang quản trị
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
