import { defineStore } from "pinia";
import axios, { type AxiosError } from "axios";
import type { User, UserListResponse } from "@/types/user";

interface UserState {
  apiUrl: string;
  users: User[];
  user: User;
  totalUsers: number;
  isLoading: boolean;
  error: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    apiUrl: import.meta.env.VITE_APP_APIURL as string,
    users: [],
    user: {} as User,
    totalUsers: 0,
    isLoading: false,
    error: null,
  }),

  actions: {
    async getAllUsers(): Promise<void> {
      this.isLoading = true;
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
        this.isLoading = false;
      }
    },

    async getUserById(id: number): Promise<User | undefined> {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get<{ data: User }>(
          `${this.apiUrl}/v1/users/${id}`
        );

        const userData = response.data.data;

        // console.log("User data:", userData);

        this.user = userData;
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;

        this.error = axiosError.response?.data?.message || axiosError.message;
        console.error("Fetch user by ID error:", error);
        this.user = {} as User;

        return undefined;
      } finally {
        this.isLoading = false;
      }
    },

    clearError() {
      this.error = null;
    },

    clearUsers() {
      this.users = [];
      this.user = {} as User;
      this.totalUsers = 0;
      this.error = null;
    },

    clearOneUser() {
      this.user = {} as User;
      this.error = null;
    },
  },
});
