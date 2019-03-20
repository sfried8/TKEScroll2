<template>

  <div class="layout-padding">
    <div>
      <q-btn
        icon="sort"
        class="float-right"
        flat
        ref="target"
      >
        SORT BY
        <q-menu
          anchor="bottom right"
          self="top middle"
        >

          <q-item
            clickable
            @click.native="sortOption = 'scrollasc'"
          >
            Scroll Asc
          </q-item>
          <q-item
            clickable
            @click.native="sortOption = 'scrollsc'"
          >
            Scroll Desc
          </q-item>

        </q-menu>
      </q-btn>

    </div>
    <q-input
      v-model="currentFilter"
      type="text"
      debounce="350"
      label="filter"
    />
    <q-list
      style="background:white"
      separator
      padding
    >
      <q-item
        v-for="b in filteredBrothers"
        :key="b.original.scroll"
        @click.native="$router.push({ path: `/brother/${b.original.scroll}` }) "
      >
        <q-item-section side>
          {{b.original.scroll}}
        </q-item-section>
        <q-item-section>
          <q-item-label><span v-html="b.string"></span></q-item-label>
          <q-item-label
            v-if="b.original.officer"
            caption
          >{{b.original.officer}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="filteredBrothers.length == 0">
        <q-item-label>No Results Found!</q-item-label>
      </q-item>
    </q-list>

    <!-- <q-fixed-position corner="top-right" :offset="[18, 18]">
            <q-btn v-back-to-top.animate="{offset: 500, duration: 200}" round color="primary" class="animate-pop" style="animation-duration: .5s;" icon="keyboard_arrow_up" />
        </q-fixed-position> -->
  </div>
</template>

<script lang="js">
import Fuzzy from "fuzzy";
import Vue from "vue";
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
    QItem,
    QItemSection,
    QItemLabel,
    // BackToTop,
    QSelect,
    QInput,
    QMenu
} from "quasar";

@Component({
    name: "scroll",
    components: {
        QLayout,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QList,
        QItem,
        QItemSection,
        QItemLabel,
        QSelect,
        QInput,
        QMenu
    },
    // directives: {
    //     BackToTop
    // }
})
export default class Index extends Vue {
    _brothers = [];
    _brothersReversed = [];
    showScrollDown = true;
    sortOption = "scrollasc";
    currentFilter = "";
    icons = {
        Prytanis: "gavel",
        Epiprytanis: "book",
        Histor: "map",
        Grammateus: "edit",
        Hypophetes: "favorite",
        Hegemon: "school",
        Crysophylos: "vpn key",
        Pylortes: "colorize"
    };
    getIconForOfficer(officer) {
        return this.icons[officer] || "";
    }
    get filteredBrothers() {
        if (!this.Brothers) {
            return [];
        }
        return Fuzzy.filter(this.currentFilter, this.Brothers, {
            pre: "<b>",
            post: "</b>",
            extract: el => el.fname + " " + el.lname
        });
    }
    get Brothers() {
        return this.sortOption === "scrollasc"
            ? this._brothers
            : this._brothersReversed;
    }
    mounted() {
        Brothers.getBrothers().then(data => {
            this._brothers = data.filter(el => el.scroll > 0);
            this._brothersReversed = this._brothers.slice().reverse();
            this.sortOption = "";
            this.sortOption = "scrollasc";
        });
    }
}
</script>

<style lang="stylus">
</style>
