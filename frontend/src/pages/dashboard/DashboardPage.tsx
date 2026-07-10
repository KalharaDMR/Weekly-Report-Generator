import { useEffect, useState } from "react";
import { DashboardService } from "../../services/dashboard.service";

import "./DashboardPage.css"; // <-- import the CSS

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const role = localStorage.getItem("role");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const data = await DashboardService.getStats();
    setStats(data);
  }

  if (!stats) {
    return (
      <div className="dashboard-loading">
        <span>⏳ Loading Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">
        {role === "TEAM_MEMBER" ? "📊 My Dashboard" : "📈 Management Dashboard"}
      </h1>

      <div className="dashboard-cards-grid">
        <Card title="Total Reports" value={stats.total} color="#475569" />

        {role === "TEAM_MEMBER" ? (
          <>
            <Card title="Draft" value={stats.draft} color="#94a3b8" />
            <Card title="Submitted" value={stats.submitted} color="#f59e0b" />
            <Card title="Reviewed" value={stats.reviewed} color="#3b82f6" />
            <Card title="Approved" value={stats.approved} color="#22c55e" />
          </>
        ) : (
          <>
            <Card title="Waiting Review" value={stats.submitted} color="#f59e0b" />
            <Card title="Reviewed" value={stats.reviewed} color="#3b82f6" />
            <Card title="Approved" value={stats.approved} color="#22c55e" />
            <Card title="Draft Reports" value={stats.draft} color="#94a3b8" />
          </>
        )}
      </div>

      <h2 className="dashboard-recent-title">📄 Recent Reports</h2>

      <div className="dashboard-table-wrapper">
        <table className="dashboard-table">
          <thead>
            <tr>
              {role !== "TEAM_MEMBER" && <th>Employee</th>}
              <th>Project</th>
              <th>Week</th>
              <th>Status</th>
              <th>Hours</th>
              <th>Submission</th>
            </tr>
          </thead>
          <tbody>
            {stats.reports.slice(0, 5).map((report: any) => (
              <tr key={report.id}>
                {role !== "TEAM_MEMBER" && <td>{report.user?.name}</td>}
                <td>{report.project.name}</td>
                <td>{new Date(report.weekStart).toLocaleDateString()}</td>
                <td>
                  <span className="status-badge">{report.status}</span>
                </td>
                <td>{report.hoursWorked}</td>
                <td>
                  <span className="status-badge">{report.submissionStatus}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Card component – inline, but we add className and use style for border color
function Card({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className="dashboard-card" style={{ borderLeftColor: color }}>
      <div className="dashboard-card-title">{title}</div>
      <div className="dashboard-card-value">{value}</div>
    </div>
  );
}