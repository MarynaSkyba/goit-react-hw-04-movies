import { useState, useEffect } from 'react';
import * as moviesAPI from '../../services/moviesApi';

export default function MovieCastView({ movieId }) {
  const [casts, setCasts] = useState(null);
  console.log('MovieCastView', casts);
  useEffect(() => {
    moviesAPI.movieCast(movieId).then(data => setCasts(data.cast));
  }, []);

  return (
    <>
      <ul>{casts && casts.map(cast => <li key={cast.id}>{cast.name}</li>)}</ul>
    </>
  );
}
