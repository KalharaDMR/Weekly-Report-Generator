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
    const role = localStorage.getItem("role");

    let reports: any[] = [];

    if (role === "TEAM_MEMBER") {
      const res = await api.get("/reports/me", authHeader());
      reports = res.data;
    } else {
      const res = await api.get("/reports", authHeader());
      reports = res.data.data;
    }

    return {
      total: reports.length,
      draft: reports.filter((r: any) => r.status === "DRAFT").length,
      submitted: reports.filter((r: any) => r.status === "SUBMITTED").length,
      reviewed: reports.filter((r: any) => r.status === "REVIEWED").length,
      approved: reports.filter((r: any) => r.status === "APPROVED").length,
      reports,
    };
  },
};