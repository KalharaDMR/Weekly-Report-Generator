export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "TEAM_MEMBER";
  status: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}