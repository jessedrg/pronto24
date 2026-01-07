"use client"

import { useState } from "react"
import { Eye, EyeOff, Save, Phone, MessageCircle } from "lucide-react"

export default function AdminConfigPage() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Config state
  const [whatsappPhone, setWhatsappPhone] = useState("")
  const [callPhone, setCallPhone] = useState("")
  const [whatsappEnabled, setWhatsappEnabled] = useState(true)
  const [callEnabled, setCallEnabled] = useState(true)

  const handleLogin = async () => {
    if (password === "admin123") {
      setIsAuthenticated(true)
      setError("")
      loadConfig()
    } else {
      setError("Contraseña incorrecta")
    }
  }

  const loadConfig = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/config")
      const data = await res.json()

      setWhatsappPhone(data.whatsapp_phone || "34711267223")
      setCallPhone(data.call_phone || "34711267223")
      setWhatsappEnabled(data.whatsapp_enabled === "true")
      setCallEnabled(data.call_enabled === "true")
    } catch (err) {
      console.error("[v0] Error loading config:", err)
      setError("Error al cargar configuración")
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: password,
          whatsapp_phone: whatsappPhone,
          call_phone: callPhone,
          whatsapp_enabled: whatsappEnabled.toString(),
          call_enabled: callEnabled.toString(),
        }),
      })

      if (res.ok) {
        setSuccess("Configuración guardada correctamente")
        setTimeout(() => setSuccess(""), 3000)
      } else {
        setError("Error al guardar configuración")
      }
    } catch (err) {
      console.error("[v0] Error saving config:", err)
      setError("Error al guardar configuración")
    }
    setSaving(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6">Panel de Administración</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 pr-12"
                  placeholder="Ingresa la contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">{error}</div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Acceder
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Configuración de Botones CTA</h1>

          {loading ? (
            <div className="text-center py-12 text-zinc-400">Cargando configuración...</div>
          ) : (
            <div className="space-y-8">
              {/* WhatsApp Config */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="text-green-500" size={24} />
                    <h2 className="text-xl font-bold text-white">WhatsApp</h2>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={whatsappEnabled}
                      onChange={(e) => setWhatsappEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Número de teléfono (con código de país, sin +)
                  </label>
                  <input
                    type="text"
                    value={whatsappPhone}
                    onChange={(e) => setWhatsappPhone(e.target.value)}
                    placeholder="34711267223"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-xs text-zinc-500 mt-1">Ejemplo: 34711267223 para España</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-zinc-800"></div>

              {/* Call Config */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="text-white" size={24} />
                    <h2 className="text-xl font-bold text-white">Llamada</h2>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={callEnabled}
                      onChange={(e) => setCallEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Número de teléfono (con código de país, con +)
                  </label>
                  <input
                    type="text"
                    value={callPhone}
                    onChange={(e) => setCallPhone(e.target.value)}
                    placeholder="+34711267223"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-zinc-500 mt-1">Ejemplo: +34711267223 para España</p>
                </div>
              </div>

              {/* Messages */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">{error}</div>
              )}

              {success && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400">
                  {success}
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {saving ? "Guardando..." : "Guardar Configuración"}
              </button>

              {/* Preview */}
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6">
                <h3 className="text-sm font-medium text-zinc-400 mb-4">Vista Previa</h3>
                <div className="space-y-3">
                  {callEnabled && (
                    <div className="bg-white text-black font-bold py-3 px-6 rounded-xl text-center">
                      📞 Llamar ahora: {callPhone || "+34711267223"}
                    </div>
                  )}
                  {whatsappEnabled && (
                    <div className="bg-green-500 text-white font-bold py-3 px-6 rounded-xl text-center">
                      💬 WhatsApp: {whatsappPhone || "34711267223"}
                    </div>
                  )}
                  {!callEnabled && !whatsappEnabled && (
                    <p className="text-zinc-500 text-center text-sm">No hay botones habilitados</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
