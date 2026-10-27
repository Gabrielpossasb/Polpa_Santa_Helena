/**
 * Título de seção em serifa roxa, com arabescos dourados dos dois lados,
 * como os títulos "OUTROS PRODUTOS" e "AÇAÍ EM POTE" do catálogo impresso.
 */

import { TitleFlourish } from './Ornament';

/** Propriedades do {@link SectionTitle}. */
export interface SectionTitleProps {
  /** Texto do título. */
  children: string;
  /**
   * Nível do cabeçalho na hierarquia da página.
   * @default 2
   */
  level?: 2 | 3;
  /** `id` do elemento, para ligar a seção via `aria-labelledby`. */
  id?: string;
  /** Classes extras de espaçamento. */
  className?: string;
}

/**
 * Título centralizado com ornamentos laterais.
 *
 * @example
 * <SectionTitle id="outros">Outros produtos</SectionTitle>
 */
export function SectionTitle({ children, level = 2, id, className = '' }: SectionTitleProps) {
  const Heading = level === 2 ? 'h2' : 'h3';

  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-4 ${className}`}>
      <TitleFlourish direction="left" className="h-3 w-10 shrink-0 text-gold-deep sm:w-16" />
      <Heading
        id={id}
        className="text-center font-display text-xl font-bold tracking-[0.06em] text-plum uppercase sm:text-2xl xl:text-3xl"
      >
        {children}
      </Heading>
      <TitleFlourish direction="right" className="h-3 w-10 shrink-0 text-gold-deep sm:w-16" />
    </div>
  );
}
