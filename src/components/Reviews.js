import { getMoviesReviews } from 'api';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const Reviews = () => {
  const [reviewsItems, setReviewsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  console.log(params);

  useEffect(() => {
    async function getReviews() {
      try {
        setLoading(true);
        setError(false);
        const results = await getMoviesReviews(params.movieId);
        setReviewsItems(results);
        console.log(reviewsItems);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, [params.movieId]);

  return (
    <div>
      {
        <ul>
          {reviewsItems.length > 0
            ? reviewsItems.map(reviewsItem => (
                <li key={reviewsItem.id}>
                  <p>
                    <b>{reviewsItem.author}</b>
                  </p>
                  <p>{reviewsItem.content}</p>
                </li>
              ))
            : 'OOPS! THERE WAS NO REVIEWS!'}
        </ul>
      }
    </div>
  );
};
