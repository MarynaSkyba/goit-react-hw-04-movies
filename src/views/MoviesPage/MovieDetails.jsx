import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/moviesApi';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesAPI.movieInfo(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie && (
        <div>
          <p>{movie.title}</p>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}></img>
        </div>
      )}
    </>
  );
}
