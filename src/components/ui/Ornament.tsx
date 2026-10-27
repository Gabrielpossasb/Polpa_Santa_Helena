/**
 * Ornamentos decorativos em SVG, inspirados nos detalhes dourados do
 * catálogo impresso: ramos nos cantos, arabescos ao lado dos títulos
 * e o trio de folhas que fecha cada grupo de preço.
 *
 * Todos herdam a cor do texto (`currentColor`), então basta aplicar
 * `text-gold` ou `text-gold-deep` no elemento pai.
 */

/** Uma folha simples, reaproveitada pelos outros ornamentos. */
function Leaf({ x, y, rotate, scale = 1 }: { x: number; y: number; rotate: number; scale?: number }) {
  return (
    <path
      d="M0 0 C 5 -9, 16 -11, 22 -4 C 16 3, 5 5, 0 0 Z"
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
    />
  );
}

/** Posição do {@link CornerOrnament}. */
export type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/** Rotação/espelhamento aplicado a cada canto. */
const cornerTransform: Record<CornerPosition, string> = {
  'top-left': 'scale(1,1)',
  'top-right': 'scale(-1,1) translate(-120,0)',
  'bottom-left': 'scale(1,-1) translate(0,-120)',
  'bottom-right': 'scale(-1,-1) translate(-120,-120)',
};

/** Propriedades do {@link CornerOrnament}. */
export interface CornerOrnamentProps {
  /** Em qual canto o ramo deve aparecer. */
  position: CornerPosition;
  /** Classes extras (posicionamento absoluto, cor, tamanho). */
  className?: string;
}

/**
 * Ramo de videira decorativo para os cantos da moldura dourada.
 *
 * @example
 * <CornerOrnament position="top-left" className="absolute top-2 left-2 w-20 text-gold" />
 */
export function CornerOrnament({ position, className = '' }: CornerOrnamentProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
    >
      <g transform={cornerTransform[position]}>
        {/* Haste principal, em "S", e um ramo secundário. */}
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.9">
          <path d="M5 118 C 5 76, 16 38, 56 12" />
          <path d="M11 96 C 32 86, 46 66, 52 40" />
          {/* Gavinha enrolada na ponta, típica da parreira. */}
          <path d="M56 12 C 64 6, 76 8, 77 16 C 78 23, 69 26, 66 20 C 64 16, 68 13, 71 15" />
        </g>

        {/* Folhas alternando dos dois lados das hastes. */}
        <g fill="currentColor" opacity="0.85">
          <Leaf x={6} y={100} rotate={-108} scale={1.25} />
          <Leaf x={8} y={80} rotate={-45} scale={1.15} />
          <Leaf x={15} y={58} rotate={-125} scale={1.2} />
          <Leaf x={28} y={36} rotate={-30} scale={1.1} />
          <Leaf x={42} y={22} rotate={-112} scale={0.95} />
          <Leaf x={30} y={82} rotate={42} scale={0.95} />
          <Leaf x={47} y={58} rotate={20} scale={0.85} />
        </g>
      </g>
    </svg>
  );
}

/** Propriedades do {@link TitleFlourish}. */
export interface TitleFlourishProps {
  /** Para qual lado a volta aponta. */
  direction?: 'left' | 'right';
  /** Classes extras (cor e largura). */
  className?: string;
}

/**
 * Arabesco curto usado dos dois lados dos títulos de seção.
 *
 * @example
 * <TitleFlourish direction="left" className="w-12 text-gold-deep" />
 */
export function TitleFlourish({ direction = 'left', className = '' }: TitleFlourishProps) {
  return (
    <svg
      viewBox="0 0 64 16"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    >
      <g transform={direction === 'right' ? 'scale(-1,1) translate(-64,0)' : undefined}>
        <path d="M63 8 H 26" />
        <path d="M26 8 C 20 8, 16 3, 11 3 C 5 3, 2 7, 5 10 C 7.5 12.4, 12 11, 12 8" />
      </g>
    </svg>
  );
}

/** Propriedades do {@link LeafDivider}. */
export interface LeafDividerProps {
  /** Classes extras (cor e largura). */
  className?: string;
}

/**
 * Trio de folhas que encerra cada grupo de preço, como no catálogo.
 *
 * @example
 * <LeafDivider className="w-8 text-grove" />
 */
export function LeafDivider({ className = '' }: LeafDividerProps) {
  return (
    <svg
      viewBox="0 0 48 26"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <g opacity="0.9">
        <Leaf x={24} y={22} rotate={-112} scale={0.78} />
        <Leaf x={24} y={22} rotate={-68} scale={0.78} />
        <Leaf x={24} y={23} rotate={-90} scale={0.62} />
      </g>
      <path
        d="M24 24 L 24 17"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
