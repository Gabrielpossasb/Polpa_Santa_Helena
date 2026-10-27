/**
 * Montagem dos links de WhatsApp.
 *
 * O número fica em `src/data/siteConfig.ts`; este arquivo só monta a URL.
 */

import { siteConfig } from '../data/siteConfig';

/**
 * Monta o link do WhatsApp com a mensagem já preenchida.
 *
 * @param message Mensagem inicial. Quando omitida, usa
 *   `siteConfig.whatsapp.defaultMessage`.
 * @returns URL completa do `wa.me`, pronta para um `<a href>`.
 *
 * @example
 * buildWhatsAppLink();
 * // "https://wa.me/5567992076026?text=Ol%C3%A1!%20Vi%20o%20cat%C3%A1logo..."
 *
 *
 * @example
 * buildWhatsAppLink('Quero 2 kg de açaí');
 * // "https://wa.me/5567992076026?text=Quero%202%20kg%20de%20a%C3%A7a%C3%AD"
 */
export function buildWhatsAppLink(message: string = siteConfig.whatsapp.defaultMessage): string {
  // `encodeURIComponent` codifica o espaço como %20. `URLSearchParams` usaria
  // "+", que o WhatsApp também entende, mas %20 não deixa margem a dúvida.
  return `https://wa.me/${siteConfig.whatsapp.international}?text=${encodeURIComponent(message)}`;
}

/**
 * Monta o link do WhatsApp já perguntando por um produto específico.
 *
 * @param productName Nome do produto, como aparece no card.
 * @returns URL do `wa.me` com a pergunta pronta.
 *
 * @example
 * buildProductWhatsAppLink('Açaí 2 L');
 * // link com o texto "Olá! Gostaria de pedir: Açaí 2 L."
 */
export function buildProductWhatsAppLink(productName: string): string {
  return buildWhatsAppLink(`Olá! Gostaria de pedir: ${productName}.`);
}
