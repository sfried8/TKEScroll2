<template>
  <div class="layout-padding">
    <help-overlay help-id="brotherPage">

      <div
        class="column justify-center items-center"
        style="height:100%"
      >
        <img
          class="col-3 self-center"
          src="~/assets/swipe.png"
        />
        <p
          class="col-2 self-center text-h5"
          style="text-align:center"
        >
          Swipe left and right to navigate. It's just like Tinder!

        </p>
      </div>
    </help-overlay>
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
  import BrotherPageContent from "./BrotherPageContent";
  import BrotherInfoMixin from "../mixins/BrotherInfoMixin.js";
  export default {
    components: { BrotherPageContent },
    mixins: [BrotherInfoMixin],
    data() {
      return {
        currentScroll: this.$route.params.scroll,
        showSwipe: true,
        cardPositionX: 0,
        cardPositionY: 0,
        startingPosition: { top: 0, left: 0 },
        isDragging: false,
        direction: 1
      };
    },
    methods: {
      panHandler(obj) {
        this.isDragging = true;
        // if (+obj.distance.x > 30 || +obj.distance.y > 30 || +obj.duration > 500) {
        obj.evt.preventDefault();
        // }
        if (obj.isFirst) {
          this.startingPosition = obj.position;
        } else if (obj.isFinal) {
          if (
            this.nextBrother &&
            (Math.abs(this.cardPositionX) > 250 ||
              (Math.abs(this.cardPositionX) > 100 && +obj.duration < 300))
          ) {
            this.$router.push("/brother/" + this.nextBrother.scroll);
          } else {
            this.isDragging = false;
          }
          this.cardPositionX = 0;
          this.cardPositionY = 0;
        } else {
          this.cardPositionX = obj.position.left - this.startingPosition.left;
          this.cardPositionY =
            100 *
              this.$util.sigmoid(
                (obj.position.top - this.startingPosition.top) / 100
              ) -
            50;
        }
        if (this.cardPositionX !== 0) {
          this.direction = this.cardPositionX < 0 ? 1 : -1;
        }
      }
    },
    computed: {
      currentBrother() {
        return this.Brothers[this.currentScroll];
      },
      cardPositioning() {
        return {
          transform: `translate(calc(0% + ${this.cardPositionX}px),${
            this.cardPositionY
          }px)`,
          opacity: Math.max(
            0,
            1 - Math.max(Math.abs(this.cardPositionX) - 100, 0) / 150
          )
        };
      },
      cardClass() {
        return (this.isDragging ? "" : "return-to-origin") + " card-container";
      },
      nextBrother() {
        return this.currentBrother &&
          +this.currentBrother.scroll + this.direction > 0
          ? this.Brothers[+this.currentBrother.scroll + this.direction]
          : null;
      }
    }
  };
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
    background: #fff;
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
