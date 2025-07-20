"use strict"

import cardTemplate from "../templates/postTemplate.hbs";

export default function makeGallery(posts) {
  const cards = [...posts].map((post) => {
    return cardTemplate(post);
  });
  return cards.join("");
};