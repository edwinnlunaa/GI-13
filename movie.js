// Import necessary modules
const express = require('express');  // Importing Express framework
const axios = require('axios');      // Importing Axios for making HTTP requests
const path = require('path');        // Importing Path module for file paths

// Initialize Express application
const app = express();

// API Key for accessing The Movie Database (TMDB)
const API_KEY = 'a95e61d5791d646dd202382ace574975';

// Middleware setup
app.use(express.json());  // Parse incoming request bodies as JSON
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST request to '/search' endpoint
app.post('/search', async (req, res) => {
    const query = req.body.query;  // Extract 'query' parameter from request body
    try {
        // Send a GET request to TMDB API to search for movies
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: API_KEY,
                query: query
            }
        });
        const movies = response.data.results;  // Extract search results from API response
        // Redirect to the homepage with search results encoded in URL
        res.redirect(`/?movies=${encodeURIComponent(JSON.stringify(movies))}`);
    } catch (error) {
        console.error(error);  // Log any errors that occur during the request
        res.redirect('/?movies=[]');  // Redirect to homepage with empty movies list on error
    }
});

// Handle GET request to '/similar' endpoint
app.get('/similar', async (req, res) => {
    const movie_id = req.query.movie_id;  // Extract 'movie_id' parameter from query string
    try {
        // Send a GET request to TMDB API to fetch similar movies
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/similar`, {
            params: {
                api_key: API_KEY
            }
        });
        const similarMovies = response.data.results;  // Extract similar movies from API response
        // Redirect to 'similar.html' with similar movies encoded in URL
        res.redirect(`/similar.html?similarMovies=${encodeURIComponent(JSON.stringify(similarMovies))}`);
    } catch (error) {
        console.error(error);  // Log any errors that occur during the request
        res.redirect('/similar.html?similarMovies=[]');  // Redirect to 'similar.html' with empty similar movies list on error
    }
});

// Set the port number for the server to run on (default: 3000)
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);  // Log server start message to console
});