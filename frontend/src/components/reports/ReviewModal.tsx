import { useState } from "react";

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
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          width: "700px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: 25,
          borderRadius: 10,
        }}
      >
        <h2>Weekly Report</h2>

        <hr />

        <p><b>Employee</b> : {report.user.name}</p>

        <p><b>Email</b> : {report.user.email}</p>

        <p><b>Project</b> : {report.project.name}</p>

        <p>
          <b>Week</b> :
          {" "}
          {new Date(report.weekStart).toLocaleDateString()}
          {" - "}
          {new Date(report.weekEnd).toLocaleDateString()}
        </p>

        <p><b>Hours Worked</b> : {report.hoursWorked}</p>

        <hr />

        <h3>Completed Tasks</h3>

        <p>{report.completedTasks}</p>

        <h3>Planned Tasks</h3>

        <p>{report.plannedTasks}</p>

        <h3>Blockers</h3>

        <p>{report.blockers || "-"}</p>

        <h3>Notes</h3>

        <p>{report.notes || "-"}</p>

        <h3>Status</h3>

        <p>{report.status}</p>

        <textarea
          placeholder="Manager Feedback"
          rows={5}
          style={{
            width: "100%",
            marginTop: 20,
          }}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 10,
          }}
        >
          {report.status === "SUBMITTED" && (
            <button
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
              onClick={() => {
                onApprove(feedback);
                setFeedback("");
              }}
            >
              Approve Report
            </button>
          )}

          <button onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}