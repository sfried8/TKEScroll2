<template>
  <div class="brother-page">
    <h4>{{brother.fname}} {{brother.lname}}</h4><br>
    <div class="brother-page-line">{{brother.scroll}}</div><br>
    <div
      class="brother-page-line brother-link"
      @click="$router.push('/pc/'+(brother.isZetaTau ? 'ZT':'')+brother.pc)"
    >{{brother.isZetaTau ? "Zeta Tau ":""}}Pledge Class {{brother.pc}}</div><br>
    <div class="brother-page-line">{{brother.nickname}}</div><br>
    <div
      class="brother-page-line brother-link"
      @click="$router.push('/brother/'+Big.scroll)"
    >
      <div>{{Big.fname}} {{Big.lname}}</div>
    </div><br>
    <div v-show="Littles.length > 0">
      <div class="brother-page-line">Littles: </div>
      <ul>
        <li
          class="brother-page-line brother-link"
          v-for="l in Littles"
          @click="$router.push('/brother/'+l.scroll)"
          :key="l.scroll"
        >{{l.fname}} {{l.lname}}</li>
      </ul>
    </div>
    <button @click="viewInTree(brother)">View in tree</button>
  </div>

</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import { dom, event, openURL, TouchSwipe } from "quasar";

@Component({
  name: "brother-page-content",
  components: {},
  props: {
    brother: Object,
    brothers: Array
  }
})
export default class Index extends Vue {
  get Big() {
    return this.brother && this.brother.big
      ? this.brothers[this.brother.big]
      : {};
  }
  get Littles() {
    return this.brother
      ? this.brothers.filter(b => b.big == this.brother.scroll)
      : [];
  }
  viewInTree(b) {
    this.$router.push("/tree?scroll=" + b.scroll);
  }
}
</script>

