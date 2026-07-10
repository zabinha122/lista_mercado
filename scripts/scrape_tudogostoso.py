#!/usr/bin/env python3
"""Busca receitas no TudoGostoso e gera recipes-data.js para o ListaMercado."""

from __future__ import annotations

import html
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

USER_AGENT = "ListaMercado/1.0 (educational; github.com/zabinha122/lista_mercado)"
BASE = "https://www.tudogostoso.com.br"
DELAY_SEC = 0.6
MAX_PER_QUERY = 2

# termo de busca -> refeições sugeridas
SEARCHES: list[tuple[str, list[str]]] = [
    ("cuscuz nordestino", ["cafe"]),
    ("pão manteiga café", ["cafe"]),
    ("tapioca queijo", ["cafe", "janta"]),
    ("ovos mexidos", ["cafe"]),
    ("mingau aveia", ["cafe"]),
    ("vitamina de frutas", ["cafe"]),
    ("panqueca mel", ["cafe"]),
    ("pão de queijo", ["cafe", "janta"]),
    ("iogurte granola", ["cafe"]),
    ("arroz feijão", ["almoco", "janta"]),
    ("frango grelhado", ["almoco", "janta"]),
    ("carne de panela", ["almoco"]),
    ("moqueca peixe", ["almoco"]),
    ("bobó camarão", ["almoco"]),
    ("feijoada", ["almoco"]),
    ("feijão tropeiro", ["almoco"]),
    ("estrogonofe frango", ["almoco", "janta"]),
    ("churrasco", ["almoco"]),
    ("salada verde", ["almoco", "janta"]),
    ("macarrão alho óleo", ["almoco", "janta"]),
    ("lasanha", ["almoco", "janta"]),
    ("purê batata", ["almoco"]),
    ("mandioca cozida", ["almoco"]),
    ("sopa de legumes", ["janta"]),
    ("omelete", ["janta", "cafe"]),
    ("sanduíche natural", ["janta"]),
    ("pizza caseira", ["janta"]),
    ("hambúrguer caseiro", ["janta"]),
    ("pastel assado", ["janta"]),
    ("yakisoba", ["janta"]),
    ("risoto", ["janta"]),
    ("escondidinho", ["janta", "almoco"]),
    ("caldo verde", ["janta", "almoco"]),
    ("wrap frango", ["janta"]),
    ("pipoca", ["janta"]),
]

TASTE_KEYWORDS: dict[str, list[str]] = {
    "pao": ["pao", "pão", "torrada", "bisnaga"],
    "manteiga": ["manteiga"],
    "cuscuz": ["cuscuz"],
    "ovo": ["ovo", "ovos", "omelete"],
    "biscoito": ["biscoito", "bolacha"],
    "cafe": ["cafe", "café"],
    "leite": ["leite"],
    "cha": ["cha", "chá"],
    "suco": ["suco"],
    "tapioca": ["tapioca", "goma"],
    "queijo": ["queijo", "requeijao", "requeijão"],
    "presunto": ["presunto"],
    "mortadela": ["mortadela"],
    "frutas": ["fruta", "frutas"],
    "banana": ["banana"],
    "mamao": ["mamao", "mamão"],
    "manga": ["manga"],
    "aveia": ["aveia"],
    "granola": ["granola"],
    "iogurte": ["iogurte"],
    "doce": ["doce", "goiabada"],
    "mel": ["mel"],
    "bolo": ["bolo"],
    "torrada": ["torrada"],
    "mingau": ["mingau", "canjica"],
    "paodequeijo": ["pao de queijo", "pão de queijo"],
    "waffle": ["waffle", "panqueca"],
    "vitamina": ["vitamina"],
    "arroz": ["arroz"],
    "feijao": ["feijao", "feijão"],
    "carne": ["carne", "boi", "bovina", "picadinho", "alcatra"],
    "frango": ["frango", "galinha", "franguinho"],
    "peixe": ["peixe", "tilapia", "tilápia", "bacalhau", "pescada"],
    "camarao": ["camarao", "camarão", "camaroes", "camarões"],
    "porco": ["porco", "lombo", "pernil"],
    "linguica": ["linguica", "linguiça", "salsicha"],
    "legumes": ["legume", "cenoura", "abobrinha", "berinjela", "chuchu"],
    "salada": ["salada", "alface", "tomate", "agriao"],
    "mandioca": ["mandioca", "aipim", "macaxeira"],
    "farinha": ["farinha"],
    "macarrao": ["macarrao", "macarrão", "espaguete", "penne"],
    "pure": ["pure", "purê"],
    "batata": ["batata"],
    "milho": ["milho"],
    "polenta": ["polenta"],
    "pirao": ["pirao", "pirão"],
    "moqueca": ["moqueca"],
    "feijoada": ["feijoada"],
    "churrasco": ["churrasco", "espetinho"],
    "estrogonofe": ["estrogonofe"],
    "lasanha": ["lasanha"],
    "caldo": ["caldo", "canja"],
    "sopa": ["sopa"],
    "sanduiche": ["sanduiche", "sanduíche", "misto quente"],
    "pizza": ["pizza"],
    "hamburguer": ["hamburguer", "hambúrguer"],
    "omelete": ["omelete"],
    "crepioca": ["crepioca"],
    "salgado": ["salgado", "coxinha", "enrolado"],
    "pastel": ["pastel"],
    "pipoca": ["pipoca"],
    "wrap": ["wrap", "tortilla"],
    "yakisoba": ["yakisoba"],
    "risoto": ["risoto"],
    "escondidinho": ["escondidinho"],
}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=25) as resp:
        return resp.read().decode("utf-8", "ignore")


