import { useState, useEffect } from 'react';
import * as moviesAPI from '../../services/moviesApi';

import { Link, Route } from 'react-router-dom';
// import MoviesPageSearch from './MoviesPageSearch'

export default function MoviesPage({ onSubmit }) {
  const [searchMovie, setSearchMovie] = useState([]);

  const handleFormSubmit = searchImage => {
    // setPage(1);
    // setImages([]);
    setSearchMovie(searchImage);
  };

  const handleSearch = e => {
    e.preventDefault();
    onSubmit(e.target.elements.searchMovie.value);
  };

  useEffect(() => {
    moviesAPI.moviesSearch().then(setSearchMovie);
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          type="text"
          name="searchMovie"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </div>
    // <MoviesPageSearch />
  );
}
