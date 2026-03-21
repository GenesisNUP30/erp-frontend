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
    rol: string;
  };
  token: string;
}