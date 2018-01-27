import Vue from "vue";
import Quasar from "quasar";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import {
  dom,
  event,
  openURL,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  TouchSwipe
} from "quasar";

@Component({
  name: "brother-page",
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain
  },
  directives: {
    TouchSwipe
  }
})
export default class Index extends Vue {
  enterValue = "animated slideInRight";
  leaveValue = "animated slideOutLeft";
  Brothers = [];
  mounted() {
    Brothers.getBrothers().then(data => (this.Brothers = data));
  }
  get Brother() {
    return this.Brothers[(this as any).$route.params.scroll];
  }
  get Big() {
    return this.Brother && this.Brother.big
      ? this.Brothers[this.Brother.big]
      : {};
  }
  swipeHandler(obj) {
    if (obj.distance.x > 100) {
      if (obj.direction === "right") {
        console.log("true");
        this.enterValue = "animated slideInRight";
        this.leaveValue = "animated slideOutLeft";
      } else {
        console.log("false");
        this.enterValue = "animated slideInLeft";
        this.leaveValue = "animated slideOutRight";
      }
      this.$router.push({
        path:
          "/brother/" +
          (+(this as any).$route.params.scroll +
            (obj.direction === "right" ? -1 : 1))
      });
    }
  }
  launch(url: string): void {
    openURL(url);
  }
}
