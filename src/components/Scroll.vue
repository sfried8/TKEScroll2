<template>

    <div class="layout-padding">
        <q-list>
          <q-item v-for="b in Brothers" :key="b.scroll" @click="$router.push({ path: `/brother/${b.scroll}` }) ">
          <q-item-side>{{b.scroll}}</q-item-side>
          <q-item-main :label="b.fname + ' ' + b.lname"></q-item-main>
        </q-item>
</q-list>
    </div>
</template>

<script lang="ts">
import Scroll from "./Scroll";
export default Scroll;
</script>

<style lang="stylus">
</style>
