import { useEffect, useState } from "react";
import { DashboardService } from "../../services/dashboard.service";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const data = await DashboardService.getStats();
    setStats(data);
  }

  if (!stats) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div>

      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <Card title="Total Reports" value={stats.total} color="#444" />

        <Card title="Draft" value={stats.draft} color="#777" />

        <Card title="Submitted" value={stats.submitted} color="#f39c12" />

        <Card title="Reviewed" value={stats.reviewed} color="#3498db" />

        <Card title="Approved" value={stats.approved} color="#2ecc71" />
      </div>

      <h2>Recent Reports</h2>

      <table
        border={1}
        cellPadding={10}
        style={{
          width: "100%",
          background: "white",
        }}
      >
        <thead>
          <tr>
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
              <td>{report.project.name}</td>

              <td>
                {new Date(report.weekStart).toLocaleDateString()}
              </td>

              <td>{report.status}</td>

              <td>{report.hoursWorked}</td>

              <td>{report.submissionStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        background: color,
        color: "white",
        padding: 20,
        borderRadius: 10,
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}