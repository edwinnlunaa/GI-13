document.addEventListener('DOMContentLoaded', function() {
    // Wait for the DOM content to be fully loaded before executing the script

    // Extract the 'movies' query parameter from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movies = JSON.parse(urlParams.get('movies') || '[]');

    // Get the reference to the <ul> element with id 'moviesList' from the HTML
    const moviesList = document.getElementById('moviesList');

    // Iterate over each movie in the 'movies' array
    movies.forEach(movie => {
        // Create a new <li> element for each movie
        const li = document.createElement('li');

        // Construct HTML content for the <li> element, linking to '/similar' page with movie details
        li.innerHTML = `<a href="/similar?movie_id=${movie.id}">${movie.title} (${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})</a>`;

        // Append the <li> element to the 'moviesList' <ul> element
        moviesList.appendChild(li);
    });
});