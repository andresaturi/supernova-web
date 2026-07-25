export interface Company {
  id: string;
  name: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  must_change_password: boolean;
  company: Company | null;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RefreshResponse {
  access: string;
  refresh?: string;
}