import Vue from 'vue';
import VueRouter from 'vue-router';
import Hello from './components/Hello.vue';
import Error404 from './components/Error404.vue';
import BrotherPage from './components/BrotherPage.vue'
import Scroll from './components/Scroll.vue'
import Search from './components/SearchBrothers.vue'

Vue.use(VueRouter);

export const AppRouter = new VueRouter({
  routes: [
    { path: '/', component: Hello }, // Default
    { path: '/brother/:scroll', component: BrotherPage },
    { path: '/scroll', component: Scroll },
    { path: '/search', component: Search },
    { path: '*', component: Error404 } // Not found
  ]
});

export default AppRouter;