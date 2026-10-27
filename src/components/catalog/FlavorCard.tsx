/**
 * Card de um sabor de polpa: foto redonda, nome e preço por quilo.
 * O preço vem do grupo (`PriceTier`), não do sabor.
 */

import type { AccentColor, Flavor } from '../../types/catalog';
import { getAccent } from '../../lib/accents';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { PriceTag } from '../ui/PriceTag';
import { FlavorIcon } from './FlavorIcon';

/** Propriedades do {@link FlavorCard}. */
export interface FlavorCardProps {
  /** Sabor exibido no card. */
  flavor: Flavor;
  /** Preço por quilo do grupo, em centavos. */
  priceInCents: number;
  /** Cor da barra lateral e do fallback de ícone. */
  accent: AccentColor;
}

/**
 * Um card por sabor.
 *
 * @example
 * <FlavorCard
 *   flavor={{ id: 'uva', name: 'Uva', icon: '/icons/uva.webp' }}
 *   priceInCents={2900}
 *   accent="orange"
 * />
 */
export function FlavorCard({ flavor, priceInCents, accent }: FlavorCardProps) {
  const available = flavor.inStock !== false;
  const { text } = getAccent(accent);

  return (
    <Card as="li" accent={accent} available={available}>
      <div className="flex h-full flex-col items-center gap-2 py-4 pr-3 pl-5 text-center sm:py-5">
        <FlavorIcon
          name={flavor.name}
          icon={flavor.icon}
          accent={accent}
          className="h-16 w-16 sm:h-20 sm:w-20 xl:h-24 xl:w-24"
        />

        <h3 className="mt-0.5 font-display text-sm leading-tight font-bold text-balance text-plum sm:text-base">
          {flavor.name}
        </h3>

        {/* `mt-auto` mantém o preço alinhado embaixo mesmo com nomes de 2 linhas. */}
        <div className="mt-auto pt-1">
          {available ? (
            <PriceTag priceInCents={priceInCents} size="sm" className={text} />
          ) : (
            <Badge>Em falta</Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
