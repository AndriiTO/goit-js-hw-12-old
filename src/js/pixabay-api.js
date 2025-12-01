import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53390441-690cb9fa742523782d54564fc';

const DEFAULT_PARAMS = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
};




export async function getImagesByQuery(query, page = 1) {
  try {
    const params = {
      ...DEFAULT_PARAMS,
      q: query,
      page,
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
       throw error;
  }
}