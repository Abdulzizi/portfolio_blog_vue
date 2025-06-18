import axios from "axios";
import { showErrorToast, showConfirmationDialog } from "@/helpers/alert";
import { useAuthStore } from "@/state/pinia";

export function axiosInterceptors() {
  // Remove setTimeout - interceptors should be set up immediately
  const auth = useAuthStore();

  axios.interceptors.request.use(
    (config) => {
      const token = auth.getToken();

      // console.log("Token from interceptor:", token); // Debug log

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }

      config.headers["Accept"] = "application/json";

      // Set timeout untuk mendeteksi koneksi lambat (10 detik - increased)
      config.timeout = 10000;

      console.log("Request config:", config); // Debug log

      return config;
    },
    (error) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.error("Response interceptor error:", error);

      if (error.code === "ECONNABORTED") {
        showErrorToast("Request Time Out", "Jaringan lambat, coba lagi.");
      }
      if (error.response && [403, 401].includes(error.response.status)) {
        await auth.logout();
        window.location.href = "/login";
      } else {
        console.log(`Error : `, error);
      }

      return Promise.reject(error);
    }
  );
}
