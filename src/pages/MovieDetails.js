import { MovieDetailsCard } from '../components/MovieDetailsCard/MovieDetailsCard';
import { getMoviesDetails } from 'api';
import { useEffect, useState } from 'react';
import { Suspense, useRef } from 'react';
import { useParams, Outlet, useLocation, Link } from 'react-router-dom';

export default function MoviesDetails() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/');

  const params = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovie() {
      try {
        setLoading(true);
        const fetchedmovie = await getMoviesDetails(params.movieId, controller);
        setMovie(fetchedmovie);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
    return () => controller.abort();
  }, [params.movieId]);

  return (
    <div>
      {loading && <div>LOADING...</div>}
      {error && <div>OOPS! THERE WAS AN ERROR!</div>}
      {movie && (
        <>
          <div>
            <Link to={backLink.current}>
              <b>&#8592; Go back</b>
            </Link>
          </div>
          <MovieDetailsCard movie={movie} />
        </>
      )}
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
