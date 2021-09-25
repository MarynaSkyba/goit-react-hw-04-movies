import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/moviesApi';
import MoviePageDetails from '../../components/MoviesPage/MoviePageDetails';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesAPI.movieInfo(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {
        movie && <MoviePageDetails movie={movie} />
        // <div>
        //   <h2>{movie.title}</h2>
        //   <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}></img>
        // <h3>Genres:</h3>
        // <p>{movie.genres.map(genre => <li>{genre.name}</li>)}</p>

        // <h3>Description:</h3>
        // <p>{movie.overview}</p>

        // <h3>Cast</h3>
        // <h3>Reviews</h3>
        // </div>
      }
    </>
  );
}
