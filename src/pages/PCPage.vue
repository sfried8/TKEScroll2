<template>
  <div class="layout-padding">
    <div class="pc-page">
      <h4>{{PCName}}</h4><br>

      <div
        class="pc-page-line brother-link"
        v-for="pb in PBros"
        @click="$router.push('/brother/'+pb.scroll)"
        :key="pb.scroll"
      >{{pb.scroll}}. {{pb.fname}} {{pb.lname}}</div>

    </div>
  </div>

</template>

<script lang="js">
import Vue from "vue";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import Util from "../Util"
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
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  TouchSwipe
} from "quasar";

@Component({
  name: "pc-page",
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain
  }
})
export default class Index extends Vue {
  Brothers = [];
  pc = 0;
  isZT = false;
  mounted() {
    const pcparam = this.$route.params.pc;
    this.isZT = pcparam.indexOf("ZT") === 0;
    if (this.isZT) {
      this.pc = +pcparam.slice(2);
    } else {
      this.pc = +pcparam;
    }
    this.Brothers = [];
    Brothers.getBrothers().then(data => (this.Brothers = data));
  }
  get PBros() {
    return this.Brothers.filter(
      el => el.pc === this.pc && el.isZetaTau === this.isZT
    );
  }
  get PCName() {
    return Util.pledgeClassName(this.pc,this.isZT,true)
  }
}
</script>

<style lang="stylus" scoped>
.pc-page {
  border-radius: 4px;
  height: 200%;
  padding: 40px;
  box-shadow: 0px 4px 20px 0px #888888;
  background-color: white;
}

.pc-page-line {
  margin-bottom: 10px;
  font-weight: 300;
}
</style>
