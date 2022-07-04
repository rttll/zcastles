import fetch from 'node-fetch';
import { Firestore, BulkWriter } from '@google-cloud/firestore';

import 'dotenv/config';

const api = `https://api.unsplash.com/collections/${process.env.UNSPLASH_COLLECTION_ID}/photos`;

const search = (page = 0) => {
  const store = new Firestore({
    projectId: 'castlez',
    keyFilename: 'keys/castlez-cf373a14203f.json',
  });
  // castlez-576c3b169477.json
  // const writer = store.bulkWriter();
  // console.log(writer);
  const doc = store.doc('images/foo');
  doc
    .set({
      title: 'foooo',
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.error(err);
    });

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
