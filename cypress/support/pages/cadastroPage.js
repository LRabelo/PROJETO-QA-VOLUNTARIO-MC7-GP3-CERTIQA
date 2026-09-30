class CadastroPage {
  get campoNome() {
    return cy.get('input[name="name"]');
  }

  get campoEmail() {
    return cy.get('#email');
  }

  get campoSenha() {
    return cy.get('#password');
  }

  get campoConfirmarSenha() {
    return cy.get('#confirmPassword');
  }

  get campoCodigoAluno() {
    return cy.get('#studentCode');
  }

  get botaoCadastrar() {
    return cy.contains('button', 'Cadastrar');
  }
}

export default new CadastroPage();