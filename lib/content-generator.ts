/**
 * Sistema de Generación de Contenido Único Programático AVANZADO
 * 
 * Genera contenido único y extenso para cada página combinando:
 * 1. Hash de la ciudad → selecciona variantes de texto
 * 2. Datos derivados (código provincia, población estimada)
 * 3. Frases rotativas basadas en el hash
 * 4. Estadísticas "únicas" generadas deterministicamente
 * 5. FAQs dinámicas específicas por profesión y ciudad
 * 6. Guías de consejos y prevención
 * 7. Información detallada sobre servicios
 * 8. Contenido educativo para el usuario
 */

// Función hash simple para generar número consistente por ciudad
function hashCity(citySlug: string): number {
  let hash = 0
  for (let i = 0; i < citySlug.length; i++) {
    const char = citySlug.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Provincias de España con códigos
const PROVINCE_DATA: Record<string, { name: string; code: string; region: string }> = {
  "01": { name: "Álava", code: "01", region: "País Vasco" },
  "02": { name: "Albacete", code: "02", region: "Castilla-La Mancha" },
  "03": { name: "Alicante", code: "03", region: "Comunidad Valenciana" },
  "04": { name: "Almería", code: "04", region: "Andalucía" },
  "05": { name: "Ávila", code: "05", region: "Castilla y León" },
  "06": { name: "Badajoz", code: "06", region: "Extremadura" },
  "07": { name: "Baleares", code: "07", region: "Islas Baleares" },
  "08": { name: "Barcelona", code: "08", region: "Cataluña" },
  "09": { name: "Burgos", code: "09", region: "Castilla y León" },
  "10": { name: "Cáceres", code: "10", region: "Extremadura" },
  "11": { name: "Cádiz", code: "11", region: "Andalucía" },
  "12": { name: "Castellón", code: "12", region: "Comunidad Valenciana" },
  "13": { name: "Ciudad Real", code: "13", region: "Castilla-La Mancha" },
  "14": { name: "Córdoba", code: "14", region: "Andalucía" },
  "15": { name: "A Coruña", code: "15", region: "Galicia" },
  "16": { name: "Cuenca", code: "16", region: "Castilla-La Mancha" },
  "17": { name: "Girona", code: "17", region: "Cataluña" },
  "18": { name: "Granada", code: "18", region: "Andalucía" },
  "19": { name: "Guadalajara", code: "19", region: "Castilla-La Mancha" },
  "20": { name: "Guipúzcoa", code: "20", region: "País Vasco" },
  "21": { name: "Huelva", code: "21", region: "Andalucía" },
  "22": { name: "Huesca", code: "22", region: "Aragón" },
  "23": { name: "Jaén", code: "23", region: "Andalucía" },
  "24": { name: "León", code: "24", region: "Castilla y León" },
  "25": { name: "Lleida", code: "25", region: "Cataluña" },
  "26": { name: "La Rioja", code: "26", region: "La Rioja" },
  "27": { name: "Lugo", code: "27", region: "Galicia" },
  "28": { name: "Madrid", code: "28", region: "Comunidad de Madrid" },
  "29": { name: "Málaga", code: "29", region: "Andalucía" },
  "30": { name: "Murcia", code: "30", region: "Región de Murcia" },
  "31": { name: "Navarra", code: "31", region: "Navarra" },
  "32": { name: "Ourense", code: "32", region: "Galicia" },
  "33": { name: "Asturias", code: "33", region: "Asturias" },
  "34": { name: "Palencia", code: "34", region: "Castilla y León" },
  "35": { name: "Las Palmas", code: "35", region: "Canarias" },
  "36": { name: "Pontevedra", code: "36", region: "Galicia" },
  "37": { name: "Salamanca", code: "37", region: "Castilla y León" },
  "38": { name: "Santa Cruz de Tenerife", code: "38", region: "Canarias" },
  "39": { name: "Cantabria", code: "39", region: "Cantabria" },
  "40": { name: "Segovia", code: "40", region: "Castilla y León" },
  "41": { name: "Sevilla", code: "41", region: "Andalucía" },
  "42": { name: "Soria", code: "42", region: "Castilla y León" },
  "43": { name: "Tarragona", code: "43", region: "Cataluña" },
  "44": { name: "Teruel", code: "44", region: "Aragón" },
  "45": { name: "Toledo", code: "45", region: "Castilla-La Mancha" },
  "46": { name: "Valencia", code: "46", region: "Comunidad Valenciana" },
  "47": { name: "Valladolid", code: "47", region: "Castilla y León" },
  "48": { name: "Vizcaya", code: "48", region: "País Vasco" },
  "49": { name: "Zamora", code: "49", region: "Castilla y León" },
  "50": { name: "Zaragoza", code: "50", region: "Aragón" },
  "51": { name: "Ceuta", code: "51", region: "Ceuta" },
  "52": { name: "Melilla", code: "52", region: "Melilla" },
}

// Variantes de texto para intro EXTENSAS (rotativas por hash)
const INTRO_VARIANTS = [
  (city: string, profession: string) => `¿Buscas un ${profession} de confianza en ${city}? Nuestro equipo de profesionales certificados está disponible las 24 horas del día, los 365 días del año, para atender cualquier emergencia que puedas tener en tu hogar o negocio. Contamos con técnicos especializados que conocen perfectamente la zona de ${city} y sus alrededores, lo que nos permite llegar a tu ubicación en el menor tiempo posible.`,
  (city: string, profession: string) => `Servicio de ${profession} en ${city} con la máxima rapidez y profesionalidad que mereces. Nuestros técnicos llegan a tu domicilio en cuestión de minutos, equipados con todas las herramientas y materiales necesarios para resolver tu problema en una sola visita. Trabajamos con los mejores proveedores del sector para garantizar reparaciones duraderas y de calidad.`,
  (city: string, profession: string) => `En ${city} contamos con ${profession}s certificados y con amplia experiencia, listos para resolver cualquier problema que tengas. Sin esperas innecesarias, sin complicaciones burocráticas. Nuestro proceso es simple: nos llamas, te damos un presupuesto orientativo por teléfono, y en minutos tienes a un profesional en tu puerta evaluando la situación.`,
  (city: string, profession: string) => `¿Necesitas un ${profession} urgente en ${city}? Estamos disponibles ahora mismo para ayudarte. Entendemos que las emergencias no avisan y pueden ocurrir en el momento más inoportuno. Por eso mantenemos un equipo de guardia permanente preparado para salir hacia tu ubicación en cuanto recibamos tu llamada.`,
  (city: string, profession: string) => `Los mejores ${profession}s de ${city} a tu servicio, con años de experiencia trabajando en la zona. Conocemos las particularidades de las instalaciones de ${city}, desde los edificios más antiguos del centro hasta las urbanizaciones más modernas. Esta experiencia local nos permite diagnosticar y solucionar problemas con mayor rapidez y eficacia.`,
  (city: string, profession: string) => `Servicio express de ${profession} en ${city} con presupuesto sin compromiso y precios totalmente transparentes. Antes de comenzar cualquier trabajo, te explicamos exactamente qué vamos a hacer, cuánto tiempo llevará y cuál será el coste final. Sin sorpresas, sin letras pequeñas, sin costes ocultos.`,
  (city: string, profession: string) => `Tu ${profession} de guardia en ${city}, atendiendo urgencias a cualquier hora del día o de la noche. Sabemos que un problema en casa puede arruinar tu día (o tu noche), por eso nos comprometemos a estar siempre disponibles cuando más nos necesitas. Nuestro servicio nocturno y de festivos funciona exactamente igual que el diurno.`,
  (city: string, profession: string) => `¿Problema urgente en ${city}? Nuestros ${profession}s están preparados para solucionarlo de forma rápida y definitiva. No aplicamos parches temporales: buscamos la raíz del problema y lo solucionamos correctamente para que no vuelva a ocurrir. Todas nuestras reparaciones incluyen garantía por escrito.`,
]

// Variantes para sección de garantías EXTENSAS
const GUARANTEE_VARIANTS = [
  "Todos nuestros trabajos incluyen garantía por escrito de mínimo 12 meses. Si surge cualquier problema relacionado con nuestra intervención, volvemos sin coste adicional.",
  "Garantía total en mano de obra y materiales utilizados. Trabajamos solo con marcas de primera calidad que ofrecen sus propias garantías de fabricante.",
  "Respaldamos cada servicio con nuestra garantía de satisfacción al 100%. Si no estás completamente satisfecho con el resultado, lo arreglamos sin coste.",
  "Ofrecemos garantía de devolución del dinero si no cumplimos con lo prometido. Tu tranquilidad es nuestra prioridad absoluta.",
  "Garantía extendida en todos los servicios realizados, con seguimiento post-servicio para asegurarnos de que todo funciona perfectamente.",
]

// Variantes para llamada a la acción EXTENSAS
const CTA_VARIANTS = [
  (city: string) => `No esperes más a que el problema empeore. Los vecinos de ${city} ya confían en nosotros para resolver sus emergencias del hogar. Únete a los miles de clientes satisfechos que nos recomiendan.`,
  (city: string) => `Miles de clientes en ${city} y alrededores nos avalan con sus valoraciones positivas. Únete a ellos y descubre por qué somos el servicio más recomendado de la zona.`,
  (city: string) => `En ${city} somos la opción preferida por familias y negocios. Descubre por qué nos eligen una y otra vez cuando necesitan un servicio profesional y de confianza.`,
  (city: string) => `La solución definitiva a tu problema en ${city} está a solo una llamada de distancia. Nuestro equipo está preparado para atenderte ahora mismo.`,
  (city: string) => `Profesionales experimentados de ${city} listos para atenderte en este momento. No dejes que un pequeño problema se convierta en uno grande.`,
]

// Problemas comunes por profesión AMPLIADOS (para generar contenido específico)
const COMMON_ISSUES: Record<string, string[]> = {
  electricista: [
    "cortocircuitos y apagones totales o parciales",
    "instalaciones eléctricas antiguas que necesitan actualización",
    "cuadros eléctricos que saltan constantemente",
    "enchufes que no funcionan o dan chispazos",
    "problemas con el diferencial o magnetotérmicos",
    "instalación de puntos de luz adicionales",
    "cableado deteriorado o con aislamiento dañado",
    "subidas de tensión que dañan electrodomésticos",
    "certificados de instalación eléctrica (boletín)",
    "instalación de cargadores para vehículos eléctricos",
  ],
  fontanero: [
    "fugas de agua urgentes visibles u ocultas",
    "tuberías atascadas o con flujo reducido",
    "problemas con el calentador o termo eléctrico",
    "grifos que gotean y desperdician agua",
    "humedades en paredes, techos o suelos",
    "rotura de tuberías por heladas o antigüedad",
    "instalación de sanitarios y griferías",
    "problemas de presión de agua",
    "cisternas que no paran de correr",
    "localización de fugas con cámara termográfica",
  ],
  cerrajero: [
    "puertas bloqueadas o atascadas",
    "llaves rotas dentro de la cerradura",
    "instalación de cerraduras de alta seguridad",
    "cambios de bombín y cilindros",
    "aperturas de emergencia sin daños",
    "cerraduras antibumping y antipalanca",
    "puertas acorazadas y blindadas",
    "cerraduras electrónicas y digitales",
    "cajas fuertes: apertura e instalación",
    "refuerzo de seguridad en puertas y ventanas",
  ],
  desatascos: [
    "atascos en el WC que no se solucionan con desatascador",
    "fregaderos obstruidos por grasa acumulada",
    "bajantes atascados en comunidades",
    "malos olores persistentes en tuberías",
    "arquetas bloqueadas por raíces o residuos",
    "limpieza de fosas sépticas",
    "inspección con cámara de tuberías",
    "desatascos con camión cuba de alta presión",
    "limpieza preventiva de desagües",
    "reparación de tuberías dañadas por atascos",
  ],
  calderas: [
    "calderas que no encienden o se apagan solas",
    "falta de agua caliente o temperatura insuficiente",
    "ruidos extraños: golpeteos, silbidos o burbujeos",
    "posibles fugas de gas (olor característico)",
    "revisiones obligatorias anuales",
    "calderas que pierden presión constantemente",
    "termostatos que no regulan correctamente",
    "radiadores que no calientan uniformemente",
    "purga de radiadores y circuito de calefacción",
    "sustitución de calderas antiguas por eficientes",
  ],
}

// FAQs dinámicas por profesión - CONTENIDO EXTENSO PARA SEO
const DYNAMIC_FAQS: Record<string, Array<{q: string, a: string}>> = {
  electricista: [
    {
      q: "¿Cuánto cuesta llamar a un electricista de urgencia?",
      a: "El precio de un electricista urgente varía según el tipo de avería y la hora del servicio. En general, una visita de diagnóstico tiene un coste de entre 30€ y 50€, que se descuenta del presupuesto si decides realizar la reparación. Las reparaciones simples como cambiar un enchufe o un interruptor suelen costar entre 40€ y 80€. Averías más complejas como problemas en el cuadro eléctrico pueden oscilar entre 100€ y 300€. Siempre damos presupuesto cerrado antes de empezar."
    },
    {
      q: "¿Por qué salta el diferencial constantemente?",
      a: "El diferencial salta para protegerte de descargas eléctricas cuando detecta una fuga de corriente. Las causas más comunes son: electrodomésticos defectuosos (especialmente lavadoras, lavavajillas y termos), humedad en enchufes o cajas de conexión, cables pelados o en mal estado, o un diferencial antiguo que necesita sustitución. Nuestros electricistas pueden identificar rápidamente el origen del problema con equipos de medición profesionales."
    },
    {
      q: "¿Es peligroso el olor a quemado en los enchufes?",
      a: "Sí, el olor a quemado en enchufes o interruptores es una señal de alarma que no debes ignorar. Indica que hay un sobrecalentamiento, generalmente por conexiones flojas, cables subdimensionados o exceso de carga. Desconecta inmediatamente los aparatos de ese enchufe y llámanos. El sobrecalentamiento puede provocar un incendio si no se soluciona a tiempo."
    },
    {
      q: "¿Necesito actualizar mi instalación eléctrica antigua?",
      a: "Las instalaciones eléctricas de más de 25-30 años suelen necesitar actualización. Las señales de que necesitas renovar incluyen: enchufes de dos clavijas (sin toma de tierra), cables de aluminio en lugar de cobre, cuadro eléctrico con fusibles en lugar de magnetotérmicos, o si notas que los enchufes se calientan al usar aparatos. Una instalación moderna es más segura y eficiente energéticamente."
    },
    {
      q: "¿Qué es el boletín eléctrico y cuándo lo necesito?",
      a: "El boletín eléctrico (Certificado de Instalación Eléctrica) es un documento oficial que certifica que tu instalación cumple con la normativa vigente. Lo necesitas para: dar de alta la luz en una vivienda nueva, aumentar la potencia contratada, después de una reforma importante, o para vender o alquilar una propiedad. Nuestros electricistas autorizados pueden emitirlo tras verificar o adaptar tu instalación."
    },
  ],
  fontanero: [
    {
      q: "¿Cómo puedo detectar una fuga de agua oculta?",
      a: "Las fugas ocultas se manifiestan de varias formas: manchas de humedad en paredes o techos, aumento inexplicable en la factura del agua, sonido de agua corriendo cuando todos los grifos están cerrados, o el contador de agua que sigue girando sin usar ningún grifo. Si sospechas de una fuga, cierra la llave de paso y llámanos. Utilizamos equipos de detección por ultrasonidos y cámaras termográficas para localizar fugas sin romper."
    },
    {
      q: "¿Por qué mi grifo gotea aunque lo cierre fuerte?",
      a: "Un grifo que gotea suele tener las juntas o el cartucho interior desgastados. Forzar el cierre solo empeora el problema y puede dañar el mecanismo. La solución es cambiar las piezas internas, lo cual es una reparación rápida y económica. Un grifo goteando puede desperdiciar hasta 30 litros de agua al día, así que merece la pena arreglarlo cuanto antes."
    },
    {
      q: "¿Cada cuánto tiempo debo revisar el calentador?",
      a: "Se recomienda revisar el calentador o termo eléctrico cada 2 años, y el de gas anualmente (esta última es obligatoria por ley). La revisión incluye: limpieza de quemadores, comprobación de la llama, verificación de la evacuación de gases, y revisión del ánodo de magnesio en termos eléctricos. Un mantenimiento regular alarga la vida útil del aparato y previene averías costosas."
    },
    {
      q: "¿Qué hago si tengo una inundación en casa?",
      a: "Ante una inundación: 1) Cierra la llave de paso general del agua inmediatamente. 2) Si hay riesgo eléctrico, corta también la luz desde el cuadro. 3) Llámanos para una intervención urgente. 4) Mientras esperamos, intenta recoger el agua con cubos y fregonas para minimizar daños. 5) Documenta los daños con fotos para el seguro. Llegamos en minutos para solucionar la emergencia."
    },
    {
      q: "¿Por qué sale poca presión de agua en mi casa?",
      a: "La baja presión puede deberse a: tuberías antiguas con cal acumulada, llaves de paso semicerradas, problemas en la acometida general del edificio, o fugas en algún punto de la instalación. También puede ser un problema temporal de la compañía de aguas. Si solo afecta a un grifo, probablemente sea el filtro del aireador obstruido, fácil de limpiar. Si es general, necesitas una revisión profesional."
    },
  ],
  cerrajero: [
    {
      q: "¿Pueden abrir mi puerta sin romperla?",
      a: "En la gran mayoría de casos, sí. Nuestros cerrajeros utilizan técnicas profesionales de apertura no destructiva: ganzúas, bumping controlado, impresioning, y herramientas especializadas. Solo en casos excepcionales (cerraduras de muy alta seguridad dañadas o puertas acorazadas con múltiples puntos de anclaje bloqueados) puede ser necesario forzar. Siempre intentamos primero los métodos no destructivos."
    },
    {
      q: "¿Cuánto tarda un cerrajero en abrir una puerta?",
      a: "El tiempo de apertura depende del tipo de cerradura. Una cerradura estándar se abre en 5-15 minutos. Cerraduras de seguridad media pueden llevar 15-30 minutos. Cerraduras de alta seguridad o puertas acorazadas pueden requerir 30-60 minutos o más. Nuestros cerrajeros te informan del tiempo estimado antes de empezar y trabajan con la máxima eficiencia."
    },
    {
      q: "¿Qué cerradura me recomiendan para más seguridad?",
      a: "Para máxima seguridad recomendamos cerraduras con cilindro antibumping y antipalanca, preferiblemente de marcas reconocidas como Keso, Mul-T-Lock, o Fichet. El escudo de seguridad es igual de importante que la cerradura. Para puertas de entrada principal, considera cerraduras multipunto que anclan en varios puntos del marco. Te asesoramos según tu presupuesto y nivel de seguridad deseado."
    },
    {
      q: "¿Debo cambiar la cerradura si pierdo las llaves?",
      a: "Depende de las circunstancias. Si perdiste las llaves en un lugar donde no pueden identificar tu dirección (transporte público, centro comercial), el riesgo es bajo. Pero si las perdiste cerca de casa, con documentación que incluya tu dirección, o si te las robaron, deberías cambiar al menos el bombín por seguridad. El cambio de bombín es rápido y relativamente económico."
    },
    {
      q: "¿Trabajan con puertas de garaje y persianas?",
      a: "Sí, además de cerraduras de puertas convencionales, trabajamos con: puertas de garaje (seccionales, basculantes, enrollables), persianas metálicas de comercios, cajas fuertes, buzones, y cerraduras de vehículos. Cada tipo requiere técnicas y herramientas específicas, y nuestro equipo está formado para todos estos servicios."
    },
  ],
  desatascos: [
    {
      q: "¿Por qué se atasca el WC si no tiro nada raro?",
      a: "Los atascos de WC no siempre son por objetos extraños. Las causas más comunes son: acumulación de papel higiénico (especialmente si usas mucho o de mala calidad), toallitas húmedas (aunque digan 'desechables', no lo son), acumulación de cal en tuberías antiguas, o problemas en el sifón o bajante. También puede haber un problema de ventilación en la tubería que impide el correcto flujo."
    },
    {
      q: "¿Los productos químicos desatascadores funcionan?",
      a: "Los desatascadores químicos pueden funcionar para atascos leves y superficiales, pero tienen importantes inconvenientes: son muy corrosivos y pueden dañar tuberías antiguas (especialmente de PVC o plomo), son peligrosos para la salud y el medio ambiente, y no solucionan atascos profundos o severos. Para atascos recurrentes o importantes, siempre es mejor una limpieza profesional mecánica o con agua a presión."
    },
    {
      q: "¿Qué es la limpieza con camión cuba?",
      a: "El camión cuba es un vehículo especializado equipado con bomba de agua a alta presión y sistema de succión. La limpieza con agua a presión (hasta 200 bares) elimina cualquier obstrucción y limpia las paredes de las tuberías de grasa y residuos acumulados. Es el método más efectivo para desatascos severos, limpieza de arquetas, fosas sépticas y bajantes de edificios."
    },
    {
      q: "¿Cada cuánto debo limpiar las tuberías preventivamente?",
      a: "Para uso doméstico normal, una limpieza preventiva cada 2-3 años es suficiente. Si tienes un restaurante o negocio de hostelería, se recomienda cada 6-12 meses debido a la acumulación de grasa. Las comunidades de vecinos deberían limpiar bajantes y arquetas anualmente. La limpieza preventiva es mucho más económica que una urgencia por atasco severo."
    },
    {
      q: "¿Por qué huele mal el desagüe aunque no esté atascado?",
      a: "El mal olor suele venir del sifón seco o sucio. El sifón es la curva de la tubería que retiene agua y actúa como barrera contra los olores de la red de saneamiento. Si un desagüe no se usa frecuentemente, el agua del sifón se evapora. Solución: deja correr agua unos segundos. Si el olor persiste, puede haber acumulación de residuos orgánicos en el sifón o un problema de ventilación en la tubería."
    },
  ],
  calderas: [
    {
      q: "¿Por qué mi caldera pierde presión constantemente?",
      a: "La pérdida de presión indica una fuga en algún punto del circuito de calefacción. Puede estar en: la propia caldera (válvula de seguridad, intercambiador), en algún radiador (purgadores, válvulas), o en las tuberías empotradas. También puede ser el vaso de expansión deteriorado. Es importante localizarla y repararla porque rellenar constantemente introduce aire y cal que dañan el sistema."
    },
    {
      q: "¿Cuánto dura una caldera y cuándo debo cambiarla?",
      a: "Una caldera bien mantenida puede durar 15-20 años. Señales de que necesitas cambiarla: averías frecuentes y costosas, consumo excesivo de gas, ruidos anormales constantes, dificultad para encontrar repuestos, o si es anterior a 2010 (las nuevas de condensación son mucho más eficientes). Cambiar una caldera antigua por una de condensación puede ahorrarte hasta un 30% en gas."
    },
    {
      q: "¿Es obligatoria la revisión anual de la caldera de gas?",
      a: "Sí, la revisión anual de calderas de gas es obligatoria por ley (RITE). Debe realizarla un técnico autorizado que emitirá un certificado. La revisión incluye: comprobación de estanqueidad, análisis de combustión, limpieza de quemadores, verificación de seguridades, y revisión de la evacuación de gases. Además de ser obligatoria, es fundamental para tu seguridad y para mantener la garantía del fabricante."
    },
    {
      q: "¿Qué hago si huelo a gas en casa?",
      a: "El olor a gas es una emergencia. Actúa así: 1) No enciendas ni apagues luces ni aparatos eléctricos. 2) No uses el móvil dentro de casa. 3) Abre ventanas para ventilar. 4) Cierra la llave de paso del gas. 5) Sal de la vivienda y llama a emergencias de gas (900 750 750) o a nosotros desde fuera. Nunca intentes localizar la fuga tú mismo."
    },
    {
      q: "¿Por qué los radiadores no calientan uniformemente?",
      a: "Si un radiador está frío arriba y caliente abajo, tiene aire acumulado y necesita purgarse. Si está frío abajo y caliente arriba, tiene lodos acumulados y necesita limpieza. Si unos radiadores calientan y otros no, puede ser un problema de equilibrado del circuito o de la bomba de circulación. También verifica que las válvulas termostáticas estén abiertas."
    },
  ],
}

// Consejos de prevención por profesión - CONTENIDO EDUCATIVO
const PREVENTION_TIPS: Record<string, string[]> = {
  electricista: [
    "No sobrecargues los enchufes con ladrones o regletas múltiples. Cada enchufe tiene una capacidad máxima.",
    "Revisa periódicamente el estado de los cables, especialmente detrás de muebles donde pueden aplastarse.",
    "Instala protectores de sobretensión para equipos electrónicos sensibles como ordenadores y televisores.",
    "Nunca manipules el cuadro eléctrico sin conocimientos. Un error puede ser mortal.",
    "Si notas chispas, olores extraños o enchufes calientes, desconecta y llama a un profesional.",
    "Las instalaciones de más de 20 años deberían ser revisadas por un electricista autorizado.",
  ],
  fontanero: [
    "Cierra la llave de paso si te vas de vacaciones para evitar sorpresas a la vuelta.",
    "No viertas aceite por el fregadero: solidifica en las tuberías y causa atascos.",
    "Revisa periódicamente las gomas de los grifos y conexiones de electrodomésticos.",
    "En invierno, protege las tuberías exteriores del frío para evitar roturas por congelación.",
    "Limpia los filtros de los grifos (aireadores) cada pocos meses para mantener buen caudal.",
    "Conoce dónde está la llave de paso general de tu casa para actuar rápido en emergencias.",
  ],
  cerrajero: [
    "Nunca dejes las llaves bajo el felpudo o en macetas: es lo primero que miran los ladrones.",
    "Lubrica las cerraduras una vez al año con grafito en polvo (no aceite, que atrae suciedad).",
    "No fuerces una llave que entra con dificultad: puede romperse dentro.",
    "Considera instalar una mirilla digital o videoportero para ver quién llama.",
    "Las cerraduras de más de 10 años pueden tener vulnerabilidades conocidas por los ladrones.",
    "Deja siempre una copia de llaves con alguien de confianza para emergencias.",
  ],
  desatascos: [
    "Usa rejillas en los desagües de ducha y lavabo para retener pelos y residuos.",
    "Nunca tires toallitas húmedas por el WC, aunque digan ser desechables.",
    "Vierte agua hirviendo por los desagües semanalmente para disolver grasa.",
    "No uses el WC como papelera: solo papel higiénico debe ir por ahí.",
    "Limpia el sifón del lavabo cada pocos meses para evitar malos olores.",
    "En cocinas, recoge los restos de comida antes de fregar los platos.",
  ],
  calderas: [
    "Purga los radiadores al inicio de cada temporada de calefacción.",
    "Mantén la presión del circuito entre 1 y 1.5 bares (consulta el manómetro).",
    "No cubras ni obstruyas las rejillas de ventilación de la caldera.",
    "Programa el termostato a temperaturas razonables (20-21°C) para ahorrar.",
    "Apaga la caldera si vas a estar fuera más de 3 días en invierno.",
    "Contrata el mantenimiento anual obligatorio: es por tu seguridad.",
  ],
}

// Genera estadísticas "únicas" basadas en hash (pero consistentes)
function generateStats(cityHash: number) {
  const baseServices = 150 + (cityHash % 350) // 150-500 servicios
  const baseYears = 8 + (cityHash % 12) // 8-20 años
  const baseRating = 4.7 + ((cityHash % 3) * 0.1) // 4.7-4.9
  const baseTime = 8 + (cityHash % 7) // 8-15 minutos
  
  return {
    servicesThisMonth: baseServices,
    yearsExperience: baseYears,
    rating: baseRating.toFixed(1),
    avgResponseTime: baseTime,
    satisfactionRate: 95 + (cityHash % 5), // 95-99%
  }
}

// Genera código postal aproximado basado en provincia
function generatePostalCode(provinceCode: string, cityHash: number): string {
  const suffix = String(cityHash % 1000).padStart(3, '0')
  return `${provinceCode}${suffix}`
}

export interface UniqueContent {
  intro: string
  guarantee: string
  cta: string
  issues: string[]
  stats: {
    servicesThisMonth: number
    yearsExperience: number
    rating: string
    avgResponseTime: number
    satisfactionRate: number
  }
  localInfo: {
    province: string
    region: string
    postalCodeExample: string
  }
  seoText: string
  faqs: Array<{q: string, a: string}>
  preventionTips: string[]
  extendedDescription: string
  whyChooseUs: string[]
  serviceProcess: string[]
}

/**
 * Genera contenido único y EXTENSO para una página basándose en ciudad y profesión
 * El contenido es DETERMINÍSTICO - siempre genera lo mismo para la misma ciudad
 * Incluye FAQs, consejos, descripciones extensas para evitar thin content
 */
export function generateUniqueContent(
  citySlug: string,
  cityName: string,
  professionId: string,
  professionName: string,
  provinceCode?: string
): UniqueContent {
  const hash = hashCity(citySlug + professionId)
  
  // Seleccionar variantes basadas en hash
  const introVariant = INTRO_VARIANTS[hash % INTRO_VARIANTS.length]
  const guaranteeVariant = GUARANTEE_VARIANTS[hash % GUARANTEE_VARIANTS.length]
  const ctaVariant = CTA_VARIANTS[hash % CTA_VARIANTS.length]
  
  // Obtener problemas específicos de la profesión
  const allIssues = COMMON_ISSUES[professionId] || COMMON_ISSUES.electricista
  // Rotar qué problemas mostrar primero
  const rotatedIssues = [...allIssues.slice(hash % allIssues.length), ...allIssues.slice(0, hash % allIssues.length)]
  
  // Estadísticas generadas
  const stats = generateStats(hash)
  
  // Info local
  const provCode = provinceCode || "28" // Default Madrid
  const province = PROVINCE_DATA[provCode] || PROVINCE_DATA["28"]
  const postalCode = generatePostalCode(provCode, hash)
  
  // Generar texto SEO único combinando elementos
  const seoText = generateSeoText(cityName, professionName, province.region, stats, rotatedIssues, hash)
  
  // FAQs rotadas por ciudad
  const allFaqs = DYNAMIC_FAQS[professionId] || DYNAMIC_FAQS.electricista
  const rotatedFaqs = [...allFaqs.slice(hash % 3), ...allFaqs.slice(0, hash % 3)]
  
  // Consejos de prevención rotados
  const allTips = PREVENTION_TIPS[professionId] || PREVENTION_TIPS.electricista
  const rotatedTips = [...allTips.slice(hash % 3), ...allTips.slice(0, hash % 3)]
  
  // Descripción extendida única
  const extendedDescription = generateExtendedDescription(cityName, professionName, province.region, stats, hash)
  
  // Por qué elegirnos
  const whyChooseUs = generateWhyChooseUs(cityName, professionName, stats, hash)
  
  // Proceso de servicio
  const serviceProcess = generateServiceProcess(professionName, hash)
  
  return {
    intro: introVariant(cityName, professionName.toLowerCase()),
    guarantee: guaranteeVariant,
    cta: ctaVariant(cityName),
    issues: rotatedIssues,
    stats,
    localInfo: {
      province: province.name,
      region: province.region,
      postalCodeExample: postalCode,
    },
    seoText,
    faqs: rotatedFaqs,
    preventionTips: rotatedTips,
    extendedDescription,
    whyChooseUs,
    serviceProcess,
  }
}

// Genera descripción extendida única por ciudad
function generateExtendedDescription(
  cityName: string,
  professionName: string,
  region: string,
  stats: ReturnType<typeof generateStats>,
  hash: number
): string {
  const templates = [
    () => `Nuestro servicio de ${professionName.toLowerCase()} en ${cityName} se ha consolidado como referencia en ${region} gracias a nuestro compromiso inquebrantable con la calidad y la satisfacción del cliente. Con ${stats.yearsExperience} años de experiencia atendiendo a los vecinos de ${cityName} y localidades cercanas, hemos desarrollado un profundo conocimiento de las particularidades de las instalaciones de la zona, desde los edificios históricos del casco antiguo hasta las construcciones más modernas de las nuevas urbanizaciones. Nuestro equipo de técnicos certificados recibe formación continua para estar al día de las últimas tecnologías y normativas del sector, garantizando intervenciones seguras, eficientes y duraderas. Cada mes realizamos más de ${stats.servicesThisMonth} servicios en ${cityName} y alrededores, manteniendo una valoración media de ${stats.rating} sobre 5 gracias a nuestra política de transparencia en precios, puntualidad y trabajo bien hecho a la primera.`,
    
    () => `En ${cityName}, ${region}, llevamos ${stats.yearsExperience} años siendo el ${professionName.toLowerCase()} de confianza para miles de familias y negocios. Nuestra filosofía es simple pero efectiva: llegar rápido, diagnosticar correctamente, presupuestar con transparencia y ejecutar con profesionalidad. No creemos en los parches temporales ni en las soluciones a medias. Cuando intervenimos, buscamos resolver el problema de raíz para que no vuelva a ocurrir. Por eso el ${stats.satisfactionRate}% de nuestros clientes en ${cityName} nos recomiendan a familiares y amigos. Nuestro tiempo medio de llegada es de solo ${stats.avgResponseTime} minutos porque mantenemos técnicos distribuidos estratégicamente por toda la zona. Además, nuestras furgonetas van equipadas con todo el material necesario para resolver la mayoría de incidencias en una sola visita, sin necesidad de volver otro día.`,
    
    () => `¿Por qué somos el servicio de ${professionName.toLowerCase()} más solicitado en ${cityName}? Porque entendemos que cuando tienes una emergencia en casa, necesitas soluciones, no excusas. Llevamos ${stats.yearsExperience} años perfeccionando nuestro servicio para ofrecer la mejor experiencia posible: atención telefónica inmediata las 24 horas, llegada en ${stats.avgResponseTime} minutos de media, presupuesto cerrado antes de empezar, y garantía por escrito en todos los trabajos. En ${region} somos conocidos por nuestra seriedad y profesionalidad. Este mes ya hemos atendido ${stats.servicesThisMonth} servicios en ${cityName} y alrededores, y cada uno de ellos ha recibido el mismo nivel de atención y cuidado. Para nosotros no hay trabajos pequeños ni clientes menos importantes.`,
    
    () => `El servicio de ${professionName.toLowerCase()} que ofrecemos en ${cityName} va más allá de la simple reparación. Nos consideramos asesores de confianza para nuestros clientes, ayudándoles a mantener sus instalaciones en óptimas condiciones y a prevenir problemas futuros. Con ${stats.yearsExperience} años de experiencia en ${region}, hemos visto de todo y sabemos anticiparnos a los problemas más comunes. Nuestros técnicos no solo arreglan lo que está roto: te explican qué ha pasado, por qué, y cómo evitar que vuelva a ocurrir. Esta filosofía de servicio integral nos ha permitido mantener una tasa de satisfacción del ${stats.satisfactionRate}% y una valoración de ${stats.rating}/5 en ${cityName}. Más de ${stats.servicesThisMonth} intervenciones mensuales avalan nuestra capacidad y compromiso.`,
  ]
  
  return templates[hash % templates.length]()
}

// Genera razones para elegirnos
function generateWhyChooseUs(
  cityName: string,
  professionName: string,
  stats: ReturnType<typeof generateStats>,
  hash: number
): string[] {
  const allReasons = [
    `Llegamos en ${stats.avgResponseTime} minutos de media a cualquier punto de ${cityName}`,
    `${stats.yearsExperience} años de experiencia nos avalan como profesionales de confianza`,
    `Más de ${stats.servicesThisMonth} servicios realizados este mes en la zona`,
    `${stats.satisfactionRate}% de clientes satisfechos nos recomiendan`,
    `Valoración de ${stats.rating}/5 basada en opiniones verificadas`,
    `Presupuesto cerrado y sin sorpresas antes de empezar cualquier trabajo`,
    `Garantía por escrito en todas las reparaciones e instalaciones`,
    `Servicio 24 horas los 365 días del año, incluidos festivos`,
    `Técnicos certificados con formación continua actualizada`,
    `Furgonetas equipadas para resolver la mayoría de problemas en una visita`,
    `Atención telefónica inmediata, sin esperas ni contestadores`,
    `Conocemos ${cityName} y sus particularidades a la perfección`,
  ]
  
  // Rotar y seleccionar 6 razones
  const startIndex = hash % 4
  return [...allReasons.slice(startIndex), ...allReasons.slice(0, startIndex)].slice(0, 6)
}

// Genera proceso de servicio
function generateServiceProcess(professionName: string, hash: number): string[] {
  const processes = [
    [
      "Llámanos al teléfono de urgencias y cuéntanos tu problema",
      "Te damos una estimación de tiempo y precio orientativo por teléfono",
      `Un ${professionName.toLowerCase()} sale inmediatamente hacia tu ubicación`,
      "Evaluamos el problema in situ y te damos presupuesto cerrado",
      "Si aceptas, realizamos el trabajo de forma profesional y limpia",
      "Verificamos que todo funciona correctamente antes de irnos",
      "Te entregamos factura y garantía por escrito del trabajo realizado",
    ],
    [
      "Contacta con nosotros por teléfono o formulario web",
      "Nuestro equipo de atención recoge todos los detalles de tu emergencia",
      `Asignamos al ${professionName.toLowerCase()} más cercano a tu zona`,
      "El técnico llega con todo el material necesario para la reparación",
      "Diagnóstico profesional y presupuesto transparente sin compromiso",
      "Ejecución del trabajo con los más altos estándares de calidad",
      "Limpieza de la zona de trabajo y explicación de lo realizado",
    ],
  ]
  
  return processes[hash % processes.length]
}

// Genera párrafo SEO único y EXTENSO combinando múltiples elementos
function generateSeoText(
  cityName: string,
  professionName: string,
  region: string,
  stats: ReturnType<typeof generateStats>,
  issues: string[],
  hash: number
): string {
  const templates = [
    () => `Nuestro servicio de ${professionName.toLowerCase()} en ${cityName} cuenta con ${stats.yearsExperience} años de experiencia atendiendo a los vecinos de ${region}. Este mes ya hemos realizado ${stats.servicesThisMonth} servicios en la zona, especializándonos en ${issues[0]} y ${issues[1]}. Con un tiempo medio de respuesta de ${stats.avgResponseTime} minutos y una valoración de ${stats.rating}/5, somos la opción preferida en ${cityName}. Nuestros técnicos conocen perfectamente las características de las instalaciones de la zona, desde los edificios más antiguos hasta las construcciones más recientes, lo que nos permite ofrecer soluciones adaptadas a cada situación. Trabajamos con las mejores marcas del mercado y ofrecemos garantía por escrito en todos nuestros trabajos. La satisfacción de nuestros clientes, con un ${stats.satisfactionRate}% de valoraciones positivas, es nuestro mejor aval.`,
    
    () => `En ${cityName}, ${region}, llevamos ${stats.yearsExperience} años siendo el ${professionName.toLowerCase()} de referencia para familias y negocios. Nuestros técnicos están especialmente preparados para resolver ${issues[0]}, ${issues[1]} y ${issues[2]}, entre muchos otros problemas habituales. Con ${stats.satisfactionRate}% de clientes satisfechos y más de ${stats.servicesThisMonth} intervenciones mensuales, garantizamos un servicio de máxima calidad. Lo que nos diferencia es nuestro compromiso con la excelencia: no nos conformamos con arreglar el problema, sino que buscamos la causa raíz para evitar que vuelva a ocurrir. Además, nuestro servicio de atención al cliente está disponible las 24 horas para resolver cualquier duda o emergencia que puedas tener.`,
    
    () => `¿Por qué elegir nuestro servicio de ${professionName.toLowerCase()} en ${cityName}? Porque conocemos ${region} como nadie después de ${stats.yearsExperience} años resolviendo ${issues[0]} y ${issues[1]}. Llegamos en ${stats.avgResponseTime} minutos de media y mantenemos una valoración de ${stats.rating}/5 gracias a nuestra política de transparencia y profesionalidad. Cada técnico de nuestro equipo ha sido cuidadosamente seleccionado y formado para ofrecer el mejor servicio posible. No subcontratamos: todos los profesionales que enviamos son parte de nuestro equipo y comparten nuestros valores de calidad y atención al cliente. Este mes hemos realizado ${stats.servicesThisMonth} servicios en ${cityName} y alrededores, y cada uno de ellos ha recibido nuestra máxima atención.`,
    
    () => `Los habitantes de ${cityName} confían en nosotros para sus problemas de ${issues[0]}, ${issues[1]} y ${issues[2]}, y muchos otros servicios relacionados. Como ${professionName.toLowerCase()}s con ${stats.yearsExperience} años de experiencia en ${region}, ofrecemos respuesta en ${stats.avgResponseTime} minutos de media. Más de ${stats.servicesThisMonth} servicios este mes con ${stats.satisfactionRate}% de satisfacción demuestran nuestro compromiso con la calidad. Entendemos que cuando tienes un problema en casa, necesitas una solución rápida y definitiva. Por eso nuestras furgonetas van equipadas con todo el material necesario para resolver la mayoría de incidencias en una sola visita. Y si el problema requiere una intervención más compleja, te lo explicamos claramente y te damos un presupuesto cerrado sin sorpresas.`,
  ]
  
  return templates[hash % templates.length]()
}

/**
 * Genera variantes de testimonios basados en la ciudad
 */
export function generateTestimonials(citySlug: string, cityName: string, professionName: string) {
  const hash = hashCity(citySlug)
  
  const firstNames = ["María", "Carlos", "Ana", "José", "Laura", "Pedro", "Carmen", "Antonio", "Isabel", "Manuel", "Lucía", "Francisco"]
  const lastInitials = ["G", "R", "M", "L", "S", "P", "F", "T", "V", "N"]
  
  const templates = [
    "Vinieron en menos de 15 minutos. Muy profesionales y el precio justo.",
    "Excelente servicio. Resolvieron el problema rápidamente.",
    "Los recomiendo 100%. Puntuales y muy limpios trabajando.",
    "Llamé a las 11 de la noche y vinieron enseguida. Muy agradecido.",
    "Presupuesto sin sorpresas y trabajo impecable.",
    "Llevaba días con el problema y lo solucionaron en una hora.",
    "Trato muy amable y precio competitivo.",
    "Segunda vez que les llamo. Siempre responden rápido.",
  ]
  
  const times = ["Hace 2 horas", "Hace 5 horas", "Ayer", "Hace 2 días", "Esta semana"]
  
  return [
    {
      name: `${firstNames[hash % firstNames.length]} ${lastInitials[hash % lastInitials.length]}.`,
      text: templates[hash % templates.length],
      time: times[hash % times.length],
      city: cityName,
    },
    {
      name: `${firstNames[(hash + 3) % firstNames.length]} ${lastInitials[(hash + 2) % lastInitials.length]}.`,
      text: templates[(hash + 2) % templates.length],
      time: times[(hash + 1) % times.length],
      city: cityName,
    },
    {
      name: `${firstNames[(hash + 7) % firstNames.length]} ${lastInitials[(hash + 5) % lastInitials.length]}.`,
      text: templates[(hash + 4) % templates.length],
      time: times[(hash + 2) % times.length],
      city: cityName,
    },
  ]
}
