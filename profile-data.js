/** Regiões, estados e opções de gosto para o perfil culinário */

var REGIONS = [
  { id: "nordeste", label: "Nordeste" },
  { id: "norte", label: "Norte" },
  { id: "sudeste", label: "Sudeste" },
  { id: "sul", label: "Sul" },
  { id: "centro-oeste", label: "Centro-Oeste" },
];

var STATES_BY_REGION = {
  nordeste: [
    "sergipe", "bahia", "pernambuco", "ceara", "alagoas", "paraiba",
    "rio grande do norte", "maranhao", "piaui",
  ],
  norte: ["para", "amazonas", "amapa", "roraima", "acre", "rondonia", "tocantins"],
  sudeste: ["sao paulo", "rio de janeiro", "minas gerais", "espirito santo"],
  sul: ["parana", "santa catarina", "rio grande do sul"],
  "centro-oeste": ["mato grosso", "mato grosso do sul", "goias", "distrito federal"],
};

var STATE_LABELS = {
  sergipe: "Sergipe", bahia: "Bahia", pernambuco: "Pernambuco", ceara: "Ceará",
  alagoas: "Alagoas", paraiba: "Paraíba", "rio grande do norte": "Rio Grande do Norte",
  maranhao: "Maranhão", piaui: "Piauí", para: "Pará", amazonas: "Amazonas",
  amapa: "Amapá", roraima: "Roraima", acre: "Acre", rondonia: "Rondônia",
  tocantins: "Tocantins", "sao paulo": "São Paulo", "rio de janeiro": "Rio de Janeiro",
  "minas gerais": "Minas Gerais", "espirito santo": "Espírito Santo",
  parana: "Paraná", "santa catarina": "Santa Catarina", "rio grande do sul": "Rio Grande do Sul",
  "mato grosso": "Mato Grosso", "mato grosso do sul": "Mato Grosso do Sul",
  goias: "Goiás", "distrito federal": "Distrito Federal",
};

/**
 * meals: em quais refeições o chip aparece (vazio = todas)
 */
