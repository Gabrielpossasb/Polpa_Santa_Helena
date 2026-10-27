/**
 * Pílula informativa logo abaixo do cabeçalho, com o aviso de que
 * cada quilo vem fracionado em 10 pacotes de 100 g.
 */

/** Propriedades do {@link InfoChip}. */
export interface InfoChipProps {
  /** Texto do aviso. */
  children: string;
}

/** Ícone de pacotinho desenhado em linha, igual ao do catálogo. */
function PouchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="h-5 w-5 shrink-0 text-gold-deep"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M8.5 3h7l-.6 2.4h-5.8z" />
      <path d="M9.1 5.4h5.8L17 21H7z" />
    </svg>
  );
}

/**
 * Aviso em destaque sobre o fracionamento do quilo.
 *
 * @example
 * <InfoChip>Cada kg contém 10 pacotes de 100g</InfoChip>
 */
export function InfoChip({ children }: InfoChipProps) {
  return (
    <p className="mx-auto flex w-fit max-w-full items-center gap-2.5 rounded-full border border-gold-soft bg-white px-4 py-2 shadow-card sm:px-6">
      <PouchIcon />
      {/* `nums-lining`: a Cormorant usa algarismos old-style por padrão, e o
          "10 pacotes de 100g" ficava com os números menores que as letras. */}
      <span className="nums-lining font-serif text-base leading-tight text-plum sm:text-lg">
        {children}
      </span>
    </p>
  );
}
