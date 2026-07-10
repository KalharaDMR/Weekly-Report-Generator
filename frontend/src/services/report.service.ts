import axios from "../api/axios";

function authHeader() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
}

export const ReportService = {
  myReports() {
    return axios.get("/reports/me", authHeader());
  },

  allReports(page = 1, limit = 10, search = "") {
    return axios.get(
      `/reports?page=${page}&limit=${limit}&search=${search}`,
      authHeader(),
    );
  },

  create(data: any) {
    return axios.post("/reports", data, authHeader());
  },

  update(id: string, data: any) {
    return axios.patch(`/reports/${id}`, data, authHeader());
  },

  submit(id: string) {
    return axios.post(`/reports/${id}/submit`, {}, authHeader());
  },

  remove(id: string) {
    return axios.delete(`/reports/${id}`, authHeader());
  },

  review(id: string, feedback: string) {
    return axios.patch(`/reports/${id}/review`, { feedback }, authHeader());
  },

  approve(id: string, feedback: string) {
    return axios.patch(`/reports/${id}/approve`, { feedback }, authHeader());
  },

  findOne(id: string) {
    return axios.get(`/reports/${id}`, authHeader());
  },
};
