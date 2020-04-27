const axios = require('axios')

const production = process.NODE_ENV === 'production';
const origin = production ? process.env.origin : '*'

// Run locally 
// `npm run remote`

// Documentation
// https://github.com/GoogleCloudPlatform/functions-framework-nodejs

exports.trigger = (req, res) => {

  res.header('Content-Type','application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method == 'OPTIONS') {
    res.status(204).send('');
  }

  const authorized = req.get('origin') === origin || !production;
  if (!authorized) {
    res.sendStatus(403);
  } else {
    let api = req.query.api
    api += getKeys(req.query.keysNeeded)
    axios.get(api).then((resp) => {
      res.json(resp.data)
    }).catch((err) => {
      let status = err.status || 201
      res.status(status).send(err)
    })
  }
};

function getKeys(keysNeeded) {
  let keys = ''
  keysNeeded = JSON.parse(`${keysNeeded}`)
  for (let arr of keysNeeded) { 
    let key = process.env[`${arr[1]}`]
    let string = `&${arr[0]}=${key}`
    keys += string
  }
  return keys
}
