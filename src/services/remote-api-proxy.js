/**
 * 
 * Builds Photo and Map api requests.
 * Forwards requests to the remote service and return the response.
 * Remote service secures the api keys
 */


import axios from "axios"

const env = process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'DEVELOPMENT'
let remoteURL = process.env[`VUE_APP_SERVICE_${env}`]

const client = (data) => {
  let url = remoteURL;
  url += `?api=${encodeURIComponent(data.url)}`
  url += `&keysNeeded=${data.keys}`
  return axios.get(url).then((resp) => {
    return resp
  }).catch((err) => {
    return err
  })  
}

const mapKeysNeeded = '[["key", "MAPQUEST_KEY"]]'

let predictionURL = 'http://www.mapquestapi.com/search/v3/prediction?limit=7&collection=address,adminArea,airport,category,franchise,poi&q='
const prediction = function(searchTerm) {
  let url = predictionURL
  url += searchTerm
  let data = {
    url: url,
    keys: mapKeysNeeded
  }
  return client(data)
}

let mapSearchURL = 'https://www.mapquestapi.com/search/v4/place?sort=relevance&feedback=false&pageSize=10&page=1&q=church'
const search = function(bbox) {
  let url = mapSearchURL
  url += `&bbox=${bbox}`
  let data = {
    url: url,
    keys: mapKeysNeeded
  } 
  return client(data)
}

const perPage = 30;
const photoKeysNeeded = '[["client_id", "UNSPLASH_ACCESS"], ["client_secret", "UNSPLASH_SECRET"]]'
const photosURL  = `https://api.unsplash.com/collections/9881644/photos?per_page=${perPage}`//&orientation=landscape`
let page = 0, batch;

function getPhotos(resolve, reject) {
  if (page < 1) {
    page ++; 
    batch = {}
  }
  
  let data = {
    url: `${photosURL}&page=${page}`,
    keys: photoKeysNeeded
  }

  client(data).then((resp) => {
    resp.data.forEach((item) => {
      item.mapPlaces = []
      batch[item.id] = item
    })
    if (resp.data.length < perPage ) {
      resolve()
    } else {
      page++
      getPhotos(resolve, reject)
    }
  })
}

const photos = function() {
  return new Promise((resolve, reject) => {
    getPhotos(resolve, reject)
  }).then(() => {
    return batch
  })
}

const remote = {
  prediction: prediction,
  search: search,
  photos: photos
}

export default remote