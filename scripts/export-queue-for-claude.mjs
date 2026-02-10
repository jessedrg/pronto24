/**
 * Run this script to export the full generation queue + DB schema + insert template
 * so you can give it to Claude for content generation.
 *
 *   node scripts/export-queue-for-claude.mjs > claude-prompt-data.json
 */

// ---- Inline the data from seo-data.ts ----

const PROFESSIONS = [
  {
    id: "electricista",
    name: "Electricista",
    namePlural: "Electricistas",
    description: "Electricistas certificados disponibles 24/7",
  },
  {
    id: "fontanero",
    name: "Fontanero",
    namePlural: "Fontaneros",
    description: "Fontaneros profesionales disponibles 24/7",
  },
  {
    id: "cerrajero",
    name: "Cerrajero",
    namePlural: "Cerrajeros",
    description: "Cerrajeros de confianza disponibles 24/7",
  },
  {
    id: "desatascos",
    name: "Desatascos",
    namePlural: "Desatascos",
    description: "Servicio de desatascos profesional 24/7",
  },
  {
    id: "calderas",
    name: "Calderas",
    namePlural: "Tecnicos de Calderas",
    description: "Tecnicos de calderas certificados 24/7",
  },
];

const PROBLEMS = {
  electricista: [
    { id: "apagon", name: "Apagon", description: "Sin luz en casa" },
    { id: "cortocircuito", name: "Cortocircuito", description: "Saltan los plomos" },
    { id: "olor-quemado", name: "Olor a quemado", description: "Huele a quemado electrico" },
    { id: "diferencial-salta", name: "Diferencial salta", description: "El diferencial salta solo" },
    { id: "enchufes-no-funcionan", name: "Enchufes no funcionan", description: "Enchufes sin corriente" },
    { id: "luces-parpadean", name: "Luces parpadean", description: "Las luces parpadean" },
    { id: "cuadro-electrico", name: "Cuadro electrico", description: "Problemas con el cuadro" },
    { id: "instalacion-electrica", name: "Instalacion electrica", description: "Instalacion nueva o reforma" },
    { id: "boletin-electrico", name: "Boletin electrico", description: "Certificado de instalacion" },
  ],
  fontanero: [
    { id: "fuga-agua", name: "Fuga de agua", description: "Escape de agua" },
    { id: "tuberia-rota", name: "Tuberia rota", description: "Rotura de tuberia" },
    { id: "inundacion", name: "Inundacion", description: "Casa inundada" },
    { id: "atasco-grave", name: "Atasco grave", description: "Atasco importante" },
    { id: "grifo-gotea", name: "Grifo gotea", description: "Grifo que gotea" },
    { id: "cisterna-no-funciona", name: "Cisterna", description: "Cisterna no funciona" },
    { id: "calentador", name: "Calentador", description: "Problemas con calentador" },
    { id: "humedad", name: "Humedad", description: "Problemas de humedad" },
  ],
  cerrajero: [
    { id: "puerta-bloqueada", name: "Puerta bloqueada", description: "No puedo abrir la puerta" },
    { id: "cerradura-rota", name: "Cerradura rota", description: "Cerradura estropeada" },
    { id: "llave-dentro", name: "Llave dentro", description: "Me deje las llaves dentro" },
    { id: "robo", name: "Robo", description: "Intento de robo" },
    { id: "cambio-cerradura", name: "Cambio cerradura", description: "Cambiar cerradura" },
    { id: "copia-llaves", name: "Copia de llaves", description: "Hacer copias de llaves" },
    { id: "cerradura-seguridad", name: "Cerradura seguridad", description: "Instalar cerradura de seguridad" },
  ],
  desatascos: [
    { id: "wc-atascado", name: "WC atascado", description: "El vater esta atascado" },
    { id: "fregadero-atascado", name: "Fregadero atascado", description: "El fregadero no traga" },
    { id: "arqueta-atascada", name: "Arqueta atascada", description: "Arqueta obstruida" },
    { id: "mal-olor", name: "Mal olor", description: "Mal olor en tuberias" },
    { id: "ducha-atascada", name: "Ducha atascada", description: "La ducha no traga" },
    { id: "bajante-atascado", name: "Bajante atascado", description: "Bajante obstruido" },
    { id: "limpieza-tuberias", name: "Limpieza tuberias", description: "Limpieza preventiva" },
  ],
  calderas: [
    { id: "sin-agua-caliente", name: "Sin agua caliente", description: "No sale agua caliente" },
    { id: "caldera-no-enciende", name: "Caldera no enciende", description: "La caldera no arranca" },
    { id: "fuga-gas", name: "Fuga de gas", description: "Posible fuga de gas" },
    { id: "ruido-caldera", name: "Ruido caldera", description: "La caldera hace ruido" },
    { id: "revision-caldera", name: "Revision caldera", description: "Revision obligatoria" },
    { id: "cambio-caldera", name: "Cambio caldera", description: "Sustituir caldera" },
    { id: "radiadores", name: "Radiadores", description: "Problemas con radiadores" },
  ],
};

