/**
 * ============================================================================
 *  CATÁLOGO — ÚNICO ARQUIVO QUE PRECISA SER EDITADO NO DIA A DIA
 * ============================================================================
 *
 * Aqui ficam todos os sabores, produtos e preços do site.
 *
 * COMO MUDAR UM PREÇO
 *   Troque o número de `priceInCents`. O valor é em CENTAVOS:
 *   R$ 30,00 -> 3000      R$ 7,50 -> 750      R$ 180,00 -> 18000
 *
 * COMO MARCAR UM ITEM COMO "EM FALTA"
 *   Acrescente `inStock: false` na linha do item. Para voltar a vender,
 *   apague esse trecho (ou troque para `true`).
 *     { id: 'uva', name: 'Uva', icon: '/icons/uva.webp', inStock: false },
 *
 * COMO ADICIONAR UM SABOR
 *   Copie uma linha existente dentro do grupo de preço certo e mude
 *   `id` (sem acento e sem espaço) e `name`. O `icon` é opcional.
 *
 * COMO ADICIONAR UM ÍCONE
 *   Coloque a imagem em `public/icons/` e aponte o caminho em `icon`.
 *   Sem ícone, o card mostra um círculo com a inicial do sabor.
 */

import type { AcaiPot, Benefit, ProductGroup, PriceTier } from '../types/catalog';

/**
 * Grupos de preço das polpas, na ordem em que aparecem na página.
 * Cada quilo contém 10 pacotes de 100 g.
 */
export const priceTiers: PriceTier[] = [
  {
    id: 'tier-30',
    priceInCents: 3000,
    accent: 'green',
    flavors: [
      { id: 'abacaxi', name: 'Abacaxi', icon: '/icons/abacaxi.webp' },
      { id: 'acerola', name: 'Acerola', icon: '/icons/acerola.webp' },
      { id: 'caju', name: 'Caju', icon: '/icons/caju.webp' },
      { id: 'goiaba', name: 'Goiaba', icon: '/icons/goiaba.webp' },
      { id: 'limao', name: 'Limão', icon: '/icons/limao.webp' },
      { id: 'tamarindo', name: 'Tamarindo', icon: '/icons/tamarindo.webp' },
    ],
  },
  {
    id: 'tier-35',
    priceInCents: 3500,
    accent: 'orange',
    flavors: [
      { id: 'abacaxi-hortela', name: 'Abacaxi c/ Hortelã', icon: '/icons/abacaxi-hortela.webp' },
      { id: 'acerola-laranja', name: 'Acerola c/ Laranja', icon: '/icons/acerola-laranja.webp' },
      { id: 'amora', name: 'Amora', icon: '/icons/amora.webp' },
      { id: 'coco', name: 'Coco', icon: '/icons/coco.webp' },
      { id: 'cupuacu', name: 'Cupuaçu', icon: '/icons/cupuacu.webp' },
      { id: 'frutas-vermelhas', name: 'Frutas Vermelhas', icon: '/icons/frutas-vermelhas.webp' },
      { id: 'graviola', name: 'Graviola', icon: '/icons/graviola.webp' },
      { id: 'morango', name: 'Morango', icon: '/icons/morango.webp' },
      { id: 'tangerina', name: 'Tangerina', icon: '/icons/tangerina.webp' },
      { id: 'uva', name: 'Uva', icon: '/icons/uva.webp' },
    ],
  },
  {
    id: 'tier-40',
    priceInCents: 4000,
    accent: 'purple',
    flavors: [
      { id: 'acai', name: 'Açaí', icon: '/icons/acai.webp' },
      { id: 'maracuja', name: 'Maracujá', icon: '/icons/maracuja.webp' },
    ],
  },
];

/**
 * Seção "Outros produtos", dividida nos mesmos grupos do catálogo impresso.
 * O açaí em creme tem seção própria (veja `acaiPots`), porque tem foto
 * de embalagem e é o carro-chefe.
 */
export const productGroups: ProductGroup[] = [
  {
    id: 'frutas-congeladas',
    title: 'Frutas congeladas',
    items: [
      {
        id: 'morango-congelado',
        name: 'Morango',
        priceInCents: 3500,
        unit: 'kg',
        accent: 'purple',
        icon: '/produtos/morango-congelado.webp',
      },
      {
        id: 'abacaxi-congelado',
        name: 'Abacaxi',
        priceInCents: 3000,
        unit: 'kg',
        accent: 'green',
        icon: '/produtos/abacaxi-congelado.webp',
      },
      {
        id: 'maracuja-congelado',
        name: 'Maracujá',
        priceInCents: 4000,
        unit: 'kg',
        accent: 'orange',
        icon: '/produtos/maracuja-congelado.webp',
      },
    ],
  },
  {
    id: 'pao-de-queijo',
    title: 'Pão de queijo',
    items: [
      {
        id: 'pao-de-queijo-congelado',
        name: 'Pão de queijo congelado',
        priceInCents: 3000,
        unit: 'kg',
        accent: 'green',
        icon: '/produtos/pao-de-queijo.webp',
      },
    ],
  },
];

/** Potes de Açaí Creme (Sorbet de Açaí com Guaraná), do menor para o maior. */
export const acaiPots: AcaiPot[] = [
  {
    id: 'acai-2l',
    name: 'Açaí 2 L',
    volume: '2 L',
    weight: '1,6 kg',
    description: 'Pote família',
    priceInCents: 4500,
    icon: '/acai/pote-2l.webp',
  },
  {
    id: 'acai-3-6l',
    name: 'Açaí 3,6 L',
    volume: '3,6 L',
    weight: '3,6 kg',
    description: 'Balde com alça',
    priceInCents: 7500,
    icon: '/acai/balde-3-6l.webp',
  },
  {
    id: 'acai-10l',
    name: 'Açaí 10 L',
    volume: '10 L',
    weight: '10 kg',
    description: 'Ideal para negócios',
    priceInCents: 18000,
    icon: '/acai/balde-10l.webp',
  },
];

/** Faixa de benefícios exibida na página inicial. */
export const benefits: Benefit[] = [
  {
    id: 'entrega',
    icon: 'truck',
    title: 'Entrega',
    lines: [
      'Campo Grande e Terenos',
      'Acima de 2 kg: entrega grátis',
      '2 kg ou menos: taxa de R$ 5,00',
    ],
    accent: 'green',
  },
  {
    id: 'fruta',
    icon: 'leaf',
    title: '100% da fruta',
    lines: ['Sem conservantes e aditivos'],
    accent: 'green',
  },
  {
    id: 'congeladas',
    icon: 'snowflake',
    title: 'Congeladas',
    lines: ['Mais sabor, mais frescor'],
    accent: 'orchid',
  },
  {
    id: 'rendimento',
    icon: 'glass',
    title: 'Alto rendimento',
    lines: ['Ideais para sucos, vitaminas e drinks'],
    accent: 'orange',
  },
];
