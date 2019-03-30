const routes = [
  {
    path: "/firsttime",
    component: () => import("pages/FirstTimeHere")
  },
  {
    path: "/",
    component: () => import("pages/MainView"),
    children: [
      { path: "home", component: () => import("pages/Hello") },

      {
        path: "/brother/:scroll",
        component: () => import("pages/BrotherPage")
      },
      { path: "/pc/:pc", component: () => import("pages/PCPage") },
      { path: "/scroll", component: () => import("pages/Scroll") },
      { path: "/search", component: () => import("pages/SearchBrothers") },
      {
        path: "/histor",
        component: () => import("pages/HistorBase")
      },
      { path: "/eboard", component: () => import("pages/Eboard") },
      { path: "/tree", component: () => import("pages/Tree") }
    ]
  }, // Default
  { path: "*", component: () => import("pages/Hello") } // Not found,
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
