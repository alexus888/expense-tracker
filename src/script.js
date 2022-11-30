import './style.css';
import { v4 as uuidv4 } from 'uuid';

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


let localStorageTransactions = []

let response = await fetch('http://localhost:3000/transactions');
if (response.ok) {
  let json = await response.json();
  localStorageTransactions = json;
} else {
  alert(`HTTP error: ${response.status}`);
}


let transactions = localStorageTransactions;

// Add transaction
async function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
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

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    } else {
        alert(`HTTP error: ${response.status}`); 
    }
  }
}


function generateID() {
  return uuidv4();
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
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
async function removeTransaction(id) {
  
  const url = `http://localhost:3000/transactions/${id}`;
  let response = await fetch(url, { method: 'DELETE' });

  if (response.ok) {
      transactions = transactions.filter(transaction => transaction.id !== id);
      updateLocalStorage();
      init();
  } else {
      alert(`HTTP error: ${response.status}`);
  }

}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
