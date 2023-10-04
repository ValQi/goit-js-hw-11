import axios from 'axios';
import Notiflix from 'notiflix';
import { displayImages } from './index.js';

const API = '39839158-8a8d39ceaa5479b3be9b78b67';

export async function searchImages(query, page = 1, gallery) {
  const perPage = 40; 
  const APIUrl = `https://pixabay.com/api/?key=${API}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(APIUrl);
    const data = response.data;
    const images = data.hits;
    const totalHits = data.totalHits; 

    if (images.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      displayImages(images, gallery);
    }

    return { images, totalHits, currentPage: page };
  } catch (error) {
    console.error('Error data from Pixabay API:', error);
    throw error; 
  }
}