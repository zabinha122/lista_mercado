/* ListaMercado — app (funciona com file://, sem módulos ES) */

const STORAGE_KEY = "listamercado_v1";

const $ = (sel) => document.querySelector(sel);

const els = {
  listSelect: $("#listSelect"),
  btnNewList: $("#btnNewList"),
  btnDeleteList: $("#btnDeleteList"),
  inputItems: $("#inputItems"),
  btnGenerate: $("#btnGenerate"),
  btnClearInput: $("#btnClearInput"),
  listSection: $("#listSection"),
  categoryList: $("#categoryList"),
  emptyHint: $("#emptyHint"),
  stats: $("#stats"),
  statTotal: $("#statTotal"),
  statDone: $("#statDone"),
  btnUncheckAll: $("#btnUncheckAll"),
  btnClearChecked: $("#btnClearChecked"),
  btnClearList: $("#btnClearList"),
  listTotals: $("#listTotals"),
  listTotalValue: $("#listTotalValue"),
  dialogNewList: $("#dialogNewList"),
  formNewList: $("#formNewList"),
  newListName: $("#newListName"),
  toasts: $("#toasts"),
};

/** Keywords sorted longest-first for greedy matching */
const SORTED_KEYWORDS = Object.entries(KEYWORDS).sort((a, b) => b[0].length - a[0].length);

const categoryMap = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function parseItemQuantity(text) {
  const trimmed = text.trim();
  const match = trimmed.match(/^(\d+(?:[.,]\d+)?)\s*(kg|g|l|ml|un|und|unidade|unidades|dz|duzia|dúzia)?/i);
  if (!match) return { qty: 1, unitHint: null };
  const qty = parseFloat(match[1].replace(",", "."));
  return { qty: qty > 0 ? qty : 1, unitHint: match[2] ? match[2].toLowerCase() : null };
}

function lookupPriceKeyword(text) {
  if (typeof SORTED_PRICE_KEYWORDS === "undefined") return null;
  const variants = matchVariants(text);
  let best = null;
  let bestLen = 0;

  for (const normalized of variants) {
    for (const [keyword, data] of SORTED_PRICE_KEYWORDS) {
      const kw = stripAccents(keyword.toLowerCase());
      if (normalized.includes(kw) && kw.length > bestLen) {
        bestLen = kw.length;
        best = { keyword, ...data };
      }
    }
  }

  return best;
}

function estimateItemPrice(text) {
  const { qty } = parseItemQuantity(text);
  const match = lookupPriceKeyword(text);
  const category = categorize(text);

  if (match) {
    return {
      price: Math.round(match.price * qty * 100) / 100,
      unit: match.unit,
      qty,
      approx: true,
    };
  }

  const base = (typeof CATEGORY_PRICES !== "undefined" && CATEGORY_PRICES[category])
    ? CATEGORY_PRICES[category]
    : 10.9;

  return {
    price: Math.round(base * qty * 100) / 100,
    unit: "unidade ref.",
    qty,
    approx: true,
  };
}

function uid() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function stripAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Plurais irregulares PT-BR comuns em lista de compras */
const PLURAL_FIX = {
  paes: "pao",
  limoes: "limao",
  meloes: "melao",
  mamaoes: "mamao",
  pessegoes: "pessego",
  ovos: "ovo",
  guardanapos: "guardanapo",
  bisnagas: "bisnaga",
  torradas: "torrada",
  bolos: "bolo",
  queijos: "queijo",
  presuntos: "presunto",
  bananas: "banana",
  macas: "maca",
  laranjas: "laranja",
  tomates: "tomate",
  batatas: "batata",
  cenouras: "cenoura",
  cebolas: "cebola",
  uvas: "uva",
  morangos: "morango",
  mangas: "manga",
  peras: "pera",
  biscoitos: "biscoito",
  bolachas: "bolacha",
  salgadinhos: "salgadinho",
  chocolates: "chocolate",
  balas: "bala",
  pilhas: "pilha",
  velas: "vela",
  panelas: "panela",
  fraldas: "fralda",
  sabonetes: "sabonete",
  refrigerantes: "refrigerante",
  cervejas: "cerveja",
  sucos: "suco",
  iogurtes: "iogurte",
  linguicas: "linguica",
  salsichas: "salsicha",
  frangos: "frango",
  peixes: "peixe",
  camaroes: "camarao",
  baguetes: "baguete",
};

