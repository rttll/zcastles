const production = process.NODE_ENV === 'production';
const origin = production ? process.env.origin : '*'

// https://github.com/GoogleCloudPlatform/functions-framework-nodejs
// TODO: deploy this on build
exports.trigger = (req, res) => {

  res.set('Access-Control-Allow-Origin', origin);
  res.set('Access-Control-Allow-Methods', 'GET');

  const authorized = req.get('origin') === origin || !production;

  if (authorized) {
    getPhotos().then(function(resp) {
      let status = 200;
      if (resp.error !== undefined) {
        status = 400;
        console.log(resp.error)
      }
      res.status(status).send(resp);
    });
  } else {
    res.send(404);
  }
};

async function getPhotos() {
  if (production) return process.env.unsplash;
  const fs = require('fs');
  const path = require('path');
  const filepath = path.join(__dirname, 'secrets/unsplash.json');

  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) reject({error: err})
      resolve(JSON.parse(data))
    });
  })
}