def norm(text: str) -> str:
    return (
        text.lower()
        .replace("ã", "a")
        .replace("á", "a")
        .replace("â", "a")
        .replace("é", "e")
        .replace("ê", "e")
        .replace("í", "i")
        .replace("ó", "o")
        .replace("ô", "o")
        .replace("ú", "u")
        .replace("ç", "c")
    )


def search_recipe_ids(query: str, limit: int = MAX_PER_QUERY) -> list[str]:
    url = f"{BASE}/busca?q={urllib.parse.quote(query)}"
    try:
        html_text = fetch(url)
    except urllib.error.URLError as err:
        print(f"  ! busca falhou ({query}): {err}")
        return []
    ids = re.findall(r"receita/(\d+)-", html_text)
    unique: list[str] = []
    for rid in ids:
        if rid not in unique:
            unique.append(rid)
        if len(unique) >= limit:
            break
    return unique


def parse_recipe_page(recipe_id: str) -> dict | None:
    # descobre slug pela busca ou tenta URL genérica
    url = f"{BASE}/receita/{recipe_id}"
    try:
        html_text = fetch(url)
    except urllib.error.HTTPError:
        # tenta achar slug no HTML da busca anterior — fallback por ID
        return None
    except urllib.error.URLError as err:
        print(f"  ! receita {recipe_id}: {err}")
        return None

    match = re.search(
        r'<script type="application/ld\+json">(.*?)</script>',
        html_text,
        re.S,
    )
    if not match:
        return None

    try:
        data = json.loads(match.group(1))
    except json.JSONDecodeError:
        return None

    if data.get("@type") != "Recipe":
        return None

    name = html.unescape(data.get("name", "Receita"))
    slug = re.search(rf"/receita/{recipe_id}-([^\"?#]+)", html_text)
    slug_part = slug.group(1) if slug else norm(name).replace(" ", "-")
    slug_part = re.sub(r"\.html+$", "", slug_part)
    source_url = f"{BASE}/receita/{recipe_id}-{slug_part}.html"

    image = data.get("image")
    if isinstance(image, dict):
        image_url = image.get("url", "")
    else:
        image_url = image or ""

    ingredients = [html.unescape(str(i)) for i in data.get("recipeIngredient", [])]
    steps_raw = data.get("recipeInstructions", [])
    steps: list[str] = []
    for step in steps_raw:
        if isinstance(step, dict):
            steps.append(html.unescape(html.unescape(step.get("text", ""))))
        else:
            steps.append(html.unescape(html.unescape(str(step))))

    prep = data.get("prepTime") or data.get("totalTime") or ""
    minutes = re.search(r"PT(\d+)M", prep)
    time_label = f"{minutes.group(1)} min" if minutes else "30 min"

    desc = html.unescape(html.unescape(re.sub(r"<[^>]+>", "", data.get("description", name))))

    text_blob = norm(" ".join([name, desc, " ".join(ingredients)]))
    tags = [tid for tid, kws in TASTE_KEYWORDS.items() if any(norm(k) in text_blob for k in kws)]

    return {
        "tgId": recipe_id,
        "name": name,
        "image": image_url,
        "shop": ingredients[:12],
        "steps": [s for s in steps if s.strip()][:10],
        "time": time_label,
        "desc": desc[:220],
        "tags": tags[:8],
        "sourceUrl": source_url,
        "level": "Fácil",
    }


