const quadro=document.querySelector('#aplicacao');
document.querySelector('#executar').addEventListener('click',async()=>{
  const status=document.querySelector('#status'),saida=document.querySelector('#resultado');
  const botao=document.querySelector('#executar');botao.disabled=true;const resultados=[];
  try {
    for(const rota of ['inicio','projetos','cadastro','cadastro-erros']) {
      status.textContent=`Verificando ${rota}…`;
      await new Promise(resolve=>{quadro.onload=resolve;quadro.src=`../dist/index.html?auditoria=${rota}#/${rota.startsWith('cadastro')?'cadastro':rota}`;});
      const doc=quadro.contentDocument;
      for(let i=0;i<50&&!doc.querySelector('h1');i++) await new Promise(r=>setTimeout(r,50));
      if(!doc.querySelector('h1')) throw new Error('A aplicação não carregou. Execute o build primeiro.');
      if(rota==='cadastro-erros') doc.querySelector('#form-cadastro').requestSubmit();
      await new Promise((resolve,reject)=>{const script=doc.createElement('script');script.src='../node_modules/axe-core/axe.min.js';script.onload=resolve;script.onerror=reject;doc.head.append(script);});
      const r=await quadro.contentWindow.axe.run(doc,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
      resultados.push({rota,violacoes:r.violations.map(v=>({id:v.id,impacto:v.impact,descricao:v.description,ajuda:v.helpUrl,nos:v.nodes.map(n=>({alvo:n.target,resumo:n.failureSummary}))})),incompletos:r.incomplete.map(v=>({id:v.id,descricao:v.description,nos:v.nodes.map(n=>n.target)})),verificacoesAprovadas:r.passes.length});
    }
    saida.textContent=JSON.stringify({data:new Date().toISOString(),axe:quadro.contentWindow.axe.version,resultados},null,2);
    status.textContent=`Concluído: ${resultados.reduce((n,r)=>n+r.violacoes.length,0)} violações automáticas em quatro cenários. Revise também os itens incompletos.`;
  } catch(e) { status.textContent='Falha na auditoria: '+String(e.message||e); }
  finally {botao.disabled=false;}
});
