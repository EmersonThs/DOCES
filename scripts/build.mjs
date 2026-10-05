import { transform } from 'esbuild';
import { minify } from 'html-minifier-terser';
import { optimize } from 'svgo';
import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
await mkdir(path.join(dist, 'assets'), { recursive: true });
await mkdir(path.join(root, 'docs'), { recursive: true });
// Transform recebe texto: não procura configurações em diretórios ancestrais.
// Os módulos relativos são preservados e todos os caminhos ficam nesta pasta.
const modulos = (await readdir(path.join(root,'js/modulos'))).filter(n=>n.endsWith('.js'));
await mkdir(path.join(dist,'assets/modulos'),{recursive:true});
const fontesJs = ['main.js', ...modulos.map(n=>`modulos/${n}`)];
let jsOriginal=0, jsCompactado=0, jsGzip=0;
for (const arquivo of fontesJs) {
  const codigo=await readFile(path.join(root,'js',arquivo),'utf8');
  const resultado=await transform(codigo,{loader:'js',minify:true,format:'esm',target:'es2022',legalComments:'none'});
  const destino=arquivo==='main.js'?'app.min.js':arquivo;
  await writeFile(path.join(dist,'assets',destino),resultado.code);
  jsOriginal+=Buffer.byteLength(codigo);jsCompactado+=Buffer.byteLength(resultado.code);jsGzip+=gzipSync(resultado.code).length;
}
const css=await transform(await readFile(path.join(root,'css/style.css'),'utf8'),{loader:'css',minify:true,legalComments:'none'});
await writeFile(path.join(dist,'assets/style.min.css'),css.code);
const svg = await readFile(path.join(root, 'imagens/doce-acao.svg'), 'utf8');
const imagem = optimize(svg, { multipass: true, plugins: [{ name: 'preset-default', params: { overrides: { removeDesc: false, cleanupIds: false } } }] }).data;
await writeFile(path.join(dist, 'assets/doce-acao.svg'), imagem);
const fonteHtml = await readFile(path.join(root, 'html/index.html'), 'utf8');
const html = await minify(fonteHtml.replace('../css/style.css', './assets/style.min.css').replace('../js/main.js', './assets/app.min.js').replace('../imagens/doce-acao.svg', './assets/doce-acao.svg'), { collapseWhitespace: true, removeComments: true, keepClosingSlash: true, removeAttributeQuotes: false });
await writeFile(path.join(dist, 'index.html'), html);
await writeFile(path.join(dist, '.nojekyll'), '');
const itens = [ ['HTML', Buffer.byteLength(fonteHtml), 'index.html'], ['CSS', (await readFile(path.join(root,'css/style.css'))).length, 'assets/style.min.css'], ['SVG', Buffer.byteLength(svg), 'assets/doce-acao.svg'] ];
const medidas = [{tipo:'JavaScript (módulos)',origem:jsOriginal,build:jsCompactado,reducao:`${((1-jsCompactado/jsOriginal)*100).toFixed(1)}%`,gzipEstimado:jsGzip}];
for (const [tipo, origem, arquivo] of itens) {
  const bytes = await readFile(path.join(dist, arquivo));
  medidas.push({ tipo, origem, build: bytes.length, reducao: `${((1-bytes.length/origem)*100).toFixed(1)}%`, gzipEstimado: gzipSync(bytes).length });
}
await writeFile(path.join(root, 'docs/metricas-build.json'), JSON.stringify(medidas, null, 2)+'\n');
console.table(medidas);
console.log('Build estático pronto em dist/. Gzip é uma estimativa local, não uma medição da hospedagem.');
