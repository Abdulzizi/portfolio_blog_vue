import { useAuthStore } from "./pinia/auth";
import { createPinia } from "pinia";

const pinia = createPinia();

export default pinia;

export { useAuthStore };
