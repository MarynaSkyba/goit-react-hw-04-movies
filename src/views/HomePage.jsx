import { lazy } from 'react';
import { useEffect, useState } from 'react';
import * as moviesAPI from '../services/moviesApi';

const HomePageMovies = lazy(() =>
  import('../components/HomePage/HomePageMovies' /* webpackChunkName: "HomePageMovies"  */),
);

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  console.log(movies);

  useEffect(() => {
    moviesAPI.moviesTrending().then(data => {
      setMovies(data.results);
    });
  }, []);

  return <>{movies && <HomePageMovies movies={movies} />}</>;
}
