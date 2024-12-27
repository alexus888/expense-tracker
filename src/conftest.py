import json
import pytest
from os import getenv
from playwright.sync_api import Page
import utilities
from importlib import resources


JSON_DB = resources.files(utilities).parents[1] / "db.json"  # type: ignore
URL = f"http://localhost:{getenv("APP_PORT", "8080")}"


class ExpenseTracker:
    def __init__(self, page: Page):
        self.page = page

    def add_transaction(self, text: str, amount: int):
        self.page.locator('[data-selector="text"]').fill(text)
        self.page.locator('[data-selector="amount"]').fill(str(amount))
        self.page.locator('[data-selector="add-transaction"]').click()

    @property
    def history(self):
        return self.page.locator("ul > li")


@pytest.fixture
def expense_tracker(page: Page):
    page.goto(URL)
    yield ExpenseTracker(page)
    page.close()
    file = open(JSON_DB, "w")
    json.dump({"transactions": []}, file)
    file.close()
