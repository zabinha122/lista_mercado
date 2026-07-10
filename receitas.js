/** ListaMercado — Receitas, perfil regional e sugestões por refeição */

var PROFILE_KEY = "listamercado_profile_v1";

var recipeEls = {};
var selectedMeal = null;
var selectedRecipe = null;

/** Por refeição: já exibidas e fila de rotação */
var mealState = {
  cafe: { recent: [], displayed: [] },
  almoco: { recent: [], displayed: [] },
  janta: { recent: [], displayed: [] },
};

var MEAL_STATE_KEY = "listamercado_meal_state_v1";

var RECIPE_IMG_FALLBACK =
  "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480">' +
    '<rect width="800" height="480" fill="#e8f5e9"/>' +
    '<text x="400" y="250" text-anchor="middle" font-size="72">🍽️</text>' +
    "</svg>"
  );

function setRecipeImage(img, url, alt) {
  img.alt = alt || "";
  img.loading = "eager";
  img.decoding = "async";
  img.referrerPolicy = "no-referrer";
  img.onerror = function () {
    if (img.src !== RECIPE_IMG_FALLBACK) img.src = RECIPE_IMG_FALLBACK;
  };
  img.src = url || RECIPE_IMG_FALLBACK;
}

function loadProfile() {
  try {
    var raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) { /* ignore */ }
  return {
    region: "",
    state: "",
    tastes: { cafe: [], almoco: [], janta: [] },
    setupDone: false,
  };
}

function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

var profile = loadProfile();
loadMealState();

function loadMealState() {
  try {
    var raw = sessionStorage.getItem(MEAL_STATE_KEY);
    if (!raw) return;
    var saved = JSON.parse(raw);
    ["cafe", "almoco", "janta"].forEach(function (meal) {
      if (saved[meal]) {
        mealState[meal].recent = saved[meal].recent || [];
        mealState[meal].displayed = saved[meal].displayed || [];
      }
    });
  } catch (_) { /* ignore */ }
}

function saveMealState() {
  try {
    sessionStorage.setItem(MEAL_STATE_KEY, JSON.stringify(mealState));
  } catch (_) { /* ignore */ }
}

function resetMealState() {
  mealState = {
    cafe: { recent: [], displayed: [] },
    almoco: { recent: [], displayed: [] },
    janta: { recent: [], displayed: [] },
  };
  saveMealState();
}

function recipesByIds(ids) {
  return ids.map(function (id) {
    return RECIPES.find(function (r) { return r.id === id; });
  }).filter(Boolean);
}

