"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  LogOut,
  Zap,
  Clock,
  Target,
  MessageSquareX,
  Send,
  X,
  Calendar,
  ChevronDown,
  ExternalLink,
  Trash2,
} from "lucide-react"

interface Stats {
  total: number
  sold: number
  revenue: number
  todayLeads: number
  todaySold: number
  todayRevenue: number
  todayPending: number
  todayPotential: number
  weekLeads: number
  weekSold: number
  weekRevenue: number
  weekPending: number
  weekPotential: number
  recentLeads: any[]
  byService: any[]
  funnelStats: any[]
  partners: number
  partnersList: any[]
  ownerTelegramId: string
  conversionRate: string
  incompleteChats: any[]
  dateRange: string
}

function ResendModal({
  lead,
  onClose,
  onResend,
}: {
  lead: any
  onClose: () => void
  onResend: (leadId: number, price: number) => void
}) {
  const originalPrice = Number(lead.lead_price) || 35
  const [offerPrice, setOfferPrice] = useState(Math.round(originalPrice * 0.7))
  const [sending, setSending] = useState(false)

  const discount = Math.round(((originalPrice - offerPrice) / originalPrice) * 100)

  const handleResend = async () => {
    setSending(true)
    await onResend(lead.id, offerPrice)
    setSending(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md border border-zinc-700 bg-zinc-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold tracking-wider text-[#FF4D00]">REENVIAR CON OFERTA</h3>
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="border border-zinc-800 bg-zinc-800/50 p-4">
            <p className="text-xs text-zinc-500 mb-1">LEAD #{lead.id}</p>
            <p className="text-sm font-medium">
              {lead.service} - {lead.city}
            </p>
            <p className="text-xs text-zinc-400 mt-1 truncate">{lead.problem?.slice(0, 60)}...</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500 mb-1">PRECIO ORIGINAL</p>
              <p className="text-xl font-bold line-through text-zinc-500">{originalPrice}€</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">PRECIO OFERTA</p>
              <input
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                min={5}
                max={originalPrice}
                className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-xl font-bold text-[#FF4D00] focus:border-[#FF4D00] outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-center py-3 border border-green-500/30 bg-green-500/10">
            <span className="text-2xl font-bold text-green-500">-{discount}%</span>
            <span className="text-sm text-green-400 ml-2">DESCUENTO</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[10, 15, 20, 25].map((price) => (
              <button
                key={price}
                onClick={() => setOfferPrice(price)}
                className={`py-2 text-sm font-bold border transition-colors ${
                  offerPrice === price
                    ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                    : "border-zinc-700 hover:border-zinc-600"
                }`}
              >
                {price}€
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleResend}
          disabled={sending || offerPrice <= 0}
          className="w-full py-3 bg-[#FF4D00] text-black font-bold tracking-wider hover:bg-[#FF4D00]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {sending ? (
            <>ENVIANDO...</>
          ) : (
            <>
              <Send className="w-4 h-4" />
              ENVIAR SÚPER OFERTA
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function KPICard({
  label,
  value,
  icon,
  color,
  subtext,
  onClick,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  color: "green" | "orange" | "zinc" | "blue" | "yellow"
  subtext?: string
  onClick?: () => void
}) {
  const colors = {
    green: "border-green-500/30",
    orange: "border-[#FF4D00]/30",
    zinc: "border-zinc-700",
    blue: "border-blue-500/30",
    yellow: "border-yellow-500/30",
  }

  const textColors = {
    green: "text-green-500",
    orange: "text-[#FF4D00]",
    zinc: "text-zinc-100",
    blue: "text-blue-500",
    yellow: "text-yellow-500",
  }

  const Component = onClick ? "button" : "div"

  return (
    <Component
      onClick={onClick}
      className={`border ${colors[color]} bg-zinc-900/30 backdrop-blur-sm p-3 sm:p-5 hover:bg-zinc-900/50 transition-all ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-xs text-zinc-500 tracking-wider">{label}</span>
        <div className={textColors[color]}>{icon}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <p className={`text-xl sm:text-3xl font-bold tracking-tight ${textColors[color]}`}>{value}</p>
        {subtext && <span className="text-xs sm:text-sm text-zinc-500">{subtext}</span>}
        {onClick && <ExternalLink className="w-3 h-3 text-zinc-600 ml-auto" />}
      </div>
    </Component>
  )
}

export function DashboardClient({ stats }: { stats: Stats }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resendLead, setResendLead] = useState<any>(null)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [dateFilterOpen, setDateFilterOpen] = useState(false)
  const [showPartners, setShowPartners] = useState(false)
  const [expellingPartner, setExpellingPartner] = useState<string | null>(null)
  const [clearingChannel, setClearingChannel] = useState<string | null>(null)
  const [showClearModal, setShowClearModal] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const handleDateFilter = (range: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (range === "all") {
      params.delete("range")
    } else {
      params.set("range", range)
    }
    router.push(`/0x/dashboard?${params.toString()}`)
    setDateFilterOpen(false)
  }

  const dateRangeLabels: Record<string, string> = {
    today: "Hoy",
    yesterday: "Ayer",
    week: "7 días",
    month: "30 días",
    all: "Todo",
  }

  const handleExpelPartner = async (partnerId: string, telegramChatId: string) => {
    if (telegramChatId === stats.ownerTelegramId) {
      setNotification({ type: "error", message: "No puedes expulsarte a ti mismo" })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    setExpellingPartner(partnerId)
    try {
      const response = await fetch("/api/0x/partners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId, telegramChatId }),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({ type: "success", message: "Partner expulsado correctamente" })
        setTimeout(() => router.refresh(), 1500)
      } else {
        setNotification({ type: "error", message: result.error || "Error al expulsar" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setExpellingPartner(null)
    setTimeout(() => setNotification(null), 3000)
  }

  const handleReactivatePartner = async (partnerId: string) => {
    try {
      const response = await fetch("/api/0x/partners", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId, active: true }),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({ type: "success", message: "Partner reactivado" })
        setTimeout(() => router.refresh(), 1500)
      } else {
        setNotification({ type: "error", message: result.error || "Error" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleResend = async (leadId: number, offerPrice: number) => {
    try {
      const response = await fetch("/api/0x/resend-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, offerPrice }),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({ type: "success", message: `Lead #${leadId} reenviado con oferta de ${offerPrice}€` })
        setResendLead(null)
        setTimeout(() => {
          router.refresh()
        }, 2000)
      } else {
        setNotification({ type: "error", message: result.message || "Error al reenviar" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }

    setTimeout(() => setNotification(null), 3000)
  }

  const handleLogout = async () => {
    await fetch("/api/0x/auth", { method: "DELETE" })
    router.push("/0x")
  }

  const serviceEmojis: Record<string, string> = {
    fontanero: "🔧",
    electricista: "⚡",
    cerrajero: "🔑",
    desatasco: "🚿",
    calderas: "🔥",
  }

  const statusColors: Record<string, string> = {
    pending: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
    accepted: "text-green-500 border-green-500/30 bg-green-500/10",
    rejected: "text-red-500 border-red-500/30 bg-red-500/10",
  }

  const funnelStepLabels: Record<string, string> = {
    welcome: "Inicio",
    service: "Servicio",
    problem: "Problema",
    city: "Ciudad",
    phone: "Teléfono",
    name: "Nombre",
    complete: "Completado",
  }

  const goToPartners = () => {
    router.push("/0x/partners")
  }

  const handleClearChannel = async (service: string) => {
    setClearingChannel(service)
    try {
      const response = await fetch("/api/0x/clear-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service }),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({
          type: "success",
          message: `${result.deletedCount} mensajes eliminados de ${service}`,
        })
      } else {
        setNotification({ type: "error", message: result.error || "Error al limpiar" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setClearingChannel(null)
    setShowClearModal(false)
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 border ${
            notification.type === "success"
              ? "border-green-500/50 bg-green-500/20 text-green-400"
              : "border-red-500/50 bg-red-500/20 text-red-400"
          }`}
        >
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      {resendLead && <ResendModal lead={resendLead} onClose={() => setResendLead(null)} onResend={handleResend} />}

      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md border border-zinc-700 bg-zinc-900 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold tracking-wider text-red-500">LIMPIAR CANALES TELEGRAM</h3>
              <button onClick={() => setShowClearModal(false)} className="p-1 hover:bg-zinc-800 transition-colors">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 mb-6">
              Selecciona un canal para eliminar todos los mensajes. Esta acción no se puede deshacer.
            </p>

            <div className="space-y-2">
              {["fontanero", "electricista", "cerrajero", "calderas"].map((service) => (
                <button
                  key={service}
                  onClick={() => handleClearChannel(service)}
                  disabled={clearingChannel !== null}
                  className={`w-full py-3 px-4 border text-left flex items-center justify-between transition-all ${
                    clearingChannel === service
                      ? "border-red-500 bg-red-500/20 text-red-400"
                      : "border-zinc-700 hover:border-red-500/50 hover:bg-red-500/10"
                  } disabled:opacity-50`}
                >
                  <span className="font-medium capitalize">{service}</span>
                  {clearingChannel === service ? (
                    <span className="text-xs">Limpiando...</span>
                  ) : (
                    <Trash2 className="w-4 h-4 text-red-500" />
                  )}
                </button>
              ))}
            </div>

            <p className="text-[10px] text-zinc-600 mt-4">
              Nota: Solo se pueden eliminar mensajes de las últimas 48 horas (limitación de Telegram).
            </p>
          </div>
        </div>
      )}

      <header className="relative z-10 border-b border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-[#FF4D00] flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D00]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-wider">RAPIDFIX</h1>
              <p className="text-[10px] sm:text-xs text-zinc-500 tracking-widest hidden sm:block">CONTROL PANEL</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Date filter dropdown */}
            <div className="relative">
              <button
                onClick={() => setDateFilterOpen(!dateFilterOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-zinc-700 hover:border-zinc-600 bg-zinc-900/50 text-xs sm:text-sm"
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF4D00]" />
                <span className="hidden sm:inline">{dateRangeLabels[stats.dateRange] || "Todo"}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {dateFilterOpen && (
                <div className="absolute right-0 mt-1 w-40 border border-zinc-700 bg-zinc-900 z-50">
                  {Object.entries(dateRangeLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => handleDateFilter(key)}
                      className={`w-full px-3 py-2 text-left text-xs hover:bg-zinc-800 ${
                        stats.dateRange === key ? "text-[#FF4D00] bg-zinc-800/50" : ""
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Partners button - now navigates to page */}
            <button
              onClick={goToPartners}
              className="flex items-center gap-2 px-3 py-2 border border-zinc-700 hover:border-[#FF4D00] hover:bg-[#FF4D00]/10 text-xs sm:text-sm transition-colors"
            >
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Partners</span>
              <span className="text-[#FF4D00]">{stats.partners}</span>
            </button>

            <div className="text-right hidden sm:block">
              <p className="text-xs text-zinc-500">SISTEMA ACTIVO</p>
              <p className="text-sm font-mono text-[#FF4D00]">
                {currentTime.toLocaleTimeString("es-ES", { hour12: false })}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 border border-zinc-700 hover:border-red-500/50 hover:bg-red-500/10 transition-all group"
            >
              <LogOut className="w-4 h-4 text-zinc-400 group-hover:text-red-500" />
            </button>

            {/* Clear Telegram button */}
            <button
              onClick={() => setShowClearModal(true)}
              className="flex items-center gap-2 px-3 py-2 border border-zinc-700 hover:border-red-500/50 hover:bg-red-500/10 text-xs sm:text-sm transition-colors"
              title="Limpiar canales Telegram"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
              <span className="hidden sm:inline text-red-400">Limpiar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#FF4D00]" />
            <span className="text-xs text-zinc-500 tracking-wider">FILTRAR POR PERÍODO</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(dateRangeLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleDateFilter(key)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border transition-all ${
                  stats.dateRange === key
                    ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                    : "border-zinc-700 hover:border-zinc-600 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {stats.dateRange && stats.dateRange !== "all" && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500">Mostrando datos de:</span>
            <span className="px-2 py-1 border border-[#FF4D00]/50 bg-[#FF4D00]/10 text-[#FF4D00] font-medium">
              {dateRangeLabels[stats.dateRange] || stats.dateRange}
            </span>
          </div>
        )}

        {/* KPIs - responsive grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <KPICard
            label="LEADS TOTALES"
            value={stats.total}
            icon={<Activity className="w-4 h-4 sm:w-5 sm:h-5" />}
            color="zinc"
          />
          <KPICard
            label="VENDIDOS"
            value={stats.sold}
            icon={<Target className="w-4 h-4 sm:w-5 sm:h-5" />}
            color="green"
            subtext={`${stats.conversionRate}%`}
          />
          <KPICard
            label="INGRESOS"
            value={`${stats.revenue.toFixed(0)}€`}
            icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
            color="orange"
          />
          <KPICard
            label="PARTNERS"
            value={stats.partners}
            icon={<Users className="w-4 h-4 sm:w-5 sm:h-5" />}
            color="blue"
            onClick={goToPartners}
          />
        </div>

        {/* Time-based stats - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <div className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Clock className="w-4 h-4 text-[#FF4D00]" />
              <h3 className="text-xs font-bold tracking-wider text-zinc-400">HOY</h3>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-bold">{stats.todayLeads}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">leads</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-green-500">{stats.todaySold}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">vendidos</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#FF4D00]">{stats.todayRevenue.toFixed(0)}€</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">ingresos</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-500">{stats.todayPotential.toFixed(0)}€</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">posibles ({stats.todayPending})</p>
              </div>
            </div>
          </div>

          <div className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <TrendingUp className="w-4 h-4 text-[#FF4D00]" />
              <h3 className="text-xs font-bold tracking-wider text-zinc-400">ÚLTIMOS 7 DÍAS</h3>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-bold">{stats.weekLeads}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">leads</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-green-500">{stats.weekSold}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">vendidos</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#FF4D00]">{stats.weekRevenue.toFixed(0)}€</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">ingresos</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-500">{stats.weekPotential.toFixed(0)}€</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">posibles ({stats.weekPending})</p>
              </div>
            </div>
          </div>
        </div>

        {/* By Service */}
        <div className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm p-4 sm:p-6">
          <h3 className="text-xs font-bold tracking-wider text-zinc-400 mb-4 sm:mb-6">POR SERVICIO</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
            {stats.byService.map((service: any) => (
              <div
                key={service.service}
                className="border border-zinc-800 bg-zinc-900/50 p-3 sm:p-4 hover:border-[#FF4D00]/30 transition-colors relative group"
              >
                <button
                  onClick={() => handleClearChannel(service.service)}
                  disabled={clearingChannel !== null}
                  className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 border border-zinc-700 hover:border-red-500/50 hover:bg-red-500/20 transition-all"
                  title={`Limpiar canal ${service.service}`}
                >
                  {clearingChannel === service.service ? (
                    <span className="text-[8px] text-red-400">...</span>
                  ) : (
                    <Trash2 className="w-3 h-3 text-red-500" />
                  )}
                </button>
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-lg sm:text-xl">{serviceEmojis[service.service] || "📋"}</span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">
                    {service.service}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-zinc-500">Total</span>
                    <span>{service.total}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-zinc-500">Vendidos</span>
                    <span className="text-green-500">{service.sold}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-zinc-500">€</span>
                    <span className="text-[#FF4D00]">{Number(service.revenue).toFixed(0)}€</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incomplete chats */}
        {stats.incompleteChats && stats.incompleteChats.length > 0 && (
          <div className="border border-red-500/30 bg-zinc-900/30 backdrop-blur-sm">
            <div className="p-3 sm:p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquareX className="w-4 h-4 text-red-500" />
                <h3 className="text-xs font-bold tracking-wider text-red-400">CHATS INCOMPLETOS</h3>
              </div>
              <span className="text-xs text-zinc-600">{stats.incompleteChats.length} abandonos</span>
            </div>
            <div className="divide-y divide-zinc-800/50 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
              {stats.incompleteChats.map((chat: any, index: number) => (
                <div
                  key={chat.session_id || index}
                  className="px-3 sm:px-4 py-3 hover:bg-zinc-800/20 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 border border-red-500/30 text-red-400 bg-red-500/10">
                        {funnelStepLabels[chat.last_step] || chat.last_step}
                      </span>
                      {chat.service && <span className="text-sm">{serviceEmojis[chat.service] || "📋"}</span>}
                      {chat.city && <span className="text-xs text-zinc-400">{chat.city}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-500 truncate">
                        {chat.user_messages?.slice(0, 100) || "Sin mensajes"}
                        {chat.user_messages?.length > 100 ? "..." : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] sm:text-xs text-zinc-600">
                        {new Date(chat.last_activity).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent leads */}
        <div className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
          <div className="p-3 sm:p-4 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="text-xs font-bold tracking-wider text-zinc-400">LEADS RECIENTES</h3>
            <span className="text-xs text-zinc-600">Últimos 15</span>
          </div>
          <div className="divide-y divide-zinc-800/50 max-h-[400px] sm:max-h-[500px] overflow-y-auto">
            {stats.recentLeads.map((lead: any) => (
              <div key={lead.id} className="px-3 sm:px-4 py-3 hover:bg-zinc-800/20 transition-colors">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <span className="text-lg hidden sm:block">{serviceEmojis[lead.service] || "📋"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium truncate text-sm">{lead.name || "Sin nombre"}</span>
                      <span className={`text-[10px] sm:text-xs px-2 py-0.5 border ${statusColors[lead.status]}`}>
                        {lead.status === "accepted" ? "VENDIDO" : lead.status === "pending" ? "PENDIENTE" : "RECHAZADO"}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-zinc-500 truncate mt-1">
                      {lead.city} - {lead.problem?.slice(0, 40)}...
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {lead.status === "pending" && (
                      <button
                        onClick={() => setResendLead(lead)}
                        className="p-2 border border-[#FF4D00]/30 hover:border-[#FF4D00] hover:bg-[#FF4D00]/10 transition-all group"
                        title="Reenviar con oferta"
                      >
                        <Send className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF4D00]" />
                      </button>
                    )}
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#FF4D00]">{Number(lead.lead_price || 0).toFixed(0)}€</p>
                      <p className="text-[10px] text-zinc-600">
                        {new Date(lead.created_at).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel stats */}
        {stats.funnelStats.length > 0 && (
          <div className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm p-4 sm:p-6">
            <h3 className="text-xs font-bold tracking-wider text-zinc-400 mb-4 sm:mb-6">FUNNEL DEL CHAT (7 DÍAS)</h3>
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-xs sm:text-sm min-w-[500px]">
                <thead>
                  <tr className="text-[10px] sm:text-xs text-zinc-500 border-b border-zinc-800">
                    <th className="text-left py-2 font-medium">FECHA</th>
                    <th className="text-right py-2 font-medium">SESIONES</th>
                    <th className="text-right py-2 font-medium">SERVICIO</th>
                    <th className="text-right py-2 font-medium">CIUDAD</th>
                    <th className="text-right py-2 font-medium">TELÉFONO</th>
                    <th className="text-right py-2 font-medium">OK</th>
                    <th className="text-right py-2 font-medium">%</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.funnelStats.map((day: any) => (
                    <tr key={day.date} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                      <td className="py-2">
                        {new Date(day.date).toLocaleDateString("es-ES", { day: "2-digit", month: "short" })}
                      </td>
                      <td className="text-right py-2">{day.total_sessions}</td>
                      <td className="text-right py-2">{day.selected_service}</td>
                      <td className="text-right py-2">{day.provided_city}</td>
                      <td className="text-right py-2">{day.provided_phone}</td>
                      <td className="text-right py-2 text-green-500">{day.completed_leads}</td>
                      <td className="text-right py-2 text-[#FF4D00]">{Number(day.conversion_rate || 0).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="pt-4 sm:pt-8 border-t border-zinc-800/50 flex items-center justify-between text-[10px] sm:text-xs text-zinc-600">
          <span>RAPIDFIX v1.0.0</span>
          <span className="hidden sm:inline">Sistema activo desde 2025</span>
        </div>
      </main>
    </div>
  )
}
