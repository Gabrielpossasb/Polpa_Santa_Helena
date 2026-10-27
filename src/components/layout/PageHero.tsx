/**
 * Topo das páginas internas (História e Contato): título grande,
 * frase de apoio e os arabescos dourados da marca.
 */

import { TitleFlourish } from '../ui/Ornament';

/** Propriedades do {@link PageHero}. */
export interface PageHeroProps {
  /** Linha pequena acima do título. */
  eyebrow: string;
  /** Título da página (vira o `<h1>`). */
  title: string;
  /** Frase de apoio sob o título. */
  subtitle: string;
}

/**
 * Cabeçalho de página interna.
 *
 * @example
 * <PageHero
 *   eyebrow="Quem faz"
 *   title="Nossa história"
 *   subtitle="Fruta de verdade, direto do congelador para a sua casa."
 * />
 */
export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <div className="border-b border-gold-soft bg-cream-deep">
      <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
        <p className="font-sans text-xs font-bold tracking-[0.18em] text-gold-deep uppercase sm:text-sm">
          {eyebrow}
        </p>

        <h1 className="mt-3 font-display text-3xl font-black text-balance text-plum sm:text-5xl">
          {title}
        </h1>

        <div className="mt-4 flex items-center justify-center gap-3">
          <TitleFlourish direction="left" className="h-3 w-10 shrink-0 text-gold-deep sm:w-16" />
          <TitleFlourish direction="right" className="h-3 w-10 shrink-0 text-gold-deep sm:w-16" />
        </div>

        <p className="mt-4 font-serif text-lg leading-snug text-balance text-plum-soft italic sm:text-xl">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
