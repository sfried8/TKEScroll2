<template>
<keep-alive>
      <transition :enter-active-class="enterValue"
    :leave-active-class="leaveValue">
    <div v-touch-swipe.horizontal="swipeHandler">
      <router-view :Brothers="Brothers" />
    </div>
    </transition>
</keep-alive>
</template>

<script lang="ts">
import Vue from "vue";
import Quasar from "quasar";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import BrotherPageContent from "./BrotherPageContent.vue";
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
    QItemMain,
    BrotherPageContent
  },
  directives: {
    TouchSwipe
  }
})
export default class Index extends Vue {
  enterValue = "";
  leaveValue = "animated slideOutLeft";
  Brothers = [];
  mounted() {
    console.log("mounting brother page");
    Brothers.getBrothers().then(data => (this.Brothers = data));
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
      (this as any).$router.push({
        path:
          "" +
          (+(this as any).$route.params.scroll +
            (obj.direction === "right" ? -1 : 1))
      });
    }
  }
  launch(url: string): void {
    openURL(url);
  }
}
</script>

<style lang="stylus">
</style>
