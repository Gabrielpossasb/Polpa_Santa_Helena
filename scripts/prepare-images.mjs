/**
 * Prepara os assets de imagem do catálogo a partir de `IMAGES/PRODUTOS/` e grava em `public/`.
 *
 * Este script roda FORA do build do site (os arquivos gerados ficam versionados em `public/`),
 * por isso o `sharp` NÃO é dependência do projeto. Para rodar de novo:
 *
 *   npm i -D sharp && node scripts/prepare-images.mjs
 *
 * O que ele faz:
 * 1. Sabores  -> recorte quadrado centralizado + WebP 200x200 (medalhão circular no site).
 * 2. Produtos -> remove o fundo branco/cinza por preenchimento a partir das bordas, recorta
 *                no conteúdo e gera WebP com transparência.
 * 3. Logo     -> remove o fundo creme e gera a logo, o favicon e a imagem de Open Graph.
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEM = resolve(RAIZ, 'IMAGES/PRODUTOS');
const DESTINO = resolve(RAIZ, 'public');

/** Caminho de um arquivo de origem. */
const src = (nome) => resolve(ORIGEM, nome);
/** Caminho de um arquivo de destino dentro de `public/`. */
const out = (nome) => resolve(DESTINO, nome);

// ---------------------------------------------------------------------------
// Remoção de fundo
// ---------------------------------------------------------------------------

/**
 * Remove um fundo de cor uniforme a partir das bordas da imagem (flood fill).
 *
 * Só apaga pixels conectados à borda, então áreas internas da mesma cor
 * (ex.: o branco do rótulo de um pote) são preservadas.
 *
 * @param {Buffer} entrada Buffer da imagem original.
 * @param {number} tolerancia Distância máxima de cor para considerar "fundo" (0-255).
 * @param {number} suavizacao Raio do desfoque aplicado só no canal alfa, para suavizar a borda.
 * @returns {Promise<Buffer>} PNG com transparência, já recortado no conteúdo.
 */
async function removerFundo(entrada, tolerancia = 42, suavizacao = 0.4) {
  const { data, info } = await sharp(entrada)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels: c } = info;
  const idx = (x, y) => (y * w + x) * c;

  // Cor do fundo = mediana dos pixels das quatro bordas.
  const amostras = [];
  for (let x = 0; x < w; x++) {
    amostras.push([data[idx(x, 0)], data[idx(x, 0) + 1], data[idx(x, 0) + 2]]);
    amostras.push([data[idx(x, h - 1)], data[idx(x, h - 1) + 1], data[idx(x, h - 1) + 2]]);
  }
  for (let y = 0; y < h; y++) {
    amostras.push([data[idx(0, y)], data[idx(0, y) + 1], data[idx(0, y) + 2]]);
    amostras.push([data[idx(w - 1, y)], data[idx(w - 1, y) + 1], data[idx(w - 1, y) + 2]]);
  }
  const mediana = (vals) => vals.sort((a, b) => a - b)[Math.floor(vals.length / 2)];
  const fundo = [0, 1, 2].map((canal) => mediana(amostras.map((p) => p[canal])));

  const perto = (i) => {
    const d =
      Math.abs(data[i] - fundo[0]) +
      Math.abs(data[i + 1] - fundo[1]) +
      Math.abs(data[i + 2] - fundo[2]);
    return d <= tolerancia * 3;
  };

  // Flood fill iterativo (pilha) a partir de todos os pixels da borda.
  const ehFundo = new Uint8Array(w * h);
  const pilha = [];
  const empilhar = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = y * w + x;
    if (ehFundo[p]) return;
    if (!perto(p * c)) return;
    ehFundo[p] = 1;
    pilha.push(x, y);
  };
  for (let x = 0; x < w; x++) {
    empilhar(x, 0);
    empilhar(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    empilhar(0, y);
    empilhar(w - 1, y);
  }
  while (pilha.length) {
    const y = pilha.pop();
    const x = pilha.pop();
    empilhar(x + 1, y);
    empilhar(x - 1, y);
    empilhar(x, y + 1);
    empilhar(x, y - 1);
  }

  // Monta a máscara de opacidade e descobre a caixa do conteúdo que sobrou.
  const alfa = Buffer.alloc(w * h);
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      if (ehFundo[p]) continue;
      alfa[p] = 255;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < 0) throw new Error('Remoção de fundo apagou a imagem inteira.');

  // Desfoca só a máscara, para a borda recortada não ficar serrilhada.
  // Atenção: o sharp devolve raw de 1 canal como 3 canais, por isso lemos o passo real.
  let alfaFinal = alfa;
  let passoAlfa = 1;
  if (suavizacao > 0) {
    const desfocado = await sharp(alfa, { raw: { width: w, height: h, channels: 1 } })
      .blur(suavizacao)
      .raw()
      .toBuffer({ resolveWithObject: true });
    alfaFinal = desfocado.data;
    passoAlfa = desfocado.info.channels;
  }

  const rgba = Buffer.alloc(w * h * 4);
  for (let p = 0; p < w * h; p++) {
    rgba[p * 4] = data[p * c];
    rgba[p * 4 + 1] = data[p * c + 1];
    rgba[p * 4 + 2] = data[p * c + 2];
    rgba[p * 4 + 3] = alfaFinal[p * passoAlfa];
  }

  return sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .png()
    .toBuffer();
}

// ---------------------------------------------------------------------------
// Tarefas
// ---------------------------------------------------------------------------

