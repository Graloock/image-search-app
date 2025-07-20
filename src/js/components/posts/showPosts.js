"use strict"

import { Notify } from "notiflix/build/notiflix-notify-aio";
import getPhotos from "../../pixabay/getPhotos";
import makeGallery from "./makeGallery";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const PER_PAGE = 40;
const catGallery = document.querySelector(".cat-gallery");
let isLoading = false;

class Posts {
  constructor(query) {
    this.query = query;
    this.page = 1;
    this.hasMore = true;
  }

  loadPosts = async () => {
    const post = await getPhotos(this.query, this.page);
    if (this.page === 1) {
      this.maximumPosts = post.totalHits;
      if (this.maximumPosts === 0) {
        this.hasMore = false;
        return Notify.failure(
          "Sorry, there are no images matching your search query. Please try again.",
        );
      }
      Notify.success(`Hooray! We found ${this.maximumPosts} images.`);
    }
    if (this.page * PER_PAGE <= this.maximumPosts) this.page++;
    else {
      this.hasMore = false;
      Notify.warning(
        "We're sorry, but you've reached the end of search results.",
      );
    }
    return post.hits;
  };
}

export default async (query) => {
  const posts = new Posts(query);
  catGallery.innerHTML += makeGallery(await posts.loadPosts());
  const gallery = new SimpleLightbox("a");

  catGallery.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("image"))
      gallery.open();
  });

  window.addEventListener("scroll", async () => {
    const { scrollY, innerHeight } = window;
    const { scrollHeight } = document.documentElement;

    if (scrollY + innerHeight > scrollHeight - 100) {
      if (isLoading || !posts.hasMore) return;
      isLoading = true;
      catGallery.innerHTML += makeGallery(await posts.loadPosts());
      gallery.refresh();
      isLoading = false;
    }
  });
};
