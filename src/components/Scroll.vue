<template>

  <div class="layout-padding">
    <div>
      <q-btn icon="sort" class="float-right" flat ref="target">
        SORT BY
        <q-popover ref="popover">
          <q-list separator link>
            <q-item @click="sortOption = 'scrollasc', $refs.popover.close()">
              Scroll Asc
            </q-item>
            <q-item @click="sortOption = 'scrollsc', $refs.popover.close()">
              Scroll Desc
            </q-item>
          </q-list>

        </q-popover>
      </q-btn>

    </div>
    <q-input clearable v-model="currentFilter" type="text" float-label="filter" />
    <q-list style="background:white" separator>
      <q-item v-for="b in filteredBrothers" :key="b.original.scroll" @click="$router.push({ path: `/brother/${b.original.scroll}` }) ">
        <q-item-side>
          {{b.original.scroll}}
          <q-icon :name="getIconForOfficer(b.original.officer)"></q-icon>
        </q-item-side>
        <q-item-main :label="b.string"></q-item-main>
      </q-item>
      <q-item v-if="filteredBrothers.length == 0">
        <q-item-main label="No Results Found!"></q-item-main>
      </q-item>
    </q-list>

    <q-fixed-position corner="top-right" :offset="[18, 18]">
      <q-btn v-back-to-top.animate="{offset: 500, duration: 200}" round color="primary" class="animate-pop" style="animation-duration: .5s;" icon="keyboard_arrow_up" />
    </q-fixed-position>
  </div>
</template>

<script lang="ts">
import Fuzzy from "fuzzy";
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
    BackToTop,
    QFixedPosition,
    QSelect,
    QInput,
    QPopover
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
        QListHeader,
        QItem,
        QItemSide,
        QItemMain,
        QFixedPosition,
        QSelect,
        QInput,
        QPopover
    },
    directives: {
        BackToTop
    }
})
export default class Index extends Vue {
    _brothers = [];
    _brothersReversed = [];
    showScrollDown = true;
    sortOptions = [
        {
            label: "Scroll (oldest first)",
            value: "scrollasc"
        },
        {
            label: "Scroll (newest first)",
            value: "scrolldesc"
        }
    ];
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
