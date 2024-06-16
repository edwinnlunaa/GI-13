document.addEventListener('DOMContentLoaded', function() {
    // Wait for the DOM content to be fully loaded before executing the script

    // Extract the 'similarMovies' query parameter from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const similarMovies = JSON.parse(urlParams.get('similarMovies') || '[]');

    // Get the reference to the <ul> element with id 'similarMoviesList' from the HTML
    const similarMoviesList = document.getElementById('similarMoviesList');

    // Iterate over each movie in the 'similarMovies' array
    similarMovies.forEach(movie => {
        // Create a new <li> element for each movie
        const li = document.createElement('li');

        // Set the text content of the <li> element to display movie title and release year
        li.textContent = `${movie.title} (${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})`;

        // Append the <li> element to the 'similarMoviesList' <ul> element
        similarMoviesList.appendChild(li);
    });
});