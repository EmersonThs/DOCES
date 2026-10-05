import { writeFile, mkdir } from 'node:fs/promises';
const luminancia = hex => {
  const c = hex.replace('#','').match(/../g).map(n=>parseInt(n,16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
  return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2];
};
const pares = [
  ['Texto principal','#2f2530','#fffaf4',4.5], ['Título e link','#842747','#ffffff',4.5],
  ['Texto sobre rosa claro','#842747','#fff1f5',4.5], ['Botão padrão','#ffffff','#842747',4.5],
  ['Botão hover','#ffffff','#b93c67',4.5], ['Texto auxiliar/placeholder','#6d5b64','#ffffff',4.5],
  ['Erro','#a12020','#fff4f4',4.5], ['Sucesso','#216e39','#f3fff5',4.5],
  ['Borda de controle','#8e7f86','#ffffff',3], ['Indicador de foco','#842747','#fffaf4',3]
];
const resultado = pares.map(([uso,frente,fundo,minimo])=> { const a=luminancia(frente),b=luminancia(fundo);const razao=(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);return {uso,frente,fundo,razao:Number(razao.toFixed(2)),minimo,aprovado:razao>=minimo}; });
await mkdir(new URL('../docs/',import.meta.url),{recursive:true});
await writeFile(new URL('../docs/contraste.json',import.meta.url),JSON.stringify(resultado,null,2)+'\n');
console.table(resultado);
if(resultado.some(r=>!r.aprovado)) process.exitCode=1;