// Build the queue (same logic as buildGenerationQueue)
function buildQueue() {
  const queue = [];

  // We only need profession x problem combinations (city pages don't need problems)
  // For city pages: just profession + city
  // For problem pages: profession + problem + city

  // Return a summary structure instead of the full expanded queue
  return {
    professions: PROFESSIONS,
    problems: PROBLEMS,
    pageTypes: {
      city: "One page per profession x city combination. page_url = /{professionId}/{citySlug}",
      problem: "One page per profession x problem x city combination. page_url = /problema/{professionId}/{problemId}/{citySlug}",
    },
  };
}

// DB table schema for page_content
const DB_SCHEMA = `
-- Table: page_content (Neon PostgreSQL)
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profession_id TEXT NOT NULL,
  city_slug TEXT NOT NULL,
  problem_id TEXT,            -- NULL for city pages, set for problem pages
  modifier TEXT,
  page_url TEXT NOT NULL,
  
  -- AI-generated content fields (these are what you fill):
  ai_intro TEXT,
  ai_local_context TEXT,
  ai_service_details TEXT,
  ai_pricing_info TEXT,
  ai_prevention_tips TEXT,
  ai_faqs JSONB,              -- Array of {q: string, a: string}
  ai_neighborhood_info TEXT,
  ai_seasonal_tips TEXT,
  ai_emergency_guide TEXT,
  
  -- Metadata:
  ai_generated_at TIMESTAMPTZ DEFAULT NOW(),
  ai_model TEXT DEFAULT 'claude',
  ai_word_count INTEGER,
  ai_status VARCHAR DEFAULT 'generated',
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
`;

