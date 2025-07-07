import { defineStore } from "pinia";
import axios, { type AxiosError } from "axios";
import type { Tag, TagListResponse } from "@/types/tag";

interface TagState {
  apiUrl: string;
  tags: Tag[];
  tag: Tag;
  totalTags: number;
  isLoading: boolean;
  error: string | null;
}

export const useTagStore = defineStore("tag", {
  state: (): TagState => ({
    apiUrl: import.meta.env.VITE_APP_APIURL as string,
    tags: [],
    tag: {} as Tag,
    totalTags: 0,
    isLoading: false,
    error: null,
  }),

  actions: {
    async getAllTags(): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get<TagListResponse>(
          `${this.apiUrl}/v1/tags`
        );

        const { list, meta } = response.data.data;
        this.tags = list;
        this.totalTags = meta.total;
      } catch (error) {
        const axiosError = error as AxiosError<{ errors: string }>;
        this.error = axiosError.response?.data?.errors || axiosError.message;
        console.error("Fetch tags error:", error);
        this.tags = [];
        this.totalTags = 0;
      } finally {
        this.isLoading = false;
      }
    },

    async getTagById(id: string): Promise<Tag | undefined> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get<{ data: Tag }>(
          `${this.apiUrl}/v1/tags/${id}`
        );

        this.tag = response.data.data;
        return this.tag;
      } catch (error) {
        const axiosError = error as AxiosError<{ errors: string }>;
        this.error = axiosError.response?.data?.errors || axiosError.message;
        console.error("Fetch tag by ID error:", error);
        this.tag = {} as Tag;
        return undefined;
      } finally {
        this.isLoading = false;
      }
    },

    async addTag(payload: Partial<Tag>): Promise<Tag | undefined> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.post<{ data: Tag }>(
          `${this.apiUrl}/v1/tags`,
          payload
        );

        const newTag = response.data.data;
        this.tags.push(newTag);
        return newTag;
      } catch (error) {
        const axiosError = error as AxiosError<{ errors: string }>;
        this.error = axiosError.response?.data?.errors || axiosError.message;
        console.error("Add tag error:", error);
        return undefined;
      } finally {
        this.isLoading = false;
      }
    },

    async updateTag(id: string, payload: Partial<Tag>): Promise<boolean> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.put<{ data: Tag }>(
          `${this.apiUrl}/v1/tags/${id}`,
          payload
        );

        this.tag = response.data.data;
        return true;
      } catch (error) {
        const axiosError = error as AxiosError<{ errors: string }>;
        this.error = axiosError.response?.data?.errors || axiosError.message;
        console.error("Update tag error:", error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteTag(id: string): Promise<boolean> {
      this.isLoading = true;
      this.error = null;

      try {
        await axios.delete(`${this.apiUrl}/v1/tags/${id}`);
        await this.getAllTags();
        return true;
      } catch (error) {
        const axiosError = error as AxiosError<{ errors: string }>;
        this.error = axiosError.response?.data?.errors || axiosError.message;
        console.error("Delete tag error:", error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    clearError() {
      this.error = null;
    },

    clearTags() {
      this.tags = [];
      this.tag = {} as Tag;
      this.totalTags = 0;
      this.error = null;
    },

    clearOneTag() {
      this.tag = {} as Tag;
      this.error = null;
    },
  },
});
