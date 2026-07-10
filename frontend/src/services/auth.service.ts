import api from "../api/axios";

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/users/me");

  return response.data;
};