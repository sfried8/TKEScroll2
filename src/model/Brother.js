import Person from "./Person";
import { TYPES, ACHIEVEMENTS } from "./Enums";
export default class Brother extends Person {
    isZetaTau = false;
    /**
     * @param {Object} properties
     * @param {string} properties.id
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
    constructor({ id, fname, lname, active, bigId, nickname, scroll, pc, achievements, isZetaTau }) {
        super({ id, type: TYPES.BROTHER, fname, lname, active, bigId, nickname, scroll, pc, achievements });
        this.isZetaTau = isZetaTau
    }
}