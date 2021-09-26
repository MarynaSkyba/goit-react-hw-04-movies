import { useState, useEffect } from 'react';
import * as moviesAPI from '../../services/moviesApi';
import { useHistory, useLocation } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';

import SearchBarPage from '../../components/MoviesPage/SearchBarPage';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  console.log('Movie search -input all', movies);

  const searchQuery = new URLSearchParams(location.search).get('query') ?? '';
  console.log(searchQuery);

  useEffect(() => {
    if (!searchMovie) return;
    moviesAPI.moviesSearch(searchQuery).then(data => {
      if (data.results.length === 0) {
        // searchMovie.trim() === '' ||
        return `нет фильма с именем  ${searchMovie}`;
        // toast.error
      }
      if (data.results) {
        return setMovies(data.results);
      }
      setMovies(prevMovies => [...prevMovies, ...data.results]);
    });
  }, [searchQuery]);

  const handleFormSubmit = searchMovie => {
    setSearchMovie(searchMovie);
    history.push({ ...location, search: `query=${searchMovie}` });
  };

  return (
    <div>
      <SearchBarPage onSubmit={handleFormSubmit} />
      {movies && (
        <ul>
          {movies.map(movie => (
            <li>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
