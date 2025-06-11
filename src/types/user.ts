export interface User {
  id: string | number;
  username: string;
  email: string;
  updated_security?: string;

  created_at?: string;
  updated_at?: string;

  [key: string]: any;
}

export interface UserListMeta {
  total: number;
  page?: number;
  per_page?: number;
  last_page?: number;
  from?: number;
  to?: number;
}

export interface UserListData {
  list: User[];
  meta: UserListMeta;
}

export interface UserListResponse {
  status_code: number;
  data: UserListData;
  message: string;
  settings?: unknown[];
}
