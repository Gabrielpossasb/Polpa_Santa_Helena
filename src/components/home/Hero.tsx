/**
 * Chamada principal da página inicial: título da marca, frase de apoio,
 * botões de ação e um mosaico com as fotos das frutas.
 */

import { Link } from 'react-router-dom';
import { heroContent } from '../../data/content';
import { CornerOrnament } from '../ui/Ornament';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';

/** Fotos exibidas no mosaico, da esquerda para a direita. */
const FOTOS = [
  { src: '/icons/morango.webp', alt: 'Polpa de morango' },
  { src: '/icons/acai.webp', alt: 'Polpa de açaí' },
  { src: '/icons/maracuja.webp', alt: 'Polpa de maracujá' },
  { src: '/icons/goiaba.webp', alt: 'Polpa de goiaba' },
  { src: '/icons/uva.webp', alt: 'Polpa de uva' },
  { src: '/icons/abacaxi.webp', alt: 'Polpa de abacaxi' },
];

/**
 * Topo da página inicial.
 *
 * @example
 * <Hero />
 */
export function Hero() {
  return (
    <div className="relative overflow-hidden bg-cream-deep">
      {/* Ramos dourados discretos nos cantos, herdados do catálogo impresso. */}
      <CornerOrnament
        position="top-left"
        className="pointer-events-none absolute -top-2 -left-3 w-24 text-gold-deep/25 sm:w-36"
      />
      <CornerOrnament
        position="bottom-right"
        className="pointer-events-none absolute -right-3 -bottom-3 w-24 text-gold-deep/25 sm:w-36"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:px-8">
        {/* Texto */}
        <div className="text-center lg:text-left">
          <p className="font-sans text-xs font-bold tracking-[0.18em] text-gold-deep uppercase sm:text-sm">
            {heroContent.eyebrow}
          </p>

          <h1 className="mt-4 font-display text-3xl leading-tight font-black text-balance text-plum sm:text-5xl xl:text-6xl">
            {heroContent.title}
          </h1>

          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-ink sm:text-lg lg:mx-0">
            {heroContent.subtitle}
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <WhatsAppButton label="Fazer meu pedido" />
            <Link
              to="/historia"
              className="inline-flex items-center justify-center rounded-full border border-gold bg-white px-5 py-2.5 font-sans text-sm font-bold text-plum transition-colors hover:bg-cream"
            >
              Conheça a loja
            </Link>
          </div>
        </div>

        {/* Mosaico de fotos */}
        <ul className="mx-auto grid max-w-md grid-cols-3 gap-3 sm:gap-4" aria-label="Alguns sabores do catálogo">
          {FOTOS.map((foto, indice) => (
            <li key={foto.src}>
              <img
                src={foto.src}
                alt={foto.alt}
                width={200}
                height={200}
                loading={indice < 3 ? 'eager' : 'lazy'}
                decoding="async"
                className="aspect-square w-full rounded-full object-cover ring-2 ring-gold-soft"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
