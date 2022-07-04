import fetch from 'node-fetch';

import 'dotenv/config';

const api = `https://api.unsplash.com/collections/${process.env.UNSPLASH_COLLECTION_ID}/photos`;

const search = (page = 0) => {
  const args = [
    ['page', page],
    ['per_page', 30],
    ['client_id', process.env.UNSPLASH_CLIENT_ID],
    ['client_secret', process.env.UNSPLASH_CLIENT_SECRET],
  ];
  const url = api + '?' + args.map((arr) => arr.join('=')).join('&');

  return fetch(url)
    .then((resp) => resp.json())
    .then((json) => json)
    .catch((err) => err);
};

export { search };
