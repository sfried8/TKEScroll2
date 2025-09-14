<template>
  <div class="brother-page">
    <div class="brother-page-line">{{ brother.scroll }}</div>
    <h5>{{ brother.displayName }}</h5>
    <div v-if="brother.pc"><a :href="'#/pc/' + (brother.isZetaTau ? 'ZT' : '') + brother.pc">{{ PC }}</a></div>
    <div v-else class="brother-page-line">{{ PC }}

    </div><br>
    <div class="brother-page-line">{{ brother.nickname }}</div><br>
    <div class="brother-page-line">
      <a :href="'#/brother/' + Big.scroll">{{ Big.displayName }}</a>
    </div><br>
    <div v-show="Littles.length + Sweethearts.length > 0">
      <div class="brother-page-line">Littles: </div>
      <ul>
        <li class="brother-page-line brother-link" v-for="l in Littles" :key="l.scroll"><a
            :href="'#/brother/' + l.scroll">{{ l.displayName }}</a></li>
        <li class="brother-page-line brother-link" v-for="l in Sweethearts" :key="l.id"><a
            :href="'#/other/' + l.id">{{ l.displayName }}</a></li>
      </ul>
    </div>

    <q-btn color="positive" icon-right="send" @click="viewInTree(brother)">View in tree</q-btn>
  </div>
</template>

<script>
export default {
  props: {
    brother: Object,
    brothers: Array,
    others: Object
  },
  computed: {
    Big() {
      return this.brother?.big && this.brothers[this.brother.big]
        ? this.brothers[this.brother.big]
        : {};
    },
    Littles() {
      return this.brother
        ? this.brothers.filter(b => b?.big == this.brother.scroll)
        : [];
    },
    Sweethearts() {
      return this.brother?.otherLittles?.SWEETHEART
        ? this.brother.otherLittles.SWEETHEART.map(s => this.others[s])
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
