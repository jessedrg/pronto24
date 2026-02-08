import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ArrowRight, Wrench, AlertTriangle, Clock, Euro, Phone, Shield, CheckCircle2, Star, BadgeCheck, HelpCircle, Lightbulb, Timer, Navigation } from "lucide-react"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { CallButton, LiveBadge } from "@/components/hero-client-parts"
import { GuaranteeSection } from "@/components/guarantee-section"
import { PROFESSIONS, PROBLEMS, getCityDisplayName, getNearbyCities } from "@/lib/seo-data"
import { generateTestimonials } from "@/lib/content-generator"

export const dynamicParams = true
export const revalidate = 604800

const VALID_PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

// Detailed problem descriptions for unique SEO content
const PROBLEM_DETAILS: Record<string, Record<string, { longDescription: string; causes: string[]; solutions: string[]; urgencyLevel: string; estimatedTime: string; priceRange: string; whileYouWait: string[]; preventionTips: string[]; faqs: { q: string; a: string }[] }>> = {
  electricista: {
    "apagon": {
      longDescription: "Un apagon total o parcial puede deberse a multiples causas, desde un simple salto del magnetotermico hasta un fallo grave en la instalacion electrica. Es fundamental actuar con rapidez ya que quedarse sin electricidad afecta a la seguridad del hogar, la conservacion de alimentos en el frigorifico y el funcionamiento de sistemas esenciales como alarmas o equipos medicos.",
      causes: ["Sobrecarga en el circuito electrico", "Cortocircuito en algun punto de la instalacion", "Fallo del diferencial o magnetotermico", "Averia en la acometida o contador", "Corte del suministro por la compania electrica"],
      solutions: ["Diagnostico completo del cuadro electrico", "Localizacion del punto de fallo", "Reparacion o sustitucion de elementos danados", "Verificacion de toda la instalacion", "Pruebas de seguridad finales"],
      urgencyLevel: "Alta - Servicio prioritario",
      estimatedTime: "30-90 minutos",
      priceRange: "60-200",
      preventionTips: ["Revisa el cuadro electrico una vez al ano", "No sobrecargues los enchufes con regletas", "Sustituye cables antiguos de mas de 20 anos", "Instala protecciones contra sobretensiones"],
      whileYouWait: ["Comprueba si tus vecinos tambien estan sin luz (descartaria un corte general)", "Intenta subir los magnetotermicos del cuadro electrico uno por uno", "Si salta al subir uno concreto, deja ese bajado y sube el resto", "No manipules cables sueltos ni intentes reparaciones por tu cuenta"],
      faqs: [
        { q: "Cuanto cuesta reparar un apagon en casa?", a: "El precio medio de reparar un apagon oscila entre 60 y 200 euros, dependiendo de la causa. Un simple salto de magnetotermico puede costar unos 60 euros, mientras que una averia mas compleja puede llegar a los 200 euros. Siempre damos presupuesto cerrado antes de empezar." },
        { q: "Cuanto tarda un electricista en solucionar un apagon?", a: "Normalmente entre 30 y 90 minutos desde que llega el tecnico. El diagnostico suele ser rapido (10-15 min), y la reparacion depende de la complejidad del problema." },
        { q: "Puede un apagon danar mis electrodomesticos?", a: "Si, los cortes de luz bruscos pueden danar electrodomesticos sensibles como ordenadores, televisores o frigorificos. Recomendamos usar regletas con proteccion contra sobretensiones." }
      ]
    },
    "cortocircuito": {
      longDescription: "Un cortocircuito ocurre cuando la corriente electrica toma un camino no previsto, generalmente por un cable danado o una conexion defectuosa. Es una situacion potencialmente peligrosa que puede provocar incendios si no se soluciona rapidamente.",
      causes: ["Cables pelados o con aislamiento danado", "Enchufes en mal estado", "Humedad en la instalacion", "Electrodomesticos defectuosos", "Conexiones sueltas en cajas de empalme"],
      solutions: ["Localizacion exacta del cortocircuito", "Reparacion del cableado danado", "Sustitucion de elementos defectuosos", "Revision preventiva de la instalacion"],
      urgencyLevel: "Muy alta - Riesgo de incendio",
      estimatedTime: "45-120 minutos",
      priceRange: "80-250",
      preventionTips: ["Inspecciona enchufes e interruptores regularmente", "Nunca manipules la instalacion sin desconectar la corriente", "Sustituye enchufes que presenten marcas de quemado", "Contrata una revision electrica profesional cada 5 anos"],
      whileYouWait: ["Baja inmediatamente el interruptor general del cuadro electrico", "No toques ningun cable ni enchufe que presente signos de quemado", "Si hay olor a quemado, ventila la zona afectada", "No intentes reconectar la luz hasta que llegue el electricista"],
      faqs: [
        { q: "Es peligroso un cortocircuito?", a: "Si, un cortocircuito puede provocar incendios electricos si no se soluciona rapidamente. Es importante desconectar el circuito afectado y llamar a un electricista profesional inmediatamente." },
        { q: "Como se que tengo un cortocircuito?", a: "Las senales mas comunes son: salto repetido de los automaticos, olor a quemado, chispas en enchufes, marcas oscuras en paredes cerca de puntos electricos, o calentamiento excesivo de cables." }
      ]
    },
    "olor-quemado": {
      longDescription: "El olor a quemado en la instalacion electrica es una senal de alerta grave que indica sobrecalentamiento. Puede provenir de cables, enchufes, interruptores o el cuadro electrico. Nunca debe ignorarse ya que es precursor habitual de incendios electricos.",
      causes: ["Conexiones flojas que generan arco electrico", "Cables subdimensionados para la carga", "Enchufes sobrecargados", "Componentes del cuadro deteriorados"],
      solutions: ["Desconexion inmediata de la zona afectada", "Localizacion del punto de sobrecalentamiento", "Sustitucion de cables y conexiones", "Revision integral de la instalacion"],
      urgencyLevel: "Critica - Emergencia",
      estimatedTime: "60-180 minutos",
      priceRange: "100-350",
      preventionTips: ["No uses adaptadores multiples ni regletas sobrecargadas", "Reemplaza enchufes que se calientan al usarlos", "Contrata un electricista si notas olores inusuales", "Asegurate de que tu instalacion cumple la normativa vigente"],
      whileYouWait: ["Corta la electricidad desde el interruptor general inmediatamente", "Ventila bien toda la vivienda abriendo ventanas", "Si ves humo o llamas, llama al 112 antes que al electricista", "No uses agua para apagar fuego electrico, usa un extintor de CO2"],
      faqs: [
        { q: "Que hago si huelo a quemado electrico en casa?", a: "Lo primero es cortar la electricidad desde el cuadro general. Ventila la zona y no intentes localizar el origen manipulando cables. Llama a un electricista de urgencia inmediatamente." },
        { q: "Puede arder mi casa por un problema electrico?", a: "Si, las averias electricas son una de las principales causas de incendios domesticos. Un cable sobrecalentado puede alcanzar temperaturas superiores a 300 grados, suficiente para incendiar materiales cercanos." }
      ]
    },
    "diferencial-salta": {
      longDescription: "Cuando el diferencial salta repetidamente, indica que existe una fuga de corriente en algun punto de la instalacion. El diferencial es un dispositivo de seguridad vital que te protege de electrocuciones, por lo que su salto frecuente no debe ignorarse.",
      causes: ["Electrodomestico con derivacion a tierra", "Humedad en enchufes o cajas", "Cable con aislamiento deteriorado", "Diferencial antiguo o defectuoso"],
      solutions: ["Identificacion del circuito con fuga", "Pruebas de aislamiento por circuito", "Reparacion del punto de fuga", "Sustitucion del diferencial si esta defectuoso"],
      urgencyLevel: "Alta - Riesgo electrico",
      estimatedTime: "30-120 minutos",
      priceRange: "60-200",
      preventionTips: ["Pulsa el boton de prueba del diferencial una vez al mes", "No uses electrodomesticos con el cable danado", "Evita la humedad cerca de instalaciones electricas", "Sustituye diferenciales de mas de 10 anos"],
      whileYouWait: ["Desenchufa todos los electrodomesticos e intenta subir el diferencial", "Si se mantiene, el problema esta en la instalacion fija", "Si salta al enchufar uno concreto, ese electrodomestico tiene fuga", "No puentees nunca el diferencial: es tu proteccion contra electrocucion"],
      faqs: [
        { q: "Por que salta el diferencial de mi casa?", a: "El diferencial salta cuando detecta una fuga de corriente. Las causas mas comunes son: un electrodomestico con derivacion, humedad en la instalacion, o un cable con el aislamiento deteriorado." },
        { q: "Puedo puentear el diferencial?", a: "Nunca se debe puentear el diferencial. Es el dispositivo que te protege de electrocuciones. Si salta frecuentemente, hay un problema real que debe ser diagnosticado y reparado por un profesional." }
      ]
    },
  },
  fontanero: {
    "fuga-agua": {
      longDescription: "Una fuga de agua, visible u oculta, puede causar danos estructurales importantes si no se soluciona a tiempo. El agua filtrandose puede danar paredes, suelos, techos del vecino de abajo, y provocar la aparicion de moho perjudicial para la salud.",
      causes: ["Tuberias corroidas o deterioradas por antiguedad", "Juntas y conexiones desgastadas", "Congelacion de tuberias en invierno", "Presion excesiva del agua", "Movimientos estructurales del edificio"],
      solutions: ["Deteccion exacta con equipos de ultrasonidos", "Reparacion o sustitucion del tramo afectado", "Sellado profesional de juntas", "Prueba de presion posterior", "Verificacion de toda la linea"],
      urgencyLevel: "Muy alta - Danos progresivos",
      estimatedTime: "30-120 minutos",
      priceRange: "60-250",
      preventionTips: ["Revisa periodicamente las conexiones de grifos y electrodomesticos", "No uses productos quimicos agresivos en las tuberias", "En invierno, protege las tuberias exteriores contra heladas", "Cierra la llave de paso si te vas de vacaciones"],
      whileYouWait: ["Cierra la llave de paso general del agua inmediatamente", "Si la fuga es en un punto concreto, cierra solo la llave de esa zona", "Pon cubos o toallas para recoger el agua y minimizar danos", "Haz fotos de los danos para el seguro"],
      faqs: [
        { q: "Cuanto cuesta reparar una fuga de agua?", a: "El precio varia entre 60 y 250 euros dependiendo de la ubicacion y gravedad de la fuga. Una fuga visible en un grifo es mas economica que una fuga oculta en pared que requiere deteccion por ultrasonidos." },
        { q: "Cubre el seguro una fuga de agua?", a: "La mayoria de seguros del hogar cubren los danos causados por fugas de agua. Recomendamos documentar todo con fotos y guardar la factura del fontanero para presentar al seguro." }
      ]
    },
    "tuberia-rota": {
      longDescription: "Una tuberia rota es una emergencia que requiere atencion inmediata. La cantidad de agua que puede escapar de una rotura es enorme y los danos se multiplican con cada minuto que pasa. Es fundamental cerrar la llave de paso inmediatamente.",
      causes: ["Antiguedad y corrosion del material", "Heladas que congelan el agua interior", "Golpes durante obras o reformas", "Presion excesiva en la red"],
      solutions: ["Corte de agua inmediato", "Sustitucion del tramo roto", "Verificacion de toda la linea", "Restablecimiento del servicio"],
      urgencyLevel: "Critica - Emergencia",
      estimatedTime: "60-180 minutos",
      priceRange: "100-400",
      preventionTips: ["Sustituye tuberias de plomo o hierro antiguas por cobre o PVC", "Mantener la calefaccion minima en invierno para evitar congelaciones", "No cuelgues peso excesivo de las tuberias", "Haz una revision de fontaneria cada 5 anos"],
      whileYouWait: ["Cierra la llave de paso general lo antes posible", "Recoge el agua con cubos y fregonas", "Desconecta aparatos electricos de la zona afectada", "Avisa a vecinos si el agua puede filtrarse a pisos inferiores"],
      faqs: [
        { q: "Cuanto tiempo se tarda en reparar una tuberia rota?", a: "Depende de la ubicacion. Si la tuberia esta accesible, entre 1-2 horas. Si esta empotrada en pared o suelo, puede llevar 3-4 horas incluyendo la obra necesaria." },
        { q: "Hay que romper la pared para reparar una tuberia?", a: "No siempre. Los fontaneros modernos usan tecnicas de reparacion minimamente invasivas. Solo se rompe la zona estrictamente necesaria para acceder a la tuberia danada." }
      ]
    },
    "inundacion": {
      longDescription: "Una inundacion domestica puede tener consecuencias devastadoras: danos en suelos, muebles, electrodomesticos, y afectar a viviendas vecinas. La actuacion rapida es clave para minimizar los danos materiales y facilitar la reclamacion al seguro.",
      causes: ["Rotura de tuberia principal", "Desbordamiento de sanitarios", "Fallo de electrodomesticos (lavadora, lavavajillas)", "Lluvias intensas y mal drenaje"],
      solutions: ["Corte de suministro de agua", "Extraccion del agua acumulada", "Reparacion de la causa", "Documentacion para el seguro"],
      urgencyLevel: "Critica - Emergencia maxima",
      estimatedTime: "60-240 minutos",
      priceRange: "150-500",
      preventionTips: ["Instala detectores de fuga de agua en zonas de riesgo", "Revisa las conexiones de lavadora y lavavajillas periodicamente", "Asegurate de que los desagues estan limpios", "Conoce donde esta la llave de paso general"],
      whileYouWait: ["Corta el agua y la electricidad inmediatamente", "Retira objetos de valor del suelo", "Empieza a sacar agua con cubos y fregonas", "Documenta todo con fotos y video para el seguro"],
      faqs: [
        { q: "Que hago si mi casa se esta inundando?", a: "Lo primero: cierra la llave de paso del agua y el cuadro electrico. Retira objetos de valor y empieza a achicas agua. Llama inmediatamente a un fontanero de urgencia." }
      ]
    },
  },
  cerrajero: {
    "puerta-bloqueada": {
      longDescription: "Quedarse con la puerta bloqueada es una situacion estresante que puede ocurrir en el peor momento. Ya sea porque se ha atascado el mecanismo, se ha roto la llave o simplemente la has olvidado dentro, nuestros cerrajeros pueden abrirla sin danos en la mayoria de casos.",
      causes: ["Cerradura agarrotada por falta de mantenimiento", "Llave deformada o desgastada", "Bombin deteriorado", "Puerta desajustada por dilatacion o hundimiento"],
      solutions: ["Apertura no destructiva con tecnicas profesionales", "Lubricacion y ajuste del mecanismo", "Cambio de bombin si es necesario", "Ajuste de puerta y marco"],
      urgencyLevel: "Alta - No puedes acceder a tu hogar",
      estimatedTime: "10-45 minutos",
      priceRange: "60-150",
      preventionTips: ["Lubrica la cerradura con grafito dos veces al ano", "No fuerces la llave si notas resistencia", "Ten una copia de la llave con un vecino de confianza", "Revisa que la puerta cierra correctamente y no roza"],
      whileYouWait: ["No fuerces la llave ni la cerradura, podrias empeorar el problema", "Comprueba si hay alguna ventana o puerta trasera abierta", "No intentes abrir la puerta con tarjetas o herramientas caseras", "Espera al cerrajero en un lugar seguro cerca de tu puerta"],
      faqs: [
        { q: "Cuanto cuesta abrir una puerta bloqueada?", a: "El precio de apertura oscila entre 60 y 150 euros. La variacion depende del tipo de cerradura, si se puede abrir sin danos o si requiere cambio de bombin. Siempre informamos del precio antes de empezar." },
        { q: "El cerrajero puede abrir sin romper la cerradura?", a: "En la mayoria de los casos si. Nuestros cerrajeros dominan tecnicas de apertura no destructiva que permiten abrir la puerta sin causar ningun dano a la cerradura ni a la puerta." }
      ]
    },
    "cerradura-rota": {
      longDescription: "Una cerradura rota compromete la seguridad de tu hogar. Ya sea por un intento de robo, desgaste natural o un fallo mecanico, es imprescindible repararla o sustituirla cuanto antes para proteger tu vivienda y tus pertenencias.",
      causes: ["Intento de robo o forzamiento", "Desgaste por uso prolongado", "Llave forzada o incorrecta", "Materiales de baja calidad"],
      solutions: ["Evaluacion del dano", "Reparacion si es viable", "Sustitucion por cerradura de mayor seguridad", "Instalacion de escudo protector"],
      urgencyLevel: "Muy alta - Seguridad comprometida",
      estimatedTime: "20-60 minutos",
      priceRange: "80-250",
      preventionTips: ["No uses copias de llaves de mala calidad", "Instala un escudo protector antibumping", "Cambia la cerradura si lleva mas de 10 anos", "Refuerza la puerta con cerrojo adicional si vives en planta baja"],
      whileYouWait: ["Si fue un intento de robo, llama primero a la policia (091 o 112)", "No toques la cerradura para no alterar posibles pruebas", "Si puedes cerrar la puerta temporalmente, hazlo con algun objeto pesado", "Avisa a un vecino de confianza por seguridad"],
      faqs: [
        { q: "Que cerradura debo poner si me han intentado robar?", a: "Recomendamos cerraduras de seguridad antibumping y antitaladro, con escudo protector BKS o similar. Un bombin de seguridad de calidad cuesta entre 80-150 euros y ofrece una proteccion muy superior." }
      ]
    },
    "llave-dentro": {
      longDescription: "Dejarse las llaves dentro de casa es mas comun de lo que parece. Es una situacion que genera ansiedad pero que tiene solucion rapida con un cerrajero profesional que pueda abrir la puerta sin causar ningun dano.",
      causes: ["Despiste al salir con prisa", "Puerta que se cierra con corriente de aire", "Ninos que cierran desde dentro", "Olvido al sacar la basura o ir al buzon"],
      solutions: ["Apertura sin danos de la cerradura", "Recuperacion de las llaves", "Recomendacion de cerradura antipanico", "Copia de llaves preventiva"],
      urgencyLevel: "Alta - Acceso inmediato necesario",
      estimatedTime: "10-30 minutos",
      priceRange: "50-120",
      preventionTips: ["Deja una copia de la llave a un vecino o familiar cercano", "Instala una cerradura que no se cierre automaticamente", "Lleva siempre una llave de repuesto en el coche o trabajo", "Considera instalar una cerradura inteligente con codigo"],
      whileYouWait: ["Comprueba si dejaste alguna ventana abierta (no trepes, pide al cerrajero)", "Busca si algun familiar o vecino tiene copia de la llave", "No intentes forzar la puerta, causaras danos innecesarios", "Espera tranquilamente, el cerrajero llegara enseguida"],
      faqs: [
        { q: "Se puede abrir una puerta sin llave y sin danos?", a: "Si, en la gran mayoria de casos nuestros cerrajeros pueden abrir la puerta sin causar ningun dano usando herramientas especializadas. Solo en cerraduras de muy alta seguridad puede ser necesario taladrar el bombin." }
      ]
    },
  },
  desatascos: {
    "wc-atascado": {
      longDescription: "Un WC atascado es uno de los problemas domesticos mas urgentes e incomodos. Si es el unico bano de la vivienda, la urgencia es maxima. Los atascos de inodoro pueden deberse a multiples causas y a menudo requieren intervencion profesional.",
      causes: ["Exceso de papel higienico", "Toallitas humedas (nunca son desechables)", "Objetos caidos accidentalmente", "Acumulacion de cal en tuberias antiguas", "Obstruccion en el bajante comunitario"],
      solutions: ["Desatasco mecanico profesional", "Hidrolimpieza si es necesario", "Inspeccion con camara", "Limpieza preventiva del tramo"],
      urgencyLevel: "Muy alta - Afecta habitabilidad",
      estimatedTime: "30-90 minutos",
      priceRange: "60-150",
      preventionTips: ["Nunca tires toallitas humedas por el inodoro", "Usa cantidades razonables de papel higienico", "No uses el WC como papelera", "Haz una limpieza preventiva de tuberias una vez al ano"],
      whileYouWait: ["No tires mas de la cadena, podrias provocar un desbordamiento", "No eches productos quimicos, pueden danar las tuberias", "Si se desborda, corta la llave de paso del WC", "Pon toallas viejas alrededor del inodoro por precaucion"],
      faqs: [
        { q: "Puedo desatascar el WC yo mismo?", a: "Puedes intentar con un desatascador de ventosa. Si no funciona tras 2-3 intentos, no insistas. Los productos quimicos pueden danar las tuberias y los metodos caseros con alambre pueden rayar la ceramica." },
        { q: "Cuanto cuesta desatascar un inodoro?", a: "El desatasco basico de WC cuesta entre 60 y 100 euros. Si requiere hidrolimpieza o el problema esta en el bajante, puede llegar a 150 euros. Siempre informamos del precio antes de actuar." }
      ]
    },
    "fregadero-atascado": {
      longDescription: "Un fregadero atascado impide el uso normal de la cocina y puede generar malos olores y problemas de higiene. La causa mas comun es la acumulacion de grasa que solidifica dentro de las tuberias y atrapa otros residuos.",
      causes: ["Grasa acumulada en las tuberias", "Restos de comida", "Jabon solidificado", "Sifon obstruido", "Problema en el bajante"],
      solutions: ["Limpieza del sifon", "Desatasco mecanico", "Hidrolimpieza de tuberias", "Tratamiento antigrasas"],
      urgencyLevel: "Media-Alta",
      estimatedTime: "20-60 minutos",
      priceRange: "50-100",
      preventionTips: ["Nunca viertas grasa liquida por el fregadero", "Usa un filtro en el desague para atrapar restos solidos", "Echa agua hirviendo por el desague una vez a la semana", "Limpia el sifon cada 6 meses"],
      whileYouWait: ["No eches mas agua al fregadero", "Prueba a verter agua muy caliente con un chorro de lavavajillas", "Si tienes acceso al sifon (debajo), puedes intentar desmontarlo", "Coloca un cubo debajo si desmontas el sifon"],
      faqs: [
        { q: "Como evitar que el fregadero se atasque?", a: "Nunca viertas grasa liquida por el fregadero (dejala solidificar y tirala a la basura). Usa un filtro en el desague, y una vez al mes echa agua hirviendo con un chorro de vinagre." }
      ]
    },
  },
  calderas: {
    "sin-agua-caliente": {
      longDescription: "Quedarse sin agua caliente, especialmente en invierno, afecta seriamente al confort del hogar. La causa puede estar en la caldera, en el circuito de agua caliente sanitaria, o en el propio termo o calentador.",
      causes: ["Fallo en la caldera (piloto apagado, sensor defectuoso)", "Termostato mal configurado o roto", "Vaso de expansion deteriorado", "Falta de presion en el circuito", "Acumulacion de cal en el intercambiador"],
      solutions: ["Diagnostico completo de la caldera", "Reparacion del componente averiado", "Ajuste de presion y temperatura", "Descalcificacion si es necesario"],
      urgencyLevel: "Alta - Especialmente en invierno",
      estimatedTime: "30-120 minutos",
      priceRange: "80-300",
      preventionTips: ["Haz la revision obligatoria de la caldera cada 2 anos (RITE)", "Mantener la presion entre 1 y 1.5 bar", "No apagues la caldera por completo en invierno", "Purga los radiadores al inicio de cada temporada de frio"],
      whileYouWait: ["Comprueba que la caldera esta encendida y no muestra codigos de error", "Verifica que la presion del manometro esta entre 1 y 1.5 bar", "Si la presion es baja, busca la llave de llenado y sube la presion lentamente", "Comprueba que la llave del gas no esta cerrada"],
      faqs: [
        { q: "Por que mi caldera no da agua caliente?", a: "Las causas mas frecuentes son: presion baja en el circuito, fallo del sensor de temperatura, vaso de expansion roto, o acumulacion de cal. Un tecnico puede diagnosticarlo en minutos." }
      ]
    },
    "caldera-no-enciende": {
      longDescription: "Cuando la caldera no enciende, el diagnostico correcto es fundamental. Puede ser algo tan simple como un fallo del piloto o tan complejo como una placa electronica averiada. Un tecnico cualificado puede determinar la causa rapidamente.",
      causes: ["Piloto apagado", "Fallo en la valvula de gas", "Placa electronica averiada", "Sensor de llama sucio", "Presion de gas insuficiente"],
      solutions: ["Revision completa del sistema", "Limpieza de sensores y quemadores", "Sustitucion de piezas defectuosas", "Verificacion de seguridades"],
      urgencyLevel: "Alta",
      estimatedTime: "30-90 minutos",
      priceRange: "80-300",
      preventionTips: ["Haz el mantenimiento anual obligatorio sin falta", "Limpia el exterior de la caldera y mantener ventilada la zona", "No tapes ni obstruyas las rejillas de ventilacion", "Anota los codigos de error cuando aparezcan"],
      whileYouWait: ["Comprueba que hay suministro de gas (enciende un fuego de cocina)", "Verifica que el enchufe de la caldera tiene corriente", "Mira si la pantalla muestra algun codigo de error", "Intenta reiniciar la caldera apagandola y encendiendola"],
      faqs: [
        { q: "Cuanto cuesta reparar una caldera que no enciende?", a: "Depende de la averia. Una limpieza de sensores puede costar 80 euros, mientras que cambiar la placa electronica puede llegar a 300 euros. Siempre damos presupuesto cerrado antes de reparar." }
      ]
    },
    "fuga-gas": {
      longDescription: "Una posible fuga de gas es la emergencia mas seria que puede ocurrir con una caldera. Requiere actuacion inmediata siguiendo un protocolo de seguridad estricto. Nunca intentes localizar la fuga tu mismo.",
      causes: ["Juntas deterioradas en conexiones de gas", "Tubo flexible caducado o danado", "Llave de gas defectuosa", "Caldera con fuga interna"],
      solutions: ["Ventilacion inmediata del espacio", "Cierre de llave de gas", "Deteccion profesional de la fuga", "Reparacion con materiales homologados"],
      urgencyLevel: "Critica - Emergencia de seguridad",
      estimatedTime: "30-90 minutos",
      priceRange: "80-200",
      preventionTips: ["Revisa la fecha de caducidad del tubo flexible del gas", "Instala un detector de gas en la cocina", "No modifiques nunca la instalacion de gas tu mismo", "Haz la revision obligatoria cada 5 anos"],
      whileYouWait: ["Cierra la llave de paso del gas inmediatamente", "Abre todas las ventanas de la vivienda para ventilar", "NO enciendas ni apagues ninguna luz ni aparato electrico", "Sal de la vivienda y llama desde fuera al 112 y despues a nosotros"],
      faqs: [
        { q: "Que hago si huelo a gas en casa?", a: "Es una emergencia. Cierra la llave del gas, abre ventanas, NO toques interruptores electricos (ni para encender ni apagar), sal de casa y llama al 112 desde fuera. Despues llama a un tecnico de calderas." },
        { q: "Es peligrosa una fuga de gas?", a: "Si, una fuga de gas es potencialmente mortal. El gas natural puede provocar explosiones si se acumula en un espacio cerrado y hay una chispa. Tambien puede causar asfixia. Actua siempre con maxima urgencia." }
      ]
    },
  },
}

