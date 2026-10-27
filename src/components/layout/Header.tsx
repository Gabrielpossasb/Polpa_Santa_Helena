/**
 * Cabeçalho fixo do site: logo e menu principal.
 *
 * No celular o menu vira um painel que abre pelo botão de três linhas.
 *
 * O pedido pelo WhatsApp não aparece aqui de propósito: quem cuida disso é o
 * botão flutuante (`WhatsAppFloatingButton`), que acompanha a rolagem.
 */

import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../../data/navigation';
import { siteConfig } from '../../data/siteConfig';

/** Ícone de menu (três linhas) ou de fechar (X), conforme o estado. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M3.5 7h17" />
          <path d="M3.5 12h17" />
          <path d="M3.5 17h17" />
        </>
      )}
    </svg>
  );
}

/** Classes do link do menu, conforme ele esteja ativo ou não. */
function navLinkClasses({ isActive }: { isActive: boolean }): string {
  return [
    'relative font-sans text-sm font-bold tracking-wide transition-colors',
    'after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full',
    'after:bg-gold-deep after:transition-all',
    isActive
      ? 'text-plum after:w-full'
      : 'text-ink hover:text-plum after:w-0 hover:after:w-full',
  ].join(' ');
}

/**
 * Barra de navegação fixa no topo.
 *
 * @example
 * <Header />
 */
export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { pathname } = useLocation();

  // Fecha o menu sempre que a pessoa troca de página.
  useEffect(() => {
    setMenuAberto(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-gold-soft bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="shrink-0"
          aria-label={`${siteConfig.name} — ir para a página inicial`}
        >
          <img
            src="/logo-polpa-santa-helena.png"
            alt={`${siteConfig.name}, ${siteConfig.tagline}`}
            width={640}
            height={393}
            className="h-11 w-auto sm:h-14"
          />
        </Link>

        {/*
          Menu no desktop. Não há botão de WhatsApp aqui: o botão flutuante
          fica visível o tempo todo, então repetir no topo só tiraria espaço.
        */}
        <nav aria-label="Menu principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={navLinkClasses}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Abre o menu no celular */}
        <button
          type="button"
          onClick={() => setMenuAberto((atual) => !atual)}
          aria-expanded={menuAberto}
          aria-controls="menu-celular"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          className="rounded-lg border border-gold-soft p-2 text-plum transition-colors hover:bg-cream-deep md:hidden"
        >
          <MenuIcon open={menuAberto} />
        </button>
      </div>

      {/* Menu no celular */}
      {menuAberto && (
        <nav
          id="menu-celular"
          aria-label="Menu principal"
          className="border-t border-gold-soft bg-cream md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {navItems.map((item) => (
              <li key={item.to} className="border-b border-gold-soft/60 last:border-b-0">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [
                      'block py-3 font-sans text-base font-bold transition-colors',
                      isActive ? 'text-plum' : 'text-ink hover:text-plum',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
