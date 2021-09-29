import { lazy } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../services/moviesApi';

const MoviePageDetails = lazy(() =>
  import('../components/MoviesPage/MoviePageDetails' /* webpackChunkName: "MoviePageDetails"  */),
);

export default function MovieDetails() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const movieId = slug.match(/[a-z0-9]+$/)[0];

  useEffect(() => {
    moviesAPI.movieInfo(movieId).then(setMovie);
  }, [movieId]);

  return <>{movie && <MoviePageDetails movie={movie} />}</>;
}
