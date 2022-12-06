import './style.css';
import { v4 as uuidv4 } from 'uuid';


const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
let transactions = []


const getTransactions = async () => {
    let response = await fetch('http://localhost:3000/transactions');
    if (response.ok) {
        let result = await response.json();
        return result;
    } else {
        alert(`HTTP error: ${response.status}`);
    }
}


// Add transaction
async function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: uuidv4(),
      text: text.value,
      amount: +amount.value
    };

    let response = await fetch(`http://localhost:3000/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    });

    if (response.ok) {
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
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  const span = document.createElement("span");
  span.innerText = `${sign}${Math.abs(transaction.amount)}`;

  const button = document.createElement("button");
  button.classList = ["delete-btn"]
  button.setAttribute('data-selector', `remove-transaction-${transaction.id}`);
  button.innerText = 'x';
  button.onclick = () => {
    removeTransaction(transaction.id);
  }

  item.innerText = `${transaction.text}`;
  item.appendChild(span);
  item.appendChild(button)

  list.appendChild(item);
}

// Update the balance, income and expense
function updateTotals() {
  const balance = document.getElementById('balance');
  const income = document.getElementById('money-plus');
  const expense = document.getElementById('money-minus');
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
async function removeTransaction(id) {
  
  const url = `http://localhost:3000/transactions/${id}`;
  let response = await fetch(url, { method: 'DELETE' });

  if (response.ok) {
      transactions = transactions.filter(transaction => transaction.id !== id);
      init();
  } else {
      alert(`HTTP error: ${response.status}`);
  }

}


// Init app
async function init() {
  transactions = await getTransactions();
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateTotals();
  form.addEventListener('submit', addTransaction);
}

init();

