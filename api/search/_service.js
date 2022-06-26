import fetch from 'node-fetch';
import 'dotenv/config';

const api_url =
  'http://www.mapquestapi.com/search/v3/prediction?limit=7&collection=address,adminArea,airport,category,franchise,poi';

const prediction = (term) => {
  let url = api_url;
  url += `&key=${process.env.MAPQUEST_KEY}`;
  url += `&q=${term}`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((json) => {
      return json;
    })
    .catch((err) => err);
};

export { prediction };