function singularizeWord(word) {
  if (!word) return word;
  const w = stripAccents(word.toLowerCase());
  if (PLURAL_FIX[w]) return PLURAL_FIX[w];

  if (w.endsWith("oes")) return w.slice(0, -3) + "ao";
  if (w.endsWith("aes")) return w.slice(0, -3) + "ao";
  if (w.endsWith("ais")) return w.slice(0, -3) + "al";
  if (w.endsWith("eis")) return w.slice(0, -3) + "el";
  if (w.endsWith("is") && w.length > 3) return w.slice(0, -1);
  if (w.endsWith("ns") && w.length > 4) return w.slice(0, -2) + "m";
  if (w.endsWith("zes")) return w.slice(0, -3) + "z";
  if (w.endsWith("s") && w.length > 3 && !w.endsWith("ss")) return w.slice(0, -1);

  return w;
}

function normalizeForMatch(text) {
  return stripAccents(text.toLowerCase())
    .replace(/^\d+\s*/, "")
    .trim();
}

/** Gera variantes singular/plural para aumentar acerto do dicionário */
function matchVariants(text) {
  const base = normalizeForMatch(text);
  const variants = new Set([base]);
  if (!base) return [];

  const words = base.split(/\s+/).filter(Boolean);
  const allSingular = words.map(singularizeWord).join(" ");
  variants.add(allSingular);

  words.forEach((word, i) => {
    const copy = words.slice();
    copy[i] = singularizeWord(word);
    variants.add(copy.join(" "));
  });

  words.forEach((word) => {
    variants.add(singularizeWord(word));
  });

  return [...variants];
}

function categorize(itemText) {
  const variants = matchVariants(itemText);
  if (!variants.length) return "outros";

  let best = "outros";
  let bestLen = 0;

  for (const normalized of variants) {
    for (const [keyword, catId] of SORTED_KEYWORDS) {
      const kw = stripAccents(keyword.toLowerCase());
      if (normalized.includes(kw) && kw.length > bestLen) {
        bestLen = kw.length;
        best = catId;
      }
    }
  }

  return best;
}

function fixMiscategorizedItems(list) {
  let changed = false;
  list.items.forEach((item) => {
    const detected = categorize(item.text);
    if (item.category === "outros" && detected !== "outros") {
      item.category = detected;
      changed = true;
    }
  });
  return changed;
}

