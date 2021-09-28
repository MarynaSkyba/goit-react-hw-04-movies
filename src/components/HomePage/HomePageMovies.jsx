import { Link, useLocation } from 'react-router-dom';
import styles from './HomePageMovies.module.css';

const HomePageMovies = ({ movies }) => {
  const location = useLocation();
  console.log('homepage Location', location);

  return (
    <div className={styles.div}>
      <h1 className={styles.h1}> Trending today </h1>
      <ul className={styles.ul}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.li}>
            <Link
              className={styles.a}
              to={{
                pathname: `movies/${movie.id}`,
                state: { from: { location, label: 'Back to trend movies' } },
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles.img}
              ></img>
              <p className={styles.p}>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePageMovies;
