import { useState, useEffect } from 'react';
import * as moviesAPI from '../services/moviesApi';
import styles from './Reviews.module.css';

export default function MovieReviewsView({ movieId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    moviesAPI.movieReviews(movieId).then(data => setReviews(data.results));
  }, [movieId]);

  return (
    <>
      <ul className={styles.ul}>
        {reviews && reviews.length > 0
          ? reviews.map(review => (
              <li key={review.id} className={styles.li}>
                <h3 className={styles.h3}>{review.author}</h3>
                <p className={styles.p}>{review.content}</p>
              </li>
            ))
          : 'No reviews'}
      </ul>
    </>
  );
}
