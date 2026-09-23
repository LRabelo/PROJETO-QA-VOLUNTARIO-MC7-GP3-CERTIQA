class ProgressoPage {
    elementos = {
        menuCertificacoes: () => cy.get('.hidden > [href="/certificacoes"]'),
        cardCertificacao: () => cy.get('.text-3xl.font-bold.text-primary.mb-2'),
        btnContinuarFase1: () => cy.get('.grid > :nth-child(1) > .flex.items-center > .inline-flex'),
        btnVoltarDaFase: () => cy.get('.sm\\:flex-row > .border'),
        btnProximaFaseRodape: () => cy.get('.space-y-4 > .inline-flex'),
        
        tituloFase: () => cy.get('.text-3xl'),
        subtituloFase: () => cy.get('.flex-col > .text-2xl'),
        indicadorProgresso: () => cy.get('.pt-0 > .grid > :nth-child(1) > .flex > .text-sm'),
        tagFaseConcluida: () => cy.contains('.inline-flex', 'Fase concluída', { matchCase: false }),
        
        btnConteudo1: () => cy.get(':nth-child(1) > .flex.pt-0 > .inline-flex'),
        btnConteudo4: () => cy.get(':nth-child(4) > .flex.pt-0 > .inline-flex'),
        btnIniciarQuiz: () => cy.get('.text-primary-foreground'),
        btnFinalizarQuiz: () => cy.get('.pt-4 > .border'),
        tituloFinalQuiz: () => cy.get('.space-y-4 > .text-xl')
    }

    acessarFase1() {
        this.elementos.menuCertificacoes().should('be.visible').click();
        this.elementos.cardCertificacao().should('be.visible').click();
        this.elementos.btnContinuarFase1().should('be.visible').click();
    }

    validarCarregamentoInicialFase() {
        this.elementos.tituloFase().should('be.visible');
        this.elementos.subtituloFase().should('be.visible');
    }

    responderQuizCompleto() {
        this.elementos.btnIniciarQuiz().should('be.visible', { timeout: 15000 }).click();
        
        cy.get('.space-y-2 > :nth-child(3) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();
        
        cy.get('.space-y-2 > :nth-child(2) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();
        
        cy.get('.space-y-2 > :nth-child(2) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();
        
        cy.get('.space-y-2 > :nth-child(1) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();
        
        cy.get('.space-y-2 > :nth-child(2) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();
        
        cy.get('.space-y-2 > :nth-child(1) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();
        
        cy.get('.space-y-2 > :nth-child(2) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();
        
        cy.get('.space-y-2 > :nth-child(1) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();
        
        cy.get('.space-y-2 > :nth-child(1) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();
        
        cy.get('.space-y-2 > :nth-child(2) > .flex > span').should('be.visible').click();
        cy.get(':nth-child(2) > .flex > .bg-primary').click();

        this.elementos.tituloFinalQuiz({ timeout: 10000 }).should('be.visible');
        this.elementos.btnFinalizarQuiz().click();
        this.elementos.btnVoltarDaFase().click();
    }
}

export default new ProgressoPage();