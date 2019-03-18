<template>
  <q-layout
    view="hHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-layout-header
      v-model="header"
      :reveal="true"
    >
      <q-toolbar>
        <q-btn
          flat
          @click="left = !left"
        >
          <q-icon name="menu"></q-icon>
        </q-btn>

        <q-toolbar-title>
          Tau Kappa Epsilon
          <div slot="subtitle">Xi-Upsilon</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      side="left"
      v-model="left"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Navigation</q-list-header>
        <q-item to="/">
          <q-item-side icon="home"></q-item-side>
          <q-item-main label="Home"></q-item-main>
        </q-item>
        <q-item to="/scroll">
          <q-item-side icon="group"></q-item-side>
          <q-item-main
            label="Scroll"
            sublabel="View all brothers"
          ></q-item-main>
        </q-item>
        <q-item to="/eboard">
          <q-item-side icon="gavel"></q-item-side>
          <q-item-main
            label="E-Board"
            sublabel="View current officers"
          ></q-item-main>
        </q-item>
        <q-item to="/tree">
          <q-item-side icon="line style"></q-item-side>
          <q-item-main
            label="Tree"
            sublabel="View the chapter family tree"
          ></q-item-main>
        </q-item>
        <q-item to="/histor">
          <q-item-side icon="settings"></q-item-side>
          <q-item-main
            label="Histor Control Panel"
            sublabel="Add/Edit brothers and Officers"
          ></q-item-main>
        </q-item>
        <q-item @click="clearCache">
          <q-item-side icon="delete"></q-item-side>
          <q-item-main label="Clear Cache"></q-item-main>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <!--
        Replace following <> with
        <router-view /> component
        if using subRoutes
      -->
    <q-page-container>

      <router-view :key="$route.path" />
    </q-page-container>
  </q-layout>
</template>

<script lang="js">
import Vue from "vue";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import {
    dom,
    event,
    openURL,
    QLayout,
    QLayoutHeader,
    QLayoutDrawer,
    QPageContainer,
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
    // QSideLink,
    filter,
    LocalStorage
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
        QLayoutHeader,
        QLayoutDrawer,
        QPageContainer,
        QListHeader,
        QItem,
        QItemSide,
        QAutocomplete,
        QSearch,
        QInput,
        QInputFrame,
        // QSideLink,
        QItemMain
    }
})
export default class Index extends Vue {
    left = true;
    header = true;
    goTo(page) {
        console.log("going to " + page);
        this.$refs.layout.toggleLeft(() => {
            this.$router.push({ path: `/${page}` });
        });
    }
    launch(url) {
        openURL(url);
    }
    clearCache() {
        Brothers.clearCache();
    }
    mounted() {
          document.querySelector(".q-layout").style.minHeight = window.innerHeight+"px"
    document.body.style.minHeight = window.innerHeight+"px"
    }
    beforeMount() {
        if (!LocalStorage.has("brothersPassword")) {
            this.$router.push("/firsttime");
        }
    }
}
</script>

<style lang="stylus">
body {
  background: #fff;
}

.brother-link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;

  div {
    width: 95%;
  }
}
</style>
