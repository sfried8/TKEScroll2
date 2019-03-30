<template>
  <div
    class="layout-padding"
    @keyup.enter="submit"
  >
    <div class="officer-container">
      <div class="officer">
        <div :class="'jewel'+(hasChanged('Prytanis') ? ' changed':'')"><img src="~assets/prytanis.png" />Prytanis</div>
        <brother-select v-model="Prytanis">
        </brother-select>
      </div>
      <div class="officer">
        <div :class="'jewel'+(hasChanged('Epiprytanis') ? ' changed':'')"><img src="~assets/epiprytanis.png" />Epiprytanis</div>
        <brother-select v-model="Epiprytanis">
        </brother-select>
      </div>
      <div class="officer">
        <div :class="'jewel'+(hasChanged('Grammateus') ? ' changed':'')"><img src="~assets/grammateus.png" />Grammateus</div>
        <brother-select v-model="Grammateus">
        </brother-select>
      </div>
      <div class="officer">
        <div :class="'jewel'+(hasChanged('Crysophylos') ? ' changed':'')"><img src="~assets/crysophylos.png" />Crysophylos</div>
        <brother-select v-model="Crysophylos">
        </brother-select>
      </div>
      <div class="officer">
        <div :class="'jewel'+(hasChanged('Histor') ? ' changed':'')"><img src="~assets/histor.png" />Histor</div>
        <brother-select v-model="Histor">
        </brother-select>
      </div>
      <div class="officer">
        <div :class="'jewel'+(hasChanged('Hypophetes') ? ' changed':'')"><img src="~assets/hypophetes.png" />Hypophetes</div>
        <brother-select v-model="Hypophetes">
        </brother-select>
      </div>
      <div class="officer">
        <div :class="'jewel'+(hasChanged('Pylortes') ? ' changed':'')"><img src="~assets/pylortes.png" />Pylortes</div>
        <brother-select v-model="Pylortes">
        </brother-select>
      </div>
      <div class="officer">
        <div :class="'jewel'+(hasChanged('Hegemon') ? ' changed':'')"><img src="~assets/hegemon.png" />Hegemon</div>
        <brother-select v-model="Hegemon">
        </brother-select>
      </div>
      <q-btn
        color="positive"
        icon="add"
        @click="submit"
      >Update</q-btn>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import Util from "../Util";
import { QBtn } from "quasar";
import BrotherSelect from "components/BrotherSelect";

@Component({
  name: "histor-eboard",
  components: {
    QBtn,
    BrotherSelect
  }
})
export default class Index extends Vue {
  Prytanis = null;
  Epiprytanis = null;
  Grammateus = null;
  Crysophylos = null;
  Histor = null;
  Hypophetes = null;
  Pylortes = null;
  Hegemon = null;
  originalPrytanis = null;
  originalEpiprytanis = null;
  originalGrammateus = null;
  originalCrysophylos = null;
  originalHistor = null;
  originalHypophetes = null;
  originalPylortes = null;
  originalHegemon = null;

  hasChanged(position) {
    return this[position] !== this["original" + position];
  }
  mounted() {
    Brothers.getBrothers().then(b => {
      const officers = b.filter(el => !!el.officer);

      const positions = [
        "Prytanis",
        "Epiprytanis",
        "Grammateus",
        "Crysophylos",
        "Histor",
        "Hypophetes",
        "Pylortes",
        "Hegemon"
      ];
      positions.forEach(pos => {
        const p = officers.find(o => o.officer === pos) || undefined;
        this["original" + pos] = p;
        this[pos] = p;
      });
    });
  }
  async submit() {
    const positions = [
      "Prytanis",
      "Epiprytanis",
      "Grammateus",
      "Crysophylos",
      "Histor",
      "Hypophetes",
      "Pylortes",
      "Hegemon"
    ];
    const changedPositions = positions.filter(this.hasChanged);

    for (const c of changedPositions) {
      await Brothers.addOfficer({ title: c, current: this[c].scroll });
    }
    this.$q.notify(
      `Successfully updated ${Util.prettyJoinList(changedPositions)}`
    );
    for (const pos of positions) {
      this["original" + pos] = this[pos];
    }
  }
}
</script>

<style scoped>
.rightmargin {
  width: 48%;
  margin-right: 4%;
}
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
</style>


