export type User = {
  id: number;
  email: string;
  is_verified: boolean;
  role: string;
  created_at: string;
  updated_at: string;
};

export type LoginResponse = {
  access_token: string;
  user: User;
};

export interface IRegisterResponse {
  id: number;
  email: string;
  is_verified: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}
