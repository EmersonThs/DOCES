import { validarCampo, aplicarMascara } from './validacao.js';
import { armazenamento } from './armazenamento.js';
import { interesses } from './dados.js';
import { notificar } from './ui.js';
export const campos = ['nome','cpf','telefone','email','cep','cidade','interesse','termos'];
export function exibirValidacao(campo) {
  if (!campos.includes(campo.name)) return '';
  const mensagem = validarCampo(campo.name, campo.type === 'checkbox' ? campo.checked : campo.value);
  document.getElementById(`erro-${campo.name}`).textContent = mensagem;
  campo.setAttribute('aria-invalid', String(Boolean(mensagem)));
  campo.classList.toggle('invalido', Boolean(mensagem));
  campo.classList.toggle('valido', !mensagem);
  return mensagem;
}
export function tratarEntrada(campo) {
  if (!campos.includes(campo.name)) return;
  if (['cpf','telefone','cep'].includes(campo.name)) campo.value = aplicarMascara(campo.name, campo.value);
  if (campo.hasAttribute('aria-invalid')) exibirValidacao(campo);
}
export function atualizarPreferencia() {
  const texto = document.querySelector('#preferencia-atual');
  if (texto) texto.textContent = armazenamento.estado().interesse ? `Preferência lembrada: ${interesses[armazenamento.estado().interesse]}.` : 'Nenhuma preferência salva neste navegador.';
}
export function prepararFormulario() {
  const select = document.querySelector('#interesse');
  if (select) select.value = armazenamento.estado().interesse;
  atualizarPreferencia();
}
export function enviarFormulario(form) {
  const erros = campos.map(nome => exibirValidacao(form.elements.namedItem(nome))).filter(Boolean);
  const resumo = document.querySelector('#resumo-erros');
  const sucesso = document.querySelector('#mensagem-sucesso');
  sucesso.textContent = '';
  resumo.hidden = erros.length === 0;
  if (erros.length) {
    resumo.textContent = `Revise ${erros.length} campo(s) indicado(s) antes de continuar.`;
    form.querySelector('[aria-invalid="true"]').focus();
    return false;
  }
  const salvo = armazenamento.salvar({ interesse: form.elements.namedItem('interesse').value });
  sucesso.textContent = salvo ? 'Cadastro de demonstração validado. Sua forma de colaboração foi lembrada neste navegador. Os dados pessoais não foram enviados nem armazenados.' : 'Cadastro de demonstração validado. O navegador não permitiu salvar a preferência; ela ficará disponível apenas nesta sessão. Os dados pessoais não foram armazenados.';
  form.reset();
  form.querySelectorAll('[aria-invalid]').forEach(campo => { campo.removeAttribute('aria-invalid'); campo.classList.remove('valido','invalido'); });
  prepararFormulario();
  notificar('Validação concluída. Obrigado pelo interesse em colaborar!');
  return true;
}
