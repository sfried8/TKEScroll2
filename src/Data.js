const localUrl = 'http://localhost:3000';
const awsProdUrl = 'https://7h03kudf2b.execute-api.us-east-1.amazonaws.com';
const awsStageUrl = 'https://9r2c5g4m8g.execute-api.us-east-1.amazonaws.com'
const awsUrl = window.location.href.includes('stage--') || window.location.href.includes('localhost') ? awsStageUrl : awsProdUrl
const awsGetUrl = awsUrl + '/members';
const awsAddUrl = awsUrl + '/members/add';
const awsDeleteUrl = awsUrl + '/members/delete';
const awsAddOfficerUrl = awsUrl + '/members/addOfficer';
const authenticateUrl = awsUrl + '/authenticate';
const fakeurl =
  'https://raw.githubusercontent.com/sfried8/BrotherAPI2/master/fakebrothers.json';
import { LocalStorage, Notify, Loading } from 'quasar';
import Util from './Util';
import { ROLES, TYPES } from './model/Enums';
import Member, { UNKNOWN } from './model/Member';
export default {
  /** @type {Record<string, Member>} */
  _members: {},
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
    if (LocalStorage.has('members')) {
      const membersArray = LocalStorage.getItem('members').map(m => new Member(m));
      for (const m of membersArray) {
        this._members[m.id] = m;
      }

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
      this._members = {};
      this._members['0'] = UNKNOWN
      data.members.forEach(element => {
        const newMember = new Member(element);
        this._members[newMember.id] = newMember;
      });

      Object.values(this._members).forEach(element => {
        if (!this._members[element.bigId]) {
          element.big = UNKNOWN
        } else {
          element.big = this._members[element.bigId]
        }
        if (element !== UNKNOWN) {
          element.big.addLittle(element);
        }
      });

      data.officers.forEach(element => {
        this._members[element.current].currentOfficer = element.title.toUpperCase();
        for (const p of element.past) {
          const oldOfficer = this._members[p];
          if (!oldOfficer) {
            continue;
          }
          oldOfficer.pastOfficers.push(element.title.toUpperCase());
        }
      });
      if (password !== 'GUEST') {
        LocalStorage.set('members', Object.values(this._members).map(o => o.toJSON()));
      }
    } catch (error) {
      console.log(error);
      if (error === 'Invalid Password') {
        Notify.create('Invalid Password.');
      }
      if (Object.keys(this._members).length > 0) {
        Notify.create('Error retrieving brothers. Falling back to cache');
      } else {
        Notify.create('Error retrieving brothers. Go online first.');
      }
    }
    Loading.hide();
  },
  async getMembers() {
    await this.fetchDataPromise();
    return this._members;
  },
  async getScroll() {
    await this.fetchDataPromise();
    return Object.values(this._members).filter(m => m.type === TYPES.BROTHER && m.scroll > 0).sort((a, b) => a.scroll - b.scroll);
  },

  async authenticate(password) {
    if (!password) {
      return { role: 'GUEST' };
    }
    const data = await fetch(authenticateUrl, {
      method: 'GET', // *GET, PUT, DELETE, etc.
      headers: new Headers({
        Authorization: 'key=' + password,
      }),
    });
    return await data.json();
  },
  clearCache() {
    LocalStorage.remove('members');
    LocalStorage.remove('apiKey');
    this._members = null;
  },
};
