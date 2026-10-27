/**
 * Faixa escura de chamada para o pedido, usada no fim das páginas.
 * É o contraste forte que fecha a página e deixa o próximo passo óbvio.
 */

import { siteConfig } from '../../data/siteConfig';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';

/** Propriedades do {@link CallToAction}. */
export interface CallToActionProps {
  /**
   * Título da faixa.
   * @default 'Pronto para fazer seu pedido?'
   */
  title?: string;
  /**
   * Frase de apoio.
   * @default 'Mande sua lista pelo WhatsApp...'
   */
  description?: string;
}

/**
 * Chamada final para o WhatsApp.
 *
 * @example
 * <CallToAction />
 *
 * @example
 * <CallToAction title="Ficou com dúvida?" description="Chame a gente." />
 */
export function CallToAction({
  title = 'Pronto para fazer seu pedido?',
  description = 'Mande sua lista pelo WhatsApp. Confirmamos os valores e combinamos a entrega, sem cadastro e sem aplicativo.',
}: CallToActionProps) {
  return (
    <section aria-labelledby="chamada-pedido" className="bg-plum">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
        <h2
          id="chamada-pedido"
          className="font-display text-2xl font-black text-balance text-cream sm:text-4xl"
        >
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-cream/80 sm:text-base">
          {description}
        </p>

        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <WhatsAppButton label="Pedir no WhatsApp" />
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-cream/35 px-5 py-2.5 font-sans text-sm font-bold text-cream transition-colors hover:bg-cream/10"
          >
            Seguir no Instagram
          </a>
        </div>

        <p className="mt-6 font-serif text-base text-cream/70 italic">
          {siteConfig.delivery.freeFrom}
        </p>
      </div>
    </section>
  );
}
