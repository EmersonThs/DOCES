# Doce Ação — Experiência Prática III

Projeto acadêmico de Desenvolvimento Front-end. Evolução independente da EP2, preservando a identidade rosa e os projetos Festa que Abraça, Oficina Doce Futuro e Caixa do Bem.

## Abrir a aplicação

Requer Node.js 18 ou superior. Na pasta deste projeto, execute:

```text
node servidor.cjs
```

Abra http://127.0.0.1:8765/html/index.html no navegador. Encerre o servidor com Ctrl+C. O servidor atende apenas no próprio computador. Não abra o HTML diretamente com duplo clique: os módulos JavaScript precisam de HTTP. Também é possível usar um servidor estático de sua preferência com a raiz nesta pasta.

## Funcionalidades

- SPA com rotas `#/inicio`, `#/projetos` e `#/cadastro`, títulos, indicação da página ativa e tratamento de rota desconhecida.
- Templates HTML e cartões gerados a partir de dados; busca por texto e filtro de favoritos.
- Menu móvel, submenu por botão, janela informativa e mensagens de estado.
- Cadastro demonstrativo com grupos `fieldset/legend`, máscaras, verificação de CPF, validação dos campos e mensagens associadas aos controles.
- Favoritos e preferência de colaboração em `localStorage`, com validação dos dados e alternativa em memória se o armazenamento falhar.
- HTML, CSS e JavaScript separados; módulos ES6 com responsabilidades específicas.

## Organização

```text
html/index.html          Documento principal e templates das telas
css/style.css            Identidade visual e layout responsivo
imagens/doce-acao.svg     Ilustração do projeto
js/main.js               Inicialização
js/modulos/dados.js      Catálogo e opções permitidas
js/modulos/roteador.js   Rotas e troca de conteúdo
js/modulos/templates.js Cartões, pesquisa e favoritos
js/modulos/armazenamento.js  Persistência e normalização
js/modulos/validacao.js  Regras puras e máscaras
js/modulos/formulario.js Feedback e envio demonstrativo
js/modulos/ui.js         Menu e mensagens
js/modulos/eventos.js    Ouvintes delegados
js/vendor/              Reservado; nenhuma biblioteca externa utilizada
testes/regras.test.js    Testes automatizados
servidor.cjs             Servidor local de demonstração
```

## Dados e limites

A ONG e seus contatos são fictícios. O cadastro é uma simulação, não envia dados pessoais nem cria inscrições reais. Nome, CPF, telefone, e-mail, CEP e cidade são descartados após o envio demonstrativo e não são salvos no armazenamento local. Use somente dados fictícios ao testar.

A chave `doceAcao:preferencias:v1` guarda apenas versão, identificadores de favoritos e opção de colaboração. As preferências pertencem à origem do navegador (endereço e porta); não acompanham o ZIP. O botão no cadastro remove a preferência de colaboração; os botões dos cartões removem os favoritos.

As validações de formato não comprovam identidade, existência de e-mail ou endereço. Um uso real exigiria backend, validação no servidor, segurança e política de tratamento de dados. Não há dependência de CDN, biblioteca externa, autenticação ou integração de pagamento.

## Testes

```text
node --test testes/regras.test.js
```

Consulte `RELATORIO-TESTES.md` para o escopo e os resultados observados.
