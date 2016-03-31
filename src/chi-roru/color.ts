/// <reference path="../../typings/tsd.d.ts" />

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
};
