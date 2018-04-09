export default {
  prettyJoinList: function(list: string[]): string {
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
  pause: function(millis: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, millis));
  },
  throttle: function(func: Promise<any>, minimumTimeInMillis: number) {
    return Promise.all([func, this.pause(minimumTimeInMillis)]);
  }
};
