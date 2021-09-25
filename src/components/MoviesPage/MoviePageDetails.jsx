const MoviePageDetails = ({ movie }) => {
  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}></img>
      <h3>Genres:</h3>
      <p>
        {movie.genres.map(genre => (
          <li>{genre.name}</li>
        ))}
      </p>

      <h3>Description:</h3>
      <p>{movie.overview}</p>

      <h3>Cast</h3>
      <h3>Reviews</h3>
    </div>
  );
};
export default MoviePageDetails;
