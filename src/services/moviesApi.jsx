import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.params = {
  api_key: '81a241f12309c5e9ca28c72f9b2b35af',
};

async function fetchMovies(url = '', config = {}) {
  const response = await axios.get(url, config);
  return response.data;
}

export function moviesTrending() {
  return fetchMovies(`trending/movie/day?`);
}

export function moviesSearch(searchMovie) {
  return fetchMovies(`search/movie?&query=${searchMovie}`);
}

export function movieInfo(movieId) {
  return fetchMovies(`movie/${movieId}`);
}

export function movieCast(movieId) {
  return fetchMovies(`movie/${movieId}/credits`);
}

export function movieReviews(movieId) {
  return fetchMovies(`movie/${movieId}/reviews`);
}

// поиск - https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

// запрос полной информации о фильме для страницы кинофильма https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

// апрос информации о актёрском составе для страницы кинофильма.  https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

// запрос обзоров для страницы кинофильма. https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1

// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>

// 81a241f12309c5e9ca28c72f9b2b35af
