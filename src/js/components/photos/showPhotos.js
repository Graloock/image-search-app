import getPhotos from '../../pixabay/getPhotos';

export default async query => {
  await getPhotos(query);
};