var TASTE_OPTIONS = [
  /* Café da manhã */
  { id: "pao", label: "Pão", emoji: "🍞", meals: ["cafe", "janta"] },
  { id: "manteiga", label: "Manteiga", emoji: "🧈", meals: ["cafe", "janta"] },
  { id: "cuscuz", label: "Cuscuz", emoji: "🌽", meals: ["cafe", "janta"] },
  { id: "ovo", label: "Ovo", emoji: "🥚", meals: ["cafe", "janta"] },
  { id: "biscoito", label: "Biscoito", emoji: "🍪", meals: ["cafe"] },
  { id: "cafe", label: "Café", emoji: "☕", meals: ["cafe"] },
  { id: "leite", label: "Leite", emoji: "🥛", meals: ["cafe"] },
  { id: "cha", label: "Chá", emoji: "🍵", meals: ["cafe"] },
  { id: "suco", label: "Suco", emoji: "🧃", meals: ["cafe"] },
  { id: "tapioca", label: "Tapioca", emoji: "🫓", meals: ["cafe", "janta"] },
  { id: "queijo", label: "Queijo", emoji: "🧀", meals: ["cafe", "janta"] },
  { id: "presunto", label: "Presunto", emoji: "🥓", meals: ["cafe", "janta"] },
  { id: "mortadela", label: "Mortadela", emoji: "🍖", meals: ["cafe", "janta"] },
  { id: "frutas", label: "Frutas", emoji: "🍎", meals: ["cafe"] },
  { id: "banana", label: "Banana", emoji: "🍌", meals: ["cafe"] },
  { id: "mamao", label: "Mamão", emoji: "🥭", meals: ["cafe"] },
  { id: "manga", label: "Manga", emoji: "🥭", meals: ["cafe"] },
  { id: "aveia", label: "Aveia", emoji: "🥣", meals: ["cafe"] },
  { id: "granola", label: "Granola", emoji: "🌾", meals: ["cafe"] },
  { id: "iogurte", label: "Iogurte", emoji: "🥛", meals: ["cafe"] },
  { id: "doce", label: "Doce", emoji: "🍰", meals: ["cafe"] },
  { id: "mel", label: "Mel", emoji: "🍯", meals: ["cafe"] },
  { id: "bolo", label: "Bolo", emoji: "🎂", meals: ["cafe"] },
  { id: "torrada", label: "Torrada", emoji: "🍞", meals: ["cafe"] },
  { id: "mingau", label: "Mingau", emoji: "🥣", meals: ["cafe"] },
  { id: "paodequeijo", label: "Pão de queijo", emoji: "🧀", meals: ["cafe", "janta"] },
  { id: "waffle", label: "Waffle/Panqueca", emoji: "🥞", meals: ["cafe"] },
  { id: "vitamina", label: "Vitamina", emoji: "🥤", meals: ["cafe"] },

  /* Almoço */
  { id: "arroz", label: "Arroz", emoji: "🍚", meals: ["almoco", "janta"] },
  { id: "feijao", label: "Feijão", emoji: "🫘", meals: ["almoco", "janta"] },
  { id: "carne", label: "Carne", emoji: "🥩", meals: ["almoco", "janta", "cafe"] },
  { id: "frango", label: "Frango", emoji: "🍗", meals: ["almoco", "janta", "cafe"] },
  { id: "peixe", label: "Peixe", emoji: "🐟", meals: ["almoco", "janta"] },
  { id: "camarao", label: "Camarão", emoji: "🦐", meals: ["almoco", "janta"] },
  { id: "porco", label: "Carne de porco", emoji: "🐷", meals: ["almoco"] },
  { id: "linguica", label: "Linguiça", emoji: "🌭", meals: ["almoco", "janta"] },
  { id: "legumes", label: "Legumes", emoji: "🥬", meals: ["almoco", "janta"] },
  { id: "salada", label: "Salada", emoji: "🥗", meals: ["almoco", "janta"] },
  { id: "mandioca", label: "Mandioca/Aipim", emoji: "🥔", meals: ["almoco"] },
  { id: "farinha", label: "Farinha", emoji: "🌾", meals: ["almoco"] },
  { id: "macarrao", label: "Macarrão", emoji: "🍝", meals: ["almoco", "janta"] },
  { id: "pure", label: "Purê de batata", emoji: "🥔", meals: ["almoco"] },
  { id: "batata", label: "Batata", emoji: "🥔", meals: ["almoco", "janta"] },
  { id: "milho", label: "Milho", emoji: "🌽", meals: ["almoco"] },
  { id: "polenta", label: "Polenta", emoji: "🌽", meals: ["almoco"] },
  { id: "pirao", label: "Pirão", emoji: "🍲", meals: ["almoco"] },
  { id: "moqueca", label: "Moqueca", emoji: "🍲", meals: ["almoco"] },
  { id: "feijoada", label: "Feijoada", emoji: "🍲", meals: ["almoco"] },
  { id: "churrasco", label: "Churrasco", emoji: "🔥", meals: ["almoco"] },
  { id: "estrogonofe", label: "Estrogonofe", emoji: "🍛", meals: ["almoco", "janta"] },
  { id: "lasanha", label: "Lasanha", emoji: "🍝", meals: ["almoco", "janta"] },
  { id: "caldo", label: "Caldo/Sopa", emoji: "🍲", meals: ["almoco", "janta"] },

  /* Janta */
  { id: "sopa", label: "Sopa", emoji: "🍲", meals: ["janta"] },
  { id: "sanduiche", label: "Sanduíche", emoji: "🥪", meals: ["janta"] },
  { id: "pizza", label: "Pizza", emoji: "🍕", meals: ["janta"] },
  { id: "hamburguer", label: "Hambúrguer", emoji: "🍔", meals: ["janta"] },
  { id: "omelete", label: "Omelete", emoji: "🍳", meals: ["janta", "cafe"] },
  { id: "crepioca", label: "Crepioca", emoji: "🫓", meals: ["janta", "cafe"] },
  { id: "salgado", label: "Salgado/Enrolado", emoji: "🥟", meals: ["janta", "cafe"] },
  { id: "pastel", label: "Pastel", emoji: "🥟", meals: ["janta"] },
  { id: "pipoca", label: "Pipoca", emoji: "🍿", meals: ["janta"] },
  { id: "wrap", label: "Wrap/Tortilla", emoji: "🌯", meals: ["janta"] },
  { id: "yakisoba", label: "Yakisoba", emoji: "🍜", meals: ["janta"] },
  { id: "risoto", label: "Risoto", emoji: "🍚", meals: ["janta"] },
  { id: "escondidinho", label: "Escondidinho", emoji: "🥘", meals: ["janta", "almoco"] },
];

