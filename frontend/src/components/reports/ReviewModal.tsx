import { useState } from "react";

import "./ReviewModal.css"; // <-- import the CSS

type Props = {
  report: any;
  open: boolean;
  onClose: () => void;
  onReview: (feedback: string) => void;
  onApprove: (feedback: string) => void;
};

export default function ReviewModal({
  report,
  open,
  onClose,
  onReview,
  onApprove,
}: Props) {
  const [feedback, setFeedback] = useState("");

  if (!open || !report) return null;

  return (
    <div className="review-modal-overlay">
      <div className="review-modal-content">
        <h2 className="review-modal-title">📄 Weekly Report</h2>
        <hr className="review-modal-divider" />

        <div className="review-modal-section">
          <p className="review-modal-text">
            <span className="review-modal-label">Employee:</span> {report.user.name}
          </p>
          <p className="review-modal-text">
            <span className="review-modal-label">Email:</span> {report.user.email}
          </p>
          <p className="review-modal-text">
            <span className="review-modal-label">Project:</span> {report.project.name}
          </p>
          <p className="review-modal-text">
            <span className="review-modal-label">Week:</span>{" "}
            {new Date(report.weekStart).toLocaleDateString()} –{" "}
            {new Date(report.weekEnd).toLocaleDateString()}
          </p>
          <p className="review-modal-text">
            <span className="review-modal-label">Hours Worked:</span> {report.hoursWorked}
          </p>
        </div>

        <hr className="review-modal-divider" />

        <div className="review-modal-section">
          <h4 className="review-modal-subtitle">Completed Tasks</h4>
          <div className="review-modal-content-text">{report.completedTasks}</div>

          <h4 className="review-modal-subtitle">Planned Tasks</h4>
          <div className="review-modal-content-text">{report.plannedTasks}</div>

          <h4 className="review-modal-subtitle">Blockers</h4>
          <div className="review-modal-content-text">{report.blockers || "—"}</div>

          <h4 className="review-modal-subtitle">Notes</h4>
          <div className="review-modal-content-text">{report.notes || "—"}</div>

          <h4 className="review-modal-subtitle">Status</h4>
          <div className="review-modal-content-text" style={{ borderLeftColor: "#f59e0b" }}>
            {report.status}
          </div>
        </div>

        <textarea
          className="review-modal-feedback"
          placeholder="Manager Feedback (optional)"
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <div className="review-modal-actions">
          {report.status === "SUBMITTED" && (
            <button
              className="review-modal-btn review-modal-btn-primary"
              onClick={() => {
                onReview(feedback);
                setFeedback("");
              }}
            >
              Mark as Reviewed
            </button>
          )}

          {report.status === "REVIEWED" && (
            <button
              className="review-modal-btn review-modal-btn-success"
              onClick={() => {
                onApprove(feedback);
                setFeedback("");
              }}
            >
              Approve Report
            </button>
          )}

          <button className="review-modal-btn review-modal-btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}