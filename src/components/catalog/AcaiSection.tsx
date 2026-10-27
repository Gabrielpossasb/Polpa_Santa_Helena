/**
 * Seção "Açaí creme", com os tamanhos de Sorbet de Açaí com Guaraná.
 * Ganha seção própria porque é o carro-chefe e tem foto de embalagem.
 */

import type { AcaiPot } from '../../types/catalog';
import { SectionTitle } from '../ui/SectionTitle';
import { AcaiPotCard } from './AcaiPotCard';

/** Propriedades do {@link AcaiSection}. */
export interface AcaiSectionProps {
  /** Potes exibidos na seção, do menor para o maior. */
  pots: AcaiPot[];
}

/**
 * Tamanhos de açaí creme em formato de cards.
 *
 * @example
 * <AcaiSection pots={acaiPots} />
 */
export function AcaiSection({ pots }: AcaiSectionProps) {
  return (
    <>
      <SectionTitle id="acai-creme">Açaí creme</SectionTitle>

      <p className="mx-auto mt-2 max-w-md text-center font-serif text-base text-plum-soft italic sm:text-lg">
        Sorbet de Açaí com Guaraná
      </p>

      <ul className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        {pots.map((pot) => (
          <AcaiPotCard key={pot.id} pot={pot} />
        ))}
      </ul>
    </>
  );
}
