import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.getElementById('gallery');
const loaderEl = document.querySelector('.loader'); 
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const loadMoreBtn = document.getElementById('load-more');

export function createGallery(images) {
  if (!Array.isArray(images) || images.length === 0) return;

  const markup = images
    .map(
      img => `
    <li class="gallery__item">
      <a class="gallery-link" href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${img.likes}</p>
          <p class="info-item"><b>Views:</b> ${img.views}</p>
          <p class="info-item"><b>Comments:</b> ${img.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${img.downloads}</p>
        </div>
      </a>
    </li>`
    )
    .join('');

   galleryEl.insertAdjacentHTML('beforeend', markup);

   lightbox.refresh();
}

export function clearGallery() {
  if (!galleryEl) return;
  galleryEl.innerHTML = '';
  lightbox.refresh();
}

export function showLoader() {
  if (!loaderEl) return;
  loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
  if (!loaderEl) return;
  loaderEl.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.add('is-hidden');
}

export function getGalleryElement() {
  return galleryEl;
}