import { useAuthStore } from "./pinia/auth";

import { useUserStore } from "./pinia/user";
import { useProjectStore } from "./pinia/project";

import { createPinia } from "pinia";

const pinia = createPinia();

export default pinia;

export { useAuthStore, useUserStore, useProjectStore };
