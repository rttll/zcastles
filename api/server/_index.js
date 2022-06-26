// Local server

'use strict';

import { createServer } from 'http';
import { parse } from 'url';
import { prediction } from '../search/_service.js';

const sendResponse = (res, data) => {
  let mimeType = 'application/json';
  res.writeHeader(200, { 'Content-Type': mimeType });
  res.write(JSON.stringify(data));
  res.end();
};

const cors = (req, res) => {
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
  cors(req, res);
  const { pathname, query } = parse(req.url, true);

  prediction(query.term).then((resp) => {
    sendResponse(res, resp);
  });

  return;
  try {
    const route = routes[pathname];
    let method = controller[route];
    method(req, res, query);
  } catch (err) {
    // html catch-all (e.g /terms), and 404
    let ext = pathname.split('.').slice(-1)[0],
      data = null;
    if (ext === 'html') {
      let base = getFile(`./public/${pathname}`);
      data = parseTemplates(base);
    }

    sendResponse(res, { [ext]: data });
  }
};

const server = createServer(handler);
const port = process.env.PORT || 8080;
console.log('listening on port ' + port);

server.listen(port);
