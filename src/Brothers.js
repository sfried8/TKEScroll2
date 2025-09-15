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
import Brother from './model/Brother';
import { ROLES, TYPES } from './model/Enums';
import Person, { UNKNOWN } from './model/Person';
export default {
  /** @type {Brother[]|null} */
  _brothers: null,
  /** @type {Person[]|null} */
  _others: null,
  /** @type {Record<string, Person>} */
  _people: {},
  _fetchDataPromise: null,
  async addBrother(brother) {
    const url = LocalStorage.getItem('role') === ROLES.GUEST ? fakeurl : awsAddUrl;
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
      LocalStorage.getItem('role') === ROLES.GUEST ? fakeurl : awsDeleteUrl;
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
    const url = LocalStorage.getItem('role') === ROLES.GUEST ? fakeurl : awsAddOtherUrl;
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
      LocalStorage.getItem('role') === ROLES.GUEST ? fakeurl : awsDeleteOtherUrl;
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
  fetchDataPromise() {
    if (this._fetchDataPromise == null) {
      this._fetchDataPromise = this.fetchData();
    }
    return this._fetchDataPromise;
  },
  async fetchData() {
    Loading.show();
    if (LocalStorage.has('brothers')) {
      this._brothers = LocalStorage.getItem('brothers').map(b => new Brother(b));

    }
    if (LocalStorage.has('others')) {
      this._others = LocalStorage.getItem('others').map(o => new Person(o));
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
      this._others = [];
      this._brothers.push(UNKNOWN)
      this._people['0'] = UNKNOWN
      data.brothers.forEach(element => {
        element.active = element.active && (element.active == 1 || element.active == "true")
        if (element.id === undefined) {
          element.id = element.scroll
        }
        element.bigId = element.bigId || element.big
        const newBrother = new Brother(element);
        this._brothers.push(newBrother);
        this._people[newBrother.id] = newBrother;
      });
      data.others.forEach(element => {
        element.active = element.active && (element.active == 1 || element.active == "true")
        element.bigId = element.bigId || element.big
        const newOther = new Person(element);
        this._others.push(newOther);
        this._people[newOther.id] = newOther;
      });

      Object.values(this._people).forEach(element => {
        if (!this._people[element.bigId]) {
          element.big = UNKNOWN
        } else {
          element.big = this._people[element.bigId]
        }
        if (element !== UNKNOWN) {
          if (element.type === TYPES.BROTHER) {
            element.big.littles.push(element);
          } else {
            element.big.otherLittles.push(element);
          }
        }
      });

      data.officers.forEach(element => {
        this._people[element.current].currentOfficer = element.title.toUpperCase();
        for (const p of element.past) {
          const oldOfficer = this._people[p];
          if (!oldOfficer) {
            continue;
          }
          oldOfficer.pastOfficers.push(element.title.toUpperCase());
        }
      });
      if (password !== 'GUEST') {
        LocalStorage.set('brothers', this._brothers.map(b => b.toJSON()));
        LocalStorage.set('others', this._others.map(o => o.toJSON()));
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
  },
  async getBrothers() {
    await this.fetchDataPromise();
    return this._brothers;
  },
  async getOthers() {
    await this.fetchDataPromise();
    return this._others;
  },
  async getPeople() {
    await this.fetchDataPromise();
    return this._people;
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
