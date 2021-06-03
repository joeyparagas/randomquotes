// Get Quotes from API
// This is an optional/alternate quote api to use.
async function getQuote() {
  // The api call throws an error due to CORS and not being set up right.
  // Solution is to call a proxy api first.
  // Due to some issues, you must unlock the proxy here:
  // https://cors-anywhere.herokuapp.com/corsdemo
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    getQuote();
    console.log('Oh no, no quote', error);
  }
}

// On Load 
getQuote();