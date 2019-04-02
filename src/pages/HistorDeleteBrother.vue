<template>
  <q-page padding>
    <brother-select v-model="b"></brother-select>
  </q-page>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import BrotherSelect from "../components/BrotherSelect";
import { QPage } from "quasar";
@Component({
  name: "histor-delete-brother",
  components: { BrotherSelect, QPage }
})
export default class Index extends Vue {
  b = null;
  // name: 'PageName',
}
</script>

<style>
</style>
