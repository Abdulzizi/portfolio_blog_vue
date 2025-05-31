import { defineStore } from "pinia";
import axios, { type AxiosError } from "axios";
import type { User, UserListResponse } from "@/types/user";

interface UserState {
  apiUrl: string;
  users: User[];
  totalUsers: number;
  loading: boolean;
  error: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    apiUrl: import.meta.env.VITE_APP_APIURL as string,
    users: [],
    totalUsers: 0,
    loading: false,
    error: null,
  }),

  actions: {
    async getAllUsers(): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get<UserListResponse>(
          `${this.apiUrl}/v1/users`
        );

        const { list, meta } = response.data.data;
        this.users = list;
        this.totalUsers = meta.total;
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        this.error = axiosError.response?.data?.message || axiosError.message;
        console.error("Fetch users error:", error);

        this.users = [];
        this.totalUsers = 0;
      } finally {
        this.loading = false;
      }
    },

    clearError() {
      this.error = null;
    },

    clearUsers() {
      this.users = [];
      this.totalUsers = 0;
      this.error = null;
    },
  },
});
