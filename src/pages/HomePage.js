import { fetchPopMovies } from 'api';
import { useEffect, useState } from 'react';
import { MoviesList } from 'components/MoviesList';

export default function HomePage() {
  const [moviesItems, setMoviesItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // HTTP запит за популярними фільмами

  useEffect(() => {
    const controller = new AbortController();
    async function getMovies() {
      try {
        setLoading(true);
        setError(false);
        const results = await fetchPopMovies(controller);
        setMoviesItems(results);
      } catch (error) {
        setError(true);
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
      {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
      <MoviesList items={moviesItems} />
    </div>
  );
}
