/** Categorias na ordem do corredor do supermercado */
var CATEGORIES = [
  { id: "higiene", emoji: "🧴", label: "Higiene Pessoal" },
  { id: "limpeza", emoji: "🧽", label: "Limpeza da Casa" },
  { id: "carnes", emoji: "🍗", label: "Carnes e Aves" },
  { id: "peixes", emoji: "🐟", label: "Peixes e Frutos do Mar" },
  { id: "mercearia", emoji: "🌾", label: "Mercearia e Básicos" },
  { id: "graos", emoji: "🍝", label: "Massas, Grãos e Cereais" },
  { id: "enlatados", emoji: "🥫", label: "Enlatados e Conservas" },
  { id: "congelados", emoji: "🧊", label: "Congelados" },
  { id: "laticinios", emoji: "🥛", label: "Laticínios e Ovos" },
  { id: "verduras", emoji: "🥬", label: "Verduras e Legumes" },
  { id: "frutas", emoji: "🍎", label: "Frutas" },
  { id: "padaria", emoji: "🧀", label: "Padaria e Frios" },
  { id: "bebidas", emoji: "🥤", label: "Bebidas" },
  { id: "snacks", emoji: "🍪", label: "Snacks e Doces" },
  { id: "temperos", emoji: "🌶️", label: "Temperos e Condimentos" },
  { id: "pet", emoji: "🐾", label: "Pet Shop" },
  { id: "bebe", emoji: "👶", label: "Bebê e Infantil" },
  { id: "casa", emoji: "🏠", label: "Casa e Utilidades" },
  { id: "farmacia", emoji: "💊", label: "Farmácia e Saúde" },
  { id: "outros", emoji: "📦", label: "Outros" },
];

