/** Página mostrada quando o endereço digitado não existe (erro 404). */

import { Link } from 'react-router-dom';
import { Section } from '../components/layout/Section';

/**
 * Rota coringa `*`.
 *
 * @example
 * <Route path="*" element={<NaoEncontradaPage />} />
 */
export default function NaoEncontradaPage() {
  return (
    <Section tone="cream" spacing="lg" labelledBy="nao-encontrada">
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-5xl font-black text-gold-deep">
          <span className="nums-lining">404</span>
        </p>

        <h1 id="nao-encontrada" className="mt-3 font-display text-2xl font-bold text-plum sm:text-3xl">
          Página não encontrada
        </h1>

        <p className="mt-3 font-sans text-base text-ink">
          O endereço que você abriu não existe ou foi movido.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-plum px-5 py-2.5 font-sans text-sm font-bold text-cream transition-colors hover:bg-plum-soft"
        >
          Voltar para o catálogo
        </Link>
      </div>
    </Section>
  );
}
