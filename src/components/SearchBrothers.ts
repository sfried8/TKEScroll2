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
    QItemMain,
    QAutocomplete,
    QInput,
    QInputFrame,
    QSearch,
    filter
} from 'quasar';



function parseBrothers() {
    const result: any = [];
    for (let scroll in Brothers) {
        console.log(scroll)
        const brother = Brothers[scroll];
        result.push({
            label: brother.Name,
            sublabel: "",
            icon: "chevron right",
            value: brother.Scroll
        })
    }
    return result
}

@Component({
    name: "search-brothers",
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
        QAutocomplete,
        QSearch,
        QInput,
        QInputFrame,
        QItemMain
    }
})
export default class Index extends Vue {

    mybrothers = parseBrothers();
    terms = '';
    search(terms, done) {
        done(filter(terms, { field: "label", list: parseBrothers() }))
    }
    selected(item) {
        this.$router.push({ path: `/brother/${item.value}` })
    }

    launch(url: string): void {
        openURL(url);
    }




}
