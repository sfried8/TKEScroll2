<template>
    <q-page>
        <help-overlay help-id="treePage">
            <template #mobile>
                <div class="column justify-center items-center" style="height:100%">
                    <div class="col-2 row justify-center items-center" style="width:100%;">
                        <img src="~/assets/pinchzoomtouchmove.png" style="height:100%;margin:auto" />
                    </div>
                    <p class="col-1 text-subtitle1">Pan around and pinch to zoom</p>
                    <p class="col-1 text-subtitle1">Tap a brother to show/hide their littles</p>
                    <p class="col-1 text-subtitle1">Long press a brother to view their info</p>
                    <p class="col-1 text-subtitle1">Search to find a brother in the tree</p>
                </div>
            </template>
            <template #desktop>
                <div class="column justify-center items-center" style="height:100%">
                    <div class="col-2 row justify-center items-center" style="width:100%;">
                        <img src="~/assets/pinchzoomtouchmove.png" style="height:100%;margin:auto" />
                    </div>
                    <p class="col-1 text-subtitle1">Pan around and pinch to zoom</p>
                    <p class="col-1 text-subtitle1">Tap a brother to show/hide their littles</p>
                    <p class="col-1 text-subtitle1">Long press a brother to view their info</p>
                    <p class="col-1 text-subtitle1">Search to find a brother in the tree</p>
                </div>
            </template>
        </help-overlay>
        <div id="tree-container" class="bg-white">
            <q-page-sticky position="top-left" class="q-ma-lg">
                <brother-select @update:modelValue="(target) => findTarget = target" label="Find brother" outlined
                    class="bg-white" clear-after-select>
                    <template #prepend>
                        <q-icon name="search"></q-icon>
                    </template>
                </brother-select>
            </q-page-sticky>
        </div>
    </q-page>
</template>

<script>
import Tree from "../Tree/Tree.js";
import BrotherInfoMixin from "../mixins/BrotherInfoMixin.js";
export default {
    mixins: [BrotherInfoMixin],
    data() {
        return {
            findTarget: null
        };
    },
    watch: {
        Brothers(val) {
            if (this.Brothers) {
                this.$nextTick().then(() => {
                    Tree.render(this.Brothers, node =>
                        this.$router.push(
                            "/brother/" +
                            this.SanitizedBrothersList.find(
                                b =>
                                    b && b.fname + " " + b.lname ===
                                    node.data.name
                            ).scroll
                        )
                    );
                    const scroll = +this.$route.query.scroll;
                    console.log(scroll);
                    if (scroll && this.Brothers[scroll]) {
                        Tree.findNode(this.Brothers[scroll]);
                    }
                });
            }
        },
        findTarget(val) {
            if (this.findTarget) {
                if (this.findTarget.scroll) {
                    Tree.findNode(this.findTarget);
                }
                this.findTarget = null;
            }
            // this.big = ""
        }
    }
};
</script>

<style type="text/css">
#tree-container {
    overflow: hidden;
    touch-action: none;
    width: 100%;
    height: 100%;
    max-width: initial;
    position: absolute;
    left: 0;
}

.node {
    cursor: pointer;
}

.node circle {
    fill: #fff;
    stroke: #ad2624;
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