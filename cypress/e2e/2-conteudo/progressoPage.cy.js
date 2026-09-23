import LoginPage from '../../support/pages/loginPage';
import ProgressoPage from '../../support/pages/progressoPage';

const telas = [
    { dispositivo: 'Desktop', largura: 1280, altura: 720 },
    { dispositivo: 'Tablet', largura: 768, altura: 1024 },
    //{ dispositivo: 'Mobile', largura: 375, altura: 667 } 
];

telas.forEach((tela) => {
    describe(`Conteúdos e Progresso - SCRUM-8 - ${tela.dispositivo}`, () => {

        beforeEach(() => {
            cy.viewport(tela.largura, tela.altura);
            cy.visit('https://certiqa.qazando.com.br/login');

            LoginPage.preencherLogin(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));
            LoginPage.validarRedirecionamentoParaPainel();

            // Usa o Page Object para navegar até à fase inicial
            ProgressoPage.acessarFase1();
        });

        it(`[CT-001] Acessar conteúdos da fase e navegar entre eles - ${tela.dispositivo}`, () => {
            ProgressoPage.validarCarregamentoInicialFase();
            
            ProgressoPage.elementos.btnConteudo1().click();
            ProgressoPage.validarCarregamentoInicialFase(); // Revalida após abrir conteúdo
            
            ProgressoPage.elementos.btnVoltarDaFase().click();
            ProgressoPage.elementos.btnConteudo1().click();
        });

        it(`[CT-002] Concluir um conteúdo e validar a atualização do progresso - ${tela.dispositivo}`, () => {
            // Mocks
            cy.intercept('POST', '**/rest/v1/quiz_results*', { statusCode: 201, body: [{ id: 'mock-quiz-id' }] }).as('mockSaveQuiz');
            cy.intercept('POST', '**/rest/v1/completed_phases*', { statusCode: 201, body: [{ id: 'mock-phase-id' }] }).as('mockSavePhase');
            cy.intercept('PATCH', '**/rest/v1/user_progress*', { statusCode: 200, body: [{ id: 'mock-progress-id' }] }).as('mockUpdateProgress');

            // Captura o progresso inicial
            ProgressoPage.elementos.indicadorProgresso({ timeout: 10000 })
                .should('be.visible')
                .invoke('text')
                .then((textoInicial) => {
                    const progressoInicial = textoInicial.trim();

                    // Executa o quiz usando o método que encapsula todos os cliques
                    ProgressoPage.elementos.btnConteudo4().click();
                    ProgressoPage.responderQuizCompleto();
                    
                    cy.wait('@mockSaveQuiz');

                    // Valida que o progresso mudou
                    ProgressoPage.elementos.indicadorProgresso({ timeout: 15000 })
                        .should('be.visible')
                        .invoke('text')
                        .should((textoFinal) => {
                            expect(textoFinal.trim()).not.to.eq(progressoInicial);
                        });
                });
        });

        it(`[CT-005] Persistência do progresso após recarregar a página (F5) - ${tela.dispositivo}`, () => {
            ProgressoPage.elementos.btnConteudo1().click();
            ProgressoPage.elementos.tagFaseConcluida({ timeout: 10000 }).should('be.visible');
            
            cy.reload();
            
            ProgressoPage.elementos.tagFaseConcluida({ timeout: 15000 }).should('be.visible');
        });

        it(`[CT-008] Validar bloqueio de rota via URL para fases não desbloqueadas - ${tela.dispositivo}`, () => {
            cy.visit('https://certiqa.qazando.com.br/certificacoes/ctfl/fase/test-management');
            
            cy.url({ timeout: 10000 }).should('not.include', '/fase/test-management');
            cy.url().should('include', '/certificacoes/ctfl');
            cy.contains(/Complete a fase anterior para desbloquear esta fase./i, { timeout: 10000 })
                .should('be.visible');
        });

        it(`[CT-009] Validar navegação redundante para a fase em andamento - ${tela.dispositivo}`, () => {
            ProgressoPage.elementos.btnContinuarFase1().should('be.visible').click();
            ProgressoPage.elementos.btnVoltarDaFase().should('be.visible').click();
            ProgressoPage.elementos.btnProximaFaseRodape().should('be.visible').click();
            
            // Valida que voltou corretamente para a fase
            ProgressoPage.validarCarregamentoInicialFase();
        });

    });
});