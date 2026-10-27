/**
 * Medalhão redondo com a foto do sabor.
 *
 * Quando o item não tem imagem em `public/icons/`, mostra um círculo
 * colorido com a inicial do sabor — assim um sabor novo já aparece
 * bonito antes de alguém produzir a arte.
 */

import type { AccentColor } from '../../types/catalog';
import { getAccent } from '../../lib/accents';

/** Propriedades do {@link FlavorIcon}. */
export interface FlavorIconProps {
  /** Nome do sabor, usado no `alt` e para tirar a inicial do fallback. */
  name: string;
  /** Caminho da imagem dentro de `public/`. Sem isso, cai no fallback. */
  icon?: string | undefined;
  /** Cor usada no círculo de fallback. */
  accent: AccentColor;
  /** Classes extras de tamanho. Deve definir largura e altura. */
  className?: string;
}

/**
 * Pega a primeira letra do nome, já em maiúscula.
 *
 * @param name Nome do sabor.
 * @returns A inicial. Ex.: `'Uva'` -> `'U'`.
 */
function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

/**
 * Foto circular do sabor, com anel dourado.
 *
 * @example
 * <FlavorIcon name="Uva" icon="/icons/uva.webp" accent="orange" className="h-16 w-16" />
 *
 * @example
 * // Sem imagem: círculo laranja com a letra "U".
 * <FlavorIcon name="Uva" accent="orange" className="h-16 w-16" />
 */
export function FlavorIcon({ name, icon, accent, className = '' }: FlavorIconProps) {
  const { bg } = getAccent(accent);

  const shared = 'shrink-0 overflow-hidden rounded-full ring-1 ring-gold-soft';

  if (!icon) {
    return (
      <div
        role="img"
        aria-label={`Ilustração de ${name}`}
        className={`${shared} ${bg} flex items-center justify-center ${className}`}
      >
        <span className="font-display text-xl font-bold text-white sm:text-2xl">
          {getInitial(name)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={icon}
      alt={`Polpa de ${name}`}
      loading="lazy"
      decoding="async"
      width={200}
      height={200}
      className={`${shared} object-cover ${className}`}
    />
  );
}
