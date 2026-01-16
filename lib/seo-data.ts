// SEO Data for programmatic page generation
// This file contains all professions, problems, and cities in Catalunya

export const PROFESSIONS = [
  {
    id: "electricista",
    name: "Electricista",
    namePlural: "Electricistas",
    icon: "Zap",
    color: "#FF6B35",
    urgentProblems: ["apagon", "cortocircuito", "olor-quemado", "diferencial-salta"],
    description: "Electricistas certificados disponibles 24/7",
    metaDescription: "Electricista urgente 24 horas. Llegamos en 10 minutos. Servicio profesional y garantizado.",
  },
  {
    id: "fontanero",
    name: "Fontanero",
    namePlural: "Fontaneros",
    icon: "Droplets",
    color: "#3B82F6",
    urgentProblems: ["fuga-agua", "tuberia-rota", "inundacion", "atasco-grave"],
    description: "Fontaneros profesionales disponibles 24/7",
    metaDescription: "Fontanero urgente 24 horas. Llegamos en 10 minutos. Reparaciones garantizadas.",
  },
  {
    id: "cerrajero",
    name: "Cerrajero",
    namePlural: "Cerrajeros",
    icon: "Key",
    color: "#8B5CF6",
    urgentProblems: ["puerta-bloqueada", "cerradura-rota", "llave-dentro", "robo"],
    description: "Cerrajeros de confianza disponibles 24/7",
    metaDescription: "Cerrajero urgente 24 horas. Abrimos sin daños. Llegamos en 10 minutos.",
  },
  {
    id: "desatascos",
    name: "Desatascos",
    namePlural: "Desatascos",
    icon: "Waves",
    color: "#10B981",
    urgentProblems: ["wc-atascado", "fregadero-atascado", "arqueta-atascada", "mal-olor"],
    description: "Servicio de desatascos profesional 24/7",
    metaDescription: "Desatascos urgentes 24 horas. Camión cuba. Llegamos en 10 minutos.",
  },
  {
    id: "calderas",
    name: "Calderas",
    namePlural: "Técnicos de Calderas",
    icon: "Flame",
    color: "#EF4444",
    urgentProblems: ["sin-agua-caliente", "caldera-no-enciende", "fuga-gas", "ruido-caldera"],
    description: "Técnicos de calderas certificados 24/7",
    metaDescription: "Reparación de calderas urgente 24h. Todas las marcas. Llegamos en 10 minutos.",
  },
]

