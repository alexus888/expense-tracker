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

  afterEach(() => {
    cy.exec("node cypress/e2e/tearDown.mjs");
  });
});
