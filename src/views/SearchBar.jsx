import { useState, useEffect, lazy } from 'react';
import * as moviesAPI from '../services/moviesApi';
import { useHistory, useLocation, Link, useRouteMatch } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SearchBarPage = lazy(() =>
  import('../components/SearchBarPage' /* webpackChunkName: "SearchBarPage"  */),
);

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchMovie, setSearchMovie] = useState('');
  const searchQuery = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (!searchQuery) return;
    moviesAPI.moviesSearch(searchQuery, page).then(data => {
      if (data.results.length === 0) {
        return toast.error(`Sorry there are no movies with ${searchMovie} name`, setMovies([]));
      }
      if (data.results) {
        return setMovies(prevMovies => [...prevMovies, ...data.results]);
      }
    });
  }, [searchQuery, page]);

  const handleFormSubmit = searchMovie => {
    setMovies([]);
    setSearchMovie(searchMovie);
    setPage(1);
    history.push({ ...location, search: `query=${searchMovie}` });
  };

  const handleButtonLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showButton = movies.length >= 20;
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
          {showButton && <button onClick={handleButtonLoadMore}>Load more</button>}
        </ul>
      )}
      <Toaster />
    </div>
  );
}
