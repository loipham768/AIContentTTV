"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, X, ArrowUp } from "lucide-react";
import { SUPPORT_PHONE, SUPPORT_PHONE_DISPLAY } from "@/lib/constants";

const HIDDEN_PATHS = ["/admin", "/editor", "/demo"];

export default function FloatingContact() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.cssText =
      "position:absolute;top:300px;left:0;width:1px;height:1px;pointer-events:none";
    document.body.appendChild(sentinel);
    const obs = new IntersectionObserver(
      ([entry]) => setShowBackTop(!entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(sentinel);
    return () => {
      obs.disconnect();
      sentinel.remove();
    };
  }, []);

  if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="fixed bottom-5 right-4 md:right-6 z-[9999] flex flex-col items-end">
      {/* Action buttons — collapse/expand above contact toggle */}
      <div
        className={`flex flex-col items-end gap-2 overflow-hidden transition-all duration-300 ${
          open
            ? "max-h-40 mb-2.5 opacity-100 pointer-events-auto"
            : "max-h-0 mb-0 opacity-0 pointer-events-none"
        }`}
      >
        <a
          href={`https://zalo.me/${SUPPORT_PHONE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2"
          tabIndex={open ? 0 : -1}
        >
          <span className="hidden md:block bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat Zalo
          </span>
          <span className="md:hidden bg-white/95 backdrop-blur text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap">
            Zalo
          </span>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0068FF] flex items-center justify-center shadow-lg shadow-blue-500/25 hover:scale-110 active:scale-95 transition-transform">
            <span
              className="text-white font-black text-xl md:text-2xl leading-none select-none"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Z
            </span>
          </div>
        </a>

        <a
          href={`tel:${SUPPORT_PHONE}`}
          className="group flex items-center gap-2"
          tabIndex={open ? 0 : -1}
        >
          <span className="hidden md:block bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {SUPPORT_PHONE_DISPLAY}
          </span>
          <span className="md:hidden bg-white/95 backdrop-blur text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap">
            Gọi ngay
          </span>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:scale-110 active:scale-95 transition-transform">
            <Phone className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
        </a>
      </div>

      {/* Contact toggle */}
      <div className="relative">
        {!open && (
          <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20" />
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Đóng" : "Liên hệ hỗ trợ"}
          className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
            open
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gradient-to-br from-indigo-500 to-violet-600 hover:scale-110 active:scale-95"
          }`}
        >
          <span
            className={`absolute transition-all duration-200 ${open ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
          >
            <X className="w-5 h-5 text-white" />
          </span>
          <span
            className={`absolute transition-all duration-200 ${open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
          >
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </span>
        </button>
      </div>

      {/* BackToTop — appears below contact, pushes it up when visible */}
      <div
        className={`transition-all duration-300 ease-out ${
          showBackTop ? "max-h-14 mt-2.5 opacity-100" : "max-h-0 mt-0 opacity-0"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Về đầu trang"
          className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-0 cursor-pointer bg-gradient-to-br from-indigo-600 to-violet-600 text-white hover:scale-110 active:scale-95 transition-transform"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </div>
  );
}