export const PROBLEMS = {
  electricista: [
    { id: "apagon", name: "Apagón", description: "Sin luz en casa", urgent: true, emoji: "💡" },
    { id: "cortocircuito", name: "Cortocircuito", description: "Saltan los plomos", urgent: true, emoji: "⚡" },
    { id: "olor-quemado", name: "Olor a quemado", description: "Huele a quemado eléctrico", urgent: true, emoji: "🔥" },
    {
      id: "diferencial-salta",
      name: "Diferencial salta",
      description: "El diferencial salta solo",
      urgent: true,
      emoji: "⚠️",
    },
    {
      id: "enchufes-no-funcionan",
      name: "Enchufes no funcionan",
      description: "Enchufes sin corriente",
      urgent: false,
      emoji: "🔌",
    },
    { id: "luces-parpadean", name: "Luces parpadean", description: "Las luces parpadean", urgent: false, emoji: "✨" },
    {
      id: "cuadro-electrico",
      name: "Cuadro eléctrico",
      description: "Problemas con el cuadro",
      urgent: false,
      emoji: "⚙️",
    },
    {
      id: "instalacion-electrica",
      name: "Instalación eléctrica",
      description: "Instalación nueva o reforma",
      urgent: false,
      emoji: "🔧",
    },
    {
      id: "boletin-electrico",
      name: "Boletín eléctrico",
      description: "Certificado de instalación",
      urgent: false,
      emoji: "📋",
    },
  ],
  fontanero: [
    { id: "fuga-agua", name: "Fuga de agua", description: "Escape de agua", urgent: true, emoji: "💧" },
    { id: "tuberia-rota", name: "Tubería rota", description: "Rotura de tubería", urgent: true, emoji: "🚰" },
    { id: "inundacion", name: "Inundación", description: "Casa inundada", urgent: true, emoji: "🌊" },
    { id: "atasco-grave", name: "Atasco grave", description: "Atasco importante", urgent: true, emoji: "🚫" },
    { id: "grifo-gotea", name: "Grifo gotea", description: "Grifo que gotea", urgent: false, emoji: "💦" },
    { id: "cisterna-no-funciona", name: "Cisterna", description: "Cisterna no funciona", urgent: false, emoji: "🚽" },
    { id: "calentador", name: "Calentador", description: "Problemas con calentador", urgent: false, emoji: "🔥" },
    { id: "humedad", name: "Humedad", description: "Problemas de humedad", urgent: false, emoji: "💨" },
  ],
  cerrajero: [
    {
      id: "puerta-bloqueada",
      name: "Puerta bloqueada",
      description: "No puedo abrir la puerta",
      urgent: true,
      emoji: "🚪",
    },
    { id: "cerradura-rota", name: "Cerradura rota", description: "Cerradura estropeada", urgent: true, emoji: "🔐" },
    { id: "llave-dentro", name: "Llave dentro", description: "Me dejé las llaves dentro", urgent: true, emoji: "🔑" },
    { id: "robo", name: "Robo", description: "Intento de robo", urgent: true, emoji: "⚠️" },
    { id: "cambio-cerradura", name: "Cambio cerradura", description: "Cambiar cerradura", urgent: false, emoji: "🔄" },
    { id: "copia-llaves", name: "Copia de llaves", description: "Hacer copias de llaves", urgent: false, emoji: "🗝️" },
    {
      id: "cerradura-seguridad",
      name: "Cerradura seguridad",
      description: "Instalar cerradura de seguridad",
      urgent: false,
      emoji: "🛡️",
    },
  ],
  desatascos: [
    { id: "wc-atascado", name: "WC atascado", description: "El váter está atascado", urgent: true, emoji: "🚽" },
    {
      id: "fregadero-atascado",
      name: "Fregadero atascado",
      description: "El fregadero no traga",
      urgent: true,
      emoji: "🍽️",
    },
    { id: "arqueta-atascada", name: "Arqueta atascada", description: "Arqueta obstruida", urgent: true, emoji: "🕳️" },
    { id: "mal-olor", name: "Mal olor", description: "Mal olor en tuberías", urgent: true, emoji: "👃" },
    { id: "ducha-atascada", name: "Ducha atascada", description: "La ducha no traga", urgent: false, emoji: "🚿" },
    { id: "bajante-atascado", name: "Bajante atascado", description: "Bajante obstruido", urgent: false, emoji: "⬇️" },
    {
      id: "limpieza-tuberias",
      name: "Limpieza tuberías",
      description: "Limpieza preventiva",
      urgent: false,
      emoji: "🧹",
    },
  ],
  calderas: [
    {
      id: "sin-agua-caliente",
      name: "Sin agua caliente",
      description: "No sale agua caliente",
      urgent: true,
      emoji: "❄️",
    },
    {
      id: "caldera-no-enciende",
      name: "Caldera no enciende",
      description: "La caldera no arranca",
      urgent: true,
      emoji: "🔥",
    },
    { id: "fuga-gas", name: "Fuga de gas", description: "Posible fuga de gas", urgent: true, emoji: "⚠️" },
    { id: "ruido-caldera", name: "Ruido caldera", description: "La caldera hace ruido", urgent: true, emoji: "🔊" },
    { id: "revision-caldera", name: "Revisión caldera", description: "Revisión anual", urgent: false, emoji: "🔧" },
    { id: "cambio-caldera", name: "Cambio caldera", description: "Sustituir caldera", urgent: false, emoji: "🔄" },
    { id: "radiadores", name: "Radiadores", description: "Problemas con radiadores", urgent: false, emoji: "🌡️" },
  ],
}

