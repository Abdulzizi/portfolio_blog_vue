export default [
  {
    path: "/",
    name: "default",
    meta: { title: "Home Page", authRequired: false },
    component: () => import("../views/HomePage/index.vue"),
  },
  {
    path: "/about",
    name: "about",
    meta: { title: "About Page", authRequired: false },
    component: () => import("../views/About/index.vue"),
  },


  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: "/404",
    name: "NotFound",
    component: () => import("../views/utility/404.vue"),
    meta: {
      title: "404 Not Found",
    },
  },
  // Catch-all route using a dynamic param with a custom regexp
  {
    path: "/:catchAll(.*)", // This replaces the previous wildcard
    redirect: { name: "NotFound" },
  },
];
