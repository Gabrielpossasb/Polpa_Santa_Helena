/**
 * Tradução de uma cor de acento (`AccentColor`) para classes do Tailwind.
 *
 * Centralizar isso aqui garante que nenhum componente escreva cor em
 * hexadecimal e que uma mudança de paleta aconteça num lugar só.
 *
 * IMPORTANTE: as classes precisam estar escritas por extenso (nada de
 * `bg-${cor}`), senão o Tailwind não as encontra ao gerar o CSS.
 */

import type { AccentColor } from '../types/catalog';

/** Conjunto de classes derivadas de uma cor de acento. */
export interface AccentClasses {
  /** Fundo sólido — usado na faixa de preço e na barra lateral do card. */
  bg: string;
  /** Texto na cor do acento. */
  text: string;
  /** Borda na cor do acento. */
  border: string;
  /** Fundo bem claro, para selos e áreas de apoio. */
  bgSoft: string;
  /** Preenchimento para ícones em SVG (`fill`/`stroke` via `currentColor`). */
  icon: string;
}

/**
 * Mapa de cada acento para as suas classes.
 *
 * @example
 * const a = accentClasses['green'];
 * <span className={a.bg} />   // faixa verde
 * <p className={a.text} />    // texto verde
 */
export const accentClasses: Record<AccentColor, AccentClasses> = {
  green: {
    bg: 'bg-grove',
    text: 'text-grove',
    border: 'border-grove',
    bgSoft: 'bg-grove/10',
    icon: 'text-grove',
  },
  orange: {
    bg: 'bg-tangerine',
    text: 'text-tangerine',
    border: 'border-tangerine',
    bgSoft: 'bg-tangerine/10',
    icon: 'text-tangerine',
  },
  purple: {
    bg: 'bg-plum',
    text: 'text-plum',
    border: 'border-plum',
    bgSoft: 'bg-plum/10',
    icon: 'text-plum',
  },
  orchid: {
    bg: 'bg-orchid',
    text: 'text-orchid',
    border: 'border-orchid',
    bgSoft: 'bg-orchid/10',
    icon: 'text-orchid',
  },
};

/**
 * Devolve as classes de um acento.
 *
 * @param accent Cor de acento do item.
 * @returns As classes correspondentes.
 *
 * @example
 * getAccent('orange').bg // "bg-tangerine"
 */
export function getAccent(accent: AccentColor): AccentClasses {
  return accentClasses[accent];
}
