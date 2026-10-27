/**
 * Página "Contato": canais de atendimento, horário, regras de entrega
 * e pagamento, e o passo a passo para fazer o pedido.
 *
 * Não existe formulário: o site é estático e todo pedido passa pelo
 * WhatsApp, que é onde a loja realmente atende.
 */

import { orderSteps } from '../data/content';
import { siteConfig } from '../data/siteConfig';
import { formatCityList } from '../lib/formatCityList';

import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { CallToAction } from '../components/home/CallToAction';
import { WhatsAppButton } from '../components/whatsapp/WhatsAppButton';
import { WhatsAppIcon } from '../components/whatsapp/WhatsAppIcon';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { FacebookIcon } from '../components/ui/FacebookIcon';

/** Botão branco de "abrir o perfil", repetido nos cards de rede social. */
const perfilLinkClasses =
  'inline-flex items-center justify-center rounded-full border border-gold bg-white px-4 py-2.5 font-sans text-sm font-bold text-plum transition-colors hover:bg-cream-deep';

/** Ícone de relógio, para o bloco de horário. */
function ClockIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

/** Ícone de cartão, para o bloco de formas de pagamento. */
function CardIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19" />
      <path d="M6 14.5h3.5" />
    </svg>
  );
}

/** Ícone de marcador de mapa, para a área de entrega. */
function PinIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

/**
 * Rota `/contato`.
 *
 * @example
 * <Route path="contato" element={<ContatoPage />} />
 */
export default function ContatoPage() {
  const { whatsapp, instagram, facebook, serviceCities, hours, delivery, payment } = siteConfig;
  const cidades = formatCityList(serviceCities);

  return (
    <>
      <PageHero
        eyebrow="Fale conosco"
        title="Contato"
        subtitle="O pedido é feito diretamente pelo WhatsApp, sem cadastro e sem aplicativo."
      />

      {/* Canais de atendimento */}
      <Section tone="cream" labelledBy="canais">
        <h2 id="canais" className="sr-only">
          Canais de atendimento
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {/* WhatsApp: canal principal */}
          <div className="flex flex-col rounded-2xl border border-gold-soft bg-white px-6 py-7 shadow-card">
            <WhatsAppIcon className="h-9 w-9 text-whatsapp" />
            <h3 className="mt-3 font-display text-lg font-bold text-plum">WhatsApp</h3>
            <p className="mt-1 font-sans text-sm text-ink">
              A forma mais rápida de falar conosco e fazer o pedido.
            </p>
            <p className="mt-3 font-display text-xl font-bold whitespace-nowrap text-plum lg:text-2xl">
              <span className="nums-lining">{whatsapp.display}</span>
            </p>
            {/* `mt-auto` empurra o botão para a base, para os três cards
                terminarem na mesma linha mesmo com textos de alturas diferentes. */}
            <div className="mt-auto pt-4">
              <WhatsAppButton />
            </div>
          </div>

          {/* Instagram */}
          <div className="flex flex-col rounded-2xl border border-gold-soft bg-white px-6 py-7 shadow-card">
            <InstagramIcon className="h-9 w-9 text-orchid" />
            <h3 className="mt-3 font-display text-lg font-bold text-plum">Instagram</h3>
            <p className="mt-1 font-sans text-sm text-ink">
              Novidades, sabores da semana e promoções.
            </p>
            <p className="mt-3 font-display text-xl font-bold text-plum lg:text-2xl">
              {instagram.handle}
            </p>
            <div className="mt-auto pt-4">
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={perfilLinkClasses}
              >
                Abrir o perfil
              </a>
            </div>
          </div>

          {/* Facebook */}
          <div className="flex flex-col rounded-2xl border border-gold-soft bg-white px-6 py-7 shadow-card">
            <FacebookIcon className="h-9 w-9 text-plum-soft" />
            <h3 className="mt-3 font-display text-lg font-bold text-plum">Facebook</h3>
            <p className="mt-1 font-sans text-sm text-ink">
              A mesma loja, para quem prefere acompanhar por lá.
            </p>
            <p className="mt-3 font-display text-xl font-bold text-plum lg:text-2xl">
              {facebook.handle}
            </p>
            <div className="mt-auto pt-4">
              <a
                href={facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className={perfilLinkClasses}
              >
                Abrir a página
              </a>
            </div>
          </div>
        </div>

        {/* Horário, entrega e pagamento */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gold-soft bg-white px-6 py-6 shadow-card">
            <ClockIcon className="h-7 w-7 text-gold-deep" />
            <h3 className="mt-3 font-display text-base font-bold text-plum">Atendimento</h3>
            <ul className="mt-2 space-y-1">
              {hours.map((linha) => (
                <li key={linha} className="font-sans text-sm text-ink">
                  {linha}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gold-soft bg-white px-6 py-6 shadow-card">
            <PinIcon className="h-7 w-7 text-grove" />
            <h3 className="mt-3 font-display text-base font-bold text-plum">{delivery.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {serviceCities.map((cidade) => (
                <li
                  key={cidade}
                  className="rounded-full bg-cream-deep px-3 py-1.5 font-sans text-sm font-bold text-plum-soft"
                >
                  {cidade}
                </li>
              ))}
            </ul>
            <ul className="mt-3 space-y-1">
              <li className="font-sans text-sm text-ink">{delivery.freeFrom}</li>
              <li className="font-sans text-sm text-ink">{delivery.fee}</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gold-soft bg-white px-6 py-6 shadow-card">
            <CardIcon className="h-7 w-7 text-orchid" />
            <h3 className="mt-3 font-display text-base font-bold text-plum">{payment.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {payment.methods.map((forma) => (
                <li
                  key={forma}
                  className="rounded-full bg-cream-deep px-3 py-1.5 font-sans text-sm font-bold text-plum-soft"
                >
                  {forma}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-sans text-sm text-ink">
              Combinamos a forma de pagamento junto com a entrega.
            </p>
          </div>
        </div>
      </Section>

      {/* Passo a passo do pedido */}
      <Section tone="deep" labelledBy="como-pedir">
        <h2
          id="como-pedir"
          className="text-center font-display text-xl font-bold tracking-[0.06em] text-plum uppercase sm:text-2xl"
        >
          Como fazer o pedido
        </h2>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {orderSteps.map((passo, indice) => (
            <li
              key={passo.id}
              className="rounded-2xl border border-gold-soft bg-white px-6 py-6 shadow-card"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-plum font-display text-base font-bold text-cream"
              >
                {indice + 1}
              </span>
              <h3 className="mt-3 font-display text-base font-bold text-plum">{passo.title}</h3>
              {passo.paragraphs.map((texto) => (
                <p key={texto} className="mt-2 font-sans text-sm leading-relaxed text-ink">
                  {texto}
                </p>
              ))}
            </li>
          ))}
        </ol>

        <p className="mt-6 text-center font-serif text-base text-plum-soft italic">
          Atendemos em {cidades}.
        </p>
      </Section>

      <CallToAction
        title="Vamos conversar?"
        description="Chame no WhatsApp e tire suas dúvidas sobre sabores, preços e entrega."
      />
    </>
  );
}
