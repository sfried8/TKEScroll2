<template>
      <transition :enter-active-class="enterValue"
    :leave-active-class="leaveValue">
    <div class="layout-padding" v-touch-swipe.horizontal="swipeHandler">
      <h3>{{Brother.fname}} {{Brother.lname}}</h3><br>
      <h4>{{Brother.scroll}}</h4><br>
      <h4>{{Brother.isZetaTau ? "Zeta Tau ":""}}{{Brother.pc}}</h4><br>
      <h4>{{Brother.nickname}}</h4><br>
      <h4 @click="$router.push('/brother/'+Big.scroll)">{{Big.fname}} {{Big.lname}}</h4><br>
    </div>
      </transition>
</template>

<script lang="ts">
import BrotherPage from "./BrotherPage";
export default BrotherPage;
</script>

<style lang="stylus">
</style>
