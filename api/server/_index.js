// Local server

'use strict';

import { createServer } from 'http';
import { parse } from 'url';
import chalk from 'chalk';
import { prediction, search } from '../search/_service.js';
import { search as imageSearch } from '../images/_service.js';

const sendResponse = (res, data) => {
  let mimeType = 'application/json';
  res.writeHeader(200, { 'Content-Type': mimeType });
  res.write(JSON.stringify(data));
  res.end();
};

const handleCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  // res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
};

const handler = function (req, res) {
  handleCors(req, res);
  const { pathname, query } = parse(req.url, true);

  console.log(pathname);

  if (pathname === '/search') {
    search(query.bbox).then((resp) => {
      sendResponse(res, resp);
    });
  }

  if (pathname === '/images') {
    imageSearch(query.page).then((resp) => {
      sendResponse(res, resp);
    });
  }

  if (pathname === '/prediction') {
    prediction(query.term).then((resp) => {
      sendResponse(res, resp);
    });
  }
};

const server = createServer(handler);
const port = process.env.PORT || 8080;

console.log('\n');
console.log(
  chalk.green('  api server listening on port:') + ' ' + chalk.cyan(port)
);

server.listen(port);
