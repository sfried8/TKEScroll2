<template>

  <q-select
    v-model="selected"
    ref="qbs"
    use-input
    hide-dropdown-icon
    hide-selected
    :outlined="outlined"
    :rounded="rounded"
    input-debounce="200"
    :label="label"
    :options="options"
    @filter="filterFn"
  >
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
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
import { Component, Watch } from "vue-property-decorator";
import Fuzzy from "fuzzy";

@Component({
  props: {
    "clear-after-select": Boolean,
    value: Object,
    label: String,
    outlined: Boolean,
    rounded: Boolean
  }
})
export default class Index extends Vue {
  Brothers = [];
  options = [];
  selected = null;
  mounted() {
    this.$brothers.getBrothers().then(b => {
      this.Brothers = b.map(o => ({
        label: o.fname + " " + o.lname,
        value: o
      }));
      this.options = this.Brothers;
      this.$nextTick().then(() => {
        this.selected = this.value
          ? {
              label: this.value.fname + " " + this.value.lname,
              value: this.value
            }
          : null;
        this.selected && (this.$refs.qbs.inputValue = this.selected.label);
      });
    });
  }
  @Watch("value")
  onValueChanged(val, oldVal) {
    this.$nextTick().then(() => {
      this.selected = this.value
        ? {
            label: this.value.fname + " " + this.value.lname,
            value: this.value
          }
        : null;
      this.selected && (this.$refs.qbs.inputValue = this.selected.label);
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
      this.options = this.$util.stableSort(
        Fuzzy.filter(val, this.Brothers, {
          extract: el => el.label
        })
          .slice(0, 5)
          .map(o => o.original),
        (a, b) =>
          (a.label.toLowerCase().indexOf(val.toLowerCase()) !== 0) -
          (b.label.toLowerCase().indexOf(val.toLowerCase()) !== 0)
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
