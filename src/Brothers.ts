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

const localUrl = "http://localhost:3000";
const awsUrl = "https://91m1lypdhh.execute-api.us-east-1.amazonaws.com/dev";
const awsGetUrl = localUrl + "/brothers";
const awsAddUrl = localUrl + "/brothers/add";
const url =
  "https://raw.githubusercontent.com/sfried8/BrotherAPI2/master/brothers.json";
require("isomorphic-fetch");
require("es6-promise").polyfill();
import { LocalStorage, Toast, Loading } from "quasar";
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default {
  _brothers: null,
  async addBrother(brother) {
    Loading.show({
      message: "Adding Brother"
    });
    const rawdata = await fetch(awsAddUrl, {
      method: "POST", // *GET, PUT, DELETE, etc.
      body: JSON.stringify(brother), // must match 'Content-Type' header
      headers: new Headers({
        Accept: "application/json",
        "content-type": "application/json"
      })
    });

    const data = await rawdata.json();
    await timeout(500);
    Loading.hide();
  },
  getTreeString(scroll) {
    const brother = this._brothers[scroll];
    if (brother.treeString) {
      return brother.treeString;
    }
    if (brother.big === 0) {
      brother.treeString = "0." + brother.fname + " " + brother.lname;
      return brother.treeString;
    }
    brother.treeString =
      this.getTreeString(brother.big) +
      "." +
      brother.fname.replace(".", "") +
      " " +
      brother.lname.replace(".", "");
    return brother.treeString;
  },
  async getBrothers() {
    if (this._brothers == null) {
      Loading.show();
      if (LocalStorage.has("brothers")) {
        this._brothers = LocalStorage.get.item("brothers");
      }
      try {
        const rawdata = await fetch(awsGetUrl);

        const data = await rawdata.json();
        this._brothers = [];
        data.brothers.forEach(element => {
          this._brothers[+element.scroll] = element;
        });

        this._brothers.forEach(element => {
          if (!this._brothers[+element.big].littles) {
            this._brothers[+element.big].littles = [];
          }
          if (element.scroll !== element.big)
            this._brothers[+element.big].littles.push(element.scroll);
        });
        this._brothers.forEach(element => {
          if (element.scroll !== element.big)
            this.getTreeString(+element.scroll);
        });
        data.officers.forEach(element => {
          this._brothers[+element.current].officer = element.title;
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
      Loading.hide();
    }
    return this._brothers;
  },
  clearCache() {
    LocalStorage.remove("brothers");
  }
};
