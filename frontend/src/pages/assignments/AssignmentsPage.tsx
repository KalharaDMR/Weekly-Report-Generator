import { useEffect, useState } from "react";
import api from "../../api/axios";

import "./AssignmentsPage.css"; // <-- import the CSS

export default function AssignmentsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);

  const [userId, setUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    load();
    console.log("users state", users);
    console.log("projects state", projects);
  }, []);

  async function load() {
    try {
      const usersRes = await api.get("/users");
      setUsers(usersRes.data.data);

      const projectsRes = await api.get("/projects");
      setProjects(projectsRes.data.data);

      try {
        const assignmentsRes = await api.get("/project-assignments");
        setAssignments(assignmentsRes.data);
      } catch (err) {
        console.log("Assignments endpoint:", err);
        setAssignments([]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function assign() {
    if (!userId || !projectId) {
      alert("Select both user and project");
      return;
    }

    try {
      const res = await api.post("/project-assignments", {
        userId,
        projectId,
      });

      console.log(res.data);
    } catch (err: any) {
      console.log(err.response.data);
    }

    setUserId("");
    setProjectId("");

    load();
  }

  async function remove(id: string) {
    if (!window.confirm("Remove assignment?")) return;

    await api.delete(`/project-assignments/${id}`);

    load();
  }

  return (
    <div className="assignments-page">
      <div className="assignments-header">
        <h2>📋 Project Assignments</h2>
      </div>

      <div className="assignments-form">
        <div className="assignments-form-group">
          <label htmlFor="user-select">User</label>
          <select
            id="user-select"
            className="assignments-select"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div className="assignments-form-group">
          <label htmlFor="project-select">Project</label>
          <select
            id="project-select"
            className="assignments-select"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <button className="assignments-btn-primary" onClick={assign}>
          Assign
        </button>
      </div>

      <div className="assignments-table-wrapper">
        <table className="assignments-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Project</th>
              <th>Assigned At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan={5} className="assignments-empty">
                  No assignments yet.
                </td>
              </tr>
            ) : (
              assignments.map((a) => (
                <tr key={a.id}>
                  <td>{a.user.name}</td>
                  <td>{a.user.email}</td>
                  <td>{a.project.name}</td>
                  <td>{new Date(a.assignedAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="assignments-btn-danger"
                      onClick={() => remove(a.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}