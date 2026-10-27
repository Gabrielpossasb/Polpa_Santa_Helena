/**
 * Seção de um grupo de preço: a faixa colorida com o valor por quilo
 * e a grade com um card para cada sabor daquele grupo.
 */

import type { PriceTier } from '../../types/catalog';
import { getAccent } from '../../lib/accents';
import { formatCurrencyPerUnit } from '../../lib/formatCurrency';
import { PriceTag } from '../ui/PriceTag';
import { LeafDivider } from '../ui/Ornament';
import { FlavorCard } from './FlavorCard';

/** Propriedades do {@link PriceTierSection}. */
export interface PriceTierSectionProps {
  /** Grupo de preço com os seus sabores. */
  tier: PriceTier;
}

/**
 * Grupo de preço completo.
 *
 * @example
 * <PriceTierSection tier={priceTiers[0]} />
 */
export function PriceTierSection({ tier }: PriceTierSectionProps) {
  const accent = getAccent(tier.accent);
  const headingId = `grupo-${tier.id}`;

  return (
    // O espaçamento entre grupos é responsabilidade de quem renderiza a lista.
    <section aria-labelledby={headingId}>
      {/* Faixa/pílula colorida com o preço do grupo. */}
      <h2 id={headingId} className="flex justify-center">
        <span
          className={`inline-flex items-baseline gap-1.5 rounded-full px-7 py-2.5 text-white shadow-card sm:px-10 sm:py-3 ${accent.bg}`}
        >
          {/* Algarismos altos (lining), como na faixa do catálogo impresso. */}
          <PriceTag priceInCents={tier.priceInCents} size="lg" />
        </span>
      </h2>

      {/* Grade de sabores: 2 colunas no celular, 3 no celular grande,
          4 do tablet para cima. */}
      <ul
        className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4"
        aria-label={`Sabores a ${formatCurrencyPerUnit(tier.priceInCents)}`}
      >
        {tier.flavors.map((flavor) => (
          <FlavorCard
            key={flavor.id}
            flavor={flavor}
            priceInCents={tier.priceInCents}
            accent={tier.accent}
          />
        ))}
      </ul>

      {/* Trio de folhas fechando o grupo, como no catálogo impresso. */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-gold-soft sm:w-28" />
        <LeafDivider className={`h-8 w-12 ${accent.icon}`} />
        <span className="h-px w-16 bg-gold-soft sm:w-28" />
      </div>
    </section>
  );
}
