/// <reference path="../typings/tsd.d.ts" />
const Canvas = require("canvas");
import * as restify from "restify";
import * as crypto from "crypto";

export namespace Chiroru {
  export class Color {
    hashDriver: crypto.Hash;
    constructor(argorithm: string) {
      this.hashDriver = crypto.createHash(argorithm);
    }
    rgbaFromString(str: string): string {
      this.hashDriver.update(str, 'utf8');
      var digest = this.hashDriver.digest('hex');
      return 'rgba(' + [parseInt(digest.substr(0, 2), 16), parseInt(digest.substr(2, 2), 16), parseInt(digest.substr(4, 2), 16)].join(", ") + ", 1.0)" ;
    };   
  };
  
  export class PngStream {
    width: number;
    height: number;
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }
    createFromString(str: String): NodeJS.ReadableStream {
      var canvas = new Canvas(this.width, this.height);
      var ctx = canvas.getContext("2d");
      var color = new Color("md5");
      ctx.fillStyle = color.rgbaFromString(str.split(/_/).slice(1, 2).join("_"));
      ctx.fillRect(0, 0, 128, 128);
      ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
      //ctx.strokeStype = 'rgba(0, 0, 0, 1.0)';
      ctx.shadowColor = 'rgba(8, 8, 8, 1.0)';
      ctx.shadowBlur = 10;

      str.split(/[_\.]/).forEach(function(s, i) {
        if (10 < s.length) {
          ctx.font = 220 / s.length + "px Impact";
        } else {
          ctx.font = "20px Impact";
        }
        ctx.fillText(s, 4, 22 + i * 22);
      });
      return canvas.pngStream();
    }
  }
} 
