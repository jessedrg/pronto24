const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '..', "Municipis_d'Espanya_20260118.csv");
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Function to convert name to URL slug
function toSlug(name) {
  // Handle names with "/" - take the first part (Spanish name)
  if (name.includes('/')) {
    name = name.split('/')[0].trim();
  }
  
  // Handle names with ", " articles at the end like "Gineta, La" -> "la-gineta"
  if (name.includes(', ')) {
    const parts = name.split(', ');
    if (parts.length === 2 && ['El', 'La', 'Los', 'Las', 'Les', 'L\'', 'Els', 'Es', 'Sa'].includes(parts[1].trim())) {
      name = parts[1].trim() + ' ' + parts[0].trim();
    }
  }
  
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/ñ/g, 'n')
    .replace(/ç/g, 'c')
    .replace(/l·l/g, 'll')
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Parse CSV
const lines = csvContent.split('\n');
const cities = new Set();

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  // Parse CSV line (handle quoted values)
  const match = line.match(/"([^"]*)","([^"]*)","([^"]*)"/);
  if (match) {
    const name = match[2];
    const slug = toSlug(name);
    if (slug && slug.length > 1) {
      cities.add(slug);
    }
  }
}

// Convert to sorted array
const citiesArray = Array.from(cities).sort();

console.log(`Total municipalities: ${citiesArray.length}`);

// Generate TypeScript file content
const tsContent = `// =============================================================================
// SITEMAP DATA - Single Source of Truth for SEO URLs
// =============================================================================
// Auto-generated from Spanish municipalities CSV
// Total: ${citiesArray.length} municipalities
// =============================================================================

export const VALID_PROFESSIONS = [
  "electricista", "fontanero", "cerrajero", "desatascos", "calderas"
] as const;

export type Profession = typeof VALID_PROFESSIONS[number];

// =============================================================================
// HIGH-INTENT KEYWORD MODIFIERS
// =============================================================================
export const MODIFIERS = [
  "", // base (no modifier)
  // Urgencia (highest intent)
  "-urgente", "-24-horas", "-ahora", "-hoy", "-rapido", "-inmediato", "-ya",
  "-emergencia", "-express", "-24h", "-urgencias", "-sos", "-al-momento",
  // Precio (commercial intent)
  "-economico", "-barato", "-low-cost", "-mejor-precio", "-asequible",
  "-sin-compromiso", "-gratis-presupuesto", "-precios-justos", "-oferta",
  // Disponibilidad
  "-de-guardia", "-nocturno", "-festivos", "-fin-de-semana", "-mismo-dia",
  "-sabados", "-domingos", "-noche", "-365-dias",
  // Ubicacion
  "-cerca-de-mi", "-a-domicilio", "-zona", "-centro", "-local",
  // Confianza
  "-profesional", "-de-confianza", "-con-garantia", "-autorizados", "-certificado",
  "-oficial", "-titulado", "-homologado", "-experto", "-especialista", "-recomendado",
  // Servicio
  "-reparacion", "-instalacion", "-mantenimiento", "-revision", "-averias",
  // Combos alta conversion
  "-urgente-24h", "-barato-urgente", "-rapido-economico", "-urgente-barato",
  "-24h-economico", "-profesional-urgente", "-economico-24h",
] as const;

export type Modifier = typeof MODIFIERS[number];

// =============================================================================
// PROBLEMS BY PROFESSION
// =============================================================================
export const PROBLEMS: Record<Profession, readonly string[]> = {
  electricista: [
    "apagon", "cortocircuito", "olor-quemado", "diferencial-salta", "enchufes-no-funcionan",
    "luces-parpadean", "cuadro-electrico", "instalacion-electrica", "subida-tension",
    "cable-quemado", "fusibles", "interruptor-no-funciona", "enchufe-quemado",
    "sobrecarga-electrica", "corte-luz",
  ],
  fontanero: [
    "fuga-agua", "tuberia-rota", "inundacion", "atasco-grave", "grifo-gotea",
    "cisterna-no-funciona", "calentador", "humedad", "bajante-roto", "arqueta-atascada",
    "agua-no-sale", "presion-baja", "tuberia-atascada", "desague-lento", "rotura-tuberia",
  ],
  cerrajero: [
    "puerta-bloqueada", "cerradura-rota", "llave-dentro", "robo", "cambio-cerradura",
    "copia-llaves", "cerradura-seguridad", "puerta-blindada", "bombin-roto", "llave-rota",
    "cerrojo-atascado", "puerta-no-abre", "cerradura-atascada", "apertura-urgente",
  ],
  desatascos: [
    "wc-atascado", "fregadero-atascado", "arqueta-atascada", "mal-olor", "ducha-atascada",
    "bajante-atascado", "limpieza-tuberias", "poceria", "fosa-septica", "atasco-grave",
    "desague-atascado", "tuberia-obstruida", "alcantarillado", "sumidero-atascado",
  ],
  calderas: [
    "sin-agua-caliente", "caldera-no-enciende", "fuga-gas", "ruido-caldera", "revision-caldera",
    "cambio-caldera", "radiadores", "calefaccion-no-funciona", "caldera-pierde-agua",
    "presion-caldera", "termostato-roto", "piloto-no-enciende", "caldera-se-apaga",
  ],
} as const;

// =============================================================================
// ALL SPANISH MUNICIPALITIES (${citiesArray.length} total)
// =============================================================================
export const CITIES: readonly string[] = [
${citiesArray.map(c => `  "${c}",`).join('\n')}
] as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================
export function getCityDisplayName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function isValidCity(slug: string): boolean {
  return CITIES.includes(slug);
}

export function isValidProfession(id: string): boolean {
  return VALID_PROFESSIONS.includes(id as Profession);
}
`;

// Write the TypeScript file
const outputPath = path.join(__dirname, '..', 'lib', 'sitemap-data.ts');
fs.writeFileSync(outputPath, tsContent);

console.log(`Generated: ${outputPath}`);
console.log(`Sample cities: ${citiesArray.slice(0, 10).join(', ')}`);
