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
      <q-btn
        @click="deleteBrother"
        color="negative"
        icon="delete_forever"
      >Delete Brother</q-btn>
      <br /><br />
    </div>
  </div>
</template>

<script>
  import BrotherInfoMixin from "../mixins/BrotherInfoMixin.js";

  export default {
    mixins: [BrotherInfoMixin],
    data() {
      return {
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
    methods: {
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
        this.$brothers
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
            this.$brothers.deleteBrother(this.currentBrother).then(() => {
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
        this.fname = this.currentBrother.fname;
        this.lname = this.currentBrother.lname;
        this.nickname = this.currentBrother.nickname;
        this.pc = this.currentBrother.pc;
        this.active = this.currentBrother.active;
        this.big = this.Brothers[this.currentBrother.big];
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

