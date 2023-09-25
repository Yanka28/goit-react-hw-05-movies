import { getMoviesReviews } from 'api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const [reviewsItems, setReviewsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const controller = new AbortController();

    async function getReviews() {
      try {
        setLoading(true);
        const results = await getMoviesReviews(params.movieId, controller);
        setReviewsItems(results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') setError(error);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
    return () => controller.abort();
  }, [params.movieId]);

  return (
    <div>
      {loading && <div>LOADING...</div>}
      {error && <div>OOPS! THERE WAS AN ERROR!</div>}
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
export default Reviews;
