import { HelpCircle, Wrench, Clock, Shield, CreditCard, MapPin, Phone, Award, FileText, Users } from "lucide-react"

const faqCategories = [
  {
    title: "Tiempos y Disponibilidad",
    icon: Clock,
    faqs: [
      {
        question: "¿Cuánto tarda en llegar un profesional a mi casa?",
        answer: "Nuestro tiempo medio de llegada es de 10 a 30 minutos, dependiendo de tu ubicación y la disponibilidad de técnicos en tu zona. Mantenemos una red de más de 500 profesionales distribuidos estratégicamente por toda España. En las grandes ciudades como Madrid, Barcelona, Valencia, Sevilla o Bilbao, el tiempo de respuesta suele ser inferior a 20 minutos. En zonas menos pobladas, puede extenderse hasta 45 minutos. En situaciones de emergencia extrema (fugas de gas, inundaciones, cortocircuitos con riesgo de incendio), activamos nuestro protocolo de urgencia prioritaria que reduce significativamente los tiempos de respuesta."
      },
      {
        question: "¿Trabajan de noche, fines de semana y festivos?",
        answer: "Sí, estamos disponibles las 24 horas del día, los 7 días de la semana, los 365 días del año. Esto incluye noches, madrugadas, fines de semana y todos los festivos nacionales y locales. Las emergencias no entienden de horarios, y nosotros tampoco. Nuestro servicio nocturno (de 22:00 a 08:00) y de festivos funciona exactamente igual que el diurno, con profesionales igual de cualificados y equipados. Los precios pueden variar ligeramente en horario nocturno y festivo, pero siempre te informamos del coste exacto antes de desplazar al técnico."
      },
      {
        question: "¿Cuánto tiempo suele durar una reparación de emergencia?",
        answer: "El tiempo de reparación depende del tipo de avería y su complejidad. Las intervenciones más comunes tienen estos tiempos aproximados: Apertura de puerta sin llaves: 10-30 minutos. Reparación de fuga de agua visible: 30-60 minutos. Restablecimiento de luz tras apagón: 20-45 minutos. Desatasco de WC o fregadero: 30-90 minutos. Reparación de caldera sin calefacción: 45-120 minutos. Estos tiempos son orientativos y pueden variar según las condiciones específicas de cada caso. El técnico siempre te informará del tiempo estimado una vez diagnosticado el problema."
      }
    ]
  },
  {
    title: "Precios y Pagos",
    icon: CreditCard,
    faqs: [
      {
        question: "¿Cuánto cuesta el servicio de urgencias?",
        answer: "El precio varía según el tipo de servicio, la hora del día, y la complejidad del trabajo. Siempre proporcionamos un presupuesto cerrado y por escrito antes de comenzar cualquier trabajo, sin sorpresas ni costes ocultos. Como referencia general: Cerrajería de urgencia: desde 60€. Fontanería urgente: desde 70€. Electricidad de emergencia: desde 65€. Desatascos: desde 80€. Calderas: desde 75€. La visita de diagnóstico tiene un coste mínimo (generalmente entre 25-40€) que se descuenta completamente si decides realizar la reparación con nosotros. Si el cliente decide no hacer la reparación, solo paga esta visita de diagnóstico."
      },
      {
        question: "¿Hay diferencia de precio entre día, noche y festivos?",
        answer: "Sí, como es habitual en el sector de urgencias, aplicamos tarifas diferenciadas según el horario: Tarifa diurna (08:00-22:00, lunes a viernes): Precio base estándar. Tarifa nocturna (22:00-08:00): Incremento del 20-30% sobre la tarifa diurna. Tarifa de fin de semana (sábados y domingos): Incremento del 15-25%. Tarifa festiva (festivos nacionales y locales): Incremento del 30-50%. Siempre te informamos del precio exacto ANTES de enviar al técnico, para que puedas decidir si prefieres esperar al horario diurno o si la urgencia requiere intervención inmediata."
      },
      {
        question: "¿Cómo puedo pagar el servicio?",
        answer: "Aceptamos múltiples formas de pago para tu comodidad: Efectivo: El técnico puede darte cambio si es necesario. Tarjeta de crédito/débito: Todos nuestros técnicos llevan datáfono TPV con conexión móvil (Visa, Mastercard, American Express). Transferencia bancaria: Puedes pagar por transferencia y el técnico espera confirmación. Bizum: Pago instantáneo al número del técnico o de la empresa. Pago financiado: Para trabajos de mayor importe, ofrecemos financiación hasta 12 meses sin intereses (sujeto a aprobación). Seguro del hogar: Trabajamos con las principales aseguradoras españolas (Mapfre, Allianz, Axa, Zurich, Generali, etc.). Si tienes cobertura, podemos gestionar directamente con tu seguro."
      },
      {
        question: "¿Emiten factura oficial?",
        answer: "Absolutamente. Emitimos factura oficial con IVA por todos los trabajos realizados. La factura incluye: descripción detallada del trabajo, desglose de mano de obra y materiales, número de identificación fiscal de la empresa, datos del cliente, y período de garantía aplicable. Puedes recibirla en papel en el momento (el técnico la imprime) o en formato digital por email en las siguientes 24-48 horas. Esta factura es completamente válida para deducción fiscal si el inmueble es tu vivienda habitual o local de negocio, y sirve como justificante ante tu compañía de seguros."
      }
    ]
  },
  {
    title: "Profesionales y Garantías",
    icon: Shield,
    faqs: [
      {
        question: "¿Los profesionales están certificados y tienen experiencia?",
        answer: "Absolutamente. Todos nuestros técnicos son profesionales certificados con un mínimo de 5 años de experiencia en su especialidad. Nuestro proceso de selección es riguroso: Electricistas: Carnet oficial de instalador autorizado (categoría básica o especialista), expedido por la comunidad autónoma correspondiente. Fontaneros: Certificación profesional en instalaciones de fontanería y calefacción. Cerrajeros: Formación acreditada en sistemas de seguridad y aperturas no destructivas. Técnicos de gas y calderas: Carnet de instalador de gas categoría A, B o C según especialidad, inscrito en el registro oficial. Desatascos: Formación en saneamiento y equipos especializados (cuba, robots, cámaras). Además, todos los técnicos reciben formación continua (mínimo 40 horas anuales) para estar al día de las últimas tecnologías, normativas y mejores prácticas del sector."
      },
      {
        question: "¿Qué garantía tienen los trabajos realizados?",
        answer: "Ofrecemos una de las garantías más completas del mercado: Garantía de mano de obra: Mínimo 12 meses en todos los trabajos. Si algo falla relacionado con nuestra intervención, volvemos sin coste adicional. Garantía de materiales: Los materiales que instalamos tienen la garantía del fabricante (generalmente 2-5 años según el producto). Garantía de satisfacción: Si no quedas satisfecho con el servicio, revisamos el trabajo sin coste. La garantía se documenta por escrito en la factura y puedes hacerla efectiva simplemente llamando a nuestro teléfono de atención al cliente. El plazo de respuesta para reclamaciones de garantía es de máximo 48 horas en días laborables."
      },
      {
        question: "¿Los técnicos tienen seguro de responsabilidad civil?",
        answer: "Sí, todos nuestros profesionales y la empresa están cubiertos por un seguro de responsabilidad civil profesional con una cobertura de hasta 600.000€. Este seguro cubre: daños a la propiedad del cliente durante la intervención, daños a terceros (vecinos, elementos comunes), lesiones personales, y defectos en los trabajos realizados. Además, todos los técnicos cuentan con seguro de accidentes laborales y están dados de alta en la Seguridad Social. Puedes solicitar copia del certificado de seguro antes de iniciar cualquier trabajo."
      }
    ]
  },
  {
    title: "Cobertura y Servicios",
    icon: MapPin,
    faqs: [
      {
        question: "¿Qué zonas cubren exactamente?",
        answer: "Damos servicio en toda España peninsular, Baleares y Canarias. Nuestra cobertura incluye: Comunidades Autónomas: Todas las 17 comunidades autónomas más Ceuta y Melilla. Grandes ciudades: Madrid, Barcelona, Valencia, Sevilla, Zaragoza, Málaga, Murcia, Palma de Mallorca, Las Palmas, Bilbao, Alicante, Córdoba, Valladolid, Vigo, Gijón, y muchas más. Áreas metropolitanas: Cobertura completa en todas las áreas metropolitanas de las principales ciudades. Zonas rurales: Servicio disponible aunque con tiempos de llegada más amplios (hasta 60-90 minutos en zonas muy alejadas). Consulta disponibilidad para tu zona específica llamando al 936 946 639. Nuestro sistema localiza automáticamente al técnico más cercano a tu ubicación."
      },
      {
        question: "¿Qué tipos de servicios ofrecen exactamente?",
        answer: "Ofrecemos una gama completa de servicios de emergencia para el hogar y comercios: CERRAJERÍA: Aperturas de puertas sin daños, cambio de cerraduras, amaestramiento, cerraduras de seguridad, cajas fuertes, persianas, cierres de comercio. FONTANERÍA: Fugas de agua, roturas de tuberías, atascos, reparación de cisternas, grifería, calentadores de agua, termos eléctricos, detección de fugas ocultas. ELECTRICIDAD: Apagones, cortocircuitos, cuadros eléctricos, enchufes, interruptores, iluminación, instalaciones nuevas, boletines eléctricos, certificados de instalación. DESATASCOS: WC, fregaderos, bañeras, duchas, bajantes, arquetas, fosas sépticas, limpieza con camión cuba, inspección con cámara. CALDERAS Y CALEFACCIÓN: Reparación de calderas (gas, gasoil, eléctricas), mantenimiento, revisiones obligatorias, calderas de condensación, radiadores, suelo radiante, aire acondicionado."
      },
      {
        question: "¿Atienden también a empresas y comunidades de propietarios?",
        answer: "Sí, además de particulares, prestamos servicio a: Empresas y comercios: Oficinas, tiendas, restaurantes, hoteles, naves industriales. Comunidades de propietarios: Averías en zonas comunes, bajantes, cuartos de calderas, portales. Administradores de fincas: Servicio prioritario y facturación centralizada. Compañías de seguros: Somos proveedores autorizados de las principales aseguradoras. Ayuntamientos y organismos públicos: Servicio de urgencias para edificios públicos. Para empresas y comunidades ofrecemos: facturación a 30 días, contratos de mantenimiento con descuentos, línea de atención prioritaria, y gestor de cuenta dedicado."
      }
    ]
  },
  {
    title: "Antes y Durante el Servicio",
    icon: Wrench,
    faqs: [
      {
        question: "¿Qué hago en caso de emergencia mientras espero al técnico?",
        answer: "Nuestro equipo de atención telefónica te dará instrucciones específicas según tu emergencia. Aquí tienes las pautas generales de seguridad: FUGA DE AGUA: Cierra la llave de paso general (suele estar junto al contador o debajo del fregadero). Si no la encuentras, cierra las llaves angulares del aparato afectado. Recoge el agua con cubos y toallas para evitar daños mayores. PROBLEMAS ELÉCTRICOS: Baja el diferencial y los automáticos del cuadro eléctrico. No toques cables ni aparatos si hay humedad. No intentes reparar nada tú mismo. OLOR A GAS: No enciendas luces, mecheros ni aparatos eléctricos. Abre ventanas para ventilar. Sal de la vivienda y llama desde fuera. Contacta también al 112 si el olor es muy fuerte. PUERTA BLOQUEADA: No intentes forzarla, puedes dañar la cerradura y encarecer la reparación. Si tienes niños o personas vulnerables dentro, llama al 112 además de a nosotros."
      },
      {
        question: "¿Necesito estar presente durante la reparación?",
        answer: "Sí, es necesario que el titular del inmueble o una persona autorizada mayor de 18 años esté presente durante la intervención. Esto es por varios motivos: Seguridad jurídica: El técnico necesita autorización para acceder y realizar trabajos. Decisiones sobre la reparación: Puede haber opciones o situaciones imprevistas que requieran tu aprobación. Firma de documentos: Presupuesto, conformidad del trabajo, y factura deben ser firmados. Pago: Salvo acuerdo previo, el pago se realiza al finalizar. Si no puedes estar presente, puedes autorizar a otra persona mediante documento escrito o llamada telefónica verificada. Para comunidades de propietarios, el presidente, el administrador o el portero pueden dar acceso a zonas comunes."
      },
      {
        question: "¿Qué documentos me dará el técnico al finalizar?",
        answer: "Al finalizar la intervención, recibirás la siguiente documentación: Presupuesto aceptado: Copia del presupuesto que aprobaste antes de iniciar. Parte de trabajo: Documento detallado con: descripción del problema encontrado, trabajos realizados, materiales utilizados, tiempo empleado, recomendaciones de mantenimiento. Factura oficial: Con todos los datos fiscales, desglose de conceptos e IVA. Certificado de garantía: Con el plazo de cobertura y condiciones. Documentación técnica (si aplica): Para instalaciones de gas, boletines eléctricos o trabajos que requieran documentación oficial. Toda esta documentación también puede enviarse por email si lo prefieres."
      }
    ]
  },
  {
    title: "Confianza y Seguridad",
    icon: Award,
    faqs: [
      {
        question: "¿Cómo puedo verificar que el técnico es realmente de su empresa?",
        answer: "Tomamos muy en serio la seguridad de nuestros clientes. Todos nuestros técnicos: Llevan identificación: Tarjeta de identificación con foto, nombre y número de empleado. Visten uniforme corporativo: Ropa de trabajo con el logo de la empresa visible. Vehículo identificado: Furgoneta o vehículo con rotulación de la empresa (en la mayoría de casos). Código de verificación: Cuando llames para solicitar el servicio, te daremos un código único. El técnico te dirá este código al llegar para que verifiques que es el profesional asignado. Además, puedes llamar en cualquier momento a nuestro teléfono 936 946 639 para verificar que el técnico está registrado y es el asignado a tu servicio."
      },
      {
        question: "¿Qué opinan otros clientes sobre su servicio?",
        answer: "Estamos orgullosos de la confianza que depositan en nosotros más de 50.000 clientes cada año. Nuestras valoraciones: Google Business: 4.9 estrellas sobre 5 (más de 2.800 opiniones). Índice de satisfacción interno: 96% de clientes satisfechos o muy satisfectos. Tasa de recomendación: El 89% de nuestros clientes nos recomendaría a familiares y amigos. Resolución en primera visita: 92% de las averías se resuelven en la primera intervención. Puedes consultar opiniones reales en Google Maps buscando 'pronto-24.com'. También publicamos regularmente testimonios verificados en nuestra web y redes sociales."
      },
      {
        question: "¿Pertenecen a alguna asociación o tienen certificaciones de calidad?",
        answer: "Sí, como parte de nuestro compromiso con la calidad y la profesionalidad: Asociaciones: Miembros de las principales asociaciones profesionales del sector en cada especialidad. Certificaciones: Empresa certificada según estándares de calidad en servicios. Formación homologada: Centro colaborador de formación profesional continua. Compromisos: Adheridos al Sistema Arbitral de Consumo para resolución de conflictos. Cumplimiento normativo: Todos nuestros técnicos y procedimientos cumplen con la normativa vigente (REBT para electricidad, RITE para instalaciones térmicas, etc.)."
      }
    ]
  }
]

