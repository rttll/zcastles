import leaflet from 'leaflet';

import * as Popup from './popup';
import * as Tiles from './tiles';

class Map {
  constructor(id, options = {}) {
    this._map = L.map(id, {
      zoomControl: false,
      zoom: 14,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(this._map);
    L.tileLayer(Tiles.url, Tiles.options).addTo(this._map);

    if (options.debug) {
      this._map.on('click', (e) => {
        console.log(this._map.getCenter());
      });
    }
  }

  get self() {
    return this._map;
  }

  get popup() {
    return {
      create: (data) => {
        const popup = Popup.create(data);
        return popup;
      },
    };
  }

  setView() {
    let hash = window.location.hash;
    let view;
    // if (hash === '') {
    //   view = [37.69097298486733, -122.43164062500001]; // sfo
    // } else {
    //   hash = hash.substr(1).split('/');
    //   view = [hash[1], hash[2]];
    // }
    view = [37.69097298486733, -122.43164062500001]; // sfo
    this._map.setView(view);
  }
}

export { Map };
