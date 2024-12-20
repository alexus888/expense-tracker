## Expense Tracker

I took a toy vanilla JavaScript app (made by YouTuber Traversy Media) and gave it API calls,
a "backend", and E2E tests. The app keeps track of income and expenses. Add and remove items and
save to JSON server "database".

## Environment Setup

1. Install `poetry` using `pipx` if you do not already have it.
1. Run the following commands to install dependencies:
```bash
npm i
poetry install
poetry run playwright install
```
1. In two separate terminals, start the `db` and `dev` processes:
```bash
npm run db  # toy json server
npm run dev  # hot reload dev server
```
1. Run the tests either in the Cypress UI or headlessly:
```bash
npm run test-e2e  # headless e2e tests
npx cypress open  # start the Cypress ui
pytest            # run playwright-python tests
```


## Project Specifications

- Create UI for project
- Display transaction items in DOM
- Show balance, expense and income totals
- Add new transaction and reflect in total
- Delete items from DOM
- Persist items in JSON server "database"
