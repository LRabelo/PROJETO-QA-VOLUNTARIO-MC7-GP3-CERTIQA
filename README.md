# 🧪 Projeto QA Voluntário MC7 Grupo 3 (CertiQA)

O objetivo principal deste repositório é garantir a qualidade da plataforma através de testes automatizados focados na jornada do aluno, estruturando as tarefas gerenciadas no Jira e aplicando conceitos de arquitetura limpa, como o padrão **Page Objects (PO)** e **Behavior-Driven Development (BDD)** utilizando a sintaxe Gherkin.

## 🎯 Alvo dos Testes
* **URL Base:** `https://certiqa.qazando.com.br/`
* **Objetivo:** Validar fluxos principais da aplicação, começando pela autenticação de usuários, jornada de aprendizado, simulação de exames e emissão de certificados.

## 🚀 Tecnologias Utilizadas

* [Cypress](https://www.cypress.io/) (Framework de Testes)
* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) (Linguagem base)
* [Node.js](https://nodejs.org/) (Ambiente de execução)
* [Cucumber/Gherkin](https://cucumber.io/) (Escrita de cenários BDD)

## 📁 Estrutura do Projeto

A arquitetura do projeto foi estruturada para separar claramente o comportamento, os elementos e os cenários de teste:

* `cypress/e2e/`: Contém os scripts de testes divididos por domínios (1-autenticacao, 2-conteudo, 3-avaliacoes, 4-certificacao).
* `cypress/features/`: Armazena os arquivos de especificação em Gherkin (`.feature`), focados na documentação viva.
* `cypress/support/pages/`: Implementação do padrão Page Objects, mapeando elementos e ações específicas de cada tela.
* `cypress/support/`: Comandos customizados e configurações globais do Cypress (`commands.js`).

## 📋 Funcionalidades Automatizadas

O escopo do projeto cobre os seguintes fluxos principais da aplicação baseados no nosso Backlog:
* **Autenticação:** Cadastro de novo usuário (SCRUM-5) e Login (SCRUM-6).
* **Conteúdos e Progresso:** Acesso à certificação (SCRUM-7) e acompanhamento de progresso de aulas (SCRUM-8).
* **Avaliações:** Realizar exame de fase (SCRUM-9), cálculo de aprovação e pontuação (SCRUM-10) e realização do exame final (SCRUM-11).
* **Certificação:** Geração e emissão do certificado de conclusão (SCRUM-12).

## 🛠️ Instalação e Configuração

Antes de começar, certifique-se de que tem o **Node.js** instalado na sua máquina.

1. Clone este repositório para o seu ambiente local:
   ```bash
   git clone https://github.com/[SEU_USUARIO]/[NOME_DO_REPOSITORIO].git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd [NOME_DO_REPOSITORIO]
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Execute os testes:
   * Para abrir a interface interativa: `npx cypress open`
   * Para rodar em background (headless): `npx cypress run`

## 📊 Relatórios de Teste (Mochawesome)

Este projeto está configurado para gerar relatórios visuais em HTML sempre que os testes são executados em *background* (modo headless). Isso facilita a identificação de erros e a visualização das evidências.

**Como gerar o relatório na sua máquina:**
* Execute o comando: `npm run cypress:run`
* Ao finalizar, o Cypress criará automaticamente uma pasta chamada `cypress/reports`.
* Abra o arquivo `index.html` (dentro dessa pasta) no seu navegador. 

**O que o relatório inclui?**
* Gráficos com a porcentagem de sucesso e falha.
* O tempo de execução de cada teste.
* Em caso de falha, um *screenshot* automático da tela no exato momento em que o erro ocorreu será anexado ao relatório.

## 🤖 Integração Contínua (CI/CD) com GitHub Actions
Este projeto utiliza o GitHub Actions para garantir a qualidade contínua do código.

Sempre que um voluntário abrir um Pull Request ou enviar um código para as branches principais, nossa esteira automatizada (Pipeline) será acionada na nuvem. O robô do GitHub instalará as dependências, rodará todos os testes em background e fará a validação de segurança. Se algum teste quebrar as regras de negócio, o Pull Request será bloqueado até a correção.