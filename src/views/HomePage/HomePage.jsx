import { useEffect, useState } from 'react';
import * as moviesAPI from '../../services/moviesApi';
import HomePageMovies from '../../components/HomePage/HomePageMovies';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesAPI.moviesTrending().then(data => {
      console.log('home page', data.results);
      setMovies(data.results);
    });
  }, []);

  return (
    <>
      <h1> Trending today </h1>
      {movies && <HomePageMovies movies={movies} />}
    </>
  );
}
