import leaflet from 'leaflet';

import { create as createMarker } from './marker';
import { create as createPopup } from './popup';

class Map {
  constructor(id) {
    this._map = L.map(id, {
      zoomControl: false,
      zoom: 14,
    });

    const zoom = L.control.zoom({ position: 'bottomright' }).addTo(this._map);

    var mbToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=${mbToken}`,
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        detectRetina: false,
      }
    ).addTo(this._map);
  }

  get self() {
    return this._map;
  }

  get marker() {
    return {
      create: (data) => {
        const marker = createMarker(data);
        marker.addTo(this._map);
        return marker;
      },
    };
  }

  get popup() {
    return {
      create: (data) => {
        const popup = createPopup(data);
        return popup;
      },
    };
  }

  set() {
    let hash = window.location.hash;
    let view;
    if (hash === '') {
      view = [37.69097298486733, -122.43164062500001]; // sfo
    } else {
      hash = hash.substr(1).split('/');
      view = [hash[1], hash[2]];
    }
    this._map.setView(view);
  }
}

export { Map };
