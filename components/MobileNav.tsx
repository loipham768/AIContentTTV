'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Menu, X, BookOpen, LayoutTemplate, Tag, LogIn, Sparkles, Zap, LogOut } from 'lucide-react'
import UserAvatar from './UserAvatar'

interface Props {
  isLoggedIn: boolean
  userName?: string
  avatarUrl?: string
  email?: string
}

const NAV_LINKS = [
  { href: '/kien-thuc',  icon: BookOpen,       label: 'Kiến thức'   },
  { href: '/templates',  icon: LayoutTemplate, label: 'Mẫu có sẵn' },
  { href: '/#pricing',   icon: Tag,            label: 'Bảng giá'   },
]

export default function MobileNav({ isLoggedIn, userName, avatarUrl, email }: Props) {
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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div ref={ref} className="md:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setOpen(v => !v)}
        className="relative z-50 flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
        aria-label={open ? 'Đóng menu' : 'Mở menu'}
      >
        <span className={`absolute transition-all duration-200 ${open ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
          <X className="w-5 h-5" />
        </span>
        <span className={`absolute transition-all duration-200 ${open ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
          <Menu className="w-5 h-5" />
        </span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
        open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}>
        <div className="mx-3 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden">

          {/* User info — nếu đã login */}
          {isLoggedIn && (email || userName) && (
            <div className="px-4 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
              <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <UserAvatar avatarUrl={avatarUrl} fullName={userName} email={email ?? ''} size={40} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{userName || 'Tài khoản'}</p>
                  <p className="text-xs text-gray-500 truncate">{email}</p>
                </div>
              </Link>
            </div>
          )}

          {/* Nav links */}
          <div className="py-2">
            {NAV_LINKS.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 active:bg-gray-100 transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-gray-500" />
                </span>
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="px-3 pb-4 pt-2 border-t border-gray-100 space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/create"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-colors shadow-sm shadow-indigo-200"
                >
                  <Zap className="w-4 h-4" /> Tạo nội dung ngay
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 active:bg-red-200 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-colors shadow-sm shadow-indigo-200"
                >
                  <Sparkles className="w-4 h-4" /> Dùng thử miễn phí
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-xl transition-colors"
                >
                  <LogIn className="w-4 h-4" /> Đăng nhập
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
