<template>
  <div class="layout-padding">
    <div class="hello">
      <p>
        Welcome to the scroll website for the Xi-Upsilon Chapter of Tau Kappa Epsilon!
      </p>
      <img src="~/assets/lem.png" />
    </div>
  </div>
</template>

<script lang="js">
import Component from "vue-class-component";
import Vue from "vue";
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
  height: 100%;
}

.logo {
  position: absolute;
  transform-style: preserve-3d;
}

img {
  width: 50%;
}
</style>
