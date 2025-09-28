import Util from "../Util";
import { TYPES, OFFICERS } from "./Enums";


export default class Member {
    type;
    id;
    fname;
    lname;
    typeBadge;
    /** @type {Member[]} */
    littles;
    /** @type {Member[]} */
    active;
    /** @type {string} */
    bigId;
    /** @type {Member} */
    big;
    nickname;
    scroll;
    pc;
    year;
    achievements;
    /** @type {keyof OFFICERS | undefined} */
    currentOfficer;
    /** @type {Array<keyof OFFICERS>} */
    pastOfficers;
    isZetaTau;
    /**
     * 
     * @param {Object} properties
     * @param {string} properties.id
     * @param {keyof TYPES} properties.type
     * @param {string} properties.fname
     * @param {string} properties.lname
     * @param {boolean} properties.active
     * @param {string} properties.bigId
     * @param {string|undefined} properties.nickname
     * @param {number|undefined} properties.scroll
     * @param {number|undefined} properties.pc
     * @param {number|undefined} properties.year
     * @param {Array<keyof ACHIEVEMENTS>} properties.achievements
     */
    constructor({ id, type: types, fname, lname, active, bigId, nickname, scroll, pc, year, achievements, isZetaTau }) {
        this.type = (Array.isArray(types) ? types[0] : types) || TYPES.BROTHER;
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.typeBadge = Util.typeBadge(this.type);
        this.littles = [];
        this.bigId = bigId;
        this.active = active;
        this.nickname = nickname;
        this.scroll = scroll;
        this.pc = pc;
        this.year = year;
        this.achievements = achievements;
        this.currentOfficer = undefined;
        this.pastOfficers = [];
        this.isZetaTau = isZetaTau
    }
    get displayName() {
        return this.fname + ' ' + this.lname;
    }
    get displayNameWithBadge() {
        return this.badgePrefix + this.displayName;
    }
    get badgePrefix() {
        return this.typeBadge.length > 0 ? this.typeBadge + ' ' : '';
    }
    addLittle(little) {
        this.littles = Util.sortMembers([...this.littles, little]);
    }
    toJSON() {
        const j = {
            id: this.id,
            type: this.type,
            fname: this.fname,
            lname: this.lname,
            active: this.active,
            bigId: this.bigId,
        }
        if (this.nickname) {
            j.nickname = this.nickname;
        }
        if (this.scroll) {
            j.scroll = this.scroll;
        }
        if (this.pc) {
            j.pc = this.pc;
        }
        if (this.year) {
            j.year = this.year;
        }
        if (this.achievements) {
            j.achievements = this.achievements;
        }
        if (this.isZetaTau !== undefined) {
            j.isZetaTau = this.isZetaTau;
        }
        return j
    }
}
export const UNKNOWN = new Member({ id: '0', type: [TYPES.ALL], fname: 'Unknown', lname: '', active: false, bigId: '0' });
UNKNOWN.big = null;