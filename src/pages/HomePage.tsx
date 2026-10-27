/**
 * Página inicial: chamada da marca, faixa de benefícios e o catálogo
 * completo (polpas por grupo de preço, outros produtos e açaí creme).
 */

import { acaiPots, benefits, priceTiers, productGroups } from '../data/catalog';
import { siteConfig } from '../data/siteConfig';

import { Section } from '../components/layout/Section';
import { Hero } from '../components/home/Hero';
import { CallToAction } from '../components/home/CallToAction';

import { InfoChip } from '../components/catalog/InfoChip';
import { PriceTierSection } from '../components/catalog/PriceTierSection';
import { ExtraProductsSection } from '../components/catalog/ExtraProductsSection';
import { AcaiSection } from '../components/catalog/AcaiSection';
import { BenefitsBar } from '../components/catalog/BenefitsBar';
import { SectionTitle } from '../components/ui/SectionTitle';

/**
 * Rota `/`.
 *
 * @example
 * <Route index element={<HomePage />} />
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Diferenciais, logo abaixo da chamada principal. */}
      <Section tone="white" spacing="sm" label="Diferenciais da Polpa Santa Helena">
        <BenefitsBar benefits={benefits} />
      </Section>

      {/* Polpas por grupo de preço. */}
      <Section id="catalogo" tone="cream" labelledBy="titulo-catalogo">
        <SectionTitle id="titulo-catalogo">Catálogo de polpas</SectionTitle>

        <div className="mt-6">
          <InfoChip>{siteConfig.packagingNote}</InfoChip>
        </div>

        <div className="mt-10 space-y-12">
          {priceTiers.map((tier) => (
            <PriceTierSection key={tier.id} tier={tier} />
          ))}
        </div>
      </Section>

      <Section tone="deep" labelledBy="outros-produtos">
        <ExtraProductsSection groups={productGroups} />
      </Section>

      <Section tone="cream" labelledBy="acai-creme">
        <AcaiSection pots={acaiPots} />
      </Section>

      <CallToAction />
    </>
  );
}
