class AprovacaoPage {
    elementos = {
        btnIniciarQuiz: () => cy.contains('button', /iniciar quiz|refazer quiz/i, { matchCase: false }),
        btnVoltarParaFase: () => cy.contains('button', /voltar para a fase/i, { matchCase: false }),
        btnVoltarCertificacao: () => cy.contains('a, button', /voltar para certificação/i, { matchCase: false }),
        btnTentarNovamente: () => cy.contains('button', /tentar novamente|refazer/i, { matchCase: false }),
        btnContinuarEstudo: () => cy.contains('button', /continuar estudo/i, { matchCase: false }),
        telaResultado: () => cy.get('.resultado-quiz, .space-y-4'),
        
        // Toasts e Tags
        toastReprovacao: () => cy.contains('Você precisa de pelo menos 60% para passar', { matchCase: false }),
        toastSucesso: () => cy.contains('Você completou a fase com 10/10 pontos', { matchCase: false }),
        tagFaseConcluida: () => cy.contains(/✓ fase concluída/i, { matchCase: false }),
        
        // Conclusão (Simulado)
        progressoGeral100: () => cy.get('.pt-0 > .grid > :nth-child(1) > .flex > .text-sm'),
        contadorFases6: () => cy.contains(/6 de 6/i, { matchCase: false }),
        tagStatusConclusao: () => cy.contains(/Pronto para Exame Final|Concluído/i, { matchCase: false }),
        bannerParabens: () => cy.contains(/Parabéns! Todas as fases completas|Simulado Final Concluído!/i, { matchCase: false }),
        btnIniciarSimulado: () => cy.contains('a, button', /Iniciar Simulado Final|Revisar Simulado/i, { matchCase: false })
    }

    iniciarQuiz() {
        this.elementos.btnIniciarQuiz().scrollIntoView().should('be.visible').click();
    }

    voltarParaFase() {
        this.elementos.btnVoltarParaFase().scrollIntoView().click();
        cy.wait(1000); // Aguarda renderização do toast
    }

    voltarParaCertificacao() {
        this.elementos.btnVoltarCertificacao().click();
    }

    validarTelaResultado() {
        this.elementos.telaResultado({ timeout: 15000 }).should('be.visible');
    }

    // Método para o teste de reprovação (CT-001)
    responderQuizAutomatizado(aprovado) {
        for (let i = 1; i <= 10; i++) {
            cy.contains(new RegExp(`questão ${i}`, 'i'), { timeout: 10000 }).should('be.visible');

            if (aprovado) {
                cy.get('input[type="radio"]').first().click({ force: true });
            } else {
                cy.get('input[type="radio"]').last().click({ force: true });
            }

            if (i < 10) {
                cy.contains('button', /próxima/i, { matchCase: false }).click();
            } else {
                cy.contains('button', /finalizar/i, { matchCase: false }).should('contain.text', '10/10').click();
            }
        }
    }

    // Método com a sequência exata de cliques ancorados para aprovação (CT-003 e CT-005)
    responderQuizCompletoManual() {
        // Questão 1
        cy.contains(/questão 1/i, { matchCase: false, timeout: 10000 }).should('be.visible');
        cy.get(':nth-child(3) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();

        // Questão 2
        cy.contains(/questão 2/i, { matchCase: false, timeout: 10000 }).should('be.visible');
        cy.get('.space-y-2 > :nth-child(2) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();

        // Questão 3
        cy.contains(/questão 3/i, { matchCase: false, timeout: 10000 }).should('be.visible');
        cy.get(':nth-child(3) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();

        // Questão 4
        cy.contains(/questão 4/i, { matchCase: false, timeout: 10000 }).should('be.visible');
        cy.get('.space-y-2 > :nth-child(2) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();

        // Questão 5
        cy.contains(/questão 5/i, { matchCase: false, timeout: 10000 }).should('be.visible');
        cy.get('.space-y-2 > :nth-child(2) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();

        // Questão 6
        cy.contains(/questão 6/i, { matchCase: false, timeout: 10000 }).should('be.visible');
        cy.get('.space-y-2 > :nth-child(1) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();

        // Questão 7
        cy.contains(/questão 7/i, { matchCase: false, timeout: 10000 }).should('be.visible');
        cy.get('.space-y-2 > :nth-child(2) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();

        // Questão 8
        cy.contains(/questão 8/i, { matchCase: false, timeout: 10000 }).should('be.visible');
        cy.get('.space-y-2 > :nth-child(2) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();

        // Questão 9
        cy.contains(/questão 9/i, { matchCase: false, timeout: 10000 }).should('be.visible');
        cy.get('.space-y-2 > :nth-child(2) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();

        // Questão 10
        cy.contains(/questão 10/i, { matchCase: false, timeout: 10000 }).should('be.visible');
        cy.get(':nth-child(3) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click(); // Finalizar
    }

    validarConclusaoTotalCertificacao() {
        this.elementos.progressoGeral100().should('contain.text', '100%');
        this.elementos.contadorFases6().should('be.visible');
        this.elementos.tagStatusConclusao().should('be.visible');
        this.elementos.bannerParabens().scrollIntoView().should('be.visible');
        this.elementos.btnIniciarSimulado().scrollIntoView().should('be.visible');
    }
}

export default new AprovacaoPage();