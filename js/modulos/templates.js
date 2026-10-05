import { projetos } from './dados.js';
import { armazenamento } from './armazenamento.js';

function elemento(tag, texto, classe) {
  const no = document.createElement(tag);
  if (texto !== undefined) no.textContent = texto;
  if (classe) no.className = classe;
  return no;
}
export function criarCard(projeto, completo = true) {
  const card = elemento('article', undefined, 'card');
  const icone = elemento('span', projeto.icone, 'icone');
  icone.setAttribute('aria-hidden', 'true');
  card.append(icone, elemento('span', projeto.categoria, 'badge'), elemento('h3', projeto.nome), elemento('p', projeto.descricao));
  if (completo) card.append(elemento('h4', 'Como ajudar'), elemento('p', projeto.ajuda));
  const favorito = armazenamento.estado().favoritos.includes(projeto.id);
  const botao = elemento('button', favorito ? '♥ Favoritado' : '♡ Salvar favorito', 'botao botao-favorito');
  botao.type = 'button';
  botao.dataset.favorito = projeto.id;
  botao.setAttribute('aria-pressed', String(favorito));
  botao.setAttribute('aria-label', `${favorito ? 'Remover' : 'Salvar'} ${projeto.nome} ${favorito ? 'dos' : 'nos'} favoritos`);
  card.append(botao);
  return card;
}
const normalizar = texto => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export function renderizarProjetos() {
  const lista = document.querySelector('[data-lista-projetos]');
  if (!lista) return;
  const busca = normalizar(document.querySelector('#busca-projetos')?.value.trim() || '');
  const soFavoritos = document.querySelector('#somente-favoritos')?.checked;
  const favoritos = armazenamento.estado().favoritos;
  const resultado = projetos.filter(p => normalizar(`${p.nome} ${p.descricao}`).includes(busca) && (!soFavoritos || favoritos.includes(p.id)));
  const fragmento = document.createDocumentFragment();
  resultado.forEach(p => fragmento.append(criarCard(p, lista.dataset.listaProjetos === 'completa')));
  lista.replaceChildren(fragmento);
  const vazio = document.querySelector('#lista-vazia');
  if (vazio) vazio.hidden = resultado.length > 0;
  const quantidade = document.querySelector('#quantidade-projetos');
  if (quantidade) quantidade.textContent = `${resultado.length} projeto(s) encontrado(s).`;
}
export function atualizarResumo() {
  const quantidade = armazenamento.estado().favoritos.length;
  document.querySelector('#resumo-favoritos').textContent = `${quantidade} projeto(s) favorito(s) neste navegador.`;
}
