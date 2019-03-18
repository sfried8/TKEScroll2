<template>
  <!-- Don't drop 'q-app' class -->
  <div id='q-app'>
    <q-window-resize-observable @resize="onResize" />
    <router-view></router-view>
  </div>
</template>

<script lang='js'>
import Vue from 'vue'
import Component from 'vue-class-component'
import {QWindowResizeObservable} from 'quasar'
/*
 * Root component, but defined as a typescript decorated class
 */
@Component({components:{QWindowResizeObservable}})
export default class App extends Vue {
  windowSize
  onResize(size) {
    const layoutElement = document.querySelector(".q-layout");
    if (layoutElement) {
      layoutElement.style.minHeight = size.height+"px"
    }
    document.body.style.minHeight = size.height+"px"
  }
}
</script>

<style>
</style>
