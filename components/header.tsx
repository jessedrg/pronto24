import { Logo } from "./logo"
import { Phone } from "lucide-react"
import Link from "next/link"
import { MobileMenuToggle } from "./header-mobile-menu"

const phoneNumber = "936946639"
const phoneFormatted = "936 946 639"

const NAV_LINKS = [
  { href: "/fontanero/", label: "Fontanero" },
  { href: "/electricista/", label: "Electricista" },
  { href: "/desatascos/", label: "Desatascos" },
  { href: "/cerrajero/", label: "Cerrajero" },
  { href: "/calderas/", label: "Calderas" },
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
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

          {/* Desktop Navigation - server rendered for Googlebot */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegacion principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:+34${phoneNumber}`}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/25"
              aria-label="Llamar al 936 946 639"
            >
              <Phone className="w-4 h-4" />
              <span>{phoneFormatted}</span>
            </a>
          </nav>

          {/* Mobile menu - client component only for toggle */}
          <MobileMenuToggle />
        </div>
      </div>
    </header>
  )
}
