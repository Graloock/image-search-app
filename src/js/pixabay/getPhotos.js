import axios from 'axios';
const PIXABAY_API_KEY = 'nope';

export default async query => {
  await axios
    .get('https://pixabay.com/api/', {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(res => {
      return console.log(res);
    });
};
