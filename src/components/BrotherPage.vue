<template>
<keep-alive>
      <transition :enter-active-class="enterValue"
    :leave-active-class="leaveValue">
    <div v-touch-swipe.horizontal="swipeHandler">
      <router-view :Brothers="Brothers" />
    </div>
    </transition>
</keep-alive>
</template>

<script lang="ts">
import BrotherPage from "./BrotherPage";
export default BrotherPage;
</script>

<style lang="stylus">
</style>
