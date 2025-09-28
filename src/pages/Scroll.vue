<template>
    <q-page padding>
        <q-btn icon="sort" class="float-right" flat ref="target">
            SORT BY
            <q-menu auto-close anchor="bottom right" self="top middle">
                <q-item clickable @click="sortOption = 'scrollasc'">Scroll Asc</q-item>
                <q-item clickable @click="sortOption = 'scrollsc'">Scroll Desc</q-item>
            </q-menu>
        </q-btn>

        <q-input v-model="currentFilter" type="text" debounce="350" label="filter" />
        <q-list style="background:white" separator padding>
            <q-intersection v-for="b in filteredBrothers" :key="b.original.id" style="height:50px">
                <q-item :to="`/brother/${b.original.id}`">
                    <q-item-section side>{{ b.original.scroll }}</q-item-section>
                    <q-item-section>
                        <q-item-label>
                            <span v-html="b.string"></span>
                        </q-item-label>
                        <q-item-label v-if="b.original.currentOfficer" caption>{{ officerLabel(b.original)
                        }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-intersection>
            <q-item v-if="filteredBrothers.length == 0">
                <q-item-label>No Results Found!</q-item-label>
            </q-item>
        </q-list>
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="primary" />
        </q-page-scroller>
    </q-page>
</template>

<script>
import Fuzzy from "fuzzy";
import DataMixin from "../mixins/DataMixin.js";
import { getOfficerName } from "../model/Enums.js";
export default {
    mixins: [DataMixin],
    data() {
        return {
            sortOption: "scrollasc",
            currentFilter: ""
        };
    },
    computed: {
        filteredBrothers() {
            if (!this.orderedBrothers) {
                return [];
            }
            return Fuzzy.filter(this.currentFilter, this.orderedBrothers, {
                pre: "<b>",
                post: "</b>",
                extract: el => el.fname + " " + el.lname
            });
        },
        orderedBrothers() {
            return this.sortOption === "scrollasc"
                ? this.Scroll
                : this.Scroll.slice().reverse();
        }
    },
    methods: {
        onGetData() {
            this.sortOption = "scrollasc";
        },
        officerLabel(brother) {
            if (!brother.currentOfficer) {
                return "";
            }
            return getOfficerName(brother.currentOfficer);
        }
    }
};
</script>

<style lang="stylus"></style>
