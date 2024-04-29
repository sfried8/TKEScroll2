const routes = [
  {
    path: "/firsttime",
    component: () => import("pages/FirstTimeHere")
  },
  {
    path: "/",
    redirect: "/home",
    component: () => import("pages/MainView"),

    children: [
      { path: "/home", component: () => import("pages/Hello") },

      {
        path: "/brother/:scroll",
        component: () => import("pages/BrotherPage")
      },
      { path: "/pc/:pc", component: () => import("pages/PCPage") },
      { path: "/scroll", component: () => import("pages/Scroll") },
      {
        path: "/histor",
        component: () => import("pages/HistorBase")
      },
      { path: "/eboard", component: () => import("pages/Eboard") },
      { path: "/tree", component: () => import("pages/Tree") }
    ],
  }, // Default
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
];


export default routes;
