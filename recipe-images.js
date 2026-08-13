/** Imagens das receitas — usa a URL do TudoGostoso em recipe.image */

function getRecipeImage(recipe) {
  if (recipe && recipe.image) return recipe.image;
  if (recipe && recipe.id && typeof RECIPE_IMAGES !== "undefined" && RECIPE_IMAGES[recipe.id]) {
    return RECIPE_IMAGES[recipe.id];
  }
  return "";
}

var RECIPE_IMAGES = {};
