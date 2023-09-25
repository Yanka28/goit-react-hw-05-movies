import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SearchBox } from 'components/SearchBox/SearchBox';
import toast from 'react-hot-toast';
import { searchMovies } from 'api';
import { MoviesList } from 'components/MoviesList/MoviesList';

export default function Movies() {
  const [moviesItems, setMoviesItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const productName = searchParams.get('name') ?? '';

  const handleSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    setSearchParams({ name: query });
  };

  useEffect(() => {
    const controller = new AbortController();
    if (productName === '') return;
    async function getMovies() {
      try {
        setLoading(true);
        const results = await searchMovies(productName, controller);
        setMoviesItems(results);
        if (results.length === 0)
          toast.error('ЗА ТАКИМ ЗАПИТОМ ВІДСУТНІ ФІЛЬМИ!');
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(error);
          toast.error('ОТАКОЇ...ХАЛЕПА (. СПРОБУЙ ЩЕРАЗ');
        }
      } finally {
        setLoading(false);
      }
    }
    getMovies();
    return () => controller.abort();
  }, [productName]);

  return (
    <>
      <SearchBox onSubmit={handleSubmit} />
      <div>
        {loading && <div>LOADING...</div>}
        {error && <div>OOPS! THERE WAS AN ERROR!</div>}
        {moviesItems.length > 0 && <MoviesList items={moviesItems} />}
      </div>
    </>
  );
}
