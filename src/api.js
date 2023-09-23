import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchPopMovies = async () => {
  const resp = await axios.get(
    '/trending/all/day?api_key=3a2795324b0fc13c7d8f10a87e487cb9'
  );
  return resp.data.results;
};

export const searchMovies = async query => {
  const resp = await axios.get(
    `/search/movie?api_key=3a2795324b0fc13c7d8f10a87e487cb9&query=${query}&include_adult=false&language=en-US&page=1`
  );
  return resp.data;
};

export const getMoviesDetails = async id => {
  const resp = await axios.get(
    `/movie/${id}?api_key=3a2795324b0fc13c7d8f10a87e487cb9&language=en-US`
  );
  return resp.data;
};

export const getMoviesCredits = async id => {
  const resp = await axios.get(
    `/movie/${id}/credits?api_key=3a2795324b0fc13c7d8f10a87e487cb9&language=en-US`
  );
  return resp.data.cast;
};

export const getMoviesReviews = async id => {
  const resp = await axios.get(
    `/movie/${id}/reviews?api_key=3a2795324b0fc13c7d8f10a87e487cb9&language=en-US&page=1`
  );
  console.log('reviews', resp.data.results);
  return resp.data.results;
};
