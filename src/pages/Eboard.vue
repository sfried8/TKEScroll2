<template>
    <div class="layout-padding">
        <div class="eboard">
            <h4>Xi-Upsilon Executive Board</h4>
            <br />
            <div class="officer-container">
                <div class="officer" v-if="PRYTANIS" @click="$router.push('/brother/' + PRYTANIS.id)"
                    :key="PRYTANIS.id">
                    <div class="jewel">
                        <img src="~/assets/prytanis.png" />Prytanis
                    </div>
                    <div class="name">{{ PRYTANIS.displayName }}</div>
                </div>
                <div class="officer" v-if="EPIPRYTANIS" @click="$router.push('/brother/' + EPIPRYTANIS.id)"
                    :key="EPIPRYTANIS.id">
                    <div class="jewel">
                        <img src="~/assets/epiprytanis.png" />Epiprytanis
                    </div>
                    <div class="name">{{ EPIPRYTANIS.displayName }}</div>
                </div>
                <div class="officer" v-if="GRAMMATEUS" @click="$router.push('/brother/' + GRAMMATEUS.id)"
                    :key="GRAMMATEUS.id">
                    <div class="jewel">
                        <img src="~/assets/grammateus.png" />Grammateus
                    </div>
                    <div class="name">{{ GRAMMATEUS.displayName }}</div>
                </div>
                <div class="officer" v-if="CRYSOPHYLOS" @click="$router.push('/brother/' + CRYSOPHYLOS.id)"
                    :key="CRYSOPHYLOS.id">
                    <div class="jewel">
                        <img src="~/assets/crysophylos.png" />Crysophylos
                    </div>
                    <div class="name">{{ CRYSOPHYLOS.displayName }}</div>
                </div>
                <div class="officer" v-if="HISTOR" @click="$router.push('/brother/' + HISTOR.id)" :key="HISTOR.id">
                    <div class="jewel">
                        <img src="~/assets/histor.png" />Histor
                    </div>
                    <div class="name">{{ HISTOR.displayName }}</div>
                </div>
                <div class="officer" v-if="HYPOPHETES" @click="$router.push('/brother/' + HYPOPHETES.id)"
                    :key="HYPOPHETES.id">
                    <div class="jewel">
                        <img src="~/assets/hypophetes.png" />Hypophetes
                    </div>
                    <div class="name">{{ HYPOPHETES.displayName }}</div>
                </div>
                <div class="officer" v-if="PYLORTES" @click="$router.push('/brother/' + PYLORTES.id)"
                    :key="PYLORTES.id">
                    <div class="jewel">
                        <img src="~/assets/pylortes.png" />Pylortes
                    </div>
                    <div class="name">{{ PYLORTES.displayName }}</div>
                </div>
                <div class="officer" v-if="HEGEMON" @click="$router.push('/brother/' + HEGEMON.id)" :key="HEGEMON.id">
                    <div class="jewel">
                        <img src="~/assets/hegemon.png" />Hegemon
                    </div>
                    <div class="name">{{ HEGEMON.displayName }}</div>
                </div>
                <div class="officer" v-if="RECRUITMENT" @click="$router.push('/brother/' + RECRUITMENT.id)"
                    :key="RECRUITMENT.id">
                    <div class="jewel">
                        <img src="~/assets/recruitmentchair.png" />Recruitment Chairman
                    </div>
                    <div class="name">{{ RECRUITMENT.displayName }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BrotherInfoMixin from "../mixins/BrotherInfoMixin.js";
import { OFFICERS } from "../model/Enums.js";
export default {
    mixins: [BrotherInfoMixin],
    data() {
        return {
            PRYTANIS: null,
            EPIPRYTANIS: null,
            GRAMMATEUS: null,
            CRYSOPHYLOS: null,
            HISTOR: null,
            HYPOPHETES: null,
            PYLORTES: null,
            HEGEMON: null,
            RECRUITMENT: null
        };
    },

    methods: {
        onGetBrothers() {
            const officers = this.Brothers.filter(el => !!el?.currentOfficer);
            const positions = Object.values(OFFICERS);
            positions.forEach(
                pos =>
                (this[pos] =
                    officers.find(o => o.currentOfficer === pos) || undefined)
            );
        }
    }
};
</script>

<style lang="stylus" scoped>
    .eboard {
        border-radius: 4px;
        height: 200%;
        padding: 40px;
        box-shadow: 0px 4px 20px 0px #888888;
        background-color: white;
    }

    img {
        max-width: 75px;
    }

    .officer-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .jewel {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100px;
        text-align: center;
    }

    .officer {
        margin: 10px;
        font-weight: 300;
        background-color: #eee;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        border: solid #c5c0c0 1px;
        flex-basis: 400px;

        div.name {
            width: 70%;
            font-weight: bolder;
            text-align: center;
            color: #444;
        }
    }
</style>
