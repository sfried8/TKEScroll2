import Vue from "vue";
import VueRouter from "vue-router";
import Hello from "./components/Hello.vue";
import Error404 from "./components/Error404.vue";
import BrotherPage from "./components/BrotherPage.vue";
import Scroll from "./components/Scroll.vue";
import Search from "./components/SearchBrothers.vue";
import MainView from "./components/MainView.vue";
import BrotherPageContent from "./components/BrotherPageContent.vue";
import PCPage from "./components/PCPage.vue";

Vue.use(VueRouter);

export const AppRouter = new VueRouter({
  routes: [
    {
      path: "/",
      component: MainView,
      children: [
        { path: "", component: Scroll },
        {
          path: "/brother/:scroll",
          component: BrotherPage
        },
        { path: "/pc/:pc", component: PCPage },
        { path: "/scroll", component: Scroll },
        { path: "/search", component: Search },
        { path: "/eboard", component: Hello },
        { path: "/tree", component: Hello }
      ]
    }, // Default
    { path: "*", component: Scroll } // Not found
  ]
});

export default AppRouter;
