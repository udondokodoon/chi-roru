/// <reference path="../../typings/tsd.d.ts" />
const assert = require('power-assert');
import * as Chiroru from "../../src/chi-roru";
import fs = require("fs");

describe("Color", function() {
  describe("constructor", ()=> {
    it("は引数にハッシュ関数を選択する文字列を取ってインスタンスを返す", ()=> {
      var c: Chiroru.Chiroru.Color;
      c = new Chiroru.Chiroru.Color("md5");
    });
  });
  describe("rgbaByString", ()=> {
    var c: Chiroru.Chiroru.Color;
    before(function() {
      c = new Chiroru.Chiroru.Color("md5");
    });
    it("は引数に渡された文字列からrgbaを返す", ()=> {
      var rgba = c.rgbaFromString("hoge");
      assert(rgba === "rgba(234, 112, 62, 1.0)", "hoge => rgba(234, 112, 62, 1.0)");    });
  });
});

describe("PngStream", () => {
  describe("createFromString", () => {
    var s;
    before(() => {
      s = new Chiroru.Chiroru.PngStream(100, 100);
    });
    it ("は引数に文字列を受けとって、PngStreamを返す", (done) => {
      var stream = s.createFromString("chi-roru.png");
      var tmpFilePath = "/tmp/chi-roru.png";
      var tmpfile = fs.createWriteStream(tmpFilePath);
      stream.pipe(tmpfile);
      stream.on("end", ()=> {
      setTimeout(()=> {
        var expected = fs.readFileSync("./chi-roru.png");
        var result = fs.readFileSync(tmpFilePath);
        var len = expected.length;
        assert(expected.length === result.length);
        for(var i = 0; i < len; i++) {
          if (result[i] !== expected[i]) {
            assert(false, "result data is invalid");
            break; 
          }
        };
        done();
      }, 100);
      });  
    });
  }); 
});
