<template>
  <div
    v-if="shouldShow"
    class="fullscreen help-overlay text-white column q-pa-xl"
  >
    <div class="col-10">

      <slot></slot>
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
import Component from "vue-class-component";
import Vue from "vue";

import { LocalStorage, QBtn } from "quasar";

@Component({
  name: "help-overlay",
  components: { QBtn },
  props: { "help-id": String }
})
export default class Index extends Vue {
  shouldShow = false;
  mounted() {
    if (!LocalStorage.has("hasSeen" + this.helpId)) {
      this.shouldShow = true;
    }
  }
  dismiss() {
    this.shouldShow = false;
    LocalStorage.set("hasSeen" + this.helpId, true);
  }
}
</script>

<style>
.help-overlay {
  background: rgba(0, 0, 0, 0.8);
}
</style>
