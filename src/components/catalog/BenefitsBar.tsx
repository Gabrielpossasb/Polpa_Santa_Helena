/**
 * Faixa de benefícios: entrega, 100% da fruta, congeladas e alto rendimento.
 * É a tarja clara que fecha o catálogo impresso.
 */

import type { Benefit } from '../../types/catalog';
import { getAccent } from '../../lib/accents';
import { BenefitIcon } from './BenefitIcon';

/** Propriedades do {@link BenefitsBar}. */
export interface BenefitsBarProps {
  /** Benefícios exibidos, na ordem. */
  benefits: Benefit[];
}

/**
 * Faixa horizontal com os diferenciais da loja.
 *
 * @example
 * <BenefitsBar benefits={benefits} />
 */
export function BenefitsBar({ benefits }: BenefitsBarProps) {
  return (
    <div className="rounded-2xl border border-gold-soft bg-cream px-4 py-5 sm:px-6">
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {benefits.map((benefit, index) => (
          <li
            key={benefit.id}
            className={[
              'flex items-start gap-3',
              // Divisórias verticais entre as colunas, só no desktop.
              index > 0 ? 'lg:border-l lg:border-gold-soft lg:pl-4' : '',
            ].join(' ')}
          >
            <BenefitIcon
              name={benefit.icon}
              className={`mt-0.5 h-8 w-8 shrink-0 ${getAccent(benefit.accent).icon}`}
            />
            <div className="min-w-0">
              <h3 className="font-sans text-xs font-black tracking-[0.08em] text-plum uppercase">
                {benefit.title}
              </h3>
              {benefit.lines.map((line) => (
                <p key={line} className="mt-0.5 font-sans text-xs leading-snug text-ink">
                  {line}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
