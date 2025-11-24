import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53390441-690cb9fa742523782d54564fc';

const DEFAULT_PARAMS = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};




export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: { ...DEFAULT_PARAMS, q: query },
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Помилка запиту до Pixabay:', error);
      throw error;
    });
}
