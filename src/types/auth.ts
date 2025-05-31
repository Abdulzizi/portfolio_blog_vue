export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    access_token: string;
    user: User;
  };
}

export interface ApiResponse {
  status: number | null;
  message: string | null;
  error: string[];
}
