import showPhotos from './js/components/photos/showPhotos';

document.addEventListener('submit', async e => {
  const searchInput = document.querySelector('input');
  e.preventDefault();
  await showPhotos(searchInput.value);
});