/** Palavra-chave → id da categoria (matching por substring, maior palavra vence) */
var KEYWORDS = {
  // Higiene
  "papel higienico": "higiene", "papel higiênico": "higiene", "papel hig": "higiene",
  "sabonete liquido": "higiene", "sabonete líquido": "higiene", sabonete: "higiene",
  "creme dental": "higiene", pasta: "higiene", escova: "higiene", "fio dental": "higiene",
  shampoo: "higiene", condicionador: "higiene", "roll on": "higiene", "roll-on": "higiene",
  desodorante: "higiene", absorvente: "higiene", barbeador: "higiene", lâmina: "higiene",
  lamina: "higiene", aparelho: "higiene", cotonete: "higiene", algodao: "higiene",
  algodão: "higiene", hidratante: "higiene", "protetor solar": "higiene",
  "creme de barbear": "higiene", perfume: "higiene", colônia: "higiene", colonia: "higiene",

  // Limpeza
  "agua sanitaria": "limpeza", "água sanitária": "limpeza", sanitária: "limpeza",
  desinfetante: "limpeza", detergente: "limpeza", "multiuso": "limpeza",
  "limpa vidro": "limpeza", "limpa-vidro": "limpeza", amaciante: "limpeza",
  alvejante: "limpeza", esponja: "limpeza", "pano de chao": "limpeza",
  "pano de chão": "limpeza", vassoura: "limpeza", rodo: "limpeza", balde: "limpeza",
  "saco de lixo": "limpeza", "lixo": "limpeza", "veja": "limpeza", "ajax": "limpeza",
  "pinho sol": "limpeza", "pinho-sol": "limpeza", "limpa banheiro": "limpeza",
  "desengordurante": "limpeza", "limpa forno": "limpeza", "lustra moveis": "limpeza",
  "lustra móveis": "limpeza", "sabao em po": "limpeza", "sabão em pó": "limpeza",
  "sabao em barra": "limpeza", "sabão em barra": "limpeza", "agua oxigenada": "limpeza",
  "água oxigenada": "limpeza", "limpa alumínio": "limpeza", "limpa aluminio": "limpeza",

  // Carnes
  "carne de boi": "carnes", "carne moida": "carnes", "carne moída": "carnes",
  "carne": "carnes", alcatra: "carnes", picanha: "carnes", contrafilé: "carnes",
  contrafilé: "carnes", patinho: "carnes", maminha: "carnes", fraldinha: "carnes",
  "file mignon": "carnes", "filé mignon": "carnes", costela: "carnes", acém: "carnes",
  acem: "carnes", paleta: "carnes", lagarto: "carnes", cupim: "carnes",
  "frango": "carnes", "file de frango": "carnes", "filé de frango": "carnes",
  "peito de frango": "carnes", "coxa de frango": "carnes", "sobrecoxa": "carnes",
  "asa de frango": "carnes", "carne de porco": "carnes", lombo: "carnes",
  pernil: "carnes", bacon: "carnes", linguiça: "carnes", linguica: "carnes",
  salsicha: "carnes", hamburguer: "carnes", hambúrguer: "carnes", "carne seca": "carnes",
  calabresa: "carnes", mortadela: "padaria", presunto: "padaria", salame: "padaria",
  peru: "padaria", "peito de peru": "padaria", nuggets: "congelados", empanado: "congelados",

  // Peixes
  peixe: "peixes", salmão: "peixes", salmao: "peixes", tilápia: "peixes", tilapia: "peixes",
  sardinha: "peixes", atum: "peixes", bacalhau: "peixes", camarão: "peixes", camarao: "peixes",
  lula: "peixes", polvo: "peixes", "frutos do mar": "peixes", marisco: "peixes",

  // Mercearia
  arroz: "mercearia", feijão: "mercearia", feijao: "mercearia", "leite em po": "mercearia",
  "leite em pó": "mercearia", açucar: "mercearia", acucar: "mercearia", sal: "mercearia",
  farinha: "mercearia", "farinha de trigo": "mercearia", "farinha de mandioca": "mercearia",
  "oleo de soja": "mercearia", "óleo de soja": "mercearia", "oleo": "mercearia", "óleo": "mercearia",
  "azeite": "mercearia", vinagre: "mercearia", "fermento": "mercearia", "fermento biologico": "mercearia",
  "fermento biológico": "mercearia", "fermento quimico": "mercearia", "fermento químico": "mercearia",
  "extrato de tomate": "mercearia", molho: "mercearia", "catchup": "mercearia", ketchup: "mercearia",
  mostarda: "temperos", maionese: "temperos", "creme de leite": "mercearia",
  "leite condensado": "mercearia", "leite de coco": "mercearia", amido: "mercearia",
  "amido de milho": "mercearia", maizena: "mercearia", fuba: "mercearia", polvilho: "mercearia",
  tapioca: "mercearia", aveia: "graos", granola: "graos", "cafe": "mercearia", "café": "mercearia",
  "capsula de cafe": "mercearia", "cápsula de café": "mercearia", achocolatado: "mercearia",
  nescau: "mercearia", toddy: "mercearia", "chá": "mercearia", cha: "mercearia",

  // Grãos e massas
  macarrão: "graos", macarrao: "graos", espaguete: "graos", penne: "graos", parafuso: "graos",
  lasanha: "graos", nhoque: "graos", "massa fresca": "graos", "massa de lasanha": "graos",
  lentilha: "graos", grão: "graos", "grão de bico": "graos", "grao de bico": "graos",
  milho: "graos", "milho de pipoca": "graos", pipoca: "snacks", quinoa: "graos",

  // Enlatados
  enlatado: "enlatados", conserva: "enlatados", "milho verde": "enlatados",
  "ervilha enlatada": "enlatados", ervilha: "enlatados", "palmito": "enlatados",
  "atum enlatado": "enlatados", "sardinha enlatada": "enlatados", "peito de peru": "padaria",

  // Congelados
  congelado: "congelados", sorvete: "congelados", picolé: "congelados", picole: "congelados",
  pizza: "congelados", "batata frita": "congelados", "batata congelada": "congelados",
  hambúrguer: "congelados", "polpa de fruta": "congelados", "polpa": "congelados",
  lasanha: "congelados", "vegetais congelados": "congelados",

  // Laticínios
  leite: "laticinios", iogurte: "laticinios", yogurt: "laticinios", queijo: "padaria",
  manteiga: "laticinios", margarina: "laticinios", requeijão: "laticinios", requeijao: "laticinios",
  "cream cheese": "laticinios", ricota: "laticinios", muçarela: "padaria", mussarela: "padaria",
  mozarela: "padaria", parmesão: "padaria", parmesao: "padaria", ovo: "laticinios", ovos: "laticinios",
  "leite fermentado": "laticinios", yakult: "laticinios", coalhada: "laticinios",

  // Verduras
  cenoura: "verduras", batata: "verduras", cebola: "verduras", tomate: "verduras",
  alface: "verduras", couve: "verduras", coentro: "verduras", salsa: "verduras",
  cebolinha: "verduras", alho: "verduras", "alho poró": "verduras", "alho poro": "verduras",
  pimentão: "verduras", pimentao: "verduras", abobrinha: "verduras", berinjela: "verduras",
  chuchu: "verduras", pepino: "verduras", repolho: "verduras", brócolis: "verduras",
  brocolis: "verduras", "couve-flor": "verduras", "couve flor": "verduras", espinafre: "verduras",
  rúcula: "verduras", rucula: "verduras", agrião: "verduras", agriao: "verduras",
  mandioca: "verduras", inhame: "verduras", "batata-doce": "verduras", "batata doce": "verduras",
  abóbora: "verduras", abobora: "verduras", jiló: "verduras", jilo: "verduras",
  quiabo: "verduras", vagem: "verduras", "milho verde": "verduras", "milho na espiga": "verduras",
  beterraba: "verduras", nabo: "verduras", palmito: "verduras", cogumelo: "verduras",
  champignon: "verduras", shimeji: "verduras", shitake: "verduras",

  // Frutas
  uva: "frutas", maçã: "frutas", maca: "frutas", banana: "frutas", laranja: "frutas",
  limão: "frutas", limao: "frutas", morango: "frutas", manga: "frutas", abacaxi: "frutas",
  melancia: "frutas", melão: "frutas", melao: "frutas", mamão: "frutas", mamao: "frutas",
  pera: "frutas", pêssego: "frutas", pessego: "frutas", ameixa: "frutas", kiwi: "frutas",
  abacate: "frutas", goiaba: "frutas", maracujá: "frutas", maracuja: "frutas", acerola: "frutas",
  caju: "frutas", tangerina: "frutas", mexerica: "frutas", bergamota: "frutas",
  "uva passa": "frutas", "frutas secas": "frutas", "ameixa seca": "frutas",

  // Padaria
  pães: "padaria", paes: "padaria", pão: "padaria", pao: "padaria",
  "pão de forma": "padaria", "pao de forma": "padaria", "paes de forma": "padaria",
  "pão francês": "padaria", "pao frances": "padaria", "paes frances": "padaria",
  "paes franceses": "padaria", bisnaga: "padaria", bisnagas: "padaria",
  torrada: "padaria", torradas: "padaria", bolo: "padaria", bolos: "padaria",
  "pão de queijo": "padaria", "paes de queijo": "padaria",
  croissant: "padaria", brioche: "padaria", baguete: "padaria", baguetes: "padaria",
  queijo: "padaria", queijos: "padaria", mussarela: "padaria", presunto: "padaria",
  presuntos: "padaria", mortadela: "padaria", salame: "padaria", peito: "padaria",
  "manteiga de garrafa": "padaria",

  // Bebidas
  refrigerante: "bebidas", coca: "bebidas", pepsi: "bebidas", guaraná: "bebidas", guarana: "bebidas",
  sprite: "bebidas", fanta: "bebidas", "água": "bebidas", agua: "bebidas", "água mineral": "bebidas",
  "agua mineral": "bebidas", "água com gás": "bebidas", suco: "bebidas", "suco de caixinha": "bebidas",
  "suco integral": "bebidas", cerveja: "bebidas", vinho: "bebidas", energético: "bebidas",
  energetico: "bebidas", "red bull": "bebidas", isotônico: "bebidas", isotonico: "bebidas",
  "chá gelado": "bebidas", "cha gelado": "bebidas", kombucha: "bebidas",

  // Snacks
  biscoito: "snacks", "creme cracker": "snacks", "água e sal": "snacks", "agua e sal": "snacks",
  bolacha: "snacks", wafer: "snacks", "biscoito recheado": "snacks", salgadinho: "snacks",
  doritos: "snacks", cheetos: "snacks", ruffles: "snacks", "batata chips": "snacks",
  "batata palha": "snacks", amendoim: "snacks", castanha: "snacks", chocolate: "snacks",
  bala: "snacks", chiclete: "snacks", pirulito: "snacks", paçoca: "snacks", pacoca: "snacks",
  "paçoquinha": "snacks", "pacoca": "snacks", torrone: "snacks", "barra de cereal": "snacks",
  cereal: "snacks", "nutella": "snacks", geleia: "snacks", "doce de leite": "snacks",
  mel: "temperos", pipoca: "snacks", "milho para pipoca": "snacks",

  // Temperos
  pimenta: "temperos", "pimenta do reino": "temperos", cominho: "temperos", colorau: "temperos",
  páprica: "temperos", paprica: "temperos", orégano: "temperos", oregano: "temperos",
  manjericão: "temperos", manjericao: "temperos", louro: "temperos", curry: "temperos",
  "tempero completo": "temperos", "tempero pronto": "temperos", caldo: "temperos",
  "caldo de galinha": "temperos", "caldo de carne": "temperos", "caldo de legumes": "temperos",
  shoyu: "temperos", "molho shoyu": "temperos", "molho inglês": "temperos", "molho ingles": "temperos",
  wasabi: "temperos", gengibre: "temperos", canela: "temperos", baunilha: "temperos",
  "noz-moscada": "temperos", cravo: "temperos", açafrão: "temperos", acafrao: "temperos",

  // Pet
  ração: "pet", racao: "pet", "ração para cachorro": "pet", "ração para gato": "pet",
  "areia para gato": "pet", "areia sanitária": "pet", petisco: "pet", "osso para cachorro": "pet",

  // Bebê
  fralda: "bebe", "fralda descartável": "bebe", "fralda descartavel": "bebe",
  "lenço umedecido": "bebe", "lenco umedecido": "bebe", mamadeira: "bebe",
  "papinha": "bebe", "leite infantil": "bebe", "fórmula infantil": "bebe", "formula infantil": "bebe",

  // Casa
  panela: "casa", frigideira: "casa", talher: "casa", garfo: "casa", faca: "casa",
  colher: "casa", prato: "casa", copo: "casa", "copo descartável": "casa", "copo descartavel": "casa",
  prato: "casa", "prato descartável": "casa", "guardanapo": "casa", filtro: "casa",
  "papel alumínio": "casa", "papel aluminio": "casa", "papel manteiga": "casa",
  "filme pvc": "casa", "filme plástico": "casa", "filme plastico": "casa",
  isqueiro: "casa", fósforo: "casa", fosforo: "casa", vela: "casa", pilha: "casa",
  lâmpada: "casa", lampada: "casa", extensão: "casa", extensao: "casa",
  "pote hermético": "casa", "pote hermetico": "casa", "forma de gelo": "casa",
  "escorredor": "casa", "ralador": "casa", "abridor": "casa", "tábua": "casa", tabua: "casa",

  // Farmácia
  remédio: "farmacia", remedio: "farmacia", "vitamina": "farmacia", "suplemento": "farmacia",
  bandaid: "farmacia", curativo: "farmacia", gazes: "farmacia", gaza: "farmacia",
  analgésico: "farmacia", analgesico: "farmacia", dipirona: "farmacia", paracetamol: "farmacia",
  ibuprofeno: "farmacia", antigripal: "farmacia", "teste de gravidez": "farmacia",
  preservativo: "farmacia", camisinha: "farmacia", repelente: "farmacia",
  "protetor labial": "farmacia", "lip balm": "farmacia",
};
