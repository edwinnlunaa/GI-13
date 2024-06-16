document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movies = JSON.parse(urlParams.get('movies') || '[]');
    const moviesList = document.getElementById('moviesList');
    movies.forEach(movie => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="/similar?movie_id=${movie.id}">${movie.title} (${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})</a>`;
        moviesList.appendChild(li);
    });
});