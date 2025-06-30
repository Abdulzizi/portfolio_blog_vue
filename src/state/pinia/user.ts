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

    async addUser(payload: Partial<User>): Promise<User | undefined> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.post<{ data: User }>(
          `${this.apiUrl}/v1/users`,
          payload
        );

        const newUser = response.data.data;

        this.users.push(newUser);

        return newUser;
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        this.error = axiosError.response?.data?.message || axiosError.message;
        console.error("Add user error:", error);
        return undefined;
      } finally {
        this.isLoading = false;
      }
    },

    async updateUser(
      id: string | number,
      payload: Partial<User>
    ): Promise<boolean> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.put<{ data: User }>(
          `${this.apiUrl}/v1/users/${id}`,
          payload
        );

        this.user = response.data.data;

        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr) as User;
          Object.assign(user, payload);
          localStorage.setItem("user", JSON.stringify(user));
        }

        return true;
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        this.error = axiosError.response?.data?.message || axiosError.message;
        console.error("Update user error:", error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteUser(id: string | number): Promise<boolean> {
      this.isLoading = true;
      this.error = null;

      try {
        await axios.delete(`${this.apiUrl}/v1/users/${id}`);

        await this.getAllUsers();

        return true;
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        this.error = axiosError.response?.data?.message || axiosError.message;
        console.error("Delete user error:", error);
        return false;
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
