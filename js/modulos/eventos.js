import { projetos } from './dados.js';
import { CHAVE, armazenamento } from './armazenamento.js';
import { renderizarProjetos, atualizarResumo } from './templates.js';
import { tratarEntrada, exibirValidacao, enviarFormulario, atualizarPreferencia } from './formulario.js';
import { definirMenu, definirSubmenu, notificar } from './ui.js';

export function iniciarEventos() {
  document.addEventListener('click', event => {
    const botao = event.target.closest('button');
    if (event.target.closest('.pular-conteudo')) { event.preventDefault(); document.querySelector('#conteudo').focus(); }
    if (botao?.matches('.menu-toggle')) definirMenu(botao.getAttribute('aria-expanded') !== 'true');
    if (botao?.matches('.submenu-toggle')) definirSubmenu(botao.getAttribute('aria-expanded') !== 'true');
    if (event.target.closest('.menu a')) definirMenu(false);
    if (!event.target.closest('.topo')) definirMenu(false);
    if (botao?.matches('[data-modal-open]')) document.querySelector('#sobre-modal').showModal();
    if (botao?.dataset.favorito && projetos.some(p => p.id === botao.dataset.favorito)) {
      const id = botao.dataset.favorito;
      const favoritos = armazenamento.estado().favoritos;
      const removendo = favoritos.includes(id);
      const salvo = armazenamento.salvar({ favoritos: removendo ? favoritos.filter(item => item !== id) : [...favoritos, id] });
      renderizarProjetos(); atualizarResumo();
      const novo = document.querySelector(`[data-favorito="${id}"]`);
      if (novo) novo.focus(); else document.querySelector('#somente-favoritos')?.focus();
      notificar(salvo ? (removendo ? 'Projeto removido dos favoritos.' : 'Projeto salvo nos favoritos.') : 'Preferência atualizada apenas nesta sessão: armazenamento indisponível.', !salvo);
    }
    if (botao?.dataset.acao === 'limpar-preferencia') {
      const salvo = armazenamento.salvar({ interesse: '' });
      document.querySelector('#interesse').value = '';
      atualizarPreferencia();
      notificar(salvo ? 'Preferência de colaboração removida.' : 'Não foi possível remover a preferência armazenada. Tente novamente.', !salvo);
    }
  });
  document.addEventListener('input', event => {
    if (event.target.id === 'busca-projetos') renderizarProjetos();
    if (event.target.closest('#form-cadastro')) tratarEntrada(event.target);
  });
  document.addEventListener('change', event => {
    if (event.target.id === 'somente-favoritos') renderizarProjetos();
    if (event.target.closest('#form-cadastro')) exibirValidacao(event.target);
  });
  document.addEventListener('focusout', event => {
    if (event.target.closest('#form-cadastro') && event.target.matches('input,select')) exibirValidacao(event.target);
  });
  document.addEventListener('submit', event => {
    if (event.target.id === 'form-cadastro') { event.preventDefault(); enviarFormulario(event.target); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !document.querySelector('#sobre-modal').open) {
      const mobile = window.matchMedia('(max-width: 47.999rem)').matches;
      const aberto = document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'true';
      definirMenu(false); definirSubmenu(false);
      if (mobile && aberto) document.querySelector('.menu-toggle').focus();
    }
  });
  window.matchMedia('(min-width: 48rem)').addEventListener('change', () => definirMenu(false));
  window.addEventListener('storage', event => {
    if (event.key === CHAVE || event.key === null) { armazenamento.carregar(); renderizarProjetos(); atualizarResumo(); atualizarPreferencia(); }
  });
}
