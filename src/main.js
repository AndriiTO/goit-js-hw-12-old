import './main.css';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  getGalleryElement,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.getElementById('load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;
  hideLoadMoreButton();
  clearGallery();

  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;

    // додаємо першу порцію
    createGallery(data.hits);

    iziToast.success({
      title: 'Success',
      message: `Hooray! We found ${totalHits} images.`,
      position: 'topRight',
    });

    const perPage = 15;
    if (currentPage * perPage < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message:
        'Something went wrong while fetching images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  hideLoadMoreButton();
  showLoader();

  currentPage += 1;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
        iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);

    scrollAfterLoad();

    const perPage = 15;
    const loadedSoFar = currentPage * perPage;
    if (loadedSoFar >= totalHits) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message:
        'Something went wrong while fetching more images. Please try again later.',
      position: 'topRight',
    });
       showLoadMoreButton();
  } finally {
    hideLoader();
  }
}

function scrollAfterLoad() {
  const galleryEl = getGalleryElement();
  const firstCard = galleryEl.querySelector('.gallery__item');
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
    window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}