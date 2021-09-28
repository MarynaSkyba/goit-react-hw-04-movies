import { useState, useEffect } from 'react';
import * as moviesAPI from '../services/moviesApi';

export default function MovieReviewsView({ movieId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    moviesAPI.movieReviews(movieId).then(data => setReviews(data.results));
  }, [movieId]);

  return (
    <>
      <ul>
        {reviews && reviews.length > 0
          ? reviews.map(review => (
              <li>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))
          : 'No reviews'}
      </ul>
    </>
  );
}
