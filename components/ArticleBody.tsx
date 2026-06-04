"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { X } from "lucide-react"

interface Props {
  html: string
}

export default function ArticleBody({ html }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  // Stable reference so React never resets innerHTML on re-render
  const dangerousHtml = useMemo(() => ({ __html: html }), [html])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add lazy load + cursor to images
    container.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      img.setAttribute("loading", "lazy")
      img.style.cursor = "zoom-in"
    })

    // Event delegation — one stable listener on the container, survives re-renders
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.tagName !== "IMG") return
      const img = target as HTMLImageElement
      setLightbox({ src: img.src, alt: img.alt || "" })
    }

    container.addEventListener("click", handleClick)
    return () => container.removeEventListener("click", handleClick)
  }, [html])

  return (
    <>
      <div
        ref={containerRef}
        className="article-body"
        dangerouslySetInnerHTML={dangerousHtml}
      />

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Đóng"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {lightbox.alt && (
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/65 text-sm text-center px-6 pointer-events-none">
              {lightbox.alt}
            </p>
          )}
        </div>
      )}
    </>
  )
}
