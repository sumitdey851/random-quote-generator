// Define constants for HTML elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Get Quotes From API
async function getRandomQuote() {
    // Show loader
    loading();
    const apiUrl = 'https://api.quotable.io/random';
    try {
        const response = await fetch(apiUrl);
        const apiQuotes = response.json();
        // Set quote
        apiQuotes.then(function(result) {

            // Check quote length to determine styling
            if (result.content.length > 120)
                quoteText.classList.add('long-quote');
            else
                quoteText.classList.remove('long-quote');

            quoteText.textContent = result.content;
            
            // If author is unknown
            if (!result.author)
                authorText.textContent = 'Unknown';
            else
                authorText.textContent = result.author;
            // Hide loader
            complete();
        })
    } catch (error) {
        // handle errors here
        console.log('Quote fetch failed', error);
        // get quote again
        getRandomQuote();
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // open in new tab
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteButton.addEventListener('click', getRandomQuote);
twitterButton.addEventListener('click', tweetQuote);

// On Load
getRandomQuote();
