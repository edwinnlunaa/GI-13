const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const API_KEY = 'a95e61d5791d646dd202382ace574975'; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/search', async (req, res) => {
    const query = req.body.query;
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: API_KEY,
                query: query
            }
        });
        const movies = response.data.results;
        res.redirect(`/?movies=${encodeURIComponent(JSON.stringify(movies))}`);
    } catch (error) {
        console.error(error);
        res.redirect('/?movies=[]');
    }
});

app.get('/similar', async (req, res) => {
    const movie_id = req.query.movie_id;
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/similar`, {
            params: {
                api_key: API_KEY
            }
        });
        const similarMovies = response.data.results;
        res.redirect(`/similar.html?similarMovies=${encodeURIComponent(JSON.stringify(similarMovies))}`);
    } catch (error) {
        console.error(error);
        res.redirect('/similar.html?similarMovies=[]');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});