import { useState, useEffect, useLocation } from 'react';
import * as moviesAPI from '../../services/moviesApi';

export default function MovieCastView({ movieId }) {
  // console.log('cast location',location)
  const [casts, setCasts] = useState(null);
  useEffect(() => {
    moviesAPI.movieCast(movieId).then(data => setCasts(data.cast));
  }, []);

  return (
    <>
      <ul>{casts && casts.map(cast => <li key={cast.id}>{cast.name}</li>)}</ul>
    </>
  );
}
