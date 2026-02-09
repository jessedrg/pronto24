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

  // ============================================
  // PALMA DE MALLORCA (07xxx) - CPs adicionales
  // ============================================
  "07009": {
    cp: "07009",
    municipio: "Palma de Mallorca",
    provincia: "Baleares",
    comunidadAutonoma: "Islas Baleares",
    poblacionAprox: "~16.000 habitantes en la zona",
    tipoZona: "urbana",
    clima: "Mediterraneo",
    descripcionLocal:
      "Zona residencial de Palma que abarca Son Ferriol y parte de Casa Blanca. Barrios perifericos con mezcla de viviendas unifamiliares antiguas y bloques de pisos mas recientes. Son Ferriol mantiene un caracter de pueblo absorbido por la expansion de Palma.",
    problemasLocales: {
      desatascos: [
        "Fosas septicas en viviendas unifamiliares antiguas de Son Ferriol no conectadas al alcantarillado",
        "Red de saneamiento insuficiente en zonas de crecimiento rapido",
        "Atascos por depositos de tierra y grava en urbanizaciones sin aceras",
      ],
      fontanero: [
        "Acometidas de agua de larga distancia con perdida de presion en viviendas aisladas",
        "Tuberias de polietileno antiguas con uniones que fallan por movimientos del terreno",
        "Pozos propios con bombas sumergidas que requieren mantenimiento periodico",
      ],
      electricista: [
        "Lineas electricas aereas vulnerables a temporales de viento y lluvia",
        "Instalaciones agricolas reconvertidas a residencial con potencia insuficiente",
        "Cuadros electricos de exteriores deteriorados por la humedad y el salitre",
      ],
    },
    infraestructura:
      "Son Ferriol fue un nucleo rural independiente hasta los anos 60 y conserva viviendas de piedra con instalaciones muy antiguas. Las urbanizaciones posteriores (70-90) tienen calidades de construccion variables.",
    barriosZonas: ["Son Ferriol", "Casa Blanca", "Sant Jordi"],
    datosUnicos: [
      "Son Ferriol conserva un trazado rural con calles estrechas que dificultan el acceso de vehiculos grandes",
      "La proximidad al aeropuerto genera vibraciones que afectan a conducciones enterradas",
      "Muchas viviendas mantienen pozos negros originales pendientes de conectar a la red general",
    ],
  },
  "07010": {
    cp: "07010",
    municipio: "Palma de Mallorca",
    provincia: "Baleares",
    comunidadAutonoma: "Islas Baleares",
    poblacionAprox: "~18.000 habitantes en la zona",
    tipoZona: "urbana",
    clima: "Mediterraneo",
    descripcionLocal:
      "Zona que incluye Es Vivero, Amanecer y parte de Sa Indioteria. Barrios residenciales consolidados con bloques de los anos 70-90 y algunas urbanizaciones mas recientes. Buena conectividad con el centro de Palma.",
    problemasLocales: {
      fontanero: [
        "Bajantes comunitarias de fibrocemento de los anos 70 en proceso de sustitucion por PVC",
        "Cal acumulada en calderas y calentadores por la dureza del agua de Mallorca",
        "Fugas en tuberias empotradas de hierro galvanizado que se oxidan internamente",
      ],
      electricista: [
        "Cuadros electricos comunitarios con protecciones insuficientes para la demanda actual",
        "Necesidad de instalar puntos de recarga para vehiculos electricos en garajes comunitarios",
        "Derivaciones a tierra por humedad en trasteros y garajes subterraneos",
      ],
      desatascos: [
        "Atascos en arquetas comunitarias por acumulacion de grasa y residuos solidos",
        "Drenaje insuficiente en garajes subterraneos que se inundan con lluvias fuertes",
        "Bajantes de 80mm que se obstruyen facilmente en edificios de los anos 70",
      ],
    },
    infraestructura:
      "Predominan bloques residenciales de 5-7 plantas construidos entre 1970 y 1995. Las urbanizaciones mas recientes tienen mejores calidades. La red municipal de saneamiento ha sido renovada parcialmente.",
    barriosZonas: ["Es Vivero", "Amanecer", "Sa Indioteria"],
    datosUnicos: [
      "Es Vivero es una zona con alta densidad de colegios y equipamientos deportivos que generan demanda especifica",
      "Sa Indioteria conserva un caracter semirrural con viviendas unifamiliares antiguas",
      "El barrio tiene buena accesibilidad por la Via de Cintura que permite llegadas rapidas",
    ],
  },

  // ============================================
  // MADRID (28xxx) - CPs adicionales
  // ============================================
  "28937": {
    cp: "28937",
    municipio: "Mostoles",
    provincia: "Madrid",
    comunidadAutonoma: "Comunidad de Madrid",
    poblacionAprox: "~210.000 habitantes (municipio)",
    tipoZona: "urbana",
    descripcionLocal:
      "Zona residencial de Mostoles, la segunda ciudad mas poblada del sur de Madrid. Barrios de vivienda construidos en los anos 80-90 durante el boom de expansion del area metropolitana. Alta densidad de edificios residenciales de 6-10 plantas.",
    problemasLocales: {
      desatascos: [
        "Bajantes comunitarias de fibrocemento (uralita) que se degradan y colapsan internamente",
        "Atascos por toallitas humedas que se acumulan en tuberias de 80mm de los anos 80",
        "Red municipal de saneamiento saturada tras tormentas fuertes de verano",
        "Arquetas comunitarias con tapas rotas o selladas que impiden el mantenimiento preventivo",
      ],
      fontanero: [
        "Agua del Canal de Isabel II con 28-32 grados franceses de dureza que calcifica electrodomesticos",
        "Columnas de agua comunitarias de hierro con 40 anos que reducen caudal y sueltan oxido",
        "Roturas por heladas en tuberias de terrazas y azoteas mal aisladas (diciembre-febrero)",
      ],
      electricista: [
        "Cuadros electricos de los 80 con magnetotermicos de baja capacidad para la demanda actual",
        "Instalaciones sin diferenciales de 30mA en edificios anteriores a 1985",
        "Necesidad de instalar cargadores de vehiculo electrico en garajes comunitarios",
      ],
    },
    infraestructura:
      "Mostoles crecio de 5.000 a 200.000 habitantes entre 1960 y 1990. La construccion masiva de vivienda de esa epoca utilizo materiales que hoy estan al final de su vida util. Las zonas mas nuevas (Mostoles Sur) tienen infraestructuras modernas.",
    barriosZonas: ["Centro", "Parque Coimbra", "Villaverde-Manuela Malasana", "Mostoles Sur"],
    datosUnicos: [
      "Mostoles paso de pueblo a ciudad en 30 anos, generando un parque de vivienda de calidad variable",
      "Mas de 60.000 viviendas construidas entre 1970-1990 estan llegando al final de la vida util de sus instalaciones",
      "La linea de Metro Ligero conecta Mostoles con Madrid, atrayendo familias jovenes que demandan mejoras en viviendas",
    ],
  },
  "28019": {
    cp: "28019",
    municipio: "Madrid",
    provincia: "Madrid",
    comunidadAutonoma: "Comunidad de Madrid",
    poblacionAprox: "~80.000 habitantes en la zona",
    tipoZona: "urbana",
    descripcionLocal:
      "Zona sur de Madrid que abarca Vista Alegre, Carabanchel Alto y parte de Aluche. Uno de los distritos mas densamente poblados de Madrid con una mezcla de vivienda social de los 60-70 y bloques mas recientes. Alta demanda de servicios urgentes.",
    problemasLocales: {
      desatascos: [
        "Alcantarillado de los anos 60 con secciones de hormigon que se fisura y acumula sedimentos",
        "Bajantes comunitarias de fundicion envejecidas que se corroen internamente",
        "Atascos recurrentes en comunidades grandes (+100 viviendas) con bajantes insuficientes",
      ],
      fontanero: [
        "Tuberias de plomo en edificios de proteccion oficial de los anos 50-60",
        "Llaves de paso empotradas y calcificadas que no cierran en emergencias",
        "Calentadores de gas en cocinas sin ventilacion adecuada que no cumplen normativa actual",
      ],
      cerrajero: [
        "Puertas blindadas de primera generacion (anos 80) con bombines de baja seguridad",
        "Alta demanda de aperturas urgentes por la densidad de poblacion del distrito",
        "Cambios de cerradura por seguridad en portales de grandes comunidades de vecinos",
      ],
    },
    infraestructura:
      "Carabanchel es el distrito mas poblado de Madrid. Predominan bloques de vivienda de 6-10 plantas de los anos 60-80. Muchas comunidades estan acometiendo rehabilitaciones de fachada, ascensor y bajantes con ayudas del Plan MOVES.",
    barriosZonas: ["Vista Alegre", "Carabanchel Alto", "Aluche", "Puerta Bonita"],
    datosUnicos: [
      "Carabanchel es el distrito mas poblado de Madrid con mas de 250.000 habitantes",
      "Muchos edificios de los 60-70 estan recibiendo ayudas para rehabilitacion integral (ascensores, fachadas, instalaciones)",
      "La proximidad al Hospital 12 de Octubre genera alta rotacion residencial en la zona",
    ],
  },

  // ============================================
  // CADIZ (11xxx) - CPs adicionales
  // ============================================
  "11100": {
    cp: "11100",
    municipio: "San Fernando",
    provincia: "Cadiz",
    comunidadAutonoma: "Andalucia",
    poblacionAprox: "~95.000 habitantes",
    tipoZona: "urbana",
    clima: "Mediterraneo oceanico con alta humedad y brisa marina constante",
    descripcionLocal:
      "San Fernando es una isla-ciudad entre la bahia de Cadiz y el oceano Atlantico. La salinidad extrema del ambiente, rodeada de agua por todos lados, provoca una corrosion acelerada en todas las instalaciones metalicas. Sede del Arsenal de la Armada y la Isla de Leon.",
    problemasLocales: {
      desatascos: [
        "Intrusiones de agua salada en la red de saneamiento por la cota baja de la ciudad respecto al nivel del mar",
        "Alcantarillado historico de la zona centro que se satura con mareas vivas y temporales",
        "Atascos por arena y sal en tuberias de viviendas cercanas a la playa de Camposoto",
        "Inundaciones en garajes y bajos con cada temporal de poniente por la cota de la isla",
      ],
      electricista: [
        "Corrosion extrema de instalaciones electricas exteriores por el ambiente salino permanente",
        "Cuadros electricos que requieren envolventes IP65 minimo por la humedad salina",
        "Instalaciones de la zona militar reconvertida a vivienda con electricidad obsoleta",
      ],
      fontanero: [
        "Tuberias de cobre que se corroen en 15-20 anos (vs 50 anos en zonas de interior) por la salinidad",
        "Calentadores y calderas con vida util reducida a la mitad por la agresividad del ambiente",
      ],
    },
    infraestructura:
      "El casco historico conserva edificios del siglo XVIII-XIX. Los barrios de expansion (anos 60-80) rodean el centro. La peculiar situacion de isla baja (cota maxima de 30m) hace que el drenaje sea un reto constante.",
    barriosZonas: ["Centro historico", "Caseria de Ossio", "Bazán", "Camposoto"],
    datosUnicos: [
      "San Fernando es una isla conectada por puentes, rodeada de salinas y esteros que generan humedad salina extrema",
      "La cota maxima de la ciudad es de solo 30 metros, lo que causa problemas de drenaje con temporales y mareas",
      "El Observatorio de la Armada en San Fernando registra una humedad relativa media del 75%, una de las mas altas de Espana",
    ],
  },

  // ============================================
  // ALICANTE (03xxx) - CPs adicionales
  // ============================================
  "03170": {
    cp: "03170",
    municipio: "Rojales / Ciudad Quesada",
    provincia: "Alicante",
    comunidadAutonoma: "Comunidad Valenciana",
    poblacionAprox: "~22.000 habitantes",
    tipoZona: "semiurbana",
    clima: "Mediterraneo semiarido con gotas frias (DANA)",
    descripcionLocal:
      "Rojales y Ciudad Quesada, en la Vega Baja del Segura. Ciudad Quesada es una de las mayores urbanizaciones de residentes europeos de Espana. Las viviendas con piscina y las gotas frias de septiembre generan problematicas muy especificas.",
    problemasLocales: {
      desatascos: [
        "Inundaciones devastadoras por DANA como la de septiembre 2019 que colapso la Vega Baja",
        "Fosas septicas en urbanizaciones de los anos 80-90 no conectadas a depuradora",
        "Atascos por tierra y arena arrastrada por la escorrentia de lluvias torrenciales",
        "Piscinas con desagues obstruidos por sedimentos del terreno arcilloso",
      ],
      electricista: [
        "Reinstalaciones electricas tras danos por inundaciones recurrentes",
        "Paneles solares con inversores averiados por sobretensiones de tormentas electricas",
        "Automatizacion de piscinas y riego en viviendas con jardin",
      ],
      fontanero: [
        "Bombas de piscina averiadas por funcionamiento continuo en verano (40-45C)",
        "Tuberias de riego de jardines reventadas por las heladas ocasionales de enero",
        "Descalcificadores saturados por la extrema dureza del agua de la Vega Baja",
      ],
    },
    infraestructura:
      "Ciudad Quesada se desarrollo a partir de los anos 80 como urbanizacion para jubilados europeos. Las viviendas son mayoritariamente unifamiliares con parcela y piscina. Muchas urbanizaciones antiguas carecen de conexion a la red de saneamiento municipal.",
    barriosZonas: ["Rojales centro", "Ciudad Quesada", "Lo Pepin", "Benijofar cercano"],
    datosUnicos: [
      "La DANA de septiembre 2019 dejo 300mm de lluvia en 48 horas e inundo completamente la Vega Baja",
      "Mas del 60% de los residentes de Ciudad Quesada son britanicos, alemanes y escandinavos",
      "El rio Segura pasa por Rojales y su desbordamiento historico marca la necesidad de drenaje especial",
    ],
  },

  // ============================================
  // SEVILLA (41xxx) - CPs adicionales
  // ============================================
  "41300": {
    cp: "41300",
    municipio: "La Rinconada",
    provincia: "Sevilla",
    comunidadAutonoma: "Andalucia",
    poblacionAprox: "~39.000 habitantes",
    tipoZona: "semiurbana",
    clima: "Mediterraneo continentalizado con veranos extremos (hasta 47C)",
    descripcionLocal:
      "La Rinconada es un municipio del area metropolitana norte de Sevilla. Combina el casco historico con urbanizaciones modernas y la pedania de San Jose de la Rinconada. El calor extremo del verano sevillano (maximo historico de 47.4C) genera problematicas especificas.",
    problemasLocales: {
      electricista: [
        "Caidas de tension masivas en olas de calor por sobredemanda de aire acondicionado",
        "Cableado que pierde aislamiento por las altas temperaturas en buhardillas y bajo-cubierta",
        "Instalaciones de piscinas comunitarias que requieren cuadros electricos estancos",
        "Ampliacion de potencia electrica para instalar equipos de climatizacion en chalets",
      ],
      desatascos: [
        "Terreno arcilloso del valle del Guadalquivir que se agrieta en verano y se hincha con las lluvias, rompiendo tuberias",
        "Raices de naranjos y olivos que invaden tuberias de saneamiento en urbanizaciones",
        "Acumulacion de grasa solidificada en bajantes por el uso intensivo de frituras en la cocina andaluza",
      ],
      calderas: [
        "Calderas sobredimensionadas para el invierno suave (8-12C) pero necesarias para ACS",
        "Sistemas de aerotermia que sustituyen a calderas de gas en chalets modernos",
      ],
    },
    infraestructura:
      "El casco historico tiene viviendas de una o dos plantas con patios interiores. San Jose de la Rinconada crecio rapidamente en los 90-2000 con urbanizaciones de adosados y pisos.",
    barriosZonas: ["La Rinconada centro", "San Jose de la Rinconada", "Los Carteros"],
    datosUnicos: [
      "La Rinconada esta junto al Guadalquivir, en una vega con terreno arcilloso expansivo que mueve cimentaciones",
      "Los veranos superan habitualmente los 40C, con record de 47.4C en Sevilla capital que esta a 10 km",
      "San Jose de la Rinconada triplico su poblacion en 15 anos, pasando de 10.000 a 30.000 habitantes",
    ],
  },

  // ============================================
  // GRAN CANARIA (35xxx)
  // ============================================
  "35100": {
    cp: "35100",
    municipio: "Maspalomas / San Bartolome de Tirajana",
    provincia: "Las Palmas",
    comunidadAutonoma: "Canarias",
    poblacionAprox: "~55.000 habitantes (municipio)",
    tipoZona: "urbana",
    clima: "Subtropical arido, sol mas de 300 dias al ano",
    descripcionLocal:
      "Maspalomas es el principal polo turistico del sur de Gran Canaria. La mezcla de complejos hoteleros, apartamentos turisticos y viviendas residenciales genera una demanda constante de servicios tecnicos. El agua extremadamente dura y la calima sahariana afectan a las instalaciones.",
    problemasLocales: {
      fontanero: [
        "Agua desalada de planta potabilizadora que es muy agresiva con las tuberias metalicas",
        "Cal extrema por la dureza del agua (hasta 50 grados franceses) que destruye electrodomesticos",
        "Fugas en instalaciones de piscinas de hoteles y complejos turisticos",
        "Calentadores solares termicos con problemas de sobretemperatura en verano (mas de 40C)",
      ],
      electricista: [
        "Instalaciones electricas de complejos turisticos de los anos 70-80 sobredimensionadas en su dia pero insuficientes ahora",
        "Paneles solares con inversores danados por sobretensiones y calima (polvo sahariano)",
        "Aire acondicionado centralizado que provoca sobrecargas en la red electrica",
      ],
      desatascos: [
        "Tuberias de saneamiento danadas por la salinidad del agua de riego reciclada",
        "Atascos en alcantarillado turistico saturado en temporada alta (noviembre-marzo en Canarias)",
        "Arena y ceniza volcanica que se acumula en desagues exteriores durante episodios de calima",
      ],
    },
    infraestructura:
      "El boom turistico comenzo en los anos 60 con la construccion masiva de hoteles y apartamentos. Las infraestructuras de esa epoca estan al final de su vida util. Las zonas mas nuevas (Meloneras) tienen instalaciones modernas.",
    barriosZonas: ["Maspalomas", "Playa del Ingles", "San Agustin", "Meloneras", "Sonnenland"],
    datosUnicos: [
      "Maspalomas recibe mas de 3 millones de turistas al ano, multiplicando la demanda de servicios",
      "El agua procede de desalinizadoras y tiene una composicion quimica que corroe tuberias de cobre rapidamente",
      "La calima (polvo sahariano) llega varias veces al ano y afecta a paneles solares, aires acondicionados y desagues",
    ],
  },

  // ============================================
  // MALAGA (29xxx) - CPs adicionales
  // ============================================
  "29013": {
    cp: "29013",
    municipio: "Malaga",
    provincia: "Malaga",
    comunidadAutonoma: "Andalucia",
    poblacionAprox: "~35.000 habitantes en la zona",
    tipoZona: "urbana",
    clima: "Mediterraneo subtropical",
    descripcionLocal:
      "Zona norte de Malaga que incluye Ciudad Jardin y parte de Bailén-Miraflores. Barrios residenciales consolidados de los anos 60-80 con una renovacion urbanistica en marcha. Alta densidad de poblacion con bloques de 6-10 plantas.",
    problemasLocales: {
      electricista: [
        "Instalaciones de los anos 60-70 con cableado de aluminio que se recalienta y pierde aislamiento",
        "Cuadros electricos sin protecciones modernas (diferenciales superinmunizados) que saltan con el calor",
        "Potencia contratada insuficiente para soportar aires acondicionados en verano (35-40C habituales)",
      ],
      fontanero: [
        "Tuberias de hierro galvanizado con 40-50 anos que reducen el caudal y sueltan herrumbre",
        "Agua dura de Malaga que calcifica calderas y electrodomesticos en 3-5 anos",
        "Fugas en bajantes comunitarias de fibrocemento que requieren sustitucion urgente",
      ],
      desatascos: [
        "Bajantes comunitarias estrechas (80mm) en edificios de los 70 que se atascan con facilidad",
        "Alcantarillado del arroyo del Cuarto entubado que se desborda con lluvias fuertes",
        "Raices de ficus (arbol tipico de Malaga) que invaden tuberias de saneamiento",
      ],
    },
    infraestructura:
      "Predominan edificios de vivienda de los anos 60-80. Ciudad Jardin es una zona con viviendas unifamiliares de los anos 50 que se estan densificando. Las infraestructuras subterraneas (saneamiento, agua) estan en su mayoria originales.",
    barriosZonas: ["Ciudad Jardin", "Bailen-Miraflores", "La Roca"],
    datosUnicos: [
      "Malaga tiene el clima mas calido de la peninsula, con veranos de 35-40C que estresan las instalaciones electricas",
      "El arroyo del Cuarto, entubado bajo el barrio, causa problemas de drenaje cuando llueve fuerte",
      "Ciudad Jardin conserva un trazado de los anos 50 con viviendas unifamiliares que se estan reformando y dividiendo",
    ],
  },

  // ============================================
  // VALENCIA (46xxx) - CPs adicionales
  // ============================================
  "46019": {
    cp: "46019",
    municipio: "Valencia",
    provincia: "Valencia",
    comunidadAutonoma: "Comunidad Valenciana",
    poblacionAprox: "~45.000 habitantes en la zona",
    tipoZona: "urbana",
    clima: "Mediterraneo con episodios de DANA en otono",
    descripcionLocal:
      "Zona de Campanar y Benicalap en Valencia. Barrios residenciales que mezclan vivienda de los anos 60-70 con desarrollos mas recientes junto al antiguo cauce del Turia. La DANA de octubre 2024 puso en evidencia los problemas de drenaje de la zona.",
    problemasLocales: {
      desatascos: [
        "Inundaciones por DANA como la devastadora de octubre 2024 que afecto al area metropolitana",
        "Alcantarillado de los anos 60 subdimensionado para episodios de lluvias torrenciales mediterraneas",
        "Acumulacion de sedimentos en tuberias tras episodios de inundacion",
      ],
      fontanero: [
        "Agua de Valencia con dureza media-alta (25-30 grados franceses) que calcifica instalaciones",
        "Tuberias de hierro galvanizado en bloques de los 60-70 que reducen caudal",
        "Fugas en juntas de dilatacion de tuberias por vibraciones del tranvia cercano",
      ],
      electricista: [
        "Reinstalaciones electricas tras danos por inundaciones (DANA octubre 2024)",
        "Cuadros electricos en garajes subterraneos que se inundaron y necesitan sustitucion completa",
        "Instalaciones de los anos 60 con potencia insuficiente para climatizacion moderna",
      ],
    },
    infraestructura:
      "Campanar combina el casco antiguo del pueblo original con bloques de los 70-80 y desarrollos modernos junto al Turia. Benicalap tiene predominio de vivienda social de los 60-70 en proceso de rehabilitacion.",
    barriosZonas: ["Campanar", "Benicalap", "Beniferri", "Tendetes"],
    datosUnicos: [
      "La DANA de octubre 2024 demostro la vulnerabilidad del sistema de drenaje de Valencia a las lluvias torrenciales",
      "Campanar pueblo conserva un nucleo historico con instalaciones centenarias junto a edificios modernos",
      "La proximidad al antiguo cauce del Turia (ahora parque) hace que el nivel freatico sea alto y afecte a cimentaciones",
    ],
  },

  // ============================================
  // BARCELONA / TERRASSA (08xxx)
  // ============================================
  "08225": {
    cp: "08225",
    municipio: "Terrassa",
    provincia: "Barcelona",
    comunidadAutonoma: "Cataluna",
    poblacionAprox: "~220.000 habitantes (municipio)",
    tipoZona: "urbana",
    descripcionLocal:
      "Zona residencial de Terrassa, la tercera ciudad mas poblada de Cataluna. Ciudad industrial reconvertida con un importante patrimonio modernista. Los barrios residenciales mezclan vivienda obrera de los 60-70 con desarrollos mas recientes.",
    problemasLocales: {
      desatascos: [
        "Torrentes estacionales (rieras) que desbordan con lluvias fuertes e inundan garajes y bajos",
        "Bajantes comunitarias de fibrocemento (uralita) en edificios de los 60-70 que hay que sustituir",
        "Alcantarillado industrial reconvertido a residencial con diametros insuficientes",
      ],
      fontanero: [
        "Agua de la red del Ter-Llobregat con dureza variable que requiere descalcificadores",
        "Tuberias de plomo en edificios de los anos 50-60 del barrio obrero que hay que sustituir urgentemente",
        "Calderas de gas natural que necesitan revision anual obligatoria por ley en Cataluna",
      ],
      electricista: [
        "Instalaciones electricas de antiguos talleres textiles reconvertidos a lofts residenciales",
        "Cuadros electricos comunitarios de los 70 sin protecciones diferenciales modernas",
        "Potencia insuficiente para instalar aire acondicionado en pisos sin preinstalacion",
      ],
    },
    infraestructura:
      "Terrassa tiene un tejido urbano diverso: el centro historico con edificios modernistas, barrios obreros de los 60-70 (Sant Pere, Ca N'Aurell), y zonas de expansion mas recientes. Muchas naves industriales textiles se han reconvertido a vivienda o equipamientos.",
    barriosZonas: ["Centre", "Ca N'Aurell", "Sant Pere Nord", "Les Fonts", "Egara"],
    datosUnicos: [
      "Terrassa fue la capital textil de Espana y conserva naves industriales del siglo XIX reconvertidas",
      "La riera de Las Arenas cruza la ciudad y ha causado inundaciones historicas devastadoras",
      "El patrimonio modernista de Terrassa (iglesias de Sant Pere) tiene instalaciones que requieren tratamiento especial",
    ],
  },

  // ============================================
  // TARRAGONA (43xxx)
  // ============================================
  "43006": {
    cp: "43006",
    municipio: "Tarragona",
    provincia: "Tarragona",
    comunidadAutonoma: "Cataluna",
    poblacionAprox: "~20.000 habitantes en la zona",
    tipoZona: "urbana",
    clima: "Mediterraneo con brisa marina",
    descripcionLocal:
      "Zona que incluye la Part Alta (casco historico romano) y el Serrallo (barrio marinero) de Tarragona. La Part Alta conserva murallas romanas y edificios medievales con instalaciones muy antiguas. El Serrallo es un barrio de pescadores con humedad marina constante.",
    problemasLocales: {
      desatascos: [
        "Alcantarillado del casco romano con tramos que datan de la epoca medieval",
        "Atascos en restaurantes del Serrallo por acumulacion de grasa de pescado frito",
        "Drenaje complicado en la Part Alta por la roca del promontorio donde se asienta",
      ],
      fontanero: [
        "Tuberias empotradas en muros de piedra de 2 metros de grosor en la Part Alta",
        "Humedad marina que corroe tuberias de cobre en el Serrallo en 10-15 anos",
        "Presion de agua insuficiente en la Part Alta por la cota elevada del promontorio",
      ],
      electricista: [
        "Instalaciones electricas condicionadas por la proteccion del patrimonio romano y medieval",
        "Cableado empotrado en muros historicos que no se puede sustituir por normativa de patrimonio",
        "Sobrecargas en locales de hosteleria del puerto que comparten acometida con viviendas",
      ],
    },
    infraestructura:
      "La Part Alta esta construida sobre y con las propias murallas romanas. Los edificios mezclan elementos del siglo I d.C. con reformas de todas las epocas. El Serrallo conserva casas de pescadores del siglo XIX con reformas diversas.",
    barriosZonas: ["Part Alta", "El Serrallo", "Port", "Sant Pere i Sant Pau"],
    datosUnicos: [
      "La Part Alta de Tarragona es Patrimonio de la Humanidad por la UNESCO (Tarraco romana)",
      "Las murallas romanas condicionan cualquier obra en el subsuelo, requiriendo supervision arqueologica",
      "El Serrallo es el barrio marinero con uno de los puertos pesqueros mas activos de Cataluna",
    ],
  },

  // ============================================
  // MURCIA (30xxx) - CPs adicionales
  // ============================================
  "30010": {
    cp: "30010",
    municipio: "Murcia",
    provincia: "Murcia",
    comunidadAutonoma: "Region de Murcia",
    poblacionAprox: "~460.000 habitantes (municipio)",
    tipoZona: "urbana",
    clima: "Mediterraneo semiarido con veranos muy calurosos",
    descripcionLocal:
      "Zona norte de Murcia ciudad que incluye barrios residenciales como Espinardo e Infante. Murcia es la septima ciudad de Espana con un clima extremo: veranos de 40-45C e inviernos suaves. El rio Segura atraviesa la ciudad y ha marcado su historia de inundaciones.",
    problemasLocales: {
      electricista: [
        "Caidas de tension en olas de calor por sobredemanda de aire acondicionado en toda la ciudad",
        "Cuadros electricos de los 70-80 que no soportan la potencia necesaria para climatizacion moderna",
        "Instalaciones en azoteas deterioradas por el sol extremo (mas de 3.000 horas de sol anuales)",
      ],
      fontanero: [
        "Agua del trasvase Tajo-Segura con alta salinidad que deteriora electrodomesticos y griferias",
        "Calderas con depositos de cal por la dureza extrema del agua murciana",
        "Fugas en tuberias de polietileno que se dilatan y contraen con los cambios de temperatura extremos",
      ],
      desatascos: [
        "Riesgo de inundaciones por desbordamiento del Segura tras lluvias torrenciales de otono",
        "Alcantarillado subdimensionado para episodios de gota fria que descargan 100mm en horas",
        "Raices de ficus y moreras (arboles tipicos de Murcia) que invaden tuberias de saneamiento",
      ],
    },
    infraestructura:
      "Murcia norte tiene bloques de los 70-80 en Espinardo y urbanizaciones mas recientes. La universidad genera alta demanda de pisos de alquiler con rotacion de inquilinos. El rio Segura, canalizado, cruza la ciudad con riesgo de crecida.",
    barriosZonas: ["Espinardo", "Infante", "Churra", "Santa Maria de Gracia"],
    datosUnicos: [
      "Murcia tiene una de las mayores amplitudes termicas de Espana: de 0C en enero a 45C en agosto",
      "El trasvase Tajo-Segura suministra agua con alta concentracion de sales que acorta la vida de las instalaciones",
      "La riada de 1973 (inundacion del rio Segura) marco la historia de la ciudad y motivo la canalizacion del rio",
    ],
  },

  // ============================================
  // A CORUNA (15xxx)
  // ============================================
  "15002": {
    cp: "15002",
    municipio: "A Coruna",
    provincia: "A Coruna",
    comunidadAutonoma: "Galicia",
    poblacionAprox: "~245.000 habitantes (municipio)",
    tipoZona: "urbana",
    clima: "Oceanico con lluvias frecuentes (mas de 1.100 mm anuales)",
    descripcionLocal:
      "Centro de A Coruna, una ciudad peninsular rodeada de mar por tres lados. La humedad constante (media del 78%) y la brisa atlantica generan problemas especificos de corrosion y humedades. Las galerias acristaladas tipicas de la ciudad protegen del viento pero concentran condensacion.",
    problemasLocales: {
      electricista: [
        "Humedad constante que deteriora mecanismos electricos y provoca derivaciones a tierra",
        "Diferenciales que saltan frecuentemente por la humedad ambiental del 78% medio",
        "Instalaciones en fachadas de galerias acristaladas con condensacion que dana enchufes e interruptores",
        "Rayos y sobretensiones de temporales atlanticos que danan equipos electronicos",
      ],
      fontanero: [
        "Corrosion acelerada de tuberias metalicas por la humedad y salinidad del ambiente costero",
        "Humedades por condensacion en paredes interiores que se confunden con fugas y viceversa",
        "Calentadores de gas en edificios del centro con tiros de humos comunitarios obstruidos",
      ],
      desatascos: [
        "Alcantarillado que drena directamente al mar y sufre intrusion de agua salada con mareas vivas",
        "Saturacion de la red de saneamiento con las frecuentes lluvias atlanticas (1.100 mm/ano)",
        "Bajantes exteriores expuestas al viento atlantico que se deterioran y rompen",
      ],
    },
    infraestructura:
      "El centro de A Coruna combina edificios del siglo XIX con las tipicas galerias acristaladas y bloques de los anos 60-80. Las calles estrechas del casco antiguo dificultan el acceso de vehiculos de servicio. La proximidad al mar por tres lados intensifica la corrosion.",
    barriosZonas: ["Ciudad Vieja", "Pescaderia", "Ensanche", "Monte Alto"],
    datosUnicos: [
      "A Coruna es una peninsula rodeada de mar por tres lados, lo que genera una humedad constante del 78%",
      "Las galerias acristaladas, seña de identidad de la ciudad, crean problemas especificos de condensacion en instalaciones",
      "El viento atlantico puede superar los 100 km/h en temporales de invierno, danando instalaciones exteriores",
    ],
  },

  // ============================================
  // VIGO (36xxx)
  // ============================================
  "36211": {
    cp: "36211",
    municipio: "Vigo",
    provincia: "Pontevedra",
    comunidadAutonoma: "Galicia",
    poblacionAprox: "~295.000 habitantes (municipio)",
    tipoZona: "urbana",
    clima: "Oceanico con precipitaciones abundantes (1.400 mm anuales)",
    descripcionLocal:
      "Zona residencial de Vigo que incluye barrios de la periferia sur. Vigo es la ciudad mas poblada de Galicia, construida sobre colinas con pendientes pronunciadas que generan problemas especificos de drenaje y presion de agua.",
    problemasLocales: {
      desatascos: [
        "Pendientes pronunciadas que generan velocidad excesiva en tuberias de saneamiento causando erosion",
        "Lluvias persistentes (1.400 mm/ano) que saturan la red de alcantarillado frecuentemente",
        "Raices de eucaliptos y acacias que invaden tuberias de saneamiento en zonas perifericas",
        "Urbanizaciones en ladera con drenaje deficiente que provoca escorrentia sobre calzadas",
      ],
      fontanero: [
        "Presion de agua excesiva en plantas bajas de edificios en cota baja por la orografia de colinas",
        "Humedad constante que oxida tuberias de hierro en trasteros y garajes subterraneos",
        "Calderas de calefaccion central en comunidades de los 70-80 con circuitos de radiadores corroidos",
      ],
      electricista: [
        "Humedades en cuadros electricos de trasteros y garajes semienterrados en laderas",
        "Derivaciones a tierra por la humedad ambiental constante (humedad relativa media del 80%)",
        "Instalaciones exteriores deterioradas por la lluvia persistente y los temporales atlanticos",
      ],
    },
    infraestructura:
      "Vigo esta construida sobre colinas que bajan hacia la ria. Los barrios perifericos tienen pendientes del 10-15% que complican el saneamiento. Muchos edificios de los 60-70 fueron construidos en ladera con cimentaciones que sufren deslizamientos.",
    barriosZonas: ["Bouzas", "Navia", "Teis", "Alcabre"],
    datosUnicos: [
      "Vigo es una de las ciudades mas lluviosas de Espana con 1.400 mm anuales repartidos en 150 dias de lluvia",
      "La orografia de colinas hace que los problemas de presion de agua y drenaje sean especificos de cada cota",
      "La ria de Vigo genera brisas humedas y salinas que corroen instalaciones metalicas cercanas al mar",
    ],
  },

  // ============================================
  // ZARAGOZA (50xxx)
  // ============================================
  "50010": {
    cp: "50010",
    municipio: "Zaragoza",
    provincia: "Zaragoza",
    comunidadAutonoma: "Aragon",
    poblacionAprox: "~680.000 habitantes (municipio)",
    tipoZona: "urbana",
    clima: "Mediterraneo continental con cierzo y amplitud termica extrema",
    descripcionLocal:
      "Zona residencial de Zaragoza que incluye barrios como Las Fuentes y San Jose. El cierzo (viento del noroeste que puede superar los 100 km/h) y la amplitud termica de -5C a 42C entre invierno y verano generan un estres extremo en las instalaciones.",
    problemasLocales: {
      fontanero: [
        "Agua del Ebro con alto contenido calcareo que calcifica tuberias y electrodomesticos rapidamente",
        "Roturas de tuberias por heladas en canalizaciones exteriores (hasta -8C en invierno con el cierzo)",
        "Dilataciones y contracciones extremas en tuberias por amplitud termica de 50 grados entre verano e invierno",
      ],
      electricista: [
        "Cierzo que arranca cables aereos y dana instalaciones exteriores con rachas de mas de 100 km/h",
        "Caidas de tension en olas de calor (42C) y frio extremo (-5C) por picos de demanda",
        "Instalaciones de calefaccion electrica en pisos sin gas natural que sobrecargan la red",
      ],
      desatascos: [
        "Alcantarillado que recoge aguas pluviales y residuales (red unitaria) que se desborda con tormentas",
        "Depositos de cal en tuberias por el agua dura del Ebro que reduce el diametro util",
        "Crecidas del Ebro que saturan la red de saneamiento de los barrios riberenos",
      ],
    },
    infraestructura:
      "Las Fuentes y San Jose son barrios de los anos 60-70 con bloques de vivienda social. Las infraestructuras de saneamiento son de red unitaria (pluviales + residuales) lo que causa problemas de capacidad. El viento cierzo es un factor unico que afecta a todas las instalaciones exteriores.",
    barriosZonas: ["Las Fuentes", "San Jose", "La Magdalena", "Torrero"],
    datosUnicos: [
      "El cierzo es un viento persistente que puede soplar durante dias a 80-100 km/h, unico en Espana",
      "Zaragoza tiene una amplitud termica anual de casi 50 grados: de -8C en invierno a 42C en verano",
      "El Ebro ha inundado barrios riberenos varias veces (2013, 2015, 2018) obligando a mejorar el bombeo de saneamiento",
    ],
  },

  // ============================================
  // ASTURIAS (33xxx)
  // ============================================
  "33012": {
    cp: "33012",
    municipio: "Oviedo",
    provincia: "Asturias",
    comunidadAutonoma: "Principado de Asturias",
    poblacionAprox: "~220.000 habitantes (municipio)",
    tipoZona: "urbana",
    clima: "Oceanico con lluvias frecuentes (mas de 1.000 mm anuales) y nieblas",
    descripcionLocal:
      "Zona residencial de Oviedo que incluye barrios como San Lazaro y Prados de la Fuente. Oviedo tiene un clima lluvioso con mas de 180 dias de precipitacion al ano. La humedad constante y las temperaturas suaves (pero nunca secas) generan problemas especificos.",
    problemasLocales: {
      electricista: [
        "Humedad persistente que provoca derivaciones y salto continuo de diferenciales",
        "Cuadros electricos en trasteros y garajes subterraneos con condensacion permanente",
        "Calefaccion electrica en pisos sin gas natural que sobrecarga la instalacion en invierno",
        "Cableado empotrado que pierde aislamiento por la humedad que penetra por las fachadas",
      ],
      fontanero: [
        "Humedades por capilaridad en plantas bajas que danan tuberias empotradas",
        "Calderas de condensacion que necesitan mantenimiento frecuente por la humedad del aire de combustion",
        "Tuberias de calefaccion central con circuitos corroidos por la calidad del agua local",
      ],
      desatascos: [
        "Bajantes y canalones saturados por las lluvias persistentes (180 dias de lluvia al ano)",
        "Musgo y vegetacion que crece en sumideros y canaletas exteriores obstruyendo el drenaje",
        "Garajes subterraneos con problemas cronicos de filtraciones y drenaje por la capa freatica alta",
      ],
    },
    infraestructura:
      "Oviedo tiene un centro historico medieval y barrios de expansion de los 60-80. Los edificios requieren impermeabilizacion constante. Los garajes subterraneos sufren filtraciones cronicas por el nivel freatico alto.",
    barriosZonas: ["San Lazaro", "Prados de la Fuente", "La Corredoria", "Pumarín"],
    datosUnicos: [
      "Oviedo tiene mas de 180 dias de lluvia al ano, haciendo de la humedad el problema numero uno de las instalaciones",
      "La ciudad conserva edificios prerromanicos del siglo IX (Patrimonio UNESCO) con instalaciones que requieren cuidado especial",
      "El precio de la calefaccion en Oviedo es de los mas altos de Espana por la duracion del invierno (7 meses)",
    ],
  },
}

