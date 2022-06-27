import { PlacesSearch } from './_places';

const host = 'http://localhost:8080';

// Search places match a search term
const prediction = (term) => {
  return fetch(`${host}?term=${term}`)
    .then((resp) => resp.json())
    .then((json) => json)
    .catch((err) => console.error);
};

const places = (bbox) => {
  const search = new PlacesSearch(bbox);
  return search.call();
  // return new Promise((resolve, reject) => {
  //   _search(resolve, reject);
  // }).then(() => {
  //   return mapSearchData;
  // });
};

export { prediction, places };