// All cities and towns in Catalunya (organized by province)
export const CITIES_CATALUNYA = {
  barcelona: [
    // Barcelona city and metropolitan area
    "barcelona",
    "hospitalet-llobregat",
    "badalona",
    "terrassa",
    "sabadell",
    "mataro",
    "santa-coloma-gramenet",
    "cornella-llobregat",
    "sant-boi-llobregat",
    "sant-cugat-valles",
    "rubi",
    "vilanova-geltru",
    "viladecans",
    "prat-llobregat",
    "castelldefels",
    "granollers",
    "cerdanyola-valles",
    "mollet-valles",
    "gava",
    "esplugues-llobregat",
    "sant-feliu-llobregat",
    "ripollet",
    "sant-adria-besos",
    "montcada-reixac",
    "vic",
    "igualada",
    "vilafranca-penedes",
    "manresa",
    "sant-vicenc-dels-horts",
    "premia-mar",
    "sitges",
    "el-masnou",
    "martorell",
    "sant-pere-ribes",
    "sant-andreu-barca",
    "pineda-mar",
    "barberà-valles",
    "calella",
    "molins-rei",
    "cardedeu",
    "berga",
    "caldes-montbui",
    "llinars-valles",
    "palau-solita-plegamans",
    "montornes-valles",
    "la-garriga",
    "parets-valles",
    "sant-quirze-valles",
    "tordera",
    "arenys-mar",
    "canet-mar",
    "sant-celoni",
    "malgrat-mar",
    "santa-perpetua-mogoda",
    "argentona",
    "cubelles",
    "palafrugell",
    "lloret-mar",
    "blanes",
    "castellar-valles",
    "sant-sadurni-anoia",
    "olesa-montserrat",
    // More Barcelona province towns
    "abrera",
    "badia-valles",
    "balenyà",
    "begues",
    "bellaterra",
    "bigues-riells",
    "cabrera-mar",
    "cabrils",
    "calaf",
    "caldes-estrac",
    "canovelles",
    "capellades",
    "cardona",
    "centelles",
    "cervelló",
    "corbera-llobregat",
    "dosrius",
    "esparreguera",
    "gelida",
    "gironella",
    "la-llagosta",
    "les-franqueses-valles",
    "lliçà-amunt",
    "lliçà-vall",
    "malla",
    "manlleu",
    "masquefa",
    "montmelo",
    "navarcles",
    "navas",
    "olerdola",
    "olivella",
    "orista",
    "pacs-penedes",
    "palleja",
    "papiol",
    "piera",
    "polinya",
    "pontons",
    "puig-reig",
    "roda-ter",
    "rubi",
    "sallent",
    "sant-iscle-vallalta",
    "sant-joan-despi",
    "sant-joan-vilatorrada",
    "sant-just-desvern",
    "sant-llorenc-hortons",
    "sant-marti-sarroca",
    "sant-pol-mar",
    "sant-quintí-mediona",
    "santa-coloma-cervello",
    "santa-eulalia-roncana",
    "santa-maria-olo",
    "santa-susanna",
    "santpedor",
    "seva",
    "subirats",
    "taradell",
    "teia",
    "tiana",
    "tona",
    "torello",
    "torrelles-llobregat",
    "vacarisses",
    "vallbona-anoia",
    "vallgorguina",
    "vallirana",
    "vallromanes",
    "vilassar-dalt",
    "vilassar-mar",
  ],
  girona: [
    "girona",
    "figueres",
    "blanes",
    "lloret-mar",
    "olot",
    "salt",
    "palafrugell",
    "sant-feliu-guixols",
    "roses",
    "banyoles",
    "palamos",
    "la-bisbal-emporda",
    "torroella-montgri",
    "castello-empuries",
    "calonge-sant-antoni",
    "lescala",
    "santa-coloma-farners",
    "arbucies",
    "cassà-selva",
    "llagostera",
    "platja-aro",
    "puigcerda",
    "ripoll",
    "ribes-freser",
    "camprodon",
    "besalu",
    "bàscara",
    "anglès",
    "amer",
    "celrà",
    "fornells-selva",
    "hostalric",
    "llançà",
    "maçanet-selva",
    "pals",
    "peralada",
    "portbou",
    "quart",
    "riudellots-selva",
    "sils",
    "tossa-mar",
    "vilablareix",
    "vidreres",
    "vilobí-onyar",
    "cadaqués",
    "empuriabrava",
  ],
  tarragona: [
    "tarragona",
    "reus",
    "tortosa",
    "salou",
    "cambrils",
    "vila-seca",
    "valls",
    "vendrell",
    "amposta",
    "calafell",
    "cunit",
    "torredembarra",
    "altafulla",
    "sant-carles-rapita",
    "deltebre",
    "montblanc",
    "ulldecona",
    "roquetes",
    "mora-ebre",
    "alcanar",
    "constanti",
    "la-selva-camp",
    "riudoms",
    "mont-roig-camp",
    "creixell",
    "roda-bera",
    "bonavista",
    "les-borges-camp",
    "falset",
    "gandesa",
    "xerta",
    "alcover",
    "arbos",
  ],
  lleida: [
    "lleida",
    "balaguer",
    "tarrega",
    "mollerussa",
    "la-seu-urgell",
    "cervera",
    "almacelles",
    "alpicat",
    "tremp",
    "solsona",
    "ponts",
    "agramunt",
    "les-borges-blanques",
    "bellpuig",
    "guissona",
    "vielha",
    "sort",
    "alfarras",
    "almenar",
    "artesa-segre",
    "juneda",
    "puigverd-lleida",
    "rossello",
    "torre-serona",
    "bellver-cerdanya",
    "el-pont-suert",
    "esterri-aneu",
  ],
}