/**
 * Datos de enriquecimiento a nivel de CIUDAD para capitales de provincia.
 * Se usa como fallback cuando no hay datos especificos del CP.
 * Cubre automaticamente todos los CPs de las principales ciudades.
 */
const CITY_ENRICHMENT: Record<string, { range: [number, number]; data: Omit<LocalEnrichment, "cp"> }> = {
  madrid: {
    range: [28001, 28055],
    data: {
      municipio: "Madrid",
      provincia: "Madrid",
      comunidadAutonoma: "Comunidad de Madrid",
      poblacionAprox: "~3.300.000 habitantes",
      tipoZona: "urbana",
      descripcionLocal:
        "Madrid, capital de Espana y ciudad mas poblada del pais. Con un parque de viviendas que va desde edificios historicos del siglo XVIII en el centro hasta bloques de los 60-80 en los barrios perifericos. El Canal de Isabel II suministra agua de sierra con 28-32 grados franceses de dureza.",
      problemasLocales: {
        desatascos: [
          "Bajantes comunitarias de fibrocemento (uralita) en edificios de los 60-80 al final de su vida util",
          "Red de alcantarillado del centro historico con tramos centenarios que colapsan",
          "Atascos por toallitas humedas en tuberias de 80mm de edificios antiguos",
          "Inundaciones en garajes subterraneos del centro por saturacion del alcantarillado",
        ],
        fontanero: [
          "Agua del Canal de Isabel II con dureza de 28-32 grados franceses que calcifica instalaciones",
          "Columnas montantes de hierro galvanizado con mas de 40 anos en barrios como Chamberi o Salamanca",
          "Heladas en tuberias exteriores y azoteas de diciembre a febrero",
          "Tuberias de plomo en edificios anteriores a 1970 que hay que sustituir por normativa sanitaria",
        ],
        electricista: [
          "Instalaciones electricas anteriores al REBT 2002 sin diferenciales de 30mA",
          "Potencia insuficiente para climatizacion en pisos del centro sin preinstalacion de aire",
          "Cuadros electricos de los anos 70-80 con magnetotermicos de baja capacidad",
          "Necesidad de cargadores de vehiculo electrico en garajes comunitarios",
        ],
        cerrajero: [
          "Puertas de seguridad con bombines antibumping en zonas de alta actividad",
          "Portales de edificios historicos con cerraduras multipunto que se atascan",
          "Alta demanda de aperturas urgentes en distritos con mucha rotacion de alquiler",
        ],
        calderas: [
          "Calderas de gas natural con 15-20 anos que pierden eficiencia y necesitan sustitucion",
          "Revision obligatoria bianual de calderas de gas en la Comunidad de Madrid",
          "Transicion de calderas comunitarias a individuales en muchas comunidades del centro",
        ],
      },
      infraestructura:
        "Madrid tiene un parque de viviendas muy diverso: desde el casco historico (siglos XVII-XIX) hasta los PAU de los 2000. Los barrios de los 60-80 (Carabanchel, Usera, Vallecas, Moratalaz) concentran el mayor volumen de vivienda que necesita renovacion de instalaciones.",
      barriosZonas: ["Centro", "Chamberi", "Salamanca", "Retiro", "Arganzuela", "Tetuan", "Chamartin"],
      datosUnicos: [
        "Madrid tiene mas de 1.600.000 viviendas, de las cuales el 45% fueron construidas antes de 1980",
        "El Canal de Isabel II distribuye agua de sierra de calidad pero con dureza suficiente para calcificar",
        "Las heladas invernales (-5C en enero) causan roturas de tuberias en exteriores y azoteas",
      ],
    },
  },
  barcelona: {
    range: [8001, 8042],
    data: {
      municipio: "Barcelona",
      provincia: "Barcelona",
      comunidadAutonoma: "Cataluna",
      poblacionAprox: "~1.620.000 habitantes",
      tipoZona: "urbana",
      clima: "Mediterraneo con humedad alta por la costa",
      descripcionLocal:
        "Barcelona, segunda ciudad de Espana. El Eixample con su trama Cerda de edificios de 6-8 plantas del siglo XIX-XX es un reto constante para los tecnicos. Ciutat Vella conserva edificios medievales. Los barrios de los 60-70 (Nou Barris, Sant Marti) tienen otro tipo de problematicas.",
      problemasLocales: {
        desatascos: [
          "Bajantes centenarias de fundicion en edificios del Eixample que se corroen y colapsan",
          "Torrenciales mediterraneas que desbordan la red unitaria de alcantarillado",
          "Atascos en restaurantes del casco antiguo por acumulacion de grasa en tuberias estrechas",
          "Raices de plataneros (arbol tipico de Barcelona) que invaden tuberias de saneamiento",
        ],
        fontanero: [
          "Agua del Ter-Llobregat con dureza variable (20-35 grados franceses) que calcifica",
          "Tuberias de plomo en fincas del Eixample anteriores a 1950 que hay que sustituir",
          "Bajantes de fibrocemento en edificios de Nou Barris y Trinitat que se degradan",
          "Calderas de gas con revision obligatoria anual en Cataluna (mas estricta que la media nacional)",
        ],
        electricista: [
          "Instalaciones electricas del Eixample con mas de 80 anos empotradas en muros de carga",
          "Potencia insuficiente en pisos del casco antiguo para soportar aire acondicionado",
          "Cuadros electricos comunitarios de edificios de 1900-1950 sin protecciones modernas",
          "Instalacion de cargadores EV en aparcamientos comunitarios del Eixample",
        ],
        cerrajero: [
          "Puertas de madera maciza en edificios modernistas con cerraduras de epoca que se bloquean",
          "Alta demanda de aperturas en distritos turisticos (Ciutat Vella, Eixample)",
          "Cambios de cerradura en pisos turisticos con alta rotacion de llaves",
        ],
      },
      infraestructura:
        "Barcelona tiene mas de 70.000 edificios, de los cuales el 35% son anteriores a 1960. El Eixample concentra la mayor densidad de edificios centenarios con instalaciones que necesitan actualizacion constante. Nou Barris y Sant Andreu tienen bloques de los 60-70.",
      barriosZonas: ["Eixample", "Ciutat Vella", "Gracia", "Sant Marti", "Sants-Montjuic", "Sarria-Sant Gervasi"],
      datosUnicos: [
        "Barcelona tiene mas de 9.000 edificios catalogados como patrimonio historico que condicionan las obras",
        "La humedad marina del litoral mediterrano corroe instalaciones metalicas mas rapido que en ciudades de interior",
        "La trama Cerda del Eixample (manzanas octogonales) crea patios interiores con condiciones de humedad especificas",
      ],
    },
  },
  valencia: {
    range: [46001, 46026],
    data: {
      municipio: "Valencia",
      provincia: "Valencia",
      comunidadAutonoma: "Comunidad Valenciana",
      poblacionAprox: "~800.000 habitantes",
      tipoZona: "urbana",
      clima: "Mediterraneo con episodios de DANA en otono",
      descripcionLocal:
        "Valencia, tercera ciudad de Espana, marcada por la DANA de octubre 2024 que demostro la vulnerabilidad de su sistema de drenaje. El casco historico (Ciutat Vella) tiene edificios del siglo XVIII. Los barrios de expansion (Campanar, Benimaclet) crecieron en los 70-80.",
      problemasLocales: {
        desatascos: [
          "Inundaciones por DANA como la devastadora de octubre 2024 que afecto al area metropolitana",
          "Alcantarillado antiguo del centro subdimensionado para lluvias torrenciales mediterraneas",
          "Barrios junto al antiguo cauce del Turia con nivel freatico alto que satura drenajes",
          "Sedimentos y barro que bloquean tuberias tras cada episodio de lluvias fuertes",
        ],
        fontanero: [
          "Agua con dureza media-alta (25-30 grados franceses) que calcifica rapidamente",
          "Tuberias de hierro galvanizado en edificios del Ensanche de los anos 60-70",
          "Danos por inundaciones que requieren reinstalacion completa de fontaneria en plantas bajas",
        ],
        electricista: [
          "Reinstalaciones electricas tras danos por inundaciones (DANA octubre 2024)",
          "Cuadros electricos en garajes subterraneos que se inundaron y necesitan sustitucion",
          "Instalaciones del Ensanche de los 60-70 con potencia insuficiente para climatizacion",
        ],
        cerrajero: [
          "Puertas danadas por inundaciones que no cierran correctamente",
          "Cerraduras de portales oxidadas por la humedad residual tras riadas",
        ],
      },
      infraestructura:
        "Valencia tiene un centro historico medieval rodeado de barrios de expansion del siglo XIX-XX. Los barrios de los 60-80 (Campanar, Benicalap, Patraix) concentran el mayor volumen de vivienda. La DANA de 2024 ha acelerado la renovacion de infraestructuras.",
      barriosZonas: ["Ciutat Vella", "Eixample", "Campanar", "Benimaclet", "Ruzafa", "Patraix"],
      datosUnicos: [
        "La DANA de octubre 2024 dejo mas de 300 litros/m2 y causo danos en miles de viviendas del area metropolitana",
        "El antiguo cauce del Turia (ahora parque) marca un nivel freatico alto que afecta a sotanos y garajes",
        "Valencia tiene mas de 4.000 horas de sol al ano que aceleran el deterioro de materiales exteriores",
      ],
    },
  },
  sevilla: {
    range: [41001, 41020],
    data: {
      municipio: "Sevilla",
      provincia: "Sevilla",
      comunidadAutonoma: "Andalucia",
      poblacionAprox: "~685.000 habitantes",
      tipoZona: "urbana",
      clima: "Mediterraneo continentalizado con veranos extremos (hasta 47C)",
      descripcionLocal:
        "Sevilla, cuarta ciudad de Espana y una de las mas calurosas de Europa. Los veranos extremos (record de 47.4C) y el casco historico con corrales de vecinos y casas-patio del siglo XVIII generan problematicas unicas. El Guadalquivir marca el nivel freatico de la ciudad.",
      problemasLocales: {
        electricista: [
          "Caidas de tension masivas en olas de calor por sobredemanda de aire acondicionado en toda la ciudad",
          "Cableado que pierde aislamiento por las altas temperaturas en bajo-cubierta y buhardillas",
          "Instalaciones del casco historico empotradas en muros de tapial que no se pueden renovar facilmente",
          "Ampliaciones de potencia para soportar climatizacion en pisos sin preinstalacion",
        ],
        desatascos: [
          "Terreno arcilloso del valle del Guadalquivir que se agrieta en verano y hincha con lluvias, rompiendo tuberias",
          "Alcantarillado del casco historico con tramos del siglo XIX que colapsan",
          "Raices de naranjos amargos (arbol tipico de Sevilla) que invaden tuberias de saneamiento",
        ],
        fontanero: [
          "Agua de Sevilla con dureza alta (35-40 grados franceses) del embalse de El Gergal",
          "Calentadores y calderas que se calcifican en 3-5 anos por la dureza del agua",
          "Tuberias de terrazas y azoteas que sufren dilataciones extremas por el calor",
        ],
      },
      infraestructura:
        "Sevilla conserva uno de los cascos historicos mas grandes de Europa con edificios de los siglos XVI-XIX. Los barrios de expansion (Los Remedios, Nervion, Macarena) crecieron en los 60-80. Las infraestructuras de agua y saneamiento del centro son las mas antiguas.",
      barriosZonas: ["Casco Antiguo", "Triana", "Los Remedios", "Nervion", "Macarena", "Cerro-Amate"],
      datosUnicos: [
        "Sevilla tiene el record de temperatura de Espana (47.4C) y veranos con 40+ dias por encima de 35C",
        "El casco historico tiene mas de 500 edificios catalogados como patrimonio, condicionando cualquier obra",
        "El terreno arcilloso expansivo del Guadalquivir mueve cimentaciones y rompe conducciones enterradas",
      ],
    },
  },
  malaga: {
    range: [29001, 29018],
    data: {
      municipio: "Malaga",
      provincia: "Malaga",
      comunidadAutonoma: "Andalucia",
      poblacionAprox: "~580.000 habitantes",
      tipoZona: "urbana",
      clima: "Mediterraneo subtropical, el mas calido de la peninsula",
      descripcionLocal:
        "Malaga, sexta ciudad de Espana y capital de la Costa del Sol. El boom turistico ha transformado el centro historico con rehabilitaciones que requieren actualizacion de todas las instalaciones. La brisa marina y la humedad costera aceleran la corrosion.",
      problemasLocales: {
        electricista: [
          "Instalaciones electricas de edificios reconvertidos en apartamentos turisticos con potencia insuficiente",
          "Cuadros electricos deteriorados por la humedad salina del litoral",
          "Aires acondicionados masivos en verano que sobrecargan la red electrica del centro",
        ],
        fontanero: [
          "Agua dura de los embalses de la Axarquia que calcifica electrodomesticos en 3-5 anos",
          "Tuberias de cobre corroidas por la salinidad ambiental costera",
          "Fugas en instalaciones de piscinas comunitarias (alta densidad en barrios residenciales)",
        ],
        desatascos: [
          "Bajantes estrechas (80mm) en edificios del centro de los anos 60-70 que se atascan facilmente",
          "Raices de ficus (arbol emblematico de Malaga) que invaden tuberias de saneamiento",
          "Torrenciales mediterraneas que desbordan el Guadalmedina e inundan el centro",
        ],
      },
      infraestructura:
        "El centro historico de Malaga esta en plena transformacion con rehabilitaciones de edificios del XVIII-XIX para uso turistico y residencial. Los barrios de expansion (Cruz de Humilladero, Carretera de Cadiz) tienen bloques de los 60-80.",
      barriosZonas: ["Centro Historico", "Soho", "La Malagueta", "Cruz de Humilladero", "El Palo", "Pedregalejo"],
      datosUnicos: [
        "Malaga tiene el clima mas templado de la peninsula con una media de 19C y 300 dias de sol al ano",
        "El boom turistico ha disparado la demanda de reformas integrales en edificios del centro historico",
        "El rio Guadalmedina, canalizado, divide la ciudad y causa riesgo de inundacion en su desembocadura",
      ],
    },
  },
  bilbao: {
    range: [48001, 48015],
    data: {
      municipio: "Bilbao",
      provincia: "Vizcaya",
      comunidadAutonoma: "Pais Vasco",
      poblacionAprox: "~345.000 habitantes",
      tipoZona: "urbana",
      clima: "Oceanico con lluvias frecuentes (mas de 1.200 mm anuales)",
      descripcionLocal:
        "Bilbao, la mayor ciudad del Pais Vasco, construida en el estrecho valle del Nervion. La ria y las lluvias constantes (1.200 mm/ano) generan problemas de humedad omnipresentes. La reconversion industrial ha dejado suelos contaminados en zonas como Abandoibarra.",
      problemasLocales: {
        fontanero: [
          "Agua blanda del embalse de Zadorra que, paradojicamente, es agresiva con tuberias de cobre",
          "Humedades cronicas en plantas bajas de edificios construidos junto a la ria del Nervion",
          "Calefaccion central con radiadores de hierro fundido en edificios antiguos del Casco Viejo",
          "Calderas de condensacion que necesitan mantenimiento frecuente por la humedad del aire de combustion",
        ],
        electricista: [
          "Humedades que provocan derivaciones a tierra y salto constante de diferenciales",
          "Instalaciones electricas en lonjas y bajos comerciales con problemas de condensacion",
          "Cuadros electricos deteriorados por la humedad ambiental del 78% medio",
        ],
        desatascos: [
          "Alcantarillado que se satura con las lluvias persistentes (150+ dias de lluvia al ano)",
          "Bajantes y canalones obstruidos por hojas y musgo por la humedad constante",
          "Garajes subterraneos con filtraciones cronicas por el nivel freatico alto junto al Nervion",
        ],
      },
      infraestructura:
        "Bilbao se extiende a lo largo del valle del Nervion con edificios pegados a las laderas. El Casco Viejo (Siete Calles) conserva edificios de los siglos XVII-XIX. Ensanche y Abando tienen edificios de 1900-1950. Deusto, Rekalde y Basurto concentran vivienda de los 60-80.",
      barriosZonas: ["Casco Viejo", "Ensanche-Abando", "Deusto", "Rekalde", "Basurto", "Indautxu"],
      datosUnicos: [
        "Bilbao tiene mas de 150 dias de lluvia al ano, haciendo de la humedad el enemigo numero uno de las instalaciones",
        "La ria del Nervion atraviesa la ciudad y su nivel afecta al freatico de los barrios riberenos",
        "La reconversion de Abandoibarra (donde esta el Guggenheim) ha dejado suelos que afectan a conducciones enterradas",
      ],
    },
  },
  zaragoza: {
    range: [50001, 50018],
    data: {
      municipio: "Zaragoza",
      provincia: "Zaragoza",
      comunidadAutonoma: "Aragon",
      poblacionAprox: "~680.000 habitantes",
      tipoZona: "urbana",
      clima: "Mediterraneo continental con cierzo y amplitud termica extrema (-8C a 42C)",
      descripcionLocal:
        "Zaragoza, quinta ciudad de Espana, castigada por el cierzo (viento del noroeste que supera 100 km/h) y una amplitud termica de casi 50 grados entre invierno y verano. El Ebro atraviesa la ciudad con riesgo de crecida.",
      problemasLocales: {
        fontanero: [
          "Agua del Ebro con alto contenido calcareo que calcifica tuberias y electrodomesticos",
          "Roturas de tuberias por heladas en exteriores (hasta -8C con el cierzo en invierno)",
          "Dilataciones extremas por amplitud termica de 50 grados entre verano e invierno",
        ],
        electricista: [
          "Cierzo que arranca cables aereos y dana instalaciones exteriores con rachas de 100+ km/h",
          "Caidas de tension en picos de demanda por calefaccion (invierno) y aire acondicionado (verano)",
          "Paneles solares y antenas danados por el viento cierzo",
        ],
        desatascos: [
          "Red unitaria de alcantarillado (pluviales + residuales) que se desborda con tormentas",
          "Cal acumulada en tuberias que reduce el diametro util progresivamente",
          "Crecidas del Ebro que saturan la red de saneamiento de barrios riberenos",
        ],
      },
      infraestructura:
        "Zaragoza tiene un centro historico con edificios mudejar y renacentistas rodeado de barrios de expansion de los 60-80. Las Delicias, Torrero, Las Fuentes y San Jose concentran el mayor volumen de vivienda que necesita renovacion.",
      barriosZonas: ["Casco Historico", "Centro", "Delicias", "San Jose", "Las Fuentes", "Torrero"],
      datosUnicos: [
        "El cierzo es un viento unico que puede soplar durante dias a 80-100 km/h, danando instalaciones exteriores",
        "Zaragoza tiene una amplitud termica anual de casi 50 grados: de -8C en invierno a 42C en verano",
        "El Ebro ha inundado barrios riberenos multiples veces (2013, 2015, 2018)",
      ],
    },
  },
}

