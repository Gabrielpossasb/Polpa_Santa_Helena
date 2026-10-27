/**
 * Textos das páginas "História" e "Contato", e os destaques da página inicial.
 *
 * Separado de `siteConfig.ts` (que guarda dados de contato) para você poder
 * reescrever os textos sem esbarrar em número de telefone ou endereço.
 *
 * A história em `historyBlocks` é a da família, contada pelo Gabriel.
 *
 * TODO: confirmar as datas. Hoje o único ano citado é o falecimento do
 * Elcio (março de 2026). Quando houver certeza do ano em que o negócio
 * começou e de quando a produção própria parou, vale incluir — data dá
 * concretude à história.
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
    'Sem conservantes, sem aditivos e sem açúcar adicionado. Cada quilo rende 10 pacotes de 100 g, o suficiente para sucos, vitaminas e drinks o mês inteiro.',
};

/** Blocos de texto da página "História". */
export const historyBlocks: ContentBlock[] = [
  {
    id: 'origem',
    title: 'A origem no cultivo',
    paragraphs: [
      'A Polpa Santa Helena nasceu do trabalho de Elcio da Silva Lemos Filho, fruticultor na região de Terenos, no Mato Grosso do Sul.',
      'Primeiro ele plantava e colhia. Com o tempo, passou a transformar a própria colheita em polpa congelada, dando início ao negócio que a família mantém até hoje.',
    ],
  },
  {
    id: 'a-marca',
    title: 'O nascimento da marca',
    paragraphs: [
      'A procura cresceu acima do que o pomar era capaz de produzir. Para atender a todos os clientes, Elcio passou a trazer polpa da Pura Polpa como complemento à sua produção.',
      'O processamento e a embalagem continuaram sob sua responsabilidade, com a marca que havia criado: Polpa Santa Helena.',
    ],
  },
  {
    id: 'a-virada',
    title: 'A mudança de modelo',
    paragraphs: [
      'Com os anos, manter a produção própria tornou-se inviável. Em vez de encerrar as atividades, Elcio optou por mudar o modelo e passou a atuar como revendedor da Pura Polpa, levando a mesma fruta de sempre aos mesmos clientes.',
      'A marca permaneceu. Mudou o caminho, não o compromisso.',
    ],
  },
  {
    id: 'hoje',
    title: 'A continuidade',
    paragraphs: [
      'Elcio faleceu em março de 2026. Desde então, a Polpa Santa Helena é conduzida por seus filhos, Gabriel Abraão Possas Borges e Helena Possas Borges, que acompanham e auxiliam no negócio desde a infância.',
      'A proposta é modernizar o que for possível, do catálogo ao atendimento, preservando o modo de tratar o cliente que aprendemos com ele. Os anos de trabalho do nosso pai são a base de tudo o que entregamos hoje.',
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
