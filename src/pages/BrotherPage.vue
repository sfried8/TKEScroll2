<template>
  <div style="width:100vw;height:80vh;overflow:hidden;">
    <div
      id="nextBrotherContainer"
      :class="cardClass"
      v-if="nextBrother"
    >
      <brother-page-content
        :brothers="Brothers"
        :brother="nextBrother"
      />
    </div>
    <div
      id="draggableWrapper"
      :class="cardClass"
      :style="cardPositioning"
      v-if="currentBrother"
      v-touch-pan.mightPrevent="panHandler"
    >
      <brother-page-content
        :brothers="Brothers"
        :brother="currentBrother"
      />
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import BrotherPageContent from "./BrotherPageContent";
import {
  dom,
  event,
  openURL,
  QLayout,
  QBtn,
  QIcon,
  TouchPan,
  QCard,
  QCardTitle,
  QCardMain
} from "quasar";

@Component({
  name: "brother-page",
  components: {
    QLayout,
    QBtn,
    QIcon,
    QCardTitle,
    QCard,
    QCardMain,
    BrotherPageContent
  },
  directives: {
    TouchPan
  }
})
export default class Index extends Vue {
  Brothers = [];
  currentBrother = null;
  showSwipe = true;
  cardPositionX = 0;
  cardPositionY = 0;
  mounted() {
    Brothers.getBrothers().then(data => {
      this.Brothers = data;
      const index = +(this.$route.params.scroll || 0);
      this.currentBrother = this.Brothers[this.$route.params.scroll];
    });
  }
  startingPosition = { top: 0, left: 0 };
  isDragging = false;
  panHandler(obj) {
    this.isDragging = true;
    if (+obj.distance.x > 30 || +obj.distance.y > 30) {
      obj.evt.preventDefault();
    }
    if (obj.isFirst) {
      this.startingPosition = obj.position;
    } else if (obj.isFinal) {
      if (
        Math.abs(this.cardPositionX) > 250 ||
        (Math.abs(this.cardPositionX) > 100 && +obj.duration < 300)
      ) {
        this.$router.push("/brother/" + this.nextBrother.scroll);
      } else {
        this.isDragging = false;
      }
      this.cardPositionX = 0;
      this.cardPositionY = 0;
    } else {
      this.cardPositionX = obj.position.left - this.startingPosition.left;
      this.cardPositionY = obj.position.top - this.startingPosition.top;
    }
  }
  get cardPositioning() {
    return {
      transform: `translate(calc(0% + ${this.cardPositionX}px),${
        this.cardPositionY
      }px)`
    };
  }
  get cardClass() {
    return (this.isDragging ? "" : "return-to-origin") + " card-container";
  }
  get nextBrother() {
    const direction = this.cardPositionX < 0 ? 1 : -1;
    return this.currentBrother
      ? this.Brothers[+this.currentBrother.scroll + direction]
      : null;
  }
}
</script>

<style lang="stylus">
.return-to-origin {
  transition: all 100ms ease-out;
}

.brother-page {
  position: absolute;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  padding: 40px;
  background: #eee;
  border: 1px #bbb solid;
}

#nextBrotherContainer {
  box-shadow: 0px 4px 20px 0px #888888;
}

.card-container {
  position: absolute;
  height: 80%;
  top: 10%;
  width: 80%;
  left: 10%;
}

.brother-page-line {
  font-weight: 300;
}
</style>
