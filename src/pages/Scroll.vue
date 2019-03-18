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
        <q-popover ref="popover">
          <q-list
            separator
            link
          >
            <q-item
              v-close-overlay
              @click.native="sortOption = 'scrollasc'"
            >
              Scroll Asc
            </q-item>
            <q-item
              v-close-overlay
              @click.native="sortOption = 'scrollsc'"
            >
              Scroll Desc
            </q-item>
          </q-list>

        </q-popover>
      </q-btn>

    </div>
    <q-input
      clearable
      v-model="currentFilter"
      type="text"
      float-label="filter"
    />

    <!-- <q-list
      style="background:white"
      separator
    > -->
    <RecycleScroller
      :items="filteredBrothers"
      :item-size="20"
      key-field="string"
      content-tag="div"
    >
      <template slot-scope="props">
        <q-item @click.native="$router.push({ path: `/brother/${props.item.original.scroll}` }) ">
          <q-item-side>
            {{props.item.original.scroll}}
            <q-icon :name="getIconForOfficer(props.item.original.officer)"></q-icon>
          </q-item-side>
          <q-item-main :label="props.item.string"></q-item-main>
        </q-item>

      </template>
    </RecycleScroller>
    <q-item v-if="filteredBrothers.length == 0">
      <q-item-main label="No Results Found!"></q-item-main>
    </q-item>
    <!-- </q-list> -->
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        v-back-to-top.animate="{offset: 500, duration: 200}"
        round
        color="primary"
        class="animate-pop"
        style="animation-duration: .5s;"
        icon="keyboard_arrow_up"
      />
    </q-page-sticky>
  </div>
</template>

<script lang="js">
import Fuzzy from "fuzzy";
import Vue from "vue";
import Component from "vue-class-component";
import {RecycleScroller} from "vue-virtual-scroller";
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
    QSelect,
    QInput,
    QPopover,
    QPageSticky,
    CloseOverlay
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
        QSelect,
        QInput,
        QPageSticky,
        QPopover,
        RecycleScroller
    },
    directives: {
        BackToTop,
        CloseOverlay
    }
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
        }).map(b=>({...b,id:b.original.scroll}));
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
