// import fetch from 'node-fetch';
// Search places matching a lat/long coors

import EventEmitter from 'events';

const MAX_PAGES = 4;
const api = 'http://localhost:8080/search';

class Search extends EventEmitter {
  constructor(bbox) {
    super();
    this.url = `${api}?bbox=${bbox}`;
  }

  start() {
    this._search();
  }

  _search = () => {
    fetch(this.url)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.pagination) {
          if (
            resp.pagination.nextUrl &&
            resp.pagination.currentPage < MAX_PAGES
          ) {
            this.emit('results', resp.results);
            this.url = resp.pagination.nextUrl;
            this._search();
          } else {
            this.emit('done');
          }
        } else {
          this.emit('error', resp);
        }
      })
      .catch((err) => {
        this.emit('error', err);
      });
  };
}

export { Search };
