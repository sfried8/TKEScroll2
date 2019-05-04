import gtm from "../gtm.js";

export default ({ router }) => {
  router.afterEach((to, from) => {
    if (
      to.path.indexOf("brother/") >= 0 &&
      from.path.indexOf("brother/") >= 0
    ) {
      //when swiping cards, don't count that as a second page view
      return;
    }
    gtm.logPage(to.path);
  });
};
