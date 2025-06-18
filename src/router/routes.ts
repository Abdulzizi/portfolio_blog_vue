export default [
  {
    path: "/",
    name: "default",
    meta: { title: "Home Page", authRequired: false },
    component: () => import("../views/HomePage/index.vue"),
  },

  {
    path: "/login",
    name: "login",
    meta: { title: "Login Page", authRequired: false },
    component: () => import("../views/Auth/Login/index.vue"),
  },

  {
    path: "/dashboard",
    name: "dashboard",
    meta: { title: "Dashboard Page", authRequired: true },
    component: () => import("../views/Admin/Dashboard/index.vue"),
  },
  {
    path: "/admin/users",
    name: "admin-users",
    meta: { title: "Admin Users Page", authRequired: true },
    component: () => import("../views/Admin/User/index.vue"),
  },
  {
    path: "/admin/users/:id",
    name: "admin-users-edit",
    meta: { title: "Admin Users Edit Page", authRequired: true },
    component: () => import("../views/Admin/User/form.vue"),
  },

  {
    path: "/about",
    name: "about",
    meta: { title: "About Page", authRequired: false },
    component: () => import("../views/About/index.vue"),
  },
  {
    path: "/work",
    name: "work",
    meta: { title: "Work Page", authRequired: false },
    component: () => import("../views/WorkPage/index.vue"),
  },
  {
    path: "/all-projects",
    name: "all projects",
    meta: { title: "Projects Page", authRequired: false },
    component: () => import("../views/WorkPage/ProjectsPage.vue"),
  },
  {
    path: "/project/:slug",
    name: "project",
    meta: { title: "Project Page", authRequired: false },
    component: () => import("../views/WorkPage/ProjectDetail.vue"),
  },
  {
    path: "/blog",
    name: "blog",
    meta: { title: "Blog Page", authRequired: false },
    component: () => import("../views/utility/comingSoon.vue"),
  },
  {
    path: "/connect",
    name: "connect",
    meta: { title: "Connect Page", authRequired: false },
    component: () => import("../views/Connect/index.vue"),
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
