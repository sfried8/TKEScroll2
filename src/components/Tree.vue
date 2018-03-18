




<template>
    <div id="tree-container"></div>

</template>

<script lang="ts">
import Fuzzy from "fuzzy";
import Vue from "vue";
import Quasar from "quasar";
import Component from "vue-class-component";
import Tree from "../Tree";
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
    QInput,
    QPopover
} from "quasar";

@Component({
    name: "my-family-tree",
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
        QInput,
        QPopover
    },
    directives: {
        BackToTop
    }
})
export default class Index extends Vue {
    mounted() {
        Tree.render();
    }
}
</script>

<style type="text/css">
.node {
    cursor: pointer;
}

.overlay {
    background-color: #eee;
}

.node circle {
    fill: #fff;
    stroke: steelblue;
    stroke-width: 1.5px;
}

.node text {
    font-size: 10px;
    font-family: sans-serif;
}

.link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
}

.templink {
    fill: none;
    stroke: red;
    stroke-width: 3px;
}

.ghostCircle.show {
    display: block;
}

.ghostCircle,
.activeDrag .ghostCircle {
    display: none;
}
</style>