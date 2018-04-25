<template>
    <keep-alive>
        <!-- <div class="layout-padding"> -->
        <q-carousel ref="myCarousel" @slide="slideHandler" style="max-width:90vw;height:100%;">
            <div slot="slide" style="padding:0;height:100%;" v-for="(Brother,index) in currentSlides" v-if="Brother" :key="index">
                <q-card style="margin-top:30px;background:white">
                    <q-card-title>{{Brother.fname}} {{Brother.lname}}
                        <span slot="subtitle" v-if="Brother.officer">{{Brother.officer}}</span>
                    </q-card-title>
                    <q-card-main>
                        <p class="brother-page-line">{{Brother.scroll}}</p>
                        <p class="brother-page-line brother-link" @click="$router.push('/pc/'+(Brother.isZetaTau ? 'ZT':'')+Brother.pc)">{{Brother.isZetaTau ? "Zeta Tau ":""}}Pledge Class {{Brother.pc}}</p>
                        <p class="brother-page-line">{{Brother.nickname}}</p>
                        <p class="brother-page-line brother-link" @click="$refs.myCarousel.goToSlide(Brother.big)">{{Brothers[Brother.big].fname + " " + Brothers[Brother.big].lname}}</p>
                        <p class="brother-page-line" v-if="Brother.littles">Littles:</p>
                        <ul v-if="Brother.littles">
                            <li class="brother-page-line brother-link" v-for="l in Brother.littles" :key="l" @click="$refs.myCarousel.goToSlide(l)">{{Brothers[l].fname + " " + Brothers[l].lname}}</li>
                        </ul>
                        <button @click="viewInTree(Brother)">View in tree</button>
                    </q-card-main>
                </q-card>
                <div v-if="showSwipe" leave-active-class="animated fadeOut" class="animated flash infinite" style="animation-duration:3s;margin:auto;text-align:center">
                    <q-icon name="arrow back" />Swipe to navigate
                    <q-icon name="arrow forward" />
                </div>

            </div>
            <div style="visibility:hidden" slot="slide" v-else>
            </div>

        </q-carousel>
        <!-- </div> -->
    </keep-alive>
</template>

<script lang="ts">
import Vue from "vue";
import Quasar from "quasar";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import BrotherPageContent from "./BrotherPageContent.vue";
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
    TouchSwipe,
    QCarousel,
    QCard,
    QCardTitle,
    QCardMain
} from "quasar";

@Component({
    name: "brother-page",
    components: {
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
        QCarousel,
        QCardTitle,
        QCard,
        QCardMain
    },
    directives: {
        TouchSwipe
    }
})
export default class Index extends Vue {
    enterValue = "";
    leaveValue = "animated slideOutLeft";
    Brothers = [];
    currentSlides = [];
    firstTransition = true;
    showSwipe = true;
    mounted() {
        console.log("mounting brother page");
        Brothers.getBrothers().then(data => {
            this.Brothers = data;
            const index = +((this as any).$route.params.scroll || 0);
            console.log(index);
            this.currentSlides = this.Brothers.map((el, i) => {
                const ret = i > index + 3 || i < index - 3 ? undefined : el;
                return ret;
            });
            this.$nextTick(() => {
                (this as any).$refs.myCarousel.goToSlide(index);
            });
        });
    }
    slideHandler(index, direction) {
        if (this.firstTransition) {
            this.firstTransition = false;
        } else {
            this.showSwipe = false;
        }
        this.currentSlides = this.Brothers.map(
            (el, i) => (i > index + 3 || i < index - 3 ? undefined : el)
        );
    }
    viewInTree(b) {
        (this as any).$router.push("/tree?scroll=" + b.scroll);
    }
}
</script>

<style lang="stylus">
.brother-page {
    border-radius: 4px;
    padding: 40px;
    box-shadow: 0px 4px 20px 0px #888888;
    background-color: #ffaaaa;
}

.brother-page-line {
    font-weight: 300;
}
</style>
