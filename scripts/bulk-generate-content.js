/**
 * BULK AI CONTENT GENERATOR FOR PRONTO-24.COM
 * 
 * Generates SEO content for all profession x city x problem combinations
 * using OpenAI gpt-4o-mini and inserts directly into Neon PostgreSQL.
 * 
 * Usage:
 *   OPENAI_API_KEY=sk-... NEON_DATABASE_URL=postgresql://... node scripts/bulk-generate-content.js
 * 
 * Options (env vars):
 *   CONCURRENCY=20          Number of parallel requests (default: 20)
 *   SKIP_EXISTING=true      Skip pages already in DB (default: true)
 *   START_FROM=0            Skip first N items in queue (for resuming)
 *   DRY_RUN=false           If true, just count pages without generating
 */

// ============================================================
// CONFIG
// ============================================================
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "20", 10);
const SKIP_EXISTING = process.env.SKIP_EXISTING !== "false";
const START_FROM = parseInt(process.env.START_FROM || "0", 10);
const DRY_RUN = process.env.DRY_RUN === "true";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const NEON_DATABASE_URL = process.env.NEON_DATABASE_URL;

if (!DRY_RUN && !OPENAI_API_KEY) {
  console.error("ERROR: OPENAI_API_KEY is required. Set it as env var.");
  process.exit(1);
}
if (!DRY_RUN && !NEON_DATABASE_URL) {
  console.error("ERROR: NEON_DATABASE_URL is required. Set it as env var.");
  process.exit(1);
}

// ============================================================
// DATA - Professions
// ============================================================
const PROFESSIONS = [
  { id: "electricista", name: "Electricista", namePlural: "Electricistas", description: "Electricistas certificados disponibles 24/7" },
  { id: "fontanero", name: "Fontanero", namePlural: "Fontaneros", description: "Fontaneros profesionales disponibles 24/7" },
  { id: "cerrajero", name: "Cerrajero", namePlural: "Cerrajeros", description: "Cerrajeros de confianza disponibles 24/7" },
  { id: "desatascos", name: "Desatascos", namePlural: "Desatascos", description: "Servicio de desatascos profesional 24/7" },
  { id: "calderas", name: "Calderas", namePlural: "Tecnicos de Calderas", description: "Tecnicos de calderas certificados 24/7" },
];

// ============================================================
// DATA - Problems per profession
// ============================================================
const PROBLEMS = {
  electricista: [
    { id: "apagon", name: "Apagon", description: "Sin luz en casa" },
    { id: "cortocircuito", name: "Cortocircuito", description: "Saltan los plomos" },
    { id: "olor-quemado", name: "Olor a quemado", description: "Huele a quemado electrico" },
    { id: "diferencial-salta", name: "Diferencial salta", description: "El diferencial salta solo" },
    { id: "enchufes-no-funcionan", name: "Enchufes no funcionan", description: "Enchufes sin corriente" },
    { id: "luces-parpadean", name: "Luces parpadean", description: "Las luces parpadean" },
    { id: "cuadro-electrico", name: "Cuadro electrico", description: "Problemas con el cuadro" },
    { id: "instalacion-electrica", name: "Instalacion electrica", description: "Instalacion nueva o reforma" },
    { id: "boletin-electrico", name: "Boletin electrico", description: "Certificado de instalacion" },
  ],
  fontanero: [
    { id: "fuga-agua", name: "Fuga de agua", description: "Escape de agua" },
    { id: "tuberia-rota", name: "Tuberia rota", description: "Rotura de tuberia" },
    { id: "inundacion", name: "Inundacion", description: "Casa inundada" },
    { id: "atasco-grave", name: "Atasco grave", description: "Atasco importante" },
    { id: "grifo-gotea", name: "Grifo gotea", description: "Grifo que gotea" },
    { id: "cisterna-no-funciona", name: "Cisterna", description: "Cisterna no funciona" },
    { id: "calentador", name: "Calentador", description: "Problemas con calentador" },
    { id: "humedad", name: "Humedad", description: "Problemas de humedad" },
  ],
  cerrajero: [
    { id: "puerta-bloqueada", name: "Puerta bloqueada", description: "No puedo abrir la puerta" },
    { id: "cerradura-rota", name: "Cerradura rota", description: "Cerradura estropeada" },
    { id: "llave-dentro", name: "Llave dentro", description: "Me deje las llaves dentro" },
    { id: "robo", name: "Robo", description: "Intento de robo" },
    { id: "cambio-cerradura", name: "Cambio cerradura", description: "Cambiar cerradura" },
    { id: "copia-llaves", name: "Copia de llaves", description: "Hacer copias de llaves" },
    { id: "cerradura-seguridad", name: "Cerradura seguridad", description: "Instalar cerradura de seguridad" },
  ],
  desatascos: [
    { id: "wc-atascado", name: "WC atascado", description: "El vater esta atascado" },
    { id: "fregadero-atascado", name: "Fregadero atascado", description: "El fregadero no traga" },
    { id: "arqueta-atascada", name: "Arqueta atascada", description: "Arqueta obstruida" },
    { id: "mal-olor", name: "Mal olor", description: "Mal olor en tuberias" },
    { id: "ducha-atascada", name: "Ducha atascada", description: "La ducha no traga" },
    { id: "bajante-atascado", name: "Bajante atascado", description: "Bajante obstruido" },
    { id: "limpieza-tuberias", name: "Limpieza tuberias", description: "Limpieza preventiva" },
  ],
  calderas: [
    { id: "sin-agua-caliente", name: "Sin agua caliente", description: "No sale agua caliente" },
    { id: "caldera-no-enciende", name: "Caldera no enciende", description: "La caldera no arranca" },
    { id: "fuga-gas", name: "Fuga de gas", description: "Posible fuga de gas" },
    { id: "ruido-caldera", name: "Ruido caldera", description: "La caldera hace ruido" },
    { id: "revision-caldera", name: "Revision caldera", description: "Revision obligatoria" },
    { id: "cambio-caldera", name: "Cambio caldera", description: "Sustituir caldera" },
    { id: "radiadores", name: "Radiadores", description: "Problemas con radiadores" },
  ],
};

