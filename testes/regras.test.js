import test from 'node:test';
import assert from 'node:assert/strict';
import { validarCPF, validarCampo, aplicarMascara } from '../js/modulos/validacao.js';
import { CHAVE, criarArmazenamento, normalizarEstado } from '../js/modulos/armazenamento.js';

test('CPF rejeita repetição, comprimento errado e dígito adulterado', () => {
  assert.equal(validarCPF('111.111.111-11'), false);
  assert.equal(validarCPF('123'), false);
  assert.equal(validarCPF('529.982.247-25'), true);
  assert.equal(validarCPF('529.982.247-26'), false);
});
test('campos vazios, e-mail malformado e opção desconhecida são rejeitados', () => {
  for (const campo of ['nome','cpf','telefone','email','cep','cidade','interesse']) assert.notEqual(validarCampo(campo, ''), '');
  assert.notEqual(validarCampo('email', 'nome@'), '');
  assert.notEqual(validarCampo('interesse', '__proto__'), '');
  assert.equal(validarCampo('email', 'teste@example.com'), '');
  assert.equal(validarCampo('termos', true), '');
  assert.notEqual(validarCampo('termos', false), '');
});
test('máscaras removem caracteres estranhos e limitam comprimento', () => {
  assert.equal(aplicarMascara('cpf', '52998224725abc999'), '529.982.247-25');
  assert.equal(aplicarMascara('telefone','41999999999'), '(41) 99999-9999');
  assert.equal(aplicarMascara('cep','12345678'), '12345-678');
});
test('persistência mantém apenas opções permitidas e recupera em nova instância', () => {
  const mapa = new Map();
  const local = { getItem: chave => mapa.get(chave) || null, setItem: (chave, valor) => mapa.set(chave, valor) };
  const a = criarArmazenamento(() => local); a.carregar();
  assert.equal(a.salvar({ favoritos:['festa','festa','inexistente'], interesse:'eventos', cpf:'não persistir' }), true);
  const b = criarArmazenamento(() => local);
  assert.deepEqual(b.carregar().favoritos, ['festa']);
  assert.equal(b.estado().interesse, 'eventos');
  assert.equal(mapa.get(CHAVE).includes('cpf'), false);
});
test('JSON corrompido e bloqueio do navegador não interrompem a aplicação', () => {
  const corrompido = criarArmazenamento(() => ({ getItem: () => '{erro' }));
  assert.equal(corrompido.carregar().disponivel, false);
  const bloqueado = criarArmazenamento(() => { throw new Error('bloqueado'); });
  assert.equal(bloqueado.carregar().disponivel, false);
  assert.equal(bloqueado.salvar({ favoritos:['caixa'] }), false);
  assert.deepEqual(bloqueado.estado().favoritos, ['caixa']);
});
test('conteúdo externo ao esquema é descartado', () => {
  assert.deepEqual(normalizarEstado({ favoritos:['<script>','oficina'], interesse:'valor-forjado', nome:'Pessoa' }), { versao:1, favoritos:['oficina'], interesse:'' });
});
