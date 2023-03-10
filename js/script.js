// CONSTANTS
const STORAGE_KEY = 'words';
const SIDE_WITH = '40vw';

let words = getElementsFromStorage();
let toTestsWords = shuffle([...words]);

// BOOTSTRAP
displayListOfWords();

displayNextWorkToTest();


// Add word button
document.getElementById('add-button').addEventListener('click', () => {
  document.getElementById('add-modal').style.display = 'block';
  document.getElementById('english').focus();
});

document.getElementById('add-modal-close').addEventListener('click', () => {
  closeAddModal();
});

document.getElementById('add-modal').addEventListener('submit', (evt) => {
  evt.preventDefault();

  // Handle data
  const formData = new FormData(evt.target);
  const JSONData = Object.fromEntries(formData);
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
  const newWords = [...words, word];
  words = newWords;
  saveElementsToStorage(words);
  displayListOfWords(words);

}

// SIDENAV
document.getElementById('menu-button').addEventListener('click', () => {
  document.getElementById('menu-button').style.opacity = 0;
  document.getElementById('side').style.width = SIDE_WITH;
})

document.getElementById('side-close').addEventListener('click', () => {
  document.getElementById('side').style.width = '0px';
  document.getElementById('menu-button').style.opacity = 1;
});

function displayListOfWords() {
  const container = document.getElementById('words-list');

  container.replaceChildren();

  words.forEach(word => {
    const line = document.createElement('li');
    line.classList.add('word-item')
    const deleteIcon = '<div class="small-icon-button"><image alt="Delete icon" src="./assets/trash-icon.svg"/></div>'
    const text = `<span>${word.english}</span>`
    line.innerHTML = text + deleteIcon;

    line.addEventListener('click', () => {
      const newWords = [...words].filter(elt => elt.english !== word.english);
      words = newWords;
      saveElementsToStorage(words);
      displayListOfWords(words);
    });

    container.appendChild(line);
  });
}

// QUESTION LOGIC
function shuffle(array) {
  return array.sort((a, b) => 0.5 - Math.random());
}

function displayNextWorkToTest() {
  const toTestWord = toTestsWords.pop();
  const wordNode = document.getElementById('word-value');

  if (toTestWord) {
    const flipButton = document.getElementById('flip-button');
    const flipAction = () => {
      if (wordNode.textContent === toTestWord.english) {
        wordNode.textContent = toTestWord.translation;
      } else if (wordNode.textContent === toTestWord.translation) {
        wordNode.textContent = toTestWord.english;
      }
    }

    flipButton.addEventListener('click', flipAction);

    document.getElementById('ok-button').addEventListener('click', () => {
      flipButton.removeEventListener('click', flipAction);
      displayNextWorkToTest();
    }, { once: true });

    document.getElementById('ko-button').addEventListener('click', () => {
      flipButton.removeEventListener('click', flipAction);
      displayNextWorkToTest();
    }, { once: true });

    wordNode.textContent = toTestWord.english;
  } else {
    wordNode.textContent = 'No word. Please refresh.'
  }
}