<template>

    <div class="page-content">
        <q-tabs inverted color="tertiary">
            <q-tab default class="white" icon="add" name="addbrother" slot="title" label="Add" />
            <q-tab class="white" icon="edit" name="edit" slot="title" label="Edit" />
            <q-tab class="white" icon="gavel" name="updateofficers" slot="title" label="E-Board" />
            <div class="panes">
                <q-tab-pane keep-alive name="addbrother">
                    <histor-add-brother></histor-add-brother>
                </q-tab-pane>
                <q-tab-pane keep-alive name="edit">
                    <histor-edit-brother></histor-edit-brother>
                </q-tab-pane>
                <q-tab-pane keep-alive name="updateofficers">
                    <histor-eboard></histor-eboard>
                </q-tab-pane>
            </div>
        </q-tabs>
    </div>
</template>

<script lang="js">
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
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QAutocomplete,
    QInput,
    QInputFrame,
    QTabPane,
    QSearch,
    
    QTabs,
    QTab,
    filter
} from "quasar";
import Hello from "./Hello";
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
        QListHeader,
        QItem,
        QItemSide,
        QAutocomplete,
        QSearch,
        QTabPane,
        QInput,
        QInputFrame,
        
        QItemMain,
        Hello,
        HistorAddBrother,
        HistorEditBrother,
        HistorEboard
    }
})
export default class Index extends Vue {
    goTo(page) {
        console.log("going to " + page);
        this.$refs.layout.toggleLeft(() => {
            this.$router.push({ path: `/${page}` });
        });
    }
    launch(url) {
        openURL(url);
    }
}
</script>

<style lang="css" scoped>
body {
    background: #fff;
}
.panes {
    background: #eee;
}
.white {
    background: #fff;
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
