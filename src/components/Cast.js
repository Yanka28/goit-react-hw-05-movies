import { getMoviesCredits } from 'api';
import { CastFoto, Fotoimg } from './Cast.styled';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Cast = ({ items }) => {
  const location = useLocation();
  const params = useParams();
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCredits() {
      try {
        const fetchedCredits = await getMoviesCredits(
          params.movieId,
          controller
        );
        setCredits(fetchedCredits);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCredits();
    return () => controller.abort();
  }, [params.movieId]);

  return (
    <div>
      <ul>
        {credits?.map(item => (
          <CastFoto key={item.id}>
            <Fotoimg
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/original/${item.profile_path}`
                  : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
              }
              alt=""
              width="150"
            />
            <p>
              <b>{item.name}</b>
            </p>
            <p>Character : {item.character}</p>
          </CastFoto>
        ))}
      </ul>
    </div>
  );
};
export default Cast;
