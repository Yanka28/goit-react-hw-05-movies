import { MovieDetailsCard } from '../components/MovieDetailsCard';
import { getMoviesDetails } from 'api';
import { useEffect, useState } from 'react';
import { useLocation, useParams, Outlet } from 'react-router-dom';

export default function MoviesDetails() {
  const location = useLocation();

  const params = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const fetchedMovie = await getMoviesDetails(params.movieId);
        setMovie(fetchedMovie);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovie();
  }, [params.movieId]);

  return (
    <div>
      {/* <Link to={location?.state?.from ?? '/quizzes'}>Back to quizzes</Link> */}
      {movie && (
        <div>
          <MovieDetailsCard movie={movie} movieId={params.movieId} />
        </div>
      )}
      <Outlet />
    </div>
  );
}
