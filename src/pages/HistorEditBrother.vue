<template>
  <div class="layout-padding">
    <brother-select
      v-show="!currentBrother"
      v-model="currentBrother"
    />
    <div v-show="currentBrother">
      <h5 v-if="currentBrother">{{currentBrother.fname}}&nbsp;{{currentBrother.lname}}</h5>
      <span
        @click="currentBrother = null"
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
      <brother-select v-model="big" />
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

<script>
import Vue from "vue";
import { Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import BrotherSelect from "../components/BrotherSelect";
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
  QSelect,
  QInput,
  Loading,
  QToggle,
  QField
} from "quasar";

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
    BrotherSelect
  }
})
export default class Index extends Vue {
  scroll = 0;

  fname = "";

  lname = "";

  nickname = "";

  pc = 0;

  active = true;

  big = null;
  currentBrother = null;
  submit() {
    const brother = {
      scroll: `${this.scroll}`,
      fname: this.fname,
      lname: this.lname,
      pc: this.pc,
      nickname: this.nickname,
      bigS: this.big.scroll,
      active: this.active,
      isZetaTau: false
    };
    Brothers.addBrother(brother).then(
      this.$q.notify(
        `Successfully updated information for ${this.currentBrother}!`
      )
    );

    // Brothers.addBrother(brother);
  }
  @Watch("currentBrother")
  onCurrentBrotherChanged(val, oldVal) {
    if (!val) {
      return;
    }
    this.scroll = this.currentBrother.scroll;
    this.fname = this.currentBrother.fname;
    this.lname = this.currentBrother.lname;
    this.nickname = this.currentBrother.nickname;
    this.pc = this.currentBrother.pc;
    this.active = this.currentBrother.active;
    this.big = this.currentBrother.big;
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
  mounted() {
    Brothers.getBrothers().then(b => (this.brothers = b));
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

