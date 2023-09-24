import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchPopMovies = async value => {
  const resp = await axios.get(
    '/trending/all/day?api_key=3a2795324b0fc13c7d8f10a87e487cb9',
    { signal: value.signal }
  );
  return resp.data.results;
};

export const searchMovies = async (query, value) => {
  const resp = await axios.get(
    `/search/movie?api_key=3a2795324b0fc13c7d8f10a87e487cb9&query=${query}&include_adult=false&language=en-US&page=1`,
    { signal: value.signal }
  );
  return resp.data.results;
};

export const getMoviesDetails = async (id, value) => {
  const resp = await axios.get(
    `/movie/${id}?api_key=3a2795324b0fc13c7d8f10a87e487cb9&language=en-US`,
    { signal: value.signal }
  );
  return resp.data;
};

export const getMoviesCredits = async (id, value) => {
  const resp = await axios.get(
    `/movie/${id}/credits?api_key=3a2795324b0fc13c7d8f10a87e487cb9&language=en-US`,
    { signal: value.signal }
  );
  return resp.data.cast;
};

export const getMoviesReviews = async (id, value) => {
  const resp = await axios.get(
    `/movie/${id}/reviews?api_key=3a2795324b0fc13c7d8f10a87e487cb9&language=en-US&page=1`,
    { signal: value.signal }
  );
  return resp.data.results;
};
