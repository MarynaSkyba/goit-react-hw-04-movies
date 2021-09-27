const SearchBarPage = ({ onSubmit }) => {
  const handleSearch = e => {
    e.preventDefault();
    onSubmit(e.target.elements.searchMovie.value.toLowerCase());
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="searchMovie"
          autoComplete="off"
          autoFocus
          placeholder="Search Movies and photos"
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBarPage;
