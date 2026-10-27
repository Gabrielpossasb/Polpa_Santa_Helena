/**
 * Moldura comum a todas as páginas: cabeçalho fixo, conteúdo da rota,
 * rodapé e o botão flutuante de WhatsApp.
 */

import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloatingButton } from '../whatsapp/WhatsAppFloatingButton';

/**
 * Leva a página para o topo a cada troca de rota.
 *
 * Sem isso, quem clica em "Contato" no rodapé chega na página nova
 * já rolado até embaixo.
 */
function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
}

/**
 * Layout raiz do site.
 *
 * @example
 * <Route element={<SiteLayout />}>
 *   <Route index element={<HomePage />} />
 * </Route>
 */
export function SiteLayout() {
  useScrollToTop();

  return (
    <div className="flex min-h-dvh flex-col bg-cream paper-grain">
      {/* Atalho para quem navega por teclado. */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-plum focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-bold focus:text-cream"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <WhatsAppFloatingButton />
    </div>
  );
}
