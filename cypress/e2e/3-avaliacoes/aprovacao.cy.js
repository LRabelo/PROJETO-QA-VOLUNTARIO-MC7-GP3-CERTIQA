import LoginPage from '../../support/pages/LoginPage';
import ProgressoPage from '../../support/pages/ProgressoPage';
import AprovacaoPage from '../../support/pages/aprovacaoPage';

const telas = [
    { dispositivo: 'Desktop', largura: 1280, altura: 720 },
    { dispositivo: 'Tablet', largura: 768, altura: 1024 }
    //{ dispositivo: 'Mobile', largura: 375, altura: 667 }
];

telas.forEach((tela) => {
    describe(`Resultados e Progresso - SCRUM-10 - ${tela.dispositivo}`, () => {

        beforeEach(() => {
            cy.viewport(tela.largura, tela.altura);
            cy.visit('https://certiqa.qazando.com.br/login');

            LoginPage.preencherLogin(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));
            LoginPage.validarRedirecionamentoParaPainel();
        });

        it(`[CT-001] Reprovação no Quiz e [CT-004] Toast de incentivo - ${tela.dispositivo}`, () => {
            ProgressoPage.acessarFase1();
            ProgressoPage.elementos.btnConteudo4().click();

            AprovacaoPage.iniciarQuiz();
            AprovacaoPage.responderQuizAutomatizado(false); // Força reprovação
            
            AprovacaoPage.validarTelaResultado();
            AprovacaoPage.voltarParaFase();
            
            // Validações pós-falha
            AprovacaoPage.elementos.toastReprovacao().should('be.visible');
            AprovacaoPage.elementos.btnTentarNovamente().should('be.visible');
            
            AprovacaoPage.voltarParaCertificacao();
            AprovacaoPage.elementos.btnContinuarEstudo().should('not.exist');
        });

        it(`[CT-003 & CT-006] Aprovação no Quiz e [CT-006] Toast de sucesso - ${tela.dispositivo}`, () => {
            ProgressoPage.acessarFase1();

            // Clica na última aba de conteúdo da Fase 1 (onde fica o Quiz)
            cy.get('.flex > button').last().click();
            cy.get(':nth-child(1) > .flex.pt-0 > .inline-flex').scrollIntoView().click();
            cy.get('.text-primary-foreground').should('be.visible', { timeout: 15000 }).click();

            AprovacaoPage.responderQuizCompletoManual(); // Responde na mão garantindo nota 10
            
            AprovacaoPage.validarTelaResultado();
            AprovacaoPage.voltarParaFase();

            // Validações pós-sucesso
            AprovacaoPage.elementos.toastSucesso().should('be.visible');
            AprovacaoPage.elementos.tagFaseConcluida().should('be.visible');

            AprovacaoPage.voltarParaCertificacao();
        });

        it(`[CT-005] Conclusão da última fase e liberação do Simulado Final - ${tela.dispositivo}`, () => {
            // MOCK: Intercepta a requisição para fingir que 5 fases estão concluídas
            cy.intercept('GET', '**/rest/v1/user_progress*', (req) => {
                req.continue((res) => {
                    if (res.body && Array.isArray(res.body) && res.body.length > 0) {
                        res.body[0].completed_phases = ['fase-1', 'fase-2', 'fase-3', 'fase-4', 'fase-5'];
                    }
                });
            }).as('mockProgresso');

            ProgressoPage.acessarFase1();
            
            // Acessa a certificação
            cy.contains('.card-certificacao, .text-3xl', 'CTFL').click();
            cy.wait('@mockProgresso');

            // Acessa diretamente a Fase 6
            cy.get(':nth-child(6) > .flex.pt-0 > .inline-flex').click();
            cy.get('.flex > button').last().click();
            
            AprovacaoPage.iniciarQuiz();
            AprovacaoPage.responderQuizCompletoManual(); // Aprova na Fase 6
            
            AprovacaoPage.voltarParaFase();
            AprovacaoPage.voltarParaCertificacao();

            // Validações da tela de Simulado (Tudo contido no Page Object)
            AprovacaoPage.validarConclusaoTotalCertificacao();
        });
    });
});