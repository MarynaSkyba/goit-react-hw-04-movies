import toast, { Toaster } from 'react-hot-toast';

export default function SearchBarPage({ onSubmit }) {
  const handleSearch = e => {
    e.preventDefault();
    const target = e.target.elements.searchMovie.value.toLowerCase();
    if (target.trim() === '') {
      return toast.error('The search field is empty!');
    }
    onSubmit(target);
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
      <Toaster />
    </div>
  );
}
