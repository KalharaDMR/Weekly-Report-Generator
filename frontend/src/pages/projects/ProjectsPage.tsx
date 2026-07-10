import { useEffect, useState } from "react";
import { ProjectService } from "../../services/project.service";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

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

    setForm({
      name: "",
      description: "",
    });

    loadProjects();
  }

  async function remove(id: string) {
    if (!confirm("Delete project?")) return;

    await ProjectService.remove(id);

    loadProjects();
  }

  return (
    <div>
      <h2>Projects</h2>

      <input
        placeholder="Project Name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button onClick={save}>{editing ? "Update" : "Create"}</button>

      <hr />

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>

              <td>{p.description}</td>

              <td>{p.isActive ? "Yes" : "No"}</td>

              <td>
                <button
                  onClick={() => {
                    setEditing(p);

                    setForm({
                      name: p.name,
                      description: p.description || "",
                    });
                  }}
                >
                  Edit
                </button>

                <button onClick={() => remove(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
