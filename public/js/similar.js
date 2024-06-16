document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const similarMovies = JSON.parse(urlParams.get('similarMovies') || '[]');
    const similarMoviesList = document.getElementById('similarMoviesList');
    similarMovies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = `${movie.title} (${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})`;
        similarMoviesList.appendChild(li);
    });
});