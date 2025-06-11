export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  slug: string;
  thumbnail: string | null;
  images: string[];
  tech_stack: string;
  start_date: string | null;
  end_date: string | null;
  is_published: 0 | 1;

  [key: string]: unknown;
}

export interface ProjectListMeta {
  total: number;
  page?: number;
  per_page?: number;
  last_page?: number;
  from?: number;
  to?: number;
}

export interface ProjectListData {
  list: Project[];
  meta: ProjectListMeta;
}

export interface ProjectListResponse {
  status_code: number;
  data: ProjectListData;
  message: string;
  settings?: unknown[];
}

export interface ProjectBySlugResponse {
  status_code: number;
  data: Project;
  message: string;
  settings?: unknown[];
}
