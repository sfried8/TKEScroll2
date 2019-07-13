const localUrl = 'http://localhost:3000';
const awsUrl = 'https://imm30g62kg.execute-api.us-east-1.amazonaws.com/dev';
const awsGetUrl = awsUrl + '/brothers';
const awsAddUrl = awsUrl + '/brothers/add';
const awsDeleteUrl = awsUrl + '/brothers/delete';
const awsAddOfficerUrl = awsUrl + '/brothers/addOfficer';
const authenticateUrl = awsUrl + '/authenticate';
const fakeurl =
  'https://raw.githubusercontent.com/sfried8/BrotherAPI2/master/fakebrothers.json';
import { LocalStorage, Notify, Loading } from 'quasar';
import Util from './Util';
export default {
  _brothers: null,
  async addBrother(brother) {
    const url = LocalStorage.getItem('role') === 'GUEST' ? fakeurl : awsAddUrl;
    await Util.throttle(
      fetch(url, {
        method: 'POST', // *GET, PUT, DELETE, etc.
        body: JSON.stringify(brother), // must match 'Content-Type' header
        headers: new Headers({
          'Accept': 'application/json',
          'Authorization': 'key=' + (LocalStorage.getItem('apiKey') || 'GUEST'),
          'content-type': 'application/json',
        }),
      }).then(rawdata => rawdata.json()),
      500
    );
  },
  async deleteBrother(brother) {
    const url =
      LocalStorage.getItem('role') === 'GUEST' ? fakeurl : awsDeleteUrl;
    return fetch(url, {
      method: 'DELETE', // *GET, PUT, DELETE, etc.
      body: JSON.stringify(brother), // must match 'Content-Type' header
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': 'key=' + (LocalStorage.getItem('apiKey') || 'GUEST'),
        'content-type': 'application/json',
      }),
    }).then(rawdata => rawdata.json());
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
        method: 'POST', // *GET, PUT, DELETE, etc.
        body: JSON.stringify(officer), // must match 'Content-Type' header
        headers: new Headers({
          'Accept': 'application/json',
          'Authorization': 'key=' + (LocalStorage.getItem('apiKey') || 'GUEST'),
          'content-type': 'application/json',
        }),
      }).then(rawdata => rawdata.json()),
      500
    );
  },
  async getBrothers() {
    if (this._brothers == null) {
      Loading.show();
      if (LocalStorage.has('brothers')) {
        this._brothers = LocalStorage.getItem('brothers');
      }
      try {
        const password = LocalStorage.getItem('apiKey');
        let rawdata;
        if (password === 'GUEST') {
          rawdata = await fetch(fakeurl);
        } else {
          rawdata = await fetch(awsGetUrl, {
            method: 'GET', // *GET, PUT, DELETE, etc.
            headers: new Headers({
              Authorization: 'key=' + password,
            }),
          });
        }

        const data = await rawdata.json();
        if (data.error) {
          console.log(data);
          throw 'Invalid Password';
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
        data.officers.forEach(element => {
          this._brothers[+element.current].officer = element.title;
        });
        if (password !== 'GUEST') {
          LocalStorage.set('brothers', this._brothers);
        }
      } catch (error) {
        console.log(error);
        if (error === 'Invalid Password') {
          Notify.create('Invalid Password.');
        }
        if (this._brothers.length > 0) {
          Notify.create('Error retrieving brothers. Falling back to cache');
        } else {
          Notify.create('Error retrieving brothers. Go online first.');
        }
      }
      Loading.hide();
    }
    return this._brothers;
  },
  authenticate(password) {
    if (!password) {
      return Promise.resolve({ role: 'GUEST' });
    }
    return fetch(authenticateUrl, {
      method: 'GET', // *GET, PUT, DELETE, etc.
      headers: new Headers({
        Authorization: 'key=' + password,
      }),
    }).then(data => data.json());
  },
  clearCache() {
    LocalStorage.remove('brothers');
    LocalStorage.remove('apiKey');
    this._brothers = null;
  },
};