function parseInput(raw) {
  return raw
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) { /* ignore */ }

  const id = uid();
  return {
    activeListId: id,
    lists: {
      [id]: { id, name: "Compra da semana", rawInput: "", items: [] },
    },
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

function activeList() {
  return state.lists[state.activeListId];
}

function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  els.toasts.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

function updateStats() {
  const list = activeList();
  const total = list.items.length;
  const done = list.items.filter((i) => i.checked).length;
  let totalPrice = 0;

  list.items.forEach((item) => {
    if (!item.checked && !item.fromRecipe) {
      totalPrice += estimateItemPrice(item.text).price;
    }
  });

  if (total === 0) {
    els.stats.hidden = true;
    els.listTotals.hidden = true;
    return;
  }

  els.stats.hidden = false;
  els.statTotal.textContent = `${total} ${total === 1 ? "item" : "itens"}`;
  els.statDone.textContent = `${done} marcado${done !== 1 ? "s" : ""}`;

  els.listTotals.hidden = false;
  els.listTotalValue.textContent = formatBRL(totalPrice);
}

function renderListSelect() {
  const current = state.activeListId;
  els.listSelect.innerHTML = "";

  Object.values(state.lists)
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
    .forEach((list) => {
      const opt = document.createElement("option");
      opt.value = list.id;
      opt.textContent = list.name;
      if (list.id === current) opt.selected = true;
      els.listSelect.appendChild(opt);
    });
}

function renderCategories() {
  const list = activeList();
  els.inputItems.value = list.rawInput || "";

  const grouped = {};
  CATEGORIES.forEach((c) => { grouped[c.id] = []; });

  list.items.forEach((item) => {
    const cat = grouped[item.category] ? item.category : "outros";
    grouped[cat].push(item);
  });

  els.categoryList.innerHTML = "";
  let hasAny = false;

  CATEGORIES.forEach((cat) => {
    const items = grouped[cat.id];
    if (!items.length) return;
    hasAny = true;

    const block = document.createElement("section");
    block.className = "category-block reveal";
    block.dataset.category = cat.id;

    const head = document.createElement("div");
    head.className = "category-block__head";
    head.innerHTML = `
      <span class="category-block__title">${cat.emoji} ${cat.label}</span>
      <span class="category-block__count">${items.length}</span>
    `;

    const ul = document.createElement("ul");
    ul.className = "item-list";

    items.forEach((item) => {
      const li = document.createElement("li");
      li.className = `item-row${item.checked ? " item-row--done" : ""}`;
      li.dataset.id = item.id;

      const check = document.createElement("input");
      check.type = "checkbox";
      check.className = "item-row__check";
      check.checked = item.checked;
      check.setAttribute("aria-label", `Marcar ${item.text}`);
      check.addEventListener("change", () => {
        item.checked = check.checked;
        saveState();
        renderCategories();
      });

      const text = document.createElement("span");
      text.className = "item-row__text";
      text.textContent = item.text;

      const select = document.createElement("select");
      select.className = "select select--sm item-row__cat";
      select.setAttribute("aria-label", `Categoria de ${item.text}`);
      CATEGORIES.forEach((c) => {
        const o = document.createElement("option");
        o.value = c.id;
        o.textContent = `${c.emoji} ${c.label}`;
        if (c.id === item.category) o.selected = true;
        select.appendChild(o);
      });
      select.addEventListener("change", () => {
        item.category = select.value;
        saveState();
        renderCategories();
        toast("Categoria atualizada");
      });

      li.append(check, text);
      if (!item.fromRecipe) {
        const priceInfo = estimateItemPrice(item.text);
        const price = document.createElement("span");
        price.className = "item-row__price";
        price.title = "Referência: " + priceInfo.unit;
        price.textContent = "~" + formatBRL(priceInfo.price);
        li.append(price);
      }
      li.append(select);
      ul.appendChild(li);
    });

    block.append(head, ul);
    els.categoryList.appendChild(block);
    requestAnimationFrame(() => block.classList.add("reveal--on"));
  });

  els.listSection.hidden = !hasAny && !list.rawInput;
  els.emptyHint.hidden = hasAny;
  updateStats();
  observeReveal();
}

function generateList() {
  const list = activeList();
  const raw = els.inputItems.value.trim();
  list.rawInput = raw;

  const lines = parseInput(raw);
  if (!lines.length) {
    toast("Digite pelo menos um item");
    return;
  }

  const lineKeys = new Set(lines.map((l) => l.toLowerCase()));
  const existingMap = new Map(list.items.map((i) => [i.text.toLowerCase(), i]));
  const beforeCount = list.items.length;

  list.items = list.items.filter((item) => lineKeys.has(item.text.toLowerCase()));
  const removed = beforeCount - list.items.length;

  let added = 0;
  lines.forEach((text) => {
    const key = text.toLowerCase();
    if (existingMap.has(key) && list.items.some((i) => i.text.toLowerCase() === key)) return;

    const item = {
      id: uid(),
      text,
      category: categorize(text),
      checked: false,
    };
    list.items.push(item);
    existingMap.set(key, item);
    added += 1;
  });

  const orderMap = new Map(lines.map((line, index) => [line.toLowerCase(), index]));
  list.items.sort((a, b) => {
    const orderA = orderMap.get(a.text.toLowerCase()) ?? 999;
    const orderB = orderMap.get(b.text.toLowerCase()) ?? 999;
    return orderA - orderB;
  });

  saveState();
  renderCategories();
  els.listSection.hidden = false;

  if (added || removed) {
    const parts = [];
    if (added) parts.push(`${added} adicionado${added !== 1 ? "s" : ""}`);
    if (removed) parts.push(`${removed} removido${removed !== 1 ? "s" : ""}`);
    toast(`Lista atualizada: ${parts.join(", ")}`);
  } else {
    toast("Lista já está em dia com o texto");
  }
}

function migrateMiscategorized() {
  let any = false;
  Object.values(state.lists).forEach((list) => {
    if (fixMiscategorizedItems(list)) any = true;
  });
  if (any) saveState();
}

function observeReveal() {
  document.querySelectorAll(".reveal:not(.reveal--on)").forEach((el) => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("reveal--on");
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
  });
}

