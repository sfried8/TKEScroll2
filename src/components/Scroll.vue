<template>

    <div class="layout-padding">
            <!-- <q-select
      v-model="sortOption"
      float-label="sort by"
      radio
     :options="sortOptions"
    /> -->
    <div>
    <q-btn icon="sort" class="float-right" flat ref="target">
SORT BY
  <!-- Direct child of target -->
  <q-popover ref="popover">
    <!--
      The DOM element(s) that make up the popup,
      in this case a list:
    -->
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
<br>
<br>
    </div>
        <q-list>
          <q-item v-for="b in Brothers" :key="b.scroll" @click="$router.push({ path: `/brother/${b.scroll}` }) ">
          <q-item-side>{{b.scroll}}</q-item-side>
          <q-item-main :label="b.fname + ' ' + b.lname"></q-item-main>
        </q-item>
</q-list>

<q-fixed-position corner="top-right" :offset="[18, 18]">
  <q-btn
    v-back-to-top.animate="{offset: 500, duration: 200}"
    round
    color="primary"
    class="animate-pop"
    style="animation-duration: .5s;"
    icon="keyboard_arrow_up"
  />
</q-fixed-position>
    </div>
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
  BackToTop,
  QFixedPosition,
  QSelect,
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
