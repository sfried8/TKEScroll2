<template>
  <div class="layout-padding">
    <brother-select
      label="Brother to edit"
      v-show="!currentBrother"
      v-model="currentBrother"
    />
    <div v-show="currentBrother">
      <h5 v-if="currentBrother">{{currentBrother.fname}}&nbsp;{{currentBrother.lname}}</h5>
      <span
        @click="currentBrother = null"
        id="changeButton"
      >change</span>

      <div class="row no-wrap q-col-gutter-lg">

        <q-input
          v-model="scroll"
          class="col"
          label="Scroll"
          type="number"
        />
        <q-input
          v-model="pc"
          class="col"
          label="Pledge Class"
          type="number"
        />
      </div>

      <div class="row no-wrap q-col-gutter-lg">

        <q-input
          v-model="fname"
          class="col"
          label="First Name"
        />
        <q-input
          v-model="lname"
          class="col"
          label="Last Name"
        />
      </div>
      <div class="row no-wrap q-col-gutter-lg">
        <q-input
          class="col"
          v-model="nickname"
          label="Nickname"
        />
        <brother-select
          class="col"
          v-model="big"
          label="Big Brother"
        />
      </div>
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
import Brothers from "../Brothers";

@Component({
  name: "histor-edit-brother"
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
      pc: +this.pc,
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
    this.big = this.brothers[this.currentBrother.big];
  }
  mounted() {
    Brothers.getBrothers().then(b => (this.brothers = b));
  }
}
</script>

<style scoped>
#changeButton {
  text-decoration: underline;
  color: #444;
  margin-left: 10px;
  cursor: pointer;
}
h5 {
  display: inline-block;
}
</style>

