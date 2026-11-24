# Regra fixa: pré-visualização de links do Dio'Stock

**Padrão global obrigatório.** Todo o link de `diostock.pt` partilhado no WhatsApp, iMessage, Telegram, Facebook, X ou LinkedIn mostra o **banner grande**: a imagem larga em cima e o título e a descrição por baixo.

É **proibido** publicar uma página que dê a miniatura pequena ao lado do texto.

Esta regra vale para:
- todas as páginas;
- os convites de equipa (`convite.html?t=…`);
- os cartões de fidelidade (`cartao.html`, `c/`, `n/…`, `k/…`);
- as campanhas (`m/…`);
- os pedidos e os pagamentos;
- qualquer link com query string (`?t=`, `?n=`, `?k=`, `?v=`…).

A query string não muda as meta tags. A página é a mesma, por isso o banner também.

## O que cada página tem de ter

```html
<meta property="og:type" content="website">
<meta property="og:site_name" content="Dio’Stock">
<meta property="og:locale" content="pt_PT">
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:url" content="https://diostock.pt/<página>">          <!-- sem query string -->
<meta property="og:image" content="https://diostock.pt/<imagem>.png?v=N">
<meta property="og:image:secure_url" content="(igual a og:image)">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="…">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="(igual a og:image)">
```

## A imagem

- Exatamente **1200 × 630 px** (1,91:1), JPEG ou PNG, com **até 300 KB**. Acima disso, o WhatsApp mostra a miniatura.
- Alojada em `https://diostock.pt/`.
- Margem de segurança de pelo menos 80 px à volta do texto e do logótipo, porque algumas apps cortam as bordas.
- Nunca usar imagem quadrada, vertical ou pequena. Uma foto quadrada é primeiro posta dentro de um banner 1200×630 (ver `scripts/cartoes.mjs`).
- Sempre com `?v=` no endereço. Quando a imagem muda, o número sobe, para o WhatsApp não mostrar a versão antiga que guardou.

## Banners por rota

| Rota | og:image |
|---|---|
| `/`, `/conhecer/`, `/ajuda.html`, `/termos.html`, `/pedir.html`, `/pagar.html`, `/estado.html`, `/pago.html`, `/gestor/` | `https://diostock.pt/diostock-og.png?v=3` |
| `/convite.html` (e `?t=…`) | `https://diostock.pt/convite-og.png?v=1` |
| `/cartao.html`, `/c/`, `/n/` | `https://diostock.pt/cartao-og.png?v=3` |
| `/n/<código>/`, `/k/<token>/`, `/m/<código>/` (geradas) | `og.jpg?v=<hash>` da própria página (o cartão ou a campanha reais, em 1200×630); se faltar, `cartao-og.png?v=3` |

## Como é garantido

- `scripts/verificar-og.mjs` percorre **todas** as páginas `.html` do site, sem lista manual, e falha se alguma quebrar a regra. A única exceção é o ficheiro de verificação do Google.
- O GitHub Actions corre este script antes de guardar as páginas geradas.
- Uma página nova entra na verificação sozinha. Se não tiver o bloco acima, a publicação falha.
- O bloco de meta tags de cada página começa pelo comentário `PRÉ-VISUALIZAÇÃO (REGRA FIXA)`.

Não remover nem afrouxar esta regra sem autorização do dono do Dio'Stock.
