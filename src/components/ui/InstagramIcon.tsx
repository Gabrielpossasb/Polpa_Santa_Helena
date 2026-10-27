/** Glifo do Instagram em SVG, herdando a cor do texto do elemento pai. */

/** Propriedades do {@link InstagramIcon}. */
export interface InstagramIconProps {
  /** Classes de tamanho e cor. */
  className?: string;
}

/**
 * Ícone do Instagram.
 *
 * É decorativo: quem usa precisa dar um texto acessível ao link que o contém.
 *
 * @example
 * <InstagramIcon className="h-4 w-4 text-orchid" />
 */
export function InstagramIcon({ className = '' }: InstagramIconProps) {
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
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
