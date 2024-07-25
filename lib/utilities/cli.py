import click
import json
from pathlib import Path


ROOT_DIR = Path(__file__).parents[2]
JSON_DB = ROOT_DIR / "db.json"


@click.group
def main() -> None:
    ...


@main.command
def get_totals():
    transactions = get_transactions()
    balance = sum([t.get("amount") for t in transactions])
    income = sum([t.get("amount") for t in transactions if t.get("amount") > 0])
    expense = sum([t.get("amount") for t in transactions if t.get("amount") < 0])
    count = len(transactions)
    click.echo(
        json.dumps(
            {"balance": balance, "income": income, "expense": expense, "count": count}
        )
    )


@main.command
def clean_db():
    with open(JSON_DB, "w") as file:
        json.dump({"transactions": []}, file)


def get_transactions():
    with open(JSON_DB, "r") as file:
        transactions = json.loads(file.read()).get("transactions")
        return transactions


if __name__ == "__main__":
    main()