/* Events */
els.listSelect.addEventListener("change", () => {
  state.activeListId = els.listSelect.value;
  saveState();
  renderCategories();
});

els.btnNewList.addEventListener("click", () => {
  els.newListName.value = "";
  els.dialogNewList.showModal();
  setTimeout(() => els.newListName.focus(), 50);
});

els.formNewList.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = els.newListName.value.trim();
  if (!name) return;

  const id = uid();
  state.lists[id] = { id, name, rawInput: "", items: [] };
  state.activeListId = id;
  saveState();
  renderListSelect();
  renderCategories();
  els.dialogNewList.close();
  toast(`Lista "${name}" criada`);
});

els.btnDeleteList.addEventListener("click", () => {
  const keys = Object.keys(state.lists);
  if (keys.length <= 1) {
    toast("É a única lista — crie outra antes de excluir");
    return;
  }
  const list = activeList();
  if (!confirm(`Excluir a lista "${list.name}"?`)) return;

  delete state.lists[list.id];
  state.activeListId = Object.keys(state.lists)[0];
  saveState();
  renderListSelect();
  renderCategories();
  toast("Lista excluída");
});

els.btnGenerate.addEventListener("click", generateList);
els.btnClearInput.addEventListener("click", () => {
  els.inputItems.value = "";
  activeList().rawInput = "";
  saveState();
});

els.btnUncheckAll.addEventListener("click", () => {
  activeList().items.forEach((i) => { i.checked = false; });
  saveState();
  renderCategories();
});

els.btnClearChecked.addEventListener("click", () => {
  const list = activeList();
  const before = list.items.length;
  list.items = list.items.filter((i) => !i.checked);
  if (list.items.length === before) {
    toast("Nenhum item marcado");
    return;
  }
  saveState();
  renderCategories();
  toast("Itens marcados removidos");
});

els.btnClearList.addEventListener("click", () => {
  const list = activeList();
  if (!list.items.length) {
    toast("A lista já está vazia");
    return;
  }
  if (!confirm("Limpar todos os itens da lista organizada?")) return;
  list.items = [];
  list.rawInput = "";
  els.inputItems.value = "";
  saveState();
  renderCategories();
  toast("Lista organizada limpa");
});

els.inputItems.addEventListener("blur", () => {
  activeList().rawInput = els.inputItems.value;
  saveState();
});

/* Init */
document.querySelectorAll(".reveal").forEach((el) => {
  requestAnimationFrame(() => el.classList.add("reveal--on"));
});

migrateMiscategorized();
renderListSelect();
renderCategories();

/** API para Receitas adicionar ingredientes à lista */
window.ListaMercado = {
  toast: toast,
  addIngredients: function (items, listName) {
    var id = uid();
    if (listName) {
      state.lists[id] = { id: id, name: listName, rawInput: items.join(", "), items: [] };
      state.activeListId = id;
    }
    var list = activeList();
    var existing = {};
    list.items.forEach(function (i) { existing[i.text.toLowerCase()] = true; });
    items.forEach(function (text) {
      var key = text.toLowerCase();
      if (existing[key]) return;
      list.items.push({
        id: uid(),
        text: text,
        category: categorize(text),
        checked: false,
        fromRecipe: true,
      });
      existing[key] = true;
    });
    list.rawInput = items.join(", ");
    saveState();
    renderListSelect();
    renderCategories();
    if (window.ListaMercadoReceitas) ListaMercadoReceitas.switchTab("lista");
  },
};
