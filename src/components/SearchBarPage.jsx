import toast, { Toaster } from 'react-hot-toast';
import styles from './SearchBarPage.module.css';

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
    <div className={styles.div}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          name="searchMovie"
          autoComplete="off"
          autoFocus
          placeholder="Search Movies"
        />
        <button className={styles.button} type="submit">
          <span className={styles.span}>Search</span>
        </button>
      </form>
      <Toaster />
    </div>
  );
}
