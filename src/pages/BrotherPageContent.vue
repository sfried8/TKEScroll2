<template>
  <div class="brother-page">
    <div class="brother-page-line">{{ member.scroll }}</div>
    <h5>{{ member.displayNameWithBadge }}</h5>
    <div v-if="member.pc"><a :href="'#/pc/' + (member.isZetaTau ? 'ZT' : '') + member.pc">{{ PC }}</a></div>
    <div v-else class="brother-page-line">{{ PC }}

    </div><br>
    <div class="brother-page-line">{{ member.nickname }}</div><br>
    <div class="brother-page-line">
      <a :href="'#/brother/' + Big.id">{{ Big.displayNameWithBadge }}</a>
    </div><br>
    <div v-show="Littles.length > 0">
      <div class="brother-page-line">Littles: </div>
      <ul>
        <li class="brother-page-line brother-link" v-for="l in Littles" :key="l.id"><a :href="'#/brother/' + l.id">{{
          l.displayNameWithBadge }}</a></li>
      </ul>
    </div>

    <q-btn color="positive" icon-right="send" @click="viewInTree(member)">View in tree</q-btn>
  </div>
</template>

<script>
import Member from '../model/Member';

export default {
  props: {
    member: Member,
  },
  computed: {
    Big() {
      return this.member?.big ?? {};
    },
    Littles() {
      return this.member?.littles ?? []
    },
    PC() {
      if (!this.member?.pc) {
        return this.member?.year ?? '';
      }
      return this.$util.pledgeClassName(
        this.member.pc,
        this.member.isZetaTau
      );
    }
  },
  methods: {
    viewInTree(b) {
      this.$router.push("/tree?id=" + b.id);
    }
  }
};
</script>
