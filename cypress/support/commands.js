Cypress.Commands.add('addTransaction', (text, amount) => { 
    cy.get('[data-selector="text"]').type(text);
    cy.get('[data-selector="amount"]').type(amount);
    cy.get('[data-selector="add-transaction"]').click();
    cy.get('[data-selector="history"]').get('li:last > button').then(result => {
        const id = result.get(0).dataset.selector.replace('remove-transaction-', '')
        return id
    })
});

Cypress.Commands.add('checkTransactionCount', count => {
    cy.get('[data-selector="history"]').find('li').should('have.length', count);
    cy.exec("node cypress/e2e/getCounts.mjs").then(result => {
        expect(JSON.parse(result.stdout).length).to.eq(count);
    });
});

Cypress.Commands.add('removeTransaction', id => {
    cy.get(`[data-selector="remove-transaction-${id}"]`).click()
});

Cypress.Commands.add('checkTotals', (income, expense) => {
    // check totals from json db
    const balance = income + expense;
    cy.exec("poetry run utilities get-totals").then(result => {
        const data = JSON.parse(result.stdout);
        expect(balance).to.eq(data.income + data.expense);
        expect(income).to.eq(data.income);
        expect(expense).to.eq(data.expense);
    });

    // check totals in UI
    cy.get('[data-selector="balance"]').contains(balance);
    cy.get('[data-selector="income"]').contains(income);
    cy.get('[data-selector="expense"]').contains(Math.abs(expense));
});