describe('Expense Tracker', () => {
  beforeEach(() => {
      cy.visit('http://localhost:8080')
  });

  it('allows a user to add some text and an amount and save it as a transaction', () => {
    // act  
    cy.addTransaction("rum and coke", "-3");

    // assert
    cy.checkTransactionCount(1);
  });

  it('allows a user to save multiple transactions', () => {
    // act  
    cy.addTransaction("rum and coke", "-3");
    cy.addTransaction("whiskey sour", "-3");
    cy.addTransaction("direct deposit", "1000");

    // assert
    cy.checkTransactionCount(3);
  });

  it('allows a user to delete transactions from the history', () => {
    // arrange  
    cy.addTransaction("direct deposit", "1000");
    cy.addTransaction("long island", "-5").then(id => cy.wrap(id).as('longIslandId'));
    cy.addTransaction("rum and coke", "-3").then(id => cy.wrap(id).as('rumAndCokeId'));
    cy.addTransaction("whiskey sour", "-3");
    cy.checkTransactionCount(4);

    // act 1
    cy.get('@rumAndCokeId').then(id => {
      cy.removeTransaction(id);
    });
    
    // assert 1
    cy.checkTransactionCount(3);
    cy.get('[data-selector="history"]').contains('rum and coke').should('not.exist');

    // act 2
    cy.get('@longIslandId').then(id => {
      cy.removeTransaction(id);
    });

    // assert 2
    cy.checkTransactionCount(2);
    cy.get('[data-selector="history"]').contains('long island').should('not.exist');
  });

  afterEach(() => {
    cy.exec("node cypress/e2e/tearDown.mjs");
  });
});