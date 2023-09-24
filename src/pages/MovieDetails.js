import { MovieDetailsCard } from '../components/MovieDetailsCard';
import { getMoviesDetails } from 'api';
import { useEffect, useState } from 'react';
import { Suspense, useRef } from 'react';
import toast from 'react-hot-toast';
import { useParams, Outlet, useLocation, Link } from 'react-router-dom';

export default function MoviesDetails() {
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/');

  console.log('location', location);
  console.log('backLink', location.state?.from ?? '/');
  console.log('backLink', location.state?.from);

  const params = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovie() {
      try {
        const fetchedMovie = await getMoviesDetails(params.movieId, controller);
        setMovie(fetchedMovie);
      } catch (error) {
        error.code === 'ERR_BAD_REQUEST'
          ? toast.error('REQUEST FAILED WITH STATUS CODE 404!')
          : toast.error('ОАКОЇ, СПРОБУЙ ЩЕ РАЗ!');
        console.log(error);
      }
    }

    fetchMovie();
    return () => controller.abort();
  }, [params.movieId]);

  return (
    <div>
      {movie && (
        <>
          <div>
            <Link to={backLink.current}>&#8592; Go back</Link>
          </div>
          <MovieDetailsCard movie={movie} movieId={params.movieId} />
        </>
      )}
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
