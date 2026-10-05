import { interesses } from './dados.js';
export const somenteNumeros = valor => String(valor).replace(/\D/g, '');
export function validarCPF(valor) {
  const n = somenteNumeros(valor);
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;
  for (let posicao = 9; posicao <= 10; posicao++) {
    let soma = 0;
    for (let i = 0; i < posicao; i++) soma += Number(n[i]) * (posicao + 1 - i);
    const digito = ((soma * 10) % 11) % 10;
    if (digito !== Number(n[posicao])) return false;
  }
  return true;
}
export function validarCampo(nome, valor) {
  const texto = typeof valor === 'string' ? valor.trim() : '';
  switch (nome) {
    case 'nome': return texto.length >= 3 && texto.length <= 100 ? '' : 'Informe seu nome completo, entre 3 e 100 caracteres.';
    case 'cpf': return validarCPF(texto) ? '' : 'Informe um CPF com dígitos verificadores válidos.';
    case 'telefone': return /^\d{10,11}$/.test(somenteNumeros(texto)) ? '' : 'Informe telefone com DDD e 10 ou 11 dígitos.';
    case 'email': return texto.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto) ? '' : 'Informe um e-mail válido, como nome@exemplo.com.';
    case 'cep': return /^\d{8}$/.test(somenteNumeros(texto)) ? '' : 'Informe um CEP com 8 dígitos.';
    case 'cidade': return texto.length >= 2 && texto.length <= 80 ? '' : 'Informe a cidade, entre 2 e 80 caracteres.';
    case 'interesse': return Object.hasOwn(interesses, valor) ? '' : 'Selecione uma forma de colaboração.';
    case 'termos': return valor === true ? '' : 'Confirme que compreendeu o caráter demonstrativo.';
    default: return 'Campo não reconhecido.';
  }
}
export function aplicarMascara(nome, valor) {
  const n = somenteNumeros(valor);
  if (nome === 'cpf') return n.slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  if (nome === 'cep') return n.slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
  if (nome === 'telefone') return n.slice(0, 11).replace(/(\d{2})(\d)/, '($1) $2').replace(n.length > 10 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2');
  return valor;
}
