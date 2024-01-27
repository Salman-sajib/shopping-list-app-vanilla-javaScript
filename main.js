// Add firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';

const appSettings = {
  databaseURL:
    'https://shopping-list-6953c-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList');
// ====================

// Global variables
const inputField = document.querySelector('#input-field');
const addToListBtn = document.querySelector('#add-button');
const shoppingList = document.querySelector('#shopping-list');

addToListBtn.addEventListener('click', (e) => {
  let inputValue = inputField.value;

  if (inputValue) {
    push(shoppingListInDB, inputValue);
    clearInputField();
  }
});

onValue(shoppingListInDB, (snapshot) => {
  const itemsArray = Object.values(snapshot.val());
  clearShoppingList();
  for (let i = 0; i < itemsArray.length; i++) {
    appendItemToShoppingList(itemsArray[i]);
  }
});

function clearShoppingList() {
  shoppingList.innerHTML = '';
}

function appendItemToShoppingList(itemValue) {
  shoppingList.innerHTML += `<li>${itemValue}</li>`;
}

function clearInputField() {
  inputField.value = '';
}
