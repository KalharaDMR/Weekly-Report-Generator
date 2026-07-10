import { useEffect, useState } from "react";
import { ReportService } from "../../services/report.service";
import ReviewModal from "../../components/reports/ReviewModal";

import "./ManageReportsPage.css"; // <-- import the CSS

export default function ManageReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

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
    <div className="manage-reports-page">
      <div className="manage-reports-header">
        <h2>📋 Reports Review</h2>
      </div>

      <div className="manage-reports-table-wrapper">
        <table className="manage-reports-table">
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
            {reports.length === 0 ? (
              <tr>
                <td colSpan={6} className="manage-reports-empty">
                  No reports to review.
                </td>
              </tr>
            ) : (
              reports.map((r) => {
                let statusClass = "";
                if (r.status === "SUBMITTED") statusClass = "status-submitted";
                else if (r.status === "REVIEWED") statusClass = "status-reviewed";
                else if (r.status === "APPROVED") statusClass = "status-approved";

                return (
                  <tr key={r.id}>
                    <td>{r.user.name}</td>
                    <td>{r.project.name}</td>
                    <td>{new Date(r.weekStart).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${statusClass}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>{r.hoursWorked}</td>
                    <td>
                      {r.status === "SUBMITTED" && (
                        <button
                          className="manage-reports-btn manage-reports-btn-primary"
                          onClick={() => {
                            setSelectedReport(r);
                            setOpenModal(true);
                          }}
                        >
                          Review
                        </button>
                      )}
                      {r.status === "REVIEWED" && (
                        <button
                          className="manage-reports-btn manage-reports-btn-success"
                          onClick={() => {
                            setSelectedReport(r);
                            setOpenModal(true);
                          }}
                        >
                          Approve
                        </button>
                      )}
                      {r.status === "APPROVED" && (
                        <span className="manage-reports-approved-text">✅ Approved</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <ReviewModal
        report={selectedReport}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onReview={async (feedback) => {
          await ReportService.review(selectedReport.id, feedback);
          setOpenModal(false);
          loadReports();
        }}
        onApprove={async (feedback) => {
          await ReportService.approve(selectedReport.id, feedback);
          setOpenModal(false);
          loadReports();
        }}
      />
    </div>
  );
}