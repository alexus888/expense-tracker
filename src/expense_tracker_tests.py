import pytest
from playwright.sync_api import expect


class TestExpenseTracker:
    @pytest.mark.it("...has the title `Expense Tracker`")
    def test_0(self, expense_tracker):
        expect(expense_tracker.page).to_have_title("Expense Tracker")

    @pytest.mark.it("...can add transactions and save them in a history.")
    def test_1(self, expense_tracker):
        expense_tracker.add_transaction("Aviation", 12)
        expense_tracker.add_transaction("Gin and Tonic", 10)
        expect(expense_tracker.history).to_have_count(2)


"""
Cypress.Commands.add('addTransaction', (text, amount) => { 
    })
});

Cypress.Commands.add('checkTransactionCount', count => {
    cy.get('[data-selector="history"]').find('li').should('have.length', count);
    cy.exec("poetry run utilities get-totals").then(result => {
        expect(JSON.parse(result.stdout).count).to.eq(count);
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

    # Click the get started link.
    # page.get_by_role("link", name="Get started").click()

    # Expects page to have a heading with the name of Installation.
    # expect(page.get_by_role("heading", name="Installation")).to_be_visible()
"""
