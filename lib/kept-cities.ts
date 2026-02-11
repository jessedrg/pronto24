// =============================================================================
// KEPT CITIES — Single source of truth for pronto-24.com
// =============================================================================
// Based on GSC performance data (2026-02-11) + provincial capitals.
// Desatascos-only consolidation strategy.
// =============================================================================

export const KEPT_CITIES: string[] = [
  // ── Provincial capitals + mega cities ──────────────────────────────
  "madrid", "barcelona", "valencia", "sevilla", "zaragoza", "malaga", "murcia",
  "bilbao", "alicante", "cordoba", "valladolid", "vigo", "gijon", "a-coruna",
  "granada", "palma-mallorca", "santa-cruz-tenerife", "las-palmas-gran-canaria",
  "oviedo", "pamplona", "santander", "san-sebastian", "vitoria-gasteiz",
  "salamanca", "burgos", "leon", "logrono", "badajoz", "caceres", "toledo",
  "albacete", "ciudad-real", "guadalajara", "cuenca", "huesca", "teruel",
  "lleida", "tarragona", "girona", "castellon-plana", "almeria", "huelva",
  "jaen", "cadiz", "pontevedra", "ourense", "lugo", "segovia", "avila",
  "soria", "palencia", "zamora",

  // ── Large suburban / satellite cities ──────────────────────────────
  "mostoles", "alcala-henares", "fuenlabrada", "leganes", "getafe", "alcorcon",
  "torrejon-ardoz", "parla", "alcobendas", "hospitalet-llobregat", "badalona",
  "terrassa", "sabadell", "mataro", "dos-hermanas", "marbella", "torrevieja",
  "elche", "cartagena", "jerez-frontera", "reus", "torrent", "gandia",
  "benidorm", "mijas", "fuengirola", "estepona", "barakaldo", "getxo",
  "torrelavega", "algeciras", "lorca", "santiago-compostela", "ferrol",
  "talavera-reina", "el-ejido", "roquetas-mar", "san-fernando",
  "pozuelo-alarcon", "las-rozas", "san-sebastian-reyes", "majadahonda",
  "santa-coloma-gramenet", "rubi", "vilafranca-penedes", "granollers",
  "pineda-de-mar", "martorell", "calafell",

  // ── GSC clicks: cities that generated actual clicks ────────────────
  "bejar",

  // ── GSC impressions: high-impression cities for desatascos ─────────
  "sant-cugat", "sant-cugat-valles", "iniesta", "balaguer", "mora",
  "alcora", "guarena", "pollenca", "huelves", "almenara", "castellar",
  "siguenza", "cuellar", "sabadell",
]

export const KEPT_CITIES_SET = new Set(KEPT_CITIES)
