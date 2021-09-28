import { useState, useEffect, useLocation } from 'react';
import * as moviesAPI from '../services/moviesApi';
import styles from './Cast.module.css';

export default function MovieCastView({ movieId }) {
  // console.log('cast location',location)
  const [casts, setCasts] = useState(null);
  useEffect(() => {
    moviesAPI.movieCast(movieId).then(data => setCasts(data.cast));
  }, []);

  return (
    <>
      <ul className={styles.ul}>
        {casts &&
          casts.map(cast => (
            <li castName={styles.li} key={cast.id}>
              <img
                className={styles.img}
                src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`}
              />
              <p className={styles.p}>{cast.name}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
