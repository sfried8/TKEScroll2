<template>
    <div class="layout-padding">
      <div class="brother-page">
      <h4>{{Brother.fname}} {{Brother.lname}}</h4><br>
      <div class="brother-page-line">{{Brother.scroll}}</div><br>
      <div class="brother-page-line brother-link" @click="$router.push('/pc/'+(Brother.isZetaTau ? 'ZT':'')+Brother.pc)">{{Brother.isZetaTau ? "Zeta Tau ":""}}Pledge Class {{Brother.pc}}</div><br>
      <div class="brother-page-line">{{Brother.nickname}}</div><br>
      <div class="brother-page-line brother-link" @click="$router.push('/brother/'+Big.scroll)"><div>{{Big.fname}} {{Big.lname}}</div></div><br>
      <div v-show="Littles.length > 0">
        <div class="brother-page-line">Littles: </div>
        <ul>
          <li class="brother-page-line brother-link" v-for="l in Littles" @click="$router.push('/brother/'+l.scroll)" :key="l.scroll">{{l.fname}} {{l.lname}}</li>
        </ul>
      </div>
      </div>
    </div>

</template>

<script lang="ts">
import Vue from "vue";
import Quasar from "quasar";
import Component from "vue-class-component";
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
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  TouchSwipe
} from "quasar";

@Component({
  name: "brother-page-content",
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
  },
  props: {
    Brothers
  }
})
export default class Index extends Vue {
  Brothers: any[];
  get Brother() {
    return this.Brothers[(this as any).$route.params.scroll] || {};
  }
  get Big() {
    return this.Brother && this.Brother.big
      ? this.Brothers[this.Brother.big]
      : {};
  }
  get Littles() {
    return this.Brother
      ? this.Brothers.filter(b => b.big == this.Brother.scroll)
      : [];
  }
}
</script>

<style lang="stylus" scoped>
.brother-page
  border-radius 4px
  height 200%
  padding 40px
  box-shadow 0px 4px 20px 0px #888888;
  background-color #eeeeee
.brother-page-line
  margin-bottom 10px
  font-weight 300
.brother-link
  padding 3px
  background-color #EEAAAA
  border-radius 4px
  box-shadow 0px 2px 5px 0px #888888;
  div 
    width 95%

</style>
