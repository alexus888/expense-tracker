import pytest
from playwright.sync_api import expect


class TestExpenseTracker:
    @pytest.mark.it("...can add transactions and save them in a history.")
    def test_0(self, expense_tracker):
        expense_tracker.add_transaction("Aviation", -12)
        expense_tracker.add_transaction("Gin and Tonic", -10)

        expect(expense_tracker.history).to_have_count(2)
        expect(expense_tracker.income).to_have_text("$0.00")
        expect(expense_tracker.expense).to_have_text("$22.00")
        expect(expense_tracker.balance).to_have_text("$-22.00")

        expense_tracker.add_transaction("Paycheck", 1000)

        expect(expense_tracker.history).to_have_count(3)
        expect(expense_tracker.income).to_have_text("$1000.00")
        expect(expense_tracker.expense).to_have_text("$22.00")
        expect(expense_tracker.balance).to_have_text("$978.00")


"""
Cypress.Commands.add('checkTransactionCount', count => {
    cy.exec("poetry run utilities get-totals").then(result => {
        expect(JSON.parse(result.stdout).count).to.eq(count);
    });
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

Cypress.Commands.add('removeTransaction', id => {
    cy.get(`[data-selector="remove-transaction-${id}"]`).click()
});

});
"""
