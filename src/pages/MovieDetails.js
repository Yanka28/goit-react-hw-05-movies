import { AxiosError } from 'axios';
import { MovieDetailsCard } from '../components/MovieDetailsCard';
import { getMoviesDetails } from 'api';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import toast from 'react-hot-toast';
import { useParams, Outlet } from 'react-router-dom';

export default function MoviesDetails() {
  const params = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const fetchedMovie = await getMoviesDetails(params.movieId);
        setMovie(fetchedMovie);
      } catch (error) {
        error.code === 'ERR_BAD_REQUEST'
          ? toast.error('REQUEST FAILED WITH STATUS CODE 404!')
          : toast.error('ОАКОЇ, СПРОБУЙ ЩЕ РАЗ!');
        console.log(error);
      }
    }

    fetchMovie();
  }, [params.movieId]);

  return (
    <div>
      {movie && (
        <div>
          <MovieDetailsCard movie={movie} movieId={params.movieId} />
        </div>
      )}
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