// SQL INSERT template
const INSERT_TEMPLATE = `
-- INSERT for a CITY page:
INSERT INTO page_content (
  profession_id, city_slug, problem_id, page_url,
  ai_intro, ai_local_context, ai_service_details, ai_pricing_info,
  ai_prevention_tips, ai_faqs, ai_neighborhood_info, ai_seasonal_tips,
  ai_emergency_guide, ai_generated_at, ai_model, ai_word_count, ai_status
) VALUES (
  '{professionId}', '{citySlug}', NULL, '/{professionId}/{citySlug}',
  '{ai_intro}', '{ai_local_context}', '{ai_service_details}', '{ai_pricing_info}',
  '{ai_prevention_tips}', '{ai_faqs_json}', '{ai_neighborhood_info}', '{ai_seasonal_tips}',
  '{ai_emergency_guide}', NOW(), 'claude', {word_count}, 'generated'
)
ON CONFLICT ON CONSTRAINT page_content_unique 
DO UPDATE SET
  ai_intro = EXCLUDED.ai_intro,
  ai_local_context = EXCLUDED.ai_local_context,
  ai_service_details = EXCLUDED.ai_service_details,
  ai_pricing_info = EXCLUDED.ai_pricing_info,
  ai_prevention_tips = EXCLUDED.ai_prevention_tips,
  ai_faqs = EXCLUDED.ai_faqs,
  ai_neighborhood_info = EXCLUDED.ai_neighborhood_info,
  ai_seasonal_tips = EXCLUDED.ai_seasonal_tips,
  ai_emergency_guide = EXCLUDED.ai_emergency_guide,
  ai_generated_at = NOW(),
  ai_model = 'claude',
  ai_word_count = EXCLUDED.ai_word_count,
  ai_status = 'generated',
  updated_at = NOW();

-- INSERT for a PROBLEM page:
INSERT INTO page_content (
  profession_id, city_slug, problem_id, page_url,
  ai_intro, ai_local_context, ai_service_details, ai_pricing_info,
  ai_prevention_tips, ai_faqs, ai_neighborhood_info, ai_seasonal_tips,
  ai_emergency_guide, ai_generated_at, ai_model, ai_word_count, ai_status
) VALUES (
  '{professionId}', '{citySlug}', '{problemId}', '/problema/{professionId}/{problemId}/{citySlug}',
  '{ai_intro}', '{ai_local_context}', '{ai_service_details}', '{ai_pricing_info}',
  '{ai_prevention_tips}', '{ai_faqs_json}', '{ai_neighborhood_info}', '{ai_seasonal_tips}',
  '{ai_emergency_guide}', NOW(), 'claude', {word_count}, 'generated'
)
ON CONFLICT ON CONSTRAINT page_content_unique 
DO UPDATE SET
  ai_intro = EXCLUDED.ai_intro,
  ai_local_context = EXCLUDED.ai_local_context,
  ai_service_details = EXCLUDED.ai_service_details,
  ai_pricing_info = EXCLUDED.ai_pricing_info,
  ai_prevention_tips = EXCLUDED.ai_prevention_tips,
  ai_faqs = EXCLUDED.ai_faqs,
  ai_neighborhood_info = EXCLUDED.ai_neighborhood_info,
  ai_seasonal_tips = EXCLUDED.ai_seasonal_tips,
  ai_emergency_guide = EXCLUDED.ai_emergency_guide,
  ai_generated_at = NOW(),
  ai_model = 'claude',
  ai_word_count = EXCLUDED.ai_word_count,
  ai_status = 'generated',
  updated_at = NOW();
`;

const CONTENT_SCHEMA = `
Each page needs these fields (all in Spanish from Spain, "vosotros" not "ustedes"):

- ai_intro: 150-200 words. Unique intro paragraph about the service in that specific city. Mention city name, province, region, local neighborhoods/streets.
- ai_local_context: 200-300 words. Local context: building types (old/new), climate issues, common materials, local regulations.
- ai_service_details: 200-300 words. Specific services offered. Real situations for the area (coastal humidity, winter frost, hard water, historic buildings).
- ai_pricing_info: 150-200 words. Approximate prices (30-80 EUR simple repairs, 100-300 complex). Always mention closed quote before starting.
- ai_prevention_tips: 200-250 words. Prevention tips adapted to local climate. Coastal = salt corrosion. Interior = frost. Dense urban = old installations.
- ai_faqs: JSON array of 5-7 objects [{q: "question", a: "80-120 word answer"}]. Unique to the locality and service.
- ai_neighborhood_info: 150-200 words. Coverage zones, estimated arrival time, local landmarks (plazas, markets, stations).
- ai_seasonal_tips: 150-200 words. Seasonal advice for local climate. Spring/summer/autumn/winter specific.
- ai_emergency_guide: 200-250 words. What to do while waiting for the professional. Clear steps. Emergency numbers (112). Service-specific.

Business info to include naturally:
- Business name: Pronto24
- Phone: 936 946 639  
- 24h service, 365 days/year
`;

const output = {
  _instructions: "This is all the data needed to generate SEO content for pronto-24.com and insert it into the Neon PostgreSQL database.",
  queue_structure: buildQueue(),
  db_schema: DB_SCHEMA,
  insert_template: INSERT_TEMPLATE,
  content_field_descriptions: CONTENT_SCHEMA,
};

console.log(JSON.stringify(output, null, 2));
