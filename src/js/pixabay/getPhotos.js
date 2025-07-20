import axios from "axios";

const PIXABAY_API_KEY = "PIXABAY_API_KEY"; //Type yours here
const IMAGE_TYPE = "photo";
const ORIENTATION = "horizontal";
const SAVE_SEARCH = true;
const PER_PAGE = 40;

export default async (query, page) => {
  return await axios
    .get("https://pixabay.com/api/", {
      params: {
        key: PIXABAY_API_KEY,
        image_type: IMAGE_TYPE,
        orientation: ORIENTATION,
        safesearch: SAVE_SEARCH,
        per_page: PER_PAGE,
        q: query,
        page: page,
      },
    })
    .then(({ data }) => {
      return data;
    });
};
