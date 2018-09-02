<template>
    <div class="layout-padding" @keyup.enter="submit">
        <div class="officer-container">
            <div class="officer">
                <div :class="'jewel'+(hasChanged('Prytanis') ? ' changed':'')"><img src="~assets/prytanis.png" />Prytanis</div>
                <q-input v-model="PrytanisName">
                    <q-autocomplete @search="search" :filter="myfilter" @selected="updatePry" />
                </q-input>
            </div>
            <div class="officer">
                <div :class="'jewel'+(hasChanged('Epiprytanis') ? ' changed':'')"><img src="~assets/epiprytanis.png" />Epiprytanis</div>
                <q-input v-model="EpiprytanisName">
                    <q-autocomplete @search="search" :filter="myfilter" @selected="updateEpi" />
                </q-input>
            </div>
            <div class="officer">
                <div :class="'jewel'+(hasChanged('Grammateus') ? ' changed':'')"><img src="~assets/grammateus.png" />Grammateus</div>
                <q-input v-model="GrammateusName">
                    <q-autocomplete @search="search" :filter="myfilter" @selected="updateGra" />
                </q-input>
            </div>
            <div class="officer">
                <div :class="'jewel'+(hasChanged('Crysophylos') ? ' changed':'')"><img src="~assets/crysophylos.png" />Crysophylos</div>
                <q-input v-model="CrysophylosName">
                    <q-autocomplete @search="search" :filter="myfilter" @selected="updateCry" />
                </q-input>
            </div>
            <div class="officer">
                <div :class="'jewel'+(hasChanged('Histor') ? ' changed':'')"><img src="~assets/histor.png" />Histor</div>
                <q-input v-model="HistorName">
                    <q-autocomplete @search="search" :filter="myfilter" @selected="updateHis" />
                </q-input>
            </div>
            <div class="officer">
                <div :class="'jewel'+(hasChanged('Hypophetes') ? ' changed':'')"><img src="~assets/hypophetes.png" />Hypophetes</div>
                <q-input v-model="HypophetesName">
                    <q-autocomplete @search="search" :filter="myfilter" @selected="updateHyp" />
                </q-input>
            </div>
            <div class="officer">
                <div :class="'jewel'+(hasChanged('Pylortes') ? ' changed':'')"><img src="~assets/pylortes.png" />Pylortes</div>
                <q-input v-model="PylortesName">
                    <q-autocomplete @search="search" :filter="myfilter" @selected="updatePyl" />
                </q-input>
            </div>
            <div class="officer">
                <div :class="'jewel'+(hasChanged('Hegemon') ? ' changed':'')"><img src="~assets/hegemon.png" />Hegemon</div>
                <q-input v-model="HegemonName">
                    <q-autocomplete @search="search" :filter="myfilter" @selected="updateHeg" />
                </q-input>
            </div>
            <q-btn color="positive" icon="add" @click="submit">Update</q-btn>
        </div>
    </div>
</template>

<script lang="js">
import Vue from "vue";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import FuzzySearch from "fuzzy-search";
import Util from "../Util";
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
    BackToTop,
    QSelect,
    QInput,
    Loading,
    QToggle,
    QField,
    QAutocomplete,
    QPopover
} from "quasar";
async function parseBrothers() {
    const result = [];
    const brothers = await Brothers.getBrothers();
    for (let scroll in brothers) {
        const brother = brothers[scroll];
        result.push({
            label: `${brother.fname} ${brother.lname}`,
            sublabel: `${brother.isZetaTau ? "Zeta Tau " : ""}PC ${brother.pc}`,
            icon: "chevron right",
            value: brother.scroll
        });
    }
    return result;
}
@Component({
    name: "histor-eboard",
    components: {
        QLayout,
        QToolbar,
        QField,
        QToolbarTitle,
        QBtn,
        QIcon,
        QList,
        QListHeader,
        QItem,
        QAutocomplete,
        QItemSide,
        QItemMain,
        QSelect,
        QInput,
        QToggle,
        QPopover
    },
    directives: {
        BackToTop
    }
})
export default class Index extends Vue {
    brothers = [];
    currentBrother = "";
    searcher = null;
    brotherObjects = [];
    Prytanis = 0;
    Epiprytanis = 0;
    Grammateus = 0;
    Crysophylos = 0;
    Histor = 0;
    Hypophetes = 0;
    Pylortes = 0;
    Hegemon = 0;
    originalPrytanis = 0;
    originalEpiprytanis = 0;
    originalGrammateus = 0;
    originalCrysophylos = 0;
    originalHistor = 0;
    originalHypophetes = 0;
    originalPylortes = 0;
    originalHegemon = 0;
    PrytanisName = "";
    EpiprytanisName = "";
    GrammateusName = "";
    CrysophylosName = "";
    HistorName = "";
    HypophetesName = "";
    PylortesName = "";
    HegemonName = "";
    search(terms, done) {
        setTimeout(() => {
            done(this.myfilter(terms, { field: "label", list: this.brothers }));
        }, 50);
    }
    update(item, position) {
        this[position] = item.value;
        this[position + "Name"] = item.label;
    }
    myfilter(terms, { field, list }) {
        const token = terms.toLowerCase();
        this.searcher = new FuzzySearch(list, [field], {
            caseSensitive: false,
            sort: true
        });
        return this.searcher.search(token);
    }
    updatePry(item) {
        this.update(item, "Prytanis");
    }
    updateEpi(item) {
        this.update(item, "Epiprytanis");
    }
    updateGra(item) {
        this.update(item, "Grammateus");
    }
    updateCry(item) {
        this.update(item, "Crysophylos");
    }
    updateHis(item) {
        this.update(item, "Histor");
    }
    updateHyp(item) {
        this.update(item, "Hypophetes");
    }
    updatePyl(item) {
        this.update(item, "Pylortes");
    }
    updateHeg(item) {
        this.update(item, "Hegemon");
    }
    hasChanged(position) {
        console.log(`${this[position]} : ${this["original" + position]}`);
        return this[position] !== this["original" + position];
    }
    mounted() {
        parseBrothers()
            .then(brothers => {
                this.brothers = brothers;
                return Brothers.getBrothers();
            })
            .then(brothers => {
                this.brotherObjects = brothers;
                const officers = this.brotherObjects.filter(el => !!el.officer);
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
                    const p =
                        officers.find(o => o.officer === pos) || undefined;
                    this["original" + pos] = p.scroll;
                    this[pos] = p.scroll;
                    this[pos + "Name"] = `${p.fname} ${p.lname}`;
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
            await Brothers.addOfficer({ title: c, current: +this[c] });
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


