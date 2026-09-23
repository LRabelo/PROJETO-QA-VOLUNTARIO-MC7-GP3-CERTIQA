import LoginPage from '../../support/pages/loginPage';

const telas = [
  { dispositivo: 'Desktop', largura: 1280, altura: 720 },
  { dispositivo: 'Tablet', largura: 768, altura: 1024 },
  { dispositivo: 'Mobile', largura: 375, altura: 667 }
];

telas.forEach((tela) => {
  describe(`Login - SCRUM-6 - ${tela.dispositivo}`, () => {
    beforeEach(() => {
      cy.viewport(tela.largura, tela.altura);
      cy.visit('/login');
    });

    it(`[CT-000] Deve realizar o login com sucesso usando credenciais seguras - ${tela.dispositivo}`, () => { 
      LoginPage.preencherLogin(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));
      LoginPage.validarRedirecionamentoParaPainel();
    });

  });
});