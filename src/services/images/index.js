const api = 'http://localhost:8080/images';

const search = (page = 0) => {
  return fetch(`${api}?page=${page}`)
    .then((resp) => resp.json())
    .then((json) => json)
    .catch((err) => err);
};

export { search };
