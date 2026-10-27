/**
 * Ícones em linha (estilo contorno) da faixa de benefícios:
 * caminhão de entrega, folha, floco de neve e copo.
 */

import type { ReactNode } from 'react';
import type { Benefit } from '../../types/catalog';

/** Propriedades do {@link BenefitIcon}. */
export interface BenefitIconProps {
  /** Qual desenho mostrar. */
  name: Benefit['icon'];
  /** Classes de tamanho e cor. */
  className?: string;
}

/** Traçado de cada ícone, desenhado numa grade de 24×24. */
const paths: Record<Benefit['icon'], ReactNode> = {
  truck: (
    <>
      <path d="M1 6.5h12.5v9H1z" />
      <path d="M13.5 9.5h4l3 3v3h-7z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path d="M8 15.5h7M1 15.5h3" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c0 8-4.5 13-10 13-2.5 0-4.5-1-5.5-2.5C3 12 4 7.5 9 5.5 13 3.9 17 4.5 20 4Z" />
      <path d="M4 20c2-5 5.5-9 11-12" />
    </>
  ),
  snowflake: (
    <>
      <path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10" />
      <path d="M12 6.5 9.5 4M12 6.5 14.5 4M12 17.5 9.5 20M12 17.5l2.5 2.5" />
      <path d="m5.6 10.4-3.4-.6M5.6 13.6l-3.4.6M18.4 10.4l3.4-.6M18.4 13.6l3.4.6" />
    </>
  ),
  glass: (
    <>
      <path d="M6.5 7h11l-1.3 13.2a1 1 0 0 1-1 .8H8.8a1 1 0 0 1-1-.8Z" />
      <path d="M6.9 11.5h10.2" />
      <path d="M12 7V4.5M12 4.5c0-1.4 1.1-2.5 2.5-2.5" />
    </>
  ),
};

/**
 * Ícone de benefício.
 *
 * É decorativo: o texto ao lado já explica o benefício.
 *
 * @example
 * <BenefitIcon name="truck" className="h-8 w-8 text-grove" />
 */
export function BenefitIcon({ name, className = '' }: BenefitIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
