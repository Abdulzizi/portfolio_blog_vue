import { createApp } from "vue";
import "./assets/index.css";
import "lenis/dist/lenis.css";
import "vue-sonner/style.css";

import pinia from "@/state/pinia";
import { useAuthStore } from "@/state/pinia";
import { axiosInterceptors } from "@/core/interceptor/axios-interceptor";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(pinia);

(async () => {
  const authStore = useAuthStore();
  await authStore.initAuth();

  axiosInterceptors();

  app.use(router);
  app.mount("#app");
})();
