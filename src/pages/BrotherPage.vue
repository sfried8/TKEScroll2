<template>
  <div class="layout-padding">
    <help-overlay help-id="brotherPage">
      <template #mobile>

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
      </template>
      <template #desktop>

        <div
          class="column justify-center items-center"
          style="height:100%"
        >
          <img
            class="col-3 self-center"
            src="~/assets/arrowkeys.png"
          />
          <p
            class="col-2 self-center text-h5"
            style="text-align:center"
          >
            Use left and right arrow keys to navigate!

          </p>
        </div>
      </template>
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
        bodyWidth: document.body.clientWidth,
        currentScroll: this.$route.params.scroll,
        showSwipe: true,
        cardPositionX: 0,
        cardPositionY: 0,
        startingPosition: { top: 0, left: 0 },
        isDragging: false,
        direction: 1
      };
    },
    mounted() {
      this.bodyWidth = document.body.clientWidth;
      window.addEventListener("keyup", this.arrowKeyHandler);
    },
    beforeDestroy() {
      window.removeEventListener("keyup", this.arrowKeyHandler);
    },
    methods: {
      panHandler(obj) {
        this.isDragging = true;
        obj.evt.preventDefault();
        if (obj.isFirst) {
          this.startingPosition = obj.position;
        } else if (obj.isFinal) {
          const dX = Math.abs(this.cardPositionX);
          const vX = dX / +obj.duration;
          if (
            this.nextBrother &&
            (dX > this.bodyWidth / 2 || (dX > this.bodyWidth / 10 && vX > 0.5))
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
      },
      arrowKeyHandler(event) {
        if (event.keyCode === 37) {
          this.navigate(false);
          event.preventDefault();
        } else if (event.keyCode === 39) {
          this.navigate(true);
          event.preventDefault();
        }
      },
      navigate(forwards) {
        if (forwards) {
          if (this.Brothers[+this.currentScroll + 1]) {
            this.$router.push("/brother/" + (+this.currentScroll + 1));
          }
        } else if (this.currentScroll > 1) {
          this.$router.push("/brother/" + (+this.currentScroll - 1));
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
            1.25 - (2 * Math.abs(this.cardPositionX)) / this.bodyWidth
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
    max-width: 500px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .brother-page-line {
    font-weight: 300;
  }
</style>
