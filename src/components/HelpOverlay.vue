<template>
  <div
    v-if="shouldShow"
    class="fullscreen help-overlay text-white column q-pa-xl"
  >
    <div class="col-10">
      <slot
        v-if="$q.platform.is.mobile"
        name="mobile"
      ></slot>
      <slot
        v-else
        name="desktop"
      ></slot>
    </div>
    <div class="row col justify-center items-center">

      <q-btn
        unelevated
        inverted
        color="white"
        size="xl"
        class=" text-black q-ma-auto"
        label="Got it!"
        @click="dismiss"
      ></q-btn>
    </div>
  </div>
</template>

<script>
  import { LocalStorage } from "quasar";

  export default {
    props: { "help-id": String },
    data() {
      return { shouldShow: false, showTime: 0 };
    },
    mounted() {
      if (!LocalStorage.has("hasSeen" + this.helpId)) {
        this.shouldShow = true;
        this.showTime = Date.now();
      }
    },
    methods: {
      dismiss() {
        this.shouldShow = false;
        LocalStorage.set("hasSeen" + this.helpId, true);
        this.$gtm.logEvent(
          "events",
          "DismissOverlay",
          "DismissOverlay",
          Date.now() - this.showTime
        );
      }
    }
  };
</script>

<style>
  .help-overlay {
    background: rgba(0, 0, 0, 0.8);
  }
</style>
