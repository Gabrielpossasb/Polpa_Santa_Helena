/**
 * Formatação de dinheiro em reais.
 *
 * Esta é a ÚNICA função que formata preço no site. Todos os valores são
 * guardados em centavos (número inteiro) para evitar erro de arredondamento.
 */

/** Formatador pt-BR reaproveitado em todas as chamadas (criar um por vez custa caro). */
const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Converte um valor em centavos para o formato de moeda brasileiro.
 *
 * @param priceInCents Valor em centavos. Ex.: `2500` para R$ 25,00.
 * @returns O valor formatado, com espaço não separável entre "R$" e o número.
 *
 * @example
 * formatCurrency(2500);  // "R$ 25,00"
 * formatCurrency(19000); // "R$ 190,00"
 */
export function formatCurrency(priceInCents: number): string {
  // O Intl usa espaço não separável (U+00A0) entre o símbolo e o número,
  // o que é exatamente o que queremos: o preço nunca quebra em duas linhas.
  return brlFormatter.format(priceInCents / 100);
}

/**
 * Formata um preço com a unidade logo depois.
 *
 * @param priceInCents Valor em centavos.
 * @param unit Unidade exibida após a barra. Padrão: `'kg'`.
 * @returns Texto pronto para leitores de tela e para o atributo `title`.
 *
 * @example
 * formatCurrencyPerUnit(2500);       // "R$ 25,00 por kg"
 * formatCurrencyPerUnit(1600, 'un'); // "R$ 16,00 por un"
 */
export function formatCurrencyPerUnit(priceInCents: number, unit = 'kg'): string {
  return `${formatCurrency(priceInCents)} por ${unit}`;
}
