import Vue from 'vue';
import Quasar from 'quasar';
import Component from 'vue-class-component';
import Brothers from '../Brothers'
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
    QItemMain
} from 'quasar';





@Component({
    name: 'scroll',
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
        QItemMain
    }
})
export default class Index extends Vue {


    get Brothers() {
        return Brothers
    }




}