function shuffleArray(arr) {
  var copy = arr.slice();
  for (var i = copy.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

/** Escolhe receitas com peso pelo score — mais variedade que sempre pegar o top 3 */
function pickVaried(scoredPool, limit) {
  if (scoredPool.length <= limit) return scoredPool.slice();

  var available = scoredPool.slice();
  var picked = [];

  while (picked.length < limit && available.length) {
    var weights = available.map(function (x) { return Math.max(x.score, 1); });
    var total = weights.reduce(function (a, b) { return a + b; }, 0);
    var r = Math.random() * total;
    var idx = 0;

    for (var i = 0; i < available.length; i++) {
      r -= weights[i];
      if (r <= 0) {
        idx = i;
        break;
      }
    }

    picked.push(available[idx]);
    available.splice(idx, 1);
  }

  return picked;
}

function normTag(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function recipeText(recipe) {
  var parts = [recipe.name || "", recipe.desc || ""];
  (recipe.tags || []).forEach(function (t) { parts.push(t); });
  (recipe.shop || []).forEach(function (i) { parts.push(i); });
  return normTag(parts.join(" "));
}

function recipeHasTaste(recipe, tasteId) {
  var keywords = TASTE_KEYWORDS[tasteId] || [tasteId];
  var text = recipeText(recipe);
  for (var i = 0; i < keywords.length; i++) {
    if (text.indexOf(normTag(keywords[i])) !== -1) return true;
  }
  return false;
}

/** Só sugere receitas alinhadas aos gostos marcados — sem camarão se não marcou, etc. */
function recipeMatchesProfile(recipe, meal) {
  var tastes = profile.tastes[meal] || [];
  if (!tastes.length) return false;

  var i;
  for (i = 0; i < STRICT_TASTES.length; i++) {
    var strictId = STRICT_TASTES[i];
    if (recipeHasTaste(recipe, strictId) && tastes.indexOf(strictId) === -1) {
      return false;
    }
  }

  for (i = 0; i < tastes.length; i++) {
    if (recipeHasTaste(recipe, tastes[i])) return true;
  }

  return false;
}

function scoreRecipe(recipe, meal) {
  if (recipe.meals.indexOf(meal) === -1) return 0;

  var score = 0;
  var tastes = profile.tastes[meal] || [];

  tastes.forEach(function (tasteId) {
    var t = normTag(tasteId);
    (recipe.tags || []).forEach(function (tag) {
      var tg = normTag(tag);
      if (tg === t || tg.indexOf(t) !== -1 || t.indexOf(tg) !== -1) score += 12;
    });
    (recipe.shop || []).forEach(function (ing) {
      var ig = normTag(ing);
      if (ig.indexOf(t) !== -1 || t.indexOf(ig) !== -1) score += 6;
    });
  });

  if (profile.state && recipe.state === profile.state) score += 30;
  else if (profile.region && recipe.region === profile.region) score += 18;
  else if (recipe.region === "brasil") score += 6;

  if (tastes.length === 0) score += 3;

  return score;
}

function getScoredPool(meal) {
  return RECIPES.filter(function (r) {
    return r.meals.indexOf(meal) !== -1 && recipeMatchesProfile(r, meal);
  })
    .map(function (r) { return { recipe: r, score: scoreRecipe(r, meal) }; })
    .sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.recipe.name.localeCompare(b.recipe.name, "pt-BR");
    });
}

function suggestRecipes(meal, limit, rotate) {
  limit = limit || 3;
  var state = mealState[meal];
  var pool = getScoredPool(meal);

  if (!rotate && state.displayed.length) {
    var cached = recipesByIds(state.displayed);
    if (cached.length) return cached;
  }

  if (!pool.length) return [];

  var recent = state.recent.slice();
  var available = pool.filter(function (x) {
    return recent.indexOf(x.recipe.id) === -1;
  });

  if (available.length < limit) {
    recent = [];
    available = pool.slice();
    if (rotate && pool.length > limit) {
      showToast("Rodada completa — voltando ao início do catálogo");
    }
  }

  // Embaralha faixas de score parecido para não repetir sempre a mesma ordem
  var tiers = {};
  available.forEach(function (item) {
    var key = String(item.score);
    if (!tiers[key]) tiers[key] = [];
    tiers[key].push(item);
  });
  available = [];
  Object.keys(tiers).sort(function (a, b) { return Number(b) - Number(a); }).forEach(function (key) {
    shuffleArray(tiers[key]).forEach(function (item) { available.push(item); });
  });

  var picked = pickVaried(available, limit).map(function (x) { return x.recipe; });

  picked.forEach(function (r) {
    recent.push(r.id);
  });

  state.recent = recent;
  state.displayed = picked.map(function (r) { return r.id; });
  saveMealState();

  return picked;
}

function profileComplete() {
  return profile.setupDone && profile.region && (profile.tastes.cafe.length || profile.tastes.almoco.length || profile.tastes.janta.length);
}

function renderProfileView() {
  var regionSel = recipeEls.profileRegion;
  var stateSel = recipeEls.profileState;

  regionSel.innerHTML = '<option value="">Selecione a região</option>';
  REGIONS.forEach(function (r) {
    var opt = document.createElement("option");
    opt.value = r.id;
    opt.textContent = r.label;
    if (r.id === profile.region) opt.selected = true;
    regionSel.appendChild(opt);
  });

  updateStateSelect();
  if (profile.state) stateSel.value = profile.state;

  MEALS.forEach(function (meal) {
    var container = document.getElementById("tastes-" + meal.id);
    if (!container) return;
    container.innerHTML = "";
    tastesForMeal(meal.id).forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      var active = (profile.tastes[meal.id] || []).indexOf(opt.id) !== -1;
      if (active) btn.classList.add("chip--on");
      btn.textContent = opt.emoji + " " + opt.label;
      btn.dataset.meal = meal.id;
      btn.dataset.taste = opt.id;
      btn.addEventListener("click", function () {
        var list = profile.tastes[meal.id] || [];
        var idx = list.indexOf(opt.id);
        if (idx === -1) list.push(opt.id);
        else list.splice(idx, 1);
        profile.tastes[meal.id] = list;
        btn.classList.toggle("chip--on");
      });
      container.appendChild(btn);
    });
  });
}

function updateStateSelect() {
  var stateSel = recipeEls.profileState;
  stateSel.innerHTML = '<option value="">Estado (opcional)</option>';
  var states = STATES_BY_REGION[profile.region] || [];
  states.forEach(function (st) {
    var opt = document.createElement("option");
    opt.value = st;
    opt.textContent = STATE_LABELS[st] || st;
    stateSel.appendChild(opt);
  });
}

