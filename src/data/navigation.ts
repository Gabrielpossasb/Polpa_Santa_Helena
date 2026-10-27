/**
 * Itens do menu principal, usados no cabeçalho e no rodapé.
 *
 * Para adicionar uma página nova: crie o componente em `src/pages/`,
 * registre a rota em `src/App.tsx` e acrescente uma linha aqui.
 */

/** Um link do menu. */
export interface NavItem {
  /** Texto exibido. */
  label: string;
  /** Caminho da rota. Ex.: `'/contato'`. */
  to: string;
}

/**
 * Menu principal do site.
 *
 * @example
 * navItems.map((item) => <NavLink to={item.to}>{item.label}</NavLink>)
 */
export const navItems: NavItem[] = [
  { label: 'Catálogo', to: '/' },
  { label: 'História', to: '/historia' },
  { label: 'Contato', to: '/contato' },
];
