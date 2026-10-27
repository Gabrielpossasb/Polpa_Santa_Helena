/**
 * Tipos do catálogo.
 *
 * Define o formato dos dados que ficam em `src/data/catalog.ts`.
 * Mexa aqui apenas se precisar de um campo novo; para mudar preços
 * ou sabores, edite `src/data/catalog.ts`.
 */

/**
 * Cor de acento de um card ou faixa.
 *
 * São as mesmas cores do catálogo impresso:
 * - `green`  — grupo de R$ 25,00/kg
 * - `orange` — grupo de R$ 29,00/kg
 * - `purple` — grupo de R$ 35,00/kg
 * - `orchid` — roxo médio, usado nos potes de açaí
 */
export type AccentColor = 'green' | 'orange' | 'purple' | 'orchid';

/**
 * Campos comuns a todo item vendável do catálogo.
 *
 * @example
 * const item: CatalogItem = { id: 'uva', name: 'Uva', priceInCents: 2900 };
 */
export interface CatalogItem {
  /** Identificador único e estável (usado como `key` do React). */
  id: string;
  /** Nome exibido no card, em português. Ex.: `'Acerola c/ Laranja'`. */
  name: string;
  /**
   * Preço em CENTAVOS, para não ter erro de arredondamento.
   * Ex.: `2500` = R$ 25,00.
   */
  priceInCents: number;
  /**
   * Caminho da imagem dentro de `public/`. Opcional:
   * sem imagem, o card mostra um círculo com a inicial do item.
   *
   * @example '/icons/uva.webp'
   */
  icon?: string;
  /**
   * `false` deixa o card esmaecido com o selo "Em falta".
   * Quando omitido, o item é considerado disponível.
   */
  inStock?: boolean;
}

/**
 * Um sabor de polpa dentro de um grupo de preço.
 *
 * O preço NÃO fica no sabor: ele vem do grupo (`PriceTier`) ao qual pertence,
 * assim basta mudar um número para alterar o grupo inteiro.
 *
 * @example
 * const uva: Flavor = { id: 'uva', name: 'Uva', icon: '/icons/uva.webp' };
 */
export type Flavor = Omit<CatalogItem, 'priceInCents'>;

/**
 * Grupo de sabores que compartilham o mesmo preço por quilo.
 *
 * @example
 * const grupo: PriceTier = {
 *   id: 'tier-25',
 *   priceInCents: 2500,
 *   accent: 'green',
 *   flavors: [{ id: 'caju', name: 'Caju' }],
 * };
 */
export interface PriceTier {
  /** Identificador único do grupo. */
  id: string;
  /** Preço por quilo, em centavos, válido para todos os sabores do grupo. */
  priceInCents: number;
  /** Cor da faixa de preço e da barra lateral dos cards. */
  accent: AccentColor;
  /** Sabores que custam esse preço. */
  flavors: Flavor[];
}

/**
 * Item da seção "Outros produtos" (frutas congeladas, pão de queijo).
 * Diferente do sabor, cada um tem o seu próprio preço.
 */
export interface ExtraProduct extends CatalogItem {
  /** Unidade mostrada ao lado do preço. Ex.: `'kg'`. */
  unit: string;
  /** Cor da barra lateral do card. */
  accent: AccentColor;
}

/**
 * Grupo de produtos com um subtítulo próprio dentro de "Outros produtos",
 * como as colunas "Frutas congeladas" e "Pão de queijo" do catálogo impresso.
 *
 * @example
 * const grupo: ProductGroup = {
 *   id: 'frutas-congeladas',
 *   title: 'Frutas congeladas',
 *   items: [{ id: 'morango', name: 'Morango', priceInCents: 3500, unit: 'kg', accent: 'purple' }],
 * };
 */
export interface ProductGroup {
  /** Identificador único do grupo. */
  id: string;
  /** Subtítulo exibido acima dos cards. */
  title: string;
  /** Produtos do grupo. */
  items: ExtraProduct[];
}

/**
 * Pote de açaí (Sorbet de Açaí com Guaraná) da seção "Açaí em pote".
 */
export interface AcaiPot extends CatalogItem {
  /** Volume do pote, como aparece na embalagem. Ex.: `'2 L'`. */
  volume: string;
  /** Peso líquido, quando a embalagem informa. Ex.: `'1,6 kg'`. */
  weight?: string;
  /** Frase curta de apoio. Ex.: `'Pote família'`. */
  description: string;
}

/**
 * Benefício exibido na faixa inferior (entrega, 100% da fruta, etc.).
 */
export interface Benefit {
  /** Identificador único do benefício. */
  id: string;
  /** Nome do ícone desenhado por `BenefitIcon`. */
  icon: 'truck' | 'leaf' | 'snowflake' | 'glass';
  /** Título curto em caixa alta. Ex.: `'ENTREGA'`. */
  title: string;
  /** Linhas de detalhe exibidas abaixo do título. */
  lines: string[];
  /** Cor do ícone. */
  accent: AccentColor;
}
