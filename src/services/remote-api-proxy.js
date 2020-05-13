/**
 * 
 * Builds Photo and Map api requests.
 * Forwards requests to the remote service and return the response.
 * Remote service secures the api keys
 */


import axios from "axios"
import { Promise } from "core-js";

const env = process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'DEVELOPMENT'
let remoteURL = process.env[`VUE_APP_SERVICE_${env}`]

const client = (data) => {
  let url = remoteURL;
  url += `?api=${encodeURIComponent(data.url)}`
  url += `&keyNames=${data.keys}`
  return axios.get(url).then((resp) => {
    return resp
  }).catch((err) => {
    return err
  })  
}

const mapkeyNames = '[["key", "MAPQUEST_KEY"]]'

let predictionURL = 'http://www.mapquestapi.com/search/v3/prediction?limit=7&collection=address,adminArea,airport,category,franchise,poi&q='
const prediction = function(searchTerm) {
  let url = predictionURL
  url += searchTerm
  let data = {
    url: url,
    keys: mapkeyNames
  }
  return client(data)
}

let defaultMapSearchURL = 'https://www.mapquestapi.com/search/v4/place?sort=relevance&feedback=false&pageSize=10&page=1&q=church'
let mapSearchURL = null, 
    mapBBox, 
    mapSearchData = {
      results: [],
      status: null
    };

function searchMap(resolve, reject) {
  if (mapSearchURL === null) {
    mapSearchURL = `${defaultMapSearchURL}&bbox=${mapBBox}`;
  }

  let data = {
    url: mapSearchURL,
    keys: mapkeyNames
  } 

  client(data).then((resp) => {
    mapSearchData.status = resp.status
    if (resp.status === 200) {
      if (resp.data.pagination.nextUrl && resp.data.pagination.currentPage < 4) {
        mapSearchData.results = mapSearchData.results.concat(resp.data.results)
        mapSearchURL = resp.data.pagination.nextUrl;
        searchMap(resolve, reject)
      } else {
        mapSearchURL = null
        resolve(mapSearchData)
      }
    } else {
      reject(resp)
    }
  }).catch((err) => {
    reject(err)
  })
}

const search = function(bbox) {
  mapBBox = bbox;
  return new Promise((resolve, reject) => {
    searchMap(resolve, reject)
  }).then(() => {
    return mapSearchData
  })
}


const perPage = 30;
const photokeyNames = '[["client_id", "UNSPLASH_ACCESS"], ["client_secret", "UNSPLASH_SECRET"]]'
const photosURL  = `https://api.unsplash.com/collections/9881644/photos?per_page=${perPage}`//&orientation=landscape`
let page = 0, batch;

function getPhotos(resolve, reject) {
  if (page < 1) {
    page ++; 
    batch = {}
  }
  
  let data = {
    url: `${photosURL}&page=${page}`,
    keys: photokeyNames
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