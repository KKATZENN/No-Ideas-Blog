
//Storing Data
//localStorage.setItem('username', 'pika43');

//Retrieving Data
//let username = localStorage.getItem('username');
//console.log(username);  // Output: pika43

//Removing Data
//localStorage.removeItem('username');


//Clearing Data
//localStorage.clear();

const searchInput = document.getElementById('search');
const suggestions = document.getElementById('suggestions');
let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Show suggestions
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  suggestions.innerHTML = '';
  if (query) {
    const matches = history.filter(term => term.toLowerCase().includes(query));
    matches.forEach(term => {
      const li = document.createElement('li');
      li.textContent = term;
      li.addEventListener('click', () => {
        searchInput.value = term;
        suggestions.innerHTML = '';
      });
      suggestions.appendChild(li);
    });
  }
});

// Save search term
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const term = searchInput.value.trim();
    if (term && !history.includes(term)) {
      history.push(term);
      localStorage.setItem('searchHistory', JSON.stringify(history));
    }
    suggestions.innerHTML = '';
  }
});

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size before drawing
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100; // Adjusting for your layout

// Example: Drawing a red rectangle on the canvas
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 150, 100);

const errorMessage = document.getElementById('errorMessage');
try {
  // Code that could cause an error
  throw new Error('Custom error'); // Example of an error
} catch (e) {
  errorMessage.textContent = e.message;
}

