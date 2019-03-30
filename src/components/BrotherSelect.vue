<template>

  <q-select
    v-model="selected"
    use-input
    hide-selected
    hide-dropdown-icon
    input-debounce="200"
    :options="options"
    @filter="filterFn"
    style="padding-bottom: 32px"
  >
    <template v-slot:append>
      <q-icon
        v-if="selected !== null"
        class="cursor-pointer"
        name="clear"
        @click.stop="selected = null"
      />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section>
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
import Fuzzy from "fuzzy";

import Brothers from "../Brothers";
import { QSelect, QItem, QItemSection } from "quasar";

@Component({
  name: "brother-select",
  components: {
    QSelect,
    QItem,
    QItemSection
  },
  props: {
    "clear-after-select": Boolean
  }
})
export default class Index extends Vue {
  Brothers = [];
  options = [];
  selected = null;
  mounted() {
    Brothers.getBrothers().then(b => {
      this.Brothers = b.map(o => ({
        label: o.fname + " " + o.lname,
        value: o
      }));
      this.options = [];
    });
  }
  @Watch("selected")
  onSelectedChanged(val, oldVal) {
    if (val) {
      this.$emit("input", val.value);
      if (this.clearAfterSelect) {
        this.$nextTick().then(() => {
          this.selected = null;
          document.activeElement.blur();
        });
      }
    } else if (!this.clearAfterSelect) {
      this.$emit("input", null);
    }
  }
  filterFn(val, update, abort) {
    if (!val) {
      abort();
      return;
    }
    update(() => {
      this.options = Fuzzy.filter(val, this.Brothers, {
        extract: el => el.label
      })
        .slice(0, 5)
        .map(o => o.original);
    });
  }
}
</script>
<style>
input {
  color: #000 !important;
}
</style>
