// import fetch from 'node-fetch';
// Search places matching a lat/long coors

const MAX_PAGES = 4;

class PlacesSearch {
  constructor(bbox) {
    this.bbox = bbox;
    this.default_url =
      'https://www.mapquestapi.com/search/v4/place?sort=relevance&feedback=false&pageSize=10&page=1&q=church';
    this.url = null;

    this.results = [];
    this.status = null;
  }

  call() {
    return new Promise((resolve, reject) => {
      this._search(resolve, reject);
    }).then(() => {
      return this.results;
    });
  }

  _search = (resolve, reject) => {
    if (this.url === null) {
      this.url = `${this.default_url}&bbox=${this.bbox}`;
    }

    fetch(this.url)
      .then((resp) => {
        this.status = resp.status;
        if (resp.status === 200) {
          if (
            resp.data.pagination.nextUrl &&
            resp.data.pagination.currentPage < MAX_PAGES
          ) {
            this.results = this.results.concat(resp.data.results);
            this.url = resp.data.pagination.nextUrl;
            this._search(resolve, reject);
          } else {
            this.url = null;
            resolve(this.results);
          }
        } else {
          reject(resp);
        }
      })
      .catch((err) => {
        reject(err);
      });
  };
}

export { PlacesSearch };
