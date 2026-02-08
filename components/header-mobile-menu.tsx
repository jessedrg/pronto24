"use client"

import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import Link from "next/link"

const phoneNumber = "936946639"
const phoneFormatted = "936 946 639"

export function MobileMenuToggle() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={`tel:+34${phoneNumber}`}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold rounded-full shadow-lg shadow-green-500/25"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Llamar</span>
        </a>
        <span className="flex items-center gap-1.5 text-xs font-medium text-[#00B8A9]">
          <span className="w-1.5 h-1.5 bg-[#00B8A9] rounded-full animate-pulse" />
          24h
        </span>
        <button
          className="p-2 -mr-2 rounded-lg hover:bg-muted/50 transition-colors"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/20"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-14 left-0 right-0 z-[70] bg-background border-t border-border/50 shadow-lg">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              <a
                href={`tel:+34${phoneNumber}`}
                className="flex items-center gap-2 px-3 py-3 mx-1 mb-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-lg"
                onClick={() => setOpen(false)}
              >
                <Phone className="w-4 h-4" />
                <span>Llamar ahora: {phoneFormatted}</span>
              </a>
              {[
                { href: "/fontanero/", label: "Fontanero" },
                { href: "/electricista/", label: "Electricista" },
                { href: "/desatascos/", label: "Desatascos" },
                { href: "/cerrajero/", label: "Cerrajero" },
                { href: "/calderas/", label: "Calderas" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
