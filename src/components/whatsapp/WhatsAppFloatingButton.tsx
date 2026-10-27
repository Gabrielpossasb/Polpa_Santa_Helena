/**
 * Botão flutuante do WhatsApp, fixo no canto inferior direito e
 * sempre visível enquanto a pessoa rola a página.
 */

import { buildWhatsAppLink } from '../../lib/whatsapp';
import { siteConfig } from '../../data/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

/** Propriedades do {@link WhatsAppFloatingButton}. */
export interface WhatsAppFloatingButtonProps {
  /**
   * Texto que aparece ao lado do ícone em telas largas.
   * @default 'Fazer pedido'
   */
  label?: string;
}

/**
 * Atalho permanente para a conversa no WhatsApp.
 *
 * No celular mostra só o ícone (para não cobrir o conteúdo);
 * a partir de `sm` mostra também o texto.
 *
 * @example
 * <WhatsAppFloatingButton />
 */
export function WhatsAppFloatingButton({ label = 'Fazer pedido' }: WhatsAppFloatingButtonProps) {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Fazer pedido pelo WhatsApp ${siteConfig.whatsapp.display} — abre em uma nova aba`}
      className={[
        'fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6',
        'inline-flex items-center gap-2.5 rounded-full',
        'bg-whatsapp text-white shadow-float',
        'p-4 sm:py-3.5 sm:pr-5 sm:pl-4',
        'transition-transform duration-200 hover:scale-105 active:scale-95',
      ].join(' ')}
    >
      <WhatsAppIcon className="h-7 w-7 shrink-0 sm:h-6 sm:w-6" />
      <span className="hidden font-sans text-sm font-bold sm:inline">{label}</span>
    </a>
  );
}
