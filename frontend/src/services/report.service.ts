import api from "../api/axios";

export const getMyReports = async (
  page = 1,
  search = ""
) => {
  const res = await api.get(
    `/reports/me?page=${page}&search=${search}`
  );

  return res.data;
};

export const createReport = async (data: any) => {
  const res = await api.post("/reports", data);

  return res.data;
};

export const updateReport = async (
  id: string,
  data: any
) => {
  const res = await api.patch(`/reports/${id}`, data);

  return res.data;
};

export const submitReport = async (
  id: string
) => {
  const res = await api.post(
    `/reports/${id}/submit`
  );

  return res.data;
};

export const deleteReport = async (
  id: string
) => {
  const res = await api.delete(
    `/reports/${id}`
  );

  return res.data;
};