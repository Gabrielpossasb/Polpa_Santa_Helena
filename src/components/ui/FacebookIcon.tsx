/** Glifo do Facebook em SVG, herdando a cor do texto do elemento pai. */

/** Propriedades do {@link FacebookIcon}. */
export interface FacebookIconProps {
  /** Classes de tamanho e cor. */
  className?: string;
}

/**
 * Ícone do Facebook.
 *
 * Desenhado com o mesmo traço do {@link InstagramIcon}: quadrado arredondado
 * vazado e o "f" por cima, para os dois ficarem com o mesmo peso visual.
 *
 * É decorativo: quem usa precisa dar um texto acessível ao link que o contém.
 *
 * @example
 * <FacebookIcon className="h-4 w-4 text-plum" />
 */
export function FacebookIcon({ className = '' }: FacebookIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <path
        d="M15.1 7.6h-1.5c-1 0-1.7.8-1.7 1.8v1.8m-1.8 0h3.7m-3.7 0h1.9m0 0v5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
