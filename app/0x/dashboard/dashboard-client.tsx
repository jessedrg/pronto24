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
  X,
  ChevronDown,
  Trash2,
  MessageCircle,
  Plus,
  Phone,
  MapPin,
  Briefcase,
  Edit2,
  Copy,
  Check,
  Filter,
  RotateCcw,
  Clock,
  Maximize2,
  Save,
  GripVertical,
  Calendar,
  CheckCircle,
  CreditCard,
  UserCheck,
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
  service_time: string | null
  source?: string
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

interface DashboardClientProps {
  initialStats: Stats
}

const PIPELINE_STATUSES = [
  { key: "pending", label: "PENDIENTE", color: "yellow", icon: Clock },
  { key: "contacted", label: "CONTACTADO", color: "blue", icon: Phone },
  { key: "pending_appointment", label: "PDTE CITA", color: "cyan", icon: Calendar },
  { key: "confirmed", label: "CITA CONFIRMADA", color: "purple", icon: Calendar },
  { key: "completed", label: "TRABAJO ACABADO", color: "orange", icon: CheckCircle },
  { key: "paid", label: "PAGADO", color: "green", icon: CreditCard },
] as const

type PipelineStatus = (typeof PIPELINE_STATUSES)[number]["key"]

function KPICard({
  label,
  value,
  subvalue,
  icon,
  color,
}: {
  label: string
  value: string | number
  subvalue?: string
  icon: React.ReactNode
  color: "green" | "orange" | "zinc" | "blue" | "yellow" | "purple" | "cyan"
}) {
  const colors = {
    green: "border-green-500/30 bg-green-500/5",
    orange: "border-[#FF4D00]/30 bg-[#FF4D00]/5",
    zinc: "border-zinc-700 bg-zinc-800/30",
    blue: "border-blue-500/30 bg-blue-500/5",
    yellow: "border-yellow-500/30 bg-yellow-500/5",
    purple: "border-purple-500/30 bg-purple-500/5",
    cyan: "border-cyan-500/30 bg-cyan-500/5",
  }

  const textColors = {
    green: "text-green-500",
    orange: "text-[#FF4D00]",
    zinc: "text-zinc-100",
    blue: "text-blue-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
    cyan: "text-cyan-500",
  }

  return (
    <div className={`border ${colors[color]} p-3`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-zinc-500 tracking-wider">{label}</span>
        <div className={textColors[color]}>{icon}</div>
      </div>
      <p className={`text-lg font-bold tracking-tight ${textColors[color]}`}>{value}</p>
      {subvalue && <p className="text-[10px] text-zinc-500 mt-0.5">{subvalue}</p>}
    </div>
  )
}

function PartnerDetailModal({
  partner,
  leads,
  onClose,
  onLeadClick,
}: {
  partner: Partner
  leads: Lead[]
  onClose: () => void
  onLeadClick: (leadId: string) => void
}) {
  const partnerLeads = leads.filter((l) => l.partner_id === partner.id && l.status !== "trashed")

  const pendingLeads = partnerLeads.filter((l) =>
    ["pending", "contacted", "pending_appointment", "confirmed"].includes(l.status),
  )
  const completedLeads = partnerLeads.filter((l) => l.status === "completed")
  const paidLeads = partnerLeads.filter((l) => l.status === "paid")

  const pendingRevenue = completedLeads.reduce((sum, l) => sum + (Number(l.lead_price) || 0), 0)
  const totalRevenue = paidLeads.reduce((sum, l) => sum + (Number(l.lead_price) || 0), 0)

  const serviceEmojis: Record<string, string> = {
    fontanero: "🔧",
    electricista: "⚡",
    cerrajero: "🔑",
    desatasco: "🚿",
    calderas: "🔥",
  }

  const statusColors: Record<string, string> = {
    pending: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    contacted: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    pending_appointment: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    confirmed: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    completed: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    paid: "text-green-400 border-green-500/30 bg-green-500/10",
  }

  const statusLabels: Record<string, string> = {
    pending: "Pendiente",
    contacted: "Contactado",
    pending_appointment: "Pdte Cita",
    confirmed: "Cita",
    completed: "Acabado",
    paid: "Pagado",
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-hidden border border-zinc-700 bg-zinc-900 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-sm font-bold tracking-wider text-[#FF4D00] flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              {partner.name}
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              {partner.phone} • {partner.services?.join(", ")}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 p-4 border-b border-zinc-800 shrink-0">
          <div className="text-center p-2 border border-yellow-500/30 bg-yellow-500/5">
            <p className="text-lg font-bold text-yellow-500">{pendingLeads.length}</p>
            <p className="text-[10px] text-zinc-500">EN PROCESO</p>
          </div>
          <div className="text-center p-2 border border-orange-500/30 bg-orange-500/5">
            <p className="text-lg font-bold text-orange-500">{completedLeads.length}</p>
            <p className="text-[10px] text-zinc-500">PDTE PAGO ({pendingRevenue}€)</p>
          </div>
          <div className="text-center p-2 border border-green-500/30 bg-green-500/5">
            <p className="text-lg font-bold text-green-500">{paidLeads.length}</p>
            <p className="text-[10px] text-zinc-500">PAGADOS ({totalRevenue}€)</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {pendingLeads.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-yellow-500 mb-2">EN PROCESO ({pendingLeads.length})</h4>
              <div className="space-y-2">
                {pendingLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => onLeadClick(lead.id)}
                    className="p-2 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{serviceEmojis[lead.service] || "📋"}</span>
                        <span className="text-sm font-medium">{lead.name || "Sin nombre"}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 border ${statusColors[lead.status]}`}>
                          {statusLabels[lead.status]}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500">{lead.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completedLeads.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-orange-500 mb-2">PENDIENTE DE PAGO ({completedLeads.length})</h4>
              <div className="space-y-2">
                {completedLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => onLeadClick(lead.id)}
                    className="p-2 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{serviceEmojis[lead.service] || "📋"}</span>
                        <span className="text-sm font-medium">{lead.name || "Sin nombre"}</span>
                        {lead.lead_price > 0 && (
                          <span className="text-xs font-bold text-[#FF4D00]">{lead.lead_price}€</span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-500">{lead.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {paidLeads.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-green-500 mb-2">PAGADOS ({paidLeads.length})</h4>
              <div className="space-y-2">
                {paidLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => onLeadClick(lead.id)}
                    className="p-2 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors opacity-70"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{serviceEmojis[lead.service] || "📋"}</span>
                        <span className="text-sm font-medium">{lead.name || "Sin nombre"}</span>
                        {lead.lead_price > 0 && (
                          <span className="text-xs font-bold text-green-500">{lead.lead_price}€</span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-500">{lead.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {partnerLeads.length === 0 && (
            <div className="text-center text-zinc-500 text-sm py-8">No hay trabajos asignados a este partner</div>
          )}
        </div>
      </div>
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

function LeadModal({
  onClose,
  onSave,
}: {
  onClose: () => void
  onSave: (data: any) => void
}) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [service, setService] = useState("")
  const [problem, setProblem] = useState("")
  const [saving, setSaving] = useState(false)

  const allServices = ["fontanero", "electricista", "cerrajero", "desatasco", "calderas"]

  const handleSave = async () => {
    if (!name || !phone || !service) return
    setSaving(true)
    await onSave({ name, phone, city, service, problem, source: "manual" })
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md border border-zinc-700 bg-zinc-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold tracking-wider text-[#FF4D00]">NUEVO LEAD</h3>
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-500 block mb-1">NOMBRE *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan"
                className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">TELÉFONO *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="612345678"
                className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">CIUDAD</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Barcelona"
              className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-2">SERVICIO *</label>
            <div className="flex flex-wrap gap-2">
              {allServices.map((s) => (
                <button
                  key={s}
                  onClick={() => setService(s)}
                  className={`px-3 py-1.5 text-xs font-medium border transition-colors capitalize ${
                    service === s
                      ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                      : "border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">PROBLEMA</label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Describe el problema..."
              rows={2}
              className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !name || !phone || !service}
          className="w-full mt-6 py-3 bg-[#FF4D00] text-black font-bold tracking-wider hover:bg-[#FF4D00]/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "GUARDANDO..." : "CREAR LEAD"}
        </button>
      </div>
    </div>
  )
}

function LeadDetailModal({
  lead,
  partners,
  onClose,
  onSave,
  onStatusChange,
  onPartnerAssign,
  onDelete,
}: {
  lead: Lead
  partners: Partner[]
  onClose: () => void
  onSave: (data: Partial<Lead>) => Promise<void>
  onStatusChange: (status: string) => void
  onPartnerAssign: (partnerId: string) => void
  onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState(lead.name || "")
  const [phone, setPhone] = useState(lead.phone || "")
  const [city, setCity] = useState(lead.city || "")
  const [service, setService] = useState(lead.service || "")
  const [problem, setProblem] = useState(lead.problem || "")
  const [leadPrice, setLeadPrice] = useState(lead.lead_price || 0)
  const [serviceTime, setServiceTime] = useState(lead.service_time || "")
  const [localStatus, setLocalStatus] = useState(lead.status)
  const [localPartnerId, setLocalPartnerId] = useState(lead.partner_id)

  useEffect(() => {
    setName(lead.name || "")
    setPhone(lead.phone || "")
    setCity(lead.city || "")
    setService(lead.service || "")
    setProblem(lead.problem || "")
    setLeadPrice(lead.lead_price || 0)
    setServiceTime(lead.service_time || "")
    setLocalStatus(lead.status)
    setLocalPartnerId(lead.partner_id)
  }, [lead])

  const allServices = ["fontanero", "electricista", "cerrajero", "desatasco", "calderas"]

  const sourceLabels: Record<string, { label: string; color: string }> = {
    whatsapp: { label: "WhatsApp", color: "text-green-400" },
    call: { label: "Llamada", color: "text-blue-400" },
    chat: { label: "Chat IA", color: "text-purple-400" },
    manual: { label: "Manual", color: "text-zinc-400" },
  }

  const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: "Pendiente", color: "text-yellow-400" },
    contacted: { label: "Contactado", color: "text-blue-400" },
    confirmed: { label: "Cita Confirmada", color: "text-purple-400" },
    completed: { label: "Trabajo Acabado", color: "text-orange-400" },
    paid: { label: "Pagado", color: "text-green-400" },
    rejected: { label: "Rechazado", color: "text-red-400" },
  }

  const handleSave = async () => {
    setSaving(true)
    await onSave({
      name,
      phone,
      city,
      service,
      problem,
      lead_price: leadPrice,
      service_time: serviceTime || null,
    })
    setSaving(false)
    setEditing(false)
  }

  const handleStatusChangeLocal = (newStatus: string) => {
    setLocalStatus(newStatus)
    onStatusChange(newStatus)
  }

  const handlePartnerAssignLocal = (partnerId: string) => {
    setLocalPartnerId(partnerId || null)
    onPartnerAssign(partnerId)
  }

  const source = sourceLabels[lead.source || "chat"] || sourceLabels.chat
  const status = statusLabels[localStatus] || statusLabels.pending
  const partner = partners.find((p) => p.id === localPartnerId)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-zinc-700 bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold tracking-wider text-[#FF4D00]">LEAD #{lead.id}</h3>
            <span className={`text-xs px-2 py-0.5 border border-zinc-700 ${source.color}`}>{source.label}</span>
            <span className={`text-xs px-2 py-0.5 border border-zinc-700 ${status.color}`}>{status.label}</span>
          </div>
          <div className="flex items-center gap-2">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="p-2 hover:bg-zinc-800 transition-colors border border-zinc-700"
                title="Editar"
              >
                <Edit2 className="w-4 h-4 text-zinc-400" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={saving}
                className="p-2 bg-[#FF4D00] hover:bg-[#FF4D00]/90 transition-colors"
                title="Guardar"
              >
                <Save className="w-4 h-4 text-black" />
              </button>
            )}
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 transition-colors">
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 block mb-1">NOMBRE</label>
              {editing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                />
              ) : (
                <p className="text-sm font-medium">{name || "Sin nombre"}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">TELÉFONO</label>
              {editing ? (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm font-mono focus:border-[#FF4D00] outline-none"
                />
              ) : (
                <p className="text-sm font-mono">{phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 block mb-1">CIUDAD</label>
              {editing ? (
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                />
              ) : (
                <p className="text-sm">{city || "No especificada"}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">SERVICIO</label>
              {editing ? (
                <div className="flex flex-wrap gap-1">
                  {allServices.map((s) => (
                    <button
                      key={s}
                      onClick={() => setService(s)}
                      className={`px-2 py-1 text-xs border transition-colors capitalize ${
                        service === s
                          ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                          : "border-zinc-700 hover:border-zinc-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm capitalize">{service}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">PROBLEMA</label>
            {editing ? (
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none resize-none"
              />
            ) : (
              <p className="text-sm text-zinc-300 bg-zinc-800/50 p-3 border border-zinc-800">
                {problem || "Sin descripción"}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 block mb-1">PRECIO LEAD (€)</label>
              {editing ? (
                <input
                  type="number"
                  value={leadPrice}
                  onChange={(e) => setLeadPrice(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                />
              ) : (
                <p className="text-sm font-bold text-[#FF4D00]">{leadPrice ? `${leadPrice}€` : "Sin precio"}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">FECHA SERVICIO</label>
              {editing ? (
                <input
                  type="datetime-local"
                  value={serviceTime || ""}
                  onChange={(e) => setServiceTime(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                />
              ) : (
                <p className="text-sm">{serviceTime ? formatDate(serviceTime) : "No programado"}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
            <div>
              <label className="text-xs text-zinc-500 block mb-1">ESTADO</label>
              <select
                value={localStatus}
                onChange={(e) => handleStatusChangeLocal(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
              >
                <option value="pending">Pendiente</option>
                <option value="contacted">Contactado</option>
                <option value="pending_appointment">Pendiente de Cita</option>
                <option value="confirmed">Cita Confirmada</option>
                <option value="completed">Trabajo Acabado</option>
                <option value="paid">Pagado</option>
                <option value="rejected">Rechazado</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">PARTNER ASIGNADO</label>
              <select
                value={localPartnerId || ""}
                onChange={(e) => handlePartnerAssignLocal(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
              >
                <option value="">Sin asignar</option>
                {partners.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800 text-xs text-zinc-500">
            <div>
              <span className="block mb-1">CREADO</span>
              <span>{formatDate(lead.created_at)}</span>
            </div>
            {lead.requested_date && (
              <div>
                <span className="block mb-1">FECHA SOLICITADA</span>
                <span>{formatDate(lead.requested_date)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-zinc-800">
            <a
              href={`https://wa.me/34${phone?.replace(/\D/g, "")}?text=${encodeURIComponent(
                `Hola ${name || ""}, soy de RapidFix. He visto tu solicitud de ${service}. ¿Cuándo te vendría bien que pasara el técnico?`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium text-center transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={`tel:+34${phone?.replace(/\D/g, "")}`}
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium text-center transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Llamar
            </a>
            <button
              onClick={onDelete}
              className="py-2 px-4 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 text-red-400 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeadCard({
  lead,
  partners,
  onStatusChange,
  onPartnerAssign,
  onWhatsApp,
  onCopy,
  onTrash,
  onPriceChange,
  onExpand,
  copied,
  updating,
  onDragStart,
  isDragging,
}: {
  lead: Lead
  partners: Partner[]
  onStatusChange: (leadId: string, status: string) => void
  onPartnerAssign: (leadId: string, partnerId: string) => void
  onWhatsApp: () => void
  onCopy: () => void
  onTrash: () => void
  onPriceChange: (price: number) => void
  onExpand: () => void
  copied: boolean
  updating: boolean
  onDragStart?: (e: React.DragEvent) => void
  isDragging?: boolean
}) {
  const serviceEmojis: Record<string, string> = {
    fontanero: "🔧",
    electricista: "⚡",
    cerrajero: "🔑",
    desatasco: "🚿",
    calderas: "🔥",
  }

  const sourceLabels: Record<string, { label: string; color: string }> = {
    whatsapp: { label: "WA", color: "text-green-400 border-green-500/30 bg-green-500/10" },
    call: { label: "TEL", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
    chat: { label: "CHAT", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
    manual: { label: "MAN", color: "text-zinc-400 border-zinc-500/30 bg-zinc-500/10" },
  }

  const partner = partners.find((p) => p.id === lead.partner_id)
  const source = sourceLabels[lead.source || "chat"] || sourceLabels.chat

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`p-3 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/30 transition-all cursor-grab active:cursor-grabbing group ${
        isDragging ? "opacity-50 scale-95 border-[#FF4D00]" : ""
      }`}
      onClick={onExpand}
      data-lead-id={lead.id}
    >
      <div className="flex items-start gap-2 mb-2">
        <div className="flex items-center gap-1">
          <GripVertical className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-lg">{serviceEmojis[lead.service] || "📋"}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-medium text-sm truncate">{lead.name || "Sin nombre"}</span>
            <span className={`text-[9px] px-1 py-0.5 border ${source.color}`}>{source.label}</span>
          </div>
          <p className="text-xs text-zinc-500">
            {lead.city} • {lead.service}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onExpand()
          }}
          className="p-1 opacity-0 group-hover:opacity-100 hover:bg-zinc-700 transition-all"
          title="Expandir"
        >
          <Maximize2 className="w-3.5 h-3.5 text-zinc-400" />
        </button>
        <span className="text-xs text-zinc-600">
          {new Date(lead.created_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short" })}
        </span>
      </div>

      {lead.problem && <p className="text-xs text-zinc-400 mb-2 line-clamp-2">{lead.problem}</p>}

      <p className="text-xs font-mono text-zinc-300 mb-2">{lead.phone}</p>

      {partner && (
        <div className="text-xs text-blue-400 mb-2 flex items-center gap-1">
          <Users className="w-3 h-3" />
          {partner.name}
        </div>
      )}

      {lead.lead_price > 0 && <div className="text-xs text-[#FF4D00] font-bold mb-2">{lead.lead_price}€</div>}

      <div className="flex items-center gap-1.5 flex-wrap" onClick={(e) => e.stopPropagation()}>
        <input
          type="number"
          defaultValue={lead.lead_price || ""}
          onBlur={(e) => onPriceChange(Number(e.target.value))}
          onClick={(e) => e.stopPropagation()}
          className="w-12 bg-zinc-800 border border-zinc-700 px-1.5 py-1 text-xs text-center focus:border-[#FF4D00] outline-none"
          placeholder="€"
        />

        <button
          onClick={(e) => {
            e.stopPropagation()
            onWhatsApp()
          }}
          className="p-1.5 border border-green-500/30 hover:border-green-500 hover:bg-green-500/10 transition-all"
          title="WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 text-green-500" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onCopy()
          }}
          className={`p-1.5 border transition-all ${
            copied ? "border-green-500 bg-green-500/20" : "border-zinc-700 hover:border-zinc-500"
          }`}
          title="Copiar"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
        </button>

        <select
          value={lead.partner_id || ""}
          onChange={(e) => {
            e.stopPropagation()
            onPartnerAssign(lead.id, e.target.value)
          }}
          onClick={(e) => e.stopPropagation()}
          disabled={updating}
          className="bg-zinc-800 border border-zinc-700 px-1.5 py-1 text-xs focus:border-[#FF4D00] outline-none max-w-[80px]"
        >
          <option value="">Partner</option>
          {partners.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onTrash()
          }}
          className="p-1.5 border border-zinc-700 hover:border-red-500 hover:bg-red-500/10 transition-all ml-auto"
          title="Eliminar"
        >
          <Trash2 className="w-3.5 h-3.5 text-zinc-400 hover:text-red-500" />
        </button>
      </div>
    </div>
  )
}

function PipelineColumn({
  status,
  label,
  color,
  icon: Icon,
  leads,
  partners,
  revenue,
  onStatusChange,
  onPartnerAssign,
  onWhatsApp,
  onCopy,
  onTrash,
  onPriceChange,
  onExpand,
  copiedLeadId,
  updatingLeadId,
  onDrop,
  draggedLeadId,
  expanded,
}: {
  status: string
  label: string
  color: string
  icon: React.ElementType
  leads: Lead[]
  partners: Partner[]
  revenue?: number
  onStatusChange: (leadId: string, status: string) => void
  onPartnerAssign: (leadId: string, partnerId: string) => void
  onWhatsApp: (lead: Lead) => void
  onCopy: (lead: Lead) => void
  onTrash: (leadId: string) => void
  onPriceChange: (leadId: string, price: number) => void
  onExpand: (leadId: string) => void
  copiedLeadId: string | null
  updatingLeadId: string | null
  onDrop: (leadId: string, newStatus: string) => void
  draggedLeadId: string | null
  expanded?: boolean
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const leadId = e.dataTransfer.getData("leadId")
    if (leadId) {
      onDrop(leadId, status)
    }
  }

  const colorClasses: Record<string, string> = {
    yellow: "border-yellow-500",
    blue: "border-blue-500",
    purple: "border-purple-500",
    orange: "border-orange-500",
    green: "border-green-500",
    red: "border-red-500",
    cyan: "border-cyan-500", // Added for new status
  }

  const textColorClasses: Record<string, string> = {
    yellow: "text-yellow-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    green: "text-green-500",
    red: "text-red-500",
    cyan: "text-cyan-500", // Added for new status
  }

  const bgColorClasses: Record<string, string> = {
    yellow: "bg-yellow-500/10",
    blue: "bg-blue-500/10",
    purple: "bg-purple-500/10",
    orange: "bg-orange-500/10",
    green: "bg-green-500/10",
    red: "bg-red-500/10",
    cyan: "bg-cyan-500/10", // Added for new status
  }

  return (
    <div
      className={`flex flex-col h-full bg-zinc-900/30 border border-zinc-800 rounded-lg overflow-hidden transition-all ${isDragOver ? "bg-zinc-800/50" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header - fixed height */}
      <div
        className={`flex items-center gap-2 px-3 py-2 border-l-4 ${colorClasses[color]} ${bgColorClasses[color]} shrink-0`}
      >
        <Icon className={`w-4 h-4 ${textColorClasses[color]}`} />
        <span className={`text-xs font-bold ${textColorClasses[color]}`}>{label}</span>
        <span className="text-xs text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">{leads.length}</span>
        {revenue !== undefined && revenue > 0 && (
          <span className={`text-xs ${textColorClasses[color]} ml-auto font-bold`}>{revenue}€</span>
        )}
      </div>
      {/* Scrollable content area - takes remaining space */}
      <div
        className={`flex-1 overflow-y-auto p-2 space-y-2 min-h-0 transition-all ${
          isDragOver ? "ring-2 ring-[#FF4D00]/50 ring-inset" : ""
        }`}
      >
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            partners={partners}
            onStatusChange={onStatusChange}
            onPartnerAssign={onPartnerAssign}
            onWhatsApp={() => onWhatsApp(lead)}
            onCopy={() => onCopy(lead)}
            onTrash={() => onTrash(lead.id)}
            onPriceChange={(price) => onPriceChange(lead.id, price)}
            onExpand={() => onExpand(lead.id)}
            copied={copiedLeadId === lead.id}
            updating={updatingLeadId === lead.id}
            onDragStart={(e) => {
              e.dataTransfer.setData("leadId", lead.id)
            }}
            isDragging={draggedLeadId === lead.id}
          />
        ))}
        {leads.length === 0 && (
          <p className={`text-xs text-zinc-600 text-center py-8 ${isDragOver ? "text-[#FF4D00]" : ""}`}>
            {isDragOver ? "Soltar aquí" : `Sin ${label.toLowerCase()}`}
          </p>
        )}
      </div>
    </div>
  )
}

export function DashboardClient({ initialStats }: DashboardClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const defaultStats: Stats = {
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
  }

  const [stats, setStats] = useState<Stats>(() => {
    if (initialStats && Array.isArray(initialStats.recentLeads)) {
      return initialStats
    }
    return defaultStats
  })

  const [currentTime, setCurrentTime] = useState(new Date())
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [dateFilterOpen, setDateFilterOpen] = useState(false)
  const dateButtonRef = useRef<HTMLButtonElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null)
  const [showPartnerModal, setShowPartnerModal] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [activeTab, setActiveTab] = useState<"pipeline" | "partners">("pipeline")
  const dateFilterRef = useRef<HTMLDivElement>(null)
  const [copiedLeadId, setCopiedLeadId] = useState<string | null>(null)
  const [showTrashed, setShowTrashed] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [serviceFilter, setServiceFilter] = useState<string>("all")
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null)
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [kanbanExpanded, setKanbanExpanded] = useState(false)

  const expandedLead = expandedLeadId ? (stats.recentLeads || []).find((l) => l.id === expandedLeadId) || null : null

  const serviceEmojis: Record<string, string> = {
    fontanero: "🔧",
    electricista: "⚡",
    cerrajero: "🔑",
    desatasco: "🚿",
    calderas: "🔥",
  }

  const fetchData = async () => {
    try {
      const params = new URLSearchParams(searchParams.toString())
      const res = await fetch(`/api/0x/dashboard?${params.toString()}`)

      if (!res.ok) return

      const contentType = res.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) return

      const data = await res.json()

      setStats({
        ...defaultStats,
        ...data,
        recentLeads: Array.isArray(data.recentLeads) ? data.recentLeads : [],
        partnersList: Array.isArray(data.partnersList) ? data.partnersList : [],
        byService: Array.isArray(data.byService) ? data.byService : [],
        funnelStats: Array.isArray(data.funnelStats) ? data.funnelStats : [],
        incompleteChats: Array.isArray(data.incompleteChats) ? data.incompleteChats : [],
      })
    } catch (error) {
      // Silent fail - keep existing data
    }
  }

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const range = searchParams.get("range")
    if (range) {
      fetchData()
    }
  }, [searchParams])

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateFilterRef.current && !dateFilterRef.current.contains(event.target as Node)) {
        setDateFilterOpen(false)
      }
    }

    if (dateFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dateFilterOpen])

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

  const openWhatsAppLead = (lead: Lead) => {
    const phone = lead.phone?.replace(/\D/g, "") || ""
    const phoneWithCountry = phone.startsWith("34") ? phone : `34${phone}`
    const message = encodeURIComponent(
      `Hola! Veo que has solicitado servicio de ${lead.service || "urgencia"} en ${lead.city || "tu zona"}. Te escribo para confirmar si todavía necesitas el servicio.`,
    )
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, "_blank")
  }

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setStats((prev) => ({
      ...prev,
      recentLeads: prev.recentLeads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)),
    }))

    try {
      const res = await fetch("/api/0x/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status: newStatus }),
      })
      const result = await res.json()
      if (!result.success) {
        setNotification({ type: "error", message: result.error || "Error al actualizar" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handlePartnerAssign = async (leadId: string, partnerId: string) => {
    setStats((prev) => ({
      ...prev,
      recentLeads: prev.recentLeads.map((lead) =>
        lead.id === leadId ? { ...lead, partner_id: partnerId || null } : lead,
      ),
    }))

    try {
      const res = await fetch("/api/0x/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, partnerId: partnerId || null }),
      })
      const result = await res.json()
      if (!result.success) {
        setNotification({ type: "error", message: result.error || "Error al asignar" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleUpdateLead = async (leadId: string, data: Partial<Lead>) => {
    setStats((prev) => ({
      ...prev,
      recentLeads: prev.recentLeads.map((lead) => (lead.id === leadId ? { ...lead, ...data } : lead)),
    }))

    try {
      const res = await fetch("/api/0x/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, ...data }),
      })
      if (res.ok) {
        setNotification({ type: "success", message: "Lead actualizado" })
      } else {
        setNotification({ type: "error", message: "Error al actualizar lead" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleSavePartner = async (data: any) => {
    try {
      const res = await fetch("/api/0x/manual-partners", {
        method: data.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (result.success) {
        setNotification({ type: "success", message: data.id ? "Partner actualizado" : "Partner creado" })
        setShowPartnerModal(false)
        setEditingPartner(null)
        if (data.id) {
          setStats((prev) => ({
            ...prev,
            partnersList: prev.partnersList.map((p) => (p.id === data.id ? { ...p, ...data } : p)),
          }))
        } else if (result.partner) {
          setStats((prev) => ({
            ...prev,
            partnersList: [...prev.partnersList, result.partner],
          }))
        }
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
      const res = await fetch("/api/0x/manual-partners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId }),
      })

      const result = await res.json()

      if (result.success) {
        setNotification({ type: "success", message: "Partner eliminado" })
        setStats((prev) => ({
          ...prev,
          partnersList: prev.partnersList.filter((p) => p.id !== partnerId),
        }))
      } else {
        setNotification({ type: "error", message: result.error || "Error" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleSaveManualLead = async (data: any) => {
    try {
      const res = await fetch("/api/0x/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (result.success) {
        setNotification({ type: "success", message: "Lead creado correctamente" })
        setShowLeadModal(false)
        if (result.lead) {
          setStats((prev) => ({
            ...prev,
            recentLeads: [result.lead, ...prev.recentLeads],
          }))
        }
      } else {
        setNotification({ type: "error", message: result.error || "Error al crear lead" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleCopyLead = (lead: Lead) => {
    const message = `🚨 *NUEVO TRABAJO* 🚨

${serviceEmojis[lead.service] || "📋"} *Servicio:* ${lead.service?.toUpperCase()}
📍 *Zona:* ${lead.city}

📝 *Problema:*
${lead.problem?.slice(0, 150)}

✅ *Reacciona si estás disponible*`

    navigator.clipboard.writeText(message)
    setCopiedLeadId(lead.id)
    setTimeout(() => setCopiedLeadId(null), 2000)
  }

  const handlePriceChange = async (leadId: string, price: number) => {
    setStats((prev) => ({
      ...prev,
      recentLeads: prev.recentLeads.map((lead) => (lead.id === leadId ? { ...lead, lead_price: price } : lead)),
    }))

    try {
      const res = await fetch("/api/0x/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, lead_price: price }),
      })
      const data = await res.json()
      if (!data.success) {
        setNotification({ type: "error", message: data.error || "Error al actualizar precio" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleTrashLead = async (leadId: string, restore = false) => {
    setStats((prev) => ({
      ...prev,
      recentLeads: prev.recentLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: restore ? "pending" : "trashed" } : lead,
      ),
    }))

    if (expandedLeadId === leadId) {
      setExpandedLeadId(null)
    }

    try {
      const res = await fetch("/api/0x/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status: restore ? "pending" : "trashed" }),
      })
      const result = await res.json()
      if (result.success) {
        setNotification({ type: "success", message: restore ? "Lead restaurado" : "Lead eliminado" })
      } else {
        setNotification({ type: "error", message: result.error || "Error" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleDrop = (leadId: string, newStatus: string) => {
    setDraggedLeadId(null)
    handleStatusChange(leadId, newStatus)
  }

  // Computed values from stats
  const recentLeads = stats.recentLeads || []
  const partnersList = stats.partnersList || []

  const filteredLeads = serviceFilter === "all" ? recentLeads : recentLeads.filter((l) => l.service === serviceFilter)

  const activeLeads = filteredLeads.filter((l) => l.status !== "trashed" && l.status !== "rejected")
  const trashedLeads = filteredLeads.filter((l) => l.status === "trashed")

  const pendingLeads = activeLeads.filter((l) => l.status === "pending")
  const contactedLeads = activeLeads.filter((l) => l.status === "contacted")
  const pendingAppointmentLeads = activeLeads.filter((l) => l.status === "pending_appointment") // New status
  const confirmedLeads = activeLeads.filter((l) => l.status === "confirmed")
  const completedLeads = activeLeads.filter((l) => l.status === "completed")
  const paidLeads = activeLeads.filter((l) => l.status === "paid")
  const rejectedLeads = filteredLeads.filter((l) => l.status === "rejected")

  const pendingRevenue = [...pendingLeads, ...contactedLeads, ...pendingAppointmentLeads, ...confirmedLeads].reduce(
    // Updated
    (sum, l) => sum + (Number(l.lead_price) || 0),
    0,
  )
  const completedRevenue = completedLeads.reduce((sum, l) => sum + (Number(l.lead_price) || 0), 0)
  const totalRevenue = paidLeads.reduce((sum, l) => sum + (Number(l.lead_price) || 0), 0)
  const todayLeadsCount = activeLeads.filter((l) => {
    const today = new Date()
    const leadDate = new Date(l.created_at)
    return leadDate.toDateString() === today.toDateString()
  }).length

  return (
    <div className="min-h-screen bg-black text-zinc-100">
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

      {showPartnerModal && (
        <PartnerModal
          partner={editingPartner}
          onClose={() => {
            setShowPartnerModal(false)
            setEditingPartner(null)
          }}
          onSave={handleSavePartner}
        />
      )}

      {showLeadModal && <LeadModal onClose={() => setShowLeadModal(false)} onSave={handleSaveManualLead} />}

      {expandedLead && (
        <LeadDetailModal
          lead={expandedLead}
          partners={partnersList}
          onClose={() => setExpandedLeadId(null)}
          onSave={(data) => handleUpdateLead(expandedLead.id, data)}
          onStatusChange={(status) => handleStatusChange(expandedLead.id, status)}
          onPartnerAssign={(partnerId) => handlePartnerAssign(expandedLead.id, partnerId)}
          onDelete={() => handleTrashLead(expandedLead.id)}
        />
      )}

      {selectedPartner && (
        <PartnerDetailModal
          partner={selectedPartner}
          leads={recentLeads}
          onClose={() => setSelectedPartner(null)}
          onLeadClick={(leadId) => {
            setSelectedPartner(null)
            setExpandedLeadId(leadId)
          }}
        />
      )}

      <header className="relative z-10 border-b border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#FF4D00] flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#FF4D00]" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wider">RAPIDFIX</h1>
              <p className="text-[10px] text-zinc-500 hidden sm:block">PANEL</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative" ref={dateFilterRef}>
              <button
                ref={dateButtonRef}
                onClick={() => setDateFilterOpen(!dateFilterOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 border border-zinc-700 bg-zinc-900 hover:border-zinc-600 transition-colors text-xs"
              >
                <Filter className="w-3 h-3" />
                <span className="hidden sm:inline">{dateRangeLabels[stats.dateRange] || "Todo"}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${dateFilterOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            <div className="text-right hidden sm:block">
              <p className="text-xs text-zinc-500">ACTIVO</p>
              <p className="text-xs font-mono text-[#FF4D00]">
                {currentTime.toLocaleTimeString("es-ES", { hour12: false })}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 border border-zinc-700 hover:border-red-500/50 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
        </div>
      </header>

      {dateFilterOpen && (
        <div
          className="fixed w-32 border border-zinc-700 bg-zinc-900 z-[9999] shadow-2xl"
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

      <main className="relative max-w-7xl mx-auto px-4 py-4 space-y-4">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          <KPICard label="HOY" value={todayLeadsCount} icon={<Activity className="w-4 h-4" />} color="orange" />
          <KPICard
            label="PENDIENTES"
            value={pendingLeads.length + contactedLeads.length + pendingAppointmentLeads.length} // Updated
            subvalue={`${pendingRevenue}€ pot.`}
            icon={<Clock className="w-4 h-4" />}
            color="yellow"
          />
          <KPICard
            label="PDTE CITA"
            value={pendingAppointmentLeads.length} // New KPI card for pending appointment
            icon={<Calendar className="w-4 h-4" />}
            color="cyan" // Use the new cyan color
          />
          <KPICard label="CITAS" value={confirmedLeads.length} icon={<Calendar className="w-4 h-4" />} color="purple" />
          <KPICard
            label="PDTE PAGO"
            value={completedLeads.length}
            subvalue={`${completedRevenue}€`}
            icon={<CheckCircle className="w-4 h-4" />}
            color="orange"
          />
          <KPICard
            label="PAGADOS"
            value={paidLeads.length}
            subvalue={`${totalRevenue}€`}
            icon={<DollarSign className="w-4 h-4" />}
            color="green"
          />
          <KPICard label="PARTNERS" value={partnersList.length} icon={<Users className="w-4 h-4" />} color="zinc" />
        </div>

        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div className="flex gap-4">
            <button
              onClick={() => {
                setActiveTab("pipeline")
                setShowTrashed(false)
              }}
              className={`text-sm font-medium transition-colors ${
                activeTab === "pipeline" ? "text-[#FF4D00]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Pipeline ({activeLeads.length})
            </button>
            <button
              onClick={() => setActiveTab("partners")}
              className={`text-sm font-medium transition-colors ${
                activeTab === "partners" ? "text-[#FF4D00]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Partners ({partnersList.length})
            </button>
          </div>

          {activeTab === "pipeline" && !kanbanExpanded && !showTrashed && (
            <div className="flex items-center gap-2">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 px-2 py-1 text-xs focus:border-[#FF4D00] outline-none"
              >
                <option value="all">Todos</option>
                <option value="fontanero">🔧 Fontanero</option>
                <option value="electricista">⚡ Electricista</option>
                <option value="cerrajero">🔑 Cerrajero</option>
                <option value="desatasco">🚿 Desatasco</option>
                <option value="calderas">🔥 Calderas</option>
              </select>

              <button
                onClick={() => setShowTrashed(!showTrashed)}
                className={`flex items-center gap-1 px-2 py-1 text-xs border transition-colors ${
                  showTrashed ? "border-red-500 text-red-500" : "border-zinc-700 text-zinc-500"
                }`}
              >
                <Trash2 className="w-3 h-3" />
                {trashedLeads.length + rejectedLeads.length}
              </button>

              <button
                onClick={() => setKanbanExpanded(true)}
                className="flex items-center gap-1 px-2 py-1 text-xs border border-zinc-700 hover:border-[#FF4D00] transition-colors"
                title="Maximizar kanban"
              >
                <Maximize2 className="w-3 h-3" />
              </button>

              <button
                onClick={() => setShowLeadModal(true)}
                className="flex items-center gap-1 px-2 py-1 text-xs font-bold bg-[#FF4D00] text-black"
              >
                <Plus className="w-3 h-3" />
                LEAD
              </button>
            </div>
          )}
        </div>

        {kanbanExpanded && activeTab === "pipeline" && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900 shrink-0">
              <div className="flex items-center gap-4">
                <h2 className="text-sm font-bold text-white">Pipeline Completo</h2>
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="text-xs bg-zinc-800 border border-zinc-700 px-2 py-1 text-zinc-300"
                >
                  <option value="all">Todos</option>
                  <option value="fontanero">Fontanero</option>
                  <option value="electricista">Electricista</option>
                  <option value="desatascos">Desatascos</option>
                  <option value="calderas">Calderas</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLeadModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs bg-[#FF4D00] text-white hover:bg-[#FF4D00]/90"
                >
                  <Plus className="w-3 h-3" />
                  Lead
                </button>
                <button
                  onClick={() => setKanbanExpanded(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Grid - takes all remaining height */}
            <div
              className="flex-1 grid grid-cols-5 gap-3 p-4 min-h-0 overflow-hidden"
              onDragStart={(e) => {
                const leadId = (e.target as HTMLElement).closest("[draggable]")?.getAttribute("data-lead-id")
                if (leadId) setDraggedLeadId(leadId)
              }}
              onDragEnd={() => setDraggedLeadId(null)}
            >
              <PipelineColumn
                status="pending"
                label="PENDIENTE"
                color="yellow"
                icon={Clock}
                leads={pendingLeads}
                partners={partnersList}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
                expanded
              />
              <PipelineColumn
                status="contacted"
                label="CONTACTADO"
                color="blue"
                icon={Phone}
                leads={contactedLeads}
                partners={partnersList}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
                expanded
              />
              <PipelineColumn
                status="pending_appointment" // New status column
                label="PDTE CITA"
                color="cyan" // Use cyan color
                icon={Calendar}
                leads={pendingAppointmentLeads}
                partners={partnersList}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
                expanded
              />
              <PipelineColumn
                status="confirmed"
                label="CITA"
                color="purple"
                icon={Calendar}
                leads={confirmedLeads}
                partners={partnersList}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
                expanded
              />
              <PipelineColumn
                status="completed"
                label="PDTE PAGO"
                color="orange"
                icon={CheckCircle}
                leads={completedLeads}
                partners={partnersList}
                revenue={completedRevenue}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
                expanded
              />
              <PipelineColumn
                status="paid"
                label="PAGADO"
                color="green"
                icon={CreditCard}
                leads={paidLeads}
                partners={partnersList}
                revenue={totalRevenue}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
                expanded
              />
            </div>
          </div>
        )}

        {!kanbanExpanded && activeTab === "pipeline" && !showTrashed && (
          <div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 h-[calc(100vh-280px)] min-h-[400px]"
            onDragStart={(e) => {
              const leadId = (e.target as HTMLElement).closest("[draggable]")?.getAttribute("data-lead-id")
              if (leadId) setDraggedLeadId(leadId)
            }}
            onDragEnd={() => setDraggedLeadId(null)}
          >
            <PipelineColumn
              status="pending"
              label="PENDIENTE"
              color="yellow"
              icon={Clock}
              leads={pendingLeads}
              partners={partnersList}
              onStatusChange={handleStatusChange}
              onPartnerAssign={handlePartnerAssign}
              onWhatsApp={openWhatsAppLead}
              onCopy={handleCopyLead}
              onTrash={handleTrashLead}
              onPriceChange={handlePriceChange}
              onExpand={setExpandedLeadId}
              copiedLeadId={copiedLeadId}
              updatingLeadId={updatingLeadId}
              onDrop={handleDrop}
              draggedLeadId={draggedLeadId}
            />
            <PipelineColumn
              status="contacted"
              label="CONTACTADO"
              color="blue"
              icon={Phone}
              leads={contactedLeads}
              partners={partnersList}
              onStatusChange={handleStatusChange}
              onPartnerAssign={handlePartnerAssign}
              onWhatsApp={openWhatsAppLead}
              onCopy={handleCopyLead}
              onTrash={handleTrashLead}
              onPriceChange={handlePriceChange}
              onExpand={setExpandedLeadId}
              copiedLeadId={copiedLeadId}
              updatingLeadId={updatingLeadId}
              onDrop={handleDrop}
              draggedLeadId={draggedLeadId}
            />
            <PipelineColumn
              status="pending_appointment" // New status column
              label="PDTE CITA"
              color="cyan" // Use cyan color
              icon={Calendar}
              leads={pendingAppointmentLeads}
              partners={partnersList}
              onStatusChange={handleStatusChange}
              onPartnerAssign={handlePartnerAssign}
              onWhatsApp={openWhatsAppLead}
              onCopy={handleCopyLead}
              onTrash={handleTrashLead}
              onPriceChange={handlePriceChange}
              onExpand={setExpandedLeadId}
              copiedLeadId={copiedLeadId}
              updatingLeadId={updatingLeadId}
              onDrop={handleDrop}
              draggedLeadId={draggedLeadId}
            />
            <PipelineColumn
              status="confirmed"
              label="CITA"
              color="purple"
              icon={Calendar}
              leads={confirmedLeads}
              partners={partnersList}
              onStatusChange={handleStatusChange}
              onPartnerAssign={handlePartnerAssign}
              onWhatsApp={openWhatsAppLead}
              onCopy={handleCopyLead}
              onTrash={handleTrashLead}
              onPriceChange={handlePriceChange}
              onExpand={setExpandedLeadId}
              copiedLeadId={copiedLeadId}
              updatingLeadId={updatingLeadId}
              onDrop={handleDrop}
              draggedLeadId={draggedLeadId}
            />
            <PipelineColumn
              status="completed"
              label="PDTE PAGO"
              color="orange"
              icon={CheckCircle}
              leads={completedLeads}
              partners={partnersList}
              revenue={completedRevenue}
              onStatusChange={handleStatusChange}
              onPartnerAssign={handlePartnerAssign}
              onWhatsApp={openWhatsAppLead}
              onCopy={handleCopyLead}
              onTrash={handleTrashLead}
              onPriceChange={handlePriceChange}
              onExpand={setExpandedLeadId}
              copiedLeadId={copiedLeadId}
              updatingLeadId={updatingLeadId}
              onDrop={handleDrop}
              draggedLeadId={draggedLeadId}
            />
            <PipelineColumn
              status="paid"
              label="PAGADO"
              color="green"
              icon={CreditCard}
              leads={paidLeads}
              partners={partnersList}
              revenue={totalRevenue}
              onStatusChange={handleStatusChange}
              onPartnerAssign={handlePartnerAssign}
              onWhatsApp={openWhatsAppLead}
              onCopy={handleCopyLead}
              onTrash={handleTrashLead}
              onPriceChange={handlePriceChange}
              onExpand={setExpandedLeadId}
              copiedLeadId={copiedLeadId}
              updatingLeadId={updatingLeadId}
              onDrop={handleDrop}
              draggedLeadId={draggedLeadId}
            />
          </div>
        )}

        {activeTab === "pipeline" && showTrashed && (
          <div className="border border-zinc-800 bg-zinc-900/30">
            <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-xs font-bold text-red-500">
                PAPELERA Y RECHAZADOS ({trashedLeads.length + rejectedLeads.length})
              </h3>
              <button onClick={() => setShowTrashed(false)} className="text-xs text-zinc-500 hover:text-zinc-300">
                ← Volver
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
              {[...trashedLeads, ...rejectedLeads].map((lead) => (
                <div key={lead.id} className="p-3 border border-zinc-800 bg-zinc-900/30 opacity-60">
                  <div className="flex items-center gap-2 mb-2">
                    <span>{serviceEmojis[lead.service] || "📋"}</span>
                    <span className="text-sm font-medium">{lead.name}</span>
                    <span className="text-xs text-zinc-500">{lead.city}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 border ml-auto ${lead.status === "rejected" ? "border-red-500/30 text-red-400" : "border-zinc-700 text-zinc-500"}`}
                    >
                      {lead.status === "rejected" ? "Rechazado" : "Eliminado"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTrashLead(lead.id, true)}
                    className="flex items-center gap-1 px-2 py-1 text-xs border border-green-500/30 text-green-500 hover:bg-green-500/10"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Restaurar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "partners" && (
          <div className="border border-zinc-800 bg-zinc-900/30">
            <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-400">PARTNERS</h3>
              <button
                onClick={() => setShowPartnerModal(true)}
                className="flex items-center gap-1 px-2 py-1 text-xs font-bold bg-[#FF4D00] text-black"
              >
                <Plus className="w-3 h-3" />
                NUEVO
              </button>
            </div>
            <div className="divide-y divide-zinc-800/50">
              {partnersList.map((partner) => {
                const partnerLeads = recentLeads.filter((l) => l.partner_id === partner.id && l.status !== "trashed")
                const partnerPending = partnerLeads.filter(
                  (l) => ["pending", "contacted", "pending_appointment", "confirmed"].includes(l.status), // Updated
                ).length
                const partnerCompleted = partnerLeads.filter((l) => l.status === "completed").length
                const partnerPaid = partnerLeads.filter((l) => l.status === "paid").length
                const partnerCompletedRevenue = partnerLeads
                  .filter((l) => l.status === "completed")
                  .reduce((s, l) => s + (Number(l.lead_price) || 0), 0)

                return (
                  <div
                    key={partner.id}
                    className="p-3 hover:bg-zinc-800/20 transition-colors cursor-pointer"
                    onClick={() => setSelectedPartner(partner)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{partner.name}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 border ${
                              partner.active
                                ? "border-green-500/30 text-green-400 bg-green-500/10"
                                : "border-red-500/30 text-red-400 bg-red-500/10"
                            }`}
                          >
                            {partner.active ? "ACTIVO" : "INACTIVO"}
                          </span>
                          {partnerPending > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 border border-yellow-500/30 text-yellow-400 bg-yellow-500/10">
                              {partnerPending} en proceso
                            </span>
                          )}
                          {partnerCompleted > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 border border-orange-500/30 text-orange-400 bg-orange-500/10">
                              {partnerCompleted} pdte pago ({partnerCompletedRevenue}€)
                            </span>
                          )}
                          {partnerPaid > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 border border-green-500/30 text-green-400 bg-green-500/10">
                              {partnerPaid} pagados
                            </span>
                          )}
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
                              {partner.cities?.slice(0, 3).join(", ")}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingPartner(partner)
                            setShowPartnerModal(true)
                          }}
                          className="p-1.5 border border-zinc-700 hover:border-[#FF4D00] transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#FF4D00]" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePartner(partner.id)
                          }}
                          className="p-1.5 border border-zinc-700 hover:border-red-500 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
              {partnersList.length === 0 && (
                <div className="p-8 text-center text-zinc-500 text-sm">No hay partners. Crea uno nuevo.</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
