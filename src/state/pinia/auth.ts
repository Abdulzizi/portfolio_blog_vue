import { defineStore } from "pinia";
import axios, { type AxiosError } from "axios";

import type {
  User,
  LoginCredentials,
  LoginResponse,
  ApiResponse,
} from "@/types/auth";

interface AuthState {
  apiUrl: string;
  userLogin: User | Record<string, never>;
  bearerToken: string;
  response: ApiResponse;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    apiUrl: import.meta.env.VITE_APP_APIURL as string,
    userLogin: {} as User | Record<string, never>,
    bearerToken: "",
    response: {
      status: null,
      message: null,
      error: [],
    },
  }),

  actions: {
    async login(credential: LoginCredentials): Promise<User | null> {
      try {
        const res = await axios.post<LoginResponse>(
          `${this.apiUrl}/v1/auth/login`,
          credential
        );

        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };

        const { access_token, user } = res.data.data;
        await this.saveToken(access_token);
        await this.saveUser(user);
        this.userLogin = user;
        return user;
      } catch (error) {
        const axiosError = error as AxiosError<{
          message: string;
          errors?: string[];
        }>;

        this.response = {
          status: axiosError.response?.status || 500,
          message: axiosError.response?.data?.message || axiosError.message,
          error: axiosError.response?.data?.errors || [axiosError.message],
        };
        return null;
      }
    },

    async logout(): Promise<void> {
      try {
        const token = this.getToken();
        if (token) {
          await axios.post(
            `${this.apiUrl}/v1/auth/logout`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      } catch (error) {
        const axiosError = error as AxiosError<{
          message: string;
          errors?: string[];
        }>;

        console.error("Logout failed", error);
        this.response = {
          status: axiosError.response?.status || 500,
          message:
            axiosError.response?.data?.message || "Could not logout token.",
          error: axiosError.response?.data?.errors || [axiosError.message],
        };
      } finally {
        this.userLogin = {};
        await this.removeToken();
        await this.removeUser();
      }
    },

    async saveUserLogin(): Promise<void> {
      try {
        const token = this.getToken();
        const response = await axios.get<{ data: User }>(
          `${this.apiUrl}/v1/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.userLogin = response.data.data;
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    },

    async saveToken(token: string): Promise<void> {
      localStorage.setItem("token", token);
      this.bearerToken = token;
    },

    async removeToken(): Promise<void> {
      localStorage.removeItem("token");
      this.bearerToken = "";
    },

    getToken(): string {
      if (this.bearerToken) {
        return this.bearerToken;
      }
      return localStorage.getItem("token") || "";
    },

    async saveUser(user: User): Promise<void> {
      localStorage.setItem("user", JSON.stringify(user));
    },

    async removeUser(): Promise<void> {
      localStorage.removeItem("user");
    },

    getUser(): User | null {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr || userStr === "") {
          return null;
        }
        return JSON.parse(userStr) as User;
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null;
      }
    },

    // Initialize auth state from localStorage
    async initAuth(): Promise<void> {
      const token = this.getToken();
      const user = this.getUser();

      if (token && user) {
        this.bearerToken = token;
        this.userLogin = user;
      }
    },

    clearError(): void {
      this.response = {
        status: null,
        message: null,
        error: [],
      };
    },
  },
});
