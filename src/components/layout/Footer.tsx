/**
 * Rodapé do site: marca, menu, contatos, horário e a frase da empresa.
 */

import { Link } from 'react-router-dom';
import { navItems } from '../../data/navigation';
import { siteConfig } from '../../data/siteConfig';
import { formatCityList } from '../../lib/formatCityList';
import { TitleFlourish } from '../ui/Ornament';
import { WhatsAppIcon } from '../whatsapp/WhatsAppIcon';
import { InstagramIcon } from '../ui/InstagramIcon';
import { FacebookIcon } from '../ui/FacebookIcon';

/**
 * Fim de todas as páginas.
 *
 * Lê tudo de `siteConfig` e `navItems`, então não recebe propriedades.
 *
 * @example
 * <Footer />
 */
export function Footer() {
  const {
    name,
    tagline,
    city,
    cnpj,
    whatsapp,
    instagram,
    facebook,
    delivery,
    payment,
    hours,
    serviceCities,
    footerPhrase,
  } = siteConfig;
  const ano = new Date().getFullYear();
  const cidades = formatCityList(serviceCities);

  return (
    // Sem margem no topo: o rodapé encosta direto na faixa de chamada,
    // que já é escura e fecha a página.
    <footer className="border-t border-gold-soft bg-cream-deep">
      {/* Frase da marca */}
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 pt-10 sm:px-6 lg:px-8">
        <TitleFlourish direction="left" className="h-3 w-8 shrink-0 text-gold-deep sm:w-14" />
        <p className="max-w-lg text-center font-serif text-lg leading-snug text-balance text-plum italic sm:text-xl">
          {footerPhrase}
        </p>
        <TitleFlourish direction="right" className="h-3 w-8 shrink-0 text-gold-deep sm:w-14" />
      </div>

      {/* Colunas */}
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {/* Marca */}
        <div>
          <img
            src="/logo-polpa-santa-helena.png"
            alt={`${name}, ${tagline}`}
            width={640}
            height={393}
            loading="lazy"
            className="h-14 w-auto"
          />
          <p className="mt-3 font-sans text-sm leading-relaxed text-ink">
            Polpa de fruta congelada, 100% fruta, sem conservantes. Entrega em {cidades}.
          </p>
        </div>

        {/* Navegação */}
        <nav aria-label="Menu do rodapé">
          <h2 className="font-display text-base font-bold text-plum">Navegação</h2>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="font-sans text-sm text-ink transition-colors hover:text-gold-deep"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contato */}
        <div>
          <h2 className="font-display text-base font-bold text-plum">Contato</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={`https://wa.me/${whatsapp.international}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-sm text-ink transition-colors hover:text-gold-deep"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-grove" />
                <span className="nums-lining">{whatsapp.display}</span>
              </a>
            </li>
            <li>
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-sm text-ink transition-colors hover:text-gold-deep"
              >
                <InstagramIcon className="h-4 w-4 shrink-0 text-orchid" />
                <span>{instagram.handle}</span>
              </a>
            </li>
            <li>
              <a
                href={facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-sm text-ink transition-colors hover:text-gold-deep"
              >
                <FacebookIcon className="h-4 w-4 shrink-0 text-plum-soft" />
                <span>{facebook.handle}</span>
              </a>
            </li>
            <li className="font-sans text-sm text-ink">{city}</li>
          </ul>

          <h3 className="mt-4 font-sans text-xs font-black tracking-[0.08em] text-plum uppercase">
            Atendimento
          </h3>
          <ul className="mt-1.5 space-y-1">
            {hours.map((linha) => (
              <li key={linha} className="font-sans text-sm text-ink">
                {linha}
              </li>
            ))}
          </ul>
        </div>

        {/* Entrega e pagamento */}
        <div>
          <h2 className="font-display text-base font-bold text-plum">{delivery.title}</h2>
          <ul className="mt-3 space-y-1">
            {serviceCities.map((cidade) => (
              <li key={cidade} className="font-sans text-sm font-bold text-plum-soft">
                {cidade}
              </li>
            ))}
            <li className="font-sans text-sm text-ink">{delivery.freeFrom}</li>
            <li className="font-sans text-sm text-ink">{delivery.fee}</li>
          </ul>

          <h3 className="mt-4 font-sans text-xs font-black tracking-[0.08em] text-plum uppercase">
            {payment.title}
          </h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {payment.methods.map((forma) => (
              <li
                key={forma}
                className="rounded-full bg-white px-3 py-1 font-sans text-xs font-bold text-plum-soft"
              >
                {forma}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Assinatura */}
      <div className="border-t border-gold-soft/70">
        {/* `text-balance` evita que o CNPJ fique sozinho na segunda linha no celular. */}
        <p className="mx-auto max-w-6xl px-4 py-5 text-center font-sans text-xs text-balance text-ink/70 sm:px-6 lg:px-8">
          <span className="nums-lining">{ano}</span> · {name} — {tagline} · {city}
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> · </span>
          CNPJ <span className="nums-lining">{cnpj}</span>
        </p>
      </div>
    </footer>
  );
}
