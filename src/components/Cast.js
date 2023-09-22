import { getMoviesCredits } from 'api';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const Cast = ({ items }) => {
  const location = useLocation();
  const params = useParams();
  console.log(params);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    async function fetchCredits() {
      try {
        const fetchedCredits = await getMoviesCredits(params.movieId);
        console.log('fetchedCredits', fetchedCredits);
        setCredits(fetchedCredits);
        console.log(credits);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCredits();
  }, [params.movieId]);

  return (
    <div>
      <ul>
        {credits?.map(item => (
          <li key={item.id}>
            <img
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/original/${item.profile_path}`
                  : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
              }
              alt=""
              width="150"
            />
            <p>{item.name}</p>
            <p>Character : {item.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
