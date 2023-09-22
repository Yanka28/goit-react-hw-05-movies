import { fetchPopMovies } from 'api';
import { useEffect, useState } from 'react';
import { MoviesList } from 'components/MoviesList';
import toast from 'react-hot-toast';

// import { useQueryParams } from 'hooks/useQueryParams';

export default function HomePage() {
  const [moviesItems, setMoviesItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // HTTP запит за популярними фільмами

  useEffect(() => {
    async function getMovies() {
      try {
        setLoading(true);
        setError(false);
        const results = await fetchPopMovies();
        setMoviesItems(results);
        toast.success('ВСЕ ЧУДОВО!');
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
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