/**
 * Sabores de polpa: fundo colorido da Pura Polpa é mantido (vira medalhão circular).
 *
 * Cada item é `[arquivo, slug, recorte?]`. Sem o terceiro valor, o script pega o
 * maior quadrado centralizado. O recorte manual `{ left, top, size }` (em pixels
 * da imagem ORIGINAL) serve para fugir do selo "Pura Polpa" ou para aproximar a
 * fruta quando o enquadramento do catálogo não ajuda.
 */
const SABORES = [
  ['Screenshot_6.png', 'abacaxi'],
  ['Screenshot_4.png', 'acerola'],
  ['Screenshot_8.png', 'acerola-laranja'],
  ['Screenshot_9.png', 'caju'],
  ['Screenshot_10.png', 'cupuacu'],
  ['Screenshot_12.png', 'goiaba'],
  ['Screenshot_14.png', 'limao'],
  ['Screenshot_7.png', 'abacaxi-hortela'],
  ['Screenshot_11.png', 'frutas-vermelhas'],
  ['Screenshot_17.png', 'uva'],
  ['Screenshot_3.png', 'acai'],
  ['Screenshot_13.png', 'graviola'],
  ['Screenshot_15.png', 'maracuja'],
  ['Screenshot_16.png', 'morango'],
  ['amora.png', 'amora'],
  ['coco.png', 'coco'],
  ['tamarindo.png', 'tamarindo'],
  // O selo "Pura Polpa" cobre a parte de baixo, então subimos o recorte.
  ['tangerina.png', 'tangerina', { left: 27, top: 0, size: 110 }],
];

/** Outros produtos e potes de açaí: fundo branco/cinza vira transparente. */
const RECORTADOS = [
  ['Screenshot_20.png', 'produtos/morango-congelado', 320, 22],
  ['Screenshot_18.png', 'produtos/abacaxi-congelado', 320, 22],
  ['Screenshot_19.png', 'produtos/maracuja-congelado', 320, 22],
  ['Screenshot_21.png', 'produtos/pao-de-queijo', 320, 22],
  ['Screenshot_24.png', 'acai/pote-500ml', 420, 26],
  ['Screenshot_23.png', 'acai/pote-2l', 420, 20],
  ['Screenshot_5.png', 'acai/balde-3-6l', 420, 20],
  ['Screenshot_26.png', 'acai/balde-10l', 420, 20],
];

async function main() {
  await mkdir(out('icons'), { recursive: true });
  await mkdir(out('produtos'), { recursive: true });
  await mkdir(out('acai'), { recursive: true });

  // 1. Sabores -> quadrado 200x200.
  for (const [arquivo, slug, recorte] of SABORES) {
    const meta = await sharp(src(arquivo)).metadata();
    const lado = recorte ? recorte.size : Math.min(meta.width, meta.height);
    await sharp(src(arquivo))
      .extract({
        left: recorte ? recorte.left : Math.round((meta.width - lado) / 2),
        top: recorte ? recorte.top : Math.round((meta.height - lado) / 2),
        width: lado,
        height: lado,
      })
      .resize(200, 200, { kernel: 'lanczos3' })
      .webp({ quality: 86 })
      .toFile(out(`icons/${slug}.webp`));
    console.log(`sabor    ${slug}.webp`);
  }

  // 2. Produtos e potes -> fundo transparente.
  for (const [arquivo, destino, altura, tolerancia] of RECORTADOS) {
    const semFundo = await removerFundo(await sharp(src(arquivo)).png().toBuffer(), tolerancia);
    await sharp(semFundo)
      .resize({ height: altura, fit: 'inside', withoutEnlargement: false, kernel: 'lanczos3' })
      .webp({ quality: 88, alphaQuality: 100 })
      .toFile(out(`${destino}.webp`));
    console.log(`produto  ${destino}.webp`);
  }

  // 3. Logos -> fundo creme removido.
  const logoRet = await removerFundo(await sharp(src('LOGO_RETANGULO.png')).png().toBuffer(), 30);
  await sharp(logoRet)
    .resize({ width: 640, kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(out('logo-polpa-santa-helena.png'));
  console.log('logo     logo-polpa-santa-helena.png');

  const logoQuad = await removerFundo(await sharp(src('LOGO_QUADRADO.png')).png().toBuffer(), 30);

  // Favicon: logo quadrada sobre o creme da marca, com folga nas bordas.
  await sharp({
    create: { width: 512, height: 512, channels: 4, background: '#FCF4E9' },
  })
    .composite([
      {
        input: await sharp(logoQuad)
          .resize(448, 448, { fit: 'inside', kernel: 'lanczos3' })
          .toBuffer(),
        gravity: 'centre',
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(out('favicon.png'));
  console.log('logo     favicon.png');

  // Open Graph: 1200x630 sobre o creme da marca.
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: '#FCF4E9' },
  })
    .composite([
      {
        input: await sharp(logoQuad)
          .resize(500, 500, { fit: 'inside', kernel: 'lanczos3' })
          .toBuffer(),
        gravity: 'centre',
      },
    ])
    .jpeg({ quality: 90 })
    .toFile(out('og-image.jpg'));
  console.log('logo     og-image.jpg');

  // Versão pequena do favicon, para a aba do navegador.
  await sharp(out('favicon.png')).resize(32, 32).png().toFile(out('favicon-32.png'));
  console.log('logo     favicon-32.png');
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
