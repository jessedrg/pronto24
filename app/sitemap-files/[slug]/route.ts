import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const VALID_PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

const CITIES = [
  // ============ CATALUNYA ============
  // Barcelona provincia (100+)
  "barcelona", "hospitalet-llobregat", "badalona", "terrassa", "sabadell", "mataro", "santa-coloma-gramenet",
  "cornella-llobregat", "sant-boi-llobregat", "sant-cugat-valles", "rubi", "vilanova-geltru", "viladecans",
  "prat-llobregat", "castelldefels", "granollers", "cerdanyola-valles", "mollet-valles", "gava", "esplugues-llobregat",
  "sant-feliu-llobregat", "ripollet", "sant-adria-besos", "montcada-reixac", "vic", "igualada", "vilafranca-penedes",
  "manresa", "sant-vicenc-dels-horts", "premia-mar", "sitges", "el-masnou", "martorell", "sant-pere-ribes",
  "sant-andreu-barca", "pineda-mar", "barbera-valles", "calella", "molins-rei", "cardedeu", "berga",
  "caldes-montbui", "llinars-valles", "palau-solita-plegamans", "montornes-valles", "la-garriga", "parets-valles",
  "sant-quirze-valles", "tordera", "arenys-mar", "canet-mar", "sant-celoni", "malgrat-mar", "santa-perpetua-mogoda",
  "argentona", "cubelles", "castellar-valles", "sant-sadurni-anoia", "olesa-montserrat", "abrera", "badia-valles",
  "begues", "cabrera-mar", "cabrils", "calaf", "canovelles", "capellades", "cardona", "centelles", "cervello",
  "corbera-llobregat", "esparreguera", "gelida", "gironella", "la-llagosta", "les-franqueses-valles", "manlleu",
  "masquefa", "montmelo", "navarcles", "palleja", "papiol", "piera", "polinya", "sallent", "sant-joan-despi",
  "sant-just-desvern", "santpedor", "teia", "tiana", "tona", "torello", "torrelles-llobregat", "vacarisses",
  "vallirana", "vilassar-dalt", "vilassar-mar", "sant-fost-campsentelles", "la-roca-valles", "dosrius",
  "sant-pol-mar", "montgat", "alella", "llica-amunt", "llica-vall", "santa-eulalia-roncana", "bigues-riells",
  // Girona provincia (50+)
  "girona", "figueres", "blanes", "lloret-mar", "olot", "salt", "palafrugell", "sant-feliu-guixols", "roses",
  "banyoles", "palamos", "la-bisbal-emporda", "torroella-montgri", "castello-empuries", "calonge-sant-antoni",
  "lescala", "santa-coloma-farners", "arbucies", "cassa-selva", "llagostera", "platja-aro", "puigcerda", "ripoll",
  "ribes-freser", "camprodon", "besalu", "angles", "amer", "celra", "hostalric", "llanca", "pals", "peralada",
  "portbou", "sils", "tossa-mar", "vidreres", "cadaques", "empuriabrava", "begur", "caldes-malavella", "macanet-selva",
  "fornells-selva", "quart", "vilablareix", "sarria-ter", "sant-julia-ramis", "aiguaviva",
  // Tarragona provincia (40+)
  "tarragona", "reus", "tortosa", "salou", "cambrils", "vila-seca", "valls", "vendrell", "amposta", "calafell",
  "cunit", "torredembarra", "altafulla", "sant-carles-rapita", "deltebre", "montblanc", "ulldecona", "roquetes",
  "mora-ebre", "alcanar", "constanti", "la-selva-camp", "riudoms", "mont-roig-camp", "creixell", "roda-bera",
  "les-borges-camp", "falset", "gandesa", "alcover", "arbos", "miami-platja", "hospitalet-infant",
  // Lleida provincia (30+)
  "lleida", "balaguer", "tarrega", "mollerussa", "la-seu-urgell", "cervera", "almacelles", "alpicat", "tremp",
  "solsona", "ponts", "agramunt", "les-borges-blanques", "bellpuig", "guissona", "vielha", "sort", "alfarras",
  "almenar", "artesa-segre", "juneda", "bellver-cerdanya", "el-pont-suert",
  // ============ COMUNIDAD DE MADRID ============
  "madrid", "mostoles", "alcala-henares", "fuenlabrada", "leganes", "getafe", "alcorcon", "torrejon-ardoz",
  "parla", "alcobendas", "las-rozas", "san-sebastian-reyes", "pozuelo-alarcon", "coslada", "rivas-vaciamadrid",
  "valdemoro", "majadahonda", "collado-villalba", "aranjuez", "arganda-rey", "boadilla-monte", "pinto",
  "colmenar-viejo", "tres-cantos", "san-fernando-henares", "galapagar", "arroyomolinos", "navalcarnero",
  "ciempozuelos", "villanueva-pardillo", "villaviciosa-odon", "torrelodones", "mejorada-campo", "humanes-madrid",
  "paracuellos-jarama", "algete", "moralzarzal", "villanueva-canada", "san-martin-valdeiglesias", "chinchon",
  "guadarrama", "el-escorial", "san-lorenzo-escorial", "alpedrete", "brunete", "sevilla-nueva", "villalbilla",
  "meco", "daganzo-arriba", "velilla-san-antonio", "loeches", "morata-tajuna", "campo-real", "nuevo-baztan",
  "torres-alameda", "camarma-esteruelas", "san-agustin-guadalix", "pedrezuela", "miraflores-sierra",
  "cercedilla", "navacerrada", "becerril-sierra", "hoyo-manzanares", "el-boalo", "moraleja-enmedio",
  // ============ ANDALUCIA ============
  // Malaga (50+)
  "malaga", "marbella", "mijas", "velez-malaga", "fuengirola", "torremolinos", "benalmadena", "estepona",
  "rincon-victoria", "antequera", "alhaurin-torre", "alhaurin-grande", "coin", "nerja", "torrox", "cartama",
  "ronda", "manilva", "alora", "pizarra", "campillos", "mollina", "archidona", "alameda", "casabermeja",
  "colmenar", "frigiliana", "competa", "algarrobo", "torre-mar", "benahavis", "ojen", "istan", "casares",
  "gaucin", "san-pedro-alcantara", "puerto-banus", "nueva-andalucia", "guadalmina", "cancelada",
  // Sevilla (50+)
  "sevilla", "dos-hermanas", "alcala-guadaira", "utrera", "mairena-aljarafe", "ecija", "los-palacios-villafranca",
  "la-rinconada", "carmona", "coria-rio", "moron-frontera", "tomares", "san-juan-aznalfarache", "bormujos",
  "lebrija", "marchena", "osuna", "camas", "gines", "castilleja-cuesta", "espartinas", "bollullos-mitacion",
  "lora-rio", "alcala-rio", "gelves", "mairena-alcor", "brenes", "palomares-rio", "santiponce", "la-algaba",
  "valencina-concepcion", "pilas", "sanlúcar-mayor", "olivares", "villanueva-ariscal", "salteras",
  // Granada (40+)
  "granada", "motril", "almunecar", "armilla", "maracena", "las-gabias", "loja", "baza", "guadix", "santa-fe",
  "atarfe", "albolote", "huetor-vega", "ogijares", "peligros", "pulianas", "la-zubia", "cenes-vega", "monachil",
  "salobrena", "chauchina", "fuente-vaqueros", "pinos-puente", "illora", "iznalloz", "durcal", "huetor-tajar",
  "cullar-vega", "otura", "churriana-vega", "vegas-genil", "la-herradura", "orgiva", "lanjaron",
  // Cordoba (30+)
  "cordoba", "lucena", "puente-genil", "montilla", "priego-cordoba", "cabra", "palma-rio", "baena", "pozoblanco",
  "penaroya-pueblonuevo", "aguilar-frontera", "la-carlota", "castro-rio", "rute", "villanueva-cordoba",
  "fernan-nunez", "monturque", "montemayor", "espejo", "bujalance", "carcabuey", "dona-mencia",
  // Cadiz (40+)
  "cadiz", "jerez-frontera", "algeciras", "san-fernando", "el-puerto-santa-maria", "chiclana-frontera",
  "sanlucar-barrameda", "la-linea-concepcion", "puerto-real", "arcos-frontera", "rota", "los-barrios",
  "barbate", "conil-frontera", "ubrique", "tarifa", "medina-sidonia", "vejer-frontera", "chipiona",
  "jimena-frontera", "san-roque", "trebujena", "puerto-serrano", "bornos", "villamartin", "olvera",
  // Almeria (30+)
  "almeria", "el-ejido", "roquetas-mar", "nijar", "aguadulce", "vicar", "adra", "huercal-overa", "vera",
  "garrucha", "mojacar", "cuevas-almanzora", "albox", "pulpi", "carboneras", "berja", "dalias",
  "huercal-almeria", "la-mojonera", "viator", "tabernas", "rioja", "alhama-almeria",
  // Huelva (25+)
  "huelva", "lepe", "almonte", "isla-cristina", "moguer", "ayamonte", "punta-umbria", "cartaya",
  "bollullos-par-condado", "aljaraque", "palma-condado", "palos-frontera", "san-juan-puerto", "trigueros",
  "valverde-camino", "nerva", "gibraleon", "bonares", "minas-riotinto", "villanueva-cruces", "matalascanas",
  // Jaen (25+)
  "jaen", "linares", "andujar", "ubeda", "martos", "alcala-real", "baeza", "la-carolina", "jodar",
  "mancha-real", "torre-campo", "alcaudete", "bailen", "villacarrillo", "villanueva-arzobispo",
  "santisteban-puerto", "porcuna", "torredonjimeno", "mengibar", "cazorla", "quesada", "pozo-alcon",
  // ============ COMUNIDAD VALENCIANA ============
  // Valencia (60+)
  "valencia", "torrent", "gandia", "paterna", "sagunto", "mislata", "burjassot", "ontinyent", "manises",
  "aldaia", "alfafar", "catarroja", "xirivella", "quart-poblet", "alzira", "xativa", "sueca", "cullera",
  "requena", "lliria", "algemesi", "alaquas", "picassent", "oliva", "paiporta", "massanassa", "silla",
  "benetusser", "tavernes-blanques", "moncada", "alboraya", "godella", "rocafort", "betera", "pobla-vallbona",
  "riba-roja-turia", "utiel", "chiva", "bunol", "carlet", "alginet", "beniparrell", "albal", "sedavi",
  "denia", "javea", "calpe", "altea", "benidorm", "l-eliana", "vilamarxant", "la-pobla-farnals",
  // Alicante (50+)
  "alicante", "elche", "torrevieja", "orihuela", "benidorm", "alcoy", "elda", "san-vicente-raspeig", "denia",
  "villena", "petrer", "crevillent", "villajoyosa", "novelda", "santa-pola", "ibi", "altea", "calpe",
  "muchamiel", "aspe", "campello", "san-juan-alicante", "javea", "alfaz-pi", "guardamar-segura",
  "pilar-horadada", "moraira", "teulada", "finestrat", "la-nucia", "albir", "rojales", "almoradi",
  "catral", "callosa-segura", "cox", "dolores", "rafal", "benissa", "ondara", "gata-gorgos", "pedreguer",
  // Castellon (25+)
  "castellon-plana", "vila-real", "burriana", "vinaros", "benicarlo", "onda", "almazora", "la-vall-uixo",
  "benicassim", "nules", "oropesa-mar", "segorbe", "betxi", "borriol", "lucena-cid", "alcora", "moncofar",
  "torreblanca", "peniscola", "alcala-xivert", "san-mateo",
  // ============ PAIS VASCO ============
  // Bizkaia (35+)
  "bilbao", "barakaldo", "getxo", "portugalete", "santurtzi", "basauri", "leioa", "galdakao", "durango",
  "erandio", "sestao", "gernika-lumo", "mungia", "amorebieta", "bermeo", "sopela", "algorta", "plentzia",
  "gorliz", "bakio", "berango", "loiu", "derio", "zamudio", "arrigorriaga", "zaratamo", "etxebarri",
  // Gipuzkoa (30+)
  "san-sebastian", "irun", "errenteria", "donostia", "eibar", "zarautz", "hernani", "tolosa", "arrasate",
  "hondarribia", "lasarte-oria", "pasaia", "azpeitia", "azkoitia", "bergara", "andoain", "beasain",
  "zumarraga", "legazpi", "urnieta", "oiartzun", "usurbil", "getaria", "zumaia", "deba", "mutriku", "ermua",
  // Araba (15+)
  "vitoria-gasteiz", "llodio", "amurrio", "salvatierra", "oyon", "labastida", "laguardia", "alegria-dulantzi",
  // ============ GALICIA ============
  // A Coruna (35+)
  "a-coruna", "santiago-compostela", "ferrol", "naron", "oleiros", "arteixo", "carballo", "culleredo",
  "cambre", "ames", "riveira", "boiro", "betanzos", "sada", "noia", "cee", "muxia", "fisterra", "muros",
  "porto-son", "rianxo", "padron", "ordes", "melide", "arzua", "curtis", "teo", "brion",
  // Pontevedra (30+)
  "vigo", "pontevedra", "vilagarcia-arousa", "redondela", "marin", "cangas", "moana", "ponteareas", "lalin",
  "porrino", "tui", "sanxenxo", "cambados", "o-grove", "nigran", "baiona", "gondomar", "mos",
  "salceda-caselas", "bueu", "a-guarda", "poio", "caldas-reis", "vilanova-arousa", "ribadumia",
  // Ourense (20+)
  "ourense", "verin", "o-barco-valdeorras", "carballino", "xinzo-limia", "allariz", "ribadavia",
  "o-pereiro-aguiar", "coles", "maceda", "celanova", "a-rua", "o-carballino", "bande", "leiro",
  // Lugo (20+)
  "lugo", "monforte-lemos", "viveiro", "vilalba", "sarria", "foz", "ribadeo", "burela", "chantada",
  "guitiriz", "xove", "cervo", "mondoñedo", "ourol",
  // ============ CASTILLA Y LEON ============
  // Valladolid (20+)
  "valladolid", "laguna-duero", "medina-campo", "arroyo-encomienda", "tordesillas", "tudela-duero",
  "simancas", "cigales", "zaratan", "boecillo", "aldeamayor-san-martin", "penafiel", "iscar", "olmedo",
  // Burgos (15+)
  "burgos", "miranda-ebro", "aranda-duero", "briviesca", "medina-pomar", "villarcayo", "lerma",
  "salas-infantes", "roa", "belorado",
  // Leon (20+)
  "leon", "ponferrada", "san-andres-rabanedo", "villaquilambre", "astorga", "la-baneza", "bembibre",
  "villablino", "cacabelos", "camponaraya", "valencia-don-juan", "cistierna", "bonar", "la-robla",
  // Salamanca (15+)
  "salamanca", "santa-marta-tormes", "bejar", "ciudad-rodrigo", "villamayor", "carbajosa-sagrada",
  "penaranda-bracamonte", "guijuelo", "alba-tormes",
  // Zamora, Palencia, Segovia, Soria, Avila
  "zamora", "benavente", "toro", "morales-vino", "puebla-sanabria",
  "palencia", "aguilar-campoo", "guardo", "venta-banos", "villamuriel-cerrato",
  "segovia", "cuellar", "el-espinar", "san-ildefonso", "cantalejo",
  "soria", "almazan", "el-burgo-osma", "san-esteban-gormaz", "agreda",
  "avila", "arevalo", "las-navas-marques", "candeleda", "el-barco-avila", "el-tiemblo",
  // ============ CASTILLA-LA MANCHA ============
  // Toledo (25+)
  "toledo", "talavera-reina", "illescas", "sesena", "yuncos", "fuensalida", "madridejos", "mora",
  "consuegra", "sonseca", "ocana", "villacanas", "quintanar-orden", "torrijos", "bargas", "olias-rey", "nambroca",
  // Ciudad Real (20+)
  "ciudad-real", "puertollano", "tomelloso", "alcazar-san-juan", "valdepenas", "manzanares", "daimiel",
  "la-solana", "miguelturra", "bolanos-calatrava", "socuellamos", "campo-criptana", "villanueva-infantes",
  // Albacete (15+)
  "albacete", "hellin", "villarrobledo", "almansa", "la-roda", "caudete", "tobarra", "casas-ibanez",
  // Guadalajara (15+)
  "guadalajara", "azuqueca-henares", "alovera", "el-casar", "cabanillas-campo", "marchamalo",
  "villanueva-torre", "siguenza", "molina-aragon",
  // Cuenca (15+)
  "cuenca", "tarancon", "san-clemente", "motilla-palancar", "quintanar-rey", "las-pedroneras",
  "mota-cuervo", "iniesta",
  // ============ ARAGON ============
  // Zaragoza (25+)
  "zaragoza", "calatayud", "utebo", "ejea-caballeros", "tarazona", "caspe", "la-almunia-dona-godina",
  "cuarte-huerva", "zuera", "illueca", "maria-huerva", "fuentes-ebro", "alagon", "borja", "alfajarin",
  "villanueva-gallego", "cadrete",
  // Huesca (15+)
  "huesca", "monzon", "barbastro", "jaca", "fraga", "sabinanigo", "binefar", "tamarite-litera", "graus",
  "almudevar", "ayerbe", "sarinena",
  // Teruel (12+)
  "teruel", "alcaniz", "andorra", "calamocha", "utrillas", "montalban", "albarracin", "mora-rubielos",
  "cella", "calanda",
  // ============ MURCIA ============
  "murcia", "cartagena", "lorca", "molina-segura", "alcantarilla", "mazarron", "cieza", "aguilas",
  "yecla", "jumilla", "torre-pacheco", "san-javier", "san-pedro-pinatar", "los-alcazares",
  "las-torres-cotillas", "totana", "alhama-murcia", "la-union", "archena", "mula", "caravaca-cruz",
  "calasparra", "bullas", "ceuti", "lorqui", "alguazas", "beniel", "santomera", "la-manga",
  // ============ ISLAS BALEARES ============
  "palma", "palma-mallorca", "calvia", "ibiza", "manacor", "llucmajor", "marratxi", "inca",
  "santa-eulalia-rio", "sant-josep-sa-talaia", "alcudia", "felanitx", "mahon", "ciutadella-menorca",
  "pollenca", "soller", "sant-llorenc-cardassar", "sant-antoni-portmany", "muro", "campos", "santanyi",
  "santa-margalida", "sa-pobla", "binissalem", "arta", "capdepera", "son-servera", "cala-millor",
  "magaluf", "santa-ponsa", "puerto-pollensa", "andratx", "port-andratx", "puerto-alcudia",
  // ============ ISLAS CANARIAS ============
  // Las Palmas (25+)
  "las-palmas-gran-canaria", "telde", "santa-lucia-tirajana", "arrecife", "san-bartolome-tirajana",
  "aguimes", "ingenio", "galdar", "arucas", "mogan", "puerto-rosario", "tias", "la-oliva", "pajara",
  "tuineje", "antigua", "teror", "firgas", "valsequillo", "maspalomas", "playa-ingles", "puerto-rico",
  // Tenerife (25+)
  "santa-cruz-tenerife", "san-cristobal-laguna", "la-laguna", "arona", "adeje", "la-orotava",
  "granadilla-abona", "puerto-cruz", "los-realejos", "tacoronte", "candelaria", "guia-isora",
  "icod-vinos", "santiago-teide", "guimar", "el-rosario", "tegueste", "la-victoria-acentejo",
  "san-miguel-abona", "vilaflor", "arico", "los-cristianos", "playa-americas", "costa-adeje",
  // ============ ASTURIAS ============
  "gijon", "oviedo", "aviles", "siero", "langreo", "mieres", "castrillon", "san-martin-rey-aurelio",
  "corvera-asturias", "llanera", "villaviciosa", "llanes", "cangas-onis", "navia", "luarca", "pravia",
  "grado", "tineo", "cangas-narcea", "laviana", "aller", "lena", "ribadesella", "colunga",
  // ============ CANTABRIA ============
  "santander", "torrelavega", "castro-urdiales", "camargo", "pielagos", "el-astillero", "laredo",
  "santa-cruz-bezana", "santona", "colindres", "reinosa", "suances", "noja", "comillas",
  "san-vicente-barquera", "ramales-victoria", "medio-cudeyo", "marina-cudeyo",
  // ============ NAVARRA ============
  "pamplona", "tudela", "baranain", "burlada", "estella-lizarra", "zizur-mayor", "tafalla", "ansoain",
  "villava", "berriozar", "huarte", "noain", "cintruenigo", "corella", "sanguesa", "peralta", "alsasua",
  "elizondo", "baztan", "lodosa", "olite", "viana",
  // ============ LA RIOJA ============
  "logrono", "calahorra", "arnedo", "haro", "lardero", "villamediana-iregua", "najera", "alfaro",
  "santo-domingo-calzada", "autol", "rincon-soto", "aldeanueva-ebro",
  // ============ EXTREMADURA ============
  // Badajoz (20+)
  "badajoz", "merida", "don-benito", "almendralejo", "villanueva-serena", "zafra", "montijo",
  "villafranca-barros", "olivenza", "jerez-caballeros", "azuaga", "llerena", "castuera", "fregenal-sierra",
  // Caceres (15+)
  "caceres", "plasencia", "navalmoral-mata", "coria", "trujillo", "miajadas", "talayuela", "moraleja",
  "arroyo-luz", "jaraiz-vera", "montehermoso",
  // ============ CIUDADES ADICIONALES DE ALTA DEMANDA ============
  // Zonas turisticas y comerciales
  "benidorm-playa", "torrevieja-centro", "marbella-centro", "puerto-banus-marbella", "nueva-andalucia-marbella",
  "costa-del-sol", "costa-blanca", "costa-brava", "costa-dorada", "costa-tropical",
  // Pueblos importantes adicionales
  "caravaca-cruz", "moratalla", "cehegin", "bullas", "calasparra",
  "ossa-montiel", "albatana", "fuente-alamo", "torre-enmedio", "fortuna",
  "las-pedroneras", "san-clemente", "ledana", "minglanilla", "villanueva-jara",
  // Zonas metropolitanas
  "area-metropolitana-barcelona", "area-metropolitana-madrid", "area-metropolitana-valencia",
  "area-metropolitana-sevilla", "area-metropolitana-malaga", "area-metropolitana-bilbao",
]

