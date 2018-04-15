<template>
  <div class="layout-padding">
    <div class="hello">
      Welcome to the scroll website for the Xi-Upsilon Chapter of Tau Kappa Epsilon!
      <img src="~assets/lem.png" />
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import Quasar from "quasar";
@Component({
    name: "hello-view"
})
export default class Index extends Vue {}
</script>

<style lang="stylus" scoped>
.logo-container {
  width: 255px;
  height: 242px;
  perspective: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.hello {
  text-align: center;
  width: 80%;
  margin: auto;
}

.logo {
  position: absolute;
  transform-style: preserve-3d;
}

img {
  width: 100%;
}
</style>
