<template>
  <div class="brother-page">
    <div class="brother-page-line">{{brother.scroll}}</div>
    <h5>{{brother.fname}} {{brother.lname}}</h5>
    <div
      v-if="brother.pc"
      class="brother-page-line brother-link"
      @click="$router.push('/pc/'+(brother.isZetaTau ? 'ZT':'')+brother.pc)"
    >{{PC}}</div>
    <div
      v-else
      class="brother-page-line"
    >{{PC}}

    </div><br>
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
    <q-btn
      color="positive"
      icon-right="send"
      @click="viewInTree(brother)"
    >View in tree</q-btn>
  </div>

</template>

<script>
  export default {
    props: {
      brother: Object,
      brothers: Array
    },
    computed: {
      Big() {
        return this.brother && this.brother.big
          ? this.brothers[this.brother.big]
          : {};
      },
      Littles() {
        return this.brother
          ? this.brothers.filter(b => b.big == this.brother.scroll)
          : [];
      },
      PC() {
        return this.$util.pledgeClassName(
          this.brother.pc,
          this.brother.isZetaTau
        );
      }
    },
    methods: {
      viewInTree(b) {
        this.$router.push("/tree?scroll=" + b.scroll);
      }
    }
  };
</script>

