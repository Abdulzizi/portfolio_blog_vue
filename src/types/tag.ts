export interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string;

  created_at?: string;
  updated_at?: string;

  [key: string]: any;
}

export interface TagListMeta {
  total: number;
  page?: number;
  per_page?: number;
  last_page?: number;
  from?: number;
  to?: number;
}

export interface TagListData {
  list: Tag[];
  meta: TagListMeta;
}

export interface TagListResponse {
  status_code: number;
  data: TagListData;
  message: string;
  settings?: unknown[];
}
