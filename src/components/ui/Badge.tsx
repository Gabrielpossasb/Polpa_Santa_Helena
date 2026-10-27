/** Selo pequeno em formato de pílula, usado para avisar "Em falta". */

import type { ReactNode } from 'react';

/** Propriedades do {@link Badge}. */
export interface BadgeProps {
  /** Texto do selo. */
  children: ReactNode;
  /**
   * Aparência do selo.
   * - `neutral` — cinza discreto, para avisos (padrão).
   * - `gold` — dourado, para destaques da marca.
   */
  tone?: 'neutral' | 'gold';
  /** Classes extras de posicionamento. */
  className?: string;
}

/** Classes de cada aparência, escritas por extenso para o Tailwind encontrar. */
const toneClasses: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-plum/85 text-cream',
  gold: 'bg-gold-deep text-cream',
};

/**
 * Selo em pílula.
 *
 * @example
 * <Badge>Em falta</Badge>
 * <Badge tone="gold">Novo</Badge>
 */
export function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-block rounded-full px-2 py-0.5',
        'font-sans text-[0.625rem] font-bold tracking-wide uppercase',
        toneClasses[tone],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
