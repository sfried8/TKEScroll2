<template>

  <div class="page-content">
    <q-tabs
      v-model="currentTab"
      inverted
      color="tertiary"
    >
      <q-tab
        default
        class="white"
        icon="add"
        name="addbrother"
        label="Add"
      />
      <q-tab
        class="white"
        icon="edit"
        name="edit"
        label="Edit"
      />
      <q-tab
        class="white"
        icon="gavel"
        name="updateofficers"
        label="E-Board"
      />
    </q-tabs>
    <q-tab-panels
      style="overflow:visible;"
      v-model="currentTab"
    >
      <q-tab-panel
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

  </div>
</template>

<script>
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
  QInput,
  QTabPanel,
  QTabPanels,
  QTabs,
  QTab
} from "quasar";
import HistorAddBrother from "./HistorAddBrother";
import HistorEditBrother from "./HistorEditBrother";
import HistorEboard from "./HistorEBoard";
@Component({
  name: "histor-base",
  components: {
    QLayout,
    QTab,
    QToolbar,
    QTabs,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QInput,
    QTabPanel,
    QTabPanels,
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
/* 
.page-content {
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  min-height: 60vh;
}
  .page-content > * {
    position: relative;
    min-width: 100%;
    margin-right: -100%;
} */
</style>
