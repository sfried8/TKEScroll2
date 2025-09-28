import { TYPES } from "./model/Enums";

export default {
  prettyJoinList: function (list) {
    if (list.length < 1) {
      return "";
    }
    if (list.length === 1) {
      return list[0];
    }
    if (list.length === 2) {
      return `${list[0]} and ${list[1]}`;
    }
    return list.slice(0, -2).join(", ") + ", and " + list[list.length - 1];
  },
  pause: function (millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  },
  throttle: function (func, minimumTimeInMillis) {
    return Promise.all([func, this.pause(minimumTimeInMillis)]);
  },
  sigmoid: t => 1 / (1 + Math.pow(Math.E, -5 * t)),
  pledgeClassName: (pc, isZetaTau, plural) => {
    if (pc === 0) {
      return "Pledge Class Unknown"
    }
    if (pc === 999 && isZetaTau) {
      return "Zeta Tau Founder" + (plural ? "s" : "")
    }
    return (isZetaTau ? "Zeta Tau " : "") + "Pledge Class " + pc;
  },
  typeBadge: (type) => {
    const cleanType = type.replace(/[^a-zA-Z]/g, '').toUpperCase();
    return {

      [TYPES.LITTLESISTER]: '♥️',
      [TYPES.SWEETHEART]: '♥️',
      [TYPES.HONORARY]: '🎖️',
      [TYPES.BROTHER]: '',

    }[cleanType]
  },
  stableSort: (arr, compare) => arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item),

  sortMembers: (members) => {
    return [...members].sort((a, b) => {
      if (a.id === '0') {
        return -1;
      }
      if (b.id === '0') {
        return 1;
      }
      if (a.scroll && b.scroll) {
        return a.scroll - b.scroll
      }
      if (a.scroll) {
        return -1;
      }
      if (b.scroll) {
        return 1;
      }
      if (a.year && b.year) {
        return a.year - b.year
      }
      if (a.year) {
        return -1;
      }
      if (b.year) {
        return 1;
      }
      return a.displayName.localeCompare(b.displayName);
    });
  },
};
