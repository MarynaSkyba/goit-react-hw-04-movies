import { lazy } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/moviesApi';

const MoviePageDetails = lazy(() =>
  import(
    '../../components/MoviesPage/MoviePageDetails' /* webpackChunkName: "MoviePageDetails"  */
  ),
);
export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesAPI.movieInfo(movieId).then(setMovie);
  }, [movieId]);

  return <>{movie && <MoviePageDetails movie={movie} />}</>;
}
