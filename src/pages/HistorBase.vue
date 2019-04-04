<template>

  <q-page padding>
    <q-tabs
      v-model="currentTab"
      indicator-color="primary"
      active-color="primary"
      class="bg-white text-grey rounded-borders shadow-2"
      align="left"
    >
      <q-tab
        default
        icon="add"
        name="addbrother"
        label="Add"
      />
      <q-tab
        icon="edit"
        name="edit"
        label="Edit"
      />
      <q-tab
        icon="gavel"
        name="updateofficers"
        label="E-Board"
      />
    </q-tabs>
    <q-separator />
    <q-tab-panels
      style="overflow:visible;min-height:100%;"
      v-model="currentTab"
    >
      <q-tab-panel
        style=""
        keep-alive
        name="addbrother"
      >
        <histor-add-brother></histor-add-brother>
      </q-tab-panel>
      <q-tab-panel
        keep-alive
        name="edit"
      >
        <histor-edit-brother></histor-edit-brother>
      </q-tab-panel>
      <q-tab-panel
        keep-alive
        name="updateofficers"
      >
        <histor-eboard></histor-eboard>
      </q-tab-panel>
    </q-tab-panels>

  </q-page>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import HistorAddBrother from "./HistorAddBrother";
import HistorEditBrother from "./HistorEditBrother";
import HistorEboard from "./HistorEBoard";
@Component({
  components: {
    HistorAddBrother,
    HistorEditBrother,
    HistorEboard
  }
})
export default class Index extends Vue {
  currentTab = "addbrother";
}
</script>

<style lang="css">
.scroll {
  overflow: visible;
}
</style>
