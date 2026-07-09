import api from "../api/axios";

export const getSummary = async () => {
  const res = await api.get("/dashboard/summary");
  return res.data;
};

export const getCharts = async () => {
  const res = await api.get("/dashboard/charts");
  return res.data;
};

export const getActivity = async () => {
  const res = await api.get("/dashboard/activity");
  return res.data;
};