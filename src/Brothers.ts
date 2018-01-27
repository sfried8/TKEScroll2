interface Brother {
  scroll: number;
  fname: string;
  lname: string;
  pc: number;
  nickname: string;
  big: number;
  active: boolean;
  isZetaTau: boolean;
}
const url =
  "https://raw.githubusercontent.com/sfried8/BrotherAPI2/master/brothers.json";
require("isomorphic-fetch");
require("es6-promise").polyfill();
export default {
  _brothers: null,
  async getBrothers() {
    if (this._brothers == null) {
      const rawdata = await fetch(url);
      const data = await rawdata.json();
      this._brothers = [];
      data.forEach(element => {
        this._brothers[+element.scroll] = element;
      });
      console.log(this._brothers);
    }
    return this._brothers;
  }
};
