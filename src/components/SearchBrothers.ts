import Vue from "vue";
import Quasar from "quasar";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import FuzzySearch from "fuzzy-search";
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
  terms = "";
  mybrothers = [];
  searcher = null;
  mounted() {
    parseBrothers().then(data => (this.mybrothers = data));
  }
  search(terms, done) {
    setTimeout(() => {
      done(this.myFilter(terms, { field: "label", list: this.mybrothers }));
    }, 50);
  }
  selected(item) {
    (this as any).$router.push({ path: `/brother/${item.value}` });
  }
  myFilter(terms, { field, list }) {
    const token = terms.toLowerCase();
    this.searcher = new FuzzySearch(list, [field], {
      caseSensitive: false,
      sort: true
    });
    return this.searcher.search(token);
  }
  launch(url: string): void {
    openURL(url);
  }
}
