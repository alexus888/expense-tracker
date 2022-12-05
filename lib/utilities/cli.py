import click
import json
from os.path import dirname, join


@click.group
def main() -> None:
    ...


@main.command
def get_totals():
    transactions = get_transactions()
    balance = sum([t.get("amount") for t in transactions])
    income = sum([t.get("amount") for t in transactions if t.get("amount") > 0])
    expense = sum([t.get("amount") for t in transactions if t.get("amount") < 0])
    click.echo(json.dumps({"balance": balance, "income": income, "expense": expense}))


@main.command
def clean_db():
    json_db_path = dirname(dirname(dirname(__file__)))  # TODO make this less janky
    with open(join(json_db_path, "db.json"), "w") as file:
        json.dump({"transactions": []}, file)


def get_transactions():
    json_db_path = dirname(dirname(dirname(__file__)))  # TODO make this less janky
    with open(join(json_db_path, "db.json"), "r") as file:
        transactions = json.loads(file.read()).get("transactions")
        return transactions


if __name__ == "__main__":
    main()