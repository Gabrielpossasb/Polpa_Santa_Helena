/**
 * Card de um pote de açaí: foto da embalagem, volume, peso,
 * descrição curta e preço.
 */

import type { AcaiPot } from '../../types/catalog';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { PriceTag } from '../ui/PriceTag';

/** Propriedades do {@link AcaiPotCard}. */
export interface AcaiPotCardProps {
  /** Pote exibido no card. */
  pot: AcaiPot;
}

/**
 * Um card por tamanho de pote.
 *
 * @example
 * <AcaiPotCard pot={acaiPots[0]} />
 */
export function AcaiPotCard({ pot }: AcaiPotCardProps) {
  const available = pot.inStock !== false;

  return (
    <Card as="li" accent="orchid" available={available}>
      <div className="flex h-full flex-col items-center gap-1.5 px-3 py-4 pl-5 text-center">
        {/* Foto da embalagem. */}
        {pot.icon ? (
          <img
            src={pot.icon}
            alt={`Pote de ${pot.volume} de sorbet de açaí com guaraná`}
            loading="lazy"
            decoding="async"
            className="h-24 w-full shrink-0 object-contain sm:h-28 xl:h-32"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-24 w-full items-center justify-center rounded-lg bg-orchid/10 sm:h-28"
          >
            <span className="font-numeric text-2xl font-extrabold text-orchid">{pot.volume}</span>
          </div>
        )}

        {/* Volume em destaque. */}
        <p className="font-numeric text-lg font-extrabold text-plum sm:text-xl">{pot.volume}</p>

        {/* Descrição e peso. */}
        <p className="font-sans text-sm leading-snug text-ink">
          {pot.description}
          {pot.weight && (
            <>
              {' · '}
              {/* `whitespace-nowrap` evita que "10 kg" quebre no meio
                  nas colunas estreitas do tablet. */}
              <span className="font-numeric font-bold whitespace-nowrap">{pot.weight}</span>
            </>
          )}
        </p>

        <div className="mt-auto pt-2">
          {available ? (
            <PriceTag priceInCents={pot.priceInCents} unit={null} size="md" className="text-orchid" />
          ) : (
            <Badge>Em falta</Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
