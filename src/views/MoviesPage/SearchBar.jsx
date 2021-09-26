import { useState, useEffect } from 'react';
import * as moviesAPI from '../../services/moviesApi';
import { useHistory, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import SearchBarPage from '../../components/MoviesPage/SearchBarPage';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  console.log('Movie search -input all', movies);

  const searchQuery = new URLSearchParams(location.search).get('query');
  console.log(searchQuery);

  useEffect(() => {
    if (!searchMovie) return;
    moviesAPI.moviesSearch(searchQuery).then(data => {
      if (searchMovie.trim() === '' || movies.length === 0) {
        return toast.error(`нет фильма с именем  ${searchMovie}`, setMovies([]));
      }
      if (data.results) {
        setMovies(data.results);
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
