/**
 * Informações fixas da loja: contatos, entrega, pagamento e textos da marca.
 *
 * Para trocar o WhatsApp, mude `whatsapp.international` (usado no link)
 * E `whatsapp.display` (o que aparece na tela). Os dois precisam combinar.
 *
 * Para atender uma cidade nova, acrescente o nome em `serviceCities`: o
 * rodapé, a página de contato e o catálogo passam a citá-la sozinhos.
 */

/** Formato dos dados de configuração do site. */
export interface SiteConfig {
  /** Nome da loja. */
  name: string;
  /** Linha de apoio sob o nome. */
  tagline: string;
  /** Cidade e estado. */
  city: string;
  /** CNPJ da empresa, já formatado para exibição. */
  cnpj: string;
  /** Título principal da página. */
  pageTitle: string;
  /** Subtítulo do título principal. */
  pageSubtitle: string;
  /** Aviso sobre o fracionamento do quilo. */
  packagingNote: string;
  /** Dados de contato pelo WhatsApp. */
  whatsapp: {
    /** Número em formato internacional, só dígitos (entra na URL do wa.me). */
    international: string;
    /** Número formatado para leitura. */
    display: string;
    /** Mensagem já preenchida ao abrir a conversa. */
    defaultMessage: string;
  };
  /** Perfil do Instagram. */
  instagram: {
    /** Arroba exibida na tela. */
    handle: string;
    /** Endereço completo do perfil. */
    url: string;
  };
  /** Página do Facebook. */
  facebook: {
    /** Nome da página exibido na tela. */
    handle: string;
    /** Endereço completo da página. */
    url: string;
  };
  /** Regras de entrega. */
  delivery: {
    /** Título da área de entrega. */
    title: string;
    /** Regra de frete grátis. */
    freeFrom: string;
    /** Regra da taxa abaixo do mínimo. */
    fee: string;
  };
  /** Formas de pagamento aceitas. */
  payment: {
    /** Título da área de pagamento. */
    title: string;
    /** Lista de formas aceitas. */
    methods: string[];
  };
  /** Horário de atendimento, exibido na página de contato e no rodapé. */
  hours: string[];
  /**
   * Cidades atendidas pela entrega, exibidas na página de contato,
   * no rodapé e no catálogo. Para incluir uma cidade nova, basta
   * adicioná-la a esta lista.
   */
  serviceCities: string[];
  /** Frase da marca usada no rodapé. */
  footerPhrase: string;
}

/**
 * Configuração usada em toda a interface.
 *
 * @example
 * import { siteConfig } from './data/siteConfig';
 * console.log(siteConfig.whatsapp.display); // "(67) 99207-6026"
 */
export const siteConfig: SiteConfig = {
  name: 'Polpa Santa Helena',
  tagline: 'Revendedora Pura Polpa',
  city: 'Campo Grande/MS',
  cnpj: '66.038.465/0001-40',

  pageTitle: 'Catálogo',
  pageSubtitle: 'Produtos e Valores',
  packagingNote: 'Cada kg contém 10 pacotes de 100g',

  whatsapp: {
    international: '5567992076026',
    display: '(67) 99207-6026',
    defaultMessage:
      'Olá! Vi o catálogo da Polpa Santa Helena e gostaria de fazer um pedido.',
  },

  instagram: {
    handle: '@polpasantahelena',
    url: 'https://instagram.com/polpasantahelena',
  },

  facebook: {
    handle: '/polpasantahelena',
    url: 'https://www.facebook.com/polpasantahelena',
  },

  delivery: {
    title: 'Entrega',
    freeFrom: 'Acima de 2 kg: entrega grátis',
    fee: '2 kg ou menos: taxa de R$ 5,00',
  },

  payment: {
    title: 'Pagamento',
    methods: ['Pix', 'Cartão'],
  },

  hours: ['Segunda a sexta: 8h às 18h', 'Sábado e domingo: 8h às 16h'],

  serviceCities: ['Campo Grande', 'Terenos'],

  footerPhrase: 'Sabor que vem da natureza, qualidade que rende bons resultados!',
};
