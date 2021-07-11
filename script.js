// Define constants for HTML elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Get Quotes From API
async function getRandomQuote() {
    showLoadingSpinner();
    // define a proxyUrl to avoid CORS issue
    const apiUrl = 'https://api.quotable.io/random';
    try {
        //used in catch block as a terminating condition
        let maxRequests = 0; 
        const response = await fetch(apiUrl);
        const data = response.json();
        // Set quoteText and authorText
        data.then(function(result) {

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
            removeLoadingSpinner();
        })
    } catch (error) {
        // handle errors here
        console.log('Quote fetch failed', error);
        // get quote again
        if (maxRequests > 10)
            alert('Something is not right. Please try again after sometime.');
        else
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
