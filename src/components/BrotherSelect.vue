<template>
  <q-select v-model="selected" ref="qbs" use-input hide-dropdown-icon :outlined="outlined" :emit-value="true"
    :rounded="rounded" input-debounce="200" :label="label" :options="options" class="brother-select" @filter="filterFn">
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>

    <template v-slot:append>
      <q-icon v-if="selected !== null" class="cursor-pointer" name="clear" @click.stop="selected = null" />
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
import Fuzzy from "fuzzy";
import BrotherInfoMixin from "../mixins/BrotherInfoMixin";
export default {
  mixins: [BrotherInfoMixin],
  props: {
    "clear-after-select": Boolean,
    modelValue: Object,
    label: String,
    outlined: Boolean,
    rounded: Boolean
  },
  data() {
    return {
      options: [],
      allOptions: [],
      selected: null
    };
  },
  watch: {
    modelValue(val, oldVal) {
      this.$nextTick().then(() => {
        this.selected = this.modelValue
          ? {
            label: this.modelValue.fname + " " + this.modelValue.lname,
            value: this.modelValue
          }
          : null;
        this.selected && (this.$refs.qbs.inputValue = this.selected.label);
      });
    },
    selected(val, oldVal) {
      if (val) {
        if (val.value) {
          this.$emit("update:modelValue", val.value);
          this.$gtm.logEvent("events", "BrotherSelect", "Selected brother");
        } else {
          this.$emit("update:modelValue", val);
          this.$gtm.logEvent("events", "BrotherSelect", "Selected brother");
        }
        if (this.clearAfterSelect) {
          this.$nextTick().then(() => {
            this.selected = null;
            document.activeElement.blur();
          });
        }
      } else if (!this.clearAfterSelect) {
        this.$emit("update:modelValue", null);
      }
    }
  },

  methods: {
    onGetBrothers() {
      this.allOptions = this.SanitizedBrothersList.map(o => ({
        label: o.fname + " " + o.lname,
        value: o
      }));
      this.options = this.allOptions
      this.$nextTick().then(() => {
        this.selected = this.modelValue
          ? {
            label: this.modelValue.fname + " " + this.modelValue.lname,
            value: this.modelValue
          }
          : null;
        // this.selected && (this.$refs.qbs.inputValue = this.selected.label);
      });
    },
    filterFn(val, update, abort) {
      if (!val) {
        abort();
        return;
      }
      update(() => {
        this.options = this.$util.stableSort(
          Fuzzy.filter(val, this.allOptions, {
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
};
</script>
<style>
.brother-select input {
  color: #000 !important;
}
</style>
