import { lazy, Suspense } from 'react';
import { NavLink, useRouteMatch, Route, useParams } from 'react-router-dom';

const MovieCastView = lazy(() =>
  import('../../views/MoviesPage/MovieCastView' /* webpackChunkName: "MovieCastView"  */),
);
const MovieReviewsView = lazy(() =>
  import('../../views/MoviesPage/MovieReviewsView' /* webpackChunkName: "MovieReviewsView"  */),
);

export default function MoviePageDetails({ movie }) {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();

  return (
    <div key={movie.id}>
      <button>Go back</button>
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

      <NavLink to={`${url}/cast`}>Cast</NavLink>
      <NavLink to={`${url}/reviews`}>Reviews</NavLink>

      <Suspense fallback={<div>Download</div>}>
        <Route path={`${path}/cast`}>
          <MovieCastView movieId={movieId} />
        </Route>

        <Route path={`${path}/reviews`}>
          <MovieReviewsView movieId={movieId} />
        </Route>
      </Suspense>
    </div>
  );
}
