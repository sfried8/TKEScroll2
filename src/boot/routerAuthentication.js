// import something here
import { LocalStorage } from "quasar";
// leave the export, even if you don't use it
export default async ({ app, router, Vue }) => {
  router.beforeEach((to, from, next) => {
    if (to.path !== "/firsttime" && !LocalStorage.has("apiKey")) {
      next("/firsttime");
    } else {
      next();
    }
    // Now you need to add your authentication logic here, like calling an API endpoint
  });
};