// ============================================================
// DATA - All cities in Spain by province
// ============================================================
const CITIES_SPAIN = {
  barcelona: ["barcelona","hospitalet-llobregat","badalona","terrassa","sabadell","mataro","santa-coloma-gramenet","cornella-llobregat","sant-boi-llobregat","sant-cugat-valles","rubi","vilanova-geltru","viladecans","prat-llobregat","castelldefels","granollers","cerdanyola-valles","mollet-valles","gava","esplugues-llobregat","sant-feliu-llobregat","ripollet","sant-adria-besos","montcada-reixac","vic","igualada","vilafranca-penedes","manresa","sant-vicenc-dels-horts","premia-mar","sitges","el-masnou","martorell","sant-pere-ribes","sant-andreu-barca","pineda-mar","barbera-valles","calella","molins-rei","cardedeu","berga","caldes-montbui","llinars-valles","palau-solita-plegamans","montornes-valles","la-garriga","parets-valles","sant-quirze-valles","tordera","arenys-mar","canet-mar","sant-celoni","malgrat-mar","santa-perpetua-mogoda","argentona","cubelles","castellar-valles","sant-sadurni-anoia","olesa-montserrat","abrera","badia-valles","begues","cabrera-mar","cabrils","calaf","canovelles","capellades","cardona","centelles","cervello","corbera-llobregat","esparreguera","gelida","gironella","la-llagosta","les-franqueses-valles","manlleu","masquefa","montmelo","navarcles","palleja","papiol","piera","polinya","sallent","sant-joan-despi","sant-just-desvern","santpedor","teia","tiana","tona","torello","torrelles-llobregat","vacarisses","vallirana","vilassar-dalt","vilassar-mar","sant-fost-campsentelles","la-roca-valles","dosrius","sant-pol-mar","montgat","alella","llica-amunt","llica-vall","santa-eulalia-roncana","bigues-riells","santa-maria-martorelles","vallromanes","la-torre-claramunt","vilanova-cami","jorba","castelloli","odena","rubio","la-pobla-claramunt","santa-margarida-montbui","els-hostalets-pierola","pierola","monistrol-montserrat","castellbell-vilar","sant-esteve-sesrovires","torrelles-foix","avinyonet-penedes","la-granada","mediona","subirats","font-rubi","torrelavit","sant-marti-sarroca","castellvi-rosanes"],
  girona: ["girona","figueres","blanes","lloret-mar","olot","salt","palafrugell","sant-feliu-guixols","roses","banyoles","palamos","la-bisbal-emporda","torroella-montgri","castello-empuries","calonge-sant-antoni","lescala","santa-coloma-farners","arbucies","cassa-selva","llagostera","platja-aro","puigcerda","ripoll","ribes-freser","camprodon","besalu","angles","amer","celra","hostalric","llança","pals","peralada","portbou","sils","tossa-mar","vidreres","cadaques","empuriabrava","begur","caldes-malavella","macanet-selva","fornells-selva","quart","vilablareix","sarria-ter","sant-julia-ramis","aiguaviva","sant-gregori"],
  tarragona: ["tarragona","reus","tortosa","salou","cambrils","vila-seca","valls","vendrell","amposta","calafell","cunit","torredembarra","altafulla","sant-carles-rapita","deltebre","montblanc","ulldecona","roquetes","mora-ebre","alcanar","constanti","la-selva-camp","riudoms","mont-roig-camp","creixell","roda-bera","les-borges-camp","falset","gandesa","alcover","arbos"],
  lleida: ["lleida","balaguer","tarrega","mollerussa","la-seu-urgell","cervera","almacelles","alpicat","tremp","solsona","ponts","agramunt","les-borges-blanques","bellpuig","guissona","vielha","sort","alfarras","almenar","artesa-segre","juneda","bellver-cerdanya","el-pont-suert"],
  madrid: ["madrid","mostoles","alcala-henares","fuenlabrada","leganes","getafe","alcorcon","torrejon-ardoz","parla","alcobendas","las-rozas","san-sebastian-reyes","pozuelo-alarcon","coslada","rivas-vaciamadrid","valdemoro","majadahonda","collado-villalba","aranjuez","arganda-rey","boadilla-monte","pinto","colmenar-viejo","tres-cantos","san-fernando-henares","galapagar","arroyomolinos","navalcarnero","ciempozuelos","villanueva-pardillo","villaviciosa-odon","torrelodones","mejorada-campo","humanes-madrid","paracuellos-jarama","algete","moralzarzal","villanueva-canada","san-martin-valdeiglesias","chinchon","guadarrama","el-escorial","san-lorenzo-escorial","alpedrete","brunete","sevilla-nueva","villalbilla","meco","daganzo-arriba","velilla-san-antonio","loeches","morata-tajuna","campo-real","nuevo-baztan","torres-alameda","camarma-esteruelas","san-agustin-guadalix","pedrezuela","miraflores-sierra","cercedilla","navacerrada","becerril-sierra","hoyo-manzanares","el-boalo","moraleja-enmedio","serranillos-valle","griñon","cubas-sagra","casarrubuelos","torrejon-velasco","torrejon-calzada"],
  malaga: ["malaga","marbella","mijas","velez-malaga","fuengirola","torremolinos","benalmadena","estepona","rincon-victoria","antequera","alhaurin-torre","alhaurin-grande","coin","nerja","torrox","cartama","ronda","manilva","alora","pizarra","campillos","mollina","archidona","alameda","casabermeja","colmenar","frigiliana","competa","algarrobo","torre-mar","benahavis","ojen","istan","casares","gaucin","san-pedro-alcantara"],
  sevilla: ["sevilla","dos-hermanas","alcala-guadaira","utrera","mairena-aljarafe","ecija","los-palacios-villafranca","la-rinconada","carmona","coria-rio","moron-frontera","tomares","san-juan-aznalfarache","bormujos","lebrija","marchena","osuna","camas","gines","castilleja-cuesta","espartinas","bollullos-mitacion","lora-rio","alcala-rio","gelves","mairena-alcor","brenes","palomares-rio","santiponce","la-algaba","valencina-concepcion","pilas","sanlucar-mayor","olivares","villanueva-ariscal","salteras","guillena"],
  granada: ["granada","motril","almunecar","armilla","maracena","las-gabias","loja","baza","guadix","santa-fe","atarfe","albolote","huetor-vega","ogijares","peligros","pulianas","la-zubia","cenes-vega","monachil","salobrena","chauchina","fuente-vaqueros","pinos-puente","illora","iznalloz","durcal","huetor-tajar","cullar-vega","otura","churriana-vega","vegas-genil"],
  cordoba: ["cordoba","lucena","puente-genil","montilla","priego-cordoba","cabra","palma-rio","baena","pozoblanco","penaroya-pueblonuevo","aguilar-frontera","la-carlota","castro-rio","rute","villanueva-cordoba","fernan-nunez","monturque","montemayor","espejo","bujalance","carcabuey","dona-mencia"],
  cadiz: ["cadiz","jerez-frontera","algeciras","san-fernando","el-puerto-santa-maria","chiclana-frontera","sanlucar-barrameda","la-linea-concepcion","puerto-real","arcos-frontera","rota","los-barrios","barbate","conil-frontera","ubrique","tarifa","medina-sidonia","vejer-frontera","chipiona","jimena-frontera","san-roque","trebujena","puerto-serrano","bornos","villamartin","olvera"],
  almeria: ["almeria","el-ejido","roquetas-mar","nijar","aguadulce","vicar","adra","huercal-overa","vera","garrucha","mojacar","cuevas-almanzora","albox","pulpi","carboneras","berja","dalias","huercal-almeria","la-mojonera","viator","tabernas","rioja","alhama-almeria"],
  huelva: ["huelva","lepe","almonte","isla-cristina","moguer","ayamonte","punta-umbria","cartaya","bollullos-par-condado","aljaraque","palma-condado","palos-frontera","san-juan-puerto","trigueros","valverde-camino","nerva","gibraleon","bonares","minas-riotinto","villanueva-cruces"],
  jaen: ["jaen","linares","andujar","ubeda","martos","alcala-real","baeza","la-carolina","jodar","mancha-real","torre-campo","alcaudete","bailen","villacarrillo","villanueva-arzobispo","santisteban-puerto","porcuna","torredonjimeno","mengibar","cazorla","quesada","pozo-alcon"],
  valencia: ["valencia","torrent","gandia","paterna","sagunto","mislata","burjassot","ontinyent","manises","aldaia","alfafar","catarroja","xirivella","quart-poblet","alzira","xativa","sueca","cullera","requena","lliria","algemesi","alaquas","picassent","oliva","paiporta","massanassa","silla","benetusser","tavernes-blanques","moncada","alboraya","godella","rocafort","betera","pobla-vallbona","riba-roja-turia","utiel","chiva","bunol","carlet","alginet","beniparrell","albal","sedavi"],
  alicante: ["alicante","elche","torrevieja","orihuela","benidorm","alcoy","elda","san-vicente-raspeig","denia","villena","petrer","crevillent","villajoyosa","novelda","santa-pola","ibi","altea","calpe","muchamiel","aspe","campello","san-juan-alicante","javea","alfaz-pi","guardamar-segura","pilar-horadada","moraira","teulada","finestrat","la-nucia","albir","rojales","almoradi","catral","callosa-segura","cox","dolores","rafal"],
  castellon: ["castellon-plana","vila-real","burriana","vinaros","benicarlo","onda","almazora","la-vall-uixo","benicassim","nules","oropesa-mar","segorbe","betxi","borriol","lucena-cid","alcora","moncofar","torreblanca","peniscola","alcala-xivert","san-mateo"],
  bizkaia: ["bilbao","barakaldo","getxo","portugalete","santurtzi","basauri","leioa","galdakao","durango","erandio","sestao","gernika-lumo","mungia","amorebieta","bermeo","sopela","algorta","plentzia","gorliz","bakio","berango","loiu","derio","zamudio","arrigorriaga","zaratamo","etxebarri"],
  gipuzkoa: ["san-sebastian","irun","errenteria","donostia","eibar","zarautz","hernani","tolosa","arrasate","hondarribia","lasarte-oria","pasaia","azpeitia","azkoitia","bergara","andoain","beasain","zumarraga","legazpi","urnieta","oiartzun","usurbil","getaria","zumaia","deba","mutriku"],
  araba: ["vitoria-gasteiz","llodio","amurrio","salvatierra","oyon","labastida","laguardia","alegria-dulantzi","santa-cruz-campezo","araia"],
  a_coruna: ["a-coruna","santiago-compostela","ferrol","naron","oleiros","arteixo","carballo","culleredo","cambre","ames","riveira","boiro","betanzos","sada","noia","cee","muxia","fisterra","muros","porto-son","rianxo","padron","ordes","melide","arzua","curtis","teo","brion"],
  pontevedra: ["vigo","pontevedra","vilagarcia-arousa","redondela","marin","cangas","moana","ponteareas","lalin","porrino","tui","sanxenxo","cambados","o-grove","nigran","baiona","gondomar","mos","salceda-caselas","bueu","a-guarda","poio","caldas-reis","vilanova-arousa","ribadumia"],
  ourense: ["ourense","verin","o-barco-valdeorras","carballino","xinzo-limia","allariz","ribadavia","o-pereiro-aguiar","coles","maceda","celanova","a-rua","o-carballino","bande","leiro","castrelo-mino"],
  lugo: ["lugo","monforte-lemos","viveiro","vilalba","sarria","foz","ribadeo","burela","chantada","guitiriz","xove","cervo","mondonedo","ourol"],
  valladolid: ["valladolid","laguna-duero","medina-campo","arroyo-encomienda","tordesillas","tudela-duero","simancas","cigales","zaratan","boecillo","aldeamayor-san-martin","penafiel","iscar","olmedo","portillo","mojados"],
  burgos: ["burgos","miranda-ebro","aranda-duero","briviesca","medina-pomar","villarcayo","lerma","salas-infantes","roa","belorado","pradoluengo"],
  leon: ["leon","ponferrada","san-andres-rabanedo","villaquilambre","astorga","la-baneza","bembibre","villablino","cacabelos","camponaraya","valencia-don-juan","cistierna","bonar","la-robla","santa-maria-paramo"],
  salamanca: ["salamanca","santa-marta-tormes","bejar","ciudad-rodrigo","villamayor","carbajosa-sagrada","penaranda-bracamonte","guijuelo","alba-tormes"],
  zamora: ["zamora","benavente","toro","morales-vino","puebla-sanabria","fuentesauco"],
  palencia: ["palencia","aguilar-campoo","guardo","venta-banos","villamuriel-cerrato"],
  segovia: ["segovia","cuellar","el-espinar","san-ildefonso","cantalejo","carbonero-mayor"],
  soria: ["soria","almazan","el-burgo-osma","san-esteban-gormaz","agreda"],
  avila: ["avila","arevalo","las-navas-marques","candeleda","el-barco-avila","el-tiemblo"],
  toledo: ["toledo","talavera-reina","illescas","sesena","yuncos","fuensalida","madridejos","mora","consuegra","sonseca","ocana","villacanas","quintanar-orden","torrijos","bargas","olias-rey","nambroca"],
  ciudad_real: ["ciudad-real","puertollano","tomelloso","alcazar-san-juan","valdepenas","manzanares","daimiel","la-solana","miguelturra","bolanos-calatrava","socuellamos","campo-criptana","villanueva-infantes","almaden","herencia"],
  albacete: ["albacete","hellin","villarrobledo","almansa","la-roda","caudete","tobarra","casas-ibanez","madrigueras","tarazona-mancha"],
  guadalajara: ["guadalajara","azuqueca-henares","alovera","el-casar","cabanillas-campo","marchamalo","villanueva-torre","siguenza","molina-aragon","brihuega"],
  cuenca: ["cuenca","tarancon","san-clemente","motilla-palancar","quintanar-rey","las-pedroneras","mota-cuervo","iniesta","honrubia","villamayor-santiago"],
  zaragoza: ["zaragoza","calatayud","utebo","ejea-caballeros","tarazona","caspe","la-almunia-dona-godina","cuarte-huerva","zuera","illueca","maria-huerva","fuentes-ebro","alagon","borja","alfajarin","villanueva-gallego","cadrete"],
  huesca: ["huesca","monzon","barbastro","jaca","fraga","sabinanigo","binefar","tamarite-litera","graus","almudevar","ayerbe","sarinena"],
  teruel: ["teruel","alcaniz","andorra","calamocha","utrillas","montalban","albarracin","mora-rubielos","cella","calanda"],
  murcia: ["murcia","cartagena","lorca","molina-segura","alcantarilla","mazarron","cieza","aguilas","yecla","jumilla","torre-pacheco","san-javier","san-pedro-pinatar","los-alcazares","las-torres-cotillas","totana","alhama-murcia","la-union","archena","mula","caravaca-cruz","calasparra","bullas","ceuti","lorqui","alguazas","beniel","santomera"],
  baleares: ["palma","calvia","ibiza","manacor","llucmajor","marratxi","inca","santa-eulalia-rio","sant-josep-sa-talaia","alcudia","felanitx","mahon","ciutadella-menorca","pollenca","soller","sant-llorenc-cardassar","sant-antoni-portmany","muro","campos","santanyi","santa-margalida","sa-pobla","binissalem","arta","capdepera","son-servera","cala-millor"],
  las_palmas: ["las-palmas-gran-canaria","telde","santa-lucia-tirajana","arrecife","san-bartolome-tirajana","aguimes","ingenio","galdar","arucas","mogan","puerto-rosario","tias","la-oliva","pajara","tuineje","antigua","teror","firgas","valsequillo","tejeda"],
  tenerife: ["santa-cruz-tenerife","san-cristobal-laguna","arona","adeje","la-orotava","granadilla-abona","puerto-cruz","los-realejos","tacoronte","candelaria","guia-isora","icod-vinos","santiago-teide","guimar","el-rosario","tegueste","la-victoria-acentejo","san-miguel-abona","vilaflor","arico"],
  asturias: ["gijon","oviedo","aviles","siero","langreo","mieres","castrillon","san-martin-rey-aurelio","corvera-asturias","llanera","villaviciosa","llanes","cangas-onis","navia","luarca","pravia","grado","tineo","cangas-narcea","laviana","aller","lena","ribadesella","colunga"],
  cantabria: ["santander","torrelavega","castro-urdiales","camargo","pielagos","el-astillero","laredo","santa-cruz-bezana","santona","colindres","reinosa","suances","noja","comillas","san-vicente-barquera","ramales-victoria","medio-cudeyo","marina-cudeyo"],
  navarra: ["pamplona","tudela","baranain","burlada","estella-lizarra","zizur-mayor","tafalla","ansoain","villava","berriozar","huarte","noain","cintruenigo","corella","sanguesa","peralta","alsasua","elizondo","baztan","lodosa","olite","viana","carcastillo","caparroso"],
  la_rioja: ["logrono","calahorra","arnedo","haro","lardero","villamediana-iregua","najera","alfaro","santo-domingo-calzada","autol","rincon-soto","aldeanueva-ebro"],
  badajoz: ["badajoz","merida","don-benito","almendralejo","villanueva-serena","zafra","montijo","villafranca-barros","olivenza","jerez-caballeros","azuaga","llerena","castuera","fregenal-sierra","santos-maimona"],
  caceres: ["caceres","plasencia","navalmoral-mata","coria","trujillo","miajadas","talayuela","moraleja","arroyo-luz","jaraiz-vera","montehermoso"],
};

