import { lazy, Suspense } from 'react';
import {
  Link,
  NavLink,
  useRouteMatch,
  Route,
  useParams,
  useLocation,
  useHistory,
} from 'react-router-dom';
import styles from './MoviePageDetails.module.css';

const Cast = lazy(() => import('../../views/Cast' /* webpackChunkName: "cast"  */));
const Reviews = lazy(() => import('../../views/Reviews' /* webpackChunkName: "reviews"  */));

export default function MoviePageDetails({ movie }) {
  const history = useHistory();
  const location = useLocation();
  console.log('MoviePageDetails', location);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  return (
    <div>
      <button type="button" onClick={onGoBack} className={styles.button}>
        {location?.state?.from?.label ?? 'Go back to main page'}
      </button>

      <div key={movie.id} className={styles.div}>
        <div className={styles.movie_card}>
          <img
            className={styles.img}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          ></img>

          <div className={styles.movie_info}>
            <h2 className={styles.h2}>{movie.title}</h2>
            <p className={styles.p}> {movie.release_date}</p>
            {movie.genres.map(genre => (
              <ul className={styles.li}>
                <li>{genre.name}</li>
              </ul>
            ))}

            <p className={styles.p}>{movie.overview}</p>

            <div className={styles.links}>
              <NavLink
                className={styles.link}
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location.state.from },
                }}
              >
                Cast
              </NavLink>
              <NavLink
                className={styles.link}
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location.state.from },
                }}
              >
                Reviews
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Download</div>}>
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
