class LoginPage {
  get campoEmail() { return cy.get('#email'); }
  get campoSenha() { return cy.get('#password'); }
  get botaoEntrar() { return cy.get('.inline-flex'); }
  get painelAluno() { return cy.get('.flex-grow > .container'); }
  get mensagemSucesso() { return cy.get('.group'); }

  preencherLogin(email, senha) {
    this.campoEmail.type(email, { log: false });
    this.campoSenha.type(senha, { log: false });
    this.botaoEntrar.click();
  }

  validarRedirecionamentoParaPainel() {
    this.painelAluno.should('contain.text', 'Meu Painel');
    this.mensagemSucesso.should('contain.text', 'Login bem-sucedido');
  }
  
}

export default new LoginPage();