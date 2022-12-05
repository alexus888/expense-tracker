## Expense Tracker

Keep track of income and expenses. Add and remove items and save to JSON server "database".

## Environment Setup

1. Install `poetry` using `pipx` if you do not already have it.
1. Run `npm i && poetry install`.
1. In three separate terminals, start the following processes:
```
npm run serve-db # toy json server
npm run serve-ui # dev ui
npm run test-e2e # headless e2e tests
```
1. If you want to watch the tests in the test runner, run `npx cypress open` instead.

## Project Specifications

- Create UI for project
- Display transaction items in DOM
- Show balance, expense and income totals
- Add new transation and reflect in total
- Delete items from DOM
- Persist items in JSON server "database"