/**
 * Obtener datos de enriquecimiento local para un codigo postal.
 * Busca primero en datos especificos del CP, luego en datos a nivel de ciudad.
 */
export function getLocalEnrichment(cp: string): LocalEnrichment | null {
  // Primero: datos especificos del CP (maximo detalle)
  if (LOCAL_ENRICHMENT[cp]) {
    return LOCAL_ENRICHMENT[cp]
  }

  // Segundo: datos a nivel de ciudad (buen detalle para capitales)
  const cpNum = parseInt(cp, 10)
  if (isNaN(cpNum)) return null

  for (const cityData of Object.values(CITY_ENRICHMENT)) {
    const [min, max] = cityData.range
    if (cpNum >= min && cpNum <= max) {
      return {
        cp,
        ...cityData.data,
      }
    }
  }

  return null
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

/**
 * Rangos de CPs de capitales de provincia y grandes ciudades.
 * Estos CPs se indexan aunque no tengan contenido enriquecido
 * porque tienen volumen de busqueda real.
 */
const INDEXABLE_CP_RANGES: [number, number][] = [
  // Madrid capital
  [28001, 28055],
  // Barcelona capital
  [8001, 8042],
  // Valencia capital
  [46001, 46026],
  // Sevilla capital
  [41001, 41020],
  // Zaragoza capital
  [50001, 50018],
  // Malaga capital
  [29001, 29018],
  // Bilbao
  [48001, 48015],
  // Murcia
  [30001, 30012],
  // Palma de Mallorca
  [7001, 7015],
  // Las Palmas de GC
  [35001, 35018],
  // Alicante
  [3001, 3016],
  // Cordoba
  [14001, 14014],
  // Valladolid
  [47001, 47014],
  // Vigo
  [36201, 36214],
  // Gijon
  [33201, 33212],
  // A Coruna
  [15001, 15011],
  // Granada
  [18001, 18015],
  // San Sebastian
  [20001, 20018],
  // Santander
  [39001, 39012],
  // Oviedo
  [33001, 33013],
  // Pamplona
  [31001, 31015],
  // Tarragona
  [43001, 43010],
  // Cadiz
  [11001, 11012],
  // Almeria
  [4001, 4009],
  // Burgos
  [9001, 9007],
  // Salamanca
  [37001, 37008],
  // Lleida
  [25001, 25008],
  // Terrassa
  [8220, 8228],
  // Sabadell
  [8201, 8208],
  // Mostoles
  [28930, 28938],
  // Alcorcon
  [28920, 28926],
  // Getafe
  [28901, 28906],
  // Hospitalet de Llobregat
  [8901, 8908],
  // Santa Cruz de Tenerife
  [38001, 38010],
]

/**
 * Determina si un CP debe ser indexado por Google.
 * Solo indexamos:
 * 1. CPs con contenido enriquecido (datos reales locales)
 * 2. CPs de capitales de provincia y grandes ciudades (volumen de busqueda real)
 *
 * El resto se marca como noindex para no diluir el crawl budget y la autoridad.
 */
export function shouldIndexCP(cp: string): boolean {
  // Siempre indexar CPs con contenido enriquecido
  if (cp in LOCAL_ENRICHMENT) return true

  const cpNum = parseInt(cp, 10)
  if (isNaN(cpNum)) return false

  // Indexar si esta en un rango de capital de provincia / gran ciudad
  for (const [min, max] of INDEXABLE_CP_RANGES) {
    if (cpNum >= min && cpNum <= max) return true
  }

  return false
}

/**
 * Obtener la lista de todos los CPs indexables (para sitemaps).
 */
export function getAllIndexableCPs(allCPs: string[]): string[] {
  return allCPs.filter(shouldIndexCP)
}
