import { Link, useRouteMatch } from 'react-router-dom';

const HomePageMovies = ({ movies }) => {
  //    const match = useRouteMatch();
  return (
    <div>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePageMovies;
