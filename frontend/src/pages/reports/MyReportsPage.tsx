import { useEffect, useState } from "react";
import { ReportService } from "../../services/report.service";
import ReportForm from "../../components/reports/ReportForm";

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
    <div>
      <h2>My Reports</h2>

      <button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
      >
        Create Report
      </button>

      {showForm && (
        <ReportForm
          report={editing}
          onSuccess={() => {
            setShowForm(false);
            loadReports();
          }}
        />
      )}

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Week</th>
            <th>Status</th>
            <th>Submission</th>
            <th>Hours</th>
            <th>Actions</th>
            <th>Feedback</th>
            <th>Submission</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((r) => (
            <tr key={r.id}>
              <td>{r.project.name}</td>

              <td>{new Date(r.weekStart).toLocaleDateString()}</td>

              <td>
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: 5,
                    color: "white",
                    backgroundColor:
                      r.status === "DRAFT"
                        ? "gray"
                        : r.status === "SUBMITTED"
                          ? "orange"
                          : r.status === "REVIEWED"
                            ? "blue"
                            : "green",
                  }}
                >
                  {r.status}
                </span>
              </td>

              <td>{r.submissionStatus}</td>

              <td>{r.hoursWorked}</td>

              <td>
                {r.status === "DRAFT" && (
                  <>
                    <button
                      onClick={() => {
                        setEditing(r);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>

                    <button onClick={() => submit(r.id)}>Submit</button>

                    <button onClick={() => remove(r.id)}>Delete</button>
                  </>
                )}

                {r.status !== "DRAFT" && <span>Waiting for Manager</span>}
              </td>
              <td>{r.feedback || "-"}</td>
              <td>{r.submissionStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
