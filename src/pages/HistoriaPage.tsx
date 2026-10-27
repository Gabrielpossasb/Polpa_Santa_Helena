/**
 * Página "História": como a Polpa Santa Helena começou, com o Elcio
 * plantando em Terenos, e como chegou às mãos dos filhos.
 *
 * O texto vem de `historyBlocks`, em `src/data/content.ts`.
 */

import { historyBlocks, valueCards } from '../data/content';
import { siteConfig } from '../data/siteConfig';

import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { CallToAction } from '../components/home/CallToAction';
import { BenefitIcon } from '../components/catalog/BenefitIcon';
import { getAccent } from '../lib/accents';

/**
 * Rota `/historia`.
 *
 * @example
 * <Route path="historia" element={<HistoriaPage />} />
 */
export default function HistoriaPage() {
  return (
    <>
      <PageHero
        eyebrow="Quem faz"
        title="Nossa história"
        subtitle="De um pomar em Terenos até a sua casa — um negócio de família."
      />

      {/* Texto corrido */}
      <Section tone="cream" label="Sobre a Polpa Santa Helena">
        <div className="mx-auto max-w-2xl space-y-10">
          {historyBlocks.map((bloco) => (
            <article key={bloco.id}>
              <h2 className="font-display text-xl font-bold text-plum sm:text-2xl">
                {bloco.title}
              </h2>
              {bloco.paragraphs.map((paragrafo, indice) => (
                <p
                  key={indice}
                  className="mt-3 font-sans text-base leading-relaxed text-ink"
                >
                  {paragrafo}
                </p>
              ))}
            </article>
          ))}
        </div>
      </Section>

      {/* Valores */}
      <Section tone="deep" labelledBy="nossos-valores">
        <h2
          id="nossos-valores"
          className="text-center font-display text-xl font-bold tracking-[0.06em] text-plum uppercase sm:text-2xl"
        >
          O que levamos a sério
        </h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueCards.map((valor) => (
            <li
              key={valor.id}
              className="rounded-2xl border border-gold-soft bg-white px-5 py-6 text-center shadow-card"
            >
              <BenefitIcon
                name={valor.icon}
                className={`mx-auto h-9 w-9 ${getAccent(valor.accent).icon}`}
              />
              <h3 className="mt-3 font-display text-base font-bold text-plum">{valor.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink">
                {valor.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Frase da marca */}
      <Section tone="cream" spacing="sm" label="Frase da marca">
        <p className="mx-auto max-w-2xl text-center font-serif text-xl leading-snug text-balance text-plum italic sm:text-2xl">
          “{siteConfig.footerPhrase}”
        </p>
      </Section>

      <CallToAction
        title="Quer experimentar?"
        description="Veja o catálogo completo e mande sua lista pelo WhatsApp."
      />
    </>
  );
}
