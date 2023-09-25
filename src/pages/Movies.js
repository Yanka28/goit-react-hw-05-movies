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
  const [error, setError] = useState(false);
  const productName = searchParams.get('name') ?? '';
  // const controllerRef = useRef();

  // const updateQueryString = name => {
  //   const nextParams = name !== '' ? { name } : {};
  //   setSearchParams(nextParams);
  // };

  const handleSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    console.log(query);
    setSearchParams({ name: query });
  };

  useEffect(() => {
    const controller = new AbortController();
    async function getMovies() {
      try {
        setLoading(true);
        setError(false);
        const results = await searchMovies(productName, controller);
        setMoviesItems(results);
        results.length > 0
          ? toast.success('ОСЬ ЩО МИ ПІДІБРАЛИ ДЛЯ ТЕБЕ!')
          : toast.error('ЗА ТАКИМ ЗАПИТОМ ВІДСУТНІ ФІЛЬМИ!');
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') setError(error);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
    return () => controller.abort();
  }, [productName]);

  //   async function getMovies() {
  //     try {
  //       setLoading(true);
  //       setError(false);
  //       const results = await searchMovies(productName);
  //       setMoviesItems(results);
  //       results.length > 0
  //         ? toast.success('ОСЬ ЩО МИ ПІДІБРАЛИ ДЛЯ ТЕБЕ!')
  //         : toast.error('ЗА ТАКИМ ЗАПИТОМ ВІДСУТНІ ФІЛЬМИ!');
  //     } catch (error) {
  //       if (error.code !== 'ERR_CANCELED') setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getMovies();
  // };

  return (
    <>
      <SearchBox
        // value={productName}
        // onChange={updateQueryString}
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
