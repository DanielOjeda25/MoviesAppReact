import axios from 'axios';

//guardamos la url de la appi para poder usarla muchas veces
const apiUrl = 'https://api.themoviedb.org/3';

// guardamos tambien la apikey para poder llamar mas facilmente
const apiKey = 'api_key=823ad81b25b34ba449a336754980dc01';

export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return resp.data.results;
};

//obtiene las peliculas que proximamente se estrenaran
export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return resp.data.results;
};

//obtiene las series de tv mas populares
export const getPopularTv = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return resp.data.results;
};

//obtiene las peliculas familiares
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`
  );
  return resp.data.results;
};

//obtiene los documentales
export const getDocumentaryMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`
  );
  return resp.data.results;
};

//obtendremos la pelicula
export const getMovie = async (id) => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return resp.data;
};

//buscaremos las peliculas y tv shows
export const searchMovieTv = async (query, type) => {
  const resp = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  return resp.data.results;
};