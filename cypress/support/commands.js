Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://certiqa.qazando.com.br/',
    body: {
      email,
      password
    }
  });
});