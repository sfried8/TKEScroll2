<template>
  <div
    class="layout-padding"
    @keyup.enter="submit"
  >
    <q-input
      v-show="scroll==0"
      v-model="currentBrother"
      placeholder="Brother to edit"
    >
      <q-autocomplete
        @search="search"
        :filter="myfilter"
        @selected="selectedBrotherToEdit"
      />
    </q-input>
    <div v-show="scroll != 0">
      <h5>{{currentBrother}}</h5>
      <span
        @click="scroll=0"
        id="changeButton"
      >change</span>
      <q-field>

        <div class="row no-wrap">

          <q-input
            v-model="scroll"
            class="rightmargin"
            float-label="Scroll"
            type="number"
          />
          <q-input
            v-model="pc"
            float-label="Pledge Class"
            type="number"
          />
        </div>
      </q-field>
      <q-field>

        <div class="row no-wrap">

          <q-input
            v-model="fname"
            class="rightmargin"
            float-label="First Name"
          />
          <q-input
            v-model="lname"
            float-label="Last Name"
          />
        </div>
      </q-field>
      <q-input
        v-model="nickname"
        float-label="Nickname"
      />
      <q-input
        v-model="big"
        placeholder="Big Brother"
      >
        <q-autocomplete
          @search="search"
          :filter="myfilter"
          @selected="selected"
        />
      </q-input>
      <q-toggle
        v-model="active"
        label="Active"
      />
      <br /><br /><br />
      <q-btn
        @click="submit"
        color="positive"
        icon="add"
      >Update Brother</q-btn>
      <br /><br />
    </div>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import FuzzySearch from "fuzzy-search";

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
    QSelect,
    QInput,
    Loading,
    QToggle,
    QField,
} from "quasar";
async function parseBrothers() {
    const result = [];
    const brothers = await Brothers.getBrothers();
    for (let scroll in brothers) {
        const brother = brothers[scroll];
        result.push({
            label: `${brother.fname} ${brother.lname}`,
            sublabel: `${brother.isZetaTau ? "Zeta Tau " : ""}PC ${brother.pc}`,
            icon: "chevron right",
            value: brother.scroll
        });
    }
    return result;
}
@Component({
    name: "histor-edit-brother",
    components: {
        QLayout,
        QToolbar,
        QField,
        QToolbarTitle,
        QBtn,
        QIcon,
        QList,
        QItem,
        QSelect,
        QInput,
        QToggle,
    }
})
export default class Index extends Vue {
    scroll = 0;
    fname = "";
    lname = "";
    nickname = "";
    pc = 0;
    active = true;
    big = "";
    bigS = 0;
    brothers = [];
    currentBrother = "";
    searcher = null;
    brotherObjects = [];
    submit() {
        const brother = {
            scroll: `${this.scroll}`,
            fname: this.fname,
            lname: this.lname,
            pc: this.pc,
            nickname: this.nickname,
            bigS: this.bigS,
            active: this.active,
            isZetaTau: this.pc < 0
        };
        Brothers.addBrother(brother).then(
            this.$q.notify(
                `Successfully updated information for ${this.currentBrother}!`
            )
        );

        // Brothers.addBrother(brother);
    }
    search(terms, done) {
        this.scroll = 0;
        setTimeout(() => {
            done(this.myfilter(terms, { field: "label", list: this.brothers }));
        }, 50);
    }
    selectedBrotherToEdit(item) {
        this.currentBrother = item.label;
        this.scroll = item.value;
        const selectedBrother = this.brotherObjects[this.scroll];
        this.fname = selectedBrother.fname;
        this.lname = selectedBrother.lname;
        this.nickname = selectedBrother.nickname;
        this.pc = selectedBrother.pc;
        this.bigS = selectedBrother.big;
        const _big = this.brotherObjects[this.bigS];
        this.big = `${_big.fname} ${_big.lname}`;
    }
    selected(item) {
        this.big = item.label;
        this.bigS = +item.value;
    }
    myfilter(terms, { field, list }) {
        const token = terms.toLowerCase();
        this.searcher = new FuzzySearch(list, [field], {
            caseSensitive: false,
            sort: true
        });
        return this.searcher.search(token);
    }
    mounted() {
        parseBrothers()
            .then(brothers => {
                this.brothers = brothers;
                return Brothers.getBrothers();
            })
            .then(brothers => {
                this.brotherObjects = brothers;
            });
    }
}
</script>

<style scoped>
.rightmargin {
  width: 48%;
  margin-right: 4%;
}
#changeButton {
  text-decoration: underline;
  color: #444;
  cursor: pointer;
}
h5 {
  display: inline-block;
}
</style>

