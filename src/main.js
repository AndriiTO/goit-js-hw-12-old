    import './main.css';
    import 'izitoast/dist/css/iziToast.min.css';
    import iziToast from 'izitoast';
    import 'loaders.css/loaders.min.css';
    import { getImagesByQuery } from './js/pixabay-api';
    import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';

    const form = document.getElementById('search-form');
    const input = document.getElementById('search-text');

    form.addEventListener('submit', onSearch);

    function onSearch(e) {
    e.preventDefault();
    const query = input.value.trim();

    if (!query) {
        iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search term.',
        position: 'topRight'
        });
        return;
    }

    clearGallery();

    showLoader();

    getImagesByQuery(query)
        .then(data => {
            if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
            iziToast.info({
            title: 'Info',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight'
            });
            return;
        }

        createGallery(data.hits);
        })
        .catch(err => {
        console.error(err);
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong while fetching images. Please try again later.',
            position: 'topRight'
        });
        })
        .finally(() => {
            hideLoader();
        });
    }
