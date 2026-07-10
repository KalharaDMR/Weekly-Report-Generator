import api from "../api/axios";

function authHeader() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
}

export const DashboardService = {
  async getStats() {
    const reports = await api.get("/reports/me", authHeader());

    const data = reports.data;

    return {
      total: data.length,
      draft: data.filter((r: any) => r.status === "DRAFT").length,
      submitted: data.filter((r: any) => r.status === "SUBMITTED").length,
      reviewed: data.filter((r: any) => r.status === "REVIEWED").length,
      approved: data.filter((r: any) => r.status === "APPROVED").length,
      reports: data,
    };
  },
};