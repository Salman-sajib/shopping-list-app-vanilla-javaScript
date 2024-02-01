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
  const itemsArray = Object.entries(snapshot.val());
  clearShoppingList();
  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];
    appendItemToShoppingList(currentItem);
  }
});

function clearShoppingList() {
  shoppingList.innerHTML = '';
}

function appendItemToShoppingList(item) {
  let itemId = item[0];
  let itemValue = item[1];
  let newElement = document.createElement('li');
  newElement.textContent = itemValue;

  newElement.addEventListener('dblclick', function () {
    let exactLocationofItemInDB = ref(database, `shoppingList/${itemId}`);
    remove(exactLocationofItemInDB);
  });

  shoppingList.append(newElement);
}

function clearInputField() {
  inputField.value = '';
}
