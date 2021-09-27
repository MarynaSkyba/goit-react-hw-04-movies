import { useState, useEffect } from 'react';
import * as moviesAPI from '../../services/moviesApi';
import { useHistory, useLocation, Link, useRouteMatch } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';

import SearchBarPage from '../../components/MoviesPage/SearchBarPage';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  console.log('searchbar Location', location);
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');

  const searchQuery = new URLSearchParams(location.search).get('query') ?? '';

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
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: {
                    from: {
                      location,
                      label: 'Back to search movies',
                      search: `?query=${searchMovie}`,
                    },
                  },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
