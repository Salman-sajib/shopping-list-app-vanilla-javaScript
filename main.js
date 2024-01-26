// ========== Import css file ==========
import './style.css';

// Global variables
const inputField = document.querySelector('#input-field');
const addToListBtn = document.querySelector('#add-button');

addToListBtn.addEventListener('click', (e) => {
  console.log(e.target);
  console.log(inputField.value);
});
