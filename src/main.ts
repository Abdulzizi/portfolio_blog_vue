import { createApp } from "vue";
import "./assets/index.css";
import "lenis/dist/lenis.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");
