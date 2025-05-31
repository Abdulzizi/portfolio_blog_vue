import axios from "axios";
import { showErrorToast, showConfirmationDialog } from "@/helpers/alert";
import { useAuthStore } from "@/state/pinia";

export function axiosInterceptors() {
  setTimeout(() => {
    // Pastikan store siap sebelum dipakai
    const auth = useAuthStore();

    axios.interceptors.request.use(
      (config) => {
        const token = auth.getToken();

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        if (!config.headers["Content-Type"]) {
          config.headers["Content-Type"] = "application/json";
        }

        config.headers["Accept"] = "application/json";

        // Set timeout untuk mendeteksi koneksi lambat (3 detik)
        config.timeout = 3000;

        return config;
      },
      (error) => {
        // showErrorToast("Request Error", "Terjadi kesalahan pada request");
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.code === "ECONNABORTED") {
          showErrorToast("Request Time Out", "Jaringan lambat, coba lagi.");
        } else if (
          error.response &&
          [403, 401].includes(error.response.status)
        ) {
          const confirmed = await showConfirmationDialog(
            "Ooops",
            error.response.data.errors?.[0] || "Terjadi kesalahan pada response"
          );
          if (confirmed) {
            await auth.logout();
            window.location.reload();
          }
        } else {
          console.log(`Error : `, error);
          //   showErrorToast("Error", "Terjadi kesalahan pada response");
        }

        return Promise.reject(error);
      }
    );
  }, 100); // Delay untuk memastikan Pinia siap
}
