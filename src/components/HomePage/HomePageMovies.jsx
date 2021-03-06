import { NavLink, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import styles from './HomePageMovies.module.css';

const makeSlug = string => slugify(string, { lower: true });

const HomePageMovies = ({ movies }) => {
  const location = useLocation();

  return (
    <div className={styles.div}>
      <h1 className={styles.h1}> Trending today </h1>
      <ul className={styles.ul}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.li}>
            <NavLink
              className={styles.link}
              to={{
                pathname: `movies/${makeSlug(`${movie.title} ${movie.id}`)}`,
                state: { from: { location, label: 'Back to trend movies' } },
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles.img}
              />
              <p className={styles.p}>{movie.title}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePageMovies;
