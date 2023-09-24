import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  Description,
  ModalImg,
  Card,
  GanresList,
  Exposition,
  ExpositionBlock,
} from './MovieDetailsCard.styled';

export const MovieDetailsCard = ({ movie, movieId }) => {
  const {
    title,
    vote_average,
    overview,
    genres,
    backdrop_path,
    release_date,
    name,
  } = movie;

  const location = useLocation();

  return (
    <>
      <Card>
        <ModalImg>
          <img
            src={
              backdrop_path
                ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
                : `https://wiki.dave.eu/images/thumb/4/47/Placeholder.png/900px-Placeholder.png`
            }
            width="700"
            height="400"
            alt=""
          />
        </ModalImg>
        <Description>
          <h1>
            <b>
              {title ? title : name}({release_date.slice(0, 4)})
            </b>
          </h1>
          <p>User score: {Math.round(vote_average * 10)} % </p>
          <h2>
            <b>Overview</b>
          </h2>
          <p>{overview}</p>
          <h3>
            <b>Genres</b>
          </h3>

          <GanresList>
            {genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </GanresList>
        </Description>
      </Card>
      <ExpositionBlock>
        <h4>Additional information</h4>
        <Exposition>
          <li>
            <Link to={`/movies/${movieId}/cast`} state={{ from: location }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`} state={{ from: location }}>
              Reviews
            </Link>
          </li>
        </Exposition>
      </ExpositionBlock>
    </>
  );
};
