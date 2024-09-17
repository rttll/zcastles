import { watch } from 'vue';
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
const getIconHtml = (data) => {
  const html = (
    <div
      style={`background-image: url(${data.image.urls.thumb}); width: 2.5rem; height: 2.5rem;`}
      class={`${
        store.focusedId === data.id ? 'border-pink-500' : 'border-gray-500'
      } border w-full -translate-x-1/2 -translate-y-1/2 h-full bg-center bg-contain rounded-full shadow-md`}
      data-foo={`x-${store.focusedId}`}></div>
  );
  // renderToString returns a promise
  return renderToString(html);
};

const create = (data) => {
  return new Promise((resolve, reject) => {
    getIconHtml(data).then((html) => {
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

      store.$subscribe((mutation, state) => {
        // console.log(mutation, state);
      });

      watch(
        () => store.focusedId,
        (is, was) => {
          const data = marker.options.locationData;
          if (is === data.id || was === data.id) {
            getIconHtml(data).then((html) => {
              const icon = L.divIcon({
                className: 'block rounded-full bg-red-600',
                html: html,
              });
              marker.setIcon(icon);
            });
          }
        }
      );

      resolve(marker);
    });
  });
};

export { create };
