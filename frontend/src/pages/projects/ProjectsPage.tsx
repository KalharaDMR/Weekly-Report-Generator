import { useEffect, useState } from "react";
import { ProjectService } from "../../services/project.service";

import "./ProjectsPage.css"; // <-- import the CSS

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const res = await ProjectService.getAll();
    setProjects(res.data.data ?? res.data);
  }

  async function save() {
    if (editing) {
      await ProjectService.update(editing.id, form);
    } else {
      await ProjectService.create(form);
    }
    setEditing(null);
    setForm({ name: "", description: "" });
    loadProjects();
  }

  async function remove(id: string) {
    if (!confirm("Delete project?")) return;
    await ProjectService.remove(id);
    loadProjects();
  }

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h2>📁 Projects</h2>
      </div>

      <div className="projects-form">
        <div className="projects-form-group">
          <label htmlFor="project-name">Project Name</label>
          <input
            id="project-name"
            className="projects-input"
            placeholder="Enter project name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="projects-form-group">
          <label htmlFor="project-desc">Description</label>
          <textarea
            id="project-desc"
            className="projects-input projects-textarea"
            placeholder="Brief description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <button className="projects-btn-primary" onClick={save}>
          {editing ? "Update" : "Create"}
        </button>
      </div>

      <div className="projects-table-wrapper">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="projects-empty">
                  No projects yet.
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.description || "—"}</td>
                  <td>
                    <span className={`badge ${p.isActive ? 'badge-active' : 'badge-inactive'}`}>
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="projects-btn-edit"
                      onClick={() => {
                        setEditing(p);
                        setForm({ name: p.name, description: p.description || "" });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="projects-btn-danger"
                      onClick={() => remove(p.id)}
                    >
                      Delete
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