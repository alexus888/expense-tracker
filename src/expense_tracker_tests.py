import json
import pytest
from os import getenv
from pathlib import Path
from playwright.sync_api import Page, expect

# NOTE: this is a hacky way to get the filepath for db.json
ROOT_DIR = Path(__file__).parents[1]
JSON_DB = ROOT_DIR / "db.json"

URL = f"http://localhost:{getenv("APP_PORT", "8080")}"


@pytest.fixture(scope="function", autouse=True)
def clean_up_database():
    yield
    file = open(JSON_DB, "w")
    json.dump({"transactions": []}, file)
    file.close()


@pytest.fixture
def expense_tracker(page: Page):
    page.goto(URL)

    class _ExpenseTracker:
        def __init__(self, page: Page):
            self.page = page

        def add_transaction(self, text: str, amount: int):
            self.page.locator('[data-selector="text"]').fill(text)
            self.page.locator('[data-selector="amount"]').fill(str(amount))
            self.page.locator('[data-selector="add-transaction"]').click()

        @property
        def history(self):
            return self.page.locator("ul > li")

    yield _ExpenseTracker(page)

    page.close()


class TestExpenseTracker:
    @pytest.mark.it("...has the title `Expense Tracker`")
    def test_0(self, expense_tracker):
        expect(expense_tracker.page).to_have_title("Expense Tracker")

    @pytest.mark.it("...can add transactions and save them in a history.")
    def test_1(self, expense_tracker):
        expense_tracker.add_transaction("Aviation", 12)
        expense_tracker.add_transaction("Gin and Tonic", 10)
        assert expense_tracker.history.count() == 2


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
