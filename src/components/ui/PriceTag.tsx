/**
 * Exibição de preço na fonte dos números do catálogo (Inter, em negrito).
 *
 * Os preços NÃO usam a Playfair: número é informação que o cliente procura
 * com os olhos, e a grotesca em negrito lê mais rápido que uma serifada.
 */

import { formatCurrency, formatCurrencyPerUnit } from '../../lib/formatCurrency';

/** Propriedades do {@link PriceTag}. */
export interface PriceTagProps {
  /** Valor em centavos. Ex.: `2500` para R$ 25,00. */
  priceInCents: number;
  /**
   * Unidade mostrada após o preço. Passe `null` para esconder.
   * @default 'kg'
   */
  unit?: string | null;
  /**
   * Tamanho do texto.
   * - `sm` — dentro dos cards de sabor
   * - `md` — cards de produto e de pote
   * - `lg` — faixa de preço do grupo
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /** Classes extras, normalmente a cor do texto. */
  className?: string;
}

/** Classes de tamanho do valor e da unidade. */
const sizeClasses: Record<NonNullable<PriceTagProps['size']>, { price: string; unit: string }> = {
  sm: { price: 'text-base sm:text-lg', unit: 'text-[0.65rem]' },
  md: { price: 'text-xl sm:text-2xl', unit: 'text-xs' },
  lg: { price: 'text-[1.6rem] sm:text-4xl', unit: 'text-xs sm:text-sm' },
};

/**
 * Preço formatado em pt-BR com a unidade ao lado.
 *
 * O preço completo vai no `aria-label` para que leitores de tela leiam
 * "R$ 25,00 por kg" em vez de "R$ 25,00 barra KG".
 *
 * @example
 * <PriceTag priceInCents={2500} size="lg" className="text-white" />
 * // R$ 25,00 /KG
 *
 * @example
 * <PriceTag priceInCents={1600} unit={null} />
 * // R$ 16,00
 */
export function PriceTag({
  priceInCents,
  unit = 'kg',
  size = 'md',
  className = '',
}: PriceTagProps) {
  const { price, unit: unitSize } = sizeClasses[size];
  const label = unit ? formatCurrencyPerUnit(priceInCents, unit) : formatCurrency(priceInCents);

  return (
    <p className={`flex items-baseline gap-1 font-numeric font-extrabold ${className}`}>
      <span aria-hidden="true" className={`whitespace-nowrap ${price}`}>
        {formatCurrency(priceInCents)}
      </span>
      {unit && (
        <span
          aria-hidden="true"
          className={`font-sans font-bold tracking-wide uppercase opacity-80 ${unitSize}`}
        >
          /{unit}
        </span>
      )}
      {/* Texto acessível, lido no lugar das duas partes acima. */}
      <span className="sr-only">{label}</span>
    </p>
  );
}
