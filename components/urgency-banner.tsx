import { Phone } from "lucide-react"

export function UrgencyBanner() {
  return (
    <div className="bg-foreground text-background py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-bold">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="hidden sm:inline">Emergencia 24/7 en toda Espana</span>
        <span className="sm:hidden">Emergencia 24/7</span>
        <span className="text-background/40">|</span>
        <a
          href="tel:+34936946639"
          className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors"
          aria-label="Llamar al 936 946 639"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>936 946 639</span>
        </a>
      </div>
    </div>
  )
}
