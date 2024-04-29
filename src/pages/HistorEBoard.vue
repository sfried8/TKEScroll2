<template>
  <div class="layout-padding" @keyup.enter="submit">

    <div class="row no-wrap q-col-gutter-lg">

      <brother-select class="col" v-model="Prytanis" label="Prytanis">
        <template v-slot:prepend>
          <img src="~assets/prytanis.png" />
        </template>
      </brother-select>

      <brother-select class="col" v-model="Epiprytanis" label="Epiprytanis">
        <template v-slot:prepend>
          <img src="~assets/epiprytanis.png" />
        </template>
      </brother-select>
    </div>
    <div class="row no-wrap q-col-gutter-lg">
      <brother-select class="col" v-model="Grammateus" label="Grammateus">
        <template v-slot:prepend>
          <img src="~assets/grammateus.png" />
        </template>
      </brother-select>

      <brother-select class="col" v-model="Crysophylos" label="Crysophylos">
        <template v-slot:prepend>
          <img src="~assets/crysophylos.png" />
        </template>
      </brother-select>
    </div>
    <div class="row no-wrap q-col-gutter-lg">
      <brother-select class="col" v-model="Histor" label="Histor">
        <template v-slot:prepend>
          <img src="~assets/histor.png" />
        </template>
      </brother-select>

      <brother-select class="col" v-model="Hypophetes" label="Hypophetes">
        <template v-slot:prepend>
          <img src="~assets/hypophetes.png" />
        </template>
      </brother-select>
    </div>
    <div class="row no-wrap q-col-gutter-lg">
      <brother-select class="col" v-model="Pylortes" label="Pylortes">
        <template v-slot:prepend>
          <img src="~assets/pylortes.png" />
        </template>
      </brother-select>

      <brother-select class="col" v-model="Hegemon" label="Hegemon">
        <template v-slot:prepend>
          <img src="~assets/hegemon.png" />
        </template>
      </brother-select>
    </div>
    <div class="row no-wrap q-col-gutter-lg">

      <brother-select class="col" v-model="Recruitment" label="Recruitment Chairman">
        <template v-slot:prepend>
          <img src="~assets/recruitmentchair.png" />
        </template>
      </brother-select>
      <div class="col"></div>
    </div>
    <q-btn color="positive" class="q-mt-lg" icon="add" @click="submit">Update</q-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Prytanis: null,
      Epiprytanis: null,
      Grammateus: null,
      Crysophylos: null,
      Histor: null,
      Hypophetes: null,
      Pylortes: null,
      Hegemon: null,
      Recruitment: null,
      originalPrytanis: null,
      originalEpiprytanis: null,
      originalGrammateus: null,
      originalCrysophylos: null,
      originalHistor: null,
      originalHypophetes: null,
      originalPylortes: null,
      originalHegemon: null,
      originalRecruitment: null,
    };
  },
  mounted() {
    this.$brothers.getBrothers().then(b => {
      const officers = b.filter(el => !!el?.officer);

      const positions = [
        "Prytanis",
        "Epiprytanis",
        "Grammateus",
        "Crysophylos",
        "Histor",
        "Hypophetes",
        "Pylortes",
        "Hegemon",
        "Recruitment"
      ];
      positions.forEach(pos => {
        const p = officers.find(o => o.officer === pos) || undefined;
        this["original" + pos] = p;
        this[pos] = p;
      });
    });
  },
  methods: {
    async submit() {
      const positions = [
        "Prytanis",
        "Epiprytanis",
        "Grammateus",
        "Crysophylos",
        "Histor",
        "Hypophetes",
        "Pylortes",
        "Hegemon",
        "Recruitment"
      ];
      const changedPositions = positions.filter(
        position => this[position] !== this["original" + position]
      );

      for (const c of changedPositions) {
        await this.$brothers.addOfficer({ title: c, current: this[c].scroll });
      }
      this.$gtm.logEvent("Histor", "UpdateEBoard", "UpdateEBoard");

      this.$q.notify(
        `Successfully updated ${this.$util.prettyJoinList(changedPositions)}`
      );
      for (const pos of positions) {
        this["original" + pos] = this[pos];
      }
    }
  }
};
</script>

<style scoped>
#changeButton {
  text-decoration: underline;
  color: #444;
  cursor: pointer;
}

h5 {
  display: inline-block;
}

.changed::after {
  color: red;
  content: "*";
}

img {
  max-width: 75px;
  max-height: 50%;
  margin-right: 18px;
}
</style>


