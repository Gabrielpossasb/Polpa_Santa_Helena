/**
 * Seção "Outros produtos": frutas congeladas e pão de queijo, separados
 * por subtítulo, como nas colunas do catálogo impresso.
 */

import type { ProductGroup } from '../../types/catalog';
import { SectionTitle } from '../ui/SectionTitle';
import { ExtraProductCard } from './ExtraProductCard';

/** Propriedades do {@link ExtraProductsSection}. */
export interface ExtraProductsSectionProps {
  /** Grupos exibidos, na ordem. */
  groups: ProductGroup[];
}

/**
 * Lista de produtos que não são polpa.
 *
 * @example
 * <ExtraProductsSection groups={productGroups} />
 */
export function ExtraProductsSection({ groups }: ExtraProductsSectionProps) {
  return (
    <>
      <SectionTitle id="outros-produtos">Outros produtos</SectionTitle>

      <div className="mt-8 space-y-8">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`grupo-${group.id}`}>
            <h3
              id={`grupo-${group.id}`}
              className="text-center font-sans text-xs font-black tracking-[0.16em] text-gold-deep uppercase sm:text-sm"
            >
              {group.title}
            </h3>

            <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {group.items.map((product) => (
                <ExtraProductCard key={product.id} product={product} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
