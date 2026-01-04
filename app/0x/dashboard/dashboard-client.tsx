"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Users,
  DollarSign,
  Activity,
  LogOut,
  Zap,
  Send,
  X,
  ChevronDown,
  Trash2,
  MessageCircle,
  Plus,
  Phone,
  MapPin,
  Briefcase,
  Edit2,
  CreditCard,
  Copy,
  Check,
  Link,
  Filter,
  RotateCcw,
} from "lucide-react"

interface Partner {
  id: string
  name: string
  phone: string
  services: string[]
  cities: string[]
  active: boolean
  created_at: string
}

interface Lead {
  id: string
  name: string
  phone: string
  city: string
  service: string
  problem: string
  status: string
  lead_price: number
  partner_id: string | null
  created_at: string
  requested_date: string | null
}

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
  recentLeads: Lead[]
  byService: any[]
  funnelStats: any[]
  partners: number
  partnersList: Partner[]
  ownerTelegramId: string
  conversionRate: string
  incompleteChats: any[]
  dateRange: string
}

// Define the props interface for the component
interface DashboardClientProps {
  initialStats: Stats
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
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  color: "green" | "orange" | "zinc" | "blue"
}) {
  const colors = {
    green: "border-green-500/30",
    orange: "border-[#FF4D00]/30",
    zinc: "border-zinc-700",
    blue: "border-blue-500/30",
  }

  const textColors = {
    green: "text-green-500",
    orange: "text-[#FF4D00]",
    zinc: "text-zinc-100",
    blue: "text-blue-500",
  }

  return (
    <div className={`border ${colors[color]} bg-zinc-900/30 backdrop-blur-sm p-4 sm:p-6`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-zinc-500 tracking-wider">{label}</span>
        <div className={textColors[color]}>{icon}</div>
      </div>
      <p className={`text-2xl sm:text-4xl font-bold tracking-tight ${textColors[color]}`}>{value}</p>
    </div>
  )
}

function PartnerModal({
  partner,
  onClose,
  onSave,
}: {
  partner: Partner | null
  onClose: () => void
  onSave: (data: any) => void
}) {
  const [name, setName] = useState(partner?.name || "")
  const [phone, setPhone] = useState(partner?.phone || "")
  const [services, setServices] = useState<string[]>(partner?.services || [])
  const [cities, setCities] = useState(partner?.cities?.join(", ") || "")
  const [saving, setSaving] = useState(false)

  const allServices = ["fontanero", "electricista", "cerrajero", "desatasco", "calderas"]

  const toggleService = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service))
    } else {
      setServices([...services, service])
    }
  }

  const handleSave = async () => {
    if (!name || !phone || services.length === 0) return
    setSaving(true)
    await onSave({
      id: partner?.id,
      name,
      phone,
      services,
      cities: cities
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    })
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md border border-zinc-700 bg-zinc-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold tracking-wider text-[#FF4D00]">
            {partner ? "EDITAR PARTNER" : "NUEVO PARTNER"}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500 block mb-1">NOMBRE</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan García"
              className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">TELÉFONO</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="612345678"
              className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-2">SERVICIOS</label>
            <div className="flex flex-wrap gap-2">
              {allServices.map((service) => (
                <button
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`px-3 py-1.5 text-xs font-medium border transition-colors capitalize ${
                    services.includes(service)
                      ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                      : "border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">CIUDADES (separadas por coma)</label>
            <input
              type="text"
              value={cities}
              onChange={(e) => setCities(e.target.value)}
              placeholder="Barcelona, Madrid, Valencia"
              className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !name || !phone || services.length === 0}
          className="w-full mt-6 py-3 bg-[#FF4D00] text-black font-bold tracking-wider hover:bg-[#FF4D00]/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "GUARDANDO..." : partner ? "ACTUALIZAR" : "CREAR PARTNER"}
        </button>
      </div>
    </div>
  )
}

export function DashboardClient({ initialStats }: DashboardClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [stats, setStats] = useState<Stats>(
    initialStats || {
      total: 0,
      sold: 0,
      revenue: 0,
      todayLeads: 0,
      todaySold: 0,
      todayRevenue: 0,
      todayPending: 0,
      todayPotential: 0,
      weekLeads: 0,
      weekSold: 0,
      weekRevenue: 0,
      weekPending: 0,
      weekPotential: 0,
      recentLeads: [],
      byService: [],
      funnelStats: [],
      partners: 0,
      partnersList: [],
      ownerTelegramId: "",
      conversionRate: "0",
      incompleteChats: [],
      dateRange: "all",
    },
  )
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [dateFilterOpen, setDateFilterOpen] = useState(false)
  const dateButtonRef = useRef<HTMLButtonElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const [updatingLead, setUpdatingLead] = useState<string | null>(null)
  const [showPartnerModal, setShowPartnerModal] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [assigningLead, setAssigningLead] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"leads" | "partners" | "pagos">("leads")
  const [partnerLeadDropdown, setPartnerLeadDropdown] = useState<string | null>(null)
  const [generatingPayment, setGeneratingPayment] = useState<string | null>(null)
  const [paymentPrice, setPaymentPrice] = useState<Record<string, number>>({})
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [generatedLinks, setGeneratedLinks] = useState<Record<string, string>>({})
  const [paymentFilter, setPaymentFilter] = useState<"all" | "pending" | "paid">("all")
  const [professionFilter, setProfessionFilter] = useState<string>("all")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dateFilterRef = useRef<HTMLDivElement>(null)
  const [copiedLeadId, setCopiedLeadId] = useState<string | null>(null)
  const [showTrashed, setShowTrashed] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPartnerLeadDropdown(null)
      }
      // Close date filter dropdown if clicking outside of it
      if (dateFilterRef.current && !dateFilterRef.current.contains(event.target as Node)) {
        setDateFilterOpen(false)
      }
    }

    if (partnerLeadDropdown || dateFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [partnerLeadDropdown, dateFilterOpen])

  useEffect(() => {
    if (dateFilterOpen && dateButtonRef.current) {
      const rect = dateButtonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      })
    }
  }, [dateFilterOpen])

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
    assigned: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    paid: "text-green-500 border-green-500/30 bg-green-500/10",
    accepted: "text-green-500 border-green-500/30 bg-green-500/10",
    rejected: "text-red-500 border-red-500/30 bg-red-500/10",
    client: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    trashed: "text-zinc-500 border-zinc-700/30 bg-zinc-700/10", // Added for trashed status
  }

  const statusLabels: Record<string, string> = {
    pending: "PENDIENTE",
    assigned: "ASIGNADO",
    paid: "PAGADO",
    accepted: "VENDIDO",
    rejected: "RECHAZADO",
    client: "CLIENTE",
    trashed: "PAP. ELIMINADOS", // Added for trashed status
  }

  const openWhatsAppLead = (lead: Lead) => {
    const phone = lead.phone?.replace(/\D/g, "") || ""
    const phoneWithCountry = phone.startsWith("34") ? phone : `34${phone}`
    const whenText = lead.requested_date ? ` para ${lead.requested_date}` : ""
    const message = encodeURIComponent(
      `Hola! Veo que has solicitado servicio de ${lead.service || "urgencia"} en ${lead.city || "tu zona"}${whenText}. Te escribo para confirmar si todavía necesitas el servicio y asignarte un profesional. ¿Sigue en pie?`,
    )
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, "_blank")
  }

  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    setUpdatingLead(leadId)
    try {
      const response = await fetch("/api/0x/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status: newStatus }),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({ type: "success", message: `Lead actualizado a ${statusLabels[newStatus]}` })
        // Optimistically update local state for immediate feedback, then refresh for actual data
        setStats((prevStats) => ({
          ...prevStats,
          recentLeads: prevStats.recentLeads.map((lead) =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead,
          ),
        }))
        setTimeout(() => router.refresh(), 1000)
      } else {
        setNotification({ type: "error", message: result.error || "Error al actualizar" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setUpdatingLead(null)
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAssignPartner = async (leadId: string, partnerId: string) => {
    setAssigningLead(leadId)
    try {
      const response = await fetch("/api/0x/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, partnerId }),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({ type: "success", message: "Partner asignado correctamente" })
        // Optimistically update local state
        setStats((prevStats) => ({
          ...prevStats,
          recentLeads: prevStats.recentLeads.map((lead) =>
            lead.id === leadId ? { ...lead, partner_id: partnerId } : lead,
          ),
        }))
        setTimeout(() => router.refresh(), 1000)
      } else {
        setNotification({ type: "error", message: result.error || "Error al asignar" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setAssigningLead(null)
    setTimeout(() => setNotification(null), 3000)
  }

  const handleSavePartner = async (data: any) => {
    try {
      const response = await fetch("/api/0x/manual-partners", {
        method: data.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({ type: "success", message: data.id ? "Partner actualizado" : "Partner creado" })
        setShowPartnerModal(false)
        setEditingPartner(null)
        setTimeout(() => router.refresh(), 1000)
      } else {
        setNotification({ type: "error", message: result.error || "Error" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleDeletePartner = async (partnerId: string) => {
    if (!confirm("¿Seguro que quieres eliminar este partner?")) return

    try {
      const response = await fetch("/api/0x/manual-partners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId }),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({ type: "success", message: "Partner eliminado" })
        setTimeout(() => router.refresh(), 1000)
      } else {
        setNotification({ type: "error", message: result.error || "Error" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const getPartnerName = (partnerId: string | null) => {
    if (!partnerId) return null
    const partner = stats.partnersList?.find((p) => p.id === partnerId)
    return partner?.name || null
  }

  const openWhatsAppPartnerOffer = (partner: Partner, lead: Lead) => {
    const phone = partner.phone?.replace(/\D/g, "") || ""
    const phoneWithCountry = phone.startsWith("34") ? phone : `34${phone}`
    const whenText = lead.requested_date ? ` Lo necesita: ${lead.requested_date}.` : ""
    const message = encodeURIComponent(
      `Hola ${partner.name}! Tenemos un cliente que necesita ${lead.service} en ${lead.city}.${whenText} El problema es: "${lead.problem?.slice(0, 100)}". ¿Te interesa este trabajo?`,
    )
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, "_blank")
    setPartnerLeadDropdown(null)
  }

  const copyLeadForGroup = (lead: Lead) => {
    const whenText = lead.requested_date ? `📅 *Cuándo:* ${lead.requested_date}` : "📅 *Cuándo:* Lo antes posible"
    const message = `🚨 *NUEVO TRABAJO DISPONIBLE* 🚨

${serviceEmojis[lead.service] || "📋"} *Servicio:* ${lead.service?.toUpperCase()}
📍 *Zona:* ${lead.city}
${whenText}

📝 *Problema:*
${lead.problem?.slice(0, 150)}${(lead.problem?.length || 0) > 150 ? "..." : ""}

━━━━━━━━━━━━━━━━━━
✅ *Reacciona a este mensaje si estás disponible*
━━━━━━━━━━━━━━━━━━`

    navigator.clipboard.writeText(message)
    setCopiedLeadId(lead.id)
    setTimeout(() => setCopiedLeadId(null), 2000)
  }

  const visibleLeads = stats.recentLeads.filter((lead) =>
    showTrashed ? lead.status === "trashed" : lead.status !== "trashed",
  )

  const trashedCount = stats.recentLeads.filter((lead) => lead.status === "trashed").length
  const activeCount = stats.recentLeads.filter((lead) => lead.status !== "trashed").length

  const pendingLeads = stats.recentLeads.filter((lead) => lead.status === "pending")
  const assignedLeads = stats.recentLeads.filter((lead) => lead.partner_id)

  const allProfessions = ["fontanero", "electricista", "cerrajero", "desatasco", "calderas"]
  const filteredPartners =
    stats.partnersList?.filter((partner) => {
      if (professionFilter === "all") return true
      return partner.services?.includes(professionFilter)
    }) || []

  const filteredPagosLeads = assignedLeads.filter((lead) => {
    if (paymentFilter === "all") return true
    if (paymentFilter === "paid") return lead.status === "paid"
    if (paymentFilter === "pending") return lead.status !== "paid"
    return true
  })

  const handleGeneratePaymentLink = async (lead: Lead) => {
    const price = paymentPrice[lead.id] || lead.lead_price || 35
    setGeneratingPayment(lead.id)

    try {
      const response = await fetch("/api/0x/generate-payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.id,
          price,
          leadInfo: {
            service: lead.service,
            city: lead.city,
            problem: lead.problem,
          },
        }),
      })

      const result = await response.json()

      if (result.success && result.url) {
        setGeneratedLinks((prev) => ({ ...prev, [lead.id]: result.url }))
        setNotification({ type: "success", message: "Link de pago generado" })
      } else {
        setNotification({ type: "error", message: result.error || "Error al generar link" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setGeneratingPayment(null)
    setTimeout(() => setNotification(null), 3000)
  }

  const handleCopyLink = (leadId: string, link: string) => {
    navigator.clipboard.writeText(link)
    setCopiedLink(leadId)
    setNotification({ type: "success", message: "Link copiado al portapapeles" })
    setTimeout(() => {
      setCopiedLink(null)
      setNotification(null)
    }, 2000)
  }

  const handleTrashLead = async (leadId: string, restore = false) => {
    setUpdatingLead(leadId)
    try {
      const response = await fetch("/api/0x/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status: restore ? "pending" : "trashed" }),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({
          type: "success",
          message: restore ? "Lead restaurado" : "Lead movido a trash",
        })
        setStats((prevStats) => ({
          ...prevStats,
          recentLeads: prevStats.recentLeads.map((lead) =>
            lead.id === leadId ? { ...lead, status: restore ? "pending" : "trashed" } : lead,
          ),
        }))
        setTimeout(() => router.refresh(), 1000)
      } else {
        setNotification({ type: "error", message: result.error || "Error" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setUpdatingLead(null)
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

      {(showPartnerModal || editingPartner) && (
        <PartnerModal
          partner={editingPartner}
          onClose={() => {
            setShowPartnerModal(false)
            setEditingPartner(null)
          }}
          onSave={handleSavePartner}
        />
      )}

      {/* Header */}
      <header className="relative z-10 border-b border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-[#FF4D00] flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D00]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-wider">RAPIDFIX</h1>
              <p className="text-[10px] sm:text-xs text-zinc-500 tracking-widest hidden sm:block">PANEL DE CONTROL</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Date filter */}
            <div className="relative z-50" ref={dateFilterRef}>
              <button
                ref={dateButtonRef}
                onClick={() => setDateFilterOpen(!dateFilterOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-zinc-700 bg-zinc-900 hover:border-zinc-600 transition-colors text-xs"
              >
                <Filter className="w-3 h-3" />
                <span className="hidden sm:inline">{dateRangeLabels[stats.dateRange] || "Todo"}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${dateFilterOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

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
          </div>
        </div>
      </header>

      {dateFilterOpen && (
        <div
          className="fixed w-40 border border-zinc-700 bg-zinc-900 z-[9999] shadow-2xl"
          style={{ top: dropdownPosition.top, right: dropdownPosition.right }}
        >
          {Object.entries(dateRangeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleDateFilter(key)}
              className={`w-full px-3 py-2 text-left text-xs hover:bg-zinc-800 ${
                stats.dateRange === key ? "text-[#FF4D00]" : "text-zinc-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <KPICard
            label="INGRESOS TOTALES"
            value={`${stats.revenue.toFixed(0)}€`}
            icon={<DollarSign className="w-5 h-5" />}
            color="orange"
          />
          <KPICard label="LEADS VENDIDOS" value={stats.sold} icon={<Activity className="w-5 h-5" />} color="green" />
          <KPICard label="PARTNERS" value={stats.partners} icon={<Users className="w-5 h-5" />} color="blue" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-zinc-800 pb-2">
          <button
            onClick={() => {
              setActiveTab("leads")
              setShowTrashed(false) // Reset trash toggle when switching to leads tab
            }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "leads" ? "text-[#FF4D00] border-b-2 border-[#FF4D00]" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Leads ({activeCount} / {trashedCount} eliminados)
          </button>
          <button
            onClick={() => setActiveTab("partners")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "partners"
                ? "text-[#FF4D00] border-b-2 border-[#FF4D00]"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Partners ({stats.partners})
          </button>
          <button
            onClick={() => setActiveTab("pagos")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "pagos" ? "text-[#FF4D00] border-b-2 border-[#FF4D00]" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Pagos ({filteredPagosLeads.length})
          </button>
        </div>

        {/* Leads Tab */}
        {activeTab === "leads" && (
          <div className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-wider text-zinc-400">
                {showTrashed ? "LEADS EN TRASH" : "TODOS LOS LEADS"}
              </h3>
              <button
                onClick={() => setShowTrashed(!showTrashed)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold border transition-colors ${
                  showTrashed
                    ? "border-red-500 bg-red-500/20 text-red-500"
                    : "border-zinc-700 hover:border-zinc-600 text-zinc-400"
                }`}
              >
                <Trash2 className="w-3 h-3" />
                {showTrashed ? `VOLVER (${activeCount})` : `TRASH (${trashedCount})`}
              </button>
            </div>
            <div className="divide-y divide-zinc-800/50 max-h-[600px] overflow-y-auto">
              {visibleLeads.map((lead: Lead) => (
                <div
                  key={lead.id}
                  className={`px-4 py-4 hover:bg-zinc-800/20 transition-colors ${showTrashed ? "opacity-60" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Lead info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-xl">{serviceEmojis[lead.service] || "📋"}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{lead.name || "Sin nombre"}</span>
                          <span
                            className={`text-xs px-2 py-0.5 border ${statusColors[lead.status] || statusColors.pending}`}
                          >
                            {statusLabels[lead.status] || "TRASH"}
                          </span>
                          {getPartnerName(lead.partner_id) && (
                            <span className="text-xs px-2 py-0.5 border border-blue-500/30 text-blue-400 bg-blue-500/10">
                              {getPartnerName(lead.partner_id)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400">
                          {lead.city} - {lead.service}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">{lead.problem?.slice(0, 60)}...</p>
                        {lead.phone && <p className="text-xs text-zinc-300 font-mono mt-1">{lead.phone}</p>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      {showTrashed ? (
                        <button
                          onClick={() => handleTrashLead(lead.id, true)}
                          disabled={updatingLead === lead.id}
                          className="p-2 border border-green-500/30 hover:border-green-500 hover:bg-green-500/10 transition-all"
                          title="Restaurar lead"
                        >
                          <RotateCcw className="w-4 h-4 text-green-500" />
                        </button>
                      ) : (
                        <>
                          {/* Copy lead button for WhatsApp group */}
                          <button
                            onClick={() => copyLeadForGroup(lead)}
                            className={`p-2 border transition-all ${
                              copiedLeadId === lead.id
                                ? "border-green-500 bg-green-500/20"
                                : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800"
                            }`}
                            title="Copiar para grupo WhatsApp"
                          >
                            {copiedLeadId === lead.id ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-zinc-400" />
                            )}
                          </button>

                          {/* WhatsApp */}
                          <button
                            onClick={() => openWhatsAppLead(lead)}
                            className="p-2 border border-green-500/30 hover:border-green-500 hover:bg-green-500/10 transition-all"
                            title="Hablar por WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4 text-green-500" />
                          </button>

                          {/* Status change dropdown */}
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            disabled={updatingLead === lead.id}
                            className="bg-zinc-800 border border-zinc-700 px-2 py-2 text-xs focus:border-[#FF4D00] outline-none"
                          >
                            <option value="pending">Pendiente</option>
                            <option value="client">Cliente</option>
                            <option value="accepted">Vendido</option>
                            <option value="rejected">Rechazado</option>
                          </select>

                          {/* Assign partner dropdown */}
                          <select
                            value={lead.partner_id || ""}
                            onChange={(e) => handleAssignPartner(lead.id, e.target.value)}
                            disabled={assigningLead === lead.id}
                            className="bg-zinc-800 border border-zinc-700 px-2 py-2 text-xs focus:border-[#FF4D00] outline-none max-w-[120px]"
                          >
                            <option value="">Sin asignar</option>
                            {stats.partnersList?.map((partner) => (
                              <option key={partner.id} value={partner.id}>
                                {partner.name}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={() => handleTrashLead(lead.id)}
                            disabled={updatingLead === lead.id}
                            className="p-2 border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 transition-all"
                            title="Mover a trash"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </>
                      )}

                      {/* Price and date */}
                      <div className="text-right min-w-[60px]">
                        {(lead.status === "accepted" || lead.status === "paid") && (
                          <p className="text-sm font-bold text-[#FF4D00]">{Number(lead.lead_price || 0).toFixed(0)}€</p>
                        )}
                        <p className="text-xs text-zinc-600">
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
              {visibleLeads.length === 0 && (
                <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                  {showTrashed ? "No hay leads en trash" : "No hay leads"}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Partners Tab */}
        {activeTab === "partners" && (
          <div className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
            <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-zinc-500" />
                <button
                  onClick={() => setProfessionFilter("all")}
                  className={`px-3 py-1.5 text-xs font-bold border transition-colors ${
                    professionFilter === "all"
                      ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                      : "border-zinc-700 hover:border-zinc-600 text-zinc-400"
                  }`}
                >
                  TODOS ({stats.partnersList?.length || 0})
                </button>
                {allProfessions.map((prof) => {
                  const count = stats.partnersList?.filter((p) => p.services?.includes(prof)).length || 0
                  if (count === 0) return null
                  return (
                    <button
                      key={prof}
                      onClick={() => setProfessionFilter(prof)}
                      className={`px-3 py-1.5 text-xs font-bold border transition-colors capitalize ${
                        professionFilter === prof
                          ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                          : "border-zinc-700 hover:border-zinc-600 text-zinc-400"
                      }`}
                    >
                      {serviceEmojis[prof]} {prof} ({count})
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => setShowPartnerModal(true)}
                className="flex items-center gap-2 px-3 py-2 bg-[#FF4D00] text-black text-xs font-bold hover:bg-[#FF4D00]/90 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                NUEVO PARTNER
              </button>
            </div>
            <div className="divide-y divide-zinc-800/50">
              {filteredPartners.map((partner: Partner) => (
                <div key={partner.id} className="px-4 py-4 hover:bg-zinc-800/20 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{partner.name}</span>
                        <span
                          className={`text-xs px-2 py-0.5 border ${
                            partner.active
                              ? "border-green-500/30 text-green-400 bg-green-500/10"
                              : "border-red-500/30 text-red-400 bg-red-500/10"
                          }`}
                        >
                          {partner.active ? "ACTIVO" : "INACTIVO"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {partner.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {partner.services?.join(", ")}
                        </span>
                        {partner.cities?.length > 0 && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {partner.cities?.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="relative" ref={partnerLeadDropdown === partner.id ? dropdownRef : null}>
                        <button
                          onClick={() => setPartnerLeadDropdown(partnerLeadDropdown === partner.id ? null : partner.id)}
                          className="flex items-center gap-1 px-3 py-2 border border-green-500/30 hover:border-green-500 hover:bg-green-500/10 transition-all text-xs text-green-500"
                          title="Enviar lead por WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="hidden sm:inline">Enviar Lead</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        {partnerLeadDropdown === partner.id && (
                          <div className="absolute right-0 top-full mt-1 w-72 border border-zinc-700 bg-zinc-900 z-[100] max-h-60 overflow-y-auto shadow-xl rounded-md">
                            {pendingLeads.length > 0 ? (
                              pendingLeads.map((lead) => (
                                <button
                                  key={lead.id}
                                  onClick={() => openWhatsAppPartnerOffer(partner, lead)}
                                  className="w-full px-3 py-3 text-left hover:bg-zinc-800 border-b border-zinc-800 last:border-0"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <span>{serviceEmojis[lead.service] || "📋"}</span>
                                    <span className="text-sm font-medium">{lead.service}</span>
                                    <span className="text-xs text-zinc-500">- {lead.city}</span>
                                  </div>
                                  <p className="text-xs text-zinc-400 truncate">{lead.problem?.slice(0, 50)}...</p>
                                </button>
                              ))
                            ) : (
                              <div className="px-3 py-4 text-center text-zinc-500 text-xs">No hay leads pendientes</div>
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => setEditingPartner(partner)}
                        className="p-2 border border-zinc-700 hover:border-[#FF4D00] hover:bg-[#FF4D00]/10 transition-all"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4 text-[#FF4D00]" />
                      </button>
                      <button
                        onClick={() => handleDeletePartner(partner.id)}
                        className="p-2 border border-zinc-700 hover:border-red-500 hover:bg-red-500/10 transition-all"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPartners.length === 0 && (
                <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                  {professionFilter === "all"
                    ? "No hay partners. Crea uno nuevo."
                    : `No hay partners de ${professionFilter}.`}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pagos Tab */}
        {activeTab === "pagos" && (
          <div className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
            <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-xs font-bold tracking-wider text-zinc-400">LEADS ASIGNADOS - GENERAR COBRO</h3>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-zinc-500" />
                <button
                  onClick={() => setPaymentFilter("all")}
                  className={`px-3 py-1.5 text-xs font-bold border transition-colors ${
                    paymentFilter === "all"
                      ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                      : "border-zinc-700 hover:border-zinc-600 text-zinc-400"
                  }`}
                >
                  TODOS ({assignedLeads.length})
                </button>
                <button
                  onClick={() => setPaymentFilter("pending")}
                  className={`px-3 py-1.5 text-xs font-bold border transition-colors ${
                    paymentFilter === "pending"
                      ? "border-yellow-500 bg-yellow-500/20 text-yellow-500"
                      : "border-zinc-700 hover:border-zinc-600 text-zinc-400"
                  }`}
                >
                  PENDIENTES ({assignedLeads.filter((l) => l.status !== "paid").length})
                </button>
                <button
                  onClick={() => setPaymentFilter("paid")}
                  className={`px-3 py-1.5 text-xs font-bold border transition-colors ${
                    paymentFilter === "paid"
                      ? "border-green-500 bg-green-500/20 text-green-500"
                      : "border-zinc-700 hover:border-zinc-600 text-zinc-400"
                  }`}
                >
                  PAGADOS ({assignedLeads.filter((l) => l.status === "paid").length})
                </button>
              </div>
            </div>
            <div className="divide-y divide-zinc-800/50 max-h-[600px] overflow-y-auto">
              {filteredPagosLeads.map((lead: Lead) => {
                const partner = stats.partnersList?.find((p) => p.id === lead.partner_id)
                const currentPrice = paymentPrice[lead.id] ?? lead.lead_price ?? 35
                const hasLink = generatedLinks[lead.id]
                const isPaid = lead.status === "paid"

                return (
                  <div
                    key={lead.id}
                    className={`px-4 py-4 hover:bg-zinc-800/20 transition-colors ${isPaid ? "opacity-70" : ""}`}
                  >
                    <div className="flex flex-col gap-3">
                      {/* Lead info row */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-xl">{serviceEmojis[lead.service] || "📋"}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{lead.service}</span>
                              <span className="text-xs text-zinc-500">en</span>
                              <span className="font-medium text-sm">{lead.city}</span>
                              {isPaid && (
                                <span className="text-xs px-2 py-0.5 border border-green-500/30 text-green-400 bg-green-500/10">
                                  PAGADO
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-400 truncate">{lead.problem?.slice(0, 80)}...</p>
                          </div>
                        </div>

                        {/* Partner assigned */}
                        {partner && (
                          <div className="flex items-center gap-2 px-3 py-2 border border-blue-500/30 bg-blue-500/10">
                            <Users className="w-4 h-4 text-blue-400" />
                            <div>
                              <p className="text-sm font-medium text-blue-400">{partner.name}</p>
                              <p className="text-xs text-zinc-500">{partner.phone}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {!isPaid && (
                        <>
                          {/* Payment generation row */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 border border-zinc-800 bg-zinc-800/30">
                            <div className="flex items-center gap-2 flex-1">
                              <CreditCard className="w-4 h-4 text-[#FF4D00]" />
                              <span className="text-xs text-zinc-400">Precio del lead:</span>
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={currentPrice}
                                  onChange={(e) =>
                                    setPaymentPrice((prev) => ({ ...prev, [lead.id]: Number(e.target.value) }))
                                  }
                                  className="w-20 bg-zinc-900 border border-zinc-700 px-2 py-1 text-sm font-bold text-[#FF4D00] focus:border-[#FF4D00] outline-none text-center"
                                  min={1}
                                />
                                <span className="text-sm font-bold text-[#FF4D00]">€</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Quick price buttons */}
                              {[25, 35, 45, 50].map((price) => (
                                <button
                                  key={price}
                                  onClick={() => setPaymentPrice((prev) => ({ ...prev, [lead.id]: price }))}
                                  className={`px-2 py-1 text-xs font-bold border transition-colors ${
                                    currentPrice === price
                                      ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                                      : "border-zinc-700 hover:border-zinc-600 text-zinc-400"
                                  }`}
                                >
                                  {price}€
                                </button>
                              ))}
                            </div>

                            <button
                              onClick={() => handleGeneratePaymentLink(lead)}
                              disabled={generatingPayment === lead.id}
                              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#FF4D00] text-black text-xs font-bold hover:bg-[#FF4D00]/90 transition-colors disabled:opacity-50"
                            >
                              {generatingPayment === lead.id ? (
                                "GENERANDO..."
                              ) : (
                                <>
                                  <Link className="w-4 h-4" />
                                  GENERAR LINK
                                </>
                              )}
                            </button>
                          </div>

                          {/* Generated link row */}
                          {hasLink && (
                            <div className="flex items-center gap-2 p-3 border border-green-500/30 bg-green-500/10">
                              <Check className="w-4 h-4 text-green-500 shrink-0" />
                              <input
                                type="text"
                                value={hasLink}
                                readOnly
                                className="flex-1 bg-transparent text-xs text-green-400 font-mono truncate outline-none"
                              />
                              <button
                                onClick={() => handleCopyLink(lead.id, hasLink)}
                                className="flex items-center gap-1 px-3 py-1.5 border border-green-500/50 hover:bg-green-500/20 transition-colors text-xs font-bold text-green-400"
                              >
                                {copiedLink === lead.id ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    COPIADO
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    COPIAR
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </>
                      )}

                      {isPaid && (
                        <div className="flex items-center gap-2 p-3 border border-green-500/30 bg-green-500/10">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-400 font-medium">Pago completado</span>
                          <span className="text-xs text-zinc-500 ml-auto">{lead.lead_price}€</span>
                          <button
                            onClick={() => handleUpdateLeadStatus(lead.id, "assigned")}
                            disabled={updatingLead === lead.id}
                            className="ml-2 px-3 py-1.5 text-xs font-bold border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20 transition-colors"
                          >
                            {updatingLead === lead.id ? "..." : "MARCAR NO PAGADO"}
                          </button>
                        </div>
                      )}

                      {!isPaid && (
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => handleUpdateLeadStatus(lead.id, "paid")}
                            disabled={updatingLead === lead.id}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold border border-green-500/50 text-green-400 hover:bg-green-500/20 transition-colors"
                          >
                            <Check className="w-3 h-3" />
                            {updatingLead === lead.id ? "..." : "MARCAR PAGADO MANUAL"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
              {filteredPagosLeads.length === 0 && (
                <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                  {paymentFilter === "all"
                    ? 'No hay leads asignados a partners. Asigna un partner a un lead en la pestaña "Leads".'
                    : paymentFilter === "paid"
                      ? "No hay leads pagados."
                      : "No hay leads pendientes de pago."}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
