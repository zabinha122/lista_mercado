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

## Publicação

O deploy é automático via GitHub Actions ao fazer push na branch `main`.