// Preguntas adicionales para máximo contenido SEO
const additionalFaqs = [
  {
    question: "¿Qué diferencia hay entre una urgencia y una emergencia?",
    answer: "En nuestro contexto, usamos estos términos de forma similar, pero técnicamente: Una URGENCIA es una situación que requiere atención rápida pero no supone un peligro inmediato (por ejemplo, quedarse sin agua caliente en invierno, una cerradura que no cierra bien). Una EMERGENCIA implica riesgo para personas o daños graves inminentes a la propiedad (fuga de gas, inundación activa, cortocircuito con humo, quedarse encerrado con niños solos dentro). Atendemos ambas con la máxima celeridad, pero las emergencias con riesgo para personas se priorizan absolutamente sobre cualquier otro servicio."
  },
  {
    question: "¿Pueden darme un presupuesto por teléfono antes de venir?",
    answer: "Podemos darte una estimación orientativa por teléfono basada en tu descripción del problema. Sin embargo, el presupuesto definitivo y vinculante solo puede darse una vez que el técnico ha visto el problema in situ. Esto es porque: muchas averías tienen causas ocultas que solo se descubren al inspeccionar, el estado de las instalaciones afecta al tiempo y dificultad del trabajo, y los materiales necesarios pueden variar según lo encontrado. Lo que sí garantizamos es que NUNCA empezaremos un trabajo sin tu aprobación expresa del presupuesto final. Si el presupuesto no te convence, solo pagas el desplazamiento y diagnóstico."
  },
  {
    question: "¿Traen los técnicos todos los materiales necesarios?",
    answer: "Nuestros técnicos llevan en sus vehículos un stock completo de los materiales más habituales para cada tipo de servicio: repuestos comunes, herramientas especializadas, y consumibles. Esto permite resolver la inmensa mayoría de averías en una sola visita (92% de casos). Sin embargo, para problemas muy específicos o que requieran piezas poco comunes, puede ser necesaria una segunda visita. En estos casos: el técnico te informa en el momento, pedimos la pieza con la máxima urgencia (a menudo disponible en 24-48h), la segunda visita no tiene coste de desplazamiento adicional."
  },
  {
    question: "¿Qué pasa si el problema es más grave de lo que parecía?",
    answer: "Es relativamente frecuente que, al abrir una instalación o acceder a una zona oculta, el técnico descubra que el problema es diferente o más extenso de lo inicialmente previsto. En estos casos: El técnico PARA inmediatamente y te informa. Te explica la situación real encontrada. Te da un nuevo presupuesto ajustado a la realidad. Tú decides si quieres continuar, y NUNCA se hace trabajo adicional sin tu autorización expresa. Si decides no continuar, solo pagas el trabajo realizado hasta ese momento más el diagnóstico. No hay penalizaciones ni costes ocultos."
  },
  {
    question: "¿Ofrecen servicios de mantenimiento preventivo?",
    answer: "Sí, además de urgencias, ofrecemos contratos de mantenimiento preventivo que pueden ahorrarte mucho dinero y disgustos a largo plazo: Mantenimiento de calderas: Revisión anual obligatoria por normativa, limpieza, ajustes y verificación de seguridad. Revisión eléctrica: Comprobación de cuadros, conexiones, y estado de la instalación. Mantenimiento de fontanería: Revisión de llaves, grifos, y detección temprana de fugas. Limpieza preventiva de desagües: Evita atascos graves con limpiezas periódicas. Los clientes con contrato de mantenimiento tienen: descuentos del 15-20% en reparaciones, prioridad de atención, y línea directa de contacto. Consulta nuestros planes de mantenimiento llamando al 936 946 639."
  },
  {
    question: "¿Cómo gestionan las reclamaciones si no estoy satisfecho?",
    answer: "Esperamos que nunca tengas que reclamar, pero si algo no ha ido como esperabas: 1. Contacta con nosotros: Llama al 936 946 639 o escribe a nuestra dirección de atención al cliente explicando tu caso. 2. Evaluación: Un responsable revisará tu caso en un plazo máximo de 48 horas laborables. 3. Solución: Proponemos una solución que puede incluir: revisión del trabajo sin coste, compensación económica parcial, o reembolso completo en casos justificados. 4. Si no estás de acuerdo: Estamos adheridos al Sistema Arbitral de Consumo, por lo que puedes solicitar arbitraje gratuito. Nuestro objetivo es tu satisfacción total. El 98% de las incidencias se resuelven de forma amistosa y satisfactoria para el cliente."
  }
]

