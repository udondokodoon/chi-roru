/// <reference path="./typings/tsd.d.ts" />

// TODO: テストを書く

import * as restify from "restify";
import * as crypto from "crypto";
import * as Canvas from "canvas";

// TODO: Colorクラスにする
var color = function(str) {
  var md5 = crypto.createHash('md5');
  md5.update(str, 'utf8');
  var digest = md5.digest('hex');
  return 'rgba(' + [parseInt(digest.substr(0, 2), 16), parseInt(digest.substr(2, 2), 16), parseInt(digest.substr(4, 2), 16)].join(", ") + ", 1.0)" ;
};

function respond(req, res, next) {
  // TODO: 別関数もしくは別ミドルウェアで行う
  if (!req.url.match(/^\/([^\/]+)\.(png|jpg)$/)) {
    res.setHeader("Content-Type", "text/plain");
    res.end("image-gen");
    return next();
  }

  // TODO: 別関数もしくは別ミドルウェアで行う
  if (req.headers["if-modified-since"]) {
    var lm = new Date(req.headers["if-modified-since"]);
    lm.setTime(lm.getTime() + 86400);
    var d = lm.getTime() - (new Date()).getTime();
    if (0 < d) {
      res.writeHead(304);
      res.end("");
      return next();
    }
  }

  // TODO: 別クラスに定義して使う
  var str = decodeURIComponent(RegExp.$1);
  var ext = RegExp.$2;
  var canvas = new Canvas(128, 128);
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = color(str.split(/_/).slice(1, 2).join("_"));
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
  //ctx.strokeStype = 'rgba(0, 0, 0, 1.0)';
  ctx.shadowColor = 'rgba(8, 8, 8, 1.0)';
  ctx.shadowBlur = 10;

  str.split(/_/).concat(ext).forEach(function(s, i) {
    if (10 < s.length) {
      ctx.font = 220 / s.length + "px Impact";
    } else {
      ctx.font = "20px Impact";
    }
    ctx.fillText(s, 4, 22 + i * 22);
  });
 
  // TODO: Streamを作るところと受けとってそれを使うところで別にする。
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Last-Modified", (new Date()).toUTCString());
  var stream = canvas.pngStream();
  stream.on('data', function(chunk) {
    res.write(chunk);
  });
  stream.on('end', function() {
    res.end();
  });
}

var server = restify.createServer();
server.get('/:path', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
