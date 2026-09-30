class ExamesFasesPage {
    elementos = {
        btnIniciarQuiz: () => cy.contains('button', /iniciar quiz|refazer quiz/i, { matchCase: false }),
        btnSairQuiz: () => cy.contains('button', /sair do quiz/i, { matchCase: false }),
        btnProxima: () => cy.contains('button', /próxima/i, { matchCase: false }),
        relogio: () => cy.get('.mb-4 > .flex'),
        textoProgresso: () => cy.get('.space-y-2 > .flex > :nth-child(2)'),
        opcoesResposta: () => cy.get('input[type="radio"]'),
        telaResultado: () => cy.get('.resultado-quiz, .space-y-4'),
        textoPontuacaoZero: () => cy.contains(/0\/10/i),
        textoNaoRespondeu: () => cy.contains('Você não respondeu esta questão', { matchCase: false })
    }

    iniciarQuiz() {
        this.elementos.btnIniciarQuiz().scrollIntoView().should('be.visible').click();
    }

    sairDoQuiz() {
        this.elementos.btnSairQuiz().should('be.visible').click();
    }

    validarQuestaoVisivel(numeroQuestao) {
        cy.contains(new RegExp(`questão ${numeroQuestao}`, 'i'), { matchCase: false, timeout: 10000 }).should('be.visible');
    }

    validarRelogio() {
        this.elementos.relogio().should('be.visible').and('contain.text', ':');
    }

    validarProgresso(porcentagem) {
        this.elementos.textoProgresso().should('contain.text', porcentagem);
    }

    responderPrimeiraAlternativa() {
        this.elementos.opcoesResposta().first().click({ force: true });
    }

    clicarProxima() {
        this.elementos.btnProxima().click();
    }

    validarTelaTimeout() {
        this.elementos.telaResultado({ timeout: 15000 }).should('be.visible');
        this.elementos.textoPontuacaoZero().should('be.visible');
        this.elementos.textoNaoRespondeu().should('be.visible');
    }
}

export default new ExamesFasesPage();