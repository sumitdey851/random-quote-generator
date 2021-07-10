const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');


// Get Quotes From API
async function getRandomQuote() {
    const apiUrl = 'https://api.quotable.io/random';
    try {
        const response = await fetch(apiUrl);
        const apiQuotes = response.json();
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
        })
    } catch (error) {
        // handle errors here
    }
}

// On Load
getRandomQuote();