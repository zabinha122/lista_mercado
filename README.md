# ListaMercado

Aplicativo web para organizar listas de compras por corredor do supermercado e descobrir receitas brasileiras personalizadas por região e gostos.

**Site:** [https://zabinha122.github.io/lista_mercado/](https://zabinha122.github.io/lista_mercado/)

## Funcionalidades

- **Lista de compras** — digite ou cole itens; o app categoriza automaticamente (hortifruti, carnes, limpeza, etc.)
- **Múltiplas listas** — crie, troque e exclua listas de compras
- **Receitas** — sugestões por refeição (café, almoço, janta) com base no seu perfil regional
- **Perfil culinário** — escolha região, estado e preferências alimentares

## Tecnologia

Site estático (HTML, CSS e JavaScript puro). Não há backend, banco de dados nem APIs externas com credenciais. Os dados ficam apenas no `localStorage` do navegador do usuário.

## Segurança

- Nenhuma chave de API, senha ou token no código-fonte
- Política de segurança de conteúdo (CSP) no HTML
- Imagens de receitas via URLs públicas do Unsplash (sem chave)
- Dados do usuário armazenados somente localmente no dispositivo

## Desenvolvimento local

Abra `index.html` no navegador ou use um servidor local:

```bash
python3 -m http.server 8080
```

Acesse `http://localhost:8080`.

## Lista de compras com preços estimados

Cada item exibe um valor aproximado (~R$) e a lista mostra o **total estimado**. Os preços vêm de referências do varejo brasileiro (Buscapé + tabela curada).

Para atualizar preços:

```bash
python3 scripts/scrape_prices.py
```

## Windows 7 Aero

Simulação do desktop Windows 7 (tema Aero / Frutiger Aero):

**https://zabinha122.github.io/lista_mercado/windows7/**

## Receitas (TudoGostoso)

As receitas vêm do [TudoGostoso](https://www.tudogostoso.com.br), com imagens e ingredientes reais. Cada receita exibe o link da fonte.

O app **só sugere receitas compatíveis com os gostos marcados no perfil** — se você não marcou camarão, pratos com camarão não aparecem.

Para atualizar o catálogo localmente:

```bash
python3 scripts/scrape_tudogostoso.py
```

## Publicação (GitHub Pages)

A cada push na `main`, o workflow publica os arquivos na branch `gh-pages`.

### Configuração no GitHub (obrigatória)

1. Abra **Settings → Pages**
2. Em **Build and deployment → Source**, escolha **Deploy from a branch**
3. Branch: **`gh-pages`** · Pasta: **`/ (root)`**
4. Salve e aguarde 1–2 minutos

**URL do site:** [https://zabinha122.github.io/lista_mercado/](https://zabinha122.github.io/lista_mercado/)

> Se estiver em **GitHub Actions**, troque para **Deploy from a branch** — o deploy via Actions neste repositório não está vinculado corretamente e retorna erro 404.
