/// <reference path="./typings/tsd.d.ts" />

import * as restify from "restify";
import * as Chiroru from "./src/chi-roru";

function defaultHandler(req: restify.Request, res: restify.Response, next: restify.Next): any {
  res.setHeader("Content-Type", "text/plain");
  res.end("image-gen");
  next();
}

function imageHandler(req: restify.Request, res: restify.Response, next: restify.Next): any {
  res.setHeader("Content-Type", "image/png");
  var stream = (new Chiroru.Chiroru.PngStream(128, 128)).createFromString(decodeURIComponent(req.params[0]));
  stream.on('data', function(chunk: Buffer) {
    res.write(chunk);
  });
  stream.on('end', function() {
    res.end();
  });
}

var server = restify.createServer();

// CORS 対応
server.use(restify.CORS({
  origins: ["*"],              // ['https://foo.com', 'http://bar.com', 'http://baz.com:8081'], 
  credentials: false,          // cookie による認証なし
  headers: []                  // クライアントが送るヘッダー必要なし 
}));

// Last-Modified, Etag対応
server.use(function setETag(req: restify.Request, res: restify.Response, next: restify.Next) {
  res.header('Last-Modified', new Date());
  return next();
});
server.use(restify.conditionalRequest());

// ルーティング
server.get(/^\/([^\.]+.(?:png|jpg))/, imageHandler);
server.get('/:path', defaultHandler);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
