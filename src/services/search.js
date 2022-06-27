const host = 'http://localhost:8080';
const prediction = (term) => {
  return fetch(`${host}?term=${term}`)
    .then((resp) => resp.json())
    .then((json) => json)
    .catch((err) => console.error);
};

export { prediction };
