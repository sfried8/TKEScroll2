<template>
  <div class="layout-padding">
    <div class="row q-col-gutter-lg no-wrap">
      <q-input class="col" v-model="scroll" label="Scroll" type="number" />
      <q-input class="col" v-model="pc" label="Pledge Class" type="number" />
      <q-input v-model="year" class="col" label="Year" type="number" />
    </div>
    <div class="row no-wrap q-col-gutter-lg">

      <q-select v-model="type" class="col" label="Member Type" :options="memberTypes" />
    </div>
    <div class="row q-col-gutter-lg no-wrap">
      <q-input class="col" v-model="fname" label="First Name" />
      <q-input class="col" v-model="lname" label="Last Name" />
    </div>

    <div class="row q-col-gutter-lg no-wrap">
      <q-input class="col" v-model="nickname" label="Nickname" />
      <brother-select class="col" v-model="big" label="Big Brother" />
    </div>

    <q-toggle v-model="active" label="Active" />
    <q-select v-model="achievements" multiple class="col" label="Achievements" :options="achievementTypes" />
    <br />
    <q-btn @click="submit" icon="add">Add</q-btn>
    <br /><br />
    <div v-for="b in pendingBrothers" :key="b.scroll">
      {{ b.scroll }}. {{ b.fname }} {{ b.lname }} - {{ b.nickname }}
    </div>
    <q-btn @click="addAll" icon-right="send" color="positive" v-if="pendingBrothers.length >= 1">Add
      {{ pendingBrothers.length }} brother{{ pendingBrothers.length != 1 ? "s" : "" }} to the database</q-btn>
  </div>
</template>

<script>
import { PrettyType, TYPES } from '../model/Enums';
import { PrettyAchievement } from '../model/Enums';

const DEBUG = false;
export default {
  data() {
    return {
      year: null,
      type: { label: PrettyType.BROTHER, value: TYPES.BROTHER },
      achievements: [],
      scroll: 0,
      highestScroll: 0,
      fname: "",
      lname: "",
      nickname: "",
      pc: 0,
      active: true,
      big: null,
      searcher: null,
      pendingBrothers: []
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
    addAll() {
      this.$members.addBrothers(this.pendingBrothers).then(() => {
        this.$q.notify(
          `Successfully added ${this.pendingBrothers.length} Brother${this.pendingBrothers.length > 1 ? "s" : ""
          }!`
        );
        this.$gtm.logEvent(
          "Histor",
          "AddBrother",
          "AddBrother",
          this.pendingBrothers.length
        );
        this.pendingBrothers = [];
      });
    },
    submit() {
      const brother = {
        scroll: this.scroll,
        fname: this.fname,
        lname: this.lname,
        pc: +this.pc,
        year: this.year,
        achievements: this.achievements.map(a => a.value),
        type: this.type.value,
        nickname: this.nickname,
        bigId: this.big.id,
        active: this.active,
        isZetaTau: this.pc < 0
      };
      this.pendingBrothers.push(brother);
      if (this.scroll) {
        this.scroll++;
      }
      this.fname = "";
      this.lname = "";
      this.nickname = "";
      this.achievements = [];
      this.big = null;

      // Brothers.addBrother(brother);
    },
  },
  mounted() {
    this.$members.getScroll().then(brothers => {
      this.highestScroll = Math.max(...brothers.map(b => +(b?.scroll ?? 0)));
      const highestPC = Math.max(...brothers.map(b => (b && b.pc < 999 ? b.pc : 0)));
      this.scroll = this.highestScroll + 1;
      this.pc = highestPC;
    });
  }
};
</script>

<style>
.q-field__prepend {
  padding-right: 0 !important;
}
</style>
