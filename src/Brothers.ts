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
import { LocalStorage, Toast, Loading } from "quasar";
export default {
  _brothers: null,
  async getBrothers() {
    if (this._brothers == null) {
      Loading.show();
      if (LocalStorage.has("brothers")) {
        this._brothers = LocalStorage.get.item("brothers");
      }
      try {
        const rawdata = await fetch(url);

        const data = await rawdata.json();
        this._brothers = [];
        data.forEach(element => {
          this._brothers[+element.scroll] = element;
        });
        LocalStorage.set("brothers", this._brothers);
      } catch (error) {
        if (this._brothers.length > 0) {
          Toast.create("Error retrieving brothers. Falling back to cache");
        } else {
          Toast.create("Error retrieving brothers. Go online first.");
        }
        console.log(error);
      }
      setTimeout(() => {
        Loading.hide();
      }, 2000);
    }
    return this._brothers;
  }
};
