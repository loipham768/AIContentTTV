'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      title="Đăng xuất"
      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
    >
      <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="hidden sm:inline">Đăng xuất</span>
    </button>
  )
}
