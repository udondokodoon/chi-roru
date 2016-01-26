/// <reference path="../typings/tsd.d.ts" />

import * as assert from 'power-assert';
import * as Chiroru from '../src/chi-roru';

describe("SampleClass", ()=>{
  it("hogehoeg", ()=>{
    assert(Chiroru);
    assert(Chiroru.Sample);
  });
  context("sampleMethod()", ()=>{
    it("は 必ずtrueを返す", ()=>{
      const a = Chiroru.Sample.sampleMethod();
      assert(a);
    });
  });
});
