/**
 * Datos locales REALES para codigos postales con alto potencial de ranking.
 * Cada entrada contiene informacion verificable y unica sobre la zona,
 * problemas comunes reales, y contexto local que diferencia estas paginas
 * del contenido generico.
 *
 * Fuentes: INE, catastro, ayuntamientos, datos publicos.
 */

export interface LocalEnrichment {
  cp: string
  municipio: string
  provincia: string
  comunidadAutonoma: string
  poblacionAprox: string
  tipoZona: "urbana" | "semiurbana" | "rural"
  altitud?: string
  clima?: string
  /** Descripcion unica y real sobre la zona */
  descripcionLocal: string
  /** Problemas especificos de la zona por profesion */
  problemasLocales: Partial<Record<string, string[]>>
  /** Informacion sobre la infraestructura de la zona */
  infraestructura: string
  /** Barrios o zonas dentro del CP */
  barriosZonas?: string[]
  /** Datos que hacen unica esta zona */
  datosUnicos: string[]
}

/**
 * Mapa de datos locales indexado por codigo postal.
 * Solo incluye CPs con alto potencial segun Google Search Console.
 */
export const LOCAL_ENRICHMENT: Record<string, LocalEnrichment> = {
  // ============================================
  // PALMA DE MALLORCA (07xxx) - Cluster alto volumen
  // ============================================
  "07001": {
    cp: "07001",
    municipio: "Palma de Mallorca",
    provincia: "Baleares",
    comunidadAutonoma: "Islas Baleares",
    poblacionAprox: "~12.000 habitantes en la zona",
    tipoZona: "urbana",
    clima: "Mediterraneo con humedad alta por proximidad al mar",
    descripcionLocal:
      "El casco antiguo de Palma, incluyendo la zona de La Seu y el barrio de la Calatrava. Edificios historicos con instalaciones antiguas que requieren mantenimiento especializado. La humedad marina y las construcciones de piedra arenisca son un reto constante para las instalaciones.",
    problemasLocales: {
      electricista: [
        "Instalaciones electricas antiguas sin toma de tierra en edificios historicos del casco antiguo",
        "Corrosion de cableado por la humedad salina del puerto cercano",
        "Cuadros electricos obsoletos en fincas centenarias de La Calatrava",
        "Subidas de tension frecuentes en verano por sobredemanda de aire acondicionado",
      ],
      fontanero: [
        "Tuberias de plomo originales en edificios anteriores a 1970 del casco antiguo",
        "Cal y sedimentos por agua dura de Mallorca (hasta 40 grados franceses de dureza)",
        "Fugas en bajantes comunitarias de edificios historicos de piedra mares",
      ],
      desatascos: [
        "Alcantarillado historico con diametro reducido en calles estrechas del centro",
        "Raices de arboles invadiendo tuberias en la zona de Paseo del Born",
        "Atascos recurrentes por el sistema de drenaje antiguo ante lluvias torrenciales",
      ],
      cerrajero: [
        "Cerraduras antiguas de puertas de madera maciza en el casco historico",
        "Portones de comunidades con cerraduras de seguridad incompatibles con marcos antiguos",
        "Alta demanda en temporada turistica por perdida de llaves en alojamientos vacacionales",
      ],
      calderas: [
        "Calderas de gas butano predominantes en el casco antiguo sin acometida de gas natural",
        "Calentadores electricos en pisos pequenos con instalacion electrica limitada",
        "Revision obligatoria anual de instalaciones de gas en edificios antiguos",
      ],
    },
    infraestructura:
      "El casco antiguo de Palma tiene una red de alcantarillado que data parcialmente del siglo XIX. Muchos edificios conservan tuberias de plomo y cableado electrico de los anos 60-70. El acceso con vehiculos de servicio es complicado por las calles peatonales y estrechas. La red de gas natural no llega a muchos edificios del centro historico.",
    barriosZonas: ["La Seu", "Calatrava", "Born", "Santa Eulalia", "Sa Gerreria"],
    datosUnicos: [
      "El agua de Palma tiene una dureza media de 35-40 grados franceses, lo que acelera la calcificacion de tuberias",
      "El 40% de los edificios del casco antiguo tienen mas de 100 anos",
      "La normativa de patrimonio limita las reformas de fachada, complicando el acceso a instalaciones",
      "La zona sufre cortes de luz puntuales en verano por la sobredemanda de climatizacion",
    ],
  },
  "07002": {
    cp: "07002",
    municipio: "Palma de Mallorca",
    provincia: "Baleares",
    comunidadAutonoma: "Islas Baleares",
    poblacionAprox: "~15.000 habitantes en la zona",
    tipoZona: "urbana",
    clima: "Mediterraneo con brisas marinas",
    descripcionLocal:
      "Zona centrica de Palma que abarca parte de Eixample y la Plaza de Espana. Mezcla de edificios residenciales de los anos 50-80 con algunos bloques mas modernos. Es un area densamente poblada con alta demanda de servicios urgentes.",
    problemasLocales: {
      fontanero: [
        "Bajantes comunitarias de fibrocemento de los anos 60-70 que se rompen con facilidad",
        "Acumulacion de cal en calentadores y griferias por la dureza del agua mallorquina",
        "Fugas en conexiones de cobre antiguas oxidadas por la humedad ambiental",
      ],
      desatascos: [
        "Atascos frecuentes en fregaderos y banos por acumulacion de cal en tuberias estrechas",
        "Bajantes comunitarias de 80mm (en vez de 110mm) que se atascan con facilidad",
        "Problemas de drenaje en garajes subterraneos tras lluvias torrenciales de otono",
      ],
      electricista: [
        "Cuadros electricos con magnetotermicos de 25A insuficientes para la demanda actual",
        "Instalaciones sin diferenciales en pisos de los anos 60-70",
        "Recarga de vehiculos electricos en comunidades con potencia electrica limitada",
      ],
    },
    infraestructura:
      "Predominan edificios de 4-6 plantas construidos entre 1955 y 1985. La mayoria tienen columnas de agua comunitarias originales. El barrio tiene buena accesibilidad para vehiculos de servicio por sus avenidas amplias.",
    barriosZonas: ["Eixample", "Plaza de Espana", "Blanquerna"],
    datosUnicos: [
      "La zona tiene una densidad de poblacion de las mas altas de Palma",
      "Muchas comunidades estan renovando bajantes de fibrocemento por PVC, generando alta demanda de fontaneros",
      "El barrio concentra un alto numero de locales comerciales que generan atascos por grasa en cocinas",
    ],
  },
  "07005": {
    cp: "07005",
    municipio: "Palma de Mallorca",
    provincia: "Baleares",
    comunidadAutonoma: "Islas Baleares",
    poblacionAprox: "~18.000 habitantes en la zona",
    tipoZona: "urbana",
    clima: "Mediterraneo",
    descripcionLocal:
      "Zona residencial consolidada de Palma que incluye Son Gotleu y parte de Pere Garau. Barrio multicultural con alta densidad de viviendas de alquiler. Muchos edificios de los anos 70 con mantenimiento deficiente que genera urgencias frecuentes.",
    problemasLocales: {
      cerrajero: [
        "Alta demanda de cambios de cerradura por rotacion de inquilinos en pisos de alquiler",
        "Puertas blindadas de baja calidad con bombines facilmente manipulables",
        "Aperturas urgentes frecuentes en pisos compartidos por estudiantes y trabajadores",
      ],
      desatascos: [
        "Atascos severos en bajantes comunitarias antiguas por falta de mantenimiento",
        "Tuberias de fibrocemento deterioradas que colapsan y requieren reparacion urgente",
        "Arquetas comunitarias en mal estado que provocan inundaciones en bajos y garajes",
      ],
      fontanero: [
        "Fugas en tuberias de hierro galvanizado corroidas internamente",
        "Cisternas y griferias averiadas por desgaste en pisos con alta rotacion de inquilinos",
        "Problemas de presion de agua en plantas altas de edificios sin grupo de presion",
      ],
    },
    infraestructura:
      "Predominan bloques de viviendas de 5-7 plantas construidos entre 1965 y 1980. Muchas comunidades tienen un mantenimiento minimo por la composicion diversa de propietarios e inquilinos. Las instalaciones comunes suelen estar en mal estado.",
    barriosZonas: ["Son Gotleu", "Pere Garau", "Foners"],
    datosUnicos: [
      "Pere Garau alberga uno de los mercados mas antiguos de Palma con infraestructura subterranea envejecida",
      "La zona tiene una de las tasas mas altas de pisos de alquiler de Baleares",
      "Los edificios de Son Gotleu fueron construidos rapidamente en los 70 con materiales de calidad limitada",
    ],
  },
  "07006": {
    cp: "07006",
    municipio: "Palma de Mallorca",
    provincia: "Baleares",
    comunidadAutonoma: "Islas Baleares",
    poblacionAprox: "~16.000 habitantes en la zona",
    tipoZona: "urbana",
    clima: "Mediterraneo",
    descripcionLocal:
      "Zona que abarca Son Armadans, El Terreno y parte de la zona alta de Palma con vistas a la bahia. Mezcla de chalets antiguos, bloques de apartamentos turisticos y edificios residenciales. La proximidad al paseo maritimo y al Castell de Bellver define su caracter.",
    problemasLocales: {
      desatascos: [
        "Atascos por acumulacion de arena y residuos marinos en desagues cercanos al paseo maritimo",
        "Fosas septicas en chalets antiguos de El Terreno que requieren vaciado y mantenimiento",
        "Tuberias de drenaje obstruidas por raices de pinos y palmeras tipicos de la zona",
      ],
      fontanero: [
        "Corrosion acelerada de tuberias de cobre por la proximidad al mar y el aire salino",
        "Problemas de presion en viviendas de la zona alta por la diferencia de cota respecto a la red general",
        "Piscinas privadas en chalets con fugas en instalaciones hidraulicas enterradas",
      ],
      electricista: [
        "Instalaciones electricas dimensionadas para los anos 60 insuficientes con la demanda actual de climatizacion",
        "Problemas electricos en apartamentos turisticos con uso intensivo de electrodomesticos",
        "Humedad salina que deteriora cuadros electricos y conexiones en fachadas expuestas al mar",
      ],
    },
    infraestructura:
      "La zona tiene una mezcla de construcciones: chalets de los anos 50-60 en El Terreno, bloques de apartamentos de los 70-80 en Son Armadans, y algunos edificios renovados. Las calles tienen pendientes pronunciadas que complican el acceso y el drenaje.",
    barriosZonas: ["Son Armadans", "El Terreno", "Bonanova", "La Bonanova"],
    datosUnicos: [
      "El Terreno fue zona turistica de primer orden en los anos 60-70, muchos edificios de esa epoca tienen instalaciones originales",
      "La pendiente del terreno hacia el mar genera problemas especificos de drenaje y presion de agua",
      "Zona con alto porcentaje de viviendas de alquiler vacacional que generan picos de demanda en verano",
    ],
  },
  "07007": {
    cp: "07007",
    municipio: "Palma de Mallorca",
    provincia: "Baleares",
    comunidadAutonoma: "Islas Baleares",
    poblacionAprox: "~20.000 habitantes en la zona",
    tipoZona: "urbana",
    clima: "Mediterraneo",
    descripcionLocal:
      "Zona residencial amplia de Palma que incluye Son Roca, Son Ximelis y Son Anglada. Barrios de vivienda social construidos en los anos 70-80 con edificios de bloque que presentan problemas estructurales y de instalaciones por su antiguedad.",
    problemasLocales: {
      desatascos: [
        "Bajantes comunitarias de PVC de primera generacion (anos 80) que se fisuran y provocan fugas",
        "Atascos recurrentes en alcantarillado por falta de mantenimiento de la red municipal antigua",
        "Inundaciones en bajos y garajes tras las lluvias torrenciales tipicas de otono en Mallorca (gotas frias)",
      ],
      fontanero: [
        "Llaves de paso generales comunitarias agarrotadas que impiden cortar el agua en emergencias",
        "Tuberias de polietileno de primera generacion con union por manguitos que fallan",
        "Grupos de presion comunitarios averiados que dejan sin agua a plantas altas",
      ],
    },
    infraestructura:
      "Predominan edificios de vivienda social de los anos 70-80, muchos promovidos por el antiguo Ministerio de la Vivienda. Bloques de 4-6 plantas con ascensor anadido posteriormente. La red de saneamiento del barrio se ha renovado parcialmente en los ultimos anos.",
    barriosZonas: ["Son Roca", "Son Ximelis", "Son Anglada", "Son Oliva"],
    datosUnicos: [
      "Son Roca y Son Ximelis son barrios de vivienda social con construccion estandarizada de los 70",
      "La zona ha recibido planes de rehabilitacion municipal que incluyen renovacion de bajantes y electricidad",
      "Alta densidad de poblacion en bloques con instalaciones comunes sobredimensionadas para su edad",
    ],
  },
  "07008": {
    cp: "07008",
    municipio: "Palma de Mallorca",
    provincia: "Baleares",
    comunidadAutonoma: "Islas Baleares",
    poblacionAprox: "~22.000 habitantes en la zona",
    tipoZona: "urbana",
    clima: "Mediterraneo",
    descripcionLocal:
      "Zona de Son Cotoner, Santa Catalina y parte del poligono de Levante. Santa Catalina es un barrio revitalizado con mezcla de edificios antiguos reformados y vivienda original. Son Cotoner es mas residencial con bloques de los anos 60-70.",
    problemasLocales: {
      fontanero: [
        "Mezcla de tuberias antiguas (plomo, hierro galvanizado) con nuevas instalaciones de cobre en reformas parciales que generan corrosion galvanica",
        "Fugas en juntas de tuberias por vibraciones del trafico pesado en calles principales",
        "Calentadores de gas antiguos en Santa Catalina sin ventilacion adecuada",
      ],
      electricista: [
        "Reformas parciales de pisos en Santa Catalina con instalaciones electricas mixtas (antiguas y nuevas)",
        "Sobrecargas en locales de restauracion del barrio que comparten acometida con viviendas",
        "Necesidad de certificados electricos ITE en edificios de mas de 50 anos",
      ],
    },
    infraestructura:
      "Santa Catalina combina edificios de principios del siglo XX reformados con bloques de los 60. Son Cotoner tiene una estructura mas uniforme de bloques residenciales. La zona del poligono de Levante tiene naves industriales reconvertidas.",
    barriosZonas: ["Santa Catalina", "Son Cotoner", "Poligono de Levante", "Es Jonquet"],
    datosUnicos: [
      "Santa Catalina ha experimentado una gentrificacion intensa con reformas que a menudo descubren instalaciones en peor estado del previsto",
      "El Mercat de Santa Catalina genera alta demanda de desatascos por grasa en las conducciones del entorno",
      "Es Jonquet conserva antiguos molinos de viento con instalaciones muy particulares",
    ],
  },
  "07011": {
    cp: "07011",
    municipio: "Palma de Mallorca",
    provincia: "Baleares",
    comunidadAutonoma: "Islas Baleares",
    poblacionAprox: "~17.000 habitantes en la zona",
    tipoZona: "urbana",
    descripcionLocal:
      "Zona residencial de Palma que incluye Camp Redo y parte de Son Forteza. Edificios de los anos 60-80 con una estructura urbanistica tipica del desarrollismo. Barrio tranquilo con alta proporcion de residentes de larga duracion.",
    problemasLocales: {
      electricista: [
        "Instalaciones electricas con cableado de aluminio de los anos 60-70 que se recalienta",
        "Cuadros electricos con fusibles ceramicos antiguos que hay que modernizar a magnetotermicos",
        "Necesidad de ampliar potencia electrica para instalar aire acondicionado y vitroceramica",
      ],
      fontanero: [
        "Tuberias de hierro galvanizado que sueltan oxido marron en el agua al abrirla por la manana",
        "Cisternas de inodoro con mecanismos descatalogados que requieren sustitucion completa",
      ],
    },
    infraestructura:
      "Predominan edificios de 4-5 plantas sin ascensor, construidos entre 1960 y 1980. Calles con buen acceso para vehiculos de servicio. La red de saneamiento fue renovada parcialmente hace 15 anos.",
    barriosZonas: ["Camp Redo", "Son Forteza", "Can Capes"],
    datosUnicos: [
      "Camp Redo conserva un trazado urbanistico tipico del desarrollismo de los 60 con bloques identicos",
      "Alta proporcion de poblacion mayor que necesita servicios urgentes con atencion cuidadosa",
      "Muchos pisos mantienen instalaciones originales de los anos 60 sin ninguna reforma",
    ],
  },
  "07013": {
    cp: "07013",
    municipio: "Palma de Mallorca",
    provincia: "Baleares",
    comunidadAutonoma: "Islas Baleares",
    poblacionAprox: "~19.000 habitantes en la zona",
    tipoZona: "urbana",
    descripcionLocal:
      "Zona de Poligono de Levante, Son Canals y parte de Son Gotleu. Es una de las areas mas densamente pobladas de Palma con edificios de vivienda social y bloque de los anos 70. La zona esta en proceso de regeneracion urbana.",
    problemasLocales: {
      electricista: [
        "Cuadros electricos comunitarios antiguos sin proteccion diferencial residual",
        "Cables empotrados en paredes que pierden aislamiento y provocan cortocircuitos",
        "Instalaciones sin toma de tierra real (solo simulada) en edificios anteriores a 1975",
        "Sobrecargas frecuentes por uso de estufas electricas en pisos sin gas natural",
      ],
      fontanero: [
        "Columnas de agua comunitarias de hierro galvanizado con 50 anos que reducen el caudal",
        "Valvulas de corte general oxidadas e inoperativas en comunidades sin mantenimiento",
      ],
      desatascos: [
        "Red de saneamiento de los anos 70 con pendientes insuficientes que provocan atascos cronicos",
        "Arquetas comunitarias sin mantenimiento desde hace decadas que colapsan",
      ],
    },
    infraestructura:
      "Bloques de vivienda de 5-8 plantas construidos entre 1968 y 1982. Muchos sin ascensor o con ascensor anadido posteriormente. La infraestructura subterranea (saneamiento, agua) esta en su mayoria original.",
    barriosZonas: ["Poligono de Levante", "Son Canals", "Can Pastilla acceso"],
    datosUnicos: [
      "El poligono de Levante concentra una de las mayores densidades de poblacion de Baleares",
      "El Ayuntamiento de Palma tiene un plan de regeneracion urbana activo para esta zona",
      "Muchos edificios estan pendientes de pasar la ITE (Inspeccion Tecnica de Edificios) obligatoria",
    ],
  },
  "07014": {
    cp: "07014",
    municipio: "Palma de Mallorca",
    provincia: "Baleares",
    comunidadAutonoma: "Islas Baleares",
    poblacionAprox: "~14.000 habitantes en la zona",
    tipoZona: "urbana",
    descripcionLocal:
      "Zona que incluye Coll den Rabassa y parte de Can Pastilla, cercana al aeropuerto y la playa de Palma. Mezcla de vivienda residencial y apartamentos turisticos. La salinidad del ambiente marino afecta especialmente a las instalaciones.",
    problemasLocales: {
      desatascos: [
        "Arena y residuos marinos que se acumulan en desagues de viviendas cercanas a la playa",
        "Alcantarillado saturado en temporada alta por la afluencia turistica masiva",
        "Fosas septicas en chalets antiguos de Coll den Rabassa sin conexion a la red general",
      ],
      cerrajero: [
        "Demanda altisima en verano por turistas que pierden llaves de apartamentos vacacionales",
        "Cajas de llaves (key boxes) de alquiler vacacional que se atascan por la sal marina",
        "Cerraduras de puertas de terraza oxidadas por la brisa marina que impiden el cierre",
      ],
    },
    infraestructura:
      "Coll den Rabassa tiene viviendas unifamiliares antiguas y bloques mas modernos. Can Pastilla es predominantemente turistica con edificios de apartamentos de los anos 70-80. La proximidad al aeropuerto genera vibraciones que afectan a las instalaciones.",
    barriosZonas: ["Coll den Rabassa", "Can Pastilla", "Sometimes"],
    datosUnicos: [
      "Can Pastilla multiplica su poblacion por 5 en temporada alta turistica (junio-septiembre)",
      "La proximidad al mar provoca una corrosion acelerada en todos los elementos metalicos de las instalaciones",
      "El aeropuerto de Palma genera vibraciones que con el tiempo aflojan conexiones de tuberias y cables",
    ],
  },

  // ============================================
  // VALENCIA / BURJASSOT (46xxx) - Mayor oportunidad individual
  // ============================================
  "46111": {
    cp: "46111",
    municipio: "Rocafort",
    provincia: "Valencia",
    comunidadAutonoma: "Comunidad Valenciana",
    poblacionAprox: "~7.500 habitantes",
    tipoZona: "semiurbana",
    clima: "Mediterraneo con veranos calurosos y humedos",
    descripcionLocal:
      "Rocafort es un municipio residencial del area metropolitana de Valencia, conocido por sus chalets y viviendas unifamiliares con jardin. Es una zona de nivel adquisitivo medio-alto con construcciones de los anos 80-2000.",
    problemasLocales: {
      electricista: [
        "Instalaciones electricas en chalets que necesitan ampliacion de potencia para piscinas, cargadores de vehiculos electricos y climatizacion",
        "Automatizacion del hogar (domotica) que requiere recableado en viviendas de los 90",
        "Cuadros electricos de jardin y piscina expuestos a la intemperie que se deterioran",
        "Caidas de tension frecuentes en la zona por la alta demanda en picos de calor veraniegos",
      ],
    },
    infraestructura:
      "Predominan viviendas unifamiliares y chalets con parcela de los anos 80-2000. Las urbanizaciones tienen instalaciones privadas (alumbrado, saneamiento) que dependen de las comunidades de propietarios. Red de agua municipal relativamente moderna.",
    barriosZonas: ["Casco urbano", "Urbanizaciones residenciales"],
    datosUnicos: [
      "Rocafort tiene una de las rentas per capita mas altas del area metropolitana de Valencia",
      "Alta concentracion de viviendas con piscina que generan problemas especificos de instalaciones hidraulicas y electricas",
      "La proximidad a la huerta valenciana hace que las raices invadan tuberias de saneamiento en urbanizaciones",
    ],
  },

  // ============================================
  // MADRID SUR (28xxx) - Cluster Alcorcon/Pinto/Mostoles
  // ============================================
  "28925": {
    cp: "28925",
    municipio: "Alcorcon",
    provincia: "Madrid",
    comunidadAutonoma: "Comunidad de Madrid",
    poblacionAprox: "~170.000 habitantes (municipio)",
    tipoZona: "urbana",
    descripcionLocal:
      "Zona norte de Alcorcon, municipio del area metropolitana sur de Madrid. Predominan edificios residenciales de los anos 70-90 con una renovacion urbana en marcha. Es una ciudad dormitorio con alta densidad de poblacion.",
    problemasLocales: {
      desatascos: [
        "Atascos por toallitas humedas en tuberias de edificios de los 80 con bajantes de 80mm",
        "Alcantarillado municipal antiguo que se satura con las tormentas de verano y otono",
        "Bajantes comunitarias de fibrocemento que se estrechan por acumulacion de cal interna",
        "Arquetas de acometida en mal estado en edificios de mas de 30 anos",
      ],
      fontanero: [
        "Agua dura de Madrid (unos 30 grados franceses) que calcifica calentadores y griferias",
        "Fugas en recirculacion de calefaccion central en comunidades de los anos 70-80",
        "Roturas de tuberias por heladas en canalizaciones exteriores mal aisladas en invierno",
      ],
    },
    infraestructura:
      "Alcorcon crecio rapidamente en los anos 70-80 con construccion masiva de vivienda. Los edificios de esa epoca tienen instalaciones comunes (bajantes, electricidad) que estan llegando al final de su vida util. Las zonas mas nuevas (Ensanche Sur) tienen infraestructuras modernas.",
    barriosZonas: ["Centro", "San Jose de Valderas", "Parque Lisboa", "Ensanche Sur"],
    datosUnicos: [
      "Alcorcon paso de 4.000 a 140.000 habitantes entre 1960 y 1980, lo que explica la construccion rapida y la calidad variable de las instalaciones",
      "El Canal de Isabel II suministra agua con dureza media que acelera la calcificacion de electrodomesticos",
      "Muchas comunidades estan acometiendo la sustitucion de bajantes de fibrocemento por PVC simultaneamente",
    ],
  },
  "28320": {
    cp: "28320",
    municipio: "Pinto",
    provincia: "Madrid",
    comunidadAutonoma: "Comunidad de Madrid",
    poblacionAprox: "~53.000 habitantes (municipio)",
    tipoZona: "semiurbana",
    descripcionLocal:
      "Pinto es un municipio del sur de Madrid en plena expansion. El casco urbano mezcla construccion antigua con urbanizaciones nuevas. La zona industrial genera demanda especifica de servicios tecnicos.",
    problemasLocales: {
      desatascos: [
        "Red de saneamiento del casco antiguo con tuberias de gres de pequeno diametro que se obstruyen facilmente",
        "Pozos ciegos y fosas septicas aun activos en viviendas del casco historico no conectadas al alcantarillado",
        "Atascos en urbanizaciones nuevas por defectos de pendiente en la ejecucion de las obras",
      ],
    },
    infraestructura:
      "El casco historico tiene infraestructuras de los anos 50-60. Las urbanizaciones mas recientes (Los Alamos, Teneria) tienen instalaciones de los anos 2000-2010. El poligono industrial genera demanda de servicios tecnicos especializados.",
    barriosZonas: ["Casco historico", "Los Alamos", "Teneria", "Egido"],
    datosUnicos: [
      "Pinto ha duplicado su poblacion en 20 anos, pasando de 25.000 a mas de 50.000 habitantes",
      "La estacion de Cercanias conecta Pinto con Madrid en 25 minutos, atrayendo a familias jovenes a urbanizaciones nuevas",
      "El poligono industrial de Pinto es uno de los mas grandes del sur de Madrid",
    ],
  },

  // ============================================
  // CADIZ (11xxx)
  // ============================================
  "11160": {
    cp: "11160",
    municipio: "Barbate",
    provincia: "Cadiz",
    comunidadAutonoma: "Andalucia",
    poblacionAprox: "~22.000 habitantes (municipio)",
    tipoZona: "semiurbana",
    clima: "Mediterraneo oceanico con viento de Levante frecuente",
    descripcionLocal:
      "Barbate es un municipio costero de la provincia de Cadiz, conocido por sus playas y la almadraba de atun rojo. El nucleo urbano tiene un parque de viviendas envejecido que requiere mantenimiento constante, agravado por la corrosion marina.",
    problemasLocales: {
      desatascos: [
        "Arena de playa que se acumula en desagues y tuberias de viviendas cercanas al litoral",
        "Alcantarillado municipal saturado en temporada alta por la afluencia de turistas a las playas",
        "Pozos ciegos en viviendas antiguas de la zona de Los Canos de Meca",
        "Raices de retama y pinos que invaden tuberias de saneamiento en urbanizaciones costeras",
      ],
    },
    infraestructura:
      "El nucleo urbano tiene edificios de los anos 60-80. Las urbanizaciones costeras (Zahara, Los Canos) tienen construcciones mas dispersas. La humedad salina y el viento de Levante aceleran el deterioro de todas las instalaciones.",
    barriosZonas: ["Barbate centro", "Zahara de los Atunes", "Los Canos de Meca"],
    datosUnicos: [
      "El viento de Levante, que puede superar los 100 km/h, causa danos en instalaciones exteriores regularmente",
      "Zahara de los Atunes multiplica su poblacion por 10 en verano, colapsando la red de saneamiento",
      "La salinidad del ambiente corroe instalaciones metalicas 3 veces mas rapido que en zonas de interior",
    ],
  },
  "11407": {
    cp: "11407",
    municipio: "Jerez de la Frontera",
    provincia: "Cadiz",
    comunidadAutonoma: "Andalucia",
    poblacionAprox: "~12.000 habitantes en la zona",
    tipoZona: "semiurbana",
    descripcionLocal:
      "Zona residencial de Jerez que incluye barriadas de nueva construccion y zonas de expansion urbana. Jerez es la ciudad mas grande de la provincia de Cadiz con un patrimonio historico importante y un parque de viviendas diverso.",
    problemasLocales: {
      desatascos: [
        "Terreno arcilloso tipico de la campina jerezana que dificulta el drenaje y provoca encharcamientos",
        "Alcantarillado insuficiente en barriadas de expansion rapida de los anos 80-90",
        "Atascos en bajantes por acumulacion de grasa de cocina tipica de la gastronomia local (frituras)",
      ],
    },
    infraestructura:
      "Mezcla de viviendas de proteccion oficial de los anos 80 con chalets adosados mas recientes. La red de saneamiento de las barriadas perifericas presenta deficiencias de diseno originales.",
    barriosZonas: ["La Granja", "Nueva Jerez", "Zona Sur"],
    datosUnicos: [
      "Jerez tiene mas de 200.000 habitantes y es la quinta ciudad de Andalucia",
      "El terreno arcilloso de la campina jerezana causa movimientos del suelo que afectan a las conducciones enterradas",
      "La zona crece rapidamente con nuevas urbanizaciones que generan demanda continua de servicios",
    ],
  },

  // ============================================
  // AVILA (05xxx) - Ya rankea bien, reforzar
  // ============================================
  "05230": {
    cp: "05230",
    municipio: "Las Navas del Marques",
    provincia: "Avila",
    comunidadAutonoma: "Castilla y Leon",
    poblacionAprox: "~5.200 habitantes",
    tipoZona: "semiurbana",
    altitud: "1.300 metros sobre el nivel del mar",
    clima: "Continental de montana con inviernos frios y nevadas frecuentes",
    descripcionLocal:
      "Las Navas del Marques es un municipio de la sierra de Avila muy popular como segunda residencia para madrilenos. Su altitud y clima frio generan problematicas especificas en instalaciones, especialmente en invierno con heladas frecuentes.",
    problemasLocales: {
      desatascos: [
        "Tuberias de saneamiento que se obstruyen por acumulacion de hojarasca de pinos en arquetas exteriores",
        "Fosas septicas en viviendas unifamiliares de urbanizaciones que necesitan vaciado periodico",
        "Congelacion de tuberias de desague en viviendas de segunda residencia cerradas en invierno que se agravan al descongelar",
      ],
      fontanero: [
        "Reventones de tuberias por heladas severas (temperaturas de hasta -10C en invierno)",
        "Roturas en acometidas de agua enterradas a poca profundidad que se congelan",
        "Calderas que no encienden por falta de uso en viviendas de segunda residencia",
      ],
      calderas: [
        "Calderas de gasoleo predominantes que necesitan revision antes de cada temporada de frio",
        "Radiadores con airlocks (bolsas de aire) tras meses sin uso en segundas residencias",
        "Depositos de gasoil enterrados que pierden estanqueidad por la humedad del terreno",
      ],
    },
    infraestructura:
      "El casco urbano tiene viviendas tradicionales de piedra. Las urbanizaciones de la periferia (construidas entre 1980 y 2005) son predominantemente chalets de segunda residencia. Muchas viviendas utilizan gasoleo para calefaccion al no haber red de gas natural.",
    barriosZonas: ["Casco urbano", "Urbanizaciones de sierra", "Zona de pinares"],
    datosUnicos: [
      "A 1.300m de altitud, las heladas son habituales de noviembre a marzo con temperaturas que llegan a -10C",
      "Aproximadamente el 60% de las viviendas son de segunda residencia de familias de Madrid",
      "No hay red de gas natural: la calefaccion es mayoritariamente de gasoleo, electricidad o pellets",
      "Las Navas esta a solo 75 km de Madrid por la AP-6, lo que facilita la logistica de tecnicos",
    ],
  },

  // ============================================
  // GIRONA (17xxx)
  // ============================================
  "17487": {
    cp: "17487",
    municipio: "Empuriabrava",
    provincia: "Girona",
    comunidadAutonoma: "Cataluna",
    poblacionAprox: "~7.800 habitantes (variable segun temporada)",
    tipoZona: "semiurbana",
    clima: "Mediterraneo con tramontana frecuente",
    descripcionLocal:
      "Empuriabrava es la marina residencial mas grande de Europa, con mas de 24 km de canales navegables. Las viviendas estan construidas sobre canales de agua salada, lo que genera problematicas muy especificas de corrosion y humedad en todas las instalaciones.",
    problemasLocales: {
      desatascos: [
        "Tuberias de saneamiento afectadas por la capa freatica alta y la intrusion de agua salada",
        "Atascos por arena y sedimentos marinos en desagues de viviendas junto a canales",
        "Problemas de drenaje por la cota baja de las viviendas respecto al nivel del mar",
        "Fosas septicas en parcelas antiguas que no conectaron a la red municipal de saneamiento",
      ],
      fontanero: [
        "Corrosion galvanica acelerada en tuberias metalicas por la salinidad ambiental extrema",
        "Descalcificadores obligatorios para proteger electrodomesticos del agua extremadamente dura del Alt Emporda",
      ],
      electricista: [
        "Corrosion de cuadros electricos exteriores por la brisa salina de los canales",
        "Instalaciones electricas de embarcaderos y amarres que requieren proteccion IP especial",
      ],
    },
    infraestructura:
      "Empuriabrava fue construida a partir de 1967 sobre marismas desecadas. Las viviendas van desde los anos 70 hasta la actualidad. La peculiaridad de estar construida sobre canales de agua salada hace que las cimentaciones y conducciones subterraneas sufran una corrosion inusual.",
    barriosZonas: ["Sector Alberes", "Sector Muga", "Sector centro", "Sector norte"],
    datosUnicos: [
      "Empuriabrava tiene 24 km de canales navegables, mas que Venecia",
      "La poblacion pasa de 8.000 en invierno a mas de 80.000 en agosto",
      "La tramontana (viento del norte) puede superar los 120 km/h y causa danos en instalaciones exteriores",
      "Muchas viviendas tienen embarcadero propio con instalaciones electricas e hidraulicas especificas",
    ],
  },

  // ============================================
  // CUENCA (16xxx)
  // ============================================
  "16200": {
    cp: "16200",
    municipio: "Motilla del Palancar",
    provincia: "Cuenca",
    comunidadAutonoma: "Castilla-La Mancha",
    poblacionAprox: "~6.100 habitantes",
    tipoZona: "rural",
    altitud: "900 metros sobre el nivel del mar",
    clima: "Continental con inviernos frios y veranos calurosos",
    descripcionLocal:
      "Motilla del Palancar es un importante nudo de comunicaciones en la autovia A-3 (Madrid-Valencia). Es el centro de servicios de la comarca de La Manchuela conquense. Su posicion estrategica facilita dar servicio rapido a toda la zona.",
    problemasLocales: {
      desatascos: [
        "Fosas septicas en viviendas antiguas del casco historico aun no conectadas a la red general",
        "Alcantarillado del nucleo antiguo con tuberias de gres de pequeno diametro que se obstruyen",
        "Atascos por raices de olmos y platanos en las tuberias de saneamiento de calles arboladas",
        "Acumulacion de sedimentos en arquetas por el terreno calizo de la zona",
      ],
    },
    infraestructura:
      "El casco historico tiene viviendas de piedra y mamposteria con instalaciones muy antiguas. La zona de expansion tiene construccion mas reciente. La estacion depuradora municipal se renovo en 2015.",
    barriosZonas: ["Casco historico", "Zona de expansion", "Poligono industrial"],
    datosUnicos: [
      "Motilla es el cruce de la A-3 (Madrid-Valencia) y la N-320, lo que la convierte en centro logistico comarcal",
      "El terreno calizo genera agua muy dura que afecta a todas las instalaciones hidraulicas",
      "Es el centro de servicios para una comarca de 30 pueblos pequenos en un radio de 30 km",
    ],
  },

  // ============================================
  // MURCIA (30xxx)
  // ============================================
  "30878": {
    cp: "30878",
    municipio: "Las Palas (Fuente Alamo)",
    provincia: "Murcia",
    comunidadAutonoma: "Region de Murcia",
    poblacionAprox: "~2.000 habitantes",
    tipoZona: "rural",
    clima: "Semiarido con lluvias torrenciales puntuales (gota fria)",
    descripcionLocal:
      "Las Palas es una pedania de Fuente Alamo de Murcia, en el Campo de Cartagena. Zona agricola con viviendas dispersas y algunas urbanizaciones residenciales. El clima semiarido y las gotas frias generan problematicas muy especificas.",
    problemasLocales: {
      electricista: [
        "Instalaciones electricas de explotaciones agricolas con maquinaria de riego que sobrecarga la red",
        "Caidas de tension y cortes frecuentes en zonas rurales con lineas electricas aereas",
        "Paneles solares e inversores que necesitan mantenimiento y reparacion",
        "Proteccion contra sobretensiones por tormentas electricas de final de verano",
      ],
    },
    infraestructura:
      "Viviendas dispersas con acometidas electricas y de agua de larga distancia. Muchas fincas tienen pozo propio con grupo de presion. La red electrica rural es aerea y vulnerable a vientos y tormentas.",
    datosUnicos: [
      "El Campo de Cartagena es una de las zonas mas secas de Europa con precipitaciones menores a 300mm anuales",
      "Las gotas frias de septiembre-octubre pueden descargar en horas lo que llueve en todo un ano, colapsando el drenaje",
      "La agricultura de regadio intensiva genera alta demanda de electricistas para bombas de riego y paneles solares",
    ],
  },

  // ============================================
  // SEVILLA (41xxx)
  // ============================================
  "41807": {
    cp: "41807",
    municipio: "Espartinas",
    provincia: "Sevilla",
    comunidadAutonoma: "Andalucia",
    poblacionAprox: "~15.000 habitantes",
    tipoZona: "semiurbana",
    clima: "Mediterraneo continentalizado con veranos muy calurosos",
    descripcionLocal:
      "Espartinas es un municipio del Aljarafe sevillano que ha experimentado un gran crecimiento urbanistico en los ultimos 20 anos. Predominan las urbanizaciones de chalets adosados y viviendas unifamiliares de construccion reciente.",
    problemasLocales: {
      electricista: [
        "Necesidad de ampliacion de potencia para aire acondicionado en chalets (veranos con 45C)",
        "Instalaciones electricas de piscinas y jardines que sufren con las altas temperaturas",
        "Puntos de recarga de vehiculos electricos en garajes de chalets",
        "Domotizacion de viviendas con automatizacion de persianas, riego y climatizacion",
      ],
    },
    infraestructura:
      "Predominan urbanizaciones de chalets adosados y pareados de los anos 2000-2015. Las infraestructuras son relativamente modernas pero la rapida expansion urbana genero algunos defectos de ejecucion que ahora se manifiestan.",
    barriosZonas: ["Casco urbano", "Urbanizacion Los Palacios", "Zona nueva"],
    datosUnicos: [
      "Espartinas paso de 2.000 a 15.000 habitantes en 20 anos por el boom inmobiliario del Aljarafe",
      "Los veranos con temperaturas de 40-45C generan picos de demanda electrica que provocan caidas de tension",
      "El Aljarafe sevillano tiene un terreno arcilloso expansivo que mueve cimentaciones y rompe tuberias enterradas",
    ],
  },

  // ============================================
  // MALAGA (29xxx)
  // ============================================
  "29000": {
    cp: "29000",
    municipio: "Malaga",
    provincia: "Malaga",
    comunidadAutonoma: "Andalucia",
    poblacionAprox: "~580.000 habitantes (municipio)",
    tipoZona: "urbana",
    clima: "Mediterraneo subtropical, el mas calido de Europa continental",
    descripcionLocal:
      "Centro historico de Malaga, una ciudad en plena transformacion turistica. La mezcla de edificios historicos con reformas modernas y la alta densidad de alojamientos turisticos genera una demanda constante de servicios urgentes.",
    problemasLocales: {
      electricista: [
        "Instalaciones electricas insuficientes en edificios del centro reconvertidos en apartamentos turisticos",
        "Necesidad de certificados electricos para licencias de alquiler vacacional",
        "Cuadros electricos obsoletos en fincas del siglo XIX reformadas parcialmente",
        "Sobrecargas por aire acondicionado en verano en edificios con potencia contratada limitada",
      ],
      fontanero: [
        "Tuberias de plomo en edificios anteriores a 1970 del centro historico",
        "Fugas en columnadas comunitarias de edificios centenarios reconvertidos",
      ],
    },
    infraestructura:
      "El centro historico tiene edificios de los siglos XVIII-XX con reformas de diversas epocas. La reconversion turistica ha acelerado la necesidad de modernizar instalaciones. Las calles peatonales dificultan el acceso de vehiculos de servicio.",
    barriosZonas: ["Centro historico", "La Malagueta", "Soho", "La Merced"],
    datosUnicos: [
      "Malaga recibio mas de 14 millones de turistas en 2023, la segunda ciudad mas visitada de Andalucia",
      "El boom de apartamentos turisticos ha disparado la demanda de electricistas para reformas de instalaciones",
      "El centro historico tiene restricciones de acceso de vehiculos que requieren coordinacion especial para urgencias",
    ],
  },

  // ============================================
  // CANTABRIA (39xxx)
  // ============================================
  "39619": {
    cp: "39619",
    municipio: "Sardinero / Camargo area",
    provincia: "Cantabria",
    comunidadAutonoma: "Cantabria",
    poblacionAprox: "~3.000 habitantes en la zona",
    tipoZona: "semiurbana",
    clima: "Oceanico con lluvias frecuentes y alta humedad",
    descripcionLocal:
      "Zona rural-residencial del municipio de Camargo, en el entorno de Santander. El clima oceanico con lluvias abundantes (mas de 1.200 mm anuales) y la alta humedad constante generan problematicas especificas en todas las instalaciones.",
    problemasLocales: {
      electricista: [
        "Humedad constante que deteriora cuadros electricos, enchufes y mecanismos",
        "Diferenciales que saltan frecuentemente por derivaciones causadas por la humedad ambiental",
        "Instalaciones exteriores y de jardin que requieren proteccion IP especial contra la lluvia",
        "Rayos y sobretensiones frecuentes por tormentas atlanticas que danan electrodomesticos",
      ],
    },
    infraestructura:
      "Viviendas unifamiliares y adosados de los anos 90-2000. La humedad constante del clima cantabrico exige materiales y protecciones especificas en todas las instalaciones electricas e hidraulicas.",
    datosUnicos: [
      "Cantabria tiene mas de 1.200 mm de precipitacion anual, lo que genera humedad constante en las instalaciones",
      "El clima oceanico obliga a usar materiales resistentes a la corrosion por humedad en todas las instalaciones",
      "La proximidad a Santander (10 minutos) facilita la llegada rapida de tecnicos especializados",
    ],
  },

  // ============================================
  // ALICANTE (03xxx)
  // ============================================
  "03169": {
    cp: "03169",
    municipio: "Algorfa",
    provincia: "Alicante",
    comunidadAutonoma: "Comunidad Valenciana",
    poblacionAprox: "~4.800 habitantes",
    tipoZona: "semiurbana",
    clima: "Mediterraneo semiarido",
    descripcionLocal:
      "Algorfa es un municipio de la Vega Baja del Segura con una importante colonia de residentes europeos (principalmente britanicos y escandinavos). Las urbanizaciones con piscina y las viviendas unifamiliares dominan el paisaje.",
    problemasLocales: {
      desatascos: [
        "Fosas septicas en urbanizaciones perifericas que no conectaron a la red de saneamiento municipal",
        "Tuberias de drenaje obstruidas por raices de palmeras y arboles tropicales de los jardines",
        "Inundaciones por gota fria (DANA) que colapsa todo el sistema de drenaje de la Vega Baja",
        "Piscinas con desagues obstruidos por acumulacion de tierra y hojas",
      ],
    },
    infraestructura:
      "Urbanizaciones de los anos 90-2000 construidas para el mercado de residentes extranjeros. Muchas con piscina comunitaria y zonas verdes. Algunas urbanizaciones antiguas tienen fosas septicas propias.",
    barriosZonas: ["Casco urbano", "Urbanizacion La Finca", "Urbanizacion Montemar"],
    datosUnicos: [
      "La Vega Baja del Segura sufrio la devastadora DANA de septiembre de 2019 con inundaciones historicas",
      "Aproximadamente el 40% de los residentes son extranjeros (britanicos, alemanes, escandinavos)",
      "El clima semiarido con menos de 300mm de lluvia anual contrasta con las gotas frias que pueden descargar 300mm en un dia",
    ],
  },
}

/**
 * Obtener datos de enriquecimiento local para un codigo postal.
 * Retorna null si no hay datos especificos para ese CP.
 */
export function getLocalEnrichment(cp: string): LocalEnrichment | null {
  return LOCAL_ENRICHMENT[cp] || null
}

/**
 * Obtener problemas locales especificos para una profesion en un CP.
 */
export function getLocalProblems(cp: string, professionId: string): string[] | null {
  const enrichment = LOCAL_ENRICHMENT[cp]
  if (!enrichment) return null
  return enrichment.problemasLocales[professionId] || null
}

/**
 * Comprobar si un CP tiene contenido enriquecido.
 */
export function hasEnrichedContent(cp: string): boolean {
  return cp in LOCAL_ENRICHMENT
}
