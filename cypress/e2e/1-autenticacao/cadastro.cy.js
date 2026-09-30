import CadastroPage from '../../support/pages/cadastroPage';

describe('Cadastro de usuário', () => {

  beforeEach(() => {
    cy.visit('/cadastro');
  });

  it('Deve realizar o cadastro com todos os dados válidos', () => {

    const emailTeste = `teste.${Date.now()}@teste.com`;
    const senhaTeste = Cypress.env('USER_PASSWORD');

    CadastroPage.campoNome.type('Usuário Teste QA');
    CadastroPage.campoEmail.type(emailTeste);
    CadastroPage.campoSenha.type(senhaTeste);
    CadastroPage.campoConfirmarSenha.type(senhaTeste);
    CadastroPage.botaoCadastrar.click();
    cy.url().should('eq', Cypress.config('baseUrl'));
  });
    it('Deve impedir o cadastro quando o nome não for informado', () => {

    const emailTeste = `teste.${Date.now()}@teste.com`;
    const senhaTeste = Cypress.env('USER_PASSWORD');

    CadastroPage.campoEmail.type(emailTeste);
    CadastroPage.campoSenha.type(senhaTeste);
    CadastroPage.campoConfirmarSenha.type(senhaTeste);
    CadastroPage.botaoCadastrar.click();
    cy.contains('Nome é obrigatório').should('be.visible');
  });
   it('Deve impedir o cadastro quando o e-mail não for informado', () => {

    const senhaTeste = Cypress.env('USER_PASSWORD');

    CadastroPage.campoNome.type('Usuário Teste QA');
    CadastroPage.campoSenha.type(senhaTeste);
    CadastroPage.campoConfirmarSenha.type(senhaTeste);
    CadastroPage.botaoCadastrar.click();
    cy.contains('E-mail é obrigatório').should('be.visible');
  });
    it('Deve impedir o cadastro quando a senha não for informada', () => {

    const emailTeste = `teste.${Date.now()}@teste.com`;
    const senhaTeste = Cypress.env('USER_PASSWORD');

    CadastroPage.campoNome.type('Usuário Teste QA');
    CadastroPage.campoEmail.type(emailTeste);
    CadastroPage.campoConfirmarSenha.type(senhaTeste);
    CadastroPage.botaoCadastrar.click();
    cy.contains('Senha é obrigatória').should('be.visible');
  });
    it('Deve impedir o cadastro quando a confirmação de senha não for informada', () => {

    const emailTeste = `teste.${Date.now()}@teste.com`;
    const senhaTeste = Cypress.env('USER_PASSWORD');

    CadastroPage.campoNome.type('Usuário Teste QA');
    CadastroPage.campoEmail.type(emailTeste);
    CadastroPage.campoSenha.type(senhaTeste);
    CadastroPage.botaoCadastrar.click();
    cy.contains('As senhas não coincidem').should('be.visible');
  });
    it('Deve impedir o cadastro quando o e-mail for inválido', () => {

    const senhaTeste = Cypress.env('USER_PASSWORD');

    CadastroPage.campoNome.type('Usuário Teste QA');
    CadastroPage.campoEmail.type('erika@teste');
    CadastroPage.campoSenha.type(senhaTeste);
    CadastroPage.campoConfirmarSenha.type(senhaTeste);
    CadastroPage.botaoCadastrar.click();
    cy.contains('E-mail inválido').should('be.visible');
  });  
   it('Deve impedir o cadastro quando o e-mail já estiver cadastrado', () => {

    const senhaTeste = Cypress.env('USER_PASSWORD');

    CadastroPage.campoNome.type('Usuário Teste QA');
    CadastroPage.campoEmail.type('erikacrs13@gmail.com');
    CadastroPage.campoSenha.type(senhaTeste);
    CadastroPage.campoConfirmarSenha.type(senhaTeste);
    CadastroPage.botaoCadastrar.click();
    cy.contains('Este e-mail já está sendo utilizado por outro usuário. Tente fazer login ou use outro e-mail.')
      .should('be.visible');
  });
    it('Deve impedir o cadastro quando as senhas forem diferentes', () => {

    const emailTeste = `teste.${Date.now()}@teste.com`;
    const senhaTeste = Cypress.env('USER_PASSWORD');

    CadastroPage.campoNome.type('Usuário Teste QA');
    CadastroPage.campoEmail.type(emailTeste);
    CadastroPage.campoSenha.type(senhaTeste);
    CadastroPage.campoConfirmarSenha.type('SenhaDiferente123');
    CadastroPage.botaoCadastrar.click();
    cy.contains('As senhas não coincidem').should('be.visible');
  });
   it('Deve permitir o cadastro sem informar o código do aluno', () => {

  const emailTeste = `teste.${Date.now()}@teste.com`;
  const senhaTeste = Cypress.env('USER_PASSWORD');

  CadastroPage.campoNome.type('Usuário Teste QA');
  CadastroPage.campoEmail.type(emailTeste);
  CadastroPage.campoSenha.type(senhaTeste);
  CadastroPage.campoConfirmarSenha.type(senhaTeste);
  CadastroPage.botaoCadastrar.click();
});
 it('Deve permitir o cadastro com código do aluno válido', () => {

  const emailTeste = `teste.${Date.now()}@teste.com`;
  const senhaTeste = Cypress.env('USER_PASSWORD');

  CadastroPage.campoNome.type('Usuário Teste QA');
  CadastroPage.campoEmail.type(emailTeste);
  CadastroPage.campoSenha.type(senhaTeste);
  CadastroPage.campoConfirmarSenha.type(senhaTeste);
  CadastroPage.campoCodigoAluno.type('ALUNOQAZANDOQA');
  CadastroPage.botaoCadastrar.click();
});

});