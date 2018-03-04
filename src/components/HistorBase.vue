<template>

    <div class="page-content">
        <q-tabs>
            <q-route-tab icon="add" to="add" name="addbrother" slot="title" label="Add" />
            <q-route-tab icon="edit" to="edit" name="edit" slot="title" label="Edit" />
            <q-route-tab icon="gavel" to="updateofficers" name="updateofficers" slot="title" label="E-Board" />

            <q-tab-pane keep-alive name="addbrother">
                <histor-add-brother></histor-add-brother>
            </q-tab-pane>
            <q-tab-pane keep-alive name="edit">
                <h1>TODO</h1>
            </q-tab-pane>
            <q-tab-pane keep-alive name="updateofficers">
                <h1>TODO</h1>
            </q-tab-pane>
        </q-tabs>
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
    QAutocomplete,
    QInput,
    QInputFrame,
    QTabPane,
    QSearch,
    QSideLink,
    QTabs,
    QRouteTab,
    filter
} from "quasar";
import Hello from "../components/Hello.vue";
import HistorAddBrother from "../components/HistorAddBrother.vue";
@Component({
    name: "main-view",
    components: {
        QLayout,
        QRouteTab,
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
        QSideLink,
        QItemMain,
        Hello,
        HistorAddBrother
    }
})
export default class Index extends Vue {
    goTo(page: string): void {
        console.log("going to " + page);
        (this.$refs.layout as any).toggleLeft(() => {
            this.$router.push({ path: `/${page}` });
        });
    }
    launch(url: string): void {
        openURL(url);
    }
}
</script>

<style lang="css">
body {
    background: #eee;
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
