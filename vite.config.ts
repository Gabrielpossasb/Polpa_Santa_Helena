/** Configuração do Vite: React + Tailwind CSS v4, saída estática pronta para a Vercel. */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
