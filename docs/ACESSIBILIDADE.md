# Acessibilidade — evidências e limites

Avaliação em 05/10/2026, Chrome no Windows. Referência: WCAG 2.1 A/AA. Não constitui certificação integral.

## Automatização

axe-core 4.13.0: zero violações automáticas em Início, Projetos, Cadastro e Cadastro com oito erros. O relatório integral está em auditoria-axe.json. O axe deixou contraste como revisão manual para o símbolo do submenu e textos sobre o gradiente inicial.

Esses casos foram conferidos por luminância relativa: texto vinho sobre branco 8,89:1; sobre rosa claro 8,11:1; sobre creme 8,56:1. Texto principal sobre creme 14,17:1; sobre rosa claro também excede 4,5:1. O gradiente fica entre essas superfícies claras. Os dez pares de contraste calculados em contraste.json atingiram os respectivos mínimos de 4,5:1 para texto e 3:1 para borda/foco.

## Correções realizadas

- O nome acessível de favorito passou a conter o texto visível, atendendo à identificação do controle por voz.
- Placeholders usam cor explícita e opacidade 1.
- Bordas de menu e submenu usam #8e7f86, com 3,80:1 sobre branco.
- Controles focados possuem margem de rolagem para reduzir interferência do cabeçalho fixo.
- Instrução informa que todos os campos são obrigatórios e que devem ser usados dados fictícios.
- Suporte a cores forçadas mantém bordas e foco reconhecíveis.

## Verificação manual no Chrome

- Enter abriu o diálogo; Escape fechou e devolveu foco ao botão de origem.
- O menu móvel abriu pelo teclado e fechou ao navegar ao cadastro.
- Envio vazio mostrou oito mensagens específicas e focou o primeiro campo inválido.
- Larguras de 320, 390, 768 e 1440 px não apresentaram rolagem horizontal no cadastro.
- Inspeção visual em 390 px confirmou botões, textos e ilustração legíveis.

## Relação com critérios

1.1.1: alternativa textual da imagem. 1.3.1: landmarks, hierarquia, labels, fieldset/legend. 1.3.5: autocomplete apropriado. 1.4.1: erros incluem texto. 1.4.3/1.4.11: contrastes. 1.4.10: reorganização em 320 px. 2.1.1/2.1.2: controles nativos e diálogo operável. 2.4.1: skip link. 2.4.2/2.4.3/2.4.7: título e foco. 2.5.3: nome contém rótulo. 3.1.1: idioma. 3.3.1/3.3.2/3.3.3: identificação e orientação de erros. 4.1.2/4.1.3: estados ARIA e regiões de mensagem.

## Pendências reais

Não foi realizado teste com NVDA, Narrador ou outro leitor de tela. A árvore de acessibilidade do Chrome foi inspecionada, o que não equivale a ouvir a leitura. Faltam ensaios com usuários, dispositivos físicos, outros navegadores e revisão integral de todos os critérios aplicáveis. Não há áudio ou vídeo no projeto. Não se afirma conformidade completa apenas pelo resultado do axe.
