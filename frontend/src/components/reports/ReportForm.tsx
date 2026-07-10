import { useEffect, useState } from "react";
import { ReportService } from "../../services/report.service";
import { ProjectService } from "../../services/project.service";

interface Props {
  report?: any;
  onSuccess: () => void;
}

export default function ReportForm({
  report,
  onSuccess,
}: Props) {
  const [projects, setProjects] = useState<any[]>([]);

  const [form, setForm] = useState({
    projectId: "",
    weekStart: "",
    weekEnd: "",
    completedTasks: "",
    plannedTasks: "",
    blockers: "",
    hoursWorked: 0,
    notes: "",
  });

  useEffect(() => {
    loadProjects();

    if (report) {
      setForm({
        projectId: report.projectId,
        weekStart: report.weekStart.substring(0, 10),
        weekEnd: report.weekEnd.substring(0, 10),
        completedTasks: report.completedTasks,
        plannedTasks: report.plannedTasks,
        blockers: report.blockers || "",
        hoursWorked: report.hoursWorked || 0,
        notes: report.notes || "",
      });
    }
  }, []);

  async function loadProjects() {
    const res = await ProjectService.getAll();
    setProjects(res.data.data);
  }

  async function save() {
    if (report) {
      await ReportService.update(report.id, form);
    } else {
      await ReportService.create(form);
    }

    onSuccess();
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 20,
        marginTop: 20,
      }}
    >
      <h3>{report ? "Edit Report" : "Create Report"}</h3>

      <select
        value={form.projectId}
        onChange={(e) =>
          setForm({
            ...form,
            projectId: e.target.value,
          })
        }
      >
        <option value="">Select Project</option>

        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <label>Week Start</label>

      <br />

      <input
        type="date"
        value={form.weekStart}
        onChange={(e) =>
          setForm({
            ...form,
            weekStart: e.target.value,
          })
        }
      />

      <br />
      <br />

      <label>Week End</label>

      <br />

      <input
        type="date"
        value={form.weekEnd}
        onChange={(e) =>
          setForm({
            ...form,
            weekEnd: e.target.value,
          })
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Completed Tasks"
        value={form.completedTasks}
        onChange={(e) =>
          setForm({
            ...form,
            completedTasks: e.target.value,
          })
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Planned Tasks"
        value={form.plannedTasks}
        onChange={(e) =>
          setForm({
            ...form,
            plannedTasks: e.target.value,
          })
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Blockers"
        value={form.blockers}
        onChange={(e) =>
          setForm({
            ...form,
            blockers: e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Hours Worked"
        value={form.hoursWorked}
        onChange={(e) =>
          setForm({
            ...form,
            hoursWorked: Number(e.target.value),
          })
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) =>
          setForm({
            ...form,
            notes: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button onClick={save}>
        {report ? "Update" : "Create"}
      </button>

      <button
        style={{ marginLeft: 10 }}
        onClick={onSuccess}
      >
        Cancel
      </button>
    </div>
  );
}