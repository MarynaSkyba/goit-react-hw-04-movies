import { lazy, Suspense } from 'react';
import {
  NavLink,
  useRouteMatch,
  Route,
  useParams,
  useLocation,
  useHistory,
} from 'react-router-dom';
import styles from './MoviePageDetails.module.css';
import Loader from 'react-loader-spinner';

const Cast = lazy(() => import('../../views/Cast' /* webpackChunkName: "cast"  */));
const Reviews = lazy(() => import('../../views/Reviews' /* webpackChunkName: "reviews"  */));

export default function MoviePageDetails({ movie }) {
  const history = useHistory();
  const location = useLocation();
  const { slug } = useParams();
  const { url, path } = useRouteMatch();

  const movieId = slug.match(/[a-z0-9]+$/)[0];

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  const checkLocation = () => {
    const { state } = location;
    return state?.from ? state.from : '';
  };

  // const checkLocation = location?.state?.from ? state.from :'';
  return (
    <div>
      <button type="button" onClick={onGoBack} className={styles.button}>
        {location?.state?.from?.label ?? 'Go back to main page'}
      </button>

      <div className={styles.div}>
        <div className={styles.movie_card}>
          <img
            className={styles.img}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />

          <div className={styles.movie_info}>
            <h2 className={styles.h2}>{movie.title}</h2>
            <p className={styles.p}> {movie.release_date}</p>
            <ul className={styles.li}>
              {movie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>

            <p className={styles.p}>{movie.overview}</p>

            <div className={styles.links}>
              <NavLink
                className={styles.link}
                to={{
                  pathname: `${url}/cast`,
                  state: { from: checkLocation() },
                }}
              >
                Cast
              </NavLink>
              <NavLink
                className={styles.link}
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: checkLocation() },
                }}
              >
                Reviews
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <Loader
            type="Hearts"
            color="#a52a62"
            height={200}
            width={200}
            timeout={5000}
            className={styles.loader}
          />
        }
      >
        <Route path={`${path}/cast`}>
          <Cast movieId={movieId} />
        </Route>

        <Route path={`${path}/reviews`}>
          <Reviews movieId={movieId} />
        </Route>
      </Suspense>
    </div>
  );
}
