<template>
  <q-page padding>

    <div
      id="tree-container"
      class="bg-white"
    >
      <q-page-sticky
        position="top-left"
        :offset="[15, 15]"
      >

        <brother-select
          v-model="big"
          label="Find brother"
          outlined
          rounded
          class="bg-white"
          :clear-after-select="true"
        >
          <template #prepend>
            <q-icon name="search"></q-icon>
          </template>
        </brother-select>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { QPage, QIcon, QPageSticky } from "quasar";
import BrotherSelect from "../components/BrotherSelect";
import Tree from "../Tree";

@Component({
  name: "my-family-tree",
  components: { BrotherSelect, QPage, QIcon, QPageSticky }
})
export default class Index extends Vue {
  big = null;
  mounted() {
    Tree.render(this.$route.query ? +this.$route.query.scroll : 0);
  }

  @Watch("big")
  selected(val) {
    if (this.big) {
      const node = Tree.nodes.find(n => n.name === val.fname + " " + val.lname);
      if (node) {
        Tree.centerNode(node);
      }
      this.big = null;
    }
    // this.big = ""
  }
}
</script>

<style type="text/css">
#tree-container {
  overflow: hidden;
  touch-action: manipulation;
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