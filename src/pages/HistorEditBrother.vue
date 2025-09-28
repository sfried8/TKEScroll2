<template>
  <div class="layout-padding">
    <brother-select label="Brother to edit" v-show="!currentBrother" v-model="currentBrother" />
    <div v-show="currentBrother">
      <h5 v-if="currentBrother">{{ currentBrother.fname }}&nbsp;{{ currentBrother.lname }}</h5>
      <span @click="currentBrother = null" id="changeButton">change</span>

      <div class="row no-wrap q-col-gutter-lg">

        <q-select v-model="type" class="col" label="Member Type" :options="memberTypes" />
      </div>

      <div class="row no-wrap q-col-gutter-lg">

        <q-input v-model="scroll" class="col" label="Scroll" type="number" />
        <q-input v-model="pc" class="col" label="Pledge Class" type="number" />
        <q-input v-model="year" class="col" label="Year" type="number" />
      </div>

      <div class="row no-wrap q-col-gutter-lg">

        <q-input v-model="fname" class="col" label="First Name" />
        <q-input v-model="lname" class="col" label="Last Name" />
      </div>
      <div class="row no-wrap q-col-gutter-lg">
        <q-input class="col" v-model="nickname" label="Nickname" />
        <brother-select class="col" v-model="big" label="Big Brother" />
      </div>
      <q-toggle v-model="active" label="Active" />
      <q-select v-model="achievements" multiple class="col" label="Achievements" :options="achievementTypes" />
      <br /><br /><br />
      <q-btn @click="submit" color="positive" icon="add">Update Brother</q-btn>
      <q-btn @click="deleteBrother" color="negative" icon="delete_forever">Delete Brother</q-btn>
      <br /><br />
    </div>
  </div>
</template>

<script>
import DataMixin from "../mixins/DataMixin.js";
import { ACHIEVEMENTS, PrettyAchievement, PrettyType } from "../model/Enums.js";

export default {
  mixins: [DataMixin],
  data() {
    return {
      type: "",
      year: null,
      achievements: [],
      scroll: 0,
      fname: "",
      lname: "",
      nickname: "",
      pc: 0,
      active: true,
      big: null,
      currentBrother: null
    };
  },
  computed: {
    memberTypes() {
      return Object.keys(PrettyType).map(k => ({
        label: PrettyType[k],
        value: k
      }));
    },
    achievementTypes() {
      return Object.keys(PrettyAchievement).map(k => ({
        label: PrettyAchievement[k],
        value: k
      }));
    }
  },
  methods: {
    submit() {
      const brother = {
        id: this.currentBrother.id,
        type: this.type.value,
        year: this.year,
        scroll: this.scroll,
        fname: this.fname,
        lname: this.lname,
        pc: this.pc != undefined ? +this.pc : undefined,
        nickname: this.nickname,
        bigId: this.big?.id,
        active: this.active,
        achievements: this.achievements.map(a => a.value),
        isZetaTau: false
      };
      this.$gtm.logEvent("Histor", "EditBrother", "EditBrother");

      this.$members
        .addBrother(brother)
        .then(
          this.$q.notify(
            `Successfully updated information for ${this.currentBrother}!`
          )
        );

      // Brothers.addBrother(brother);
    },
    deleteBrother() {
      this.$q
        .dialog({
          title: "Are you SURE?",
          message:
            "This action can NOT be undone. Only do this if you really know what you're doing!",
          ok: "Delete",
          cancel: "Never mind"
        })
        .onOk(() => {
          this.$gtm.logEvent("Histor", "DeleteBrother", "DeleteBrother");
          this.$members.deleteBrother(this.currentBrother).then(() => {
            this.$q.notify(`Deleted`);
            this.currentBrother = null;
          });
        })
        .onCancel(() => console.log("cancelled"));
    }
  },
  watch: {
    currentBrother(val, oldVal) {
      if (!val) {
        return;
      }
      this.scroll = this.currentBrother.scroll;
      this.type = { label: PrettyType[this.currentBrother.type], value: this.currentBrother.type };
      this.achievements = this.currentBrother.achievements.map(a => ({
        label: PrettyAchievement[a], value: a
      }));
      this.fname = this.currentBrother.fname;
      this.lname = this.currentBrother.lname;
      this.nickname = this.currentBrother.nickname;
      this.pc = this.currentBrother.pc;
      this.active = this.currentBrother.active;
      this.big = this.currentBrother.big;
      this.year = this.currentBrother.year;
    }
  }
};
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
