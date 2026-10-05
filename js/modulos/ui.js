let temporizador;
export function notificar(texto, erro = false) {
  const aviso = document.querySelector('#notificacao');
  clearTimeout(temporizador);
  aviso.textContent = texto;
  aviso.classList.toggle('toast-erro', erro);
  aviso.hidden = false;
  temporizador = setTimeout(() => { aviso.hidden = true; }, 7000);
}
export function definirMenu(aberto) {
  const botao = document.querySelector('.menu-toggle');
  botao.setAttribute('aria-expanded', String(aberto));
  botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  document.querySelector('.navegacao').classList.toggle('aberta', aberto);
  if (!aberto) definirSubmenu(false);
}
export function definirSubmenu(aberto) {
  document.querySelector('.submenu-toggle').setAttribute('aria-expanded', String(aberto));
  document.querySelector('.tem-submenu').classList.toggle('aberto', aberto);
}
