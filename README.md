# Pronto24 - Plataforma de Servicios Urgentes con SEO Programático

## 🚀 Características Principales

- ✅ **SEO Programático Masivo**: +2 millones de URLs únicas generadas dinámicamente
- ✅ **8,118 municipios de España**: Cobertura completa de todo el territorio nacional
- ✅ **47 modificadores de alta intención**: Keywords que capturan búsquedas urgentes
- ✅ **5 profesiones**: Electricista, Fontanero, Cerrajero, Desatascos, Calderas
- ✅ **Sistema de sitemaps chunkeados**: Evita límites de Vercel (19MB)
- ✅ **Renderizado dinámico con Next.js 14**: Páginas generadas bajo demanda
- ✅ **Metadata SEO dinámica**: Title, description y keywords únicos por página

---

## 🧠 Arquitectura del Sistema SEO Programático

### Cómo Funciona

El sistema genera **millones de páginas únicas** combinando:

```
[profesión] + [modificador] + [ciudad] = URL única con contenido personalizado
```

**Ejemplo de URLs generadas:**
- `/electricista/madrid/` → Electricista en Madrid
- `/electricista-urgente/barcelona/` → Electricista Urgente en Barcelona  
- `/fontanero-24-horas/valencia/` → Fontanero 24 Horas en Valencia
- `/problema/cerrajero/puerta-bloqueada/sevilla/` → Problema específico

### Cálculo de URLs Totales

```
Profesiones:     5
Modificadores:  47 (incluyendo base sin modificador)
Ciudades:    8,118
Problemas:     ~70 (14 por profesión)

URLs de profesión+ciudad:     5 × 47 × 8,118 = 1,907,730
URLs de problemas:            5 × 14 × 8,118 =   568,260
URLs precio/presupuesto:      5 × 2 × 8,118  =    81,180
                              ─────────────────────────────
Total aproximado:                            ~2,557,170 URLs
```

---

## 📁 Estructura del Sistema

```
pronto24/
├── app/
│   ├── [profession]/[city]/page.tsx      # Páginas dinámicas profesión+ciudad
│   ├── problema/[profession]/[problem]/[city]/page.tsx  # Páginas de problemas
│   ├── sitemap-v19.xml/route.ts          # Índice de sitemaps
│   ├── sitemap-files/[slug]/route.ts     # Generador de sitemaps individuales
│   └── robots.ts                          # Configuración robots.txt
├── lib/
│   └── sitemap-data.ts                   # 🔑 FUENTE ÚNICA DE DATOS
│       ├── VALID_PROFESSIONS (5)
│       ├── MODIFIERS (47)
│       ├── PROBLEMS (70)
│       └── CITIES (8,118)
├── components/
│   └── service-landing-template.tsx      # Template reutilizable
└── scripts/
    └── generate-cities.js                # Script para regenerar ciudades desde CSV
```

---

## 🔄 Flujo de Renderizado de Páginas

```
1. Usuario busca "fontanero urgente valencia"
                    ↓
2. Google indexa /fontanero-urgente/valencia/
                    ↓
3. Next.js recibe la request
                    ↓
4. [profession]/[city]/page.tsx parsea los params:
   - profession: "fontanero-urgente" → fontanero + modificador "-urgente"
   - city: "valencia"
                    ↓
5. generateMetadata() crea SEO dinámico:
   - Title: "Fontanero Urgente en Valencia | 10 Min | 711 267 223"
   - Description: "Fontanero urgente en Valencia. Llegamos en 10 MIN..."
   - Keywords: "fontanero urgente valencia, fontanero valencia..."
                    ↓
6. ServiceLandingTemplate renderiza contenido personalizado
                    ↓
7. Usuario ve página optimizada con CTA de conversión
```

---

## 🗺️ Sistema de Sitemaps

### Problema Resuelto
Vercel tiene un límite de **19MB para páginas ISR**. Un sitemap con +2M URLs superaría fácilmente ese límite.

### Solución: Sitemaps Chunkeados

```
robots.txt → sitemap-v19.xml (índice)
                    ↓
            ┌───────┴───────┐
            ↓               ↓
    sitemap-files/     sitemap-files/
    electricista.xml   electricista-urgente.xml
    (8,118 URLs)       (8,118 URLs)
            ↓               ↓
    ... (47 × 5 = 235 sitemaps de profesiones)
    ... (5 sitemaps de problemas)
    ... (10 sitemaps de precio/presupuesto)
```

**Total: ~250 sitemaps individuales**, cada uno con ~8,118 URLs máximo.

---

## 🎯 Modificadores de Alta Intención

Los modificadores capturan diferentes intenciones de búsqueda:

| Categoría | Ejemplos | Intención |
|-----------|----------|-----------|
| **Urgencia** | -urgente, -24-horas, -ahora, -emergencia | 🔴 Máxima conversión |
| **Precio** | -economico, -barato, -mejor-precio | 💰 Sensible al precio |
| **Disponibilidad** | -nocturno, -festivos, -fin-de-semana | ⏰ Fuera de horario |
| **Confianza** | -profesional, -certificado, -con-garantia | ✅ Busca calidad |
| **Combos** | -urgente-24h, -barato-urgente | 🎯 Alta conversión |

---

## 🏙️ Cobertura Geográfica

**8,118 municipios de España** importados desde el registro oficial del INE:

- Todas las capitales de provincia
- Todos los municipios >1,000 habitantes  
- Pueblos y localidades menores
- Cobertura 100% del territorio nacional

**Fuente de datos:** `Municipis_d'Espanya_20260118.csv`

---

## 🛠️ Cómo Regenerar Ciudades

Si necesitas actualizar la lista de municipios:

```bash
# 1. Actualiza el CSV con nuevos datos
# 2. Ejecuta el script generador
node scripts/generate-cities.js

# Esto regenera lib/sitemap-data.ts con las nuevas ciudades
```

---

## 📊 Métricas SEO

| Métrica | Valor |
|---------|-------|
| URLs indexables | ~2,557,170 |
| Municipios cubiertos | 8,118 |
| Profesiones | 5 |
| Modificadores | 47 |
| Problemas específicos | ~70 |
| Sitemaps generados | ~250 |

## 🛠️ Instalación

\`\`\`bash
# Clonar repositorio
git clone https://github.com/tu-usuario/rapidfix.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
\`\`\`

## 🔑 Variables de Entorno

\`\`\`bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Telegram
TELEGRAM_BOT_TOKEN=

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
\`\`\`

## 📊 Modelo de Negocio

**Ingresos:** €25-35 por lead
**Garantía:** 100% devolución si no entregas leads en 45 días
**Paquetes:**
- Starter: 5 leads en 15 días - €125
- Pro: 10 leads en 30 días - €250
- Premium: 20 leads en 45 días - €450

## 🎯 SEO Keywords

- desatasco urgente [ciudad]
- electricista 24 horas [ciudad]
- fontanero urgente [ciudad]
- cerrajero express [ciudad]
- reparación calderas [ciudad]
- reparación persianas [ciudad]

## 📈 Roadmap

- [x] Landing page y páginas de servicios
- [x] Sistema de leads automatizado
- [x] Integración WhatsApp/Telegram
- [x] Panel de administración
- [x] Página de partners con garantía
- [ ] Integración Stripe completa
- [ ] Dashboard de partners
- [ ] App móvil para partners
- [ ] Sistema de valoraciones

## 📄 Licencia

Propietario - rapidfix.es © 2025
