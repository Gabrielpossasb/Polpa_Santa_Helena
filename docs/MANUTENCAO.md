# Manutenção do site

Guia do dia a dia: mudar preço, acrescentar sabor, marcar item em falta,
trocar contato e publicar. Para a visão geral do projeto, veja o
[README](../README.md).

## Índice

1. [Os quatro arquivos que você edita](#os-quatro-arquivos-que-você-edita)
2. [Como mudar um preço](#como-mudar-um-preço)
3. [Como adicionar ou remover um sabor](#como-adicionar-ou-remover-um-sabor)
4. [Como marcar um item como "Em falta"](#como-marcar-um-item-como-em-falta)
5. [Como adicionar um ícone](#como-adicionar-um-ícone)
6. [Contatos, redes e cidades atendidas](#contatos-redes-e-cidades-atendidas)
7. [Cores e fontes](#cores-e-fontes)
8. [Como criar uma página nova](#como-criar-uma-página-nova)
9. [Como publicar](#como-publicar)
10. [Pendências](#pendências)

---

## Os quatro arquivos que você edita

Quase tudo no dia a dia acontece em **quatro arquivos**, todos em `src/data/`:

| Arquivo | Para quê |
| --- | --- |
| `catalog.ts` | Sabores, produtos, preços e estoque. |
| `siteConfig.ts` | WhatsApp, Instagram, Facebook, cidade, CNPJ, cidades atendidas, horário, entrega e pagamento. |
| `content.ts` | Textos das páginas História e Contato e da chamada inicial. |
| `navigation.ts` | Itens do menu do topo e do rodapé. |

Você **não precisa** mexer em nenhum outro arquivo para o trabalho normal.

> Depois de salvar, se o `npm run dev` estiver rodando, a página atualiza
> sozinha.

---

## Como mudar um preço

Abra `src/data/catalog.ts`. Os preços ficam em **centavos**, o que evita erro
de arredondamento.

| Você quer | Escreva |
| --- | --- |
| R$ 30,00 | `3000` |
| R$ 35,00 | `3500` |
| R$ 7,50 | `750` |
| R$ 180,00 | `18000` |

### Preço de um grupo inteiro de polpas

Cada grupo tem um `priceInCents` só. Mudar esse valor altera **todos** os
sabores daquele grupo de uma vez:

```ts
{
  id: 'tier-30',
  priceInCents: 3000,   // <-- troque aqui: vale para Abacaxi, Acerola, Caju...
  accent: 'green',
  flavors: [ ... ],
}
```

### Preço de um produto avulso

Em `productGroups` e `acaiPots`, cada item tem o seu próprio preço:

```ts
{
  id: 'pao-de-queijo',
  name: 'Pão de queijo congelado',
  priceInCents: 3000,   // <-- troque só aqui
  unit: 'kg',
  accent: 'green',
  icon: '/produtos/pao-de-queijo.webp',
},
```

---

## Como adicionar ou remover um sabor

### Adicionar

Copie uma linha de dentro do grupo de preço certo e mude o `id` e o `name`:

```ts
{
  id: 'tier-30',
  priceInCents: 3000,
  accent: 'green',
  flavors: [
    { id: 'abacaxi', name: 'Abacaxi', icon: '/icons/abacaxi.webp' },
    { id: 'manga', name: 'Manga' },          // <-- sabor novo, ainda sem foto
  ],
},
```

Regras do `id`:

- tudo minúsculo, sem acento e sem espaço (use `-` no lugar do espaço);
- não pode repetir um `id` que já exista.

Sem `icon`, o card mostra um **círculo colorido com a inicial** do sabor, o que
já fica apresentável até você ter a foto.

### Remover

Apague a linha inteira do sabor.

---

## Como marcar um item como "Em falta"

Acrescente `inStock: false` na linha do item:

```ts
{ id: 'uva', name: 'Uva', icon: '/icons/uva.webp', inStock: false },
```

O card fica esmaecido, o preço some e aparece o selo **EM FALTA**.

Para voltar a vender, **apague o `inStock: false`**:

```ts
{ id: 'uva', name: 'Uva', icon: '/icons/uva.webp' },
```

> Funciona igual em `priceTiers`, `productGroups` e `acaiPots`.
> Quando o campo não existe, o item é considerado disponível.

---

## Como adicionar um ícone

### Jeito automático (recomendado)

Se a foto vier do catálogo da Pura Polpa, não precisa editar imagem à mão:
coloque o arquivo original em `IMAGES/PRODUTOS/`, acrescente uma linha na lista
`SABORES` (ou `RECORTADOS`) de `scripts/prepare-images.mjs` e rode:

```bash
npm i -D sharp && node scripts/prepare-images.mjs && npm uninstall sharp
```

O script corta no quadrado, converte para WebP 200 × 200 e grava em
`public/icons/`. Nos "outros produtos" ele ainda apaga o fundo branco.

> O `sharp` **não** é dependência do projeto. As imagens já ficam prontas
> dentro de `public/`, então ele só é instalado na hora de gerar e removido
> logo depois. Por isso o `npm uninstall` no fim da linha.

Se precisar de um recorte diferente (para fugir do selo "Pura Polpa", por
exemplo), a lista `SABORES` aceita um terceiro valor, `{ left, top, size }`, em
pixels da imagem original. A Tangerina usa esse recurso.

### Jeito manual

1. Salve a imagem em `public/icons/` (para sabores) ou `public/produtos/`
   (para outros produtos). Use `.webp` ou `.png`, quadrada, com pelo menos
   200 × 200 pixels.
2. Aponte o caminho no `icon`, **começando com `/` e sem escrever `public`**:

```ts
{ id: 'manga', name: 'Manga', icon: '/icons/manga.webp' },
```

| Arquivo salvo em | Caminho no `icon` |
| --- | --- |
| `public/icons/manga.webp` | `/icons/manga.webp` |
| `public/produtos/uva-congelada.webp` | `/produtos/uva-congelada.webp` |
| `public/acai/pote-5l.webp` | `/acai/pote-5l.webp` |

As fotos dos **sabores** aparecem dentro de um círculo, então centralize a
fruta na imagem. As fotos de **outros produtos** e de **potes de açaí**
aparecem inteiras, e ficam melhores com fundo transparente.

---

## Contatos, redes e cidades atendidas

Em `src/data/siteConfig.ts`, mude os **dois** campos do número:

```ts
whatsapp: {
  international: '5567992076026',   // só números: 55 + DDD + número (entra no link)
  display: '(67) 99207-6026',       // como aparece escrito na tela
  defaultMessage: 'Olá! Vi o catálogo da Polpa Santa Helena e gostaria de fazer um pedido.',
},
```

- `international` é o que monta o link `https://wa.me/...`. **Sem espaços,
  parênteses ou traços**, e sempre começando com `55`.
- `display` é só visual.
- `defaultMessage` é o texto que já vem escrito quando o cliente abre a conversa.

No mesmo arquivo você também muda o CNPJ, o horário de atendimento, as regras
de entrega, as formas de pagamento e a frase do rodapé.

As redes seguem o mesmo formato. O `handle` é o que aparece escrito e a `url` é
para onde o link leva:

```ts
instagram: { handle: '@polpasantahelena', url: 'https://instagram.com/polpasantahelena' },
facebook:  { handle: '/polpasantahelena', url: 'https://www.facebook.com/polpasantahelena' },
```

### Cidades atendidas

Para passar a entregar em outra cidade, acrescente o nome na lista:

```ts
serviceCities: ['Campo Grande', 'Terenos'],
```

O rodapé e a página de contato passam a citar a cidade nova sozinhos. A frase
("Campo Grande e Terenos", "Campo Grande, Terenos e Sidrolândia") é montada por
`src/lib/formatCityList.ts`.

> **Um lugar fica de fora e é escrito à mão:** a faixa de benefícios do
> catálogo, em `benefits` dentro de `src/data/catalog.ts`. Ajuste junto se
> mudar a lista de cidades ou o valor da taxa de entrega.

---

## Cores e fontes

Ficam todas em `src/index.css`, no bloco `@theme`. Os valores foram tirados do
próprio catálogo da loja, que fica em `IMAGES/PRODUTOS/`.

| Token | Cor | Onde aparece |
| --- | --- | --- |
| `cream` | `#FCF4E9` | fundo da página |
| `cream-deep` | `#F7EBD7` | faixas e etiquetas |
| `plum` | `#2D054E` | títulos e grupo de R$ 40,00 |
| `plum-soft` | `#4B2A6B` | textos secundários |
| `grove` | `#4A7B02` | grupo de R$ 30,00 |
| `tangerine` | `#E57802` | grupo de R$ 35,00 |
| `orchid` | `#8E4A9E` | potes de açaí |
| `gold` | `#D9A95A` | molduras |
| `gold-soft` | `#E8D5AE` | linhas finas e bordas dos cards |
| `gold-deep` | `#C8801E` | ornamentos e subtítulos |
| `ink` | `#4A4055` | texto corrido |

Fontes (Google Fonts, carregadas no `index.html`):

| Token | Fonte | Uso |
| --- | --- | --- |
| `font-display` | Playfair Display | títulos e nomes de sabores |
| `font-serif` | Cormorant Garamond | subtítulos e frases em itálico |
| `font-sans` | Lato | texto corrido |
| `font-numeric` | Inter | **preços, volumes e pesos** |

Para trocar a cor de um grupo de preço, mude o `accent` dele em
`src/data/catalog.ts` para `'green'`, `'orange'`, `'purple'` ou `'orchid'`.

### Por que os números têm fonte própria

Todo número que o cliente precisa **ler rápido** (preço, volume do pote, peso)
sai na `font-numeric`, a Inter em negrito, a mesma grotesca dos números do
catálogo do Instagram. As serifadas ficam para títulos e textos.

A Playfair e a Cormorant usam algarismos *old-style*, mais baixos que as letras
e alguns descendo abaixo da linha. Isso é bonito em texto corrido, mas deixa um
preço com cara de torto. Onde ainda sobra número em fonte serifada, como no
selo "Cada kg contém 10 pacotes de 100g", use a classe `nums-lining` para
forçar os algarismos altos.

---

## Como criar uma página nova

1. Crie o componente em `src/pages/`.
2. Registre a rota em `src/App.tsx`, dentro de `<Route element={<SiteLayout />}>`.
3. Acrescente o link em `src/data/navigation.ts`, e ele aparece no topo e no
   rodapé.

A ideia é manter **dados** (`src/data`) separados da **aparência**
(`src/components`). Trocar um preço nunca deve exigir mexer em componente.

---

## Como publicar

O repositório tem duas branches:

| Branch | Para quê | Onde aparece |
| --- | --- | --- |
| `dev` | trabalho em andamento | link de preview `.vercel.app` |
| `main` | o que está no ar | polpasantahelena.com.br |

Fluxo normal:

```bash
git switch dev
# edite, confira no npm run dev
git add -A
git commit -m "descrição do que mudou"
git push
```

A Vercel atualiza o preview da `dev` em cerca de um minuto. Quando estiver bom,
leve para produção:

```bash
git switch main
git merge dev
git push
git switch dev
```

> Antes de qualquer `push`, vale rodar `npm run build` e `npm run lint`. O
> build faz a checagem de tipos, então ele pega erro que o navegador não
> mostraria no `npm run dev`.

Se o `git push` for recusado com *"Updates were rejected"*, é porque o GitHub
tem commit que você não tem localmente (uma edição feita pelo site, por
exemplo). Resolva com `git pull` antes de empurrar de novo.

---

## Pendências

- **Fotos provisórias.** As fotos dos sabores vieram do catálogo da Pura Polpa
  e estão ali só para o site não ficar vazio. A ideia é substituí-las pelas
  fotos reais de cada pacote. Veja
  [Como adicionar um ícone](#como-adicionar-um-ícone).
- **Datas da História.** O texto de `historyBlocks`, em `src/data/content.ts`,
  já é a história real da família, mas só cita um ano: março de 2026. Quando
  houver certeza de quando o negócio começou e de quando a produção própria
  parou, vale incluir.
- **Fotos com marca d'água.** As fotos de *Acerola c/ Laranja* e *Limão* têm o
  selo "Pura Polpa" impresso. Para tirar, basta substituir os arquivos em
  `public/icons/`. Na *Tangerina* o selo foi evitado com um recorte manual, ao
  custo de a foto ficar um pouco mais aproximada que as outras.
- **Foto não usada.** `public/acai/pote-500ml.webp` ficou sem uso, porque o
  pote de 500 ml saiu da tabela nova. O arquivo foi mantido caso o produto
  volte.
