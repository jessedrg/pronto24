import { Phone } from "lucide-react"

export function FloatingCallButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom" role="complementary" aria-label="Boton de llamada rapida">
      <div className="p-3 bg-background/95 backdrop-blur-sm border-t border-border">
        <a
          href="tel:+34936946639"
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
