const localUrl = 'http://localhost:3000';
const awsProdUrl = 'https://7h03kudf2b.execute-api.us-east-1.amazonaws.com';
const awsStageUrl = 'https://9r2c5g4m8g.execute-api.us-east-1.amazonaws.com'
const awsUrl = window.location.href.includes('stage--') || window.location.href.includes('localhost') ? awsStageUrl : awsProdUrl
const awsGetUrl = awsUrl + '/brothers';
const awsAddUrl = awsUrl + '/brothers/add';
const awsAddOtherUrl = awsUrl + '/brothers/addOther';
const awsDeleteUrl = awsUrl + '/brothers/delete';
const awsDeleteOtherUrl = awsUrl + '/brothers/deleteOther';
const awsAddOfficerUrl = awsUrl + '/brothers/addOfficer';
const authenticateUrl = awsUrl + '/authenticate';
const fakeurl =
  'https://raw.githubusercontent.com/sfried8/BrotherAPI2/master/fakebrothers.json';
import { LocalStorage, Notify, Loading } from 'quasar';
import Util from './Util';
export default {
  _brothers: null,
  _others: null,
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
      method: 'POST', // *GET, PUT, DELETE, etc.
      body: JSON.stringify(brother), // must match 'Content-Type' header
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': 'key=' + (LocalStorage.getItem('apiKey') || 'GUEST'),
        'content-type': 'application/json',
      }),
    }).then(rawdata => rawdata.json());
  },
  async addOther(other) {
    const url = LocalStorage.getItem('role') === 'GUEST' ? fakeurl : awsAddOtherUrl;
    await Util.throttle(
      fetch(url, {
        method: 'POST', // *GET, PUT, DELETE, etc.
        body: JSON.stringify(other), // must match 'Content-Type' header
        headers: new Headers({
          'Accept': 'application/json',
          'Authorization': 'key=' + (LocalStorage.getItem('apiKey') || 'GUEST'),
          'content-type': 'application/json',
        }),
      }).then(rawdata => rawdata.json()),
      500
    );
  },
  async deleteOther(other) {
    const url =
      LocalStorage.getItem('role') === 'GUEST' ? fakeurl : awsDeleteOtherUrl;
    return fetch(url, {
      method: 'POST', // *GET, PUT, DELETE, etc.
      body: JSON.stringify(other), // must match 'Content-Type' header
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
      if (LocalStorage.has('others')) {
        this._others = LocalStorage.getItem('others');
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
        this._others = { data: {} };
        this._brothers.push({
          scroll: 0,
          fname: 'None',
          lname: 'None',
          active: false,
          big: 0
        })
        data.brothers.forEach(element => {
          element.active = element.active && (element.active == 1 || element.active == "true")
          this._brothers[+element.scroll] = element;
        });
        data.others.forEach(element => {
          for (const t of element.type) {
            if (!this._others[t]) {
              this._others[t] = [];
            }
            this._others[t].push(element.id);
            this._others.data[element.id] = element;
          }
        });

        this._brothers.forEach(element => {
          if (!this._brothers[+element.big]) {
            element.big = 0
          }
          if (!this._brothers[+element.big].littles) {
            this._brothers[+element.big].littles = [];
          }
          if (element.scroll !== element.big)
            this._brothers[+element.big].littles.push(element.scroll);
          element.displayName = element.scroll == 0 ? 'Unknown' : `${element.fname} ${element.lname}`
        });
        for (const type in this._others) {
          if (type == 'data') {
            continue
          }
          this._others[type].forEach(elementId => {
            const element = this._others.data[elementId];
            const displayIcons = element.type.map(t => {
              return {
                SWEETHEART: '❤️',
                LITTLE_SISTER: '❤️',
                HONORARY: '🎖️',
              }[t];
            }).join(' ') + (element.type.length > 0 ? ' ' : '');
            element.displayName = `${displayIcons}${element.fname} ${element.lname}`
            // if (element.scroll) {
            //   this._brothers[+element.scroll] = element;
            // }
            if (!this._brothers[+element.big]) {
              element.big = 0
            }
            if (!this._brothers[+element.big].otherLittles) {
              this._brothers[+element.big].otherLittles = {};
            }
            if (!this._brothers[+element.big].otherLittles[type]) {
              this._brothers[+element.big].otherLittles[type] = [];
            }
            this._brothers[+element.big].otherLittles[type].push(elementId);

          });
        }
        data.officers.forEach(element => {
          this._brothers[+element.current].officer = element.title;
          for (const p of element.past) {
            const oldOfficer = this._brothers[+p];
            if (!oldOfficer) {
              continue;
            }
            if (!oldOfficer.pastOfficers) {
              oldOfficer.pastOfficers = [];
            }
            oldOfficer.pastOfficers.push(element.title);
          }
        });
        if (password !== 'GUEST') {
          LocalStorage.set('brothers', this._brothers);
          LocalStorage.set('others', this._others);
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
  async getOthers() {
    if (this._others == null) {
      await this.getBrothers();
    }
    return this._others.data;
  },
  async getOthersOfType(type) {
    if (this._others == null) {
      await this.getBrothers();
    }
    return this._others[type].map(element => this._others.data[element]);
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
