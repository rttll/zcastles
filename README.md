# ZCastles

Skill-building project for component-based Vue app. 

## Project setup

```
npm install
```

### API's

ZCastles uses API's from Mapbox, Mapquest, and Unsplash.

You'll need an account w/ each service, and a new project in each. Read below about storing the keys.

### API Proxy

All api requests are routed through a separate serverless function to protect the keys. Out of the box, ZCastles uses my [Api Proxy](https://github.com/thisadrian/api-proxy). 

To make this work, this repo needs to know the url of the proxy, and the proxy needs the keys.

**Setup**

To setup this repo rename `.env.local.tmp` to `.env.local` and add your url's. 

There are two keynames for the proxy url's, which are `VUE_APP_SERVICE_{env}`, one for each environment. The `VUE_APP_` prefix is required so the [keys get bundled](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables) into the production build. These keys aren't really private; it's just a convenience. 

To setup the remote proxy, add a `.env.local` file w/ applicable keys in the other Api Proxy. The `.env.local.tmp` file in this repo contains all the keynames for the proxy, for easy reference. 

### Google Maps 

The initial version of ZCastles used Google Maps API's, which are faster and easier to use than Mapquest. Mapquest is free though. 

The Google Map version is way behind the current app, but the code is still accessible in the `gmap` branch.

## Development

```
npm start
```

## Build

```
npm run build
```
