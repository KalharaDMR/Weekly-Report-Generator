import { useEffect, useState } from "react";
import { ReportService } from "../../services/report.service";

export default function ManageReportsPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    const res = await ReportService.allReports();
    setReports(res.data.data);
  }

  async function review(id: string) {
    const feedback = prompt("Feedback") || "";

    await ReportService.review(id, feedback);

    loadReports();
  }

  async function approve(id: string) {
    const feedback = prompt("Approval Feedback") || "";

    await ReportService.approve(id, feedback);

    loadReports();
  }

  return (
    <div>
      <h2>Reports Review</h2>

      <table border={1} cellPadding={8} width="100%">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Project</th>
            <th>Week</th>
            <th>Status</th>
            <th>Hours</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((r) => (
            <tr key={r.id}>
              <td>{r.user.name}</td>

              <td>{r.project.name}</td>

              <td>{new Date(r.weekStart).toLocaleDateString()}</td>

              <td>{r.status}</td>

              <td>{r.hoursWorked}</td>

              <td>
                {r.status === "SUBMITTED" && (
                  <button onClick={() => review(r.id)}>
                    Review
                  </button>
                )}

                {r.status === "REVIEWED" && (
                  <button onClick={() => approve(r.id)}>
                    Approve
                  </button>
                )}

                {r.status === "APPROVED" && (
                  <span>Approved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}