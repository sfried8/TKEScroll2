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
  }
};
