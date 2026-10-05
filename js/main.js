import { armazenamento } from './modulos/armazenamento.js';
import { iniciarRoteador } from './modulos/roteador.js';
import { renderizarProjetos, atualizarResumo } from './modulos/templates.js';
import { iniciarEventos } from './modulos/eventos.js';
import { prepararFormulario } from './modulos/formulario.js';
import { definirMenu, notificar } from './modulos/ui.js';

const carregado = armazenamento.carregar();
iniciarEventos();
iniciarRoteador(() => {
  definirMenu(false);
  renderizarProjetos();
  atualizarResumo();
  prepararFormulario();
});
if (!carregado.disponivel) notificar('Não foi possível recuperar suas preferências. Você pode continuar usando a página.', true);
