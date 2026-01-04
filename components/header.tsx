"use client"

import { Logo } from "./logo"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo + 24h badge */}
          <Link href="/" className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#FF4D00]">
              <span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-full animate-pulse" />
              24h urgente
            </span>
          </Link>

          {/* Desktop Navigation - minimal */}
          <nav className="hidden md:flex items-center gap-8">
            <span className="md:hidden flex items-center gap-1.5 text-xs font-medium text-[#FF4D00]">
              <span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-full animate-pulse" />
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
          </nav>

          {/* Mobile: 24h badge + Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-[#FF4D00]">
              <span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-full animate-pulse" />
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
