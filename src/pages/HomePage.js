import { fetchPopMovies } from 'api';
import { useEffect, useState } from 'react';
import { MoviesList } from 'components/MoviesList/MoviesList';

export default function HomePage() {
  const [moviesItems, setMoviesItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // HTTP запит за популярними фільмами

  useEffect(() => {
    const controller = new AbortController();
    async function getMovies() {
      try {
        setLoading(true);
        const results = await fetchPopMovies(controller);
        setMoviesItems(results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') setError(error);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
    return () => controller.abort();
  }, []);

  return (
    <div>
      <h1> Trending today</h1>
      {loading && <div>LOADING...</div>}
      {error && <div>OOPS! THERE WAS AN ERROR!</div>}
      {moviesItems.length > 0 && <MoviesList items={moviesItems} />}
    </div>
  );
}
