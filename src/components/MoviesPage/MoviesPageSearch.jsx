const MoviesPageSearch = ({ onSubmit }) => {
  console.log(onSubmit);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="searchMovie"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default MoviesPageSearch;
