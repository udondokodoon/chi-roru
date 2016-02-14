/// <reference path="../../typings/tsd.d.ts" />
const assert = require('power-assert');
import * as Chiroru from "../../src/chi-roru/color";

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
      assert(rgba === "rgba(234, 112, 62, 1.0)", "hoge => rgba(234, 112, 62, 1.0)");
    });
  });
});

