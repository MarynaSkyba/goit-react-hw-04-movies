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

const Cast = lazy(() => import('../../views/MoviesPage/Cast' /* webpackChunkName: "cast"  */));
const Reviews = lazy(() =>
  import('../../views/MoviesPage/Reviews' /* webpackChunkName: "reviews"  */),
);

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
    <div key={movie.id}>
      <button type="button" onClick={onGoBack}>
        {location?.state?.from?.label ?? 'Go back to main page'}
      </button>

      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}></img>
      <h3>Genres:</h3>
      <p>
        {movie.genres.map(genre => (
          <li>{genre.name}</li>
        ))}
      </p>

      <h3>Description:</h3>
      <p>{movie.overview}</p>

      <NavLink
        to={{
          pathname: `${url}/cast`,
          state: { from: location.state.from },
        }}
      >
        Cast
      </NavLink>
      <NavLink
        to={{
          pathname: `${url}/reviews`,
          state: { from: location.state.from },
        }}
      >
        Reviews
      </NavLink>

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
