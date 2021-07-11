// API for Default
export const baseURL = page => {
  const API_BASE = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=559c8269a407c81a032fe1e7b798746b&per_page=10&page=${page}&format=json&nojsoncallback=1`;
  return API_BASE;
};

// API for Display of Images from Default API
export const ListImage = (server_id, id, secret) => {
  const API_BASE_DEFAULT = `https://live.staticflickr.com/${server_id}/${id}_${secret}.jpg`;
  return API_BASE_DEFAULT;
};

// API for Search
export const searchURL = searchTerm => {
  const API_IMAGE_SEARCH = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=559c8269a407c81a032fe1e7b798746b&user_id=193469587%40N08&tags=${searchTerm}&format=json&nojsoncallback=1`;
  return API_IMAGE_SEARCH;
};