// ============================================================
// DATA - Region names for prompts
// ============================================================
const REGION_NAMES = {
  barcelona: "Barcelona", girona: "Girona", tarragona: "Tarragona", lleida: "Lleida",
  madrid: "Madrid", malaga: "Malaga", sevilla: "Sevilla", granada: "Granada",
  cordoba: "Cordoba", cadiz: "Cadiz", almeria: "Almeria", huelva: "Huelva",
  jaen: "Jaen", valencia: "Valencia", alicante: "Alicante", castellon: "Castellon",
  bizkaia: "Bizkaia", gipuzkoa: "Gipuzkoa", araba: "Alava",
  a_coruna: "A Coruna", pontevedra: "Pontevedra", ourense: "Ourense", lugo: "Lugo",
  valladolid: "Valladolid", burgos: "Burgos", leon: "Leon", salamanca: "Salamanca",
  zamora: "Zamora", palencia: "Palencia", segovia: "Segovia", soria: "Soria", avila: "Avila",
  toledo: "Toledo", ciudad_real: "Ciudad Real", albacete: "Albacete",
  guadalajara: "Guadalajara", cuenca: "Cuenca",
  zaragoza: "Zaragoza", huesca: "Huesca", teruel: "Teruel",
  murcia: "Murcia", baleares: "Islas Baleares",
  las_palmas: "Las Palmas", tenerife: "Tenerife",
  asturias: "Asturias", cantabria: "Cantabria", navarra: "Navarra",
  la_rioja: "La Rioja", badajoz: "Badajoz", caceres: "Caceres",
};

