/**
 * Formatação da lista de cidades atendidas.
 *
 * Esta é a ÚNICA função que junta os nomes das cidades em uma frase, para que
 * "Campo Grande e Terenos" apareça igual no rodapé, no contato e no catálogo.
 */

/** Formatador pt-BR reaproveitado em todas as chamadas (criar um por vez custa caro). */
const cityListFormatter = new Intl.ListFormat('pt-BR', {
  style: 'long',
  type: 'conjunction',
});

/**
 * Junta os nomes das cidades em uma frase natural em português.
 *
 * @param cities Nomes das cidades, na ordem em que devem aparecer.
 * @returns Os nomes unidos por vírgula e "e". String vazia se a lista estiver vazia.
 *
 * @example
 * formatCityList(['Campo Grande']);                        // "Campo Grande"
 * formatCityList(['Campo Grande', 'Terenos']);             // "Campo Grande e Terenos"
 * formatCityList(['Campo Grande', 'Terenos', 'Sidrolândia']);
 * // "Campo Grande, Terenos e Sidrolândia"
 */
export function formatCityList(cities: readonly string[]): string {
  return cityListFormatter.format(cities);
}
