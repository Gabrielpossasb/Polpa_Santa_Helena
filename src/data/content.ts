/**
 * Textos das páginas "História" e "Contato", e os destaques da página inicial.
 *
 * Separado de `siteConfig.ts` (que guarda dados de contato) para você poder
 * reescrever os textos sem esbarrar em número de telefone ou endereço.
 *
 * ATENÇÃO: os textos abaixo foram escritos de forma genérica e verdadeira
 * (revendedora Pura Polpa em Campo Grande/MS). Eles NÃO inventam ano de
 * fundação, nomes ou números. Personalize com a história real da loja —
 * é isso que faz a página valer a pena.
 */

/** Um bloco de texto com título, usado nas páginas internas. */
export interface ContentBlock {
  /** Identificador único do bloco. */
  id: string;
  /** Título do bloco. */
  title: string;
  /** Parágrafos do bloco, um item por parágrafo. */
  paragraphs: string[];
}

/** Um valor/diferencial exibido em card na página de História. */
export interface ValueCard {
  /** Identificador único. */
  id: string;
  /** Ícone reaproveitado de `BenefitIcon`. */
  icon: 'leaf' | 'snowflake' | 'glass' | 'truck';
  /** Título curto. */
  title: string;
  /** Descrição de uma ou duas linhas. */
  description: string;
  /** Cor do ícone. */
  accent: 'green' | 'orange' | 'purple' | 'orchid';
}

/** Chamada principal da página inicial. */
export const heroContent = {
  /** Linha pequena acima do título. */
  eyebrow: 'Revendedora Pura Polpa · Campo Grande/MS',
  /** Título principal da página inicial. */
  title: 'Polpa de fruta congelada, 100% fruta de verdade',
  /** Parágrafo de apoio. */
  subtitle:
    'Sem conservantes, sem aditivos e sem açúcar adicionado. Cada quilo rende 10 pacotes de 100 g — o suficiente para sucos, vitaminas e drinks o mês inteiro.',
};

/** Blocos de texto da página "História". */
export const historyBlocks: ContentBlock[] = [
  {
    id: 'quem-somos',
    title: 'Quem somos',
    paragraphs: [
      'A Polpa Santa Helena é revendedora Pura Polpa em Campo Grande, no Mato Grosso do Sul. Levamos polpa de fruta congelada para a casa das pessoas, para lanchonetes, açaiterias e cozinhas que não abrem mão de fruta de verdade.',
      'Trabalhamos com um catálogo enxuto e honesto: as frutas que realmente saem, no ponto certo de congelamento, com preço por quilo que cabe no orçamento de casa e no cálculo de quem revende.',
    ],
  },
  {
    id: 'o-que-fazemos',
    title: 'O que entregamos',
    paragraphs: [
      'Nossa polpa é 100% fruta. Não entra conservante, corante nem aditivo — o sabor é o da fruta madura, colhida e congelada rapidamente para segurar o frescor.',
      'Cada quilo vem fracionado em 10 pacotes de 100 g. Você tira do congelador só o que vai usar, sem desperdício e sem precisar descongelar o pacote inteiro.',
    ],
  },
  {
    id: 'como-atendemos',
    title: 'Como atendemos',
    paragraphs: [
      'O pedido é feito direto pelo WhatsApp, sem aplicativo e sem cadastro. Você manda a lista, a gente confirma o valor e combina a entrega.',
      'Entregamos em Campo Grande e Terenos. Acima de 2 kg a entrega é gratuita; abaixo disso, há uma taxa de R$ 5,00. O pagamento pode ser no Pix ou no cartão.',
    ],
  },
];

/** Cards de valores da página "História". */
export const valueCards: ValueCard[] = [
  {
    id: 'fruta',
    icon: 'leaf',
    title: 'Fruta de verdade',
    description: '100% polpa de fruta, sem conservantes, aditivos ou açúcar adicionado.',
    accent: 'green',
  },
  {
    id: 'frescor',
    icon: 'snowflake',
    title: 'Congelamento rápido',
    description: 'A fruta é congelada no ponto para preservar sabor, cor e nutrientes.',
    accent: 'orchid',
  },
  {
    id: 'rendimento',
    icon: 'glass',
    title: 'Alto rendimento',
    description: 'Cada quilo rende 10 pacotes de 100 g, ideais para sucos e vitaminas.',
    accent: 'orange',
  },
  {
    id: 'atendimento',
    icon: 'truck',
    title: 'Entrega na cidade',
    description: 'Pedido direto no WhatsApp e entrega grátis a partir de 2 kg.',
    accent: 'green',
  },
];

/** Passos de "como fazer o pedido", exibidos na página de Contato. */
export const orderSteps: ContentBlock[] = [
  {
    id: 'passo-1',
    title: 'Escolha os sabores',
    paragraphs: ['Veja o catálogo e anote o que você quer e quantos quilos de cada sabor.'],
  },
  {
    id: 'passo-2',
    title: 'Chame no WhatsApp',
    paragraphs: ['Mande a lista pelo WhatsApp. Confirmamos a disponibilidade e o valor total.'],
  },
  {
    id: 'passo-3',
    title: 'Combine a entrega',
    paragraphs: ['Acertamos dia, horário e forma de pagamento. Acima de 2 kg, a entrega é grátis.'],
  },
];
