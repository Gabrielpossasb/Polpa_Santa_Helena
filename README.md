# Polpa Santa Helena — site institucional

Site da loja com três páginas: **Catálogo** (início), **História** e **Contato**.
É vitrine: não tem carrinho, login, banco de dados nem pagamento — todo pedido
acontece pelo WhatsApp.

**Revendedora Pura Polpa — Campo Grande/MS**

No ar em **https://polpasantahelena.com.br** (hospedado na Vercel, publicado
a cada `git push` na branch `main`).

| Página | Endereço | O que tem |
| --- | --- | --- |
| Catálogo | `/` | Chamada da marca, diferenciais e o catálogo completo |
| História | `/historia` | Quem é a loja, o que entrega e como atende |
| Contato | `/contato` | Canais, horário, entrega, pagamento e como pedir |

---

## Índice

1. [Como rodar](#como-rodar)
2. [O arquivo que você vai editar](#o-arquivo-que-voce-vai-editar)
3. [Como mudar um preço](#como-mudar-um-preco)
4. [Como adicionar ou remover um sabor](#como-adicionar-ou-remover-um-sabor)
5. [Como marcar um item como "Em falta"](#como-marcar-um-item-como-em-falta)
6. [Como adicionar um ícone](#como-adicionar-um-icone)
7. [Como trocar o WhatsApp e os contatos](#como-trocar-o-whatsapp-e-os-contatos)
8. [Como publicar na Vercel](#como-publicar-na-vercel)
9. [Estrutura do projeto](#estrutura-do-projeto)
10. [Cores e fontes (tema)](#cores-e-fontes-tema)
11. [Responsividade](#responsividade)
12. [Refazer as imagens dos produtos](#refazer-as-imagens-dos-produtos)
13. [Pendências (TODO)](#pendencias-todo)

---

## Como rodar

Você precisa do [Node.js](https://nodejs.org) 20 ou mais novo.

```bash
npm install     # só na primeira vez
npm run dev     # abre em http://localhost:5173
```

Outros comandos:

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o site no seu computador, atualizando sozinho a cada alteração. |
| `npm run build` | Gera a versão final em `dist/`. |
| `npm run preview` | Mostra como ficou a versão final, antes de publicar. |
| `npm run lint` | Confere se o código está sem erros. |

---

## O arquivo que você vai editar

Quase tudo no dia a dia acontece em **quatro arquivos**, todos em `src/data/`:

| Arquivo | Para quê |
| --- | --- |
| `catalog.ts` | Sabores, produtos, preços e estoque. |
| `siteConfig.ts` | WhatsApp, Instagram, Facebook, cidade, CNPJ, cidades atendidas, horário, entrega e pagamento. |
| `content.ts` | Textos das páginas História e Contato e da chamada inicial. |
| `navigation.ts` | Itens do menu do topo e do rodapé. |

Você **não precisa** mexer em nenhum outro arquivo para o trabalho normal.

> Depois de salvar, se o `npm run dev` estiver rodando, a página atualiza
> sozinha. Para publicar as mudanças, veja [Como publicar na Vercel](#como-publicar-na-vercel).

---

## Como mudar um preço

Abra `src/data/catalog.ts`. Os preços ficam em **centavos** — isso evita erro
de arredondamento.

| Você quer | Escreva |
| --- | --- |
| R$ 25,00 | `2500` |
| R$ 29,00 | `2900` |
| R$ 7,50 | `750` |
| R$ 190,00 | `19000` |

### Preço de um grupo inteiro de polpas

Cada grupo tem um `priceInCents` só. Mudar ele altera **todos** os sabores
daquele grupo de uma vez:

```ts
{
  id: 'tier-25',
  priceInCents: 2500,   // <-- troque aqui: vale para Abacaxi, Acerola, Caju...
  accent: 'green',
  flavors: [ ... ],
}
```

### Preço de um produto avulso

Em `extraProducts` e `acaiPots`, cada item tem o seu próprio preço:

```ts
{
  id: 'pao-de-queijo',
  name: 'Pão de queijo congelado',
  priceInCents: 2500,   // <-- troque só aqui
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
  id: 'tier-25',
  priceInCents: 2500,
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

Sem `icon`, o card mostra um **círculo colorido com a inicial** do sabor — já
fica apresentável até você ter a foto.

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

> Funciona igual em `priceTiers`, `extraProducts` e `acaiPots`.
> Quando o campo não existe, o item é considerado disponível.

---

## Como adicionar um ícone

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

### Jeito automático (recomendado)

Se a foto vier do catálogo da Pura Polpa, não precisa editar nada à mão:
jogue o arquivo original em `IMAGES/PRODUTOS/`, acrescente uma linha na lista
`SABORES` (ou `RECORTADOS`) de `scripts/prepare-images.mjs` e rode:

```bash
npm i -D sharp && node scripts/prepare-images.mjs && npm uninstall sharp
```

O script corta no quadrado, converte para WebP 200 × 200 e grava em
`public/icons/`. Nos "outros produtos" ele ainda apaga o fundo branco.

> O `sharp` **não** é dependência do projeto — as imagens já ficam prontas
> dentro de `public/`, então ele só é instalado na hora de gerar e removido
> logo depois. Por isso o `npm uninstall` no fim da linha.

---

## Como trocar o WhatsApp e os contatos

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

No mesmo arquivo você também muda o Instagram, o Facebook, a cidade, o CNPJ,
as regras de entrega, as formas de pagamento e a frase do rodapé.

As redes seguem o mesmo formato — `handle` é o que aparece escrito e `url` é
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

O rodapé, a página de contato e o texto da História passam a citar a cidade
nova sozinhos — a frase ("Campo Grande e Terenos", "Campo Grande, Terenos e
Sidrolândia") é montada por `src/lib/formatCityList.ts`.

> **Dois lugares ficam de fora e são escritos à mão:** a faixa de benefícios do
> catálogo (`benefits`, em `src/data/catalog.ts`) e o bloco "Como atendemos"
> (`historyBlocks`, em `src/data/content.ts`). Ajuste os dois junto se mudar a
> lista de cidades ou o valor da taxa de entrega.

---

## Como publicar na Vercel

### Primeira vez

1. Suba o projeto para um repositório no GitHub.
2. Entre em [vercel.com](https://vercel.com) e clique em **Add New → Project**.
3. Escolha o repositório. A Vercel reconhece o Vite sozinho; confira:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Clique em **Deploy**.

O arquivo `vercel.json` já está no projeto com essa configuração.

### Nas próximas vezes

Todo `git push` para a branch principal publica sozinho. Em resumo:

```bash
git add .
git commit -m "Atualiza preços da semana"
git push
```

Em cerca de um minuto o site no ar já está atualizado.

### Sem GitHub (opcional)

```bash
npm i -g vercel
vercel --prod
```

---

## Estrutura do projeto

```
public/                        imagens já prontas para o site
  icons/                       fotos dos sabores (medalhão redondo)
  produtos/                    fotos de "outros produtos"
  acai/                        fotos dos potes de açaí
  logo-polpa-santa-helena.png  logo do cabeçalho
  favicon.png · og-image.jpg   ícone da aba e imagem de compartilhamento

IMAGES/PRODUTOS/               imagens ORIGINAIS (não são usadas pelo site)
scripts/prepare-images.mjs     gera a pasta public/ a partir das originais

src/
  main.tsx                     liga o React e o roteador na página
  App.tsx                      mapa de rotas (/, /historia, /contato)
  index.css                    TEMA: cores, fontes e sombras
  types/catalog.ts             formato dos dados
  data/
    catalog.ts                 >>> SABORES, PRODUTOS E PREÇOS <<<
    siteConfig.ts              >>> CONTATOS, HORÁRIO E ENTREGA <<<
    content.ts                 >>> TEXTOS DAS PÁGINAS <<<
    navigation.ts              >>> ITENS DO MENU <<<
  pages/
    HomePage.tsx               página inicial (catálogo)
    HistoriaPage.tsx           página /historia
    ContatoPage.tsx            página /contato
    NaoEncontradaPage.tsx      erro 404
  lib/
    formatCurrency.ts          deixa os preços no formato "R$ 30,00"
    formatCityList.ts          junta as cidades em "Campo Grande e Terenos"
    whatsapp.ts                monta o link do WhatsApp
    accents.ts                 traduz a cor do grupo em classes do Tailwind
  components/
    ui/                        peças genéricas: Card, Badge, PriceTag,
                               SectionTitle, Ornament, InstagramIcon
    layout/                    SiteLayout, Header, Footer, Section, PageHero
    home/                      Hero e a faixa de chamada (CallToAction)
    catalog/                   as seções e os cards do catálogo
    whatsapp/                  botão fixo e botão de conteúdo
```

### Como criar uma página nova

1. Crie o componente em `src/pages/`.
2. Registre a rota em `src/App.tsx`, dentro de `<Route element={<SiteLayout />}>`.
3. Acrescente o link em `src/data/navigation.ts` — ele aparece no topo e no rodapé.

A ideia: **dados** (`src/data`) separados da **aparência** (`src/components`).
Trocar um preço nunca deve exigir mexer em componente.

---

## Cores e fontes (tema)

Ficam todas em `src/index.css`, no bloco `@theme`. Os valores foram tirados
do próprio catálogo da loja, que fica em `IMAGES/PRODUTOS/`.

| Token | Cor | Onde aparece |
| --- | --- | --- |
| `cream` | `#FCF4E9` | fundo da página |
| `cream-deep` | `#F7EBD7` | faixas e etiquetas |
| `plum` | `#2D054E` | títulos e grupo de R$ 35,00 |
| `plum-soft` | `#4B2A6B` | textos secundários |
| `grove` | `#4A7B02` | grupo de R$ 25,00 |
| `tangerine` | `#E57802` | grupo de R$ 29,00 |
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

Todo número que o cliente precisa **ler rápido** — preço, volume do pote,
peso — sai na `font-numeric` (Inter em negrito), a mesma grotesca dos números
do catálogo do Instagram. As serifadas ficam para títulos e textos.

A Playfair e a Cormorant usam algarismos *old-style* (mais baixos que as
letras, alguns descendo abaixo da linha). Isso é bonito em um texto corrido,
mas deixa um preço com cara de torto. Onde ainda sobra número em fonte
serifada — o selo "Cada kg contém 10 pacotes de 100g", por exemplo — use a
classe `nums-lining` para forçar os algarismos altos.

---

## Responsividade

O site é **mobile-first** e foi conferido de 320 px até 1920 px, sem rolagem
horizontal em nenhuma largura.

| Largura | Aparelho típico | Sabores | Outros produtos | Açaí | Benefícios |
| --- | --- | --- | --- | --- | --- |
| até 639 px | celular | 2 colunas | 2 colunas | 2 colunas | 1 coluna |
| 640–767 px | celular grande | 3 colunas | 2 colunas | 2 colunas | 2 colunas |
| 768–1023 px | **tablet retrato** | 4 colunas | 4 colunas | 4 colunas | 2 colunas |
| 1024–1279 px | tablet paisagem / notebook | 4 colunas | 4 colunas | 4 colunas | 4 colunas |
| 1280 px ou mais | **computador** | 4 colunas | 4 colunas | 4 colunas | 4 colunas |

Outros ajustes por tamanho de tela:

- a "folha" do catálogo vai até 1024 px e cresce para 1152 px em telas grandes
  (`xl`), ficando centrada — mantém o aspecto de página impressa em vez de
  esticar de ponta a ponta no monitor;
- logo, título e medalhões das frutas aumentam em degraus (`sm` → `md` → `xl`);
- o botão flutuante do WhatsApp mostra só o ícone no celular e ganha o texto
  "Fazer pedido" a partir de `sm`, para não cobrir os cards;
- os ramos decorativos de baixo só aparecem a partir de `sm`, porque no celular
  disputariam espaço com o rodapé.

Os cortes são os padrões do Tailwind: `sm` = 640 px, `md` = 768 px,
`lg` = 1024 px, `xl` = 1280 px.

---

## Refazer as imagens dos produtos

A pasta `public/` já vem pronta e versionada — **no dia a dia você não precisa
fazer nada aqui**.

Se um dia precisar reprocessar (por exemplo, ao receber fotos novas), coloque
as originais em `IMAGES/PRODUTOS/`, ajuste as listas no topo de
`scripts/prepare-images.mjs` e rode:

```bash
npm i -D sharp
node scripts/prepare-images.mjs
```

O script recorta os sabores em quadrado, remove o fundo branco das fotos de
produto e gera a logo, o favicon e a imagem de compartilhamento.

> O `sharp` **não** é dependência do site: ele só serve para esse script,
> por isso é instalado na hora e pode ser removido depois.

---

## Pendências (TODO)

- **Fotos provisórias.** As fotos dos sabores vieram do catálogo da Pura
  Polpa e estão ali só para o site não ficar vazio. A ideia é substituí-las
  pelas fotos reais de cada pacote. Quando elas chegarem, veja
  [Como adicionar um ícone](#como-adicionar-um-ícone) — o caminho automático
  resolve em uma linha de comando.
- **Horário de atendimento.** Os horários em `siteConfig.hours` são um chute
  (“Segunda a sexta: 8h às 18h / Sábado: 8h às 12h”). **Confirme e corrija**,
  porque eles aparecem no rodapé e na página de Contato.
- **Personalizar a História.** Os textos em `src/data/content.ts` são
  verdadeiros, mas genéricos de propósito: não inventei ano de fundação,
  nomes nem números. Contar a história real da loja é o que faz essa página
  valer a pena.
- **Fotos com marca d'água.** As fotos de *Acerola c/ Laranja* e *Limão* têm o
  selo "Pura Polpa" impresso. Se quiser sem o selo, é só substituir os
  arquivos em `public/icons/`. Na *Tangerina* o selo foi evitado com um
  recorte manual (veja `SABORES` em `scripts/prepare-images.mjs`), ao custo de
  a foto ficar um pouco mais aproximada que as outras.
- **Foto não usada.** `public/acai/pote-500ml.webp` ficou sem uso, porque o
  pote de 500 ml saiu da tabela nova. O arquivo foi mantido caso o produto
  volte.
