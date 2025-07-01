import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";
import type {
  Project,
  ProjectListResponse,
  ProjectListMeta,
  ProjectBySlugResponse,
} from "@/types/project";

const safeParse = (json?: string) => {
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
};

const formatPeriod = (start?: string | null, end?: string | null) => {
  if (!start) return "—";
  const fmt = (d: string) =>
    new Date(d).toLocaleString("default", { month: "long", year: "numeric" });
  if (!end || start === end) return fmt(start);
  return `${fmt(start)} – ${fmt(end)}`;
};

const enrichProject = (p: Project, firstId: string | undefined) => ({
  ...p,
  status: p.is_published === (1 as 0 | 1) ? "published" : "draft",
  techStack: safeParse(p.tech_stack),
  featured: (p.images?.length ?? 0) > 0 || p.id === firstId,
  periodLabel: formatPeriod(p.start_date, p.end_date),
});

interface ProjectState {
  apiUrl: string;
  projects: Project[];
  project: Project | {};
  meta: ProjectListMeta | null;
  isLoading: boolean;
  error: string | null;
}

export const useProjectStore = defineStore("project", {
  state: (): ProjectState => ({
    apiUrl: import.meta.env.VITE_APP_APIURL as string,
    projects: [],
    project: {},
    meta: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    published(state): Project[] {
      if (!state.projects.length) return [];
      const firstId = state.projects[0].id;
      return state.projects
        .map((p) => enrichProject(p, firstId))
        .filter((p) => p.status === "published");
    },

    featured(): Project[] {
      return this.published.filter((p) => p.featured);
    },

    grid(): Project[] {
      const regular = this.published.filter((p) => !p.featured);
      return [...this.featured, ...regular].slice(0, 6);
    },

    total(state): number {
      return state.meta?.total ?? this.published.length;
    },
  },

  actions: {
    async fetchAllProjects(): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await axios.get<ProjectListResponse>(
          `${this.apiUrl}/v1/projects`
        );

        const { list, meta } = res.data.data;
        this.projects = list;
        this.meta = meta ?? null;
      } catch (err) {
        const e = err as AxiosError<{ message: string }>;
        this.error = e.response?.data?.message || e.message;
        console.error("Fetch projects error:", err);

        this.projects = [];
        this.meta = null;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchBySlug(slug: string): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await axios.get<ProjectBySlugResponse>(
          `${this.apiUrl}/v1/project/${slug}`
        );

        this.project = res.data.data;

        this.meta = null;
      } catch (err) {
        const e = err as AxiosError<{ message: string }>;
        this.error = e.response?.data?.message || e.message;
        console.error("Fetch project error:", err);

        this.project = [];
        this.meta = null;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchProductById(id: string): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await axios.get<ProjectBySlugResponse>(
          `${this.apiUrl}/v1/projects/${id}`
        );

        this.project = res.data.data;

        this.meta = null;
      } catch (err) {
        const e = err as AxiosError<{ message: string }>;
        this.error = e.response?.data?.message || e.message;
        console.error("Fetch project error:", err);

        this.project = [];
        this.meta = null;
      } finally {
        this.isLoading = false;
      }
    },

    async updateProject(id: string, payload: Partial<Project>): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.put<{ data: Project }>(
          `${this.apiUrl}/v1/projects/${id}`,
          payload
        );
        this.project = response.data.data;
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        this.error = axiosError.response?.data?.message || axiosError.message;
        console.error("Update project error:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteProject(id: string): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        await axios.delete(`${this.apiUrl}/v1/projects/${id}`);
        await this.fetchAllProjects();
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        this.error = axiosError.response?.data?.message || axiosError.message;
        console.error("Delete project error:", error);
      } finally {
        this.isLoading = false;
      }
    },

    clearProjects() {
      this.projects = [];
      this.project = {};
      this.meta = null;
      this.error = null;
    },

    clearOneProject() {
      this.project = {};
      this.error = null;
    },

    clearError() {
      this.error = null;
    },
  },
});
