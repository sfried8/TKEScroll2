<template>

    <div class="layout-padding">
        <q-list>
          <q-item v-for="b in Brothers" :key="b.Scroll" @click="$router.push({ path: `/brother/${b.Scroll}` }) ">
          <q-item-side>{{b.Scroll}}</q-item-side>
          <q-item-main :label="b.Name"></q-item-main>
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
