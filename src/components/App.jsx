import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import("../pages/HomePage"));
const Movies = lazy(() => import('../pages/Movies'))
const MovieDetails = lazy(() => import('../pages/MovieDetails.js')) 
const Cast = lazy(() => import('./Cast/Cast'))
const Reviews = lazy(() => import('./Reviews'))




export const App = () => {

  return (
    <>
     <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId/" element={<MovieDetails />}>
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
