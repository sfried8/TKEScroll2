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

/*
 * Root component, but defined as a typescript decorated class
 */
@Component({})
export default class App extends Vue {
  onResize(size) {
    $store.state.windowSize = size
  }
}
</script>

<style>
</style>
