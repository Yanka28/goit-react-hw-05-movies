import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { SearchBox } from 'components/SearchBox';
import toast from 'react-hot-toast';
import { searchMovies } from 'api';
import { MoviesList } from 'components/MoviesList';

export default function Movies() {
  const [moviesItems, setMoviesItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const productName = searchParams.get('name') ?? '';

  const updateQueryString = name => {
    const nextParams = name !== '' ? { name } : {};
    setSearchParams(nextParams);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    async function getMovies() {
      try {
        setLoading(true);
        setError(false);
        const results = await searchMovies(productName);
        setMoviesItems(results);
        console.log(results);
        toast.success('ОСЬ ЩО МИ ПІДІБРАЛИ ДЛЯ ВАС!');
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
