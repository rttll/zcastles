// Creates a marker. Does not add to map.
// returns marker

const create = (data) => {
  let ll = data.coordinates;
  let urls = ['raw', 'full', 'regular', 'small', 'thumb', 'small_s3'];
  // <img src="${data.url}" />
  let icon = L.divIcon({
    className: 'block rounded-full bg-red-600',
    html: `<div 
      style="background-image: url(${data.image.urls.thumb}); width: 2.5rem; height: 2.5rem;"
      class="w-full -translate-x-1/2 -translate-y-1/2 h-full bg-center bg-contain rounded-full border border-gray-600 shadow-md" 
      >
    </div>
    `,
  });

  const marker = L.marker(ll, {
    // id: data.location.place.id,
    // price: data.location.price,
    locationData: data,
    icon: icon,
  });

  return marker;
};

export { create };
