# Relatório de testes — EP3

Data: 05/10/2026. Ambiente: Windows, Chrome e servidor local HTTP. Testes de interface feitos no navegador; testes das regras com o executor nativo do Node.js.

## Resultados observados

| Verificação | Resultado |
| --- | --- |
| Seis testes automatizados: CPF, entradas inválidas, máscaras, persistência sem dados pessoais, armazenamento corrompido/bloqueado e normalização | Passaram |
| Navegação início → projetos → cadastro | Conteúdo, hash e título atualizados |
| Favoritar e recarregar | Favorito restaurado |
| Filtro de favoritos | Somente o projeto salvo exibido |
| Pesquisa sem correspondência | Mensagem de resultado vazio exibida |
| Envio com campos vazios | Oito erros e foco no primeiro campo |
| Envio com dados fictícios válidos | Sucesso, campos pessoais limpos e preferência salva |
| Recarregar cadastro | Preferência restaurada, campos pessoais vazios |
| Menu em 390 px | Abriu por botão e fechou ao navegar |
| Modal informativo | Abriu e fechou com Escape; foco retornou ao botão |
| Submenu desktop | Abriu por botão e fechou com Escape; aria-expanded acompanhou a visibilidade |
| Rota inválida #toString | Tela de página não encontrada e retorno ao início |
| Console observado | Sem avisos ou erros nos fluxos verificados |

## Responsividade

Foram verificadas larguras de 360, 390, 430, 768, 1366 e 1440 px. A largura do documento não excedeu a janela em nenhuma delas. Inspeção visual do cadastro móvel e dos cartões no desktop confirmou a organização e legibilidade nesses cenários.

## Correções e prevenção

1. O roteador agora verifica `Object.hasOwn` para não aceitar propriedades herdadas como rotas.
2. A abertura do submenu ficou vinculada ao botão e ao estado controlado pelo JavaScript. Foram removidas regras de hover que podiam deixá-lo visível com aria-expanded falso.
3. O armazenamento normaliza os dados, descarta valores desconhecidos e captura falhas de leitura/escrita.
4. A delegação registra os ouvintes uma única vez; a troca de templates não adiciona novas cópias.

## Limites da verificação

Não foram realizados testes em outros navegadores, dispositivos físicos ou com leitor de tela. As larguras móveis foram simuladas no Chrome. Não há backend nem chamadas de rede de negócio; falhas de internet, envio real e sincronização entre dispositivos não se aplicam à demonstração. Os testes não representam uma certificação completa de acessibilidade ou segurança para produção.
