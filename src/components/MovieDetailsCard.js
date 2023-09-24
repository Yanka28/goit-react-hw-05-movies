import { Link, useLocation } from 'react-router-dom';
// import { BsArrowLeftCircle } from 'react-icons/bs';
import { useRef } from 'react';
import {
  Description,
  ModalImg,
  Card,
  GanresList,
  Goback,
  Exposition,
  ExpositionBlock,
} from './MovieDetailsCard.styled';
// import { Topic, Wrapper, MetaWrapper, Text, Button } from './QuizCard.styled';

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
  const backLink = useRef(location.state?.from ?? '/');

  console.log('location', location);
  console.log('backLink', location.state?.from ?? '/');
  console.log('backLink', location.state?.from);

  return (
    <>
      <Goback>
        <Link to={backLink.current}>Go back</Link>
      </Goback>
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