const MODIFIERS = [
  "", // base
  // Alta urgencia (high intent)
  "-urgente", "-24-horas", "-ahora", "-hoy", "-rapido", "-inmediato", "-ya", "-emergencia",
  // Precio (price intent)
  "-economico", "-barato", "-low-cost", "-precio", "-presupuesto", "-tarifa",
  // Disponibilidad (availability)
  "-de-guardia", "-nocturno", "-festivos", "-fin-de-semana", "-mismo-dia", "-24h",
  // Ubicacion (location)
  "-cerca-de-mi", "-a-domicilio", "-zona", "-barrio",
  // Confianza (trust)
  "-profesional", "-de-confianza", "-con-garantia", "-autorizados", "-certificado", "-oficial",
  // Servicio especifico (service specific)
  "-reparacion", "-instalacion", "-mantenimiento", "-revision", "-averias",
  // Combinaciones de alta conversion
  "-urgente-24h", "-barato-urgente", "-rapido-economico",
]

const PROBLEMS: Record<string, string[]> = {
  electricista: [
    "apagon",
    "cortocircuito",
    "olor-quemado",
    "diferencial-salta",
    "enchufes-no-funcionan",
    "luces-parpadean",
    "cuadro-electrico",
    "instalacion-electrica",
    "subida-tension",
    "cable-quemado",
  ],
  fontanero: [
    "fuga-agua",
    "tuberia-rota",
    "inundacion",
    "atasco-grave",
    "grifo-gotea",
    "cisterna-no-funciona",
    "calentador",
    "humedad",
    "bajante-roto",
    "arqueta-atascada",
  ],
  cerrajero: [
    "puerta-bloqueada",
    "cerradura-rota",
    "llave-dentro",
    "robo",
    "cambio-cerradura",
    "copia-llaves",
    "cerradura-seguridad",
    "puerta-blindada",
    "bombin-roto",
  ],
  desatascos: [
    "wc-atascado",
    "fregadero-atascado",
    "arqueta-atascada",
    "mal-olor",
    "ducha-atascada",
    "bajante-atascado",
    "limpieza-tuberias",
    "poceria",
    "fosa-septica",
  ],
  calderas: [
    "sin-agua-caliente",
    "caldera-no-enciende",
    "fuga-gas",
    "ruido-caldera",
    "revision-caldera",
    "cambio-caldera",
    "radiadores",
    "calefaccion-no-funciona",
  ],
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const baseUrl = "https://www.pronto24.xyz"
    const date = new Date().toISOString().split("T")[0]
    const id = slug.endsWith(".xml") ? slug.slice(0, -4) : slug

    const urls: string[] = []

    if (id.endsWith("-problemas")) {
      const profession = id.replace("-problemas", "")
      const problems = PROBLEMS[profession] || []
      for (const problem of problems) {
        for (const city of CITIES) {
          urls.push(`${baseUrl}/problema/${profession}/${problem}/${city}/`)
        }
      }
    } else if (id.startsWith("precio-") || id.startsWith("presupuesto-")) {
      const prefix = id.startsWith("precio-") ? "precio" : "presupuesto"
      const profession = id.replace(`${prefix}-`, "")
      if (VALID_PROFESSIONS.includes(profession)) {
        for (const city of CITIES) {
          urls.push(`${baseUrl}/${prefix}-${profession}/${city}/`)
        }
      }
    } else {
      let foundProfession = ""
      let foundModifier = ""

      if (VALID_PROFESSIONS.includes(id)) {
        foundProfession = id
        foundModifier = ""
      } else {
        for (const prof of VALID_PROFESSIONS) {
          for (const mod of MODIFIERS) {
            if (mod && id === `${prof}${mod}`) {
              foundProfession = prof
              foundModifier = mod
              break
            }
          }
          if (foundProfession) break
        }
      }

      if (foundProfession) {
        for (const city of CITIES) {
          if (foundModifier) {
            urls.push(`${baseUrl}/${foundProfession}${foundModifier}/${city}/`)
          } else {
            urls.push(`${baseUrl}/${foundProfession}/${city}/`)
          }
        }
      }
    }

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for (const url of urls) {
      xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`
    }
    xml += "</urlset>"

    return new NextResponse(xml, {
      status: 200,
      headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=86400" },
    })
  } catch (error) {
    console.error("[v0] Sitemap error:", error)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      {
        status: 200,
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      },
    )
  }
}