var MEALS = [
  { id: "cafe", label: "Café da manhã", emoji: "☀️" },
  { id: "almoco", label: "Almoço", emoji: "🍽️" },
  { id: "janta", label: "Janta", emoji: "🌙" },
];

/** Palavras-chave para cruzar gostos do perfil com receitas */
var TASTE_KEYWORDS = {
  pao: ["pao", "pão", "torrada", "bisnaga"],
  manteiga: ["manteiga"],
  cuscuz: ["cuscuz"],
  ovo: ["ovo", "ovos", "omelete"],
  biscoito: ["biscoito", "bolacha"],
  cafe: ["cafe", "café"],
  leite: ["leite"],
  cha: ["cha", "chá"],
  suco: ["suco"],
  tapioca: ["tapioca", "goma"],
  queijo: ["queijo", "requeijao", "requeijão"],
  presunto: ["presunto"],
  mortadela: ["mortadela"],
  frutas: ["fruta", "frutas"],
  banana: ["banana"],
  mamao: ["mamao", "mamão"],
  manga: ["manga"],
  aveia: ["aveia"],
  granola: ["granola"],
  iogurte: ["iogurte"],
  doce: ["doce", "goiabada"],
  mel: ["mel"],
  bolo: ["bolo"],
  torrada: ["torrada"],
  mingau: ["mingau", "canjica"],
  paodequeijo: ["pao de queijo", "pão de queijo"],
  waffle: ["waffle", "panqueca"],
  vitamina: ["vitamina"],
  arroz: ["arroz"],
  feijao: ["feijao", "feijão"],
  carne: ["carne", "boi", "bovina", "picadinho", "alcatra", "moida", "moída"],
  frango: ["frango", "galinha", "franguinho"],
  peixe: ["peixe", "tilapia", "tilápia", "bacalhau", "pescada", "moqueca de peixe", "atum"],
  camarao: ["camarao", "camarão", "camaroes", "camarões"],
  porco: ["porco", "lombo", "pernil"],
  linguica: ["linguica", "linguiça", "salsicha"],
  legumes: ["legume", "cenoura", "abobrinha", "berinjela", "chuchu"],
  salada: ["salada", "alface", "tomate", "agriao", "ágrião"],
  mandioca: ["mandioca", "aipim", "macaxeira"],
  farinha: ["farinha"],
  macarrao: ["macarrao", "macarrão", "espaguete", "penne"],
  pure: ["pure", "purê"],
  batata: ["batata"],
  milho: ["milho"],
  polenta: ["polenta"],
  pirao: ["pirao", "pirão"],
  moqueca: ["moqueca"],
  feijoada: ["feijoada"],
  churrasco: ["churrasco", "espetinho"],
  estrogonofe: ["estrogonofe"],
  lasanha: ["lasanha"],
  caldo: ["caldo", "canja"],
  sopa: ["sopa"],
  sanduiche: ["sanduiche", "sanduíche", "misto quente"],
  pizza: ["pizza"],
  hamburguer: ["hamburguer", "hambúrguer"],
  omelete: ["omelete"],
  crepioca: ["crepioca"],
  salgado: ["salgado", "coxinha", "enrolado"],
  pastel: ["pastel"],
  pipoca: ["pipoca"],
  wrap: ["wrap", "tortilla"],
  yakisoba: ["yakisoba"],
  risoto: ["risoto"],
  escondidinho: ["escondidinho"],
};

/** Ingredientes/pratos que só aparecem se o usuário marcou no perfil */
var STRICT_TASTES = [
  "camarao", "peixe", "porco", "carne", "frango", "linguica",
  "moqueca", "feijoada", "churrasco", "pizza", "hamburguer",
  "yakisoba", "pastel", "salgado", "risoto", "escondidinho",
  "feijao",
];

function tastesForMeal(mealId) {
  var seen = {};
  var out = [];
  TASTE_OPTIONS.forEach(function (opt) {
    if (opt.meals && opt.meals.indexOf(mealId) === -1) return;
    if (seen[opt.id]) return;
    seen[opt.id] = true;
    out.push(opt);
  });
  return out;
}
