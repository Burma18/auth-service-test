export interface RegisterPayload {
  username: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface User {
  id: string;
  username: string;
  registered_at: Date;
}
