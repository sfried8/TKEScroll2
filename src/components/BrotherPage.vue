<template>
      <transition :enter-active-class="enterValue"
    :leave-active-class="leaveValue">
    <div class="layout-padding" v-touch-swipe.horizontal="swipeHandler">
      <h3>{{Brother.Name}}</h3><br>
      <h4>{{Brother.Scroll}}</h4><br>
      <h4>{{Brother.PC}}</h4><br>
      <h4>{{Brother.Nickname}}</h4><br>
      <h4>{{Brother.Big}}</h4><br>
    </div>
      </transition>
</template>

<script lang="ts">
import BrotherPage from "./BrotherPage";
export default BrotherPage;
</script>

<style lang="stylus">
</style>