// ============================================================
// HELPERS
// ============================================================
function getAllCities() {
  return Object.values(CITIES_SPAIN).flat();
}

function getCityDisplayName(slug) {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    .replace("Llobregat", "de Llobregat").replace("Valles", "del Valles")
    .replace(" Mar", " de Mar").replace(" Frontera", " de la Frontera")
    .replace(" Henares", " de Henares").replace(" Reina", " de la Reina")
    .replace(" Segura", " del Segura");
}

function getCityRegion(slug) {
  for (const [region, cities] of Object.entries(CITIES_SPAIN)) {
    if (cities.includes(slug)) return REGION_NAMES[region] || region;
  }
  return "Espana";
}

// ============================================================
// BUILD QUEUE
// ============================================================
function buildQueue() {
  const queue = [];
  const allCities = getAllCities();
  
  // 1. City pages: profession x city
  for (const prof of PROFESSIONS) {
    for (const city of allCities) {
      queue.push({ professionId: prof.id, citySlug: city, pageType: "city", problemId: null });
    }
  }
  
  // 2. Problem pages: profession x problem x city  
  for (const prof of PROFESSIONS) {
    const problems = PROBLEMS[prof.id] || [];
    for (const problem of problems) {
      for (const city of allCities) {
        queue.push({ professionId: prof.id, citySlug: city, pageType: "problem", problemId: problem.id });
      }
    }
  }
  
  return queue;
}

