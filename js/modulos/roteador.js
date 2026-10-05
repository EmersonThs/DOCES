const rotas = {
  '/inicio': { template: 'pagina-inicio', titulo: 'Doce Ação — Solidariedade que adoça vidas' },
  '/projetos': { template: 'pagina-projetos', titulo: 'Projetos solidários da Doce Ação' },
  '/cadastro': { template: 'pagina-cadastro', titulo: 'Seja voluntário na Doce Ação' }
};
export function iniciarRoteador(aoRenderizar) {
  const main = document.querySelector('#conteudo');
  function renderizar() {
    const caminho = location.hash.slice(1) || '/inicio';
    if (caminho === 'conteudo') { main.focus(); return; }
    const rota = Object.hasOwn(rotas, caminho) ? rotas[caminho] : null;
    if (rota) {
      main.replaceChildren(document.getElementById(rota.template).content.cloneNode(true));
      document.title = rota.titulo;
    } else {
      const bloco = document.createElement('section');
      bloco.className = 'container secao';
      const titulo = document.createElement('h1'); titulo.textContent = 'Página não encontrada';
      const link = document.createElement('a'); link.href = '#/inicio'; link.textContent = 'Voltar ao início';
      bloco.append(titulo, link); main.replaceChildren(bloco);
      document.title = 'Página não encontrada — Doce Ação';
    }
    document.querySelectorAll('.menu a').forEach(link => {
      const ativo = link.getAttribute('href') === `#${caminho}`;
      link.classList.toggle('ativo', ativo);
      if (ativo) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
    aoRenderizar();
    main.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', renderizar);
  renderizar();
}
