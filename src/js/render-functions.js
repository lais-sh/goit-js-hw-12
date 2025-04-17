import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loaderText = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images
    .map(image => {
      if (image.isPlaceholder) {
        return `<li class="gallery-item placeholder"></li>`;
      }

      return `
        <li class="gallery-item">
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p>👍 ${image.likes}</p>
            <p>👁️ ${image.views}</p>
            <p>💬 ${image.comments}</p>
            <p>⬇️ ${image.downloads}</p>
          </div>
        </li>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loaderText.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderText.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.add('is-hidden');
}
