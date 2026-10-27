/**
 * Card branco com cantos arredondados, borda fina dourada e uma barra
 * de acento colorida na lateral esquerda — a peça visual que se repete
 * em todo o catálogo.
 */

import type { ReactNode } from 'react';
import type { AccentColor } from '../../types/catalog';
import { getAccent } from '../../lib/accents';

/** Propriedades do {@link Card}. */
export interface CardProps {
  /** Conteúdo do card. */
  children: ReactNode;
  /** Cor da barra lateral esquerda. */
  accent: AccentColor;
  /**
   * `false` esmaece o card (item indisponível).
   * @default true
   */
  available?: boolean;
  /** Elemento HTML a ser renderizado. Use `'li'` dentro de listas. */
  as?: 'div' | 'li' | 'article';
  /** Classes extras de layout (espaçamento, alinhamento). */
  className?: string;
}

/**
 * Card base do catálogo.
 *
 * @example
 * <Card accent="green">
 *   <p>Abacaxi</p>
 * </Card>
 *
 * @example
 * // Item em falta, dentro de uma lista:
 * <Card as="li" accent="purple" available={false}>...</Card>
 */
export function Card({
  children,
  accent,
  available = true,
  as: Tag = 'div',
  className = '',
}: CardProps) {
  const { bg } = getAccent(accent);

  return (
    <Tag
      className={[
        // Estrutura: a barra de acento é o próprio conteúdo do ::before.
        'relative isolate overflow-hidden rounded-xl bg-white',
        'border border-gold-soft shadow-card',
        'transition-[box-shadow,transform] duration-200',
        available ? 'hover:-translate-y-0.5 hover:shadow-card-hover' : 'opacity-55 saturate-50',
        className,
      ].join(' ')}
    >
      {/* Barra de acento colorida na lateral esquerda. */}
      <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1.5 ${bg}`} />
      {children}
    </Tag>
  );
}
