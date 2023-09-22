import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Movies from "pages/Movies";
import MovieDetails  from 'pages/MovieDetails'
import { Cast } from './Cast';
import { Reviews } from './Reviews';

export const App = () => {

  return (
   
    <>
     <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<Movies />} />
          <Route path="/movies/:movieId/" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />}/>
          </Route>
        </Route>
      </Routes>
      <GlobalStyle />
      <Toaster position="top-right" />
    </>
     
  );
};
