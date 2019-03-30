<template>

  <div id="tree-container">
    <brother-select
      v-model="big"
      :clear-after-select="true"
    >
    </brother-select>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import BrotherSelect from "../components/BrotherSelect";
import Tree from "../Tree";



@Component({
    name: "my-family-tree",
    components: {BrotherSelect}
})
export default class Index extends Vue {
    big = null
    mounted() {

        Tree.render(
            this.$route.query ? +this.$route.query.scroll : 0
        );
    }

    @Watch("big")
    selected(val) {
        if (this.big) {
          
          Tree.centerNode(Tree.nodes.find(n=>n.name===val.fname+" "+val.lname))
          this.big = null;
        }
        // this.big = ""
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