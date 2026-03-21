import type { Role } from '../../../constants/roles';

export interface LoginRequest {
  login: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
    rol: Role;
  };
  token: string;
}