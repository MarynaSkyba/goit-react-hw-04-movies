import { useState, useEffect, lazy } from 'react';
import * as moviesAPI from '../services/moviesApi';
import { useHistory, useLocation, NavLink, useRouteMatch } from 'react-router-dom';
import slugify from 'slugify';
import Loader from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../components/HomePage/HomePageMovies.module.css';

const SearchBarPage = lazy(() =>
  import('../components/SearchBarPage' /* webpackChunkName: "SearchBarPage"  */),
);
const makeSlug = string => slugify(string, { lower: true });

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
  }, [searchQuery, page, searchMovie]);

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
    <div className={styles.div}>
      <SearchBarPage onSubmit={handleFormSubmit} />
      {movies && (
        <>
          <ul className={styles.ul}>
            {movies.map(movie => (
              <li key={movie.id} className={styles.li}>
                <NavLink
                  className={styles.link}
                  to={{
                    pathname: `${url}/${makeSlug(`${movie.title} ${movie.id}`)}`,
                    state: {
                      from: {
                        location,
                        label: 'Back to search movies',
                        search: `?query=${searchMovie}`,
                      },
                    },
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.img}
                  ></img>
                  <p className={styles.p}>{movie.title}</p>
                </NavLink>
              </li>
            ))}
          </ul>
          {showButton && (
            <button onClick={handleButtonLoadMore} className={styles.button}>
              Load more
            </button>
          )}
        </>
      )}
      <Toaster />
    </div>
  );
}
