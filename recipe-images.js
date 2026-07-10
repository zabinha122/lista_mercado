/**
 * Imagens por receita — URLs verificadas, agrupadas por tipo de prato.
 */
var RECIPE_IMAGES = {
  /* café */
  "cuscuz-manteiga-ovo": "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
  "pao-manteiga-cafe": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  "tapioca-queijo": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
  "ovos-mexidos-pao": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
  "mingau-milho": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
  "cafe-leite-biscoito": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  "crepioca-frango": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
  "pao-queijo-cafe": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80",
  "vitamina-frutas": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80",
  "panqueca-mel": "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80",
  "bolo-fuba-queijo": "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80",
  "mingau-aveia-banana": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
  "pao-requeijao-presunto": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
  "iogurte-granola-frutas": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
  "suco-laranja-caseiro": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80",
  "cuscuz-carne-seca": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  "cha-biscoito": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  "misto-quente": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
  "tapioca-doce-coco": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",

  /* almoço */
  "baião-dois": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  "moqueca-sergipana": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
  "feijao-tropeiro": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
  "galinhada": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
  "feijoada-completa": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
  "carne-panela-legumes": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
  "bobo-camarao": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
  "arroz-feijao-frango": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
  "panelada-sergipe": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  "churrasco-mineiro": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  "picadinho-arroz": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
  "frango-passarinho": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80",
  "peixe-frito-pirao": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
  "salpicao-frango": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  "strogonoff-carne": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
  "macarronada-sugo": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
  "parmegiana-frango": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
  "vatapa-arroz": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
  "estrogonofe-frango": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
  "escondidinho-camarao": "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",

  /* janta */
  "sopa-legumes-frango": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
  "macarrao-manteiga-queijo": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
  "omelete-pao": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80",
  "tapioca-frango-janta": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
  "sanduiche-frango": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
  "canja-galinha": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
  "acaraje": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
  "pizza-caseira": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
  "hamburguer-caseiro": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  "pastel-forno": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
  "yakisoba-caseiro": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80",
  "risoto-simples": "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
  "batata-recheada": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
  "wrap-frango": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
  "frango-xadrez": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80",
  "caldo-verde-simples": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
  "salada-atum": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  "macarrao-alho-oleo": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
  "lasanha-frigideira": "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
};

function getRecipeImage(recipe) {
  if (recipe && recipe.id && RECIPE_IMAGES[recipe.id]) return RECIPE_IMAGES[recipe.id];
  return recipe && recipe.image ? recipe.image : "";
}
