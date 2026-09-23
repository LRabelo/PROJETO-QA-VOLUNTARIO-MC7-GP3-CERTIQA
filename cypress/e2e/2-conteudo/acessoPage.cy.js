import LoginPage from '../../support/pages/loginPage'; 
import acessoPage from '../../support/pages/acessoPage'; 

const telas = [
  { dispositivo: 'Desktop', largura: 1280, altura: 720 },
  { dispositivo: 'Tablet', largura: 768, altura: 1024 },
  //{ dispositivo: 'Mobile', largura: 375, altura: 667 }
];

telas.forEach((tela) => {
  describe(`Vitrine de Certificações - SCRUM-7 - ${tela.dispositivo}`, () => {

    beforeEach(() => {
      cy.viewport(tela.largura, tela.altura);
      cy.visit('https://certiqa.qazando.com.br/login');

      LoginPage.preencherLogin(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));
      LoginPage.validarRedirecionamentoParaPainel();
    });

    it(`[CT-001] Visualizar listagem de certificações disponíveis - ${tela.dispositivo}`, () => {
      acessoPage.acessarVitrineViaMenu();
      
      cy.url().should('include', '/certificacoes');
      acessoPage.elementos.tituloVitrine().should('contain', 'Certificações Disponíveis');
    });

    it(`[CT-002] Selecionar e acessar uma certificação específica (CTFL) - ${tela.dispositivo}`, () => {
      acessoPage.acessarVitrineViaMenu();
      acessoPage.selecionarCertificacaoCTFL();
      
      cy.url().should('include', '/certificacoes/ctfl');
    });

    it(`[CT-006] Validar redirecionamento para login ao acessar "Certificações" via menu - ${tela.dispositivo}`, () => {
      acessoPage.forcarLogout();
      cy.visit('https://certiqa.qazando.com.br/');
      
      acessoPage.acessarVitrineViaTexto();
      
      cy.url({ timeout: 10000 }).should('include', '/login');
      acessoPage.elementos.textoFormularioLogin({ timeout: 10000 }).should('be.visible');
    });

    // TODO: Remover o .skip quando o BUG-47 (Tela branca) for corrigido na SCRUM-7
    it.skip(`[CT-007] Validar proteção de rota da Vitrine via acesso direto pela URL - ${tela.dispositivo}`, () => {
      acessoPage.forcarLogout();
      
      cy.visit('https://certiqa.qazando.com.br/certificacoes');
      
      cy.url({ timeout: 10000 }).should('include', '/login');
      cy.url().should('not.include', '/certificacoes');
      acessoPage.elementos.textoFormularioLogin({ timeout: 10000 }).should('be.visible');
    });
        
  });
});