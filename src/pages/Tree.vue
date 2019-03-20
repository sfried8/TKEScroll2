<template>

  <div id="tree-container">
    <q-input
      v-model="big"
      placeholder="Find"
    >
      <q-autocomplete
        @search="search"
        :filter="myfilter"
        @selected="selected"
      />
    </q-input>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import Component from "vue-class-component";
import Tree from "../Tree";
import Brothers from "../Brothers";
import { QInput } from "quasar";
import FuzzySearch from "fuzzy-search";

async function parseBrothers() {
    const result = [];
    const brothers = await Brothers.getBrothers();
    for (let scroll in brothers) {
        const brother = brothers[scroll];
        result.push({
            label: `${brother.fname} ${brother.lname}`,
            sublabel: `${brother.isZetaTau ? "Zeta Tau " : ""}PC ${brother.pc}`,
            icon: "chevron right",
            value: `${brother.fname} ${brother.lname}`
        });
    }
    return result;
}

@Component({
    name: "my-family-tree",
    components: {
        QInput
    }
})
export default class Index extends Vue {
    brothers = []
    big = ""
    mounted() {
        parseBrothers()
            .then(brothers => {
                this.brothers = brothers;
            })
        Tree.render(
            this.$route.query ? +this.$route.query.scroll : 0
        );
    }
        search(terms, done) {
        setTimeout(() => {
            done(this.myfilter(terms, { field: "label", list: this.brothers }));
        }, 50);
    }
    selected(item) {

        Tree.centerNode(Tree.nodes.find(n=>n.name===item.label))
        // this.big = ""
    }
    myfilter(terms, { field, list }) {
        const token = terms.toLowerCase();
        this.searcher = new FuzzySearch(list, [field], {
            caseSensitive: false,
            sort: true
        });
        return this.searcher.search(token);
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