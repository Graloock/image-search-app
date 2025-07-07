import getPhotos from "../../pixabay/getPhotos";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import cardTemplate from "../templates/postTemplate.hbs";
import _ from "lodash";

const catGallery = document.querySelector(".cat-gallery");
let isLoading = false;

class Posts {
  constructor(query) {
    this.query = query;
    this.page = 1;
  }

  loadPosts = async () => {
    const post = await getPhotos(this.query, this.page);
    if (this.page === 1) {
      this.total = post.total;
      this.maximumPosts = post.totalHits;
      Notify.success(`Found ${this.total} photos!`);
      if (this.total > this.maximumPosts)
        Notify.warning(
          `However, due to Pixabay API rules, we cannot show more than ${this.maximumPosts} photos.`,
        );
    }
    this.page++;
    return post.hits;
  };
}

const makeGallery = (posts) => {
  console.log(posts);
  const cards = [...posts].map((post) => {
    return cardTemplate(post);
  });
  return cards.join("");
};

export default async (query) => {
  const posts = new Posts(query);
  catGallery.innerHTML += makeGallery(await posts.loadPosts());

  window.addEventListener("scroll", async () => {
    const { scrollY, innerHeight } = window;
    const { scrollHeight } = document.documentElement;

    if (scrollY + innerHeight > scrollHeight - 100) {
      isLoading = true;
      catGallery.innerHTML += makeGallery(await posts.loadPosts());
      isLoading = false;
    }
  });
};
