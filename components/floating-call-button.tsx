"use client"

import { useState, useEffect } from "react"
import { Phone } from "lucide-react"

export function FloatingCallButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCall = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-16741652529/YiAVCI7M1NkbELGwha8-",
        value: 20.0,
        currency: "EUR",
      })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom">
      <div className="p-3 bg-background/95 backdrop-blur-sm border-t border-border">
        <a
          href="tel:+34936946639"
          onClick={handleCall}
          className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-green-500/30 active:scale-[0.98] transition-transform"
          aria-label="Llamar al 936 946 639"
        >
          <Phone className="w-5 h-5" />
          <span>LLAMAR AHORA - 936 946 639</span>
        </a>
      </div>
    </div>
  )
}
