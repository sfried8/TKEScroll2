<template>
    <div id="tree-container"></div>
</template>

<script lang="js">
import Vue from "vue";
import Component from "vue-class-component";
import Tree from "../Tree";
import Brothers from "../Brothers";

@Component({
    name: "my-family-tree"
})
export default class Index extends Vue {
    mounted() {
        Tree.render(
            this.$route.query ? +this.$route.query.scroll : 0
        );
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