function renderMealButtons() {
  var wrap = recipeEls.mealButtons;
  wrap.innerHTML = "";
  MEALS.forEach(function (meal) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "meal-btn" + (selectedMeal === meal.id ? " meal-btn--on" : "");
    btn.innerHTML = '<span class="meal-btn__emoji">' + meal.emoji + '</span><span>' + meal.label + '</span>';
    btn.addEventListener("click", function () {
      if (!profileComplete()) {
        showToast("Complete seu perfil primeiro");
        switchTab("perfil");
        return;
      }
      selectedMeal = meal.id;
      renderMealButtons();
      showSuggestions(meal.id, false);
    });
    wrap.appendChild(btn);
  });
}

function showSuggestions(mealId, rotate) {
  var meal = MEALS.find(function (m) { return m.id === mealId; });
  var recipes = suggestRecipes(mealId, 3, !!rotate);

  recipeEls.suggestionsTitle.textContent = "Sugestões para " + (meal ? meal.label.toLowerCase() : "");
  recipeEls.suggestions.hidden = false;
  recipeEls.recipeDetail.hidden = true;
  selectedRecipe = null;

  recipeEls.suggestionCards.innerHTML = "";

  if (!recipes.length) {
    recipeEls.suggestionCards.innerHTML = '<p class="empty">Nenhuma receita encontrada. Ajuste seus gostos no perfil.</p>';
    return;
  }

  recipes.forEach(function (r) {
    recipeEls.suggestionCards.appendChild(buildRecipeCard(r, true));
  });

  if (rotate) showToast("Novas sugestões geradas");
}

function restoreMealSuggestionsIfAny() {
  if (!selectedMeal || !profileComplete()) return;
  var state = mealState[selectedMeal];
  if (!state.displayed.length) return;
  showSuggestions(selectedMeal, false);
}

function buildRecipeCard(recipe, compact) {
  var card = document.createElement("article");
  card.className = "recipe-card" + (compact ? " recipe-card--compact" : "");
  card.innerHTML =
    '<div class="recipe-card__body">' +
    '<span class="recipe-card__origin">' + recipe.origin + "</span>" +
    "<h3>" + recipe.name + "</h3>" +
    "<p>" + recipe.desc + "</p>" +
    '<div class="recipe-card__meta"><span>⏱ ' + recipe.time + "</span><span>📊 " + recipe.level + "</span></div>" +
  "</div>";

  var img = document.createElement("img");
  img.className = "recipe-card__img";
  setRecipeImage(img, getRecipeImage(recipe), recipe.name);
  card.insertBefore(img, card.firstChild);

  if (compact) {
    var actions = document.createElement("div");
    actions.className = "recipe-card__actions";
    var btnView = document.createElement("button");
    btnView.type = "button";
    btnView.className = "btn btn--primary btn--sm";
    btnView.textContent = "Ver receita";
    btnView.addEventListener("click", function () { showRecipeDetail(recipe); });

    var btnShop = document.createElement("button");
    btnShop.type = "button";
    btnShop.className = "btn btn--outline btn--sm";
    btnShop.textContent = "Adicionar à lista";
    btnShop.addEventListener("click", function () { addRecipeToList(recipe); });

    actions.append(btnView, btnShop);
    card.appendChild(actions);
  }

  return card;
}

function showRecipeDetail(recipe) {
  selectedRecipe = recipe;
  recipeEls.suggestions.hidden = true;
  recipeEls.recipeDetail.hidden = false;

  setRecipeImage(recipeEls.detailImg, getRecipeImage(recipe), recipe.name);
  recipeEls.detailTitle.textContent = recipe.name;
  recipeEls.detailOrigin.textContent = recipe.origin + " · " + recipe.time + " · " + recipe.level;
  recipeEls.detailDesc.textContent = recipe.desc;

  var sourceEl = recipeEls.detailSource;
  if (recipe.sourceUrl) {
    sourceEl.hidden = false;
    sourceEl.innerHTML = 'Fonte: <a href="' + recipe.sourceUrl + '" target="_blank" rel="noopener noreferrer">TudoGostoso</a>';
  } else {
    sourceEl.hidden = true;
    sourceEl.textContent = "";
  }

  recipeEls.detailSteps.innerHTML = "";
  recipe.steps.forEach(function (step, i) {
    var li = document.createElement("li");
    li.textContent = step;
    recipeEls.detailSteps.appendChild(li);
  });

  recipeEls.detailShop.innerHTML = "";
  recipe.shop.forEach(function (item) {
    var li = document.createElement("li");
    li.textContent = item;
    recipeEls.detailShop.appendChild(li);
  });
}

function addRecipeToList(recipe) {
  if (!window.ListaMercado) return;
  var name = "Compra — " + recipe.name.slice(0, 24);
  window.ListaMercado.addIngredients(recipe.shop, name);
  showToast("Ingredientes adicionados à lista de compras");
}

