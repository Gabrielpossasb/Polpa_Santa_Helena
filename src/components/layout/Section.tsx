/**
 * Faixa de seção do site: cuida da largura máxima, do respiro vertical
 * e da cor de fundo. Substitui a antiga "moldura de folha impressa",
 * que fazia o site parecer uma tabela escaneada.
 */

import type { ReactNode } from 'react';

/** Propriedades do {@link Section}. */
export interface SectionProps {
  /** Conteúdo da seção. */
  children: ReactNode;
  /**
   * Cor de fundo da faixa.
   * - `cream` — fundo padrão da página
   * - `deep` — creme mais quente, para alternar seções
   * - `white` — branco, para destacar um bloco
   * @default 'cream'
   */
  tone?: 'cream' | 'deep' | 'white';
  /**
   * Respiro vertical.
   * @default 'md'
   */
  spacing?: 'sm' | 'md' | 'lg';
  /** `id` âncora da seção. */
  id?: string;
  /** `aria-labelledby` para ligar a seção ao seu título. */
  labelledBy?: string;
  /** Rótulo acessível, quando não há título visível. */
  label?: string;
  /** Classes extras. */
  className?: string;
}

/** Fundo de cada variação. */
const toneClasses: Record<NonNullable<SectionProps['tone']>, string> = {
  cream: 'bg-cream',
  deep: 'bg-cream-deep',
  white: 'bg-white',
};

/** Respiro vertical de cada variação. */
const spacingClasses: Record<NonNullable<SectionProps['spacing']>, string> = {
  sm: 'py-8 sm:py-10',
  md: 'py-12 sm:py-16',
  lg: 'py-16 sm:py-24',
};

/**
 * Faixa horizontal com conteúdo centralizado em até 1152 px.
 *
 * @example
 * <Section tone="deep" labelledBy="titulo-acai">
 *   <SectionTitle id="titulo-acai">Açaí creme</SectionTitle>
 * </Section>
 */
export function Section({
  children,
  tone = 'cream',
  spacing = 'md',
  id,
  labelledBy,
  label,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={`${toneClasses[tone]} ${spacingClasses[spacing]} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
