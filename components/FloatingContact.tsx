'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Phone, MessageCircle, X } from 'lucide-react'

const HIDDEN_PATHS = ['/admin', '/editor']

export default function FloatingContact() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])

  if (HIDDEN_PATHS.some(p => pathname.startsWith(p))) return null

  return (
    <div className="fixed bottom-5 right-4 md:bottom-24 md:right-6 z-50 flex flex-col items-end gap-2.5">

      {/* Action buttons */}
      <div className={`flex flex-col items-end gap-2 transition-all duration-300 ${
        open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}>

        {/* Zalo */}
        <a
          href="https://zalo.me/0969986786"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2"
          tabIndex={open ? 0 : -1}
        >
          {/* Label — desktop only */}
          <span className="hidden md:block bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat Zalo
          </span>
          {/* Mobile label inline */}
          <span className="md:hidden bg-white/95 backdrop-blur text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap">
            Zalo
          </span>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0068FF] flex items-center justify-center shadow-lg shadow-blue-500/25 hover:scale-110 active:scale-95 transition-transform">
            <span className="text-white font-black text-xl md:text-2xl leading-none select-none" style={{ fontFamily: 'Arial, sans-serif' }}>Z</span>
          </div>
        </a>

        {/* Phone */}
        <a
          href="tel:0969986786"
          className="group flex items-center gap-2"
          tabIndex={open ? 0 : -1}
        >
          <span className="hidden md:block bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            0969 986 786
          </span>
          <span className="md:hidden bg-white/95 backdrop-blur text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap">
            Gọi ngay
          </span>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:scale-110 active:scale-95 transition-transform">
            <Phone className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
        </a>

      </div>

      {/* Main toggle */}
      <div className="relative">
        {!open && (
          <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20" />
        )}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Đóng' : 'Liên hệ hỗ trợ'}
          className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
            open
              ? 'bg-gray-800 hover:bg-gray-700'
              : 'bg-gradient-to-br from-indigo-500 to-violet-600 hover:scale-110 active:scale-95'
          }`}
        >
          <span className={`absolute transition-all duration-200 ${open ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
            <X className="w-5 h-5 text-white" />
          </span>
          <span className={`absolute transition-all duration-200 ${open ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </span>
        </button>
      </div>

    </div>
  )
}
