import showPosts from "./js/components/posts/showPosts";

document.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("input");
  const catGallery = document.querySelector(".cat-gallery");

  if (searchInput.value === "") return;

  catGallery.innerHTML = "";
  await showPosts(searchInput.value);
});
