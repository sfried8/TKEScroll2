<template>
  <q-layout ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}">
    <q-toolbar slot="header" class="">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu"></q-icon>
      </q-btn>
  
      <q-toolbar-title>
        Tau Kappa Epsilon
        <div slot="subtitle">Xi-Upsilon</div>
      </q-toolbar-title>
    </q-toolbar>
  
    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-list-header>Navigation</q-list-header>
        <q-item @click="$router.push({ path: `/scroll` })">
          <q-item-side icon="group"></q-item-side>
          <q-item-main label="Scroll" sublabel="View all brothers"></q-item-main>
        </q-item>
        <q-item @click="launch('https://gitter.im/quasarframework/Lobby')">
          <q-item-side icon="search"></q-item-side>
          <q-item-main label="Search" sublabel="Find a brother"></q-item-main>
        </q-item>
        <q-item @click="launch('http://forum.quasar-framework.org')">
          <q-item-side icon="gavel"></q-item-side>
          <q-item-main label="E-Board" sublabel="View current officers"></q-item-main>
        </q-item>
        <q-item @click="launch('https://twitter.com/quasarframework')">
          <q-item-side icon="line style"></q-item-side>
          <q-item-main label="Tree" sublabel="View the chapter family tree"></q-item-main>
        </q-item>
      </q-list>
    </div>
  
    <!--
        Replace following <div> with
        <router-view /> component
        if using subRoutes
      -->
    <div class="layout-padding logo-container non-selectable no-pointer-events">
      <div class="logo" :style="position">
        <img src="~assets/coatofarms.jpg" style="width:100%;">
      </div>
    </div>
  </q-layout>
</template>

<script lang="ts">
import Hello from "./Hello";
export default Hello;
</script>

<style lang="stylus">
.logo-container {
  width: 255px;
  height: 242px;
  perspective: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.logo {
  position: absolute;
  transform-style: preserve-3d;
}
</style>
