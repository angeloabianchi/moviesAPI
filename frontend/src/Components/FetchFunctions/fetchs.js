
/* const API_KEY = 'YOUR_API_KEY'; */
const BASE_URL = 'https://api.themoviedb.org/3';

const generateURL = (apiType, params = {}) => {
  const { page, input, id } = params;
  const languageParam = 'en-US';

  /* const apiKeyParam = `api_key=${API_KEY}`; */

  switch (apiType) {
    case 'top_rated':
      return `${BASE_URL}/movie/top_rated?language=${languageParam}&page=${page}`;
    case 'popular':
      return `${BASE_URL}/movie/popular?language=${languageParam}&page=${page}`;
    case 'discover':
      return `${BASE_URL}/discover/movie?&page=${page}`;
    case 'search':
      return `${BASE_URL}/search/movie?query=${input}&page=${page}`;
    case 'movie':
      return `${BASE_URL}/movie/${id}?language=${languageParam}`;
    case 'watch_providers':
      return `${BASE_URL}/movie/${id}/watch/providers?`;
    default:
      throw new Error(`Invalid type: ${apiType}`);
  }
};


/* 
const topRatedURL = generateURL('top_rated', { page: 1 });
const popularURL = generateURL('popular', { page: 1 });
const discoverURL = generateURL('discover', { page: 1 });
const searchURL = generateURL('search', { input: 'example', page: 1 });
const movieURL = generateURL('movie', { id: 123 });
const watchProvidersURL = generateURL('watch_providers', { id: 123 }); */




const fetchData = (apiType, {page, input, id}) => {

    const fetch = require('node-fetch'); 
    const url = generateURL(apiType, { page, input, id });
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjljM2YwMjllM2Y4NGRjYTY3ZmVlM2U1YzNmN2NlMCIsInN1YiI6IjY0YjZhMmUzYWM0MTYxMDBmZjIxZjhjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YVq3uit-EzdsQ0Ot-fwHkvX03DUElXUuX2OpAu3R6vc'
        }
    };

    return fetch(url, options)
    .then(res => res.json())
    .then(json => {
      if (apiType === 'movie') {
          return json;
      }
      else {
        return { results: json.results, total_pages: json.total_pages };
      }
    })
    .catch(err => console.error('error:' + err));
}

export {fetchData};