// ============================================================
// PROMPT BUILDER (same as the app)
// ============================================================
function buildPrompt(professionId, citySlug, pageType, problemId) {
  const profession = PROFESSIONS.find(p => p.id === professionId);
  const cityName = getCityDisplayName(citySlug);
  const region = getCityRegion(citySlug);
  const province = region;
  
  const problems = PROBLEMS[professionId] || [];
  const problemList = problems.map(p => `${p.name}: ${p.description}`).join(", ");
  
  let locationContext = `ciudad de ${cityName}, provincia de ${province}`;
  let serviceContext = `servicio de ${profession.name.toLowerCase()} en la ${locationContext}`;
  
  let problemExtra = "";
  if (problemId) {
    const problem = problems.find(p => p.id === problemId);
    if (problem) {
      serviceContext = `servicio de ${profession.name.toLowerCase()} especializado en ${problem.name} (${problem.description}) en la ${locationContext}`;
      problemExtra = `\n11. Centra el contenido en el problema especifico: ${problem.name} - ${problem.description}. Da detalles tecnicos sobre este problema concreto.`;
    }
  }

  return `Eres un experto redactor SEO para servicios de reparaciones del hogar en Espana. 
Genera contenido UNICO, DETALLADO y UTIL para una pagina web de ${serviceContext}.

CONTEXTO IMPORTANTE:
- Profesion: ${profession.name} (${profession.namePlural})
- Ubicacion: ${locationContext}
- Tipo de pagina: ${pageType === "city" ? "Pagina de ciudad" : "Pagina de problema especifico"}
- Problemas que resolvemos: ${problemList}
- Telefono de contacto: 936 946 639
- Nombre del negocio: Pronto24
- Servicio 24 horas, 365 dias al ano

INSTRUCCIONES CRITICAS:
1. El contenido DEBE ser UNICO para esta localidad. NO uses frases genericas que podrian aplicarse a cualquier ciudad.
2. Menciona el nombre "${cityName}" y la provincia "${province}" de forma natural varias veces.
3. Incluye referencias a zonas, barrios, calles o puntos de referencia conocidos de ${cityName} si los conoces.
4. Adapta los consejos al clima tipico de la zona (mediterraneo, atlantico, continental, etc).
5. Habla de los tipos de edificaciones comunes en ${cityName} (cascos antiguos, ensanches, urbanizaciones, poligonos).
6. Incluye informacion sobre normativa local o autonomica relevante si existe.
7. El tono debe ser profesional, cercano y util. Como un vecino experto que te ayuda.
8. NUNCA inventes datos falsos ni estadisticas. Si no estas seguro, usa frases como "en muchos hogares de la zona" en vez de porcentajes inventados.
9. Cada seccion debe aportar valor real al usuario, no solo texto de relleno.
10. Usa un vocabulario rico y variado. Evita repetir las mismas frases.${problemExtra}

Escribe en espanol de Espana (no latinoamericano). Usa "vosotros" si es necesario, no "ustedes".

RESPONDE SOLO CON JSON VALIDO con esta estructura exacta:
{
  "ai_intro": "150-200 palabras...",
  "ai_local_context": "200-300 palabras...",
  "ai_service_details": "200-300 palabras...",
  "ai_pricing_info": "150-200 palabras...",
  "ai_prevention_tips": "200-250 palabras...",
  "ai_faqs": [{"q": "pregunta", "a": "respuesta 80-120 palabras"}, ...5-7 items],
  "ai_neighborhood_info": "150-200 palabras...",
  "ai_seasonal_tips": "150-200 palabras...",
  "ai_emergency_guide": "200-250 palabras..."
}`;
}

// ============================================================
// OPENAI API CALL
// ============================================================
async function callOpenAI(prompt, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
          max_tokens: 4000,
          response_format: { type: "json_object" },
        }),
      });

      if (res.status === 429) {
        const wait = Math.min(2000 * Math.pow(2, attempt), 30000);
        console.log(`  [RATE LIMIT] Waiting ${wait / 1000}s...`);
        await sleep(wait);
        continue;
      }

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`OpenAI API error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const text = data.choices[0]?.message?.content;
      if (!text) throw new Error("Empty response from OpenAI");

      return JSON.parse(text);
    } catch (err) {
      if (attempt === retries - 1) throw err;
      const wait = 1000 * Math.pow(2, attempt);
      console.log(`  [RETRY ${attempt + 1}/${retries}] ${err.message}. Waiting ${wait / 1000}s...`);
      await sleep(wait);
    }
  }
}

// ============================================================
// DATABASE INSERT
// ============================================================
async function insertContent(item, content) {
  const pageUrl = item.pageType === "problem"
    ? `/problema/${item.professionId}/${item.problemId}/${item.citySlug}`
    : `/${item.professionId}/${item.citySlug}`;

  const allText = [
    content.ai_intro, content.ai_local_context, content.ai_service_details,
    content.ai_pricing_info, content.ai_prevention_tips, content.ai_neighborhood_info,
    content.ai_seasonal_tips, content.ai_emergency_guide,
    ...(content.ai_faqs || []).map(f => `${f.q} ${f.a}`),
  ].join(" ");
  const wordCount = allText.split(/\s+/).filter(Boolean).length;

  // Use parameterized query via pg wire protocol (neon serverless HTTP)
  const query = `
    INSERT INTO page_content (
      profession_id, city_slug, problem_id, page_url,
      ai_intro, ai_local_context, ai_service_details, ai_pricing_info,
      ai_prevention_tips, ai_faqs, ai_neighborhood_info, ai_seasonal_tips,
      ai_emergency_guide, ai_generated_at, ai_model, ai_word_count, ai_status
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,NOW(),'gpt-4o-mini',$14,'generated')
    ON CONFLICT (profession_id, city_slug, COALESCE(problem_id, ''), COALESCE(modifier, ''))
    DO UPDATE SET
      ai_intro = EXCLUDED.ai_intro,
      ai_local_context = EXCLUDED.ai_local_context,
      ai_service_details = EXCLUDED.ai_service_details,
      ai_pricing_info = EXCLUDED.ai_pricing_info,
      ai_prevention_tips = EXCLUDED.ai_prevention_tips,
      ai_faqs = EXCLUDED.ai_faqs,
      ai_neighborhood_info = EXCLUDED.ai_neighborhood_info,
      ai_seasonal_tips = EXCLUDED.ai_seasonal_tips,
      ai_emergency_guide = EXCLUDED.ai_emergency_guide,
      ai_generated_at = NOW(),
      ai_model = 'gpt-4o-mini',
      ai_word_count = EXCLUDED.ai_word_count,
      ai_status = 'generated',
      updated_at = NOW()
  `;

  const params = [
    item.professionId, item.citySlug, item.problemId, pageUrl,
    content.ai_intro, content.ai_local_context, content.ai_service_details,
    content.ai_pricing_info, content.ai_prevention_tips, JSON.stringify(content.ai_faqs),
    content.ai_neighborhood_info, content.ai_seasonal_tips, content.ai_emergency_guide,
    wordCount,
  ];

  await neonQuery(query, params);
}

// ============================================================
// NEON HTTP QUERY (no npm packages needed)
// ============================================================
async function neonQuery(sql, params = []) {
  // Parse connection string
  const url = new URL(NEON_DATABASE_URL);
  const host = url.hostname;
  const database = url.pathname.slice(1);
  const user = url.username;
  const password = url.password;

  const endpoint = `https://${host}/sql`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Neon-Connection-String": NEON_DATABASE_URL,
    },
    body: JSON.stringify({
      query: sql,
      params: params,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Neon query error ${res.status}: ${errText}`);
  }

  return await res.json();
}

async function checkExisting(professionId, citySlug, problemId) {
  const result = await neonQuery(
    `SELECT id FROM page_content WHERE profession_id = $1 AND city_slug = $2 AND COALESCE(problem_id, '') = $3 AND ai_status = 'generated' LIMIT 1`,
    [professionId, citySlug, problemId || ""]
  );
  return result.rows && result.rows.length > 0;
}

// ============================================================
// CONCURRENCY HELPERS
// ============================================================
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function processWithConcurrency(items, concurrency, fn) {
  let idx = 0;
  let completed = 0;
  let errors = 0;
  const total = items.length;
  const startTime = Date.now();

  async function worker() {
    while (idx < total) {
      const i = idx++;
      const item = items[i];
      try {
        await fn(item, i);
        completed++;
      } catch (err) {
        errors++;
        console.error(`  [ERROR] #${i} ${item.professionId}/${item.citySlug}: ${err.message}`);
      }

      // Progress every 50 items
      if ((completed + errors) % 50 === 0) {
        const elapsed = (Date.now() - startTime) / 1000;
        const rate = (completed + errors) / elapsed;
        const remaining = (total - completed - errors) / rate;
        console.log(
          `  [PROGRESS] ${completed + errors}/${total} (${completed} ok, ${errors} err) | ` +
          `${rate.toFixed(1)} items/s | ETA: ${formatTime(remaining)}`
        );
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  return { completed, errors, total };
}

function formatTime(seconds) {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${(seconds / 3600).toFixed(1)}h`;
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log("=== PRONTO-24 BULK CONTENT GENERATOR ===\n");

  const fullQueue = buildQueue();
  console.log(`Total pages in queue: ${fullQueue.length}`);
  console.log(`Concurrency: ${CONCURRENCY}`);
  console.log(`Skip existing: ${SKIP_EXISTING}`);
  console.log(`Start from: ${START_FROM}\n`);

  if (DRY_RUN) {
    const cityPages = fullQueue.filter(q => q.pageType === "city").length;
    const problemPages = fullQueue.filter(q => q.pageType === "problem").length;
    console.log(`City pages: ${cityPages}`);
    console.log(`Problem pages: ${problemPages}`);
    console.log(`\nEstimated time at ${CONCURRENCY} concurrency: ~${formatTime(fullQueue.length / CONCURRENCY * 3)}`);
    return;
  }

  // Slice queue if START_FROM
  let queue = fullQueue.slice(START_FROM);
  console.log(`Processing ${queue.length} items (after START_FROM=${START_FROM})\n`);

  // Filter existing if SKIP_EXISTING
  if (SKIP_EXISTING) {
    console.log("Checking existing content in DB (this may take a minute)...");
    const batchSize = 100;
    const filtered = [];
    for (let i = 0; i < queue.length; i += batchSize) {
      const batch = queue.slice(i, i + batchSize);
      const checks = await Promise.all(
        batch.map(item => checkExisting(item.professionId, item.citySlug, item.problemId)
          .then(exists => ({ item, exists }))
          .catch(() => ({ item, exists: false }))
        )
      );
      for (const { item, exists } of checks) {
        if (!exists) filtered.push(item);
      }
      if (i % 1000 === 0 && i > 0) {
        console.log(`  Checked ${i}/${queue.length}... (${filtered.length} pending)`);
      }
    }
    console.log(`Found ${queue.length - filtered.length} existing, ${filtered.length} to generate\n`);
    queue = filtered;
  }

  if (queue.length === 0) {
    console.log("Nothing to generate! All pages already exist.");
    return;
  }

  // Process
  console.log(`Starting generation of ${queue.length} pages...\n`);
  const startTime = Date.now();

  const result = await processWithConcurrency(queue, CONCURRENCY, async (item, i) => {
    const prompt = buildPrompt(item.professionId, item.citySlug, item.pageType, item.problemId);
    const content = await callOpenAI(prompt);
    await insertContent(item, content);
  });

  const elapsed = (Date.now() - startTime) / 1000;
  console.log(`\n=== DONE ===`);
  console.log(`Completed: ${result.completed}/${result.total}`);
  console.log(`Errors: ${result.errors}`);
  console.log(`Time: ${formatTime(elapsed)}`);
  console.log(`Rate: ${(result.completed / elapsed).toFixed(1)} pages/sec`);
}

main().catch(err => {
  console.error("FATAL:", err);
  process.exit(1);
});
