import { useEffect, useState } from "react";
import { UserService } from "../../services/user.service";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const res = await UserService.getAll();
    setUsers(res.data.data);
  }

  return (
    <div>
      <h2>Users</h2>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>
                <select
                  value={user.role}
                  onChange={async (e) => {
                    await UserService.updateRole(user.id, e.target.value);

                    loadUsers();
                  }}
                >
                  <option>ADMIN</option>

                  <option>MANAGER</option>

                  <option>TEAM_MEMBER</option>
                </select>
              </td>

              <td>
                <select
                  value={user.status}
                  onChange={async (e) => {
                    await UserService.updateStatus(user.id, e.target.value);

                    loadUsers();
                  }}
                >
                  <option>PENDING</option>

                  <option>ACTIVE</option>

                  <option>DEACTIVATED</option>
                </select>
              </td>

              <td>
                <button
                  onClick={async () => {
                    if (!confirm("Delete?")) return;

                    await UserService.remove(user.id);

                    loadUsers();
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
