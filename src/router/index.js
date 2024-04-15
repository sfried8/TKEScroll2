import { createRouter, createWebHashHistory } from 'vue-router'

import routes from './routes'


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = createRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,
    history: createWebHashHistory(),
    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
