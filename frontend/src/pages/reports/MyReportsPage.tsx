import { useEffect, useState } from "react";
import { ReportService } from "../../services/report.service";
import ReportForm from "../../components/reports/ReportForm";

import "./MyReportsPage.css"; // <-- import the CSS

export default function MyReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const res = await ReportService.myReports();
      setReports(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function submit(id: string) {
    await ReportService.submit(id);
    loadReports();
  }

  async function remove(id: string) {
    if (!confirm("Delete report?")) return;
    await ReportService.remove(id);
    loadReports();
  }

  return (
    <div className="my-reports-page">
      <div className="my-reports-header">
        <h2>📄 My Reports</h2>
        <button
          className="my-reports-btn my-reports-btn-primary"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          + Create Report
        </button>
      </div>

      {showForm && (
        <ReportForm
          report={editing}
          onSuccess={() => {
            setShowForm(false);
            loadReports();
          }}
        />
      )}

      <div className="my-reports-table-wrapper">
        <table className="my-reports-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Week</th>
              <th>Status</th>
              <th>Submission</th>
              <th>Hours</th>
              <th>Actions</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={7} className="my-reports-empty">
                  No reports yet. Create your first report!
                </td>
              </tr>
            ) : (
              reports.map((r) => {
                let statusClass = "";
                if (r.status === "DRAFT") statusClass = "status-draft";
                else if (r.status === "SUBMITTED") statusClass = "status-submitted";
                else if (r.status === "REVIEWED") statusClass = "status-reviewed";
                else if (r.status === "APPROVED") statusClass = "status-approved";

                let submissionClass = "";
                if (r.submissionStatus === "PENDING") submissionClass = "submission-pending";
                else if (r.submissionStatus === "LATE") submissionClass = "submission-late";
                else if (r.submissionStatus === "ON_TIME") submissionClass = "submission-on-time";

                return (
                  <tr key={r.id}>
                    <td>{r.project.name}</td>
                    <td>{new Date(r.weekStart).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${statusClass}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <span className={`submission-badge ${submissionClass}`}>
                        {r.submissionStatus}
                      </span>
                    </td>
                    <td>{r.hoursWorked}</td>
                    <td>
                      {r.status === "DRAFT" ? (
                        <div className="action-group">
                          <button
                            className="action-btn action-btn-edit"
                            onClick={() => {
                              setEditing(r);
                              setShowForm(true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="action-btn action-btn-submit"
                            onClick={() => submit(r.id)}
                          >
                            Submit
                          </button>
                          <button
                            className="action-btn action-btn-delete"
                            onClick={() => remove(r.id)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <span className="waiting-text">⏳ Waiting for Manager</span>
                      )}
                    </td>
                    <td className="feedback-text">{r.feedback || "—"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}