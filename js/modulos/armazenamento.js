import { projetos, interesses } from './dados.js';
export const CHAVE = 'doceAcao:preferencias:v1';
const ids = new Set(projetos.map(projeto => projeto.id));
export function normalizarEstado(dados) {
  return {
    versao: 1,
    favoritos: Array.isArray(dados?.favoritos) ? [...new Set(dados.favoritos.filter(id => ids.has(id)))] : [],
    interesse: Object.hasOwn(interesses, dados?.interesse) ? dados.interesse : ''
  };
}
// O adaptador injetável permite testar armazenamento indisponível e JSON inválido.
export function criarArmazenamento(obterStorage = () => window.localStorage) {
  let memoria = normalizarEstado(null);
  function carregar() {
    try {
      memoria = normalizarEstado(JSON.parse(obterStorage().getItem(CHAVE)));
      return { ...memoria, favoritos: [...memoria.favoritos], disponivel: true };
    } catch {
      return { ...memoria, favoritos: [...memoria.favoritos], disponivel: false };
    }
  }
  function salvar(alteracao) {
    memoria = normalizarEstado({ ...memoria, ...alteracao });
    try {
      obterStorage().setItem(CHAVE, JSON.stringify(memoria));
      return true;
    } catch { return false; }
  }
  function estado() { return { ...memoria, favoritos: [...memoria.favoritos] }; }
  return { carregar, salvar, estado };
}
export const armazenamento = criarArmazenamento();
