import { renderToString } from 'vue/server-renderer';
import { decimal, delimiters } from '../util';

const content = (data) => {
  // <img src="${data.location.photo.urls.thumb}" />
  const html = (
    <div class='content'>
      <p>${decimal(data.location.price)}</p>
      <p class='whitespace-nowrap m-0'>
        {data.location.bedrooms} bed. {data.location.bathrooms} ba.
      </p>
      <p class=''>{delimiters(data.location.sqft)} sq ft.</p>
    </div>
  );
  // renderToString returns a promise
  return renderToString(html);
};

const create = async (data) => {
  const coordinates = data.location.place.geometry.coordinates;
  return L.popup({
    id: data.location.place.id,
    autoPan: false,
    closeButton: false,
    // minWidth: 'x', // Prevents leaflet setting width. Width was not accurate
  })
    .setLatLng([coordinates[0], coordinates[1]])
    .setContent(await content(data));
};

export { create };
