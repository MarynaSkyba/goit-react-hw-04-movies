import { useState, useEffect, lazy } from 'react';
import * as moviesAPI from '../../services/moviesApi';
import { useHistory, useLocation, Link, useRouteMatch } from 'react-router-dom';
import toast from 'react-hot-toast';

const SearchBarPage = lazy(() =>
  import('../../components/MoviesPage/SearchBarPage' /* webpackChunkName: "SearchBarPage"  */),
);

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  console.log('page', page);
  const [searchMovie, setSearchMovie] = useState('');

  const searchQuery = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (!searchMovie) return;
    moviesAPI.moviesSearch(searchQuery, page).then(data => {
      console.log('data length', data.results.length);
      if (searchMovie.trim() === '' || data.results.length === 0) {
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
    </div>
  );
}
