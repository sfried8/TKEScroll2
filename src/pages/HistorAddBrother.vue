<template>
  <div class="layout-padding">
    <q-field>
      <div class="row no-wrap">
        <q-input
          v-model="scroll"
          class="rightmargin"
          label="Scroll"
          type="number"
        />
        <q-input
          v-model="pc"
          label="Pledge Class"
          type="number"
        />
      </div>
    </q-field>

    <q-field>
      <div class="row no-wrap">
        <q-input
          v-model="fname"
          class="rightmargin"
          label="First Name"
        />
        <q-input
          v-model="lname"
          label="Last Name"
        />
      </div>
    </q-field>

    <q-input
      v-model="nickname"
      label="Nickname"
    />

    <brother-select
      v-model="big"
      label="Big Brother"
    />

    <q-toggle
      v-model="active"
      label="Active"
    />
    <br />
    <q-btn
      @click="submit"
      icon="add"
    >Add Brother</q-btn>
    <br /><br />
    <div
      v-for="b in pendingBrothers"
      :key="b.scroll"
    >
      {{b.scroll}}. {{b.fname}} {{b.lname}} - {{b.nickname}}
    </div>
    <q-btn
      @click="addAll"
      icon="add"
      :disable="pendingBrothers.length < 1"
    >Add {{pendingBrothers.length}} brother{{pendingBrothers.length != 1 ? "s" : ""}}</q-btn>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import BrotherSelect from "../components/BrotherSelect";
import {
    QBtn,
    QIcon,
    QInput,
    QToggle,
    QField,

} from "quasar";

const DEBUG = true;
@Component({
    name: "histor-add-brother",
    components: {
        QField,
        QBtn,
        QIcon,
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
    brothers = [];
    searcher = null;
    pendingBrothers = [];
    addAll() {
        Brothers.addBrothers(this.pendingBrothers).then(() => {
            this.$q.notify(
                `Successfully added ${this.pendingBrothers.length} Brother${
                    this.pendingBrothers.length > 1 ? "s" : ""
                }!`
            );
            this.pendingBrothers = [];
        });
    }
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
        this.fname = DEBUG
            ? Math.random()
                  .toString(36)
                  .substring(7)
            : "";
        this.lname = DEBUG
            ? Math.random()
                  .toString(36)
                  .substring(7)
            : "";
        this.nickname = DEBUG
            ? Math.random()
                  .toString(36)
                  .substring(7)
            : "";
        this.big = null;

        // Brothers.addBrother(brother);
    }

    mounted() {
        Brothers.getBrothers()
            .then(brothers => {
                const highestScroll = Math.max(...brothers.map(b => +b.scroll));
                const highestPC = Math.max(
                    ...brothers.map(b => (b.pc < 999 ? b.pc : 0))
                );
                this.scroll = highestScroll + 1;
                this.pc = highestPC + 1;
            });
    }
}
</script>

<style scoped>
.rightmargin {
  width: 48%;
  margin-right: 4%;
}
</style>
