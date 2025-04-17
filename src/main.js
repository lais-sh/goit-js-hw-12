import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

hideLoader();

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = form.elements.searchQuery.value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  await fetchAndRenderImages();
});

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    await fetchAndRenderImages();
  });
}

async function fetchAndRenderImages() {
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0 && currentPage === 1) {
      iziToast.info({
        title: '😔',
        message: 'No images found. Try a different keyword.',
      });
      return;
    }

    createGallery(data.hits);

    const maxPage = Math.ceil(totalHits / 16);
    if (currentPage < maxPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: '📦',
        message: "We're sorry, but you've reached the end of search results.",
      });

    const remainder = data.hits.length % 4;
    if (remainder !== 0) {
     const missing = 4 - remainder;
     const placeholders = Array.from({ length: missing }, () => {
      const li = document.createElement('li');
      li.classList.add('gallery-item', 'placeholder');
      gallery.appendChild(li);
        });
        placeholders.forEach(p => gallery.appendChild(p));
      }
    }

    if (currentPage > 1) {
      smoothScroll();
    }

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  } finally {
    setTimeout(() => {
      hideLoader();
    }, 500);
  }
}

function smoothScroll() {
  const card = document.querySelector('.gallery li');
  if (!card) return;

  const cardHeight = card.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
