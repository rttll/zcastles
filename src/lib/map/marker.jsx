import { renderToString } from 'vue/server-renderer';
import { useMapStore } from '@/stores/map';
// let urls = ['raw', 'full', 'regular', 'small', 'thumb', 'small_s3'];

const store = useMapStore();

const updateVisibility = (marker, bounds) => {
  let visible = bounds.contains(marker.getLatLng());
  store.$patch((state) => {
    const res = state.results[marker.options.locationData.id];
    if (res) res.visible = visible;
  });
};

// Returns a Promise
const getIconHtml = (img_url) => {
  const html = (
    <div
      style={`background-image: url(${img_url}); width: 2.5rem; height: 2.5rem;`}
      class='w-full -translate-x-1/2 -translate-y-1/2 h-full bg-center bg-contain rounded-full border border-gray-600 shadow-md'></div>
  );
  // renderToString returns a promise
  return renderToString(html);
};

const create = (data) => {
  return new Promise((resolve, reject) => {
    getIconHtml(data.image.urls.thumb).then((html) => {
      const icon = L.divIcon({
        className: 'block rounded-full bg-red-600',
        html: html,
      });

      const marker = L.marker(data.coordinates, {
        locationData: data,
        icon: icon,
      });

      store.$onAction(({ name, args, after }) => {
        if (name !== 'setBounds') return;
        after((bounds) => updateVisibility(marker, bounds));
      });

      resolve(marker);
    });
  });
};

export { create };
