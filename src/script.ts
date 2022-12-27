import './style.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


type Transaction = {
    readonly id: string,
    readonly text: string,
    readonly amount: number,
}


axios.defaults.baseURL = 'http://localhost:3000/';
let transactions: Transaction[] = []


const getTransactions = async (): Promise<Transaction[]> => {
    let response = await axios('/transactions');
    if (response.status < 300) {
        return response.data;
    }
    alert(`HTTP error: ${response.status}`);
    return []
}


const addTransaction = async (e: Event) => {
    e.preventDefault();

    const amount = document.getElementById('amount') as HTMLInputElement;
    const text = document.getElementById('text') as HTMLInputElement;

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        let transaction = {
            id: uuidv4(),
            text: text.value,
            amount: parseInt(amount.value)
        }

        // const headers = { 'Content-Type': 'application/json' };
        let response = await axios.post(
            '/transactions', transaction,
        );

        if (response.status < 300) {
            transactions.push(transaction);
            addTransactionDOM(transaction);
            updateTotals();
            text.value = '';
            amount.value = '';
        } else {
            alert(`HTTP error: ${response.status}`);
        }
    }
}


// Add transactions to DOM list
const addTransactionDOM = (transaction: Transaction) => {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  const span = document.createElement("span");
  span.innerText = `${sign}${Math.abs(transaction.amount)}`;

  let button = document.createElement("button");
  button.classList.add("delete-btn")
  button.setAttribute('data-selector', `remove-transaction-${transaction.id}`);
  button.innerText = 'x';
  button.onclick = () => {
    removeTransaction(transaction.id);
  }

  item.innerText = `${transaction.text}`;
  item.appendChild(span);
  item.appendChild(button)

  document.getElementById('list')!.appendChild(item);
}

// Update the balance, income and expense
const updateTotals = () => {
  const balance = document.getElementById('balance')!;
  const income = document.getElementById('money-plus')!;
  const expense = document.getElementById('money-minus')!;
  const amounts = transactions.map(transaction => transaction.amount);

  const total_value = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const income_value = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense_value = (
    amounts.filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

  balance.innerText = `$${total_value}`;
  income.innerText = `$${income_value}`;
  expense.innerText = `$${expense_value}`;
}

// Remove transaction by ID
const removeTransaction = async (id: string) => {
  
  const url = `/transactions/${id}`;
  let response = await axios.delete(url);

  if (response.status < 300) {
      transactions = transactions.filter(transaction => transaction.id !== id);
      document.getElementById('list')!.innerHTML = '';
      transactions.forEach(addTransactionDOM);
      updateTotals();
  } else {
      alert(`HTTP error: ${response.status}`);
  }
}


const init = async () => {
    // initialize expense tracker
    transactions = await getTransactions();
    document.getElementById('list')!.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateTotals();
    document.getElementById('form')!
        .addEventListener('submit', addTransaction);
}

init()
