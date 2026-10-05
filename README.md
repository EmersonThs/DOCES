# Doce Ação — Experiência Prática IV

Projeto acadêmico de Desenvolvimento Front-end. ONG fictícia com identidade rosa, navegação SPA, cartões, busca, favoritos e formulário demonstrativo. Não cria inscrições nem transmite dados pessoais.

Repositório de destino: https://github.com/EmersonThs/DOCES

Site publicado: https://emersonths.github.io/DOCES/ — versão v1.0.0. Evidências em [docs/ENTREGA.md](docs/ENTREGA.md).

## Instalação

Requisitos: Node.js 22 ou superior e pnpm 11.25.0.

Clone `https://github.com/EmersonThs/DOCES.git` e entre na pasta `DOCES` antes de executar os comandos.

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm test
pnpm run contraste
pnpm run build
pnpm start
```

Abra http://127.0.0.1:8766/ para desenvolvimento. Para testar o pacote otimizado, execute `pnpm run preview` e abra http://127.0.0.1:8767/. Ctrl+C encerra o servidor. Ambos atendem somente no próprio computador. Não abra o HTML por duplo clique: módulos ES6 precisam de HTTP.

## Utilização

Conheça os projetos, busque por texto, salve favoritos e filtre os itens salvos. No cadastro, use somente dados fictícios; todos os campos são obrigatórios. A forma de colaboração pode ser removida por “Esquecer minha preferência”. Os botões dos cartões permitem remover favoritos.

Rotas: `#/inicio`, `#/projetos`, `#/cadastro`. A troca atualiza conteúdo, título, indicação de página ativa e foco. Links relativos funcionam em subdiretórios de hospedagem.

## Arquitetura

- `html/index.html`: documento e templates semânticos.
- `css/style.css`: design system rosa e layout responsivo.
- `imagens/doce-acao.svg`: ilustração vetorial original.
- `js/main.js`: inicialização.
- `js/modulos/`: dados, roteador, templates, armazenamento, validação, formulário, interface e eventos.
- `scripts/`: minificação e medição de contraste.
- `testes/`: testes das regras e auditoria axe.
- `docs/`: evidências e documentação técnica.
- `dist/`: saída gerada, única pasta a publicar.

Os módulos comunicam-se por import/export. Eventos delegados evitam duplicação após trocar os templates. As regras de validação são testáveis fora do navegador. Não há backend, banco, autenticação, pagamento ou API externa.

## Dados e segurança

A chave `doceAcao:preferencias:v1` guarda somente versão, IDs dos favoritos e forma de colaboração. Nome, CPF, telefone, e-mail, CEP e cidade não são armazenados nem enviados. A validação verifica formato, não identidade ou existência de endereço. Entradas são normalizadas; erros do armazenamento têm alternativa em memória. Conteúdo dinâmico usa textContent e createElement.

Não publique node_modules, .git, arquivos .env ou dados reais de voluntários. Um uso real exigiria backend, validação no servidor, gestão segura dos dados e avaliação da infraestrutura. Os contatos fictícios foram removidos para evitar acionamento de canais reais por engano.

## Acessibilidade e testes

Idioma pt-BR, landmarks, títulos, skip link, controles nativos, foco visível, navegação por teclado, diálogo, labels, fieldset/legend, aria-describedby, aria-invalid e regiões de estado. O CSS respeita movimento reduzido e cores forçadas. Os nomes acessíveis dos favoritos contêm seus textos visíveis.

Para repetir axe: gere o build, inicie o servidor e abra http://127.0.0.1:8766/testes/acessibilidade.html. Clique “Executar auditoria”. O escopo usa tags WCAG 2.0/2.1 A/AA. Consulte docs/auditoria-axe.json e docs/ACESSIBILIDADE.md. Testes automáticos não comprovam conformidade integral.

## Build e performance

esbuild minifica módulos JavaScript e CSS; html-minifier-terser reduz HTML; SVGO otimiza o vetor preservando nome/descrição. As dependências são ferramentas de desenvolvimento e não integram o site. Não há CDN, fontes externas ou rastreadores.

O build lê apenas arquivos do projeto, mantém o código fonte legível e não remove diretórios recursivamente. Reexecutá-lo atualiza os arquivos gerados. Caso um módulo seja removido do código, revise arquivos obsoletos em dist antes da publicação. docs/metricas-build.json registra bytes antes/depois e estimativa gzip; a compressão HTTP real depende da hospedagem.

## GitFlow e revisão

main contém versões estáveis; develop integra alterações; feature/acessibilidade-ep4 isola a EP4; release/1.0.0 prepara o lançamento. Hotfixes serão criados somente quando necessários. Commits usam chore, fix, build, docs e test. SemVer: major para incompatibilidades, minor para funcionalidades compatíveis, patch para correções.

Antes de integrar: revisar diff, testes, build, teclado e tela móvel. Projeto individual: autorrevisão não equivale à aprovação de um segundo colaborador. Use o modelo de pull request em .github/pull_request_template.md.

## Publicação e manutenção

GitHub Pages via Actions, publicado em 05/10/2026. A publicação é manual, após revisão e autorização. Pages está configurado com origem GitHub Actions. O workflow testa, compila e publica somente dist. CI verifica branches e pull requests sem publicar.

Para rollback, reverta o commit com problema por um novo commit em main e publique novamente; preserve o histórico. O estado efetivo de repositório, PR e publicação está registrado em docs/ENTREGA.md.

## Referências oficiais

- https://www.w3.org/TR/WCAG21/
- https://github.com/dequelabs/axe-core
- https://esbuild.github.io/
- https://svgo.dev/
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
