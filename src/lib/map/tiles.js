var mbToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=${mbToken}`;
const options = {
  maxZoom: 18,
  attribution:
    'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  detectRetina: false,
};

export { url, options };