function showToast(msg) {
  if (window.ListaMercado && window.ListaMercado.toast) {
    window.ListaMercado.toast(msg);
    return;
  }
  var stack = document.getElementById("toasts");
  if (!stack) return;
  var el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  stack.appendChild(el);
  setTimeout(function () { el.remove(); }, 2800);
}

function switchTab(tab) {
  document.querySelectorAll(".nav-tab").forEach(function (btn) {
    btn.classList.toggle("nav-tab--active", btn.dataset.tab === tab);
  });
  document.getElementById("view-lista").hidden = tab !== "lista";
  document.getElementById("view-receitas").hidden = tab !== "receitas";
  document.getElementById("view-perfil").hidden = tab !== "perfil";

  var subtitle = document.getElementById("appSubtitle");
  if (subtitle) {
    if (tab === "lista") subtitle.textContent = "Suas compras, por corredor";
    else if (tab === "receitas") subtitle.textContent = "Receitas do Brasil, do seu jeito";
    else subtitle.textContent = "Sua região e gostos";
  }

  if (tab === "receitas") renderReceitasView();
  if (tab === "perfil") renderProfileView();
}

function renderReceitasView() {
  renderMealButtons();
  if (!profileComplete()) {
    recipeEls.profileBanner.hidden = false;
    recipeEls.suggestions.hidden = true;
    recipeEls.recipeDetail.hidden = true;
  } else {
    recipeEls.profileBanner.hidden = true;
    restoreMealSuggestionsIfAny();
  }
}

function initReceitas() {
  recipeEls = {
    profileRegion: document.getElementById("profileRegion"),
    profileState: document.getElementById("profileState"),
    mealButtons: document.getElementById("mealButtons"),
    suggestions: document.getElementById("recipeSuggestions"),
    suggestionsTitle: document.getElementById("suggestionsTitle"),
    suggestionCards: document.getElementById("suggestionCards"),
    recipeDetail: document.getElementById("recipeDetail"),
    detailImg: document.getElementById("detailImg"),
    detailTitle: document.getElementById("detailTitle"),
    detailOrigin: document.getElementById("detailOrigin"),
    detailDesc: document.getElementById("detailDesc"),
    detailSource: document.getElementById("detailSource"),
    detailSteps: document.getElementById("detailSteps"),
    detailShop: document.getElementById("detailShop"),
    profileBanner: document.getElementById("profileBanner"),
    btnSaveProfile: document.getElementById("btnSaveProfile"),
    btnBackSuggestions: document.getElementById("btnBackSuggestions"),
    btnAddDetailShop: document.getElementById("btnAddDetailShop"),
    btnRefreshRecipes: document.getElementById("btnRefreshRecipes"),
  };

  document.querySelectorAll(".nav-tab").forEach(function (btn) {
    btn.addEventListener("click", function () { switchTab(btn.dataset.tab); });
  });

  recipeEls.profileRegion.addEventListener("change", function () {
    profile.region = recipeEls.profileRegion.value;
    profile.state = "";
    updateStateSelect();
  });

  recipeEls.profileState.addEventListener("change", function () {
    profile.state = recipeEls.profileState.value;
  });

  recipeEls.btnSaveProfile.addEventListener("click", function () {
    if (!profile.region) {
      showToast("Selecione sua região");
      return;
    }
    var hasTaste = MEALS.some(function (m) {
      return (profile.tastes[m.id] || []).length > 0;
    });
    if (!hasTaste) {
      showToast("Marque pelo menos um gosto em alguma refeição");
      return;
    }
    profile.setupDone = true;
    saveProfile(profile);
    resetMealState();
    selectedMeal = null;
    showToast("Perfil salvo! Agora explore as receitas.");
    switchTab("receitas");
  });

  document.getElementById("btnGoProfile").addEventListener("click", function () {
    switchTab("perfil");
  });

  recipeEls.btnBackSuggestions.addEventListener("click", function () {
    recipeEls.recipeDetail.hidden = true;
    recipeEls.suggestions.hidden = false;
  });

  recipeEls.btnAddDetailShop.addEventListener("click", function () {
    if (selectedRecipe) addRecipeToList(selectedRecipe);
  });

  recipeEls.btnRefreshRecipes.addEventListener("click", function () {
    if (!selectedMeal) {
      showToast("Escolha café, almoço ou janta primeiro");
      return;
    }
    showSuggestions(selectedMeal, true);
  });

  renderProfileView();
  renderReceitasView();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReceitas);
} else {
  initReceitas();
}

window.ListaMercadoReceitas = {
  switchTab: switchTab,
  suggestRecipes: suggestRecipes,
};
