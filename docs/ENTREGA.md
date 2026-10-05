# Estado da entrega EP4

## Confirmado localmente

- Projeto independente da EP3, preservando a identidade rosa.
- Git com main, develop e feature/acessibilidade-ep4.
- Commits semânticos reais de importação, acessibilidade e build.
- Seis testes unitários passaram.
- Dez pares de contraste aprovados por cálculo.
- Quatro cenários axe sem violações automáticas, com revisão manual dos contrastes inconclusivos.
- Pacote dist minificado e conferido no Chrome.

## Confirmado no GitHub

- Código enviado a https://github.com/EmersonThs/DOCES.
- PR #1 integrou feature/acessibilidade-ep4 em develop: https://github.com/EmersonThs/DOCES/pull/1.
- Duas verificações automáticas aprovadas antes da integração.
- Branch release/1.0.0 criada a partir de develop para preparar a entrega.

## Publicação confirmada em 05/10/2026

- PR #2 integrou release/1.0.0 em main após duas verificações aprovadas: https://github.com/EmersonThs/DOCES/pull/2.
- Commit publicado: 91a5c57f7ad0541771d5f5ed4ce84a54b7990445; tag anotada v1.0.0 enviada ao GitHub.
- develop sincronizada com a versão estável.
- GitHub Pages por Actions, com HTTPS e apenas o conteúdo de dist.
- Workflow concluído com sucesso: https://github.com/EmersonThs/DOCES/actions/runs/37351953634.
- Site verificado no Chrome: https://emersonths.github.io/DOCES/.
- Verificados no endereço público: início, diálogo (abertura e Escape), rota de projetos, filtro por Oficina, favorito e validação vazia do cadastro (8 mensagens e foco em Nome).

## Limites reais

Nenhuma revisão por um segundo colaborador é alegada. Não foi executado NVDA, VoiceOver ou Narrador, nem teste em dispositivo físico ou em todos os navegadores. Zero violações automáticas não equivale a certificação de conformidade integral WCAG. O workflow concluiu com aviso de migração de runtime de actions do GitHub; não houve falha de publicação. O formulário é demonstrativo e não envia dados pessoais.
