<template>
  <div class="layout-padding">
    <div class="row q-col-gutter-lg no-wrap">
      <q-input class="col" v-model="scroll" label="Scroll" type="number" />
      <q-input class="col" v-model="pc" label="Pledge Class" type="number" />
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
const DEBUG = false;
export default {
  data() {
    return {
      scroll: 0,
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
  methods: {
    addAll() {
      this.$brothers.addBrothers(this.pendingBrothers).then(() => {
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
        scroll: `${this.scroll}`,
        fname: this.fname,
        lname: this.lname,
        pc: +this.pc,
        nickname: this.nickname,
        bigS: this.big.scroll,
        active: this.active,
        isZetaTau: this.pc < 0
      };
      this.pendingBrothers.push(brother);
      this.scroll++;
      this.fname = "";
      this.lname = "";
      this.nickname = "";
      this.big = null;

      // Brothers.addBrother(brother);
    }
  },
  mounted() {
    this.$brothers.getBrothers().then(brothers => {
      const highestScroll = Math.max(...brothers.map(b => +(b?.scroll ?? 0)));
      const highestPC = Math.max(...brothers.map(b => (b && b.pc < 999 ? b.pc : 0)));
      this.scroll = highestScroll + 1;
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