// Helper to get all cities as flat array
export function getAllCities(): string[] {
  return Object.values(CITIES_CATALUNYA).flat()
}

// Helper to get city display name
export function getCityDisplayName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace("Llobregat", "de Llobregat")
    .replace("Valles", "del Vallès")
    .replace("Mar", "de Mar")
    .replace("Emporda", "d'Empordà")
    .replace("Selva", "de la Selva")
    .replace("Camp", "del Camp")
}

// Helper to get province from city
export function getCityProvince(citySlug: string): string {
  for (const [province, cities] of Object.entries(CITIES_CATALUNYA)) {
    if (cities.includes(citySlug)) {
      return province.charAt(0).toUpperCase() + province.slice(1)
    }
  }
  return "Catalunya"
}

// Generate all possible URL combinations
export function generateAllUrls(): string[] {
  const urls: string[] = []
  const cities = getAllCities()

  for (const profession of PROFESSIONS) {
    // /profesion
    urls.push(`/${profession.id}`)

    // /profesion/ciudad
    for (const city of cities) {
      urls.push(`/${profession.id}/${city}`)
    }

    // /profesion-urgente/ciudad
    for (const city of cities) {
      urls.push(`/${profession.id}-urgente/${city}`)
    }

    // /profesion/problema/ciudad (only for urgent problems)
    const problems = PROBLEMS[profession.id as keyof typeof PROBLEMS] || []
    for (const problem of problems) {
      for (const city of cities) {
        urls.push(`/${profession.id}/${problem.id}/${city}`)
      }
    }
  }

  return urls
}

// Get nearby cities for a given city
export function getNearbyCities(citySlug: string, limit = 6): string[] {
  const province = Object.entries(CITIES_CATALUNYA).find(([_, cities]) => cities.includes(citySlug))?.[0]

  if (!province) return []

  const provinceCities = CITIES_CATALUNYA[province as keyof typeof CITIES_CATALUNYA]
  return provinceCities.filter((c) => c !== citySlug).slice(0, limit)
}
