// pull HTML elements
const quoteContainer = document.getElementById('quote-container'),
  quoteText = document.getElementById('quote'),
  authorText = document.getElementById('author'),
  twitterBtn = document.getElementById('twitter'),
  newQuoteButton = document.getElementById('new-quote'),
  newChuckQuoteButton = document.getElementById('cn-quote'),
  bgContainer = document.querySelector('.bgContainer'),
  loader = document.getElementById('loader');


// Global empty object to store json results of api call
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
  /* Unsplash Random image on load*/
  bgContainer.style.backgroundImage = "";
  bgContainer.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?nature,water)";

}


// Show new quote from api
function newChuckQuote() {
  showLoadingSpinner();
  const quote = apiQuotes.value.joke;

  if (quote.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Show quote and hide loader 
  authorText.textContent = 'a Chuck Norris fan';
  quoteText.innerHTML = quote;
  removeLoadingSpinner();
}

function newQuote() {
  showLoadingSpinner();
  // Pick random quote from apiQuotes array from 0-length of array (amount of quotes)
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Output to HTML
  // Check if author is null and replace with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  // Check quote length and use smaller font if too long
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Show quote and hide loader 
  quoteText.innerText = quote.text;
  removeLoadingSpinner();
}



// Using Async/Await Fetch
async function getQuotes() {
  showLoadingSpinner();
  // URL variable for quotes api
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiUrl);
    // Store results to global object
    apiQuotes = await response.json();
    newQuote();

  } catch (error) {
    // Catch error here 
    alert('An error has occured.');
  }
}

async function getChuckQuote() {
  showLoadingSpinner();
  // URL variable for quotes api
  const apiUrl = 'https://api.icndb.com/jokes/random/';
  try {
    const response = await fetch(apiUrl);
    // Store results to global object
    apiQuotes = await response.json();
    newChuckQuote();

  } catch (error) {
    // Catch error here 
    alert('An error has occured. Please don\'t tell Chuck');
  }
}
// Tweet a Quote
function tweetQuote() {
  // From twitter developer page
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  // Open new window with link above
  window.open(twitterUrl, 'blank');
}

// EventListeners
newQuoteButton.addEventListener('click', getQuotes);
newChuckQuoteButton.addEventListener('click', getChuckQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On Load add quote and author to screen
getQuotes();