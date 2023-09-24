import { useSearchParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import { SearchBox } from 'components/SearchBox/SearchBox';
import toast from 'react-hot-toast';
import { searchMovies } from 'api';
import { MoviesList } from 'components/MoviesList/MoviesList';

export default function Movies() {
  const [moviesItems, setMoviesItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const productName = searchParams.get('name') ?? '';
  const controllerRef = useRef();

  const updateQueryString = name => {
    const nextParams = name !== '' ? { name } : {};
    setSearchParams(nextParams);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    async function getMovies() {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();

      try {
        setLoading(true);
        setError(false);
        const results = await searchMovies(productName, controllerRef.current);
        setMoviesItems(results);
        results.length > 0
          ? toast.success('ОСЬ ЩО МИ ПІДІБРАЛИ ДЛЯ ТЕБЕ!')
          : toast.error('ЗА ТАКИМ ЗАПИТОМ ВІДСУТНІ ФІЛЬМИ!');
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  };

  return (
    <>
      <SearchBox
        value={productName}
        onChange={updateQueryString}
        onSubmit={handleSubmit}
      />
      <div>
        {loading && <div>LOADING...</div>}
        {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
        <MoviesList items={moviesItems} />
      </div>
    </>
  );
}
