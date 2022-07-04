import fetch from 'node-fetch';
import 'dotenv/config';

const base_url = 'https://www.mapquestapi.com/search';

const prediction = (term) => {
  let url = `${base_url}/v3/prediction?limit=7&collection=address,adminArea,airport,category,franchise,poi`;
  url += `&key=${process.env.MAPQUEST_KEY}`;
  url += `&q=${term}`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((json) => {
      return json;
    })
    .catch((err) => err);
};

const search = (bbox) => {
  let url = `${base_url}/v4/place?sort=relevance&feedback=false&pageSize=10&page=1&q=church`;
  url += `&bbox=${bbox}`;
  url += `&key=${process.env.MAPQUEST_KEY}`;
  return fetch(url)
    .then((resp) => {
      return resp.json();
    })
    .then((json) => json)
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export { prediction, search };
