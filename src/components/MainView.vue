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
        <q-side-link item to="/scroll">
          <q-item-side icon="group"></q-item-side>
          <q-item-main label="Scroll" sublabel="View all brothers"></q-item-main>
        </q-side-link>
        <q-side-link item to="/search">
          <q-item-side icon="search"></q-item-side>
          <q-item-main label="Search" sublabel="Find a brother"></q-item-main>
        </q-side-link>
        <q-side-link item to="/eboard">
          <q-item-side icon="gavel"></q-item-side>
          <q-item-main label="E-Board" sublabel="View current officers"></q-item-main>
</q-side-link>        
<q-side-link item to="/tree">
          <q-item-side icon="line style"></q-item-side>
          <q-item-main label="Tree" sublabel="View the chapter family tree"></q-item-main>
</q-side-link>      
</q-list>
    </div>
  
    <!--
        Replace following <div> with
        <router-view /> component
        if using subRoutes
      -->
    <div class="page-content bg-red">


      <router-view  style="position:absolute; min-width:100%;" :key="$route.path"/>
    </div>
  </q-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Quasar from "quasar";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import {
  dom,
  event,
  openURL,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QAutocomplete,
  QInput,
  QInputFrame,
  QSearch,
  QSideLink,
  filter
} from "quasar";

@Component({
  name: "main-view",
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QAutocomplete,
    QSearch,
    QInput,
    QInputFrame,
    QSideLink,
    QItemMain
  }
})
export default class Index extends Vue {
  goTo(page: string): void {
    console.log("going to " + page);
    (this.$refs.layout as any).toggleLeft(() => {
      this.$router.push({ path: `/${page}` });
    });
  }
  launch(url: string): void {
    openURL(url);
  }
}
</script>

<style lang="css">
body{
  background:#eee;
}
/* 
.page-content {
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  min-height: 60vh;
}
  .page-content > * {
    position: relative;
    min-width: 100%;
    margin-right: -100%;
} */
</style>
