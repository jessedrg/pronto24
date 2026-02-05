"use client"

import { useState } from "react"
import { 
  BookOpen, 
  AlertTriangle, 
  Wrench, 
  Clock, 
  Euro, 
  Shield, 
  CheckCircle2,
  ChevronDown,
  Lightbulb,
  FileText,
  Users,
  Award,
  Phone
} from "lucide-react"

interface ExpertGuide {
  title: string
  introduction: string
  sections: {
    title: string
    content: string
    tips?: string[]
  }[]
  commonMistakes: string[]
  whenToCall: string[]
  costFactors: string[]
}

// Guías de experto extensas por profesión
const EXPERT_GUIDES: Record<string, ExpertGuide> = {
  electricista: {
    title: "Guia Completa: Todo lo que Necesitas Saber sobre Electricidad en el Hogar",
    introduction: "La instalacion electrica es el sistema nervioso de tu hogar. Una instalacion en buen estado garantiza seguridad, eficiencia energetica y funcionamiento optimo de todos tus electrodomesticos. Esta guia te ayudara a entender como funciona tu instalacion, detectar problemas a tiempo y saber cuando necesitas un electricista profesional.",
    sections: [
      {
        title: "Como funciona tu instalacion electrica",
        content: "Tu instalacion electrica comienza en el cuadro general, donde se encuentran los magnetotermicos (que protegen de sobrecargas) y el diferencial (que protege de electrocuciones). Desde ahi, diferentes circuitos alimentan las distintas zonas de tu casa: iluminacion, enchufes normales, cocina y horno, aire acondicionado, etc. Cada circuito tiene un cable de fase (normalmente marron o negro), neutro (azul) y tierra (verde-amarillo). La potencia contratada determina cuanta electricidad puedes usar simultaneamente.",
        tips: [
          "Localiza tu cuadro electrico y familiarizate con el",
          "Etiqueta cada magnetotermico para saber que zona protege",
          "Aprende a identificar si ha saltado el diferencial o un magnetotermico"
        ]
      },
      {
        title: "Senales de alerta en tu instalacion",
        content: "Hay varios indicadores de que algo no va bien en tu instalacion electrica. Los enchufes o interruptores calientes indican conexiones flojas o cables subdimensionados. El olor a quemado es una senal seria de sobrecalentamiento. Las luces que parpadean pueden indicar conexiones sueltas o problemas en el neutro. Si el diferencial salta frecuentemente, hay una fuga de corriente que debe localizarse. Los chispazos al enchufar aparatos sugieren enchufes desgastados o problemas internos.",
        tips: [
          "Nunca ignores un olor a quemado o plastico derretido",
          "Si un enchufe esta caliente, desconecta todo y llama a un profesional",
          "El diferencial debe probarse mensualmente con el boton de test"
        ]
      },
      {
        title: "Ahorro energetico y eficiencia",
        content: "Una instalacion electrica moderna y bien dimensionada puede ahorrarte hasta un 30% en la factura de la luz. Los LED consumen hasta un 80% menos que las bombillas tradicionales. Los electrodomesticos de clase A+++ son significativamente mas eficientes. Considera instalar temporizadores o enchufes inteligentes para evitar consumos vampiro (aparatos en standby). Un electricista puede realizar una auditoria energetica de tu hogar para identificar puntos de mejora y optimizar tu consumo.",
        tips: [
          "Sustituye todas las bombillas por LED de calidad",
          "Desconecta regletas cuando no las uses",
          "Considera instalar un discriminador horario si tienes tarifa con discriminacion"
        ]
      },
      {
        title: "Normativa y legalizacion",
        content: "El Reglamento Electrotecnico de Baja Tension (REBT) establece los requisitos minimos de seguridad para instalaciones electricas. Cualquier instalacion nueva o reforma importante debe ser certificada por un electricista autorizado mediante el Boletin Electrico o Certificado de Instalacion Electrica (CIE). Este documento es necesario para dar de alta la luz, aumentar potencia, vender o alquilar una propiedad. Las instalaciones de mas de 20 anos pueden no cumplir la normativa actual y es recomendable una revision profesional.",
        tips: [
          "Guarda siempre el boletin electrico con la documentacion de tu casa",
          "Si compras una vivienda antigua, solicita una inspeccion electrica",
          "Las reformas electricas siempre deben ser realizadas por electricistas autorizados"
        ]
      }
    ],
    commonMistakes: [
      "Sobrecargar regletas y ladrones con demasiados aparatos de alto consumo",
      "Usar cables o enchufes danados pensando que 'aun funcionan'",
      "Intentar reparaciones electricas sin conocimientos ni herramientas adecuadas",
      "Ignorar el salto frecuente del diferencial atribuyendolo a 'cosas de la casa vieja'",
      "No comprobar la potencia contratada antes de instalar nuevos electrodomesticos potentes",
      "Tapar cuadros electricos con muebles o decoracion dificultando el acceso"
    ],
    whenToCall: [
      "Si hueles a quemado o ves humo en cualquier punto electrico",
      "Si el diferencial salta repetidamente sin causa aparente",
      "Si notas enchufes o interruptores calientes al tacto",
      "Si las luces parpadean o se atenuan cuando enciendes algun aparato",
      "Si necesitas anadir nuevos puntos de luz o enchufes",
      "Si tu instalacion tiene mas de 25 anos y nunca ha sido revisada",
      "Si vas a instalar un aire acondicionado, horno potente o cargador de coche electrico"
    ],
    costFactors: [
      "Tipo de averia: simple (enchufe roto) vs compleja (problema en cuadro)",
      "Hora del servicio: tarifa normal vs nocturna/festiva",
      "Materiales necesarios: cables, mecanismos, protecciones",
      "Accesibilidad: instalaciones vistas vs empotradas",
      "Necesidad de certificacion oficial (boletin electrico)",
      "Extension del trabajo: reparacion puntual vs renovacion de circuito"
    ]
  },
  fontanero: {
    title: "Guia Completa: Mantenimiento y Reparacion de Fontaneria en el Hogar",
    introduction: "El sistema de fontaneria de tu hogar es responsable del suministro de agua limpia y la evacuacion de aguas residuales. Un mantenimiento adecuado previene costosas averias y danos por agua, que pueden afectar seriamente la estructura de tu vivienda. Esta guia te ensenara a cuidar tu instalacion, detectar problemas tempranamente y actuar correctamente en emergencias.",
    sections: [
      {
        title: "Componentes basicos de tu instalacion",
        content: "Tu instalacion de fontaneria se divide en dos sistemas: el de suministro (agua limpia) y el de evacuacion (desagues). El suministro comienza en la llave de paso general, que debes conocer y saber operar. Desde ahi, el agua se distribuye a traves de tuberias (de cobre, PVC, polietileno o multicapa) hacia los diferentes puntos de consumo. El sistema de evacuacion recoge las aguas usadas mediante sifones (que retienen agua para evitar malos olores) y las conduce al alcantarillado. Cada sanitario tiene su llave de escuadra individual para poder aislarlo sin cortar el agua de toda la casa.",
        tips: [
          "Localiza y senala la llave de paso general de tu vivienda",
          "Identifica las llaves de escuadra de cada sanitario",
          "Revisa periodicamente que las llaves no esten agarrotadas"
        ]
      },
      {
        title: "Prevencion de fugas y humedades",
        content: "Las fugas de agua son una de las principales causas de danos en viviendas. Pueden ser visibles (goteo evidente) u ocultas (dentro de paredes o bajo suelos). Las senales de fugas ocultas incluyen: manchas de humedad, pintura que se despega, aumento inexplicable del consumo de agua, sonido de agua corriendo cuando todo esta cerrado, o el contador que sigue girando sin usar ningun grifo. La deteccion temprana es crucial: una pequena fuga puede desperdiciar mas de 10.000 litros al ano y causar danos estructurales importantes.",
        tips: [
          "Revisa mensualmente bajo los fregaderos y lavabos",
          "Comprueba el contador con todos los grifos cerrados",
          "Atiende los grifos que gotean: no es solo molesto, es desperdicio"
        ]
      },
      {
        title: "Calentadores y termos: cuidados esenciales",
        content: "El calentador o termo es uno de los elementos mas importantes y costosos de tu instalacion. Los calentadores de gas requieren revision anual obligatoria por ley, que incluye limpieza de quemadores, verificacion de la llama y comprobacion de la evacuacion de gases. Los termos electricos acumulan cal en su interior, especialmente en zonas de agua dura, lo que reduce su eficiencia y vida util. Se recomienda revisar y descalcificar cada 2-3 anos. El anodo de magnesio protege el deposito de la corrosion y debe sustituirse cuando este consumido.",
        tips: [
          "Programa la revision anual del calentador de gas sin falta",
          "Ajusta el termostato del termo a 60C para eficiencia y seguridad",
          "Si el agua sale menos caliente o tarda mas en calentar, necesita revision"
        ]
      },
      {
        title: "Actuacion en emergencias de agua",
        content: "Ante una emergencia de agua (fuga importante, rotura de tuberia, inundacion), la rapidez de actuacion es crucial para minimizar danos. Lo primero siempre es cerrar la llave de paso para detener el flujo de agua. Si hay riesgo de contacto del agua con instalaciones electricas, corta tambien la luz desde el cuadro. Intenta recoger el agua con cubos y fregonas para evitar que se extienda. Documenta los danos con fotos para el seguro antes de empezar a limpiar. Y llama a un fontanero urgente para solucionar el origen del problema lo antes posible.",
        tips: [
          "Ten siempre localizada la llave de paso general",
          "Guarda el numero de un fontanero de urgencias en el movil",
          "Ten a mano fregonas, cubos y toallas viejas para emergencias"
        ]
      }
    ],
    commonMistakes: [
      "Verter aceite de cocina por el fregadero (causa atascos graves)",
      "Usar el WC como papelera (toallitas, bastoncillos, compresas)",
      "Ignorar un grifo que gotea pensando que 'no es para tanto'",
      "No cerrar la llave de paso al irse de vacaciones",
      "Usar productos quimicos agresivos que danan las tuberias",
      "No revisar periodicamente las conexiones de electrodomesticos",
      "Dejar que se acumule cal sin tratar el agua en zonas duras"
    ],
    whenToCall: [
      "Si detectas una fuga de agua, por pequena que sea",
      "Si hay manchas de humedad en paredes o techos",
      "Si el calentador no funciona correctamente o hace ruidos extranos",
      "Si hay atascos que no se solucionan con metodos caseros",
      "Si necesitas instalar un nuevo sanitario o electrodomestico",
      "Si la presion del agua ha bajado notablemente",
      "Antes de irte de vacaciones largas, para una revision preventiva"
    ],
    costFactors: [
      "Urgencia: servicio programado vs emergencia nocturna",
      "Tipo de reparacion: visible y accesible vs empotrada",
      "Materiales: calidad y marca de los componentes",
      "Necesidad de romper para acceder a tuberias ocultas",
      "Extension: reparacion puntual vs sustitucion de tramo",
      "Deteccion de fugas: visual vs con equipos especializados"
    ]
  },
  cerrajero: {
    title: "Guia Completa: Seguridad y Cerrajeria para tu Hogar",
    introduction: "La seguridad de tu hogar comienza en la puerta de entrada. Una cerradura de calidad y correctamente instalada es tu primera linea de defensa contra intrusiones. Esta guia te ayudara a entender los diferentes tipos de cerraduras, como mantenerlas en buen estado, y que hacer en situaciones de emergencia como quedarte fuera de casa.",
    sections: [
      {
        title: "Tipos de cerraduras y su seguridad",
        content: "No todas las cerraduras ofrecen el mismo nivel de seguridad. Las cerraduras de borja (las mas basicas) solo son adecuadas para puertas interiores. Las cerraduras de cilindro con bombín son las mas comunes en viviendas; su seguridad depende enormemente de la calidad del bombin. Las cerraduras antibumping resisten el metodo de apertura mas utilizado por ladrones. Las cerraduras multipunto anclan la puerta en varios puntos del marco (3, 5 o 7 puntos), ofreciendo maxima resistencia. Las cerraduras invisibles o de seguridad extra se instalan por dentro y no tienen acceso desde el exterior.",
        tips: [
          "Invierte en un bombin de calidad: es mas importante que la cerradura",
          "Busca cilindros con certificacion SKG o similar",
          "Considera cerraduras multipunto para la puerta principal"
        ]
      },
      {
        title: "Mantenimiento de cerraduras",
        content: "Una cerradura bien mantenida funciona mejor y dura mas. La lubricacion es esencial: usa grafito en polvo (nunca aceite, que atrae suciedad) una vez al ano. Si la llave entra con dificultad, no la fuerces: la cerradura necesita atencion. Limpia periodicamente el cilindro con aire comprimido para eliminar polvo acumulado. Las cerraduras de puertas exteriores sufren mas por la intemperie y necesitan atencion extra. Si notas que la puerta no cierra bien, ajusta las bisagras antes de forzar la cerradura.",
        tips: [
          "Lubrica las cerraduras al menos una vez al ano",
          "Nunca uses llaves danadas o dobladas",
          "Si una llave esta rigida, no la fuerces: necesita lubricacion"
        ]
      },
      {
        title: "Que hacer si te quedas fuera",
        content: "Quedarse fuera de casa es estresante pero tiene solucion. Lo primero es mantener la calma y evaluar opciones: vecino con copia de llaves, familiar que pueda traer otra llave, entrada alternativa segura. Si no hay otra opcion, llama a un cerrajero profesional. Desconfia de cerrajeros que quieran romper la cerradura inmediatamente: un profesional intenta primero metodos no destructivos. Pide siempre presupuesto antes de que empiecen y exige factura. Ten cuidado con estafas: algunos 'cerrajeros' cobran precios abusivos o danan la puerta innecesariamente.",
        tips: [
          "Deja siempre una copia de llaves con alguien de confianza",
          "Guarda el numero de un cerrajero de confianza en el movil",
          "Desconfia de precios extremadamente bajos o altos por telefono"
        ]
      },
      {
        title: "Mejora la seguridad de tu hogar",
        content: "Mas alla de la cerradura, hay otras medidas que mejoran la seguridad. Un escudo de seguridad protege el cilindro de ataques. Los cerrojos adicionales anaden una capa extra de proteccion. Las mirillas digitales o videoporteros permiten ver quien llama antes de abrir. Las cerraduras inteligentes ofrecen control remoto y registro de accesos. Las puertas blindadas o acorazadas combinan cerraduras de alta seguridad con estructura reforzada. Y no olvides las ventanas: rejas, cierres de seguridad o cristales laminados segun el caso.",
        tips: [
          "Un buen escudo de seguridad es tan importante como el bombin",
          "Considera un cerrojo adicional para cuando estes dentro",
          "Las ventanas accesibles necesitan proteccion adicional"
        ]
      }
    ],
    commonMistakes: [
      "Dejar llaves bajo el felpudo, en macetas o en el buzon",
      "Usar bombines de baja calidad en la puerta principal",
      "Forzar llaves que entran con dificultad",
      "No cambiar cerraduras al mudarse a una vivienda usada",
      "Publicar en redes sociales que estas de vacaciones",
      "Dejar puertas o ventanas sin cerrar 'porque vuelvo enseguida'",
      "Contratar al primer cerrajero que aparece en internet sin referencias"
    ],
    whenToCall: [
      "Si te has quedado fuera de casa sin llaves",
      "Si la cerradura no funciona correctamente o esta muy rigida",
      "Si has sufrido un intento de robo o la cerradura esta danada",
      "Si acabas de mudarte y quieres cambiar las cerraduras",
      "Si quieres mejorar la seguridad de tu puerta principal",
      "Si has perdido las llaves y alguien podria identificar tu direccion",
      "Si necesitas copias de llaves de seguridad o codificadas"
    ],
    costFactors: [
      "Hora del servicio: laborable vs nocturno/festivo",
      "Tipo de cerradura: estandar vs alta seguridad",
      "Metodo de apertura: sin danos vs necesidad de forzar",
      "Necesidad de cambio de bombin o cerradura completa",
      "Tipo de puerta: estandar vs blindada/acorazada",
      "Urgencia: emergencia inmediata vs cita programada"
    ]
  },
  desatascos: {
    title: "Guia Completa: Prevencion y Solucion de Atascos en Tuberias",
    introduction: "Los atascos en tuberias son uno de los problemas domesticos mas comunes y desagradables. Desde el WC que no traga hasta malos olores persistentes, estos problemas afectan a la higiene y comodidad de tu hogar. Esta guia te ensenara a prevenir atascos, identificar su origen y saber cuando necesitas ayuda profesional.",
    sections: [
      {
        title: "Por que se producen los atascos",
        content: "Los atascos no aparecen de la noche a la manana: son el resultado de la acumulacion gradual de residuos. En la cocina, la grasa es el principal enemigo: se solidifica en las tuberias y atrapa otros residuos. En el bano, los pelos son la causa principal de atascos en duchas y lavabos; en el WC, el papel higienico en exceso y, sobre todo, toallitas humedas y otros objetos que no deberian tirarse. Las arquetas y bajantes de edificios sufren atascos por raices que penetran en busca de agua, o por acumulacion de residuos de multiples viviendas.",
        tips: [
          "Nunca viertas aceite por el fregadero: recogelo en un recipiente",
          "Usa rejillas en todos los desagues para retener pelos y residuos",
          "El WC solo admite papel higienico: nada de toallitas, compresas, etc."
        ]
      },
      {
        title: "Senales de alerta de atascos",
        content: "Antes de que un atasco sea total, suele haber senales de advertencia. El agua que tarda mas de lo normal en evacuar indica obstruccion parcial. Los gorgoteos o burbujeos cuando desagua el agua sugieren problemas de ventilacion o atasco en formacion. Los malos olores que salen de los desagues indican acumulacion de residuos organicos. Si al tirar de la cadena el agua sube en la ducha o lavabo, hay atasco en un punto comun. Atender estas senales a tiempo evita emergencias mayores.",
        tips: [
          "No ignores un desague lento: el problema solo empeorara",
          "Los malos olores no desaparecen solos: hay que actuar",
          "Si varios puntos se atascan a la vez, el problema esta en el bajante"
        ]
      },
      {
        title: "Metodos de desatasco profesional",
        content: "Los profesionales utilizamos diferentes tecnicas segun el tipo y ubicacion del atasco. Las varillas y espirales mecanicas son efectivas para atascos accesibles y no muy severos. La hidrolimpieza con agua a presion (hasta 200 bares) elimina cualquier obstruccion y limpia las paredes de las tuberias. Las camaras de inspeccion permiten ver exactamente donde esta el problema y su naturaleza. El camion cuba combina agua a presion y succion, siendo imprescindible para arquetas, fosas septicas y atascos graves. La localizacion con sonda permite encontrar el punto exacto del atasco sin romper.",
        tips: [
          "Los metodos caseros funcionan para atascos leves y recientes",
          "Para atascos recurrentes, necesitas limpieza profesional",
          "La inspeccion con camara evita romper a ciegas"
        ]
      },
      {
        title: "Mantenimiento preventivo",
        content: "Prevenir es siempre mejor (y mas barato) que curar. Un mantenimiento sencillo puede evitar la mayoria de atascos. Vierte agua muy caliente (no hirviendo, que puede danar PVC) por los desagues semanalmente para disolver grasa. Limpia los sifones accesibles cada pocos meses: acumulan residuos y son causa frecuente de malos olores. En comunidades de vecinos, la limpieza anual de bajantes y arquetas previene problemas graves. Si tienes fosa septica, el vaciado periodico es imprescindible.",
        tips: [
          "Agua caliente por los desagues una vez a la semana",
          "Limpia el sifon del lavabo cada 3-4 meses",
          "Programa limpieza preventiva de arquetas anualmente"
        ]
      }
    ],
    commonMistakes: [
      "Tirar toallitas humedas por el WC (aunque digan 'desechables')",
      "Verter aceite de cocina por el fregadero",
      "Abusar de productos quimicos desatascadores",
      "Ignorar los desagues lentos hasta que se atascan del todo",
      "Usar objetos punzantes para desatascar y danar las tuberias",
      "No poner rejillas en duchas y lavabos",
      "Tirar restos de comida por el fregadero sin triturador"
    ],
    whenToCall: [
      "Si el WC no desagua o lo hace muy lentamente",
      "Si varios desagues estan afectados simultaneamente",
      "Si has intentado desatascar sin exito",
      "Si hay malos olores persistentes que no desaparecen",
      "Si el agua sale por otro desague cuando usas uno",
      "Si es un atasco en arqueta o zona comunitaria",
      "Para mantenimiento preventivo en viviendas o comunidades"
    ],
    costFactors: [
      "Ubicacion del atasco: accesible vs en bajante/arqueta",
      "Gravedad: obstruccion parcial vs total",
      "Metodo necesario: manual vs camion cuba",
      "Horario: laborable vs urgencia nocturna/festivo",
      "Necesidad de inspeccion con camara",
      "Reparaciones adicionales si hay tuberias danadas"
    ]
  },
  calderas: {
    title: "Guia Completa: Calderas, Calefaccion y Agua Caliente en el Hogar",
    introduction: "La caldera es el corazon de la climatizacion de tu hogar, proporcionando agua caliente sanitaria y calefaccion. Un equipo bien mantenido funciona de forma eficiente, segura y duradera. Esta guia te ayudara a entender como funciona tu caldera, como cuidarla y cuando necesitas la intervencion de un tecnico especializado.",
    sections: [
      {
        title: "Tipos de calderas y funcionamiento",
        content: "Existen varios tipos de calderas segun su tecnologia y combustible. Las calderas convencionales de gas son las mas comunes, aprovechando alrededor del 90% de la energia. Las calderas de condensacion recuperan el calor de los gases de escape, alcanzando rendimientos superiores al 100% (respecto al PCI) y ahorrando hasta un 30% de gas. Las calderas estancas toman el aire del exterior y expulsan los gases por el mismo conducto, siendo mas seguras. Los termos electricos son una alternativa para agua caliente donde no hay gas. Cada tipo tiene sus requisitos de instalacion, mantenimiento y seguridad.",
        tips: [
          "Si tu caldera tiene mas de 15 anos, considera cambiarla por una de condensacion",
          "Las calderas de condensacion necesitan evacuacion de condensados",
          "El tipo de caldera determina el tipo de mantenimiento necesario"
        ]
      },
      {
        title: "La revision anual obligatoria",
        content: "Por ley (Reglamento de Instalaciones Termicas en los Edificios - RITE), las calderas de gas deben ser revisadas anualmente por un tecnico autorizado. Esta revision no es un tramite: es fundamental para tu seguridad. Incluye: verificacion de estanqueidad de circuitos de gas, analisis de combustion para comprobar eficiencia, limpieza de quemadores e intercambiador, comprobacion del tiro y evacuacion de gases, revision de presostatos y elementos de seguridad, y verificacion del correcto funcionamiento general. El tecnico emitira un certificado que debes guardar.",
        tips: [
          "Programa la revision antes de la temporada de calefaccion",
          "Guarda todos los certificados de revision",
          "La revision anual mantiene la garantia del fabricante"
        ]
      },
      {
        title: "Sistema de calefaccion y radiadores",
        content: "El sistema de calefaccion incluye la caldera, el circuito de tuberias, los radiadores y los elementos de control (termostato, valvulas termostaticas). Para funcionar correctamente, el circuito debe mantener la presion adecuada (normalmente 1-1.5 bares en frio) y estar libre de aire. Los radiadores deben purgarse al inicio de cada temporada: el aire acumulado impide que calienten bien. Si un radiador esta frio arriba y caliente abajo, tiene aire; si esta caliente arriba y frio abajo, tiene lodos y necesita limpieza del circuito. El equilibrado del sistema asegura que todos los radiadores calienten por igual.",
        tips: [
          "Purga los radiadores cada inicio de temporada",
          "No cubras los radiadores: reduces su eficiencia",
          "Las valvulas termostaticas permiten ajustar temperatura por habitacion"
        ]
      },
      {
        title: "Eficiencia y ahorro energetico",
        content: "La calefaccion supone una parte importante de la factura energetica. Pequenos ajustes pueden suponer grandes ahorros. Cada grado de mas aumenta el consumo un 7%: ajusta el termostato a 20-21C durante el dia y 16-17C por la noche. Programa los horarios segun tu rutina: no tiene sentido calentar cuando no hay nadie. Ventila brevemente (5-10 minutos) pero de forma intensa: mejor que dejar una rendija abierta durante horas. Aisla puertas y ventanas para evitar perdidas. Y no descuides el mantenimiento: una caldera sucia puede consumir un 20% mas.",
        tips: [
          "El termostato es tu mejor aliado para ahorrar",
          "Ventila de golpe, no de forma continua",
          "Los burletes en puertas y ventanas tienen un coste minimo y gran efecto"
        ]
      }
    ],
    commonMistakes: [
      "Saltarse la revision anual obligatoria de calderas de gas",
      "Rellenar constantemente el circuito sin buscar la fuga",
      "Tapar rejillas de ventilacion donde esta instalada la caldera",
      "Subir el termostato a tope pensando que calentara mas rapido",
      "No purgar los radiadores cuando no calientan bien",
      "Ignorar ruidos anormales o caidas de presion",
      "Intentar reparaciones en circuitos de gas sin autorizacion"
    ],
    whenToCall: [
      "Para la revision anual obligatoria",
      "Si la caldera no enciende o se apaga sola",
      "Si no hay agua caliente o tarda mucho en llegar",
      "Si hueles a gas (en este caso, ventila, sal y llama desde fuera)",
      "Si la caldera hace ruidos anormales (golpes, silbidos)",
      "Si la presion baja constantemente y hay que rellenar",
      "Si los radiadores no calientan uniformemente"
    ],
    costFactors: [
      "Tipo de intervencion: revision vs reparacion vs sustitucion",
      "Marca y modelo de caldera (disponibilidad de repuestos)",
      "Urgencia: cita programada vs emergencia",
      "Piezas necesarias: quemadores, intercambiadores, valvulas",
      "Antigueedad del equipo (calderas viejas pueden necesitar mas trabajo)",
      "Accesibilidad de la instalacion"
    ]
  }
}

