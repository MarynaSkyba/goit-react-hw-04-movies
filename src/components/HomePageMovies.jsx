import { Link, useLocation } from 'react-router-dom';

const HomePageMovies = ({ movies }) => {
  const location = useLocation();
  console.log('homepage Location', location);

  return (
    <div>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `movies/${movie.id}`,
                state: { from: { location, label: 'Back to trend movies' } },
              }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePageMovies;
