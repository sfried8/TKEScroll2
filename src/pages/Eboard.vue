<template>
    <div class="layout-padding">
        <div class="eboard">
            <h4>Xi-Upsilon Executive Board</h4>
            <br />
            <div class="officer-container">
                <div
                    class="officer"
                    v-if="Prytanis"
                    @click="$router.push('/brother/'+Prytanis.scroll)"
                    :key="Prytanis.scroll"
                >
                    <div class="jewel">
                        <img src="~/assets/prytanis.png" />Prytanis
                    </div>
                    <div class="name">{{Prytanis.fname}} {{Prytanis.lname}}</div>
                </div>
                <div
                    class="officer"
                    v-if="Epiprytanis"
                    @click="$router.push('/brother/'+Epiprytanis.scroll)"
                    :key="Epiprytanis.scroll"
                >
                    <div class="jewel">
                        <img src="~/assets/epiprytanis.png" />Epiprytanis
                    </div>
                    <div class="name">{{Epiprytanis.fname}} {{Epiprytanis.lname}}</div>
                </div>
                <div
                    class="officer"
                    v-if="Grammateus"
                    @click="$router.push('/brother/'+Grammateus.scroll)"
                    :key="Grammateus.scroll"
                >
                    <div class="jewel">
                        <img src="~/assets/grammateus.png" />Grammateus
                    </div>
                    <div class="name">{{Grammateus.fname}} {{Grammateus.lname}}</div>
                </div>
                <div
                    class="officer"
                    v-if="Crysophylos"
                    @click="$router.push('/brother/'+Crysophylos.scroll)"
                    :key="Crysophylos.scroll"
                >
                    <div class="jewel">
                        <img src="~/assets/crysophylos.png" />Crysophylos
                    </div>
                    <div class="name">{{Crysophylos.fname}} {{Crysophylos.lname}}</div>
                </div>
                <div
                    class="officer"
                    v-if="Histor"
                    @click="$router.push('/brother/'+Histor.scroll)"
                    :key="Histor.scroll"
                >
                    <div class="jewel">
                        <img src="~/assets/histor.png" />Histor
                    </div>
                    <div class="name">{{Histor.fname}} {{Histor.lname}}</div>
                </div>
                <div
                    class="officer"
                    v-if="Hypophetes"
                    @click="$router.push('/brother/'+Hypophetes.scroll)"
                    :key="Hypophetes.scroll"
                >
                    <div class="jewel">
                        <img src="~/assets/hypophetes.png" />Hypophetes
                    </div>
                    <div class="name">{{Hypophetes.fname}} {{Hypophetes.lname}}</div>
                </div>
                <div
                    class="officer"
                    v-if="Pylortes"
                    @click="$router.push('/brother/'+Pylortes.scroll)"
                    :key="Pylortes.scroll"
                >
                    <div class="jewel">
                        <img src="~/assets/pylortes.png" />Pylortes
                    </div>
                    <div class="name">{{Pylortes.fname}} {{Pylortes.lname}}</div>
                </div>
                <div
                    class="officer"
                    v-if="Hegemon"
                    @click="$router.push('/brother/'+Hegemon.scroll)"
                    :key="Hegemon.scroll"
                >
                    <div class="jewel">
                        <img src="~/assets/hegemon.png" />Hegemon
                    </div>
                    <div class="name">{{Hegemon.fname}} {{Hegemon.lname}}</div>
                </div>
                <div
                    class="officer"
                    v-if="Recruitment"
                    @click="$router.push('/brother/'+Recruitment.scroll)"
                    :key="Recruitment.scroll"
                >
                    <div class="jewel">
                        <img src="~/assets/recruitmentchair.png" />Recruitment Chairman
                    </div>
                    <div class="name">{{Recruitment.fname}} {{Recruitment.lname}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BrotherInfoMixin from "../mixins/BrotherInfoMixin.js";
    export default {
        mixins: [BrotherInfoMixin],
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
                Recruitment: null
            };
        },

        methods: {
            onGetBrothers() {
                const officers = this.Brothers.filter(el => !!el.officer);
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
                positions.forEach(
                    pos =>
                        (this[pos] =
                            officers.find(o => o.officer === pos) || undefined)
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
