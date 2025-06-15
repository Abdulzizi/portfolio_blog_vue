import { createWebHistory, createRouter } from "vue-router";
import routes from "./routes";
import appConfig from "../../app.config.json";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authRequired = to.matched.some((route) => route.meta.authRequired);
  const loggeduser = localStorage.getItem("token");
  if (authRequired && !loggeduser) {
    next({ name: "login", query: { redirectFrom: to.fullPath } });
  } else {
    next();
  }
});

router.beforeResolve((to) => {
  document.title = to.meta.title + " | " + appConfig.title;
});

export default router;
