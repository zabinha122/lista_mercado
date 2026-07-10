#!/usr/bin/env python3
"""
Gera prices-data.js com preços de referência para itens de supermercado.

Tenta buscar no Buscapé; se falhar ou o valor for atípico, usa tabela curada
com médias aproximadas do varejo brasileiro (2025–2026).
"""

from __future__ import annotations

import json
import re
import statistics
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

USER_AGENT = "ListaMercado/1.0 (educational; github.com/zabinha122/lista_mercado)"
DELAY_SEC = 0.45

CATEGORY_PRICES = {
    "higiene": 14.90,
    "limpeza": 9.90,
    "carnes": 28.90,
    "peixes": 34.90,
    "mercearia": 11.90,
    "graos": 7.90,
    "enlatados": 8.90,
    "congelados": 18.90,
    "laticinios": 9.90,
    "verduras": 5.90,
    "frutas": 7.90,
    "padaria": 12.90,
    "bebidas": 8.90,
    "snacks": 6.90,
    "temperos": 5.90,
    "pet": 42.90,
    "bebe": 34.90,
    "casa": 15.90,
    "farmacia": 19.90,
    "outros": 10.90,
}

CURATED = {
    "arroz": (24.90, "pacote 5kg"),
    "feijao": (9.90, "pacote 1kg"),
    "feijão": (9.90, "pacote 1kg"),
    "acucar": (4.50, "pacote 1kg"),
    "açucar": (4.50, "pacote 1kg"),
    "sal": (3.20, "pacote 1kg"),
    "oleo": (7.90, "garrafa 900ml"),
    "óleo": (7.90, "garrafa 900ml"),
    "azeite": (28.90, "garrafa 500ml"),
    "farinha": (5.90, "pacote 1kg"),
    "macarrao": (4.90, "pacote 500g"),
    "macarrão": (4.90, "pacote 500g"),
    "cafe": (14.90, "pacote 500g"),
    "café": (14.90, "pacote 500g"),
    "leite": (5.49, "caixa 1L"),
    "ovo": (14.90, "dúzia"),
    "ovos": (14.90, "dúzia"),
    "manteiga": (12.90, "pote 200g"),
    "queijo": (32.90, "kg"),
    "iogurte": (3.90, "unidade"),
    "requeijao": (8.90, "pote 200g"),
    "requeijão": (8.90, "pote 200g"),
    "pao": (12.90, "pacote"),
    "pão": (12.90, "pacote"),
    "pao de forma": (9.90, "pacote"),
    "pão de forma": (9.90, "pacote"),
    "pao frances": (1.20, "unidade"),
    "pão francês": (1.20, "unidade"),
    "carne": (38.90, "kg"),
    "carne moida": (34.90, "kg"),
    "carne moída": (34.90, "kg"),
    "frango": (17.90, "kg"),
    "peito de frango": (19.90, "kg"),
    "linguica": (24.90, "kg"),
    "linguiça": (24.90, "kg"),
    "salsicha": (12.90, "kg"),
    "bacon": (32.90, "kg"),
    "presunto": (38.90, "kg"),
    "mortadela": (22.90, "kg"),
    "peixe": (32.90, "kg"),
    "tilapia": (28.90, "kg"),
    "tilápia": (28.90, "kg"),
    "camarao": (59.90, "kg"),
    "camarão": (59.90, "kg"),
    "banana": (6.90, "kg"),
    "maca": (9.90, "kg"),
    "maçã": (9.90, "kg"),
    "laranja": (5.90, "kg"),
    "tomate": (7.90, "kg"),
    "batata": (6.90, "kg"),
    "cenoura": (5.90, "kg"),
    "cebola": (5.50, "kg"),
    "alface": (4.90, "unidade"),
    "uva": (14.90, "kg"),
    "morango": (18.90, "bandeja"),
    "detergente": (2.99, "unidade"),
    "sabao em po": (12.90, "pacote 1kg"),
    "sabão em pó": (12.90, "pacote 1kg"),
    "agua sanitaria": (6.90, "garrafa 1L"),
    "água sanitária": (6.90, "garrafa 1L"),
    "amaciante": (14.90, "garrafa 2L"),
    "papel higienico": (22.90, "pacote 12 rolos"),
    "papel higiênico": (22.90, "pacote 12 rolos"),
    "sabonete": (2.49, "unidade"),
    "shampoo": (16.90, "frasco 325ml"),
    "desodorante": (12.90, "unidade"),
    "creme dental": (6.90, "unidade"),
    "refrigerante": (8.90, "garrafa 2L"),
    "agua": (2.50, "garrafa 1,5L"),
    "água": (2.50, "garrafa 1,5L"),
    "suco": (6.90, "caixa 1L"),
    "cerveja": (4.90, "lata 350ml"),
    "biscoito": (4.50, "pacote"),
    "bolacha": (4.50, "pacote"),
    "chocolate": (7.90, "barra"),
    "salgadinho": (8.90, "pacote"),
    "pipoca": (4.90, "pacote 500g"),
    "cuscuz": (5.90, "pacote 500g"),
    "tapioca": (6.90, "pacote 500g"),
    "achocolatado": (8.90, "pacote 400g"),
    "extrato de tomate": (3.90, "caixa 340g"),
    "creme de leite": (4.90, "caixa 200g"),
    "leite condensado": (7.90, "lata 395g"),
    "fralda": (54.90, "pacote"),
    "ração": (89.90, "pacote 10kg"),
    "racao": (89.90, "pacote 10kg"),
    "inhame": (8.90, "kg"),
    "mandioca": (7.90, "kg"),
    "pimentao": (9.90, "kg"),
    "pimentão": (9.90, "kg"),
}


