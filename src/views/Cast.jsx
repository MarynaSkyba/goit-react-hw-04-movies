import { useState, useEffect } from 'react';
import * as moviesAPI from '../services/moviesApi';
import styles from './Cast.module.css';

export default function MovieCastView({ movieId }) {
  const [casts, setCasts] = useState(null);
  useEffect(() => {
    moviesAPI.movieCast(movieId).then(data => setCasts(data.cast));
  }, [movieId]);

  return (
    <>
      <ul className={styles.ul}>
        {casts &&
          casts.map(cast => (
            <li className={styles.li} key={cast.id}>
              <img
                className={styles.img}
                alt={cast.name}
                src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`}
              />
              <p className={styles.p}>{cast.name}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
