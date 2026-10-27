/**
 * Mapa de rotas do site.
 *
 * Para criar uma página nova:
 * 1. crie o componente em `src/pages/`;
 * 2. registre a rota aqui dentro de `<Route element={<SiteLayout />}>`;
 * 3. acrescente o link em `src/data/navigation.ts`.
 */

import { Route, Routes } from 'react-router-dom';

import { SiteLayout } from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import HistoriaPage from './pages/HistoriaPage';
import ContatoPage from './pages/ContatoPage';
import NaoEncontradaPage from './pages/NaoEncontradaPage';

/**
 * Raiz da aplicação.
 *
 * @example
 * <BrowserRouter><App /></BrowserRouter>
 */
export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="historia" element={<HistoriaPage />} />
        <Route path="contato" element={<ContatoPage />} />
        <Route path="*" element={<NaoEncontradaPage />} />
      </Route>
    </Routes>
  );
}
