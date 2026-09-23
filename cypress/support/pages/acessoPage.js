class acessoPage {
    elementos = {
        menuCertificacoesIcone: () => cy.get('.hidden > [href="/certificacoes"]'),
        menuCertificacoesTexto: () => cy.contains('Certificações', { matchCase: false }),
        
        tituloVitrine: () => cy.get('h1'),
        btnAcessarCTFL: () => cy.get('.grid > :nth-child(1) > .flex.items-center > .inline-flex'),
        
        textoFormularioLogin: () => cy.contains(/acesse sua conta|login/i)
    }

    acessarVitrineViaMenu() {
        this.elementos.menuCertificacoesIcone().should('be.visible').click();
    }

    acessarVitrineViaTexto() {
        this.elementos.menuCertificacoesTexto({ timeout: 10000 }).should('be.visible').click();
    }

    selecionarCertificacaoCTFL() {
        this.elementos.btnAcessarCTFL().should('be.visible').click();
    }

    forcarLogout() {
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.clearCookies();
    }
}

export default new acessoPage();