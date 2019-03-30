<template>

  <q-select
    v-model="selected"
    ref="qbs"
    use-input
    hide-selected
    hide-dropdown-icon
    input-debounce="200"
    :label="label"
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
    "clear-after-select": Boolean,
    value: Object,
    label: String
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
  @Watch("value")
  onValueChanged(val, oldVal) {
    this.selected = val;
    this.$nextTick().then(() => {
      this.$refs.qbs.add(this.selected);
    });
  }
  @Watch("selected")
  onSelectedChanged(val, oldVal) {
    if (val) {
      if (val.value) {
        this.$emit("input", val.value);
      } else {
        this.$emit("input", val);
      }
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
        .map(o => o.original)
        .sort(
          (a, b) =>
            (a.label.toLowerCase().indexOf(val.toLowerCase()) === 0) -
            (b.label.toLowerCase().indexOf(val.toLowerCase()) === 0)
        );
    });
  }
}
</script>
<style>
input {
  color: #000 !important;
}
</style>
