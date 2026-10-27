/**
 * Botão/link de WhatsApp usado dentro do conteúdo da página
 * (cabeçalho, rodapé e chamadas para pedido).
 */

import { buildWhatsAppLink } from '../../lib/whatsapp';
import { siteConfig } from '../../data/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

/** Propriedades do {@link WhatsAppButton}. */
export interface WhatsAppButtonProps {
  /**
   * Texto do botão.
   * @default 'Pedir no WhatsApp'
   */
  label?: string;
  /**
   * Mensagem já preenchida na conversa.
   * Quando omitida, usa a mensagem padrão de `siteConfig`.
   */
  message?: string;
  /**
   * Aparência.
   * - `solid` — fundo verde do WhatsApp (chamada principal)
   * - `outline` — contorno dourado sobre o creme
   * @default 'solid'
   */
  variant?: 'solid' | 'outline';
  /**
   * Tamanho do botão.
   * @default 'md'
   */
  size?: 'sm' | 'md';
  /** Classes extras de layout. */
  className?: string;
}

/** Classes de cada aparência. */
const variantClasses: Record<NonNullable<WhatsAppButtonProps['variant']>, string> = {
  solid: 'bg-whatsapp text-white hover:bg-whatsapp-dark shadow-card',
  outline: 'border border-gold bg-white text-plum hover:bg-cream-deep',
};

/** Classes de cada tamanho. */
const sizeClasses: Record<NonNullable<WhatsAppButtonProps['size']>, string> = {
  sm: 'gap-1.5 px-3 py-1.5 text-xs',
  md: 'gap-2 px-4 py-2.5 text-sm',
};

/**
 * Link que abre a conversa no WhatsApp em uma nova aba.
 *
 * @example
 * <WhatsAppButton />
 *
 * @example
 * <WhatsAppButton label="Pedir açaí" message="Olá! Quero um pote de 2 L." variant="outline" />
 */
export function WhatsAppButton({
  label = 'Pedir no WhatsApp',
  message,
  variant = 'solid',
  size = 'md',
  className = '',
}: WhatsAppButtonProps) {
  return (
    <a
      href={message === undefined ? buildWhatsAppLink() : buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — abre o WhatsApp ${siteConfig.whatsapp.display} em uma nova aba`}
      className={[
        'inline-flex items-center justify-center rounded-full font-sans font-bold',
        'transition-colors duration-200',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      <WhatsAppIcon className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
      <span>{label}</span>
    </a>
  );
}
