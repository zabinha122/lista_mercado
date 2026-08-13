/**
 * Preços de referência — gerado por scripts/scrape_prices.py
 * Fontes: Buscapé (quando disponível) + médias curadas do varejo BR
 * Valores aproximados para estimativa; podem variar por região e loja.
 */
var CATEGORY_PRICES = {
  "higiene": 14.9,
  "limpeza": 9.9,
  "carnes": 28.9,
  "peixes": 34.9,
  "mercearia": 11.9,
  "graos": 7.9,
  "enlatados": 8.9,
  "congelados": 18.9,
  "laticinios": 9.9,
  "verduras": 5.9,
  "frutas": 7.9,
  "padaria": 12.9,
  "bebidas": 8.9,
  "snacks": 6.9,
  "temperos": 5.9,
  "pet": 42.9,
  "bebe": 34.9,
  "casa": 15.9,
  "farmacia": 19.9,
  "outros": 10.9
};

var PRICE_KEYWORDS = {
  "papel higienico": {
    "price": 13.85,
    "unit": "pacote 12 rolos",
    "source": "buscape"
  },
  "papel higiênico": {
    "price": 13.85,
    "unit": "pacote 12 rolos",
    "source": "buscape"
  },
  "papel hig": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "sabonete liquido": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "sabonete líquido": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "sabonete": {
    "price": 2.49,
    "unit": "unidade",
    "source": "curado"
  },
  "creme dental": {
    "price": 6.9,
    "unit": "unidade",
    "source": "curado"
  },
  "pasta": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "escova": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fio dental": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "shampoo": {
    "price": 39.86,
    "unit": "frasco 325ml",
    "source": "buscape"
  },
  "condicionador": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "roll on": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "roll-on": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "desodorante": {
    "price": 14.25,
    "unit": "unidade",
    "source": "buscape"
  },
  "absorvente": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "barbeador": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lâmina": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lamina": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "aparelho": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cotonete": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "algodao": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "algodão": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "hidratante": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "protetor solar": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "creme de barbear": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "perfume": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "colônia": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "colonia": {
    "price": 14.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "agua sanitaria": {
    "price": 6.9,
    "unit": "garrafa 1L",
    "source": "curado"
  },
  "água sanitária": {
    "price": 6.9,
    "unit": "garrafa 1L",
    "source": "curado"
  },
  "sanitária": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "desinfetante": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "detergente": {
    "price": 2.99,
    "unit": "unidade",
    "source": "curado"
  },
  "multiuso": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "limpa vidro": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "limpa-vidro": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "amaciante": {
    "price": 18.31,
    "unit": "garrafa 2L",
    "source": "buscape"
  },
  "alvejante": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "esponja": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pano de chao": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pano de chão": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "vassoura": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "rodo": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "balde": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "saco de lixo": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lixo": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "veja": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ajax": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pinho sol": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pinho-sol": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "limpa banheiro": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "desengordurante": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "limpa forno": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lustra moveis": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lustra móveis": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "sabao em po": {
    "price": 26.9,
    "unit": "pacote 1kg",
    "source": "buscape"
  },
  "sabão em pó": {
    "price": 26.9,
    "unit": "pacote 1kg",
    "source": "buscape"
  },
  "sabao em barra": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "sabão em barra": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "agua oxigenada": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "água oxigenada": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "limpa alumínio": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "limpa aluminio": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "carne de boi": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "carne moida": {
    "price": 83.26,
    "unit": "kg",
    "source": "buscape"
  },
  "carne moída": {
    "price": 83.26,
    "unit": "kg",
    "source": "buscape"
  },
  "carne": {
    "price": 38.9,
    "unit": "kg",
    "source": "curado"
  },
  "alcatra": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "picanha": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "contrafilé": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "patinho": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "maminha": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fraldinha": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "file mignon": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "filé mignon": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "costela": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "acém": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "acem": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "paleta": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lagarto": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cupim": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "frango": {
    "price": 29.5,
    "unit": "kg",
    "source": "buscape"
  },
  "file de frango": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "filé de frango": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "peito de frango": {
    "price": 6.87,
    "unit": "kg",
    "source": "buscape"
  },
  "coxa de frango": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "sobrecoxa": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "asa de frango": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "carne de porco": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lombo": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pernil": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "bacon": {
    "price": 73.77,
    "unit": "kg",
    "source": "buscape"
  },
  "linguiça": {
    "price": 34.9,
    "unit": "kg",
    "source": "buscape"
  },
  "linguica": {
    "price": 34.9,
    "unit": "kg",
    "source": "buscape"
  },
  "salsicha": {
    "price": 12.9,
    "unit": "kg",
    "source": "curado"
  },
  "hamburguer": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "hambúrguer": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "carne seca": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "calabresa": {
    "price": 28.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "mortadela": {
    "price": 20.9,
    "unit": "kg",
    "source": "buscape"
  },
  "presunto": {
    "price": 6.21,
    "unit": "kg",
    "source": "buscape"
  },
  "salame": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "peru": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "peito de peru": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "nuggets": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "empanado": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "peixe": {
    "price": 46.55,
    "unit": "kg",
    "source": "buscape"
  },
  "salmão": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "salmao": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "tilápia": {
    "price": 31.26,
    "unit": "kg",
    "source": "buscape"
  },
  "tilapia": {
    "price": 31.26,
    "unit": "kg",
    "source": "buscape"
  },
  "sardinha": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "atum": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "bacalhau": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "camarão": {
    "price": 22.99,
    "unit": "kg",
    "source": "buscape"
  },
  "camarao": {
    "price": 22.99,
    "unit": "kg",
    "source": "buscape"
  },
  "lula": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "polvo": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "frutos do mar": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "marisco": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "arroz": {
    "price": 24.9,
    "unit": "pacote 5kg",
    "source": "curado"
  },
  "feijão": {
    "price": 9.9,
    "unit": "pacote 1kg",
    "source": "curado"
  },
  "feijao": {
    "price": 9.9,
    "unit": "pacote 1kg",
    "source": "curado"
  },
  "leite em po": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "leite em pó": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "açucar": {
    "price": 4.5,
    "unit": "pacote 1kg",
    "source": "curado"
  },
  "acucar": {
    "price": 4.5,
    "unit": "pacote 1kg",
    "source": "curado"
  },
  "sal": {
    "price": 3.2,
    "unit": "pacote 1kg",
    "source": "curado"
  },
  "farinha": {
    "price": 11.48,
    "unit": "pacote 1kg",
    "source": "buscape"
  },
  "farinha de trigo": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "farinha de mandioca": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "oleo de soja": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "óleo de soja": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "oleo": {
    "price": 7.9,
    "unit": "garrafa 900ml",
    "source": "curado"
  },
  "óleo": {
    "price": 7.9,
    "unit": "garrafa 900ml",
    "source": "curado"
  },
  "azeite": {
    "price": 28.61,
    "unit": "garrafa 500ml",
    "source": "buscape"
  },
  "vinagre": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fermento": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fermento biologico": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fermento biológico": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fermento quimico": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fermento químico": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "extrato de tomate": {
    "price": 3.9,
    "unit": "caixa 340g",
    "source": "curado"
  },
  "molho": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "catchup": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ketchup": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "mostarda": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "maionese": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "creme de leite": {
    "price": 4.9,
    "unit": "caixa 200g",
    "source": "curado"
  },
  "leite condensado": {
    "price": 7.9,
    "unit": "lata 395g",
    "source": "curado"
  },
  "leite de coco": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "amido": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "amido de milho": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "maizena": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fuba": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "polvilho": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "tapioca": {
    "price": 6.9,
    "unit": "pacote 500g",
    "source": "curado"
  },
  "aveia": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "granola": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cafe": {
    "price": 20.36,
    "unit": "pacote 500g",
    "source": "buscape"
  },
  "café": {
    "price": 20.36,
    "unit": "pacote 500g",
    "source": "buscape"
  },
  "capsula de cafe": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cápsula de café": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "achocolatado": {
    "price": 8.9,
    "unit": "pacote 400g",
    "source": "curado"
  },
  "nescau": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "toddy": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "chá": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cha": {
    "price": 11.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "macarrão": {
    "price": 4.9,
    "unit": "pacote 500g",
    "source": "curado"
  },
  "macarrao": {
    "price": 4.9,
    "unit": "pacote 500g",
    "source": "curado"
  },
  "espaguete": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "penne": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "parafuso": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lasanha": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "nhoque": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "massa fresca": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "massa de lasanha": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lentilha": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "grão": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "grão de bico": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "grao de bico": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "milho": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "milho de pipoca": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pipoca": {
    "price": 4.9,
    "unit": "pacote 500g",
    "source": "curado"
  },
  "quinoa": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "enlatado": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "conserva": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "milho verde": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ervilha enlatada": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ervilha": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "palmito": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "atum enlatado": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "sardinha enlatada": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "congelado": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "sorvete": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "picolé": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "picole": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pizza": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "batata frita": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "batata congelada": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "polpa de fruta": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "polpa": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "vegetais congelados": {
    "price": 18.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "leite": {
    "price": 9.29,
    "unit": "caixa 1L",
    "source": "buscape"
  },
  "iogurte": {
    "price": 3.9,
    "unit": "unidade",
    "source": "curado"
  },
  "yogurt": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "queijo": {
    "price": 24.9,
    "unit": "kg",
    "source": "buscape"
  },
  "manteiga": {
    "price": 16.62,
    "unit": "pote 200g",
    "source": "buscape"
  },
  "margarina": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "requeijão": {
    "price": 4.75,
    "unit": "pote 200g",
    "source": "buscape"
  },
  "requeijao": {
    "price": 4.75,
    "unit": "pote 200g",
    "source": "buscape"
  },
  "cream cheese": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ricota": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "muçarela": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "mussarela": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "mozarela": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "parmesão": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "parmesao": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ovo": {
    "price": 34.39,
    "unit": "dúzia",
    "source": "buscape"
  },
  "ovos": {
    "price": 14.9,
    "unit": "dúzia",
    "source": "curado"
  },
  "leite fermentado": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "yakult": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "coalhada": {
    "price": 9.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cenoura": {
    "price": 8.59,
    "unit": "kg",
    "source": "buscape"
  },
  "batata": {
    "price": 6.9,
    "unit": "kg",
    "source": "curado"
  },
  "cebola": {
    "price": 5.5,
    "unit": "kg",
    "source": "curado"
  },
  "tomate": {
    "price": 7.9,
    "unit": "kg",
    "source": "curado"
  },
  "alface": {
    "price": 4.9,
    "unit": "unidade",
    "source": "curado"
  },
  "couve": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "coentro": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "salsa": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cebolinha": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "alho": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "alho poró": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "alho poro": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pimentão": {
    "price": 7.9,
    "unit": "kg",
    "source": "buscape"
  },
  "pimentao": {
    "price": 7.9,
    "unit": "kg",
    "source": "buscape"
  },
  "abobrinha": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "berinjela": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "chuchu": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pepino": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "repolho": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "brócolis": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "brocolis": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "couve-flor": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "couve flor": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "espinafre": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "rúcula": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "rucula": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "agrião": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "agriao": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "mandioca": {
    "price": 7.9,
    "unit": "kg",
    "source": "curado"
  },
  "inhame": {
    "price": 8.9,
    "unit": "kg",
    "source": "curado"
  },
  "batata-doce": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "batata doce": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "abóbora": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "abobora": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "jiló": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "jilo": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "quiabo": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "vagem": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "milho na espiga": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "beterraba": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "nabo": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cogumelo": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "champignon": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "shimeji": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "shitake": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "uva": {
    "price": 36.81,
    "unit": "kg",
    "source": "buscape"
  },
  "maçã": {
    "price": 9.9,
    "unit": "kg",
    "source": "curado"
  },
  "maca": {
    "price": 9.9,
    "unit": "kg",
    "source": "curado"
  },
  "banana": {
    "price": 6.9,
    "unit": "kg",
    "source": "curado"
  },
  "laranja": {
    "price": 5.9,
    "unit": "kg",
    "source": "curado"
  },
  "limão": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "limao": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "morango": {
    "price": 38.61,
    "unit": "bandeja",
    "source": "buscape"
  },
  "manga": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "abacaxi": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "melancia": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "melão": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "melao": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "mamão": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "mamao": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pera": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pêssego": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pessego": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ameixa": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "kiwi": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "abacate": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "goiaba": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "maracujá": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "maracuja": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "acerola": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "caju": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "tangerina": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "mexerica": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "bergamota": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "uva passa": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "frutas secas": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ameixa seca": {
    "price": 7.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pães": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "paes": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pão": {
    "price": 12.9,
    "unit": "pacote",
    "source": "curado"
  },
  "pao": {
    "price": 12.9,
    "unit": "pacote",
    "source": "curado"
  },
  "pão de forma": {
    "price": 9.9,
    "unit": "pacote",
    "source": "curado"
  },
  "pao de forma": {
    "price": 9.9,
    "unit": "pacote",
    "source": "curado"
  },
  "paes de forma": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pão francês": {
    "price": 1.2,
    "unit": "unidade",
    "source": "curado"
  },
  "pao frances": {
    "price": 1.2,
    "unit": "unidade",
    "source": "curado"
  },
  "paes frances": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "paes franceses": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "bisnaga": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "bisnagas": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "torrada": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "torradas": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "bolo": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "bolos": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pão de queijo": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "paes de queijo": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "croissant": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "brioche": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "baguete": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "baguetes": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "queijos": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "presuntos": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "peito": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "manteiga de garrafa": {
    "price": 12.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "refrigerante": {
    "price": 2.02,
    "unit": "garrafa 2L",
    "source": "buscape"
  },
  "coca": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pepsi": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "guaraná": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "guarana": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "sprite": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fanta": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "água": {
    "price": 2.5,
    "unit": "garrafa 1,5L",
    "source": "curado"
  },
  "agua": {
    "price": 2.5,
    "unit": "garrafa 1,5L",
    "source": "curado"
  },
  "água mineral": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "agua mineral": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "água com gás": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "suco": {
    "price": 6.9,
    "unit": "caixa 1L",
    "source": "curado"
  },
  "suco de caixinha": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "suco integral": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cerveja": {
    "price": 8.21,
    "unit": "lata 350ml",
    "source": "buscape"
  },
  "vinho": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "energético": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "energetico": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "red bull": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "isotônico": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "isotonico": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "chá gelado": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cha gelado": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "kombucha": {
    "price": 8.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "biscoito": {
    "price": 4.5,
    "unit": "pacote",
    "source": "curado"
  },
  "creme cracker": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "água e sal": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "agua e sal": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "bolacha": {
    "price": 4.5,
    "unit": "pacote",
    "source": "curado"
  },
  "wafer": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "biscoito recheado": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "salgadinho": {
    "price": 10.88,
    "unit": "pacote",
    "source": "buscape"
  },
  "doritos": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cheetos": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ruffles": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "batata chips": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "batata palha": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "amendoim": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "castanha": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "chocolate": {
    "price": 7.9,
    "unit": "barra",
    "source": "curado"
  },
  "bala": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "chiclete": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pirulito": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "paçoca": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pacoca": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "paçoquinha": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "torrone": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "barra de cereal": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cereal": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "nutella": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "geleia": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "doce de leite": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "mel": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "milho para pipoca": {
    "price": 6.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pimenta": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pimenta do reino": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cominho": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "colorau": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "páprica": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "paprica": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "orégano": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "oregano": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "manjericão": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "manjericao": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "louro": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "curry": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "tempero completo": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "tempero pronto": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "caldo": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "caldo de galinha": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "caldo de carne": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "caldo de legumes": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "shoyu": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "molho shoyu": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "molho inglês": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "molho ingles": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "wasabi": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "gengibre": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "canela": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "baunilha": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "noz-moscada": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "cravo": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "açafrão": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "acafrao": {
    "price": 5.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ração": {
    "price": 84.9,
    "unit": "pacote 10kg",
    "source": "buscape"
  },
  "racao": {
    "price": 84.9,
    "unit": "pacote 10kg",
    "source": "buscape"
  },
  "ração para cachorro": {
    "price": 42.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ração para gato": {
    "price": 42.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "areia para gato": {
    "price": 42.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "areia sanitária": {
    "price": 42.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "petisco": {
    "price": 42.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "osso para cachorro": {
    "price": 42.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fralda": {
    "price": 29.69,
    "unit": "pacote",
    "source": "buscape"
  },
  "fralda descartável": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fralda descartavel": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lenço umedecido": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lenco umedecido": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "mamadeira": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "papinha": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "leite infantil": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fórmula infantil": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "formula infantil": {
    "price": 34.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "panela": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "frigideira": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "talher": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "garfo": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "faca": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "colher": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "prato": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "copo": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "copo descartável": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "copo descartavel": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "prato descartável": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "guardanapo": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "filtro": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "papel alumínio": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "papel aluminio": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "papel manteiga": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "filme pvc": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "filme plástico": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "filme plastico": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "isqueiro": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fósforo": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "fosforo": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "vela": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pilha": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lâmpada": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lampada": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "extensão": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "extensao": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pote hermético": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "pote hermetico": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "forma de gelo": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "escorredor": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ralador": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "abridor": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "tábua": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "tabua": {
    "price": 15.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "remédio": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "remedio": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "vitamina": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "suplemento": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "bandaid": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "curativo": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "gazes": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "gaza": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "analgésico": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "analgesico": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "dipirona": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "paracetamol": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "ibuprofeno": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "antigripal": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "teste de gravidez": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "preservativo": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "camisinha": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "repelente": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "protetor labial": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  },
  "lip balm": {
    "price": 19.9,
    "unit": "unidade ref.",
    "source": "categoria"
  }
};

var SORTED_PRICE_KEYWORDS = Object.entries(PRICE_KEYWORDS).sort(function (a, b) {
  return b[0].length - a[0].length;
});