interface ExpertGuideSectionProps {
  professionId: string
  cityName: string
  professionName: string
}

export function ExpertGuideSection({ professionId, cityName, professionName }: ExpertGuideSectionProps) {
  const [openSection, setOpenSection] = useState<number | null>(0)
  const guide = EXPERT_GUIDES[professionId] || EXPERT_GUIDES.electricista
  const phoneNumber = "936946639"

  const handleCall = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "conversion", {
        send_to: "AW-16741652529/YiAVCI7M1NkbELGwha8-",
        value: 20.0,
        currency: "EUR",
      })
    }
  }

  return (
    <section className="py-16 bg-muted/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Guia del experto</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {guide.title}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {guide.introduction}
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-4 mb-12">
          {guide.sections.map((section, index) => (
            <div 
              key={index}
              className="rounded-2xl border border-border bg-background overflow-hidden"
            >
              <button
                onClick={() => setOpenSection(openSection === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openSection === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openSection === index && (
                <div className="px-6 pb-6 space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                  
                  {section.tips && section.tips.length > 0 && (
                    <div className="bg-muted/30 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-foreground" />
                        <span className="font-semibold text-foreground">Consejos practicos</span>
                      </div>
                      <ul className="space-y-2">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Three Column Info Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Common Mistakes */}
          <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-bold text-foreground">Errores comunes a evitar</h3>
            </div>
            <ul className="space-y-3">
              {guide.commonMistakes.slice(0, 5).map((mistake, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* When to Call */}
          <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground">Cuando llamar a un profesional</h3>
            </div>
            <ul className="space-y-3">
              {guide.whenToCall.slice(0, 5).map((reason, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cost Factors */}
          <div className="p-6 rounded-2xl bg-muted/30 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                <Euro className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground">Factores que afectan al precio</h3>
            </div>
            <ul className="space-y-3">
              {guide.costFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-3xl bg-foreground text-white">
          <h3 className="text-2xl font-bold mb-2">
            ¿Necesitas un {professionName.toLowerCase()} en {cityName}?
          </h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Nuestros profesionales certificados estan disponibles 24/7 para ayudarte con cualquier problema. Presupuesto sin compromiso.
          </p>
          <a
            href={`tel:+34${phoneNumber}`}
            onClick={handleCall}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground font-bold rounded-xl hover:bg-white/90 transition-all"
          >
            <Phone className="w-5 h-5" />
            <span>Llamar ahora - 936 946 639</span>
          </a>
        </div>
      </div>
    </section>
  )
}
