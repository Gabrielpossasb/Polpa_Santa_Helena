# Polpa Santa Helena

Catálogo online de uma distribuidora de polpas de fruta congeladas em Campo Grande/MS.
No ar em **[polpasantahelena.com.br](https://polpasantahelena.com.br)**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

---

## O que é

Três páginas — catálogo, história e contato — que substituem o encaminhamento
de fotos de tabela de preço por WhatsApp. Não tem carrinho, login nem banco de
dados: cada produto leva direto para uma conversa no WhatsApp com a mensagem
já preenchida.

A escolha foi deliberada. O pedido já acontecia por WhatsApp e o volume não
justifica checkout; adicionar backend traria custo recorrente e manutenção sem
resolver nenhum problema real do negócio.

---

## Decisões técnicas

**Preço em centavos, nunca em float.** Todo valor no catálogo é `number`
inteiro (`2500` = R$ 25,00), formatado só na renderização. Elimina erro de
arredondamento de ponto flutuante em qualquer soma ou comparação.

**Dados separados da apresentação.** Todo o catálogo vive em
`src/data/catalog.ts`, tipado por `src/types/catalog.ts`. Os componentes não
sabem o que é açaí — recebem props. Mudar um preço é editar uma linha, sem
tocar em JSX.

**Pipeline próprio de imagens** (`scripts/prepare-images.mjs`). Script em Node
com `sharp` que recorta, remove fundo por *flood fill* a partir das bordas e
exporta WebP. O flood fill preserva áreas internas da mesma cor — o branco do
rótulo de um pote não é apagado junto com o fundo branco. Roda fora do build e
os resultados ficam versionados, então `sharp` não é dependência do projeto.

**Performance de carregamento.** Todas as imagens em WebP, `preconnect` para o
Google Fonts e carregamento só dos pesos de fonte efetivamente usados.

**SEO e compartilhamento.** `lang="pt-BR"`, canonical, meta description,
Open Graph e Twitter Card completos. A `og:image` usa URL absoluta — WhatsApp e
Facebook leem a página de fora e não resolvem caminho relativo.

**SPA com rotas reais.** React Router 7 com rewrite na Vercel, para que
`/contato` funcione em acesso direto e não só por navegação interna.

**Organização por domínio.** Componentes agrupados em `catalog/`, `layout/`,
`ui/`, `home/` e `whatsapp/`, com os utilitários puros isolados em `src/lib/`.

---

## Stack

| | |
|---|---|
| Front-end | React 19, TypeScript, React Router 7 |
| Estilo | Tailwind CSS 4 |
| Build | Vite 7 |
| Imagens | sharp (script offline), WebP |
| Qualidade | ESLint, TypeScript strict |
| Deploy | Vercel, com publicação a cada push na `main` |

---

## Como rodar

Requer Node.js 20 ou superior.

```bash
git clone https://github.com/Gabrielpossasb/Polpa_Santa_Helena.git
cd Polpa_Santa_Helena
npm install
npm run dev
```

Abre em `http://localhost:5173`.

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checagem de tipos + build de produção em `dist/` |
| `npm run preview` | Serve o build local |
| `npm run lint` | ESLint |

### Regerar as imagens do catálogo

Só é necessário ao trocar as fotos originais em `IMAGES/PRODUTOS/`:

```bash
npm i -D sharp
node scripts/prepare-images.mjs
```

---

## Estrutura

```
src/
├── components/     # agrupados por domínio: catalog, layout, ui, home, whatsapp
├── data/           # catálogo, configuração do site, textos e navegação
├── lib/            # utilitários puros (moeda, acentos, links de WhatsApp)
├── pages/          # uma por rota
└── types/          # tipos do domínio
scripts/            # pipeline de imagens (roda fora do build)
```

---

## Manutenção

Para alterar preços, adicionar sabores, marcar itens em falta ou trocar os
contatos, veja **[docs/MANUTENCAO.md](docs/MANUTENCAO.md)**.