def slugify(text: str) -> str:
    s = norm(text)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s[:48] or "receita"


def build_recipes() -> list[dict]:
    seen_ids: set[str] = set()
    recipes: list[dict] = []

    for query, meals in SEARCHES:
        print(f"Buscando: {query}")
        ids = search_recipe_ids(query)
        time.sleep(DELAY_SEC)

        for rid in ids:
            if rid in seen_ids:
                continue
            seen_ids.add(rid)

            parsed = parse_recipe_page(rid)
            time.sleep(DELAY_SEC)
            if not parsed:
                print(f"  - pulando {rid}")
                continue

            recipe_id = f"tg-{rid}"
            recipes.append(
                {
                    "id": recipe_id,
                    "name": parsed["name"],
                    "meals": meals,
                    "region": "brasil",
                    "tags": parsed["tags"],
                    "shop": parsed["shop"],
                    "image": parsed["image"],
                    "time": parsed["time"],
                    "level": parsed["level"],
                    "origin": "TudoGostoso · Brasil",
                    "desc": parsed["desc"],
                    "steps": parsed["steps"],
                    "sourceUrl": parsed["sourceUrl"],
                    "tgId": parsed["tgId"],
                }
            )
            print(f"  + {parsed['name'][:50]}")

    return recipes


def js_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def write_js(recipes: list[dict], out_path: Path) -> None:
    lines = [
        "/**",
        " * Receitas do TudoGostoso — gerado por scripts/scrape_tudogostoso.py",
        " * Fonte: https://www.tudogostoso.com.br (uso educacional, com link na receita)",
        " */",
        "var RECIPES = [",
    ]

    for r in recipes:
        lines.append("  {")
        lines.append(f"    id: {js_string(r['id'])},")
        lines.append(f"    name: {js_string(r['name'])},")
        lines.append(f"    meals: {json.dumps(r['meals'], ensure_ascii=False)},")
        lines.append(f"    region: {js_string(r['region'])},")
        lines.append(f"    tags: {json.dumps(r['tags'], ensure_ascii=False)},")
        lines.append(f"    shop: {json.dumps(r['shop'], ensure_ascii=False)},")
        lines.append(f"    image: {js_string(r['image'])},")
        lines.append(f"    time: {js_string(r['time'])},")
        lines.append(f"    level: {js_string(r['level'])},")
        lines.append(f"    origin: {js_string(r['origin'])},")
        lines.append(f"    desc: {js_string(r['desc'])},")
        lines.append(f"    steps: {json.dumps(r['steps'], ensure_ascii=False)},")
        lines.append(f"    sourceUrl: {js_string(r['sourceUrl'])},")
        lines.append("  },")

    lines.append("];")
    lines.append("")
    out_path.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    out = root / "recipes-data.js"
    recipes = build_recipes()
    print(f"\nTotal: {len(recipes)} receitas")
    if not recipes:
        raise SystemExit("Nenhuma receita coletada.")
    write_js(recipes, out)
    print(f"Salvo em {out}")


if __name__ == "__main__":
    main()
