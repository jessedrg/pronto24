"use client"

import { Logo } from "./logo"
import { Menu, X, Phone } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const phoneNumber = "931501817"
  const phoneFormatted = "931 501 817"
  const pathname = usePathname()

  if (pathname?.startsWith("/0x")) {
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo + 24h badge */}
          <Link href="/" className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#00B8A9]">
              <span className="w-1.5 h-1.5 bg-[#00B8A9] rounded-full animate-pulse" />
              24h urgente
            </span>
          </Link>

          {/* Desktop Navigation - minimal */}
          <nav className="hidden md:flex items-center gap-8">
            <span className="md:hidden flex items-center gap-1.5 text-xs font-medium text-[#00B8A9]">
              <span className="w-1.5 h-1.5 bg-[#00B8A9] rounded-full animate-pulse" />
              24h
            </span>
            <Link href="/fontanero" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Fontanero
            </Link>
            <Link
              href="/electricista"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Electricista
            </Link>
            <Link href="/desatascos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Desatascos
            </Link>
            <Link href="/cerrajero" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cerrajero
            </Link>
            <a
              href={`tel:+34${phoneNumber}`}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/25"
            >
              <Phone className="w-4 h-4" />
              <span>{phoneFormatted}</span>
            </a>
          </nav>

          {/* Mobile: Phone + 24h badge + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - minimal */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-1">
              <a
                href={`tel:+34${phoneNumber}`}
                className="flex items-center gap-2 px-3 py-3 mx-1 mb-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="w-4 h-4" />
                <span>Llamar ahora: {phoneFormatted}</span>
              </a>
              <Link
                href="/fontanero"
                className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Fontanero
              </Link>
              <Link
                href="/electricista"
                className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Electricista
              </Link>
              <Link
                href="/desatascos"
                className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Desatascos
              </Link>
              <Link
                href="/cerrajero"
                className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cerrajero
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
