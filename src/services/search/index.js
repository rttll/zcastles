const host = 'http://localhost:8080';

// Search places match a search term
const prediction = (term) => {
  return fetch(`${host}?term=${term}`)
    .then((resp) => resp.json())
    .then((json) => json)
    .catch((err) => err);
};

export { prediction };
