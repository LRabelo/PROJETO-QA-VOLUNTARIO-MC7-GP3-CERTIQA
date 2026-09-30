import LoginPage from '../../support/pages/loginPage';
import ProgressoPage from '../../support/pages/progressoPage';
import ExamesFasesPage from '../../support/pages/exames_fasesPage';

const telas = [
    { dispositivo: 'Desktop', largura: 1280, altura: 720 },
    { dispositivo: 'Tablet', largura: 768, altura: 1024 }
    //{ dispositivo: 'Mobile', largura: 375, altura: 667 }
];

telas.forEach((tela) => {
    describe(`Execução do Quiz - SCRUM-9 - ${tela.dispositivo}`, () => {

        beforeEach(() => {
            cy.viewport(tela.largura, tela.altura);
            cy.visit('/login');

            LoginPage.preencherLogin(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));
            LoginPage.validarRedirecionamentoParaPainel();
            
            // Acesso inicial
            ProgressoPage.acessarFase1();
            ProgressoPage.elementos.btnConteudo4().click();

            cy.intercept('GET', '**/rest/v1/quizzes*', (req) => {
                req.continue((res) => {
                    if (Cypress.currentTest.title.includes('CT-004')) {
                        if (res.body && !Array.isArray(res.body)) {
                            const tempoOriginal = res.body.time_limit;
                            res.body.time_limit = tempoOriginal > 60 ? 6 : 0.1;
                        }
                    }
                });
            }).as('dadosDoQuiz');
        });

        it(`[CT-001] Iniciar o quiz da fase - ${tela.dispositivo}`, () => {
            ExamesFasesPage.iniciarQuiz();
            ExamesFasesPage.validarQuestaoVisivel(1);
            ExamesFasesPage.validarRelogio();
            ExamesFasesPage.validarProgresso('10%');
        });

        it(`[CT-003] Abandono do Quiz antes da conclusão - ${tela.dispositivo}`, () => {
            ExamesFasesPage.iniciarQuiz();
            ExamesFasesPage.validarQuestaoVisivel(1);
            ExamesFasesPage.sairDoQuiz();
            
            cy.url().should('not.include', '/execucao-quiz');
            ExamesFasesPage.elementos.btnIniciarQuiz().should('be.visible');
        });

        it(`[CT-004] Submissão automática do Quiz por tempo esgotado (Time out) - ${tela.dispositivo}`, () => {
            cy.wait('@dadosDoQuiz');
            ExamesFasesPage.iniciarQuiz();
            ExamesFasesPage.validarQuestaoVisivel(1);
            
            cy.wait(7000);
            
            ExamesFasesPage.validarTelaTimeout();
        });

        it(`[CT-005] Validar interrupção do quiz ao recarregar a página (F5/Refresh) - ${tela.dispositivo}`, () => {
            ExamesFasesPage.iniciarQuiz();
            ExamesFasesPage.validarQuestaoVisivel(1);
            ExamesFasesPage.responderPrimeiraAlternativa();
            ExamesFasesPage.clicarProxima();
            
            ExamesFasesPage.validarQuestaoVisivel(2);
            ExamesFasesPage.responderPrimeiraAlternativa();
            ExamesFasesPage.clicarProxima();
            
            ExamesFasesPage.validarQuestaoVisivel(3);
            
            cy.reload();
            cy.url().should('not.include', '/execucao-quiz');
            ExamesFasesPage.elementos.btnIniciarQuiz().should('be.visible');
        });

    });
});