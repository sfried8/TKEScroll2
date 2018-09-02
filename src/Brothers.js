const localUrl = "http://localhost:3000";
const awsUrl = "https://imm30g62kg.execute-api.us-east-1.amazonaws.com/dev";
const awsGetUrl = awsUrl + "/brothers";
const awsAddUrl = awsUrl + "/brothers/add";
const awsAddOfficerUrl = awsUrl + "/brothers/addOfficer";
const authenticateUrl = awsUrl + "/authenticate";
const fakeurl =
  "https://raw.githubusercontent.com/sfried8/BrotherAPI2/master/fakebrothers.json";
require("isomorphic-fetch");
// require("es6-promise").polyfill();
import { LocalStorage, Notify, Loading } from "quasar";
import Util from "./Util";
export default {
  _brothers: null,
  async addBrother(brother) {
    await Util.throttle(
      fetch(awsAddUrl, {
        method: "POST", // *GET, PUT, DELETE, etc.
        body: JSON.stringify(brother), // must match 'Content-Type' header
        headers: new Headers({
          Accept: "application/json",
          "content-type": "application/json"
        })
      }).then(rawdata => rawdata.json()),
      500
    );
  },
  async addBrothers(brothers) {
    Loading.show();
    for (const b of brothers) {
      await this.addBrother(b);
    }
    Loading.hide();
  },
  async addOfficer(officer) {
    return Util.throttle(
      fetch(awsAddOfficerUrl, {
        method: "POST", // *GET, PUT, DELETE, etc.
        body: JSON.stringify(officer), // must match 'Content-Type' header
        headers: new Headers({
          Accept: "application/json",
          "content-type": "application/json"
        })
      }).then(rawdata => rawdata.json()),
      500
    );
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
        const password = LocalStorage.get.item("brothersPassword");
        const rawdata = await fetch(
          password === "GUEST" ? fakeurl : awsGetUrl + "?password=" + password
        );

        const data = await rawdata.json();
        if (data.error) {
          console.log(data);
          throw "Invalid Password";
        }
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
        if (password !== "GUEST") {
          LocalStorage.set("brothers", this._brothers);
        }
      } catch (error) {
        console.log(error);
        if (error === "Invalid Password") {
          Notify.create("Invalid Password.");
        }
        if (this._brothers.length > 0) {
          Notify.create("Error retrieving brothers. Falling back to cache");
        } else {
          Notify.create("Error retrieving brothers. Go online first.");
        }
      }
      Loading.hide();
    }
    return this._brothers;
  },
  authenticate(password) {
    return fetch(authenticateUrl + "?password=" + password).then(data =>
      data.json()
    );
  },
  clearCache() {
    LocalStorage.remove("brothers");
    LocalStorage.remove("brothersPassword");
    Notify.create("Deleted cache");
  }
};
