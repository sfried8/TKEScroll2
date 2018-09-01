<template>
    <div class="layout-padding" @keyup.enter="submit">
        <q-field>
            <div class="row no-wrap">
                <q-input v-model="scroll" class="rightmargin" float-label="Scroll" type="number" />
                <q-input v-model="pc" float-label="Pledge Class" type="number" />
            </div>
        </q-field>

        <q-field>
            <div class="row no-wrap">
                <q-input v-model="fname" class="rightmargin" float-label="First Name" />
                <q-input v-model="lname" float-label="Last Name" />
            </div>
        </q-field>

        <q-input v-model="nickname" float-label="Nickname" />

        <q-input v-model="big" placeholder="Big Brother">
            <q-autocomplete @search="search" :filter="myfilter" @selected="selected" />
        </q-input>

        <q-toggle v-model="active" label="Active" />
        <br/>
        <q-btn @click="submit" icon="add">Add Brother</q-btn>
        <br/><br/>
        <div v-for="b in pendingBrothers" :key="b.scroll">
            {{b.scroll}}. {{b.fname}} {{b.lname}} - {{b.nickname}}
        </div>
        <q-btn @click="addAll" icon="add" :disable="pendingBrothers.length < 1">Add {{pendingBrothers.length}} brother{{pendingBrothers.length != 1 ? "s" : ""}}</q-btn>
    </div>
</template>

<script lang="ts">
import Fuzzy from "fuzzy";
import Vue from "vue";
import Quasar from "quasar";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import FuzzySearch from "fuzzy-search";

import {
    QBtn,
    QIcon,
    QInput,
    QToggle,
    QField,
    QAutocomplete,
    Toast
} from "quasar";
async function parseBrothers() {
    const result: any = [];
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
const DEBUG = true;
@Component({
    name: "histor-add-brother",
    components: {
        QField,
        QBtn,
        QIcon,
        QAutocomplete,
        QInput,
        QToggle
    }
})
export default class Index extends Vue {
    scroll = 0;
    fname = "";
    lname = "";
    nickname = "";
    pc = 0;
    active = true;
    big = "";
    bigS = 0;
    brothers = [];
    searcher = null;
    pendingBrothers = [];
    addAll() {
        Brothers.addBrothers(this.pendingBrothers).then(() => {
            Toast.create(
                `Successfully added ${this.pendingBrothers.length} Brother${
                    this.pendingBrothers.length > 1 ? "s" : ""
                }!`
            );
            this.pendingBrothers = [];
        });
    }
    submit() {
        const brother = {
            scroll: `${this.scroll}`,
            fname: this.fname,
            lname: this.lname,
            pc: this.pc,
            nickname: this.nickname,
            bigS: this.bigS,
            active: this.active,
            isZetaTau: this.pc < 0
        };
        this.pendingBrothers.push(brother);
        this.scroll++;
        this.fname = DEBUG
            ? Math.random()
                  .toString(36)
                  .substring(7)
            : "";
        this.lname = DEBUG
            ? Math.random()
                  .toString(36)
                  .substring(7)
            : "";
        this.nickname = DEBUG
            ? Math.random()
                  .toString(36)
                  .substring(7)
            : "";
        this.bigS = 0;
        this.big = "";

        // Brothers.addBrother(brother);
    }
    search(terms, done) {
        setTimeout(() => {
            done(this.myfilter(terms, { field: "label", list: this.brothers }));
        }, 50);
    }
    selected(item) {
        this.big = item.label;
        this.bigS = +item.value;
    }
    myfilter(terms, { field, list }) {
        const token = terms.toLowerCase();
        this.searcher = new FuzzySearch(list, [field], {
            caseSensitive: false,
            sort: true
        });
        return this.searcher.search(token);
    }
    mounted() {
        parseBrothers()
            .then(brothers => {
                this.brothers = brothers;
                return Brothers.getBrothers();
            })
            .then(brothers => {
                const highestScroll = Math.max(...brothers.map(b => +b.scroll));
                const highestPC = Math.max(
                    ...brothers.map(b => (b.pc < 999 ? b.pc : 0))
                );
                this.scroll = highestScroll + 1;
                this.pc = highestPC + 1;
            });
    }
}
</script>

<style scoped>
.rightmargin {
    width: 48%;
    margin-right: 4%;
}
</style>
