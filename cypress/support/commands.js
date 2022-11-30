// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add('addTransaction', (text, amount) => { 
    cy.get('[data-selector="text"]').type(text);
    cy.get('[data-selector="amount"]').type(amount);
    cy.get('[data-selector="add-transaction"]').click();
});

Cypress.Commands.add('checkTransactionCount', count => {
    cy.get('[data-selector="history"]').find('li').should('have.length', count);
    cy.exec("node cypress/e2e/getCounts.mjs").then(result => {
        expect(JSON.parse(result.stdout).length).to.eq(count);
    });
});


//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })