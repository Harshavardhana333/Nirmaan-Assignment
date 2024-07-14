import axios from 'axios';

const API_KEY = 'ee93823ba9msh06000586d79afd0p12fd02jsn1568afd216cf';
const API_HOST = 'movie-database-alternative.p.rapidapi.com';

export const fetchMovies = async (query) => {
  const apiOptions = {
    method: 'GET',
    url: 'https://movie-database-alternative.p.rapidapi.com/',
    params: {
      s: query,
      r: 'json',
      page: '1'
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST
    }
  };

  try {
    const response = await axios.request(apiOptions);
    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