def fetch_buscape_prices(query: str) -> list[float]:
    url = f"https://www.buscape.com.br/search?q={urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        html = urllib.request.urlopen(req, timeout=20).read().decode("utf-8", "ignore")
    except (urllib.error.URLError, TimeoutError):
        return []

    prices: list[float] = []
    for match in re.finditer(r"R\$\s*([0-9]{1,3}(?:\.[0-9]{3})*,[0-9]{2})", html):
        value = float(match.group(1).replace(".", "").replace(",", "."))
        if 1.0 <= value <= 400.0:
            prices.append(value)
    return prices[:12]


def sane_price(scraped: list[float], curated: float) -> float | None:
    if not scraped:
        return None
    low = sorted(scraped)[:5]
    median = statistics.median(low)
    if median > curated * 2.5 or median < curated * 0.15:
        return None
    return round(median, 2)


def load_keywords(dict_path: Path) -> dict[str, str]:
    text = dict_path.read_text(encoding="utf-8")
    block = re.search(r"var KEYWORDS = \{([\s\S]*?)\n\};", text)
    if not block:
        return {}
    pairs = re.findall(r'"([^"]+)"\s*:\s*"([^"]+)"|([a-zA-ZÀ-ÿ_]+)\s*:\s*"([^"]+)"', block.group(1))
    keywords: dict[str, str] = {}
    for a, b, c, d in pairs:
        key = a or c
        cat = b or d
        if key:
            keywords[key] = cat
    return keywords


def build_prices(keywords: dict[str, str]) -> tuple[dict, dict]:
    price_keywords: dict[str, dict] = {}
    curated_keys = {k.lower() for k in CURATED}

    for kw, cat in keywords.items():
        norm = kw.lower().strip()
        curated = CURATED.get(norm) or CURATED.get(kw)
        if curated:
            price, unit = curated
            source = "curado"
        else:
            price = CATEGORY_PRICES.get(cat, CATEGORY_PRICES["outros"])
            unit = "unidade ref."
            source = "categoria"

        if norm in curated_keys:
            scraped = fetch_buscape_prices(kw)
            time.sleep(DELAY_SEC)
            web = sane_price(scraped, price)
            if web is not None:
                price = web
                source = "buscape"

        price_keywords[kw] = {
            "price": round(price, 2),
            "unit": unit,
            "source": source,
        }

    return CATEGORY_PRICES, price_keywords


def write_js(category_prices: dict, price_keywords: dict, out: Path) -> None:
    lines = [
        "/**",
        " * Preços de referência — gerado por scripts/scrape_prices.py",
        " * Fontes: Buscapé (quando disponível) + médias curadas do varejo BR",
        " * Valores aproximados para estimativa; podem variar por região e loja.",
        " */",
        f"var CATEGORY_PRICES = {json.dumps(category_prices, ensure_ascii=False, indent=2)};",
        "",
        f"var PRICE_KEYWORDS = {json.dumps(price_keywords, ensure_ascii=False, indent=2)};",
        "",
        "var SORTED_PRICE_KEYWORDS = Object.entries(PRICE_KEYWORDS).sort(function (a, b) {",
        "  return b[0].length - a[0].length;",
        "});",
        "",
    ]
    out.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    keywords = load_keywords(root / "dictionary.js")
    print(f"Palavras-chave: {len(keywords)}")
    print(f"Consultando Buscapé para itens principais ({len(CURATED)})...")
    cat_prices, price_kw = build_prices(keywords)
    out = root / "prices-data.js"
    write_js(cat_prices, price_kw, out)
    print(f"Salvo em {out} ({len(price_kw)} preços)")


if __name__ == "__main__":
    main()