export function HomeFAQ() {
  return (
    <section className="py-20 bg-muted/20" id="faq">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Centro de ayuda</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Guía completa: Todo lo que necesitas saber sobre servicios de urgencia 24h
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-pretty">
            Hemos recopilado las respuestas a las preguntas más frecuentes de nuestros clientes. 
            Esta guía te ayudará a entender cómo funcionamos, qué esperar de nuestro servicio, 
            y cómo actuar en caso de emergencia. Si tienes alguna pregunta adicional, 
            llámanos al <a href="tel:936946639" className="text-primary font-semibold hover:underline">936 946 639</a>.
          </p>
        </div>

        {/* FAQ por categorías */}
        <div className="space-y-12 mb-16">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.faqs.map((faq, i) => (
                  <details 
                    key={i} 
                    className="group rounded-2xl border border-border bg-background overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors">
                      <h4 className="text-lg font-semibold text-foreground pr-4 text-left">{faq.question}</h4>
                      <span className="text-foreground shrink-0 transition-transform group-open:rotate-180">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Preguntas adicionales */}
        <div className="border-t border-border pt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Otras preguntas importantes</h3>
          </div>
          <div className="space-y-4">
            {additionalFaqs.map((faq, i) => (
              <details 
                key={i} 
                className="group rounded-2xl border border-border bg-background overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors">
                  <h4 className="text-lg font-semibold text-foreground pr-4 text-left">{faq.question}</h4>
                  <span className="text-foreground shrink-0 transition-transform group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-16 text-center p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-primary">Más de 50.000 clientes satisfechos</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            ¿No has encontrado respuesta a tu pregunta?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Nuestro equipo de atención al cliente está disponible 24/7 para resolver cualquier duda. 
            Llámanos y te atenderemos en menos de 30 segundos.
          </p>
          <a 
            href="tel:936946639" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            <Phone className="w-5 h-5" />
            <span>Llamar ahora: 936 946 639</span>
          </a>
        </div>
      </div>
    </section>
  )
}
