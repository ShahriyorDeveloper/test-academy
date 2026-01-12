export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType?: string;
  expiresIn?: number;
}

export interface Role {
  id?: number;
  roleName: string;
  displayName?: string;
}

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  roleName?: Role[];
  roles?: string[];
  role?: string;
}

export interface TableRow {
  id?: number | string;
  [key: string]: any;
}

export interface TableColumn {
  field: string;
  header: string;
  type?: string;
  buttonLabel?: string;
}

export type MenuActionType = 'edit' | 'delete' | 'archive' | string;
