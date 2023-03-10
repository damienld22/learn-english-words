// CONSTANTS
const STORAGE_KEY = 'words';

// Add word button
document.getElementById('add-button').addEventListener('click', () => {
  document.getElementById('add-modal').style.display = 'block';
});

document.getElementById('add-modal-close').addEventListener('click', () => {
  closeAddModal();
});

document.getElementById('add-modal').addEventListener('submit', (evt) => {
  evt.preventDefault();

  // Handle data
  const formData = new FormData(evt.target);
  const JSONData = JSON.stringify(Object.fromEntries(formData));
  addNewWord(JSONData);

  closeAddModal();
});

function closeAddModal() {
  document.getElementById('add-modal').style.display = 'none ';
}

// STORAGE
function getElementsFromStorage() {
  const stringifyData = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(stringifyData || '[]')
}

function saveElementsToStorage(words) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

function addNewWord(word) {
  const existingWords = getElementsFromStorage();
  saveElementsToStorage([...existingWords, word]);
  
}