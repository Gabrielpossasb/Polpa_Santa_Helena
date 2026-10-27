/**
 * Card da seção "Outros produtos": frutas congeladas e pão de queijo.
 * Diferente do sabor, cada produto tem o seu próprio preço.
 */

import type { ExtraProduct } from '../../types/catalog';
import { getAccent } from '../../lib/accents';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { PriceTag } from '../ui/PriceTag';

/** Propriedades do {@link ExtraProductCard}. */
export interface ExtraProductCardProps {
  /** Produto exibido no card. */
  product: ExtraProduct;
}

/**
 * Um card por produto extra.
 *
 * @example
 * <ExtraProductCard product={extraProducts[0]} />
 */
export function ExtraProductCard({ product }: ExtraProductCardProps) {
  const available = product.inStock !== false;
  const { text, bg } = getAccent(product.accent);

  return (
    <Card as="li" accent={product.accent} available={available}>
      <div className="flex h-full flex-col items-center gap-2 py-4 pr-3 pl-5 text-center">
        {/* Foto do produto (fundo já recortado) ou círculo com a inicial. */}
        {product.icon ? (
          <img
            src={product.icon}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20 xl:h-24 xl:w-24"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full sm:h-20 sm:w-20 ${bg}`}
          >
            <span className="font-display text-2xl font-bold text-white">
              {product.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <h3 className="font-display text-sm leading-tight font-bold text-balance text-plum sm:text-base">
          {product.name}
        </h3>

        <div className="mt-auto pt-1">
          {available ? (
            <PriceTag priceInCents={product.priceInCents} unit={product.unit} size="sm" className={text} />
          ) : (
            <Badge>Em falta</Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
