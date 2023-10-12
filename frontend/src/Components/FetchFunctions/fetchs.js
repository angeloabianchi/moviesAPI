
/* const API_KEY = 'YOUR_API_KEY'; */
const BASE_URL = 'https://api.themoviedb.org/3';

const generateURL = (apiType, params = {}) => {
  const { page, input, id } = params;
  const urlVariable = ['movie', 'discover']
  const languageParam = 'en-US';

  /* const apiKeyParam = `api_key=${API_KEY}`; */

  switch (apiType) {
    case 'top_rated':
      return `${BASE_URL}/${urlVariable[0]}/${apiType}?language=${languageParam}&page=${page}`;
    case 'popular':
      return `${BASE_URL}/${urlVariable[0]}/${apiType}?language=${languageParam}&page=${page}`;
    case 'discover':
      return `${BASE_URL}/${urlVariable[1]}/movie?&page=${page}`;
    case 'search':
      return `${BASE_URL}/${apiType}/movie?query=${input}&page=${page}`;
    case 'movie':
      return `${BASE_URL}/${apiType}/${id}?language=${languageParam}`;
    case 'watch':
      return `${BASE_URL}/${urlVariable[0]}/${id}/${apiType}/providers`;
    case 'credits':
      return `${BASE_URL}/${urlVariable[0]}/${id}/${apiType}?language=${languageParam}`;
    case 'videos':
      return `${BASE_URL}/${urlVariable[0]}/${id}/${apiType}?language=${languageParam}`;
    case 'release_dates':
      return `${BASE_URL}/${urlVariable[0]}/${id}/${apiType}`
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




const fetchData = async (apiType, {page, input, id}) => {

    const fetch = require('node-fetch'); 
    const url = generateURL(apiType, { page, input, id });
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjljM2YwMjllM2Y4NGRjYTY3ZmVlM2U1YzNmN2NlMCIsInN1YiI6IjY0YjZhMmUzYWM0MTYxMDBmZjIxZjhjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YVq3uit-EzdsQ0Ot-fwHkvX03DUElXUuX2OpAu3R6vc'
        }
    };


    return await fetch(url, options)
    .then(res => res.json())
    .then(json => {
      if (apiType === 'movie' || apiType === 'credits' || apiType === 'release_dates' || apiType === 'credits' || apiType === 'watch') {
          return json;
      }
      else {
        return { results: json.results, total_pages: json.total_pages };
      }
    })
    .catch(err => console.error('error:' + err));
}

export {fetchData};