interface PageProps {
  params: Promise<{ profession: string; problem: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: professionId, problem: problemId, city: citySlug } = await params
  if (!VALID_PROFESSIONS.includes(professionId)) return { title: "No encontrado" }
  const profession = PROFESSIONS.find((p) => p.id === professionId)
  if (!profession) return {}
  const problems = PROBLEMS[professionId as keyof typeof PROBLEMS] || []
  const problem = problems.find((p) => p.id === problemId)
  if (!problem) return {}
  const cityName = getCityDisplayName(citySlug)
  const details = PROBLEM_DETAILS[professionId]?.[problemId]

  const title = `${problem.name} en ${cityName} - ${profession.name} Urgente 24h | 936 946 639`
  const description = details
    ? `${details.longDescription.slice(0, 140)}... ${profession.namePlural} urgentes en ${cityName}. Precio: ${details.priceRange} EUR. Llegamos en 10 min. Llama: 936 946 639.`
    : `${problem.description} en ${cityName}? Solucionamos ${problem.name.toLowerCase()} en 10 minutos. ${profession.namePlural} 24h. Llama: 936 946 639.`

  return {
    title,
    description,
    keywords: `${problem.name.toLowerCase()} ${cityName}, ${profession.id} ${problem.id} ${cityName}, ${problem.id} urgente ${cityName}, solucionar ${problem.name.toLowerCase()} ${cityName}, precio ${problem.name.toLowerCase()} ${cityName}, cuanto cuesta ${problem.name.toLowerCase()}`,
    alternates: {
      canonical: `https://www.pronto-24.com/problema/${professionId}/${problemId}/${citySlug}/`,
    },
    openGraph: {
      title: `${problem.name} en ${cityName} - Solucion Urgente en 10 min`,
      description: `Solucionamos ${problem.name.toLowerCase()} en ${cityName}. ${profession.namePlural} disponibles 24/7. ${details ? `Desde ${details.priceRange.split('-')[0]} EUR.` : ''} Llama: 936 946 639`,
      type: "website",
    },
    other: {
      "geo.region": "ES",
      "geo.placename": cityName,
      "date": new Date().toISOString().split("T")[0],
    },
  }
}

export default async function ProblemCityPage({ params }: PageProps) {
  const { profession: professionId, problem: problemId, city: citySlug } = await params
  if (!VALID_PROFESSIONS.includes(professionId)) notFound()
  const profession = PROFESSIONS.find((p) => p.id === professionId)
  if (!profession) notFound()
  const problems = PROBLEMS[professionId as keyof typeof PROBLEMS] || []
  const problem = problems.find((p) => p.id === problemId)
  if (!problem) notFound()

  const cityName = getCityDisplayName(citySlug)
  const nearbyCities = getNearbyCities(citySlug, 8)
  const otherProblems = problems.filter(p => p.id !== problemId)
  const otherProfessions = PROFESSIONS.filter(p => p.id !== professionId)
  const details = PROBLEM_DETAILS[professionId]?.[problemId]
  const reviews = generateTestimonials(citySlug, cityName, profession.name)

  const phoneNumber = "936946639"
  const phoneFormatted = "936 946 639"

  // Schema.org - Service
  const problemSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${problem.name} en ${cityName} - ${profession.name}`,
    "description": details?.longDescription || `Servicio de ${profession.name.toLowerCase()} para ${problem.name.toLowerCase()} en ${cityName}. Disponible 24/7.`,
    "provider": { "@type": "LocalBusiness", "name": "pronto-24.com", "telephone": "+34936946639" },
    "areaServed": { "@type": "City", "name": cityName },
    "serviceType": `${profession.name} - ${problem.name}`,
    ...(details && {
      "offers": {
        "@type": "Offer",
        "priceCurrency": "EUR",
        "price": details.priceRange.split("-")[0],
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": details.priceRange.split("-")[0],
          "maxPrice": details.priceRange.split("-")[1],
          "priceCurrency": "EUR"
        }
      }
    })
  }

  // Schema.org - BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.pronto-24.com/" },
      { "@type": "ListItem", "position": 2, "name": profession.name, "item": `https://www.pronto-24.com/${profession.id}/` },
      { "@type": "ListItem", "position": 3, "name": `${profession.name} en ${cityName}`, "item": `https://www.pronto-24.com/${profession.id}/${citySlug}/` },
      { "@type": "ListItem", "position": 4, "name": `${problem.name} en ${cityName}` },
    ]
  }

  // Schema.org - HowTo
  const howToSchema = details ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Como solucionamos ${problem.name.toLowerCase()} en ${cityName}`,
    "description": details.longDescription,
    "totalTime": `PT${details.estimatedTime.split("-")[1]?.replace(" minutos", "") || "90"}M`,
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "EUR", "value": details.priceRange.split("-")[0] },
    "step": details.solutions.map((sol, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": `Paso ${i + 1}`,
      "text": sol
    }))
  } : null

  // Schema.org - FAQPage
  const faqSchema = details?.faqs && details.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": details.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  } : null

  return (
    <div className="min-h-screen flex flex-col bg-background pt-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(problemSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <Breadcrumbs
        items={[
          { label: profession.name, href: `/${profession.id}/` },
          { label: `${profession.name} en ${cityName}`, href: `/${profession.id}/${citySlug}/` },
          { label: problem.name },
        ]}
      />

      <main className="flex-1">
        {/* Problem-Specific Hero */}
        <section className="relative py-12 md:py-20 overflow-hidden" aria-labelledby="problem-hero-title">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-transparent to-foreground/5" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="space-y-6">
                {/* Urgency Badge */}
                {details && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{details.urgencyLevel}</span>
                  </div>
                )}

                <h1 id="problem-hero-title" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] text-balance">
                  <span className="text-foreground">{problem.name} en {cityName}</span>
                  <span className="block text-foreground/70 mt-2 text-2xl sm:text-3xl lg:text-4xl">
                    {profession.name} urgente - Llegamos en 10 min
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  {details
                    ? details.longDescription.slice(0, 200) + '...'
                    : `Solucionamos ${problem.name.toLowerCase()} en ${cityName}. ${profession.namePlural} profesionales disponibles 24/7. Llegamos en 10 minutos.`
                  }
                </p>

                {/* Quick Info Badges */}
                {details && (
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 border border-border text-sm">
                      <Timer className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">{details.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 border border-border text-sm">
                      <Euro className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">{details.priceRange} EUR</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 border border-border text-sm">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">Garantia incluida</span>
                    </div>
                  </div>
                )}

                <CallButton phoneNumber={phoneNumber} phoneFormatted={phoneFormatted} />
              </div>

              {/* Right - Image */}
              <div className="relative max-w-sm sm:max-w-md mx-auto lg:max-w-none">
                <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-2xl">
                  <Image
                    src="/professional-service-technician-worker-with-tools-.jpg"
                    alt={`${profession.name} solucionando ${problem.name.toLowerCase()} en ${cityName}`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-background/95 backdrop-blur-sm border border-border">
                      <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0 text-2xl">
                        {problem.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">{problem.name}</div>
                        <div className="text-sm text-muted-foreground">Solucion urgente en {cityName}</div>
                      </div>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Detail Content - UNIQUE per problem */}
        {details && (
          <article className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Causes + Solutions Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-2xl border border-destructive/20 bg-destructive/5">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Causas de {problem.name.toLowerCase()}
                  </h2>
                  <ul className="space-y-3">
                    {details.causes.map((cause, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl border border-border bg-muted/20">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-foreground" />
                    Como lo solucionamos
                  </h2>
                  <ol className="space-y-3">
                    {details.solutions.map((sol, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                        {sol}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Quick Facts Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                  <Clock className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Urgencia</div>
                  <div className="font-bold text-foreground text-sm mt-1">{details.urgencyLevel.split(' - ')[0]}</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                  <Timer className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Tiempo estimado</div>
                  <div className="font-bold text-foreground text-sm mt-1">{details.estimatedTime}</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                  <Euro className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Precio orientativo</div>
                  <div className="font-bold text-foreground text-sm mt-1">{details.priceRange} EUR</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                  <Shield className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Garantia</div>
                  <div className="font-bold text-foreground text-sm mt-1">12 meses</div>
                </div>
              </div>

              {/* What to do while you wait */}
              <div className="p-6 rounded-2xl border-2 border-foreground/10 bg-foreground/5 mb-10">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-foreground" />
                  Que hacer mientras llega el {profession.name.toLowerCase()}
                </h2>
                <ol className="space-y-3">
                  {details.whileYouWait.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                      {tip}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Prevention Tips */}
              {details.preventionTips && (
                <div className="p-6 rounded-2xl bg-muted/30 border border-border mb-10">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Como prevenir {problem.name.toLowerCase()}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {details.preventionTips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground p-3 rounded-xl bg-background border border-border">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inline CTA */}
              <div className="p-8 rounded-2xl bg-foreground text-background text-center">
                <h2 className="text-2xl font-bold mb-2">Solucionamos {problem.name.toLowerCase()} en {cityName}</h2>
                <p className="text-background/70 text-sm mb-4">Tiempo estimado: {details.estimatedTime}. Precio orientativo: {details.priceRange} EUR. Presupuesto cerrado antes de empezar.</p>
                <CallButton phoneNumber={phoneNumber} phoneFormatted={phoneFormatted} className="bg-background text-foreground hover:bg-background/90" />
              </div>
            </div>
          </article>
        )}

        {/* Generic fallback for problems without detailed content */}
        {!details && (
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {problem.name} en {cityName}: Servicio urgente 24h
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                {problem.description} en {cityName}? Nuestros {profession.namePlural.toLowerCase()} profesionales estan disponibles las 24 horas del dia para solucionar tu problema. Llegamos en 10 minutos y damos presupuesto antes de empezar.
              </p>
              <div className="p-6 rounded-2xl bg-foreground text-background text-center">
                <p className="text-lg font-bold mb-2">Llama ahora y solucionamos {problem.name.toLowerCase()} en {cityName}</p>
                <CallButton phoneNumber={phoneNumber} phoneFormatted={phoneFormatted} className="bg-background text-foreground hover:bg-background/90" />
              </div>
            </div>
          </section>
        )}

        {/* Problem-Specific FAQs */}
        {details?.faqs && details.faqs.length > 0 && (
          <section className="py-12 bg-muted/20" aria-labelledby="problem-faq-heading">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-foreground" />
                </div>
                <h2 id="problem-faq-heading" className="text-2xl font-bold text-foreground text-balance">
                  Preguntas frecuentes sobre {problem.name.toLowerCase()} en {cityName}
                </h2>
              </div>
              <div className="space-y-4">
                {details.faqs.map((faq, i) => (
                  <details key={i} className="group rounded-2xl border border-border bg-background overflow-hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors">
                      <h3 className="text-lg font-semibold text-foreground pr-4">{faq.q}</h3>
                      <span className="text-foreground shrink-0 transition-transform group-open:rotate-180">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="py-12" aria-labelledby="problem-reviews-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-foreground fill-foreground" />
                ))}
              </div>
              <h2 id="problem-reviews-heading" className="text-foreground font-bold">
                Opiniones de clientes en {cityName}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review, i) => (
                <div key={i} className="p-6 rounded-2xl bg-muted/20 border border-border">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background font-bold shrink-0">
                      {review.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm">{review.name}</span>
                        <BadgeCheck className="w-4 h-4 text-blue-500" />
                      </div>
                      <time className="text-xs text-muted-foreground">{review.time}</time>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 text-foreground fill-foreground" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{`"${review.text}"`}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GuaranteeSection />

        {/* Interlinking: Other problems of same profession */}
        <section className="py-12 bg-muted/20" aria-labelledby="other-problems-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h2 id="other-problems-heading" className="text-2xl font-bold text-foreground text-balance">
                  Otros problemas de {profession.name.toLowerCase()} en {cityName}
                </h2>
                <p className="text-sm text-muted-foreground">Tambien solucionamos estas averias.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {otherProblems.map((p) => (
                <Link
                  key={p.id}
                  href={`/problema/${professionId}/${p.id}/${citySlug}/`}
                  className={`group flex items-center gap-3 p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                    p.urgent
                      ? "bg-destructive/5 border-destructive/20 hover:border-destructive/50"
                      : "bg-background border-border hover:border-foreground/30"
                  }`}
                >
                  <span className="text-lg">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground block truncate">{p.name}</span>
                    {p.urgent && <span className="text-[10px] font-bold text-destructive uppercase">Urgente</span>}
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Same problem in nearby cities */}
        {nearbyCities.length > 0 && (
          <section className="py-12" aria-labelledby="nearby-problem-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h2 id="nearby-problem-heading" className="text-2xl font-bold text-foreground text-balance">
                    {problem.name} en ciudades cercanas a {cityName}
                  </h2>
                  <p className="text-sm text-muted-foreground">Tambien solucionamos {problem.name.toLowerCase()} en estas localidades.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {nearbyCities.map((city) => (
                  <Link
                    key={city}
                    href={`/problema/${professionId}/${problemId}/${city}/`}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-sm font-medium text-foreground hover:border-foreground/30 hover:bg-background transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span>{getCityDisplayName(city)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other services in this city */}
        <section className="py-12 bg-muted/20" aria-labelledby="other-services-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 id="other-services-heading" className="text-2xl font-bold text-foreground">
                  Otros servicios urgentes en {cityName}
                </h2>
                <p className="text-sm text-muted-foreground">Disponibles 24 horas, 365 dias al ano.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherProfessions.map((prof) => (
                <Link
                  key={prof.id}
                  href={`/${prof.id}/${citySlug}/`}
                  className="group p-5 rounded-2xl border border-border bg-background hover:border-foreground/30 hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-foreground mb-2">{prof.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{prof.description}</p>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all">
                    Ver servicio <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <Link
                href={`/${professionId}/${citySlug}/`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Ver todos los servicios de {profession.name.toLowerCase()} en {cityName